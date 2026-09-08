/* ============================================================
   PlacementPro - script.js
   Auth, routing, MCQ exam engine, coding judge (Piston API),
   results, dashboard and localStorage persistence.
   ============================================================ */

"use strict";

/* ---------------- Shortcuts ---------------- */
const $ = (id) => document.getElementById(id);

/* ---------------- Storage keys ---------------- */
const LS_USERS = "pp_users";
const LS_SESSION = "pp_session";
const LS_THEME = "pp_theme";
const LS_AI_KEY = "pp_ai_key";
const ADMIN_USER = "admin";
const ADMIN_PASS = "intel@123";
const histKey = (u) => "pp_hist_" + u;

function lsGet(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw === null ? fallback : JSON.parse(raw);
  } catch (e) {
    return fallback;
  }
}
function lsSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    /* storage unavailable */
  }
}

/* ---------------- Global app state ---------------- */
let currentUser = null;
let session = null;
let lastReviewData = null;
let lastConfigRef = null;
let pendingCompanyId = null;
const codeDrafts = {};

/* ============================================================
   UTILITIES
   ============================================================ */
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickRandom(arr, n) {
  return shuffle(arr).slice(0, Math.min(n, arr.length));
}

function randomizeOptions(q) {
  const correctText = q.options[q.correctAnswer];
  const opts = shuffle(q.options);
  return {
    question: q.question,
    options: opts,
    correctAnswer: opts.indexOf(correctText),
    explanation: q.explanation,
    topic: q.topic || "",
    category: q.category || ""
  };
}

function buildQuestions(bankArr, count) {
  return pickRandom(bankArr, count).map((q) => {
    const rq = randomizeOptions(q);
    rq.category = q.category;
    return rq;
  });
}

function formatClock(totalSec) {
  const s = Math.max(0, totalSec);
  const m = Math.floor(s / 60);
  const r = s % 60;
  return String(m).padStart(2, "0") + ":" + String(r).padStart(2, "0");
}

function formatDuration(totalSec) {
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  if (h > 0) return h + "h " + String(m).padStart(2, "0") + "m";
  if (m > 0) return m + "m " + String(s).padStart(2, "0") + "s";
  return s + "s";
}

function fmtDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/* ============================================================
   TOASTS
   ============================================================ */
function showToast(message, type = "info", duration = 3200) {
  const wrap = $("toast-wrap");
  const el = document.createElement("div");
  el.className = "toast " + type;
  el.textContent = message;
  wrap.appendChild(el);
  setTimeout(() => {
    el.classList.add("leaving");
    setTimeout(() => el.remove(), 320);
  }, duration);
}

/* ============================================================
   THEME
   ============================================================ */
function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  $("icon-moon").classList.toggle("hidden", theme === "light");
  $("icon-sun").classList.toggle("hidden", theme !== "light");
  lsSet(LS_THEME, theme);
}
function initTheme() {
  applyTheme(lsGet(LS_THEME, "light"));
}

/* ============================================================
   ROUTER
   ============================================================ */
const NAV_SCREENS = {
  home: "screen-home",
  categories: "screen-categories",
  companies: "screen-companies",
  dashboard: "screen-dashboard",
  admin: "screen-admin"
};

function showScreen(id) {
  document.querySelectorAll(".screen").forEach((s) => s.classList.remove("active"));
  const target = $(id);
  if (target) {
    target.classList.remove("hidden");
    target.classList.add("active");
  }
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  document.querySelectorAll(".nav-link").forEach((b) => {
    b.classList.toggle("active", b.dataset.nav && NAV_SCREENS[b.dataset.nav] === id);
  });
  $("header-nav").classList.remove("open");
}

function navigate(dest) {
  if (!currentUser) return;
  if (currentUser === ADMIN_USER) {
    renderAdmin();
    showScreen("screen-admin");
    return;
  }
  if (dest === "coding") {
    openCodingHub();
    return;
  }
  const screenId = NAV_SCREENS[dest] || "screen-home";
  if (dest === "dashboard") renderDashboard();
  if (dest === "admin") renderAdmin();
  showScreen(screenId);
}

function setCareerFocus(focus) {
  const insight = $("career-insight");
  const tips = {
    skills: ["Build skills", "Strengthen one core topic every day, then test it under a timer."],
    interview: ["Own interviews", "Review your mistakes aloud so your reasoning becomes interview-ready."],
    default: ["Your next move", "Practice one timed test today and turn preparation into momentum."]
  };
  const tip = tips[focus] || tips.default;
  insight.innerHTML = "<strong>" + tip[0] + "</strong><span>" + tip[1] + "</span>";
  document.querySelectorAll(".career-visual").forEach((card) => card.classList.toggle("selected", card.dataset.career === focus));
}

const AUTH_GUIDE = {
  routine: {
    tip: "Build a steady routine and let every attempt show you what to improve next.",
    label: "Today's practice",
    items: ["20 minutes aptitude speed drill", "Review three mistakes and write the lesson", "Finish with one coding problem"]
  },
  confidence: {
    tip: "Confidence grows when you can explain your thinking, not just remember the answer.",
    label: "Speaking techniques",
    items: ["Answer with: situation, action, result", "Think aloud before jumping to the final answer", "End with one clear takeaway or question"]
  }
};
function setAuthFocus(focus) {
  const guide = AUTH_GUIDE[focus] || AUTH_GUIDE.routine;
  $("auth-visual-tip").textContent = guide.tip;
  $("auth-tip-label").textContent = guide.label;
  $("auth-tip-list").innerHTML = guide.items.map((item) => "<li>" + item + "</li>").join("");
  document.querySelectorAll(".auth-image-card").forEach((card) => card.classList.toggle("selected", card.dataset.authFocus === focus));
}

/* ============================================================
   AUTH
   ============================================================ */
function users() {
  return lsGet(LS_USERS, {});
}

function showAuthMessage(text, ok = false) {
  const el = $("auth-message");
  el.textContent = text;
  el.classList.remove("hidden");
  el.classList.toggle("success", ok);
}

function switchAuthTab(tab) {
  $("tab-login").classList.toggle("active", tab === "login");
  $("tab-register").classList.toggle("active", tab === "register");
  $("login-form").classList.toggle("hidden", tab !== "login");
  $("register-form").classList.toggle("hidden", tab !== "register");
  $("reset-form").classList.add("hidden");
  $("auth-message").classList.add("hidden");
}

function showResetForm() {
  $("login-form").classList.add("hidden");
  $("register-form").classList.add("hidden");
  $("reset-form").classList.remove("hidden");
  $("auth-message").classList.add("hidden");
  $("tab-login").classList.add("active");
  $("tab-register").classList.remove("active");
}

function resetPassword(e) {
  e.preventDefault();
  const name = $("reset-username").value.trim();
  const pass = $("reset-password").value;
  const confirmPass = $("reset-confirm").value;
  if (name === ADMIN_USER) {
    showAuthMessage("Admin password cannot be reset from the student screen.");
    return;
  }
  if (!validUsername(name)) {
    showAuthMessage("Enter a valid username.");
    return;
  }
  if (pass.length < 4) {
    showAuthMessage("Password must be at least 4 characters.");
    return;
  }
  if (pass !== confirmPass) {
    showAuthMessage("Passwords do not match.");
    return;
  }
  const db = users();
  if (!db[name]) {
    showAuthMessage("No account found for that username.");
    return;
  }
  db[name].pass = pass;
  lsSet(LS_USERS, db);
  $("reset-form").reset();
  switchAuthTab("login");
  showAuthMessage("Password reset successfully. You can log in now.", true);
}

function validUsername(name) {
  return /^[A-Za-z0-9_]{3,30}$/.test(name);
}

function usernameBase(name) {
  return name.toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 24);
}

function updateGeneratedUsername() {
  const name = usernameBase($("register-name").value.trim());
  const year = $("register-year").value;
  const suffix = year === "mba" ? "mba" : String(year).padStart(2, "0");
  $("register-username").value = name && year ? name + suffix : "";
}

