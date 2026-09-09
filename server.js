const express = require('express');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 3000;
const ROOT_DIR = __dirname;
const DATA_DIR = path.join(ROOT_DIR, 'data');
const DB_PATH = path.join(DATA_DIR, 'app-db.json');
const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME || 'placementpro';
let mongoClient = null;

app.use(express.json({ limit: '1mb' }));
app.use(express.static(ROOT_DIR));

function hashPassword(password, salt) {
  return crypto.pbkdf2Sync(password, salt, 120000, 64, 'sha512').toString('hex');
}

function makePasswordRecord(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  return {
    salt,
    passwordHash: hashPassword(password, salt)
  };
}

function ensureDb() {
  fs.mkdirSync(DATA_DIR, { recursive: true });

  if (!fs.existsSync(DB_PATH)) {
    const admin = {
      username: 'admin',
      fullName: 'Portal Admin',
      registerNumber: 'ADMIN',
      phone: '0000000000',
      department: 'ADMIN',
      year: 'admin',
      role: 'admin',
      created: new Date().toISOString(),
      ...makePasswordRecord('intel@123')
    };

    const initialDb = {
      users: [admin],
      history: {}
    };
    fs.writeFileSync(DB_PATH, JSON.stringify(initialDb, null, 2));
  }
}

function readLocalDb() {
  ensureDb();
  try {
    const raw = fs.readFileSync(DB_PATH, 'utf8');
    return JSON.parse(raw);
  } catch (error) {
    return { users: [], history: {} };
  }
}

function writeLocalDb(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

async function getMongoDb() {
  if (!MONGODB_URI) return null;

  try {
    if (!mongoClient) {
      mongoClient = new MongoClient(MONGODB_URI);
      await mongoClient.connect();
    }
    return mongoClient.db(MONGODB_DB_NAME);
  } catch (error) {
    console.warn('MongoDB not available, using local file storage instead:', error.message);
    return null;
  }
}

async function readDb() {
  const mongoDb = await getMongoDb();
  if (mongoDb) {
    const users = await mongoDb.collection('users').find({}).toArray();
    const historyRows = await mongoDb.collection('history').find({}).toArray();
    const history = {};
    for (const row of historyRows) {
      history[row.username] = Array.isArray(row.entries) ? row.entries : [];
    }
    return { users, history };
  }

  return readLocalDb();
}

async function writeDb(data) {
  const mongoDb = await getMongoDb();
  if (mongoDb) {
    const usersCollection = mongoDb.collection('users');
    const historyCollection = mongoDb.collection('history');

    await usersCollection.deleteMany({});
    if (Array.isArray(data.users) && data.users.length) {
      await usersCollection.insertMany(data.users);
    }

    await historyCollection.deleteMany({});
    const historyDocs = Object.entries(data.history || {}).map(([username, entries]) => ({
      username,
      entries: Array.isArray(entries) ? entries : []
    }));
    if (historyDocs.length) {
      await historyCollection.insertMany(historyDocs);
    }
    return;
  }

  writeLocalDb(data);
}

function sanitizeUser(user) {
  const { passwordHash, salt, ...cleanUser } = user;
  return cleanUser;
}

function findUserByUsername(db, username) {
  return db.users.find((user) => user.username.toLowerCase() === String(username).toLowerCase());
}

function isValidPassword(password, user) {
  return hashPassword(password, user.salt) === user.passwordHash;
}

app.get('/api/health', async (req, res) => {
  const mongoDb = await getMongoDb();
  res.json({
    ok: true,
    timestamp: new Date().toISOString(),
    storage: mongoDb ? 'mongodb' : 'local-json'
  });
});

app.get('/api/users', async (req, res) => {
  const db = await readDb();
  res.json({ users: db.users.map(sanitizeUser) });
});

app.post('/api/auth/register', async (req, res) => {
  const { username, fullName, registerNumber, phone, department, year, password } = req.body || {};

  if (!username || !fullName || !registerNumber || !phone || !department || !year || !password) {
    return res.status(400).json({ message: 'All required fields are missing.' });
  }

  if (String(username).toLowerCase() === 'admin') {
    return res.status(409).json({ message: 'That username is reserved for the portal administrator.' });
  }

  if (String(password).length < 4) {
    return res.status(400).json({ message: 'Password must be at least 4 characters.' });
  }

  const db = await readDb();
  if (findUserByUsername(db, username)) {
    return res.status(409).json({ message: 'That username already exists. Try logging in.' });
  }

  const newUser = {
    username: String(username).trim(),
    fullName: String(fullName).trim(),
    registerNumber: String(registerNumber).trim(),
    phone: String(phone).trim(),
    department: String(department).trim(),
    year: String(year).trim(),
    role: 'student',
    created: new Date().toISOString(),
    ...makePasswordRecord(String(password))
  };

  db.users.push(newUser);
  await writeDb(db);

  res.status(201).json({ ok: true, user: sanitizeUser(newUser) });
});

app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body || {};

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  const db = await readDb();
  const user = findUserByUsername(db, username);

  if (!user) {
    return res.status(404).json({ message: 'No such user found. Register first.' });
  }

  if (!isValidPassword(String(password), user)) {
    return res.status(401).json({ message: 'Incorrect password. Please try again.' });
  }

  res.json({ ok: true, user: sanitizeUser(user) });
});

