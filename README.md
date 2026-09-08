# PlacementPro - Company Placement Test Portal

A complete, responsive online assessment platform built with **pure HTML5, CSS3 and Vanilla JavaScript** - no frameworks, no build tools. Practice aptitude MCQs, technical CS questions and real coding challenges, or attempt full company-pattern mocks (TCS, Infosys, Amazon, etc.).

> All content is **Previous-Test Pattern / Interview-Experience Based Practice Questions**, modelled on publicly reported patterns and candidate experiences. This project is not affiliated with, sponsored by or endorsed by any listed company.

---

## File Structure

```
placement-test-portal/
├── index.html            # Single-page app shell (all screens)
├── style.css             # Dark/light theme, glassmorphism UI
├── script.js             # App logic (auth, exam engine, coding judge, results)
├── data/
│   ├── aptitude.js       # 15 Quant + 15 Numerical + 30 Logical + 20 Verbal
│   ├── technical.js      # 50 CS MCQs (Java/Python/C/C++/OOP/DBMS/SQL/OS/CN/DSA/SE)
│   ├── programming.js    # 30 coding problems with real test cases + starter code
│   └── companies.js      # 12 company mock-test configurations
└── README.md
```

## Features

- Demo login/register (localStorage only)
- Category tests: Quantitative, Numerical, Logical, Verbal, Technical + Full Mixed Mock
- Company mock tests for 12 companies with section-wise pattern breakdowns
- Exam engine: countdown timer with auto-submit, progress bar, question palette,
  mark-for-review, clear response, keyboard shortcuts (1-4 to answer, arrows to navigate)
- Randomized question selection AND randomized options on every attempt
  (correct answer is re-mapped automatically after shuffling)
- Programming section: code editor with Java / Python / C / C++ starter templates,
  Run Code, Submit Code, per-test-case Passed/Failed results
  (executed through the free public Piston API - internet required for coding)
- Result page: score ring, attempted/correct/wrong/unanswered stats, time taken,
  performance message, colour-coded review with explanations and filters
- Dashboard: tests completed, average/best score, time practised,
  category performance bars, recent history
- AI Study Coach: ask Gemini for a personalised revision plan using recent scores
- Admin overview: inspect all local users, attempts, averages and latest activity
- Dark/light theme toggle, fully responsive down to mobile

## How to Run

**Option A - VS Code Live Server (recommended)**
1. Open the `placement-test-portal` folder in VS Code.
2. Install the *Live Server* extension if you don't have it.
3. Right-click `index.html` -> "Open with Live Server".

**Option B - any static server**
```bash
cd placement-test-portal
python -m http.server 5500
# open http://localhost:5500
```

**Option C - double-click** `index.html`. Everything works from the file system too;
only the coding judge needs an internet connection.

Register with your full name, register number, phone, department, year and password. The username is generated automatically from your name and year, for example `Hariharan` in year 4 becomes `hariharan04`. Data stays in your browser.

### AI Study Coach

Open Dashboard, paste a Gemini API key into the AI Study Coach card, save it, and ask a preparation question. The key is stored only in this browser under `pp_ai_key`; use a backend proxy and environment variable before deploying publicly because browser-side API keys can be inspected.

### Admin Demo

Log in with `admin` / `intel@123` to open the Admin tab. It aggregates the users and histories stored in this browser's localStorage. Students can use `Forgot password?` to set a new password for an existing local account. Admin password reset is intentionally disabled in the student screen. This is useful for a local demo only; it is not server-side authentication or multi-device analytics. Replace the demo credentials and add a real backend authorization layer for production.

## How to Add New Questions

Open the relevant file in `data/` and append an object following the existing format:

```js
{
  question: "Your question text here?",
  options: ["Option A", "Option B", "Option C", "Option D"],  // exactly 4
  correctAnswer: 2,        // INDEX of the correct option (0-based)
  explanation: "Why this answer is right.",
  topic: "Percentages"     // free-form label shown as a chip
}
```

- Aptitude categories -> `data/aptitude.js` (`QUANTITATIVE_APTITUDE`, `NUMERICAL_ABILITY`, `LOGICAL_REASONING`, `VERBAL_ABILITY`)
- Technical MCQs -> `data/technical.js` (`TECHNICAL_QUESTIONS`)
- Coding problems -> `data/programming.js` (`PROGRAMMING_PROBLEMS`) with `testCases: [{ input, expectedOutput }]`
  where `input` is the exact stdin text and `expectedOutput` the exact stdout.
- No other changes are needed - grids, counters and randomization pick up new items automatically.

## How to Add a New Company

Open `data/companies.js` and append one object to `COMPANIES`:

```js
{
  id: "oracle",                    // unique id
  name: "Oracle",
  fullName: "Oracle Corporation",
  initials: "OR",                  // shown in the logo tile
  color: "#c74634",                // brand hex colour
  difficulty: "Moderate",
  tagline: "One-line description",
  focusNote: "What the reported pattern emphasises.",
  sections: [                      // counts are pulled from the banks
    { category: "quantitative", count: 5 },   // quantitative|numerical|logical|verbal|technical
    { category: "technical", count: 8 }
  ],
  mcqDurationMin: 35,
  programmingCount: 1,
  programmingDurationMin: 12
}
```

Keep each `count` at or below the bank size for that category
(Quantitative 15, Numerical 15, Logical 30, Verbal 20, Technical 50).

## Notes

- Code execution uses `https://emkc.org/api/v2/piston/execute` (free Piston API).
  MCQ tests work fully offline; coding needs connectivity.
- All user data (accounts, scores, history, theme) lives in localStorage under `pp_*` keys.
  Use the "Reset My Data" button on the dashboard to clear your history.