function toggleOtherDepartment() {
  const isOther = $("register-department").value === "OTHER";
  $("other-department-field").classList.toggle("hidden", !isOther);
  $("register-other-department").required = isOther;
}

function registerUser(e) {
  e.preventDefault();
  const fullName = $("register-name").value.trim();
  const registerNumber = $("register-number").value.trim();
  const phone = $("register-phone").value.trim();
  const departmentCode = $("register-department").value;
  const department = departmentCode === "OTHER" ? $("register-other-department").value.trim() : departmentCode;
  const year = $("register-year").value;
  updateGeneratedUsername();
  const name = $("register-username").value.trim();
  const pass = $("register-password").value;
  const conf = $("register-confirm").value;
  if (!fullName || !name || !/^[A-Za-z0-9]{3,24}$/.test(usernameBase(fullName))) {
    showAuthMessage("Enter a valid name using at least 3 English letters.");
    return;
  }
  if (!registerNumber) {
    showAuthMessage("Register number is required.");
    return;
  }
  if (!/^[0-9+() -]{10,15}$/.test(phone)) {
    showAuthMessage("Enter a valid phone number.");
    return;
  }
  if (!department || !year) {
    showAuthMessage("Select your department and year of study.");
    return;
  }
  if (name === ADMIN_USER) {
    showAuthMessage("That username is reserved for the portal administrator.");
    return;
  }
  if (pass.length < 4) {
    showAuthMessage("Password must be at least 4 characters.");
    return;
  }
  if (pass !== conf) {
    showAuthMessage("Passwords do not match.");
    return;
  }
  const db = users();
  if (db[name]) {
    showAuthMessage("That username already exists. Try logging in.");
    return;
  }
  db[name] = { pass: pass, fullName: fullName, registerNumber: registerNumber, phone: phone, department: department, year: year, created: new Date().toISOString() };
  lsSet(LS_USERS, db);
  showToast("Account created. Welcome aboard!", "success");
  loginUserByName(name);
}

function loginUser(e) {
  e.preventDefault();
  const name = $("login-username").value.trim();
  const pass = $("login-password").value;
  if (name === ADMIN_USER && pass === ADMIN_PASS) {
    loginUserByName(ADMIN_USER);
    return;
  }
  const db = users();
  if (!db[name]) {
    showAuthMessage("No such user found. Register first - it takes two seconds.");
    return;
  }
  if (db[name].pass !== pass) {
    showAuthMessage("Incorrect password. Please try again.");
    return;
  }
  loginUserByName(name);
}

function loginUserByName(name) {
  currentUser = name;
  lsSet(LS_SESSION, name);
  enterApp();
}

function logoutUser() {
  if (session && session.phase !== "done") endSession();
  currentUser = null;
  localStorage.removeItem(LS_SESSION);
  location.reload();
}

function enterApp() {
  $("app-shell").classList.remove("hidden");
  $("app-shell").classList.toggle("admin-mode", currentUser === ADMIN_USER);
  $("screen-login").classList.add("hidden");
  $("user-name").textContent = currentUser;
  $("user-avatar-initial").textContent = currentUser.charAt(0);
  updateProfileBadge();
  $("admin-nav-link").classList.toggle("hidden", currentUser !== ADMIN_USER);
  if (currentUser === ADMIN_USER) {
    renderAdmin();
    showScreen("screen-admin");
  } else {
    showScreen("screen-home");
  }
}

function updateProfileBadge() {
  const crowned = currentUser && getHistory().length > 0;
  $("user-avatar").classList.toggle("crowned", !!crowned);
  $("profile-crown").classList.toggle("hidden", !crowned);
  $("user-avatar").title = crowned ? "Princess crown earned after completing a test" : "Complete a test to earn your crown";
}

function tryResumeSession() {
  const name = lsGet(LS_SESSION, null);
  const db = users();
  if (name === ADMIN_USER) {
    currentUser = ADMIN_USER;
    enterApp();
    return true;
  }
  if (name && db[name]) {
    currentUser = name;
    enterApp();
    return true;
  }
  return false;
}

/* ============================================================
   HISTORY STORAGE
   ============================================================ */
function getHistory() {
  return currentUser ? lsGet(histKey(currentUser), []) : [];
}
function saveHistoryEntry(entry) {
  const list = getHistory();
  list.push(entry);
  lsSet(histKey(currentUser), list.slice(-100));
  updateProfileBadge();
}

function allLocalUsers() {
  return Object.keys(users()).filter((name) => name !== ADMIN_USER);
}

function renderAdmin() {
  if (currentUser !== ADMIN_USER) return;
  const db = users();
  const rows = allLocalUsers().map((name) => {
    const history = lsGet(histKey(name), []);
    const scores = history.map((item) => item.percentage || 0);
    const last = history.length ? history[history.length - 1] : null;
    return { name, profile: db[name], history, average: scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0, last };
  });
  const attempts = rows.reduce((total, row) => total + row.history.length, 0);
  const scores = rows.reduce((all, row) => all.concat(row.history.map((item) => item.percentage || 0)), []);
  const today = new Date().toISOString().slice(0, 10);
  $("admin-user-count").textContent = rows.length;
  $("admin-attempt-count").textContent = attempts;
  $("admin-average-score").textContent = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) + "%" : "-";
  $("admin-active-today").textContent = rows.filter((row) => row.last && row.last.date.slice(0, 10) === today).length;
  $("admin-users-tbody").innerHTML = rows.length ? rows.map((row) =>
    "<tr><td><button class=\"admin-student-link\" data-admin-student=\"" + escapeHtml(row.name) + "\"><strong>" + escapeHtml(row.profile.fullName || row.name) + "</strong><small class=\"admin-username\">" + escapeHtml(row.name) + "</small></button></td>" +
    "<td>" + escapeHtml(row.profile.registerNumber || "-") + "</td>" +
    "<td>" + escapeHtml(row.profile.phone || "-") + "</td>" +
    "<td>" + escapeHtml(row.profile.department || "-") + "</td>" +
    "<td>" + escapeHtml(row.profile.year === "mba" ? "MBA" : (row.profile.year || "-")) + "</td>" +
    "<td>" + row.history.length + "</td>" +
    "<td>" + (row.history.length ? row.average + "%" : "-") + "</td>" +
    "<td>" + (row.last ? fmtDate(row.last.date) : "No attempts") + "</td></tr>").join("") :
    '<tr><td colspan="8">No users registered yet.</td></tr>';
  document.querySelectorAll("[data-admin-student]").forEach((button) => {
    button.addEventListener("click", () => openAdminStudentProfile(button.dataset.adminStudent));
  });
}

function openAdminStudentProfile(name) {
  if (currentUser !== ADMIN_USER) return;
  const profile = users()[name];
  const history = lsGet(histKey(name), []);
  if (!profile) return;
  const average = history.length ? Math.round(history.reduce((sum, item) => sum + (item.percentage || 0), 0) / history.length) : 0;
  const companyRows = history.filter((item) => item.type === "Company Mock").map((item) => {
    const company = COMPANIES.find((co) => co.id === item.companyId);
    return '<tr><td>' + escapeHtml(company ? company.name : (item.title || "Company Mock")) + '</td><td>' + (item.percentage || 0) + '%</td><td>' + fmtDate(item.date) + '</td></tr>';
  }).join("");
  const attempts = history.map((item) =>
    '<div class="admin-attempt-row"><strong>' + escapeHtml(item.title || "Practice Test") + '</strong><span>' + (item.percentage || 0) + '% <small>' + fmtDate(item.date) + '</small></span></div>'
  ).join("");
  $("admin-student-profile-body").innerHTML =
    '<div class="admin-profile-head"><div class="admin-profile-avatar">' + escapeHtml((profile.fullName || name).charAt(0)) + '</div><div><h3>' + escapeHtml(profile.fullName || name) + '</h3><p>' + escapeHtml(name) + ' &middot; ' + escapeHtml(profile.department || "-") + ' &middot; Year ' + escapeHtml(profile.year === "mba" ? "MBA" : (profile.year || "-")) + '</p></div></div>' +
    '<div class="admin-profile-kpis"><div><span>Tests Finished</span><strong>' + history.length + '</strong></div><div><span>Average</span><strong>' + (history.length ? average + '%' : '-') + '</strong></div><div><span>Best</span><strong>' + (history.length ? Math.max.apply(null, history.map((item) => item.percentage || 0)) + '%' : '-') + '</strong></div></div>' +
    '<h4>Company Tests</h4>' + (companyRows ? '<div class="table-scroll"><table class="history-table admin-profile-table"><thead><tr><th>Company</th><th>Score</th><th>Completed</th></tr></thead><tbody>' + companyRows + '</tbody></table></div>' : '<p class="admin-profile-empty">No company tests completed yet.</p>') +
    '<h4 class="admin-attempt-title">All Completed Tests</h4>' + (attempts || '<p class="admin-profile-empty">No tests completed yet.</p>');
  $("modal-admin-student").classList.remove("hidden");
}

