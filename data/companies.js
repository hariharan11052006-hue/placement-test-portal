/* ============================================================
   PlacementPro - Company Mock Test Configurations

   All question sets are built from the public banks using each
   company's commonly REPORTED test pattern (number of sections,
   question mix and timing as described by past candidates in
   publicly available interview experiences).

   These are PRACTICE tests modelled on previous-year patterns.
   They are NOT leaked papers and are NOT affiliated with or
   endorsed by any company.
   ============================================================ */

const COMPANY_DISCLAIMER =
  "Previous-Test Pattern / Interview-Experience Based Practice Questions. " +
  "PlacementPro is an independent practice platform and is not affiliated with, " +
  "sponsored by or endorsed by any company listed here.";

const COMPANIES = [
  {
    id: "tcs",
    name: "TCS",
    fullName: "Tata Consultancy Services",
    initials: "TC",
    color: "#0d47a1",
    difficulty: "Moderate",
    tagline: "NQT-style aptitude + coding round",
    focusNote: "Commonly reported pattern: foundation section with quant, reasoning and verbal followed by one coding task.",
    sections: [
      { category: "quantitative", count: 6 },
      { category: "numerical", count: 5 },
      { category: "logical", count: 7 },
      { category: "verbal", count: 6 },
      { category: "technical", count: 8 }
    ],
    mcqDurationMin: 42,
    programmingCount: 1,
    programmingDurationMin: 15
  },
  {
    id: "infosys",
    name: "Infosys",
    fullName: "Infosys Limited",
    initials: "IN",
    color: "#007cc3",
    difficulty: "Moderate-Hard",
    tagline: "Reasoning-heavy online test",
    focusNote: "Reported pattern emphasises logical puzzles and arithmetic with a moderate coding problem.",
    sections: [
      { category: "quantitative", count: 5 },
      { category: "numerical", count: 4 },
      { category: "logical", count: 8 },
      { category: "verbal", count: 6 },
      { category: "technical", count: 7 }
    ],
    mcqDurationMin: 40,
    programmingCount: 1,
    programmingDurationMin: 15
  },
  {
    id: "wipro",
    name: "Wipro",
    fullName: "Wipro Technologies",
    initials: "WI",
    color: "#6b2fa0",
    difficulty: "Easy-Moderate",
    tagline: "Balanced ELITE-style pattern",
    focusNote: "Reported pattern: evenly weighted aptitude sections plus automata-style basic coding.",
    sections: [
      { category: "quantitative", count: 5 },
      { category: "numerical", count: 4 },
      { category: "logical", count: 6 },
      { category: "verbal", count: 5 },
      { category: "technical", count: 6 }
    ],
    mcqDurationMin: 36,
    programmingCount: 1,
    programmingDurationMin: 12
  },
  {
    id: "accenture",
    name: "Accenture",
    fullName: "Accenture plc",
    initials: "AC",
    color: "#a100ff",
    difficulty: "Moderate",
    tagline: "Cognitive + technical assessment",
    focusNote: "Reported pattern: cognitive aptitude mix followed by fundamentals of programming and networking.",
    sections: [
      { category: "quantitative", count: 5 },
      { category: "numerical", count: 3 },
      { category: "logical", count: 6 },
      { category: "verbal", count: 5 },
      { category: "technical", count: 8 }
    ],
    mcqDurationMin: 38,
    programmingCount: 1,
    programmingDurationMin: 12
  },
  {
    id: "cognizant",
    name: "Cognizant",
    fullName: "Cognizant Technology Solutions",
    initials: "CO",
    color: "#006cd0",
    difficulty: "Moderate",
    tagline: "GenC-style aptitude + code",
    focusNote: "Reported GenC pattern: quant, reasoning, verbal plus CS fundamentals and one easy coding task.",
    sections: [
      { category: "quantitative", count: 5 },
      { category: "numerical", count: 4 },
      { category: "logical", count: 6 },
      { category: "verbal", count: 5 },
      { category: "technical", count: 7 }
    ],
    mcqDurationMin: 36,
    programmingCount: 1,
    programmingDurationMin: 12
  },
  {
    id: "capgemini",
    name: "Capgemini",
    fullName: "Capgemini SE",
    initials: "CA",
    color: "#0070ad",
    difficulty: "Moderate",
    tagline: "Game-based aptitude + coding",
    focusNote: "Reported pattern: numerical and logical emphasis with pseudocode/technical MCQs and one coding exercise.",
    sections: [
      { category: "quantitative", count: 5 },
      { category: "numerical", count: 4 },
      { category: "logical", count: 5 },
      { category: "verbal", count: 4 },
      { category: "technical", count: 9 }
    ],
    mcqDurationMin: 35,
    programmingCount: 1,
    programmingDurationMin: 12
  },
  {
    id: "hcl",
    name: "HCL",
    fullName: "HCL Technologies",
    initials: "HC",
    color: "#0086b3",
    difficulty: "Easy-Moderate",
    tagline: "Standard service-company pattern",
    focusNote: "Reported pattern: balanced sections with straightforward CS fundamentals questions.",
    sections: [
      { category: "quantitative", count: 4 },
      { category: "numerical", count: 4 },
      { category: "logical", count: 6 },
      { category: "verbal", count: 5 },
      { category: "technical", count: 7 }
    ],
    mcqDurationMin: 34,
    programmingCount: 1,
    programmingDurationMin: 12
  },
  {
    id: "techmahindra",
    name: "Tech Mahindra",
    fullName: "Tech Mahindra Limited",
    initials: "TM",
    color: "#e30613",
    difficulty: "Easy-Moderate",
    tagline: "Aptitude + essay/coding hybrid",
    focusNote: "Reported pattern: verbal-inclusive aptitude mix with a simple programming task at the end.",
    sections: [
      { category: "quantitative", count: 5 },
      { category: "numerical", count: 3 },
      { category: "logical", count: 6 },
      { category: "verbal", count: 6 },
      { category: "technical", count: 6 }
    ],
    mcqDurationMin: 34,
    programmingCount: 1,
    programmingDurationMin: 12
  },
  {
    id: "deloitte",
    name: "Deloitte",
    fullName: "Deloitte Touche Tohmatsu",
    initials: "DE",
    color: "#26890d",
    difficulty: "Moderate",
    tagline: "Consulting-style aptitude screen",
    focusNote: "Reported pattern: strong verbal and quant screening with database/analytics-flavoured technicals.",
    sections: [
      { category: "quantitative", count: 5 },
      { category: "numerical", count: 3 },
      { category: "logical", count: 5 },
      { category: "verbal", count: 6 },
      { category: "technical", count: 7 }
    ],
    mcqDurationMin: 33,
    programmingCount: 1,
    programmingDurationMin: 12
  },
  {
    id: "ibm",
    name: "IBM",
    fullName: "International Business Machines",
    initials: "IB",
    color: "#054ada",
    difficulty: "Hard",
    tagline: "Cognitive ability + coding round",
    focusNote: "Reported pattern: tricky reasoning series/quants plus deeper CS fundamentals.",
    sections: [
      { category: "quantitative", count: 4 },
      { category: "numerical", count: 4 },
      { category: "logical", count: 7 },
      { category: "verbal", count: 5 },
      { category: "technical", count: 8 }
    ],
    mcqDurationMin: 37,
    programmingCount: 1,
    programmingDurationMin: 14
  },
  {
    id: "zoho",
    name: "Zoho",
    fullName: "Zoho Corporation",
    initials: "ZO",
    color: "#d84315",
    difficulty: "Hard",
    tagline: "Coding-intensive selection",
    focusNote: "Reported pattern: shorter MCQ stage but a demanding programming-focused evaluation.",
    sections: [
      { category: "quantitative", count: 4 },
      { category: "numerical", count: 3 },
      { category: "logical", count: 5 },
      { category: "verbal", count: 4 },
      { category: "technical", count: 12 }
    ],
    mcqDurationMin: 38,
    programmingCount: 1,
    programmingDurationMin: 18
  },
  {
    id: "amazon",
    name: "Amazon",
    fullName: "Amazon Web Services / India",
    initials: "AM",
    color: "#ff9900",
    difficulty: "Very Hard",
    tagline: "CS-fundamentals heavy screen",
    focusNote: "Reported pattern: leadership-free online screen with data structures, algorithms and CS core MCQs.",
    sections: [
      { category: "quantitative", count: 4 },
      { category: "numerical", count: 2 },
      { category: "logical", count: 5 },
      { category: "verbal", count: 4 },
      { category: "technical", count: 13 }
    ],
    mcqDurationMin: 40,
    programmingCount: 1,
    programmingDurationMin: 20
  },
  {
    id: "microsoft",
    name: "Microsoft",
    fullName: "Microsoft Corporation",
    initials: "MS",
    color: "#107c10",
    difficulty: "Hard",
    tagline: "DSA + CS fundamentals screen",
    focusNote: "Practice pattern inspired by publicly reported coding screens, arrays, strings and core CS topics.",
    sections: [{ category: "logical", count: 5 }, { category: "verbal", count: 3 }, { category: "technical", count: 10 }],
    questionBank: [
      { category: "technical", topic: "Data Structures", question: "Which data structure gives average O(1) lookup by key?", options: ["Hash table", "Linked list", "Binary heap", "Stack"], correctAnswer: 0, explanation: "A well-sized hash table provides average constant-time lookup." },
      { category: "technical", topic: "Algorithms", question: "Which traversal of a binary search tree visits values in sorted order?", options: ["Preorder", "Inorder", "Postorder", "Level order"], correctAnswer: 1, explanation: "Inorder traversal visits left subtree, root and right subtree." },
      { category: "logical", topic: "Series", question: "What comes next: 3, 6, 12, 24, ?", options: ["36", "42", "48", "54"], correctAnswer: 2, explanation: "Each term is doubled." }
    ],
    mcqDurationMin: 34,
    programmingCount: 1,
    programmingDurationMin: 20
  },
  {
    id: "flipkart",
    name: "Flipkart",
    fullName: "Flipkart Internet Private Limited",
    initials: "FK",
    color: "#2874f0",
    difficulty: "Hard",
    tagline: "E-commerce engineering practice",
    focusNote: "Practice pattern inspired by reported product-company screens with SQL, DSA and problem solving.",
    sections: [{ category: "quantitative", count: 4 }, { category: "logical", count: 5 }, { category: "technical", count: 10 }],
    questionBank: [
      { category: "technical", topic: "SQL", question: "Which SQL clause filters groups after aggregation?", options: ["WHERE", "HAVING", "ORDER BY", "LIMIT"], correctAnswer: 1, explanation: "HAVING filters grouped rows after aggregate functions are applied." },
      { category: "technical", topic: "Complexity", question: "Binary search on a sorted array runs in which time complexity?", options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"], correctAnswer: 1, explanation: "Each comparison halves the remaining search range." },
      { category: "quantitative", topic: "Percentages", question: "A price rises from 400 to 500. What is the percentage increase?", options: ["20%", "25%", "30%", "40%"], correctAnswer: 1, explanation: "The increase is 100, and 100/400 is 25%." }
    ],
    mcqDurationMin: 34,
    programmingCount: 1,
    programmingDurationMin: 20
  },
  {
    id: "oracle",
    name: "Oracle",
    fullName: "Oracle Corporation",
    initials: "OR",
    color: "#c74634",
    difficulty: "Moderate-Hard",
    tagline: "Database + Java fundamentals",
    focusNote: "Practice pattern inspired by publicly shared Oracle placement experiences and database-heavy interviews.",
    sections: [{ category: "quantitative", count: 4 }, { category: "verbal", count: 4 }, { category: "technical", count: 10 }],
    questionBank: [
      { category: "technical", topic: "DBMS", question: "What is the main purpose of a database index?", options: ["Encrypt data", "Speed up retrieval", "Remove duplicates", "Create backups"], correctAnswer: 1, explanation: "Indexes improve lookup speed at the cost of storage and write overhead." },
      { category: "technical", topic: "Java", question: "Which Java keyword prevents a class from being inherited?", options: ["static", "final", "private", "sealed"], correctAnswer: 1, explanation: "A final class cannot be extended." },
      { category: "verbal", topic: "Grammar", question: "Choose the correctly spelled word.", options: ["Accomodate", "Acommodate", "Accommodate", "Acomodate"], correctAnswer: 2, explanation: "The correct spelling is accommodate." }
    ],
    mcqDurationMin: 34,
    programmingCount: 1,
    programmingDurationMin: 16
  },
  {
    id: "ltimindtree",
    name: "LTIMindtree",
    fullName: "LTIMindtree Limited",
    initials: "LT",
    color: "#1d428a",
    difficulty: "Moderate",
    tagline: "Balanced aptitude + technical round",
    focusNote: "Practice pattern inspired by reported service-company assessments with aptitude, pseudocode and coding.",
    sections: [{ category: "quantitative", count: 5 }, { category: "logical", count: 6 }, { category: "verbal", count: 4 }, { category: "technical", count: 7 }],
    questionBank: [
      { category: "logical", topic: "Coding Logic", question: "What is the output of a counter initialized to 0 and incremented five times?", options: ["0", "4", "5", "6"], correctAnswer: 2, explanation: "Five increments from zero produce five." },
      { category: "technical", topic: "OOP", question: "Which OOP feature allows one interface with multiple implementations?", options: ["Encapsulation", "Polymorphism", "Composition", "Compilation"], correctAnswer: 1, explanation: "Polymorphism lets the same interface represent different implementations." },
      { category: "quantitative", topic: "Averages", question: "The average of 10 and 20 is:", options: ["10", "15", "20", "30"], correctAnswer: 1, explanation: "(10 + 20) / 2 = 15." }
    ],
    mcqDurationMin: 32,
    programmingCount: 1,
    programmingDurationMin: 14
  },
  {
    id: "softsquare",
    name: "Softsquare",
    fullName: "Softsquare Solutions",
    initials: "SS",
    color: "#0f766e",
    difficulty: "Moderate",
    tagline: "Aptitude + web development practice",
    focusNote: "Original practice set based on commonly reported service-company screening topics: aptitude, JavaScript and SQL.",
    sections: [{ category: "quantitative", count: 5 }, { category: "logical", count: 5 }, { category: "technical", count: 8 }],
    questionBank: [
      { category: "technical", topic: "JavaScript", question: "Which JavaScript method creates a new array by transforming every element?", options: ["filter", "map", "reduce", "find"], correctAnswer: 1, explanation: "map returns a new array containing the transformed values." },
      { category: "technical", topic: "SQL", question: "Which SQL command is used to modify existing rows?", options: ["ALTER", "UPDATE", "INSERT", "CREATE"], correctAnswer: 1, explanation: "UPDATE changes values in existing records." },
      { category: "logical", topic: "Number Series", question: "What comes next: 2, 5, 10, 17, ?", options: ["24", "25", "26", "28"], correctAnswer: 2, explanation: "The differences are 3, 5, 7, so the next difference is 9." }
    ],
    mcqDurationMin: 30,
    programmingCount: 1,
    programmingDurationMin: 12
  },
  {
    id: "jilapha",
    name: "Jilapha",
    fullName: "Jilapha Technologies",
    initials: "JI",
    color: "#7c3aed",
    difficulty: "Moderate",
    tagline: "Software trainee placement practice",
    focusNote: "Original practice set covering programming basics, reasoning and communication-focused aptitude.",
    sections: [{ category: "quantitative", count: 5 }, { category: "verbal", count: 5 }, { category: "technical", count: 8 }],
    questionBank: [
      { category: "technical", topic: "Programming", question: "Which loop is best suited when the number of iterations is known before execution?", options: ["for loop", "while loop", "do-while loop", "recursive loop"], correctAnswer: 0, explanation: "A for loop clearly expresses initialization, condition and update." },
      { category: "technical", topic: "OOP", question: "Hiding internal implementation details is called:", options: ["Inheritance", "Abstraction", "Overloading", "Casting"], correctAnswer: 1, explanation: "Abstraction exposes essential behavior while hiding implementation details." },
      { category: "verbal", topic: "Vocabulary", question: "Choose the closest meaning of 'precise'.", options: ["Exact", "Delayed", "Doubtful", "Frequent"], correctAnswer: 0, explanation: "Precise means exact or accurate." }
    ],
    mcqDurationMin: 30,
    programmingCount: 1,
    programmingDurationMin: 12
  },
  {
    id: "sedin",
    name: "Sedin",
    fullName: "Sedin Technologies",
    initials: "SE",
    color: "#2563eb",
    difficulty: "Moderate-Hard",
    tagline: "Engineering + problem-solving screen",
    focusNote: "Original practice set based on public software-engineering assessment themes: APIs, SQL and data structures.",
    sections: [{ category: "logical", count: 6 }, { category: "quantitative", count: 4 }, { category: "technical", count: 9 }],
    questionBank: [
      { category: "technical", topic: "APIs", question: "Which HTTP method is conventionally used to retrieve a resource?", options: ["POST", "GET", "PATCH", "DELETE"], correctAnswer: 1, explanation: "GET requests retrieve data without modifying the resource." },
      { category: "technical", topic: "Data Structures", question: "Which structure follows FIFO order?", options: ["Stack", "Queue", "Tree", "Graph"], correctAnswer: 1, explanation: "A queue removes items in the order they were added." },
      { category: "logical", topic: "Arrangement", question: "If A is taller than B and B is taller than C, who is shortest?", options: ["A", "B", "C", "Cannot determine"], correctAnswer: 2, explanation: "The transitive ordering is A > B > C." }
    ],
    mcqDurationMin: 32,
    programmingCount: 1,
    programmingDurationMin: 14
  },
  {
    id: "luxmorai",
    name: "Luxmorai",
    fullName: "Luxmorai Technologies",
    initials: "LX",
    color: "#be123c",
    difficulty: "Moderate",
    tagline: "Modern software hiring practice",
    focusNote: "Original practice set for modern software roles with logic, programming and database fundamentals.",
    sections: [{ category: "quantitative", count: 5 }, { category: "logical", count: 5 }, { category: "technical", count: 8 }],
    questionBank: [
      { category: "technical", topic: "Databases", question: "A primary key in a relational table must be:", options: ["Nullable", "Unique and non-null", "A text value", "A foreign key"], correctAnswer: 1, explanation: "A primary key uniquely identifies each row and cannot be null." },
      { category: "technical", topic: "Testing", question: "Unit testing usually focuses on:", options: ["A single component", "The entire production network", "User billing only", "Server hardware"], correctAnswer: 0, explanation: "Unit tests isolate and verify a small unit of code." },
      { category: "quantitative", topic: "Ratios", question: "If boys:girls is 2:3 and there are 20 boys, how many girls are there?", options: ["25", "30", "35", "40"], correctAnswer: 1, explanation: "One ratio part is 10, so 3 parts represent 30 girls." }
    ],
    mcqDurationMin: 30,
    programmingCount: 1,
    programmingDurationMin: 12
  },
  {
    id: "hexaware",
    name: "Hexaware",
    fullName: "Hexaware Technologies",
    initials: "HX",
    color: "#0891b2",
    difficulty: "Moderate",
    tagline: "Digital engineering assessment",
    focusNote: "Original practice set covering aptitude, cloud basics and programming fundamentals.",
    sections: [{ category: "quantitative", count: 5 }, { category: "logical", count: 5 }, { category: "technical", count: 8 }],
    questionBank: [
      { category: "technical", topic: "Cloud", question: "Which model provides virtual machines and networks on demand?", options: ["IaaS", "SaaS", "DBaaS", "FaaS only"], correctAnswer: 0, explanation: "Infrastructure as a Service provides virtualized compute and networking resources." },
      { category: "technical", topic: "Programming", question: "What is the purpose of a compiler?", options: ["Store passwords", "Translate source code", "Connect a monitor", "Create a database"], correctAnswer: 1, explanation: "A compiler translates source code into executable or intermediate code." },
      { category: "logical", topic: "Analogy", question: "Book is to reading as fork is to:", options: ["Writing", "Eating", "Painting", "Driving"], correctAnswer: 1, explanation: "A fork is commonly used for eating." }
    ],
    mcqDurationMin: 30,
    programmingCount: 1,
    programmingDurationMin: 12
  },
  {
    id: "mphasis",
    name: "Mphasis",
    fullName: "Mphasis Limited",
    initials: "MP",
    color: "#1e40af",
    difficulty: "Moderate",
    tagline: "Service engineering placement mock",
    focusNote: "Original practice set based on common aptitude, pseudocode and CS fundamentals assessment areas.",
    sections: [{ category: "quantitative", count: 5 }, { category: "verbal", count: 4 }, { category: "technical", count: 9 }],
    questionBank: [
      { category: "technical", topic: "Pseudocode", question: "What does a boolean variable usually store?", options: ["Only true or false", "Any decimal", "A file path", "A table"], correctAnswer: 0, explanation: "Boolean values represent two logical states: true and false." },
      { category: "technical", topic: "Operating Systems", question: "Which component manages processes and memory?", options: ["Compiler", "Operating system", "Browser", "Text editor"], correctAnswer: 1, explanation: "The operating system manages hardware resources and processes." },
      { category: "verbal", topic: "Grammar", question: "Choose the correct sentence.", options: ["She have a laptop.", "She has a laptop.", "She having laptop.", "She have laptoped."], correctAnswer: 1, explanation: "The singular subject 'she' takes 'has'." }
    ],
    mcqDurationMin: 31,
    programmingCount: 1,
    programmingDurationMin: 12
  },
  {
    id: "persistent",
    name: "Persistent",
    fullName: "Persistent Systems",
    initials: "PS",
    color: "#0369a1",
    difficulty: "Moderate-Hard",
    tagline: "Product engineering practice",
    focusNote: "Original practice set focused on algorithms, object-oriented design and SQL fundamentals.",
    sections: [{ category: "logical", count: 5 }, { category: "quantitative", count: 4 }, { category: "technical", count: 10 }],
    questionBank: [
      { category: "technical", topic: "Algorithms", question: "Which sorting algorithm has average O(n log n) complexity?", options: ["Bubble sort", "Merge sort", "Linear search", "Selection of one item"], correctAnswer: 1, explanation: "Merge sort runs in O(n log n) time in its average and worst cases." },
      { category: "technical", topic: "OOP", question: "A child class receiving behavior from a parent class uses:", options: ["Inheritance", "Indexing", "Serialization", "Tokenization"], correctAnswer: 0, explanation: "Inheritance allows a derived class to reuse parent behavior." },
      { category: "logical", topic: "Syllogism", question: "All testers are engineers. Ravi is a tester. Therefore Ravi is:", options: ["A designer", "An engineer", "A manager", "Unknown"], correctAnswer: 1, explanation: "Ravi belongs to the set of testers, which is contained in engineers." }
    ],
    mcqDurationMin: 34,
    programmingCount: 1,
    programmingDurationMin: 15
  },
  {
    id: "cgi",
    name: "CGI",
    fullName: "CGI Inc.",
    initials: "CG",
    color: "#b91c1c",
    difficulty: "Moderate",
    tagline: "Consulting technology placement mock",
    focusNote: "Original practice set covering communication, quantitative reasoning and enterprise technology basics.",
    sections: [{ category: "quantitative", count: 5 }, { category: "verbal", count: 5 }, { category: "technical", count: 8 }],
    questionBank: [
      { category: "technical", topic: "Networking", question: "What does DNS primarily translate?", options: ["Domain names to IP addresses", "Code to machine language", "Images to text", "SQL to HTML"], correctAnswer: 0, explanation: "DNS resolves human-readable domain names to IP addresses." },
      { category: "technical", topic: "Security", question: "Which practice adds a second verification step during login?", options: ["Caching", "Multi-factor authentication", "Compression", "Indexing"], correctAnswer: 1, explanation: "MFA requires an additional factor beyond a password." },
      { category: "verbal", topic: "Comprehension", question: "A concise answer is one that is:", options: ["Brief and clear", "Long and repetitive", "Unrelated", "Unfinished"], correctAnswer: 0, explanation: "Concise communication is brief while preserving the key meaning." }
    ],
    mcqDurationMin: 30,
    programmingCount: 1,
    programmingDurationMin: 12
  },
  {
    id: "thoughtworks",
    name: "Thoughtworks",
    fullName: "Thoughtworks, Inc.",
    initials: "TW",
    color: "#dc2626",
    difficulty: "Hard",
    tagline: "Problem-solving and engineering craft",
    focusNote: "Original practice set inspired by public engineering hiring themes: algorithms, testing and clean code.",
    sections: [{ category: "logical", count: 6 }, { category: "technical", count: 12 }],
    questionBank: [
      { category: "technical", topic: "Clean Code", question: "A function that does one clearly defined job follows which principle?", options: ["Single responsibility", "Global state", "Tight coupling", "Duplicate logic"], correctAnswer: 0, explanation: "Single responsibility keeps a unit focused on one reason to change." },
      { category: "technical", topic: "Testing", question: "A test that checks several components together is usually called:", options: ["Unit test", "Integration test", "Syntax test", "Visual asset"], correctAnswer: 1, explanation: "Integration tests verify interactions between components." },
      { category: "logical", topic: "Patterns", question: "What comes next: 1, 4, 9, 16, ?", options: ["20", "24", "25", "32"], correctAnswer: 2, explanation: "These are consecutive squares: 1, 4, 9, 16, 25." }
    ],
    mcqDurationMin: 34,
    programmingCount: 1,
    programmingDurationMin: 16
  }
];
