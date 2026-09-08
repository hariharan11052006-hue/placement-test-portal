/* ============================================================
   PlacementPro - Aptitude Question Bank
   Categories: quantitative, numerical, logical, verbal
   Format: { question, options[4], correctAnswer(index), explanation, topic }
   ============================================================ */

const QUANTITATIVE_APTITUDE = [
  {
    question: "If 20% of a number is 50, what is 30% of the same number?",
    options: ["75", "60", "80", "65"],
    correctAnswer: 0,
    explanation: "Let the number be x. 0.20x = 50 gives x = 250. Then 30% of 250 = 75.",
    topic: "Percentages"
  },
  {
    question: "A train 200 m long crosses a platform 300 m long in 20 seconds. What is the speed of the train?",
    options: ["30 m/s", "25 m/s", "35 m/s", "20 m/s"],
    correctAnswer: 1,
    explanation: "Distance covered = length of train + platform = 200 + 300 = 500 m. Speed = 500 / 20 = 25 m/s.",
    topic: "Speed, Time & Distance"
  },
  {
    question: "The average of 10 numbers is 25. If each number is increased by 5, the new average becomes:",
    options: ["35", "20", "30", "25"],
    correctAnswer: 2,
    explanation: "When every number increases by a constant k, the average also increases by k. New average = 25 + 5 = 30.",
    topic: "Averages"
  },
  {
    question: "An article is sold for Rs. 800 at a profit of 25%. What is its cost price?",
    options: ["Rs. 600", "Rs. 650", "Rs. 700", "Rs. 640"],
    correctAnswer: 3,
    explanation: "SP = CP x (1 + Profit%) => 800 = CP x 1.25 => CP = 800 / 1.25 = Rs. 640.",
    topic: "Profit & Loss"
  },
  {
    question: "A can finish a work in 15 days and B in 20 days. Working together for 4 days, what fraction of the work is left?",
    options: ["7/15", "8/15", "1/3", "2/5"],
    correctAnswer: 1,
    explanation: "(A + B)'s 1-day work = 1/15 + 1/20 = 7/60. In 4 days they complete 28/60 = 7/15. Work left = 1 - 7/15 = 8/15.",
    topic: "Time & Work"
  },
  {
    question: "The ages of A and B are in the ratio 3:5. After 6 years the ratio becomes 2:3. What is B's present age?",
    options: ["24 years", "18 years", "36 years", "30 years"],
    correctAnswer: 3,
    explanation: "Let ages be 3x and 5x. (3x+6)/(5x+6) = 2/3 => 9x + 18 = 10x + 12 => x = 6. So B = 5 x 6 = 30 years.",
    topic: "Ratio & Proportion"
  },
  {
    question: "The price of an item first increases by 20% and then decreases by 20%. What is the net change in price?",
    options: ["No change", "4% decrease", "4% increase", "2% decrease"],
    correctAnswer: 1,
    explanation: "Net change = (+20 - 20 - (20 x 20)/100)% = -4%. Equivalent to a 4% decrease.",
    topic: "Successive Percentage"
  },
  {
    question: "A pipe fills a tank in 6 hours, but because of a leak the tank takes 8 hours to fill. In how many hours will the leak empty the full tank alone?",
    options: ["24 hours", "18 hours", "48 hours", "12 hours"],
    correctAnswer: 0,
    explanation: "Leak's 1-hour emptying rate = 1/6 - 1/8 = 1/24 of the tank. Hence the leak empties it in 24 hours.",
    topic: "Pipes & Cisterns"
  },
  {
    question: "By selling 33 metres of cloth a trader gains the selling price of 11 metres. Find the gain percent.",
    options: ["33.33%", "40%", "50%", "25%"],
    correctAnswer: 2,
    explanation: "Gain = SP of 11 m. SP of 33 m - CP of 33 m = SP of 11 m, so CP of 33 m = SP of 22 m. SP/CP = 33/22 = 1.5, i.e. 50% gain.",
    topic: "Profit & Loss"
  },
  {
    question: "A boat covers 30 km downstream in 2 hours and returns in 3 hours. What is the speed of the stream?",
    options: ["2.5 km/h", "3 km/h", "4 km/h", "5 km/h"],
    correctAnswer: 0,
    explanation: "Downstream speed = 15 km/h, upstream speed = 10 km/h. Stream speed = (15 - 10)/2 = 2.5 km/h.",
    topic: "Boats & Streams"
  },
  {
    question: "Find the simple interest on Rs. 8,000 at 12.5% per annum for 3 years.",
    options: ["Rs. 2,400", "Rs. 3,000", "Rs. 3,200", "Rs. 2,800"],
    correctAnswer: 1,
    explanation: "SI = P x R x T / 100 = 8000 x 12.5 x 3 / 100 = Rs. 3,000.",
    topic: "Simple Interest"
  },
  {
    question: "A starts a business with Rs. 50,000 and B joins with Rs. 40,000. After 4 months A withdraws half his capital. If the annual profit is Rs. 55,000, what is B's share?",
    options: ["Rs. 25,000", "Rs. 28,000", "Rs. 30,000", "Rs. 32,000"],
    correctAnswer: 2,
    explanation: "A invests 50000x4 + 25000x8 = 4,00,000; B invests 40000x12 = 4,80,000. Ratio = 5:6. B's share = 55000 x 6/11 = Rs. 30,000.",
    topic: "Partnership"
  },
  {
    question: "The diagonals of a rhombus are 16 cm and 12 cm. Its perimeter is:",
    options: ["56 cm", "20 cm", "32 cm", "40 cm"],
    correctAnswer: 3,
    explanation: "Half-diagonals = 8 cm and 6 cm. Side = sqrt(64+36) = 10 cm. Perimeter = 4 x 10 = 40 cm.",
    topic: "Mensuration"
  },
  {
    question: "A bag has 5 red, 4 blue and 3 green balls. One ball is drawn at random. What is the probability that it is red?",
    options: ["1/3", "5/12", "1/4", "5/9"],
    correctAnswer: 1,
    explanation: "Total balls = 12. Favourable = 5. Probability = 5/12.",
    topic: "Probability"
  },
  {
    question: "In what ratio must rice at Rs. 9/kg be mixed with rice at Rs. 12/kg so that the mixture costs Rs. 10/kg?",
    options: ["1:2", "3:2", "2:1", "2:3"],
    correctAnswer: 2,
    explanation: "By alligation: (12 - 10) : (10 - 9) = 2 : 1. Cheaper : dearer = 2 : 1.",
    topic: "Alligation & Mixtures"
  }
];