function closeAdminStudentProfile() {
  $("modal-admin-student").classList.add("hidden");
}

function renderAiKey() {
  $("ai-api-key").value = lsGet(LS_AI_KEY, "");
}

function saveAiKey() {
  const key = $("ai-api-key").value.trim();
  if (!key) {
    localStorage.removeItem(LS_AI_KEY);
    showToast("AI key removed from this browser.", "info");
    return;
  }
  lsSet(LS_AI_KEY, key);
  showToast("AI key saved locally.", "success");
}

async function askAiCoach() {
  const key = $("ai-api-key").value.trim() || lsGet(LS_AI_KEY, "");
  const question = $("ai-prompt").value.trim();
  const response = $("ai-response");
  if (!key) { response.textContent = "Add a Gemini API key first. It stays in this browser only."; return; }
  if (!question) { response.textContent = "Ask the coach something about your preparation."; return; }
  const history = getHistory();
  const recent = history.slice(-5).map((item) => item.title + ": " + item.percentage + "%").join("; ") || "No attempts yet";
  response.textContent = "Coach is thinking...";
  $("ask-ai-btn").disabled = true;
  try {
    const res = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + encodeURIComponent(key), {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text: "You are a concise placement-test coach. Give practical steps, examples, and a small next action. User results: " + recent + ". User asks: " + question }] }] })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error && data.error.message ? data.error.message : "AI request failed");
    response.textContent = data.candidates[0].content.parts.map((part) => part.text).join("\n");
  } catch (error) {
    response.textContent = "Could not reach the AI coach. Check the API key and internet connection. " + error.message;
  } finally {
    $("ask-ai-btn").disabled = false;
  }
}

/* ============================================================
   TEST CONFIGURATIONS
   ============================================================ */
const CAT_META = {
  quantitative: { label: "Quantitative Aptitude", letter: "Q", cls: "icon-blue", desc: "Percentages, profit-loss, speed-time, work, ratios and more." },
  numerical:    { label: "Numerical Ability",     letter: "N", cls: "icon-green", desc: "Series, LCM-HCF, fractions, interest and quick calculation drills." },
  logical:      { label: "Logical Reasoning",     letter: "L", cls: "icon-purple", desc: "Series, syllogisms, blood relations, directions, clocks and puzzles." },
  verbal:       { label: "Verbal Ability",        letter: "V", cls: "icon-orange", desc: "Grammar, synonyms-antonyms, idioms, error spotting and narration." },
  technical:    { label: "Technical CS",          letter: "T", cls: "icon-blue", desc: "Java, Python, C/C++, OOP, DBMS, SQL, OS, networks, DSA and SE." }
};

const CATEGORY_TESTS = [
  { key: "quantitative", count: 10, minutes: 10 },
  { key: "numerical",    count: 8,  minutes: 8  },
  { key: "logical",      count: 12, minutes: 12 },
  { key: "verbal",       count: 10, minutes: 9  },
  { key: "technical",    count: 15, minutes: 18 }
];

const MIXED_TEST = {
  key: "mixed",
  title: "Full Round Mixed Mock",
  minutes: 28,
  sections: [
    { category: "quantitative", count: 5 },
    { category: "numerical", count: 3 },
    { category: "logical", count: 6 },
    { category: "verbal", count: 3 },
    { category: "technical", count: 8 }
  ]
};

const PRACTICE_MIX = [
  { category: "quantitative", count: 2 },
  { category: "numerical", count: 2 },
  { category: "logical", count: 2 },
  { category: "verbal", count: 2 },
  { category: "technical", count: 2 }
];

function mcqBank(category) {
  if (category === "technical") {
    return TECHNICAL_QUESTIONS.map((q) => Object.assign({}, q, { category: "technical" }));
  }
  const sub = APTITUDE_BANK[category];
  return sub ? sub.questions.map((q) => Object.assign({}, q, { category })) : [];
}

function buildSectionedQuestions(sections) {
  let out = [];
  sections.forEach((sec) => {
    out = out.concat(buildQuestions(mcqBank(sec.category), sec.count));
  });
  return shuffle(out);
}

function buildCompanyQuestions(co) {
  let out = [];
  co.sections.forEach((sec) => {
    const companyQuestions = (co.questionBank || []).filter((q) => q.category === sec.category);
    out = out.concat(buildQuestions(companyQuestions.concat(mcqBank(sec.category)), sec.count));
  });
  return shuffle(out);
}

/* ============================================================
   CATEGORY SCREEN
   ============================================================ */
function renderCategoryGrid() {
  const grid = $("category-grid");
  grid.innerHTML = "";
  CATEGORY_TESTS.forEach((cfg) => {
    const meta = CAT_META[cfg.key];
    const available = mcqBank(cfg.key).length;
    grid.appendChild(catCard(meta.label, meta.desc, meta.letter, meta.cls, [
      cfg.count + " Questions",
      cfg.minutes + " Minutes",
      available + " in Bank"
    ], () => startCategoryTest(cfg)));
  });
  grid.appendChild(catCard(
    MIXED_TEST.title,
    "Everything together - aptitude, reasoning, verbal and core CS in one timed round.",
    "M", "icon-orange",
    [MIXED_TEST.sections.reduce((a, s) => a + s.count, 0) + " Questions", MIXED_TEST.minutes + " Minutes"],
    () => startSectionedTest(MIXED_TEST.sections, MIXED_TEST.title, MIXED_TEST.minutes, { kind: "category", categoryId: "mixed" })
  ));
}

function catCard(title, desc, letter, cls, chips, onStart) {
  const card = document.createElement("div");
  card.className = "glass-card cat-card";
  card.innerHTML =
    '<div class="cat-card-head">' +
      '<span class="cat-icon ' + cls + '">' + letter + "</span>" +
      "<h4>" + escapeHtml(title) + "</h4>" +
    "</div>" +
    "<p>" + escapeHtml(desc) + "</p>" +
    '<div class="cat-meta">' + chips.map((c) => '<span class="meta-chip">' + escapeHtml(c) + "</span>").join("") + "</div>";
  const btn = document.createElement("button");
  btn.className = "btn btn-primary";
  btn.textContent = "Start Test";
  btn.addEventListener("click", onStart);
  card.appendChild(btn);
  return card;
}

/* ============================================================
   COMPANY SCREEN
   ============================================================ */
function difficultyClass(diff) {
  const d = diff.toLowerCase();
  if (d.startsWith("very")) return "vhard";
  if (d.startsWith("hard")) return "hard";
  if (d.startsWith("easy")) return "easy";
  return "medium";
}

const COMPANY_DOMAINS = {
  tcs: "tcs.com",
  infosys: "infosys.com",
  wipro: "wipro.com",
  accenture: "accenture.com",
  cognizant: "cognizant.com",
  capgemini: "capgemini.com",
  hcl: "hcltech.com",
  techmahindra: "techmahindra.com",
  deloitte: "deloitte.com",
  ibm: "ibm.com",
  zoho: "zoho.com",
  amazon: "amazon.com",
  microsoft: "microsoft.com",
  flipkart: "flipkart.com",
  oracle: "oracle.com",
  ltimindtree: "ltimindtree.com",
  hexaware: "hexaware.com",
  mphasis: "mphasis.com",
  persistent: "persistent.com",
  cgi: "cgi.com",
  thoughtworks: "thoughtworks.com"
};

