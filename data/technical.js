/* ============================================================
   PlacementPro - Technical MCQ Bank (50 questions)
   Topics: Java, Python, C, C++, OOP, DBMS, SQL,
           Operating Systems, Computer Networks, DSA, SE
   ============================================================ */

const TECHNICAL_QUESTIONS = [
  /* ---------- JAVA ---------- */
  {
    question: "Which of the following is NOT a principle of Object-Oriented Programming?",
    options: ["Encapsulation", "Polymorphism", "Compilation", "Inheritance"],
    correctAnswer: 2,
    explanation: "Encapsulation, polymorphism, inheritance (and abstraction) are OOP principles. Compilation is a build process, not an OOP principle.",
    topic: "Java"
  },
  {
    question: "What is the primary role of the JVM in Java?",
    options: ["It converts .java source files into bytecode", "It converts bytecode into machine-specific instructions at runtime", "It only manages heap memory", "It translates Java programs directly into C"],
    correctAnswer: 1,
    explanation: "The javac compiler produces bytecode (.class). The JVM interprets/JIT-compiles that bytecode into native machine code for its platform.",
    topic: "Java"
  },
  {
    question: "What does this print?\nString s = \"hello\";\ns.concat(\" world\");\nSystem.out.println(s);",
    options: ["hello world", "hello", "world", "Compilation error"],
    correctAnswer: 1,
    explanation: "Strings are immutable in Java. concat() returns a new String which is discarded here, so 'hello' is printed.",
    topic: "Java"
  },
  {
    question: "What is the default access level of a class member in Java when no modifier is written?",
    options: ["public", "protected", "private", "Package-private (visible within the same package)"],
    correctAnswer: 3,
    explanation: "With no modifier, members are visible only inside their own package - known as package-private or default access.",
    topic: "Java"
  },
  {
    question: "How many null keys can a standard java.util.HashMap contain?",
    options: ["Zero", "Exactly one", "Unlimited", "Two"],
    correctAnswer: 1,
    explanation: "HashMap permits exactly one null key (stored in bucket 0). Hashtable and TreeMap do not allow any null key.",
    topic: "Java"
  },
  {
    question: "When does the finally block in Java execute?",
    options: ["Only when an exception is thrown", "Only when no exception occurs", "Whenever the try block is entered, regardless of exceptions (except System.exit)", "Only when the catch block is missing"],
    correctAnswer: 2,
    explanation: "finally executes after try/catch whether or not an exception occurred - it is skipped only if the JVM exits (e.g., System.exit()).",
    topic: "Java"
  },

  /* ---------- PYTHON ---------- */
  {
    question: "Which of these built-in Python types is immutable?",
    options: ["list", "dict", "set", "tuple"],
    correctAnswer: 3,
    explanation: "Tuples cannot be modified after creation. Lists, dicts and sets are mutable.",
    topic: "Python"
  },
  {
    question: "What is the output of: print(type(10 / 2))",
    options: ["<class 'int'>", "<class 'float'>", "<class 'double'>", "TypeError"],
    correctAnswer: 1,
    explanation: "The '/' operator always performs true division in Python 3 and returns a float.",
    topic: "Python"
  },
  {
    question: "Inside a Python function definition, *args collects extra positional arguments as a:",
    options: ["dictionary", "list", "tuple", "string"],
    correctAnswer: 2,
    explanation: "*args packs surplus positional arguments into a tuple; **kwargs would pack keyword arguments into a dict.",
    topic: "Python"
  },
  {
    question: "What does d.get('key') return when 'key' is not present in dictionary d?",
    options: ["Raises KeyError", "None", "0", "False"],
    correctAnswer: 1,
    explanation: "dict.get() returns None by default (or the supplied fallback value); only d['key'] raises KeyError.",
    topic: "Python"
  },
  {
    question: "Which is the correct way to create an EMPTY SET in Python?",
    options: ["s = {}", "s = set()", "s = []", "s = ()"],
    correctAnswer: 1,
    explanation: "{} creates an empty dictionary; set() creates an empty set.",
    topic: "Python"
  },

  /* ---------- C ---------- */
  {
    question: "What does this C snippet print?\nint arr[5] = {1,2,3,4,5};\nprintf(\"%d\", *(arr + 2));",
    options: ["2", "3", "4", "Address of arr"],
    correctAnswer: 1,
    explanation: "arr decays to a pointer; arr + 2 points to the third element, so *(arr+2) = 3.",
    topic: "C"
  },
  {
    question: "In C, what does malloc() return when it fails to allocate memory?",
    options: ["A zero-filled block", "NULL", "A garbage pointer that must still be freed", "-1"],
    correctAnswer: 1,
    explanation: "On failure malloc returns NULL. Good practice is to check the returned pointer before use.",
    topic: "C"
  },
  {
    question: "How are strings represented and terminated in C?",
    options: ["By a newline character at the end", "By an EOF flag stored with the string", "As char arrays ending with the null character '\\0'", "By a length field before the first character"],
    correctAnswer: 2,
    explanation: "A C string is a char array whose last character is the terminator '\\0'.",
    topic: "C"
  },
  {
    question: "What is the default initial value of an uninitialized GLOBAL int variable in C?",
    options: ["-1", "Garbage value", "0", "Depends on the compiler flags"],
    correctAnswer: 2,
    explanation: "Global (static-storage) variables live in the BSS segment and are zero-initialised automatically.",
    topic: "C"
  },

  /* ---------- C++ ---------- */
  {
    question: "In C++, which of the following CANNOT be overloaded?",
    options: ["The + operator", "The destructor (~ClassName)", "The function call operator ()", "The constructor"],
    correctAnswer: 1,
    explanation: "A class may have one destructor only; it takes no parameters, so it cannot be overloaded. Operators and even constructors can be overloaded.",
    topic: "C++"
  },
  {
    question: "std::cout is an object of which class?",
    options: ["istream", "ostream", "iostream", "fstream"],
    correctAnswer: 1,
    explanation: "cout is an instance of ostream (output stream); cin is an instance of istream.",
    topic: "C++"
  },
  {
    question: "Declaring a member function as virtual enables:",
    options: ["Compile-time polymorphism", "Runtime polymorphism through base-class pointers", "Automatic memory management", "Static binding of calls"],
    correctAnswer: 1,
    explanation: "Virtual functions are resolved via the vtable at runtime, letting base-class pointers invoke derived-class overrides.",
    topic: "C++"
  },
  {
    question: "What does the inline keyword request from the compiler in C++?",
    options: ["That the function always run faster at runtime", "Substitution of the function body at each call site to reduce call overhead", "That the function become virtual", "Dynamic allocation of the function's locals"],
    correctAnswer: 1,
    explanation: "inline is a request to expand the function body inline instead of performing a normal call; modern compilers use it mainly to allow header definitions.",
    topic: "C++"
  },

  /* ---------- OOP ---------- */
  {
    question: "Abstraction in OOP refers to:",
    options: ["Hiding internal implementation details and exposing only essential features", "Bundling data and methods into one unit", "Acquiring properties of another class", "Creating multiple forms of one method"],
    correctAnswer: 0,
    explanation: "Abstraction shows WHAT an object does while hiding HOW it does it (e.g., driving a car without knowing engine internals).",
    topic: "OOP"
  },
  {
    question: "Inheritance primarily promotes:",
    options: ["Data hiding", "Code reusability", "Memory optimisation", "Compile-time polymorphism"],
    correctAnswer: 1,
    explanation: "Derived classes reuse fields and methods of base classes, reducing duplicated code.",
    topic: "OOP"
  },
  {
    question: "Function/method overloading is an example of:",
    options: ["Runtime polymorphism", "Compile-time polymorphism", "Dynamic dispatch", "Message passing"],
    correctAnswer: 1,
    explanation: "Overloads are resolved by the compiler using signatures at compile time (static binding). Overriding is the runtime form.",
    topic: "OOP"
  },
  {
    question: "Encapsulation is best implemented by:",
    options: ["Declaring every member public", "Keeping data private and exposing behaviour through public getters/setters", "Using deep class hierarchies", "Writing global helper functions"],
    correctAnswer: 1,
    explanation: "Private state plus controlled public access protects an object's internals from invalid external modification.",
    topic: "OOP"
  },
  {
    question: "Which statement about interfaces (Java/C# style) is TRUE?",
    options: ["A class can inherit from multiple concrete classes", "A class can implement multiple interfaces", "Interfaces store per-object state", "Interfaces cannot declare method signatures"],
    correctAnswer: 1,
    explanation: "Interfaces support multiple type-inheritance: a class may implement several interfaces while extending only one class.",
    topic: "OOP"
  },

  /* ---------- DBMS ---------- */
  {
    question: "Which key uniquely identifies every row of a table and cannot contain NULL?",
    options: ["Foreign key", "Candidate key", "Primary key", "Alternate key"],
    correctAnswer: 2,
    explanation: "A primary key is the chosen unique, non-null identifier of a relation. Foreign keys reference other tables.",
    topic: "DBMS"
  },
  {
    question: "In the ACID properties of transactions, the letter D stands for:",
    options: ["Dependency", "Durability", "Determinism", "Distribution"],
    correctAnswer: 1,
    explanation: "Durability guarantees that once committed, changes survive crashes. ACID = Atomicity, Consistency, Isolation, Durability.",
    topic: "DBMS"
  },
  {
    question: "The main purpose of normalization in DBMS is to:",
    options: ["Encrypt sensitive columns", "Reduce data redundancy and prevent update anomalies", "Guarantee faster queries in all cases", "Compress tables on disk"],
    correctAnswer: 1,
    explanation: "Normal forms organise relations to eliminate redundancy and insert/update/delete anomalies.",
    topic: "DBMS"
  },
  {
    question: "First Normal Form (1NF) requires that:",
    options: ["There are no transitive dependencies", "Every column holds atomic (indivisible) values", "There is no partial dependency on composite keys", "Every table has exactly one row"],
    correctAnswer: 1,
    explanation: "1NF demands atomic attribute values - no repeating groups or multi-valued cells. 2NF and 3NF address the other options.",
    topic: "DBMS"
  },

  /* ---------- SQL ---------- */
  {
    question: "Which SQL keyword removes duplicate rows from a SELECT result?",
    options: ["UNIQUE", "DISTINCT", "FILTER", "EXCEPT"],
    correctAnswer: 1,
    explanation: "SELECT DISTINCT returns only distinct combinations of the selected columns.",
    topic: "SQL"
  },
  {
    question: "Which clause filters rows AFTER aggregation with GROUP BY?",
    options: ["WHERE", "HAVING", "ORDER BY", "LIMIT"],
    correctAnswer: 1,
    explanation: "WHERE filters input rows before grouping; HAVING filters the aggregated groups afterwards.",
    topic: "SQL"
  },
  {
    question: "Which aggregate counts ALL rows of a table, including rows where some column is NULL?",
    options: ["COUNT(column_name)", "COUNT(*)", "COUNT(DISTINCT column_name)", "SUM(*)"],
    correctAnswer: 1,
    explanation: "COUNT(*) counts whole rows. COUNT(column) skips NULLs in that column.",
    topic: "SQL"
  },
  {
    question: "Which statement about TRUNCATE TABLE compared with DELETE FROM is TRUE?",
    options: ["TRUNCATE supports a WHERE clause", "DELETE automatically resets identity seeds", "TRUNCATE removes all rows quickly and usually resets identity counters", "TRUNCATE fires row-level triggers by default"],
    correctAnswer: 2,
    explanation: "TRUNCATE deallocates pages without logging individual row deletes - fast, table-wide, no WHERE clause - and typically reseeds identity columns.",
    topic: "SQL"
  },
  {
    question: "Which JOIN returns ONLY the rows with matching values in both tables?",
    options: ["LEFT OUTER JOIN", "FULL OUTER JOIN", "INNER JOIN", "CROSS JOIN"],
    correctAnswer: 2,
    explanation: "INNER JOIN keeps matched pairs; outer joins additionally keep unmatched rows from one or both sides.",
    topic: "SQL"
  },
  {
    question: "Without any keyword, ORDER BY salary sorts the result:",
    options: ["In descending order", "In ascending order", "In random order", "By row insertion order"],
    correctAnswer: 1,
    explanation: "ASC is the implicit default direction for ORDER BY.",
    topic: "SQL"
  },

  /* ---------- OPERATING SYSTEMS ---------- */
  {
    question: "Which of the following is NOT one of the four necessary conditions for deadlock?",
    options: ["Mutual exclusion", "Circular wait", "Preemption", "Hold and wait"],
    correctAnswer: 2,
    explanation: "The four conditions are mutual exclusion, hold and wait, NO preemption, and circular wait. Preemption actually breaks deadlocks.",
    topic: "Operating Systems"
  },
  {
    question: "FCFS CPU scheduling is known to suffer from the:",
    options: ["Convoy effect, where short jobs wait behind one long job", "Problem of starvation of long processes", "Deadlock of the ready queue", "Priority inversion bug"],
    correctAnswer: 0,
    explanation: "In First-Come-First-Served, one long process makes everything queued behind it wait - the classic convoy effect.",
    topic: "Operating Systems"
  },
  {
    question: "Thrashing in an operating system means:",
    options: ["The CPU running kernel code continuously", "Excessive paging activity leaving little time for real work", "Physical failure of the disk head", "Safe concurrent sharing of memory"],
    correctAnswer: 1,
    explanation: "When working sets exceed physical RAM, the system page-faults constantly and throughput collapses - called thrashing.",
    topic: "Operating Systems"
  },
  {
    question: "The two fundamental operations on a semaphore are:",
    options: ["open() and close()", "wait() (P) and signal() (V)", "lock() and free()", "commit() and rollback()"],
    correctAnswer: 1,
    explanation: "Semaphores are manipulated atomically via wait/P (decrement, possibly block) and signal/V (increment, possibly wake).",
    topic: "Operating Systems"
  },

  /* ---------- COMPUTER NETWORKS ---------- */
  {
    question: "Which statement about TCP and UDP is TRUE?",
    options: ["UDP guarantees ordered delivery", "TCP is connection-oriented and reliable, while UDP is connectionless", "TCP is generally faster than UDP for bulk transfer", "UDP establishes a connection using a three-way handshake"],
    correctAnswer: 1,
    explanation: "TCP provides handshaking, ordering, retransmission and flow control; UDP just sends datagrams with minimal overhead.",
    topic: "Computer Networks"
  },
  {
    question: "What is the default port used by HTTPS?",
    options: ["21", "8080", "443", "25"],
    correctAnswer: 2,
    explanation: "HTTPS runs HTTP over TLS on TCP port 443. Port 80 is plain HTTP; 21 is FTP.",
    topic: "Computer Networks"
  },
  {
    question: "At which OSI layer does IP routing take place?",
    options: ["Data Link layer", "Network layer", "Transport layer", "Session layer"],
    correctAnswer: 1,
    explanation: "Layer 3 (Network) handles logical addressing and routing; switches dominate Layer 2 and TCP lives at Layer 4.",
    topic: "Computer Networks"
  },
  {
    question: "The primary job of DNS is to:",
    options: ["Assign MAC addresses to hosts", "Resolve human-readable domain names into IP addresses", "Encrypt traffic between browsers and servers", "Route packets between autonomous systems"],
    correctAnswer: 1,
    explanation: "DNS maps names like example.com to IP addresses so applications do not need to remember numeric addresses.",
    topic: "Computer Networks"
  },

  /* ---------- DATA STRUCTURES ---------- */
  {
    question: "A stack follows the ____ discipline and a queue follows the ____ discipline.",
    options: ["FIFO, LIFO", "LIFO, FIFO", "LIFO, LIFO", "FIFO, FIFO"],
    correctAnswer: 1,
    explanation: "Stacks are Last-In-First-Out (push/pop at one end); queues are First-In-First-Out (enqueue rear, dequeue front).",
    topic: "Data Structures"
  },
  {
    question: "An INORDER traversal of a Binary Search Tree visits nodes in:",
    options: ["Level-by-level order", "Descending sorted order", "Ascending sorted order", "Insertion order"],
    correctAnswer: 2,
    explanation: "Left subtree -> node -> right subtree yields keys in ascending order in a BST.",
    topic: "Data Structures"
  },
  {
    question: "What is the average-case time complexity of a search in a well-designed hash table?",
    options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
    correctAnswer: 3,
    explanation: "With a good hash function and low load factor, lookups take constant time on average; worst case degrades to O(n).",
    topic: "Data Structures"
  },
  {
    question: "The WORST-case time complexity of Quick Sort is:",
    options: ["O(n log n)", "O(n^2)", "O(n)", "O(log n)"],
    correctAnswer: 1,
    explanation: "Bad pivots (e.g., sorted input with first-element pivot) produce maximally unbalanced partitions giving O(n^2); average case is O(n log n).",
    topic: "Data Structures"
  },
  {
    question: "Breadth-First Search (BFS) of a graph uses which auxiliary data structure?",
    options: ["Stack", "Queue", "Min-heap", "Disjoint set"],
    correctAnswer: 1,
    explanation: "BFS explores level by level using a FIFO queue; DFS uses a stack or recursion.",
    topic: "Data Structures"
  },
  {
    question: "Inserting a new node at the HEAD of a singly linked list takes:",
    options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
    correctAnswer: 0,
    explanation: "Only two pointer updates are needed regardless of list length, so it is constant time.",
    topic: "Data Structures"
  },

  /* ---------- SOFTWARE ENGINEERING ---------- */
  {
    question: "Which phase normally comes FIRST in the classical SDLC waterfall model?",
    options: ["Coding", "Testing", "Requirement analysis and specification", "Deployment and maintenance"],
    correctAnswer: 2,
    explanation: "Waterfall flows Requirements -> Design -> Implementation -> Testing -> Deployment -> Maintenance.",
    topic: "Software Engineering"
  },
  {
    question: "Good software design strives for ______ coupling and ______ cohesion.",
    options: ["High, low", "Low, high", "High, high", "Low, low"],
    correctAnswer: 1,
    explanation: "Modules should be independent (low coupling) yet strongly focused on a single purpose internally (high cohesion).",
    topic: "Software Engineering"
  }
];