const NUMERICAL_ABILITY = [
  {
    question: "Find the next term of the series: 2, 6, 12, 20, 30, ?",
    options: ["40", "44", "42", "46"],
    correctAnswer: 2,
    explanation: "Differences are 4, 6, 8, 10, so the next difference is 12. 30 + 12 = 42. (Pattern: n(n+1)).",
    topic: "Number Series"
  },
  {
    question: "What is the LCM of 12, 15 and 20?",
    options: ["180", "240", "60", "120"],
    correctAnswer: 2,
    explanation: "12 = 2^2 x 3, 15 = 3 x 5, 20 = 2^2 x 5. LCM = 2^2 x 3 x 5 = 60.",
    topic: "LCM & HCF"
  },
  {
    question: "The HCF of 84 and 126 is:",
    options: ["21", "42", "63", "14"],
    correctAnswer: 1,
    explanation: "84 = 2^2 x 3 x 7 and 126 = 2 x 3^2 x 7. Common factors = 2 x 3 x 7 = 42.",
    topic: "LCM & HCF"
  },
  {
    question: "What is the smallest four-digit number exactly divisible by 9?",
    options: ["1026", "1017", "1008", "1000"],
    correctAnswer: 2,
    explanation: "Smallest 4-digit number is 1000. 1000 / 9 leaves remainder 1, so add 8. 1008 / 9 = 112.",
    topic: "Numbers"
  },
  {
    question: "Evaluate: 2/5 of 3/4 of 5/8 of 640",
    options: ["96", "144", "160", "120"],
    correctAnswer: 3,
    explanation: "640 x 2/5 = 256; 256 x 3/4 = 192; 192 x 5/8 = 120.",
    topic: "Fractions"
  },
  {
    question: "What is the unit digit of 7^105?",
    options: ["1", "7", "3", "9"],
    correctAnswer: 1,
    explanation: "Unit digits of powers of 7 repeat in a cycle of 4: 7, 9, 3, 1. 105 mod 4 = 1, so the unit digit is the 1st in the cycle = 7.",
    topic: "Number System"
  },
  {
    question: "sqrt(0.0081) equals:",
    options: ["0.09", "0.9", "0.009", "0.0009"],
    correctAnswer: 0,
    explanation: "sqrt(81) = 9. sqrt(0.0081) = sqrt(81/10000) = 9/100 = 0.09.",
    topic: "Square Roots"
  },
  {
    question: "The average age of 30 students is 12 years. When the teacher's age is included, the average becomes 12.5 years. The teacher's age is:",
    options: ["27.5 years", "25 years", "30 years", "28 years"],
    correctAnswer: 0,
    explanation: "Students total = 30 x 12 = 360. New total = 31 x 12.5 = 387.5. Teacher's age = 387.5 - 360 = 27.5 years.",
    topic: "Averages"
  },
  {
    question: "Rs. 700 is divided among A, B and C such that A:B = 2:3 and B:C = 4:5. How much does C receive?",
    options: ["Rs. 240", "Rs. 300", "Rs. 320", "Rs. 360"],
    correctAnswer: 1,
    explanation: "A:B:C = 8:12:15 (total 35 parts). Each part = 700/35 = 20. C = 15 x 20 = Rs. 300.",
    topic: "Ratio & Proportion"
  },
  {
    question: "A's salary is 25% more than B's. B's salary is what percent less than A's?",
    options: ["20%", "25%", "22.5%", "18%"],
    correctAnswer: 0,
    explanation: "If B = 100, A = 125. Difference = 25. Required % = 25/125 x 100 = 20%.",
    topic: "Percentages"
  },
  {
    question: "Two articles are sold at Rs. 1,000 each - one at 25% profit and the other at 25% loss. What is the overall result?",
    options: ["6.25% gain", "No profit, no loss", "6.25% loss", "4% loss"],
    correctAnswer: 2,
    explanation: "CP1 = 800, CP2 = 1333.33. Total CP = 2133.33 vs total SP = 2000. Loss % = (25 x 25)/100 = 6.25% loss.",
    topic: "Profit & Loss"
  },
  {
    question: "12 men complete a work in 20 days. After 4 days, 4 more men join them. In how many total days (from the start) is the work finished?",
    options: ["15 days", "17 days", "16 days", "14 days"],
    correctAnswer: 2,
    explanation: "Total work = 240 man-days. First 4 days complete 48. Remaining 192 done by 16 men takes 12 more days. Total = 16 days.",
    topic: "Time & Work"
  },
  {
    question: "Two trains of lengths 150 m and 200 m travel at 50 km/h and 40 km/h in opposite directions. Time taken to cross each other:",
    options: ["12 s", "14 s", "16 s", "18 s"],
    correctAnswer: 1,
    explanation: "Relative speed = 90 km/h = 25 m/s. Total length = 350 m. Time = 350/25 = 14 seconds.",
    topic: "Trains"
  },
  {
    question: "Find the compound interest on Rs. 5,000 at 10% per annum for 2 years.",
    options: ["Rs. 1,000", "Rs. 1,100", "Rs. 1,050", "Rs. 1,210"],
    correctAnswer: 2,
    explanation: "Amount = 5000 x (1.1)^2 = Rs. 6,050. CI = 6050 - 5000 = Rs. 1,050.",
    topic: "Compound Interest"
  },
  {
    question: "Simplify: 1/2 + 1/6 + 1/12 + 1/20",
    options: ["19/20", "9/10", "17/20", "4/5"],
    correctAnswer: 0,
    explanation: "Each term = 1/(n(n+1)) which telescopes to 1 - 1/(n+1). Sum = 1 - 1/20 = 19/20.",
    topic: "Simplification"
  }
];