const CUSTOM_COMPANY_MARKS = {
  sedin: { mark: "S", label: "Sedin mark" },
  luxmorai: { mark: "LX", label: "Luxmorai mark" },
  jilapha: { mark: "JI", label: "Jilapha mark" }
};

function companyLogoMarkup(co) {
  const customMark = CUSTOM_COMPANY_MARKS[co.id];
  if (customMark) {
    return '<span class="company-logo-custom" aria-label="' + customMark.label + '">' + customMark.mark + "</span>";
  }
  const domain = COMPANY_DOMAINS[co.id];
  if (!domain) return '<span class="company-logo-fallback">' + escapeHtml(co.initials) + "</span>";
  return '<img class="company-logo-image" src="https://www.google.com/s2/favicons?domain=' + domain + '&sz=128" alt="' + escapeHtml(co.name) + ' logo" loading="lazy" onerror="this.hidden=true;this.nextElementSibling.hidden=false">' +
    '<span class="company-logo-fallback" hidden>' + escapeHtml(co.initials) + "</span>";
}

function renderCompanyGrid() {
  const grid = $("company-grid");
  grid.innerHTML = "";
  COMPANIES.forEach((co) => {
    const mcqTotal = co.sections.reduce((a, s) => a + s.count, 0);
    const card = document.createElement("div");
    card.className = "glass-card company-card";
    card.innerHTML =
      '<span class="company-logo" style="background:linear-gradient(135deg,' + co.color + "," + co.color + 'cc)">' + companyLogoMarkup(co) + "</span>" +
      "<div><h4>" + escapeHtml(co.name) + "</h4>" +
      '<p class="company-tagline">' + escapeHtml(co.tagline) + "</p></div>" +
      '<div class="cat-meta"><span class="meta-chip">' + mcqTotal + " MCQs</span>" +
      '<span class="meta-chip">1 Coding Task</span>' +
      '<span class="meta-chip">' + (co.mcqDurationMin + co.programmingDurationMin) + " Min Total</span></div>" +
      '<div class="company-foot"><span class="diff-chip ' + difficultyClass(co.difficulty) + '">' + escapeHtml(co.difficulty) + "</span></div>";
    const btn = document.createElement("button");
    btn.className = "btn btn-outline";
    btn.textContent = "View Pattern";
    btn.addEventListener("click", () => openCompanyModal(co.id));
    card.appendChild(btn);
    grid.appendChild(card);
  });
}

function openCompanyModal(companyId) {
  const co = COMPANIES.find((c) => c.id === companyId);
  if (!co) return;
  pendingCompanyId = companyId;
  const plan = co.sections
    .map((s) => {
      const label = s.category === "technical" ? "Technical CS" : CAT_META[s.category].label;
      return "<li><strong>" + escapeHtml(label) + "</strong><span>" + s.count + " questions</span></li>";
    })
    .join("");
  $("company-modal-body").innerHTML =
    '<div class="problem-head"><h3>' + escapeHtml(co.name) + " Mock Test</h3>" +
    '<span class="diff-chip ' + difficultyClass(co.difficulty) + '">' + escapeHtml(co.difficulty) + "</span></div>" +
    '<p>' + escapeHtml(co.focusNote) + '</p>' +
    '<ul class="section-plan">' + plan + "</ul>" +
    '<ul class="section-plan">' +
      "<li><strong>MCQ Duration</strong><span>" + co.mcqDurationMin + " minutes</span></li>" +
      "<li><strong>Coding Section</strong><span>1 problem / " + co.programmingDurationMin + " minutes</span></li>" +
      "<li><strong>Scoring</strong><span>+1 per correct MCQ, no negative marking</span></li>" +
    "</ul>" +
    '<div class="disclaimer-banner" style="margin-block-start:6px"><strong>Previous-Test Pattern / Interview-Experience Based Practice Questions.</strong>Modelled on publicly reported patterns and candidate experiences. Not affiliated with or endorsed by ' + escapeHtml(co.name) + ".</div>";
  $("modal-company").classList.remove("hidden");
}

function closeCompanyModal() {
  $("modal-company").classList.add("hidden");
  pendingCompanyId = null;
}

function beginCompanyTest() {
  const id = pendingCompanyId;
  closeCompanyModal();
  if (!id) return;
  const co = COMPANIES.find((c) => c.id === id);
  startCompanyTest(co);
}

/* ============================================================
   SESSION LIFECYCLE
   ============================================================ */
function endSession() {
  if (session && session.timerId) clearInterval(session.timerId);
  session = null;
  window.onbeforeunload = null;
}

function baseSession(kind, title, questions, minutes, extra) {
  endSession();
  const sec = Math.round(minutes * 60);
  session = Object.assign({
    kind: kind,
    title: title,
    questions: questions,
    answers: new Array(questions.length).fill(null),
    marked: new Array(questions.length).fill(false),
    idx: 0,
    totalSec: sec,
    remainingSec: sec,
    timerId: null,
    startedAt: Date.now(),
    phase: "mcq",
    prog: null
  }, extra || {});

  window.onbeforeunload = (e) => {
    if (session && session.phase !== "done") {
      e.preventDefault();
      e.returnValue = "";
      return "";
    }
    return undefined;
  };
  return session;
}

function startTimer(onTick, onExpire) {
  session.timerId = setInterval(() => {
    session.remainingSec -= 1;
    onTick(session.remainingSec);
    if (session.remainingSec <= 0) {
      clearInterval(session.timerId);
      session.timerId = null;
      onExpire();
    }
  }, 1000);
  onTick(session.remainingSec);
}

function updateTimerDisplay(secLeft) {
  $("timer-text").textContent = formatClock(secLeft);
  const chip = $("timer-chip");
  chip.classList.toggle("danger", secLeft <= 20);
  chip.classList.toggle("warning", secLeft > 20 && secLeft <= 60);
}

/* ---------- Starters ---------- */
function startCategoryTest(cfg) {
  const meta = CAT_META[cfg.key];
  lastConfigRef = { type: "category", cfg: cfg };
  const qs = buildQuestions(mcqBank(cfg.key), cfg.count);
  baseSession("category", meta.label, qs, cfg.minutes, { categoryId: cfg.key });
  enterMcqPhase();
}

function startSectionedTest(sections, title, minutes, extra) {
  const qs = buildSectionedQuestions(sections);
  baseSession("category", title, qs, minutes, extra);
  enterMcqPhase();
}

function startPracticeTest() {
  lastConfigRef = { type: "practice" };
  const qs = buildSectionedQuestions(PRACTICE_MIX);
  baseSession("practice", "Quick Practice Mix", qs, 10, { categoryId: "practice" });
  enterMcqPhase();
  showToast("Practice test started. Good luck!", "info");
}

function startCompanyTest(co) {
  lastConfigRef = { type: "company", companyId: co.id };
  const qs = buildCompanyQuestions(co);
  const problem = pickRandom(PROGRAMMING_PROBLEMS, 1)[0];
  baseSession("company", co.name + " Mock Test", qs, co.mcqDurationMin + co.programmingDurationMin, {
    companyId: co.id,
    prog: {
      problem: problem,
      language: "java",
      evaluated: false,
      passedTests: 0,
      totalTests: problem.testCases.length
    }
  });
  enterMcqPhase();
  showToast(co.name + " mock started - MCQs first, then one coding task.", "info");
}

/* ============================================================
   MCQ PHASE
   ============================================================ */
function enterMcqPhase() {
  session.phase = "mcq";
  showScreen("screen-test");
  $("test-title").textContent = session.title;
  $("to-coding-btn").classList.toggle("hidden", session.kind !== "company");
  $("palette-sidebar").classList.remove("open");
  renderQuestion();
  renderPalette();
  startTimer(updateTimerDisplay, autoSubmitOnTimeout);
}