app.post('/api/auth/reset-password', async (req, res) => {
  const { username, password } = req.body || {};

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  if (String(username).toLowerCase() === 'admin') {
    return res.status(403).json({ message: 'Admin password cannot be reset from the student screen.' });
  }

  if (String(password).length < 4) {
    return res.status(400).json({ message: 'Password must be at least 4 characters.' });
  }

  const db = await readDb();
  const user = findUserByUsername(db, username);

  if (!user) {
    return res.status(404).json({ message: 'No account found for that username.' });
  }

  const newPassword = makePasswordRecord(String(password));
  user.salt = newPassword.salt;
  user.passwordHash = newPassword.passwordHash;

  await writeDb(db);
  res.json({ ok: true, message: 'Password reset successfully.' });
});

app.get('/api/history/:username', async (req, res) => {
  const db = await readDb();
  const history = db.history[String(req.params.username)] || [];
  res.json({ history });
});

app.post('/api/history/:username', async (req, res) => {
  const { entry } = req.body || {};
  if (!entry) {
    return res.status(400).json({ message: 'History entry is required.' });
  }

  const db = await readDb();
  const key = String(req.params.username);
  const current = Array.isArray(db.history[key]) ? db.history[key] : [];
  current.push(entry);
  db.history[key] = current.slice(-100);
  await writeDb(db);

  res.json({ ok: true, history: db.history[key] });
});

app.delete('/api/history/:username', async (req, res) => {
  const db = await readDb();
  db.history[String(req.params.username)] = [];
  await writeDb(db);
  res.json({ ok: true, history: [] });
});

app.get('/api/admin', async (req, res) => {
  const db = await readDb();
  const summary = db.users
    .filter((user) => user.username.toLowerCase() !== 'admin')
    .map((user) => {
      const history = db.history[user.username] || [];
      const avg = history.length ? Math.round(history.reduce((total, item) => total + (item.percentage || 0), 0) / history.length) : 0;
      return {
        ...sanitizeUser(user),
        history,
        average: avg,
        lastActivity: history.length ? history[history.length - 1].date : null
      };
    });

  res.json({
    users: summary,
    totalAttempts: summary.reduce((sum, user) => sum + user.history.length, 0),
    count: summary.length
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(ROOT_DIR, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`PlacementPro server running at http://localhost:${PORT}`);
  if (MONGODB_URI) {
    console.log('MongoDB cloud storage enabled via MONGODB_URI');
  } else {
    console.log('No MONGODB_URI configured. Using local JSON storage.');
  }
});