const LOGICAL_REASONING = [
  {
    question: "Complete the series: 3, 9, 27, 81, ?",
    options: ["162", "216", "243", "324"],
    correctAnswer: 2,
    explanation: "Each term is multiplied by 3. 81 x 3 = 243.",
    topic: "Series"
  },
  {
    question: "Find the missing number: 5, 11, 23, 47, ?",
    options: ["94", "95", "92", "96"],
    correctAnswer: 1,
    explanation: "Pattern: (previous x 2) + 1. 47 x 2 + 1 = 95.",
    topic: "Series"
  },
  {
    question: "Complete the letter series: AZ, BY, CX, ?",
    options: ["EV", "DW", "FU", "DV"],
    correctAnswer: 1,
    explanation: "First letters move forward (A,B,C,D) while second letters move backward (Z,Y,X,W). Next pair = DW.",
    topic: "Letter Series"
  },
  {
    question: "Find the odd one out: 121, 169, 200, 225",
    options: ["169", "121", "225", "200"],
    correctAnswer: 3,
    explanation: "121 = 11^2, 169 = 13^2, 225 = 15^2, but 200 is not a perfect square.",
    topic: "Odd One Out"
  },
  {
    question: "Doctor : Hospital :: Teacher : ?",
    options: ["Office", "School", "Court", "Laboratory"],
    correctAnswer: 1,
    explanation: "A doctor works in a hospital; similarly a teacher works in a school.",
    topic: "Analogy"
  },
  {
    question: "In a certain code, TEACHER is written as VGCEJGT. How is STUDENT written in that code?",
    options: ["UVWFGPV", "TUWFGPV", "UVWGFPV", "VUWFGPV"],
    correctAnswer: 0,
    explanation: "Every letter moves 2 places forward: S->U, T->V, U->W, D->F, E->G, N->P, T->V giving UVWFGPV.",
    topic: "Coding-Decoding"
  },
  {
    question: "If CAT is coded as 24 (C=3, A=1, T=20), then DOG is coded as:",
    options: ["26", "27", "24", "28"],
    correctAnswer: 0,
    explanation: "D(4) + O(15) + G(7) = 26.",
    topic: "Coding-Decoding"
  },
  {
    question: "Pointing to a photograph, Ram said, \"She is the daughter of my grandfather's only son.\" How is she related to Ram?",
    options: ["Cousin", "Aunt", "Sister", "Niece"],
    correctAnswer: 2,
    explanation: "Grandfather's only son = Ram's father. His daughter = Ram's sister.",
    topic: "Blood Relations"
  },
  {
    question: "A is B's brother, B is C's sister, and C is D's father. How is A related to D?",
    options: ["Brother", "Father", "Nephew", "Uncle"],
    correctAnswer: 3,
    explanation: "C is D's father. A is C's sibling (brother of C's sister B). So A is D's uncle.",
    topic: "Blood Relations"
  },
  {
    question: "A man walks 3 km north, then 4 km east. How far is he from the starting point?",
    options: ["7 km", "5 km", "12 km", "6 km"],
    correctAnswer: 1,
    explanation: "Displacement = sqrt(3^2 + 4^2) = sqrt(25) = 5 km.",
    topic: "Direction Sense"
  },
  {
    question: "Facing north, you turn right, then right again, then left once. Which direction are you facing now?",
    options: ["East", "South", "West", "North"],
    correctAnswer: 0,
    explanation: "North -> right -> East -> right -> South -> left -> East.",
    topic: "Direction Sense"
  },
  {
    question: "Statements: All pens are books. Some books are copies. Conclusions: I. Some pens are copies. II. Some copies are books. Which conclusion follows?",
    options: ["Only II follows", "Both I and II follow", "Only I follows", "Neither follows"],
    correctAnswer: 0,
    explanation: "II directly restates the second statement, so it follows. I is uncertain because the copies may not overlap with pens.",
    topic: "Syllogism"
  },
  {
    question: "Statements: All cups are plates. All plates are bowls. Conclusions: I. All cups are bowls. II. Some bowls are cups.",
    options: ["Only II follows", "Neither follows", "Only I follows", "Both follow"],
    correctAnswer: 3,
    explanation: "Cups are inside plates, and plates are inside bowls, so all cups are bowls (I). Since cups exist, some bowls are cups (II). Both follow.",
    topic: "Syllogism"
  },
  {
    question: "Four friends sit in a row. R sits immediately left of P, and S sits immediately right of P. Who sits second from the left?",
    options: ["R", "S", "Cannot be determined", "P"],
    correctAnswer: 3,
    explanation: "The order is R, P, S, Q. Second from the left is P.",
    topic: "Seating Arrangement"
  },
  {
    question: "A cube painted on all faces is cut into 64 equal small cubes. How many small cubes have exactly two painted faces?",
    options: ["36", "8", "24", "32"],
    correctAnswer: 2,
    explanation: "64 cubes form a 4 x 4 x 4 block. Edge cubes excluding corners: 2 per edge x 12 edges = 24.",
    topic: "Cubes & Dice"
  },
  {
    question: "If today is Wednesday, what day will it be after 61 days?",
    options: ["Monday", "Tuesday", "Sunday", "Saturday"],
    correctAnswer: 0,
    explanation: "61 mod 7 = 5. Five days after Wednesday is Monday.",
    topic: "Calendar"
  },
  {
    question: "What is the angle between the hour hand and minute hand at 3:30?",
    options: ["80 degrees", "90 degrees", "75 degrees", "70 degrees"],
    correctAnswer: 2,
    explanation: "Angle = |30H - 5.5M| = |90 - 165| = 75 degrees.",
    topic: "Clocks"
  },
  {
    question: "Find the odd one out: 27, 64, 125, 150",
    options: ["150", "27", "125", "64"],
    correctAnswer: 0,
    explanation: "27 = 3^3, 64 = 4^3, 125 = 5^3 but 150 is not a perfect cube.",
    topic: "Odd One Out"
  },
  {
    question: "Ram ranks 9th from the top and 38th from the bottom in his class. How many students are there in the class?",
    options: ["46", "45", "47", "48"],
    correctAnswer: 0,
    explanation: "Total = rank from top + rank from bottom - 1 = 9 + 38 - 1 = 46.",
    topic: "Ranking"
  },
  {
    question: "Among five friends: A is taller than B, C is shorter than B, D is taller than A, and E is the shortest. Who is the tallest?",
    options: ["A", "D", "B", "C"],
    correctAnswer: 1,
    explanation: "Order from tallest: D > A > B > C > E. D is the tallest.",
    topic: "Comparison"
  },
  {
    question: "X is older than Y, Z is younger than Y, and W is older than X. Who is the oldest?",
    options: ["X", "Y", "W", "Z"],
    correctAnswer: 2,
    explanation: "Order: W > X > Y > Z. W is the oldest.",
    topic: "Comparison"
  },
  {
    question: "If PEN = 35 (P=16, E=5, N=14), then PENCIL equals:",
    options: ["58", "57", "60", "59"],
    correctAnswer: 3,
    explanation: "P(16)+E(5)+N(14)+C(3)+I(9)+L(12) = 59.",
    topic: "Coding-Decoding"
  },
  {
    question: "Find the next term: 7, 3, 9, 5, 11, 7, 13, ?",
    options: ["11", "9", "15", "8"],
    correctAnswer: 1,
    explanation: "Two interleaved series: 7, 9, 11, 13 (+2 each) and 3, 5, 7, ? (+2 each). The next term is 9.",
    topic: "Series"
  },
  {
    question: "In a group of 40 people, 25 like tea, 20 like coffee and 8 like both. How many like neither drink?",
    options: ["5", "3", "7", "2"],
    correctAnswer: 1,
    explanation: "Tea or coffee = 25 + 20 - 8 = 37. Neither = 40 - 37 = 3.",
    topic: "Set Theory / Venn Diagram"
  },
  {
    question: "Ravi walks 5 km south, turns left and walks 3 km, then turns left again and walks 5 km. Where is he now relative to the start?",
    options: ["5 km east", "3 km west", "3 km east", "At the starting point"],
    correctAnswer: 2,
    explanation: "South 5 km, then left (east) 3 km, then left (north) 5 km returns him level with the start but 3 km east.",
    topic: "Direction Sense"
  },
  {
    question: "Which letter is 7th to the right of the 12th letter from the left of the English alphabet?",
    options: ["R", "T", "S", "U"],
    correctAnswer: 2,
    explanation: "12th letter = L. Seven to its right: M,N,O,P,Q,R,S. Answer = S.",
    topic: "Alphabet Test"
  },
  {
    question: "How many meaningful English words can be formed using all letters of MEAT exactly once?",
    options: ["2", "3", "4", "1"],
    correctAnswer: 2,
    explanation: "MEAT, TEAM, MATE and TAME are four valid words.",
    topic: "Word Formation"
  },
  {
    question: "In a certain code, MONKEY is written as XDJMNL (letters reversed, each shifted one back). How is TIGER written in that code?",
    options: ["QDFHS", "QDFGS", "QEFHS", "RDFHS"],
    correctAnswer: 0,
    explanation: "Reverse TIGER -> REGIT, shift each letter back one: Q D F H S = QDFHS.",
    topic: "Coding-Decoding"
  },
  {
    question: "\"Every student who studies regularly passes the exam. Ram studies regularly.\" Which statement is definitely true?",
    options: ["Ram fails the exam", "Ram passes the exam", "Nothing can be concluded", "Ram may or may not pass"],
    correctAnswer: 1,
    explanation: "By direct application of the given rule, studying regularly guarantees passing, so Ram passes.",
    topic: "Logical Deduction"
  },
  {
    question: "In the magic square [[4,9,2],[8,?,6],[3,5,7]] every row, column and diagonal sums to 15. What is the missing number?",
    options: ["1", "3", "0", "2"],
    correctAnswer: 0,
    explanation: "Middle row needs 8 + ? + 6 = 15, hence ? = 1. (This is the classic Lo Shu square.)",
    topic: "Missing Number Puzzle"
  }
];