function autoSubmitOnTimeout() {
  updateTimerDisplay(0);
  if (session.phase === "mcq") {
    finalizeTest(true);
  } else if (session.phase === "code") {
    showToast("Time up! Finalizing your attempt.", "error");
    finalizeTest(true);
  }
}

function renderQuestion() {
  const i = session.idx;
  const q = session.questions[i];
  $("test-progress-label").textContent = "Question " + (i + 1) + " of " + session.questions.length;
  $("question-counter").textContent = "Q" + (i + 1);
  $("topic-chip").textContent = q.topic || "General";
  $("marked-flag").classList.toggle("hidden", !session.marked[i]);
  $("question-text").textContent = q.question;
  $("progress-fill").style.width = ((i + 1) / session.questions.length) * 100 + "%";

  const letters = ["A", "B", "C", "D"];
  const wrap = $("options-wrap");
  wrap.innerHTML = "";
  q.options.forEach((opt, oi) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "option-card" + (session.answers[i] === oi ? " selected" : "");
    b.innerHTML = '<span class="option-letter">' + letters[oi] + "</span><span>" + escapeHtml(opt) + "</span>";
    b.addEventListener("click", () => selectOption(oi));
    wrap.appendChild(b);
  });

  $("prev-btn").disabled = i === 0;
  $("next-btn").disabled = i === session.questions.length - 1;
  const markBtn = $("mark-btn");
  markBtn.textContent = session.marked[i] ? "Unmark Question" : "Mark for Review";

  renderPaletteStates();
}

function selectOption(oi) {
  session.answers[session.idx] = oi;
  renderQuestion();
}

function gotoQuestion(n) {
  if (n < 0 || n >= session.questions.length) return;
  session.idx = n;
  renderQuestion();
}

function renderPalette() {
  const grid = $("palette-grid");
  grid.innerHTML = "";
  session.questions.forEach((_, i) => {
    const b = document.createElement("button");
    b.className = "pal-btn";
    b.textContent = i + 1;
    b.addEventListener("click", () => gotoQuestion(i));
    grid.appendChild(b);
  });
  renderPaletteStates();
}

function renderPaletteStates() {
  const btns = $("palette-grid").children;
  for (let i = 0; i < btns.length; i++) {
    const b = btns[i];
    b.className = "pal-btn";
    if (i === session.idx) b.classList.add("current");
    if (session.marked[i]) b.classList.add("marked");
    else if (session.answers[i] !== null) b.classList.add("answered");
  }
}

function toggleMark() {
  session.marked[session.idx] = !session.marked[session.idx];
  renderQuestion();
}

function clearResponse() {
  session.answers[session.idx] = null;
  renderQuestion();
}

function proceedToCoding() {
  if (!session.prog) return;
  session.phase = "code";
  openCodeScreen("company");
}

/* ============================================================
   CODING PHASE / HUB
   ============================================================ */
function starterFor(lang) {
  return STARTER_CODE[lang];
}

function openCodingHub() {
  endSession();
  const problem = PROGRAMMING_PROBLEMS[Math.floor(Math.random() * PROGRAMMING_PROBLEMS.length)];
  session = {
    kind: "coding-hub",
    title: "Coding Challenge",
    phase: "code",
    timerId: null,
    prog: { problem: problem, language: "java", evaluated: false, passedTests: 0, totalTests: problem.testCases.length }
  };
  openCodeScreen("hub");
  showToast("Random problem loaded: " + problem.title, "info");
}

function openCodeScreen(mode) {
  const p = session.prog.problem;
  showScreen("screen-code");

  $("problem-title").textContent = p.title;
  const diffChip = $("problem-difficulty");
  diffChip.textContent = p.difficulty;
  diffChip.className = "diff-chip " + (p.difficulty === "Easy" ? "easy" : p.difficulty === "Medium" ? "medium" : "hard");
  $("problem-topics").innerHTML = p.topics.map((t) => '<span class="chip">' + escapeHtml(t) + "</span>").join("");
  $("problem-statement").textContent = p.statement;
  $("problem-input-format").textContent = p.inputFormat;
  $("problem-output-format").textContent = p.outputFormat;
  $("problem-examples").innerHTML = p.examples
    .map((ex) =>
      '<div class="example-item"><span>Input</span><pre>' + escapeHtml(ex.input) + "</pre>" +
      '<span style="margin-block-start:8px">Output</span><pre>' + escapeHtml(ex.output) + "</pre></div>")
    .join("");
  $("hints-list").innerHTML = p.hints.map((h) => "<li>" + escapeHtml(h) + "</li>").join("");
  $("hints-list").classList.add("hidden");
  $("hints-toggle").textContent = "Show Hints";

  $("back-to-questions-btn").classList.toggle("hidden", mode !== "company");

  const sel = $("language-select");
  sel.value = session.prog.language;
  loadEditorCode();

  $("output-console").textContent = "Run your code to see output here.";
  $("testcase-panel").classList.add("hidden");
  $("testcase-results").innerHTML = "";
  $("testcase-summary").textContent = "";
  setJudgeStatus("", "");

  const submitBtn = $("submit-code-btn");
  submitBtn.textContent = "Submit Code";
  submitBtn.classList.remove("btn-primary");
  submitBtn.classList.add("btn-success");
  submitBtn.disabled = false;
  $("run-code-btn").disabled = false;
}

function loadEditorCode() {
  const key = session.prog.problem.id + "_" + session.prog.language;
  if (!codeDrafts[key]) codeDrafts[key] = starterFor(session.prog.language);
  $("code-editor").value = codeDrafts[key];
}

function persistDraft() {
  const key = session.prog.problem.id + "_" + session.prog.language;
  codeDrafts[key] = $("code-editor").value;
}

function setJudgeStatus(text, cls) {
  const el = $("judge-status");
  el.textContent = text;
  el.className = "judge-status" + (cls ? " " + cls : "");
}

function normalizeOutput(s) {
  return String(s == null ? "" : s)
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((l) => l.replace(/[ \t]+$/, ""))
    .join("\n")
    .replace(/\n+$/, "");
}

async function pistonExecute(code, language, stdin) {
  const cfg = LANGUAGE_CONFIG[language];
  const controller = new AbortController();
  const killer = setTimeout(() => controller.abort(), 30000);
  try {
    const res = await fetch(PISTON_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        language: cfg.pistonLanguage,
        version: cfg.version,
        files: [{ name: cfg.fileName, content: code }],
        stdin: stdin
      }),
      signal: controller.signal
    });
    if (!res.ok) throw new Error("Judge service returned HTTP " + res.status);
    const data = await res.json();
    if (!data.run) throw new Error("Malformed response from judge service.");
    return data.run;
  } finally {
    clearTimeout(killer);
  }
}

async function runCode() {
  if (!session || !session.prog) return;
  persistDraft();
  const code = $("code-editor").value;
  const lang = session.prog.language;
  const sample = session.prog.problem.testCases[0];

  const btn = $("run-code-btn");
  btn.disabled = true;
  $("submit-code-btn").disabled = true;
  setJudgeStatus("Compiling & running...", "running");
  $("output-console").textContent = "Executing on sample input:\n" + sample.input + "\n\nPlease wait...";

  try {
    const run = await pistonExecute(code, lang, sample.input);
    let text = "--- Sample Input ---\n" + sample.input + "\n\n--- Program Output ---\n";
    text += normalizeOutput(run.stdout) || "(no stdout)";
    if (run.stderr && run.stderr.trim()) {
      text += "\n\n--- Stderr ---\n" + run.stderr.trim();
    }
    text += "\n\nExit code: " + run.code;
    if (run.signal) text += "  (signal: " + run.signal + ")";
    $("output-console").textContent = text;
    setJudgeStatus(run.code === 0 ? "Executed OK" : "Finished with exit code " + run.code, run.code === 0 ? "ok" : "err");
  } catch (err) {
    const msg = err.name === "AbortError" ? "Execution timed out (30s limit)." :
      "Could not reach the code execution service. Check your internet connection and try again.";
    $("output-console").textContent = msg + "\n\nDetails: " + err.message;
    setJudgeStatus("Execution failed", "err");
  } finally {
    btn.disabled = false;
    $("submit-code-btn").disabled = false;
  }
}

function renderTestCaseRows(results) {
  const panel = $("testcase-panel");
  const box = $("testcase-results");
  panel.classList.remove("hidden");
  box.innerHTML = "";
  results.forEach((r, i) => {
    const div = document.createElement("div");
    div.className = "tc-case " + (r.passed ? "passed" : "failed");
    div.innerHTML =
      '<div class="tc-case-header"><span class="tc-badge">' + (r.passed ? "Passed" : "Failed") + "</span>" +
      "Test Case " + (i + 1) + "</div>" +
      '<div class="tc-io">' +
        "<div><span>Input</span><pre>" + escapeHtml(r.input) + "</pre></div>" +
        "<div><span>Expected / Actual</span><pre>" + escapeHtml(r.expected) +
        "\n-----------------\n" + escapeHtml(r.actual === "" ? "(no output)" : r.actual) + "</pre></div>" +
      "</div>";
    box.appendChild(div);
  });
  const passed = results.filter((r) => r.passed).length;
  $("testcase-summary").textContent = passed + "/" + results.length + " passed";
  $("testcase-summary").style.color = passed === results.length ? "#4ade80" : "#fbbf24";
  return { passed: passed, total: results.length };
}

async function evaluateSubmission() {
  persistDraft();
  const code = $("code-editor").value;
  const lang = session.prog.language;
  const cases = session.prog.problem.testCases;

  $("run-code-btn").disabled = true;
  $("submit-code-btn").disabled = true;
  setJudgeStatus("Evaluating " + cases.length + " test cases...", "running");
  $("output-console").textContent = "Running all test cases, please wait...";

  try {
    const results = [];
    for (const tc of cases) {
      const run = await pistonExecute(code, lang, tc.input);
      const actual = normalizeOutput(run.stdout);
      results.push({
        input: tc.input,
        expected: tc.expectedOutput,
        actual: actual,
        passed: actual === normalizeOutput(tc.expectedOutput) && run.code === 0
      });
    }
    const tally = renderTestCaseRows(results);
    session.prog.evaluated = true;
    session.prog.passedTests = tally.passed;
    session.prog.totalTests = tally.total;

    $("output-console").textContent = "Evaluation complete. " + tally.passed + " of " + tally.total +
      " test cases passed.\nScroll down for detailed results.";
    setJudgeStatus(tally.passed === tally.total ? "All cases passed!" : tally.passed + "/" + tally.total + " passed",
      tally.passed === tally.total ? "ok" : "err");

    if (session.kind === "company") {
      const btn = $("submit-code-btn");
      btn.textContent = "Finish & View Results";
      btn.classList.remove("btn-success");
      btn.classList.add("btn-primary");
      btn.disabled = false;
    } else {
      saveHubAttempt(tally);
      $("run-code-btn").disabled = false;
      $("submit-code-btn").disabled = false;
    }
  } catch (err) {
    const msg = err.name === "AbortError" ? "Evaluation timed out." :
      "Could not reach the code execution service. Check your internet connection and retry.";
    $("output-console").textContent = msg + "\n\nDetails: " + err.message;
    setJudgeStatus("Evaluation failed", "err");
    $("run-code-btn").disabled = false;
    $("submit-code-btn").disabled = false;
  }
}

function saveHubAttempt(tally) {
  const pct = tally.total ? Math.round((tally.passed / tally.total) * 100) : 0;
  saveHistoryEntry({
    date: new Date().toISOString(),
    title: session.prog.problem.title,
    type: "Programming",
    total: tally.total,
    attempted: tally.total,
    correct: tally.passed,
    wrong: tally.total - tally.passed,
    unanswered: 0,
    score: tally.passed,
    maxScore: tally.total,
    percentage: pct,
    seconds: 0,
    cats: { aptitude: { c: 0, t: 0 }, technical: { c: 0, t: 0 }, programming: { c: tally.passed, t: tally.total } }
  });
  showToast(pct === 100 ? "Perfect! All test cases passed." : "Attempt saved - " + pct + "% test cases passed.", pct >= 50 ? "success" : "info");
}

/* ============================================================
   SUBMIT & RESULT COMPUTATION
   ============================================================ */
function openConfirmModal() {
  const attempted = session.answers.filter((a) => a !== null).length;
  const marked = session.marked.filter(Boolean).length;
  const left = session.questions.length - attempted;
  $("confirm-counts").innerHTML =
    "You have answered <strong>" + attempted + "</strong> of <strong>" + session.questions.length +
    "</strong> questions. Unanswered: <strong>" + left + "</strong>. Marked for review: <strong>" + marked + "</strong>." +
    "<br>Once submitted you will see the full analysis - this cannot be undone.";
  $("modal-confirm").classList.remove("hidden");
}

function computeResult(auto) {
  const qs = session.questions;
  let correct = 0, wrong = 0, unanswered = 0;
  const cats = {};
  const ensureCat = (k) => { if (!cats[k]) cats[k] = { c: 0, t: 0 }; };

  qs.forEach((q, i) => {
    const cat = q.category || "misc";
    ensureCat(cat);
    cats[cat].t += 1;
    if (session.answers[i] === null) unanswered += 1;
    else if (session.answers[i] === q.correctAnswer) { correct += 1; cats[cat].c += 1; }
    else wrong += 1;
  });

  const total = qs.length;
  const mcqPct = total ? Math.round((correct / total) * 100) : 0;

  let overallPct = mcqPct;
  let progPct = null;
  if (session.prog) {
    progPct = session.prog.totalTests ? Math.round((session.prog.passedTests / session.prog.totalTests) * 100) : 0;
    overallPct = Math.round(mcqPct * 0.8 + progPct * 0.2);
    cats.programming = { c: session.prog.passedTests, t: session.prog.totalTests };
  }

  const aptKeys = ["quantitative", "numerical", "logical", "verbal"];
  const agg = { aptitude: { c: 0, t: 0 }, technical: { c: 0, t: 0 } };
  aptKeys.forEach((k) => {
    if (cats[k]) { agg.aptitude.c += cats[k].c; agg.aptitude.t += cats[k].t; }
  });
  if (cats.technical) { agg.technical.c += cats.technical.c; agg.technical.t += cats.technical.t; }

  const seconds = Math.min(session.totalSec, Math.max(0, session.totalSec - session.remainingSec));

  return {
    date: new Date().toISOString(),
    title: session.title,
    type: session.kind === "company" ? "Company Mock" : session.kind === "practice" ? "Practice" : "Aptitude/Tech",
    companyId: session.companyId || null,
    total: total,
    attempted: correct + wrong,
    correct: correct,
    wrong: wrong,
    unanswered: unanswered,
    score: correct,
    maxScore: total,
    percentage: overallPct,
    mcqPercentage: mcqPct,
    seconds: seconds,
    autoSubmitted: !!auto,
    cats: {
      aptitude: agg.aptitude,
      technical: agg.technical,
      programming: cats.programming || { c: 0, t: 0 }
    },
    programming: session.prog ? { passed: session.prog.passedTests, total: session.prog.totalTests, pct: progPct } : null
  };
}

function finalizeTest(auto) {
  if (!session || session.phase === "done") return;
  if (session.timerId) clearInterval(session.timerId);
  session.phase = "done";

  const result = computeResult(auto);
  saveHistoryEntry(result);

  lastReviewData = session.questions.map((q, i) => ({
    q: q,
    given: session.answers[i],
    verdict: session.answers[i] === null ? "skipped" : (session.answers[i] === q.correctAnswer ? "correct" : "wrong")
  }));

  const retakeCfg = lastConfigRef;
  endSession();
  renderResult(result, retakeCfg);
}

/* ============================================================
   RESULT RENDERING
   ============================================================ */