const VERBAL_ABILITY = [
  {
    question: "Choose the word closest in meaning to ABANDON:",
    options: ["Cherish", "Keep", "Forsake", "Adorn"],
    correctAnswer: 2,
    explanation: "To abandon means to leave or give up completely, which matches 'forsake'.",
    topic: "Synonyms"
  },
  {
    question: "Choose the word closest in meaning to MAGNANIMOUS:",
    options: ["Generous", "Miserly", "Angry", "Careless"],
    correctAnswer: 0,
    explanation: "Magnanimous means generous or forgiving, especially towards a rival or less powerful person.",
    topic: "Synonyms"
  },
  {
    question: "Choose the word most nearly OPPOSITE in meaning to FRUGAL:",
    options: ["Thrifty", "Extravagant", "Economical", "Prudent"],
    correctAnswer: 1,
    explanation: "Frugal means sparing with money; its opposite is extravagant (spending freely).",
    topic: "Antonyms"
  },
  {
    question: "Choose the word most nearly OPPOSITE in meaning to OBSOLETE:",
    options: ["Ancient", "Outdated", "Modern", "Disused"],
    correctAnswer: 2,
    explanation: "Obsolete means no longer in use or outdated; modern is the opposite.",
    topic: "Antonyms"
  },
  {
    question: "Fill in the blank: She has been working here ______ 2015.",
    options: ["from", "since", "for", "by"],
    correctAnswer: 1,
    explanation: "'Since' is used with a point in time (2015); 'for' is used with a duration.",
    topic: "Grammar"
  },
  {
    question: "Fill in the blank: He insisted ______ paying the entire bill.",
    options: ["on", "at", "to", "for"],
    correctAnswer: 0,
    explanation: "The verb 'insist' is followed by the preposition 'on'.",
    topic: "Prepositions"
  },
  {
    question: "Spot the erroneous segment: (A) One of my friend / (B) lives in Chennai / (C) near the beach.",
    options: ["B", "No error", "C", "A"],
    correctAnswer: 3,
    explanation: "'One of' must be followed by a plural noun: 'One of my friends'.",
    topic: "Error Spotting"
  },
  {
    question: "Choose the correct verb: Neither of the boys ______ present in the class.",
    options: ["were", "are", "was", "have been"],
    correctAnswer: 2,
    explanation: "'Neither' is singular, so it takes the singular verb 'was'.",
    topic: "Subject-Verb Agreement"
  },
  {
    question: "What does the idiom 'burn the midnight oil' mean?",
    options: ["Waste resources", "Work late into the night", "Start a quarrel", "Celebrate success"],
    correctAnswer: 1,
    explanation: "The idiom means to study or work late into the night.",
    topic: "Idioms"
  },
  {
    question: "What does the idiom 'a blessing in disguise' mean?",
    options: ["A hidden danger", "An obvious gift", "A false promise", "Something good that seemed bad at first"],
    correctAnswer: 3,
    explanation: "It refers to something that appears unlucky initially but results in good later.",
    topic: "Idioms"
  },
  {
    question: "One word for 'a person who can speak many languages':",
    options: ["Linguist", "Polyglot", "Translator", "Bilingual"],
    correctAnswer: 1,
    explanation: "A polyglot knows and can use several languages. A linguist studies language scientifically.",
    topic: "One Word Substitution"
  },
  {
    question: "One word for 'government by the people':",
    options: ["Autocracy", "Monarchy", "Democracy", "Bureaucracy"],
    correctAnswer: 2,
    explanation: "Democracy literally means rule by the people (demos = people, kratos = power).",
    topic: "One Word Substitution"
  },
  {
    question: "Change to active voice: 'The letter was written by Ravi.'",
    options: ["Ravi has written the letter", "Ravi wrote the letter", "Ravi was writing the letter", "The letter wrote Ravi"],
    correctAnswer: 1,
    explanation: "Passive past simple converts to active past simple: subject (Ravi) + past verb + object.",
    topic: "Voice"
  },
  {
    question: "Convert to indirect speech: He said, \"I am busy.\"",
    options: ["He said that he was busy", "He says he is busy", "He said that I am busy", "He said that he is busy"],
    correctAnswer: 0,
    explanation: "In indirect speech, present tense shifts to past and the pronoun changes accordingly.",
    topic: "Narration"
  },
  {
    question: "Pick the correctly spelt word:",
    options: ["Ocurrence", "Occurence", "Occurrence", "Ocurrance"],
    correctAnswer: 2,
    explanation: "The correct spelling is O-C-C-U-R-R-E-N-C-E with double c and double r.",
    topic: "Spelling"
  },
  {
    question: "Fill in the blank: The meeting was presided ______ by the chairman.",
    options: ["on", "upon", "up", "over"],
    correctAnswer: 3,
    explanation: "'Preside over' is the correct phrasal form meaning to chair a meeting.",
    topic: "Prepositions"
  },
  {
    question: "Choose the word closest in meaning to CANDID:",
    options: ["Secretive", "Frank", "Rude", "Shy"],
    correctAnswer: 1,
    explanation: "Candid means truthful and straightforward, i.e. frank.",
    topic: "Synonyms"
  },
  {
    question: "Choose the word most nearly OPPOSITE in meaning to SCARCE:",
    options: ["Rare", "Plentiful", "Limited", "Sparse"],
    correctAnswer: 1,
    explanation: "Scarce means in short supply; plentiful is its opposite.",
    topic: "Antonyms"
  },
  {
    question: "Fill in the blank with the correct article: He is ______ honest man.",
    options: ["a", "an", "the", "no article"],
    correctAnswer: 1,
    explanation: "'Honest' begins with a vowel sound (the h is silent), so 'an' is used.",
    topic: "Articles"
  },
  {
    question: "Spot the erroneous segment: (A) She do not / (B) like coffee / (C) in the morning.",
    options: ["C", "B", "No error", "A"],
    correctAnswer: 3,
    explanation: "Third person singular takes 'does': 'She does not like coffee.'",
    topic: "Error Spotting"
  }
];

/* Master bank keyed by category */
const APTITUDE_BANK = {
  quantitative: { label: "Quantitative Aptitude", questions: QUANTITATIVE_APTITUDE },
  numerical: { label: "Numerical Ability", questions: NUMERICAL_ABILITY },
  logical: { label: "Logical Reasoning", questions: LOGICAL_REASONING },
  verbal: { label: "Verbal Ability", questions: VERBAL_ABILITY }
};