function performanceMessage(pct) {
  if (pct >= 85) return "Outstanding! You are placement-ready - keep sharpening with company mocks.";
  if (pct >= 70) return "Excellent work! A little polish and you will be in the top bracket.";
  if (pct >= 50) return "Good effort! Review the explanations below and push past the 70% mark.";
  if (pct >= 35) return "Average showing. Focus on your weak sections and retake this test soon.";
  return "Needs improvement. Go through every explanation below carefully, then try again.";
}

function renderResult(res, retakeCfg) {
  showScreen("screen-result");

  $("result-percent").textContent = res.percentage + "%";
  $("result-title").textContent = res.autoSubmitted ? "Time Up - Test Auto-Submitted!" : "Test Completed!";
  $("performance-message").textContent = performanceMessage(res.percentage);

  const ring = $("result-ring");
  ring.style.strokeDashoffset = 327;
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      ring.style.strokeDashoffset = String(327 * (1 - res.percentage / 100));
      ring.className = "ring-value " + (res.percentage >= 70 ? "good" : res.percentage >= 45 ? "mid" : "bad");
    });
  });

  $("stat-total").textContent = res.total + (res.programming ? " MCQ" : "");
  $("stat-attempted").textContent = res.attempted;
  $("stat-correct").textContent = res.correct;
  $("stat-wrong").textContent = res.wrong;
  $("stat-unanswered").textContent = res.unanswered;
  $("stat-score").textContent = res.score + "/" + res.maxScore;
  $("stat-time").textContent = formatDuration(res.seconds);

  const pb = $("prog-breakdown");
  if (res.programming) {
    pb.innerHTML = "Programming Challenge: <strong>" + res.programming.passed + "/" + res.programming.total +
      "</strong> test cases passed (" + res.programming.pct + "%)." +
      " Overall % = MCQ " + res.mcqPercentage + "% x 0.8 + Coding " + res.programming.pct + "% x 0.2.";
    pb.classList.remove("hidden");
  } else {
    pb.classList.add("hidden");
  }

  const cb = $("category-bars");
  const labels = { aptitude: "Aptitude", technical: "Technical CS", programming: "Programming" };
  const fills = { aptitude: "f-blue", technical: "f-green", programming: "f-blue" };
  let rows = "";
  let any = false;
  Object.keys(labels).forEach((k) => {
    const c = res.cats[k];
    if (c && c.t > 0) {
      any = true;
      const pct = Math.round((c.c / c.t) * 100);
      rows += '<div class="cbar-row"><span>' + labels[k] + '</span>' +
        '<div class="cbar-track"><div class="cbar-fill ' + fills[k] + '" data-w="' + pct + '"></div></div>' +
        "<em>" + pct + "%</em></div>";
    }
  });
  if (any) {
    $("category-bars-body").innerHTML = rows;
    cb.classList.remove("hidden");
    setTimeout(() => {
      document.querySelectorAll("#category-bars-body .cbar-fill").forEach((el) => {
        el.style.width = el.dataset.w + "%";
      });
    }, 80);
  } else {
    cb.classList.add("hidden");
  }

  renderReview("all");

  const retakeBtn = $("retake-btn");
  retakeBtn.onclick = () => {
    if (!retakeCfg) { showToast("Nothing to retake.", "info"); return; }
    if (retakeCfg.type === "category" && retakeCfg.cfg && retakeCfg.cfg.key) {
      if (retakeCfg.cfg.key === "mixed") startSectionedTest(MIXED_TEST.sections, MIXED_TEST.title, MIXED_TEST.minutes, { kind: "category", categoryId: "mixed" });
      else startCategoryTest(retakeCfg.cfg);
    } else if (retakeCfg.type === "company") {
      const co = COMPANIES.find((c) => c.id === retakeCfg.companyId);
      if (co) startCompanyTest(co);
    } else if (retakeCfg.type === "practice") {
      startPracticeTest();
    }
  };
}

function renderReview(filter) {
  const list = $("review-list");
  list.innerHTML = "";
  if (!lastReviewData) return;

  const letters = ["A", "B", "C", "D"];
  lastReviewData.forEach((item, i) => {
    if (filter !== "all" && item.verdict !== filter) return;
    const q = item.q;
    const statusLabel = item.verdict === "correct" ? "Correct" : item.verdict === "wrong" ? "Wrong" : "Skipped";
    const div = document.createElement("div");
    div.className = "review-item " + item.verdict;

    let html = '<div class="rev-top"><span class="rev-num">Q' + (i + 1) + "</span>" +
      '<span class="rev-status s-' + item.verdict + '">' + statusLabel + "</span>" +
      (q.topic ? '<span class="topic-chip">' + escapeHtml(q.topic) + "</span>" : "") + "</div>" +
      '<p class="rev-q">' + escapeHtml(q.question) + "</p>";

    if (item.given !== null) {
      const givenText = q.options[item.given];
      if (item.verdict === "correct") {
        html += '<p class="rev-answer">Your answer: <span class="ans-correct">' + letters[item.given] + ". " + escapeHtml(givenText) + "</span></p>";
      } else {
        html += '<p class="rev-answer">Your answer: <span class="ans-user-wrong">' + letters[item.given] + ". " + escapeHtml(givenText) + "</span></p>" +
          '<p class="rev-answer">Correct answer: <span class="ans-correct">' + letters[q.correctAnswer] + ". " + escapeHtml(q.options[q.correctAnswer]) + "</span></p>";
      }
    } else {
      html += '<p class="rev-answer">Your answer: <b>Not attempted</b></p>' +
        '<p class="rev-answer">Correct answer: <span class="ans-correct">' + letters[q.correctAnswer] + ". " + escapeHtml(q.options[q.correctAnswer]) + "</span></p>";
    }

    if (q.explanation) {
      html += '<div class="rev-explain"><strong>Explanation:</strong> ' + escapeHtml(q.explanation) + "</div>";
    }
    div.innerHTML = html;
    list.appendChild(div);
  });

  if (!list.children.length) {
    list.innerHTML = '<div class="glass-card empty-state" style="padding:30px"><p>No questions in this bucket.</p></div>';
  }
}

/* ============================================================
   DASHBOARD
   ============================================================ */
function renderDashboard() {
  const hist = getHistory();
  $("dash-welcome").textContent = "Welcome back, " + currentUser + "!";
  const empty = hist.length === 0;
  $("dash-empty").classList.toggle("hidden", !empty);
  $("dash-content").classList.toggle("hidden", empty);
  if (empty) return;

  const pcts = hist.map((h) => h.percentage || 0);
  const avg = Math.round(pcts.reduce((a, b) => a + b, 0) / hist.length);
  const best = Math.max.apply(null, pcts);
  const totalTime = hist.reduce((a, h) => a + (h.seconds || 0), 0);

  $("kpi-completed").textContent = hist.length;
  $("kpi-average").textContent = avg + "%";
  $("kpi-best").textContent = best + "%";
  $("kpi-time").textContent = formatDuration(totalTime);

  const sums = { aptitude: { c: 0, t: 0 }, technical: { c: 0, t: 0 }, programming: { c: 0, t: 0 } };
  hist.forEach((h) => {
    ["aptitude", "technical", "programming"].forEach((k) => {
      if (h.cats && h.cats[k]) {
        sums[k].c += h.cats[k].c || 0;
        sums[k].t += h.cats[k].t || 0;
      }
    });
  });

  [["aptitude", "bar-aptitude", "label-aptitude"], ["technical", "bar-technical", "label-technical"], ["programming", "bar-programming", "label-programming"]]
    .forEach(([key, barId, labelId]) => {
      const s = sums[key];
      const pct = s.t ? Math.round((s.c / s.t) * 100) : 0;
      $(barId).style.width = (s.t ? pct : 0) + "%";
      $(labelId).textContent = s.t ? pct + "%" : "-";
    });

  const tbody = $("history-tbody");
  tbody.innerHTML = "";
  hist.slice().reverse().slice(0, 8).forEach((h) => {
    const tr = document.createElement("tr");
    const chip = h.percentage >= 40
      ? '<span class="pass-chip">Pass</span>'
      : '<span class="fail-chip">Needs Work</span>';
    tr.innerHTML =
      "<td>" + fmtDate(h.date) + "</td>" +
      "<td>" + escapeHtml(h.title) + "</td>" +
      '<td><span class="type-chip">' + escapeHtml(h.type) + "</span></td>" +
      "<td>" + h.score + "/" + h.maxScore + "</td>" +
      "<td><strong>" + h.percentage + "%</strong></td>" +
      "<td>" + chip + "</td>";
    tbody.appendChild(tr);
  });
}

function resetMyData() {
  if (!currentUser) return;
  if (!confirm("This deletes ALL your test history permanently. Continue?")) return;
  lsSet(histKey(currentUser), []);
  renderDashboard();
  showToast("Your history has been reset.", "success");
}

/* ============================================================
   EVENT WIRING
   ============================================================ */
function wireEvents() {
  /* Auth tabs + forms */
  $("tab-login").addEventListener("click", () => switchAuthTab("login"));
  $("tab-register").addEventListener("click", () => switchAuthTab("register"));
  $("login-form").addEventListener("submit", loginUser);
  $("register-form").addEventListener("submit", registerUser);
  $("register-name").addEventListener("input", updateGeneratedUsername);
  $("register-year").addEventListener("change", updateGeneratedUsername);
  $("register-department").addEventListener("change", toggleOtherDepartment);
  $("reset-form").addEventListener("submit", resetPassword);
  $("forgot-password-btn").addEventListener("click", showResetForm);
  $("back-to-login-btn").addEventListener("click", () => switchAuthTab("login"));

  /* Theme + logout + mobile menu */
  $("theme-toggle").addEventListener("click", () => {
    const cur = document.documentElement.getAttribute("data-theme");
    applyTheme(cur === "dark" ? "light" : "dark");
  });
  $("logout-btn").addEventListener("click", logoutUser);
  $("mobile-menu-btn").addEventListener("click", () => $("header-nav").classList.toggle("open"));

  /* Global nav + action buttons (event delegation) */
  document.addEventListener("click", (e) => {
    const authFocus = e.target.closest("[data-auth-focus]");
    if (authFocus) { setAuthFocus(authFocus.dataset.authFocus); return; }
    const career = e.target.closest("[data-career]");
    if (career) { setCareerFocus(career.dataset.career); return; }
    const nav = e.target.closest("[data-nav]");
    if (nav) { e.preventDefault(); navigate(nav.dataset.nav); return; }
    const act = e.target.closest("[data-action]");
    if (!act) return;
    const action = act.dataset.action;
    if (action === "start-test") navigate("categories");
    if (action === "company-tests") navigate("companies");
    if (action === "practice-test") startPracticeTest();
    if (action === "coding-challenge") openCodingHub();
  });

  /* Category + company screens are rendered dynamically */

  /* Company modal */
  $("company-modal-cancel").addEventListener("click", closeCompanyModal);
  $("company-modal-start").addEventListener("click", beginCompanyTest);
  $("modal-company").addEventListener("click", (e) => {
    if (e.target === $("modal-company")) closeCompanyModal();
  });

  /* Test controls */
  $("prev-btn").addEventListener("click", () => gotoQuestion(session.idx - 1));
  $("next-btn").addEventListener("click", () => gotoQuestion(session.idx + 1));
  $("mark-btn").addEventListener("click", toggleMark);
  $("clear-btn").addEventListener("click", clearResponse);
  $("to-coding-btn").addEventListener("click", proceedToCoding);
  $("submit-side-btn").addEventListener("click", openConfirmModal);
  $("palette-toggle").addEventListener("click", () => {
    $("palette-sidebar").scrollIntoView({ behavior: "smooth", block: "start" });
  });

  /* Confirm modal */
  $("confirm-cancel").addEventListener("click", () => $("modal-confirm").classList.add("hidden"));
  $("confirm-submit").addEventListener("click", () => {
    $("modal-confirm").classList.add("hidden");
    finalizeTest(false);
  });
  $("modal-confirm").addEventListener("click", (e) => {
    if (e.target === $("modal-confirm")) $("modal-confirm").classList.add("hidden");
  });
  $("admin-student-close").addEventListener("click", closeAdminStudentProfile);
  $("modal-admin-student").addEventListener("click", (e) => {
    if (e.target === $("modal-admin-student")) closeAdminStudentProfile();
  });

  /* Coding controls */
  $("language-select").addEventListener("change", (e) => {
    session.prog.language = e.target.value;
    loadEditorCode();
    showToast("Editor switched to " + e.target.options[e.target.selectedIndex].text + ".", "info", 1800);
  });
  $("reset-code-btn").addEventListener("click", () => {
    delete codeDrafts[session.prog.problem.id + "_" + session.prog.language];
    loadEditorCode();
    showToast("Code reset to starter template.", "info", 2000);
  });
  $("run-code-btn").addEventListener("click", runCode);
  $("submit-code-btn").addEventListener("click", () => {
    if (!session.prog.evaluated) evaluateSubmission();
    else if (session.kind === "company") finalizeTest(false);
    else evaluateSubmission();
  });
  $("back-to-questions-btn").addEventListener("click", () => {
    session.phase = "mcq";
    showScreen("screen-test");
    renderQuestion();
    renderPaletteStates();
  });
  $("hints-toggle").addEventListener("click", () => {
    const list = $("hints-list");
    const isOpen = !list.classList.contains("hidden");
    list.classList.toggle("hidden");
    $("hints-toggle").textContent = isOpen ? "Show Hints" : "Hide Hints";
  });

  /* Editor tab-key support */
  $("code-editor").addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const ta = e.target;
      const start = ta.selectionStart;
      ta.value = ta.value.slice(0, start) + "    " + ta.value.slice(ta.selectionEnd);
      ta.selectionStart = ta.selectionEnd = start + 4;
    }
  });

  /* Review filters */
  document.querySelectorAll(".review-filter").forEach((b) => {
    b.addEventListener("click", () => {
      document.querySelectorAll(".review-filter").forEach((x) => x.classList.remove("active"));
      b.classList.add("active");
      renderReview(b.dataset.filter);
    });
  });

  /* Result actions */
  $("go-dashboard-btn").addEventListener("click", () => navigate("dashboard"));
  $("go-home-btn").addEventListener("click", () => navigate("home"));

  /* Dashboard */
  $("clear-history-btn").addEventListener("click", resetMyData);
  $("save-ai-key-btn").addEventListener("click", saveAiKey);
  $("ask-ai-btn").addEventListener("click", askAiCoach);
  $("ai-prompt").addEventListener("keydown", (e) => {
    if (e.key === "Enter") askAiCoach();
  });
  $("admin-refresh-btn").addEventListener("click", renderAdmin);

  /* Keyboard shortcuts during MCQ phase */
  document.addEventListener("keydown", (e) => {
    if (!session || session.phase !== "mcq") return;
    if ($("screen-test").classList.contains("hidden")) return;
    const tag = (e.target.tagName || "").toLowerCase();
    if (tag === "input" || tag === "textarea" || tag === "select") return;
    if (["1", "2", "3", "4"].indexOf(e.key) !== -1) {
      selectOption(parseInt(e.key, 10) - 1);
    } else if (e.key === "ArrowRight") {
      gotoQuestion(session.idx + 1);
    } else if (e.key === "ArrowLeft") {
      gotoQuestion(session.idx - 1);
    }
  });
}

/* ============================================================
   INIT
   ============================================================ */
function init() {
  initTheme();
  wireEvents();

  const totalQuestions =
    QUANTITATIVE_APTITUDE.length + NUMERICAL_ABILITY.length +
    LOGICAL_REASONING.length + VERBAL_ABILITY.length + TECHNICAL_QUESTIONS.length;
  $("stat-questions").textContent = totalQuestions + "+";
  $("stat-problems").textContent = PROGRAMMING_PROBLEMS.length;
  $("stat-companies").textContent = COMPANIES.length;

  renderCategoryGrid();
  renderCompanyGrid();
  renderAiKey();

  if (!tryResumeSession()) {
    showScreen("screen-login");
  }
}

document.addEventListener("DOMContentLoaded", init);
