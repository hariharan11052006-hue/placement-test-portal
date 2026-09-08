/* ============================================================
   PlacementPro - Programming Problem Bank (30 problems)
   Each problem: statement, I/O format, examples, test cases
   (stdin -> expected stdout), hints and topics.
   Code execution is done through the free Piston public API.
   ============================================================ */

const PISTON_API_URL = "https://emkc.org/api/v2/piston/execute";

const LANGUAGE_CONFIG = {
  java:   { pistonLanguage: "java",   version: "*", fileName: "Main.java" },
  python: { pistonLanguage: "python", version: "*", fileName: "main.py" },
  c:      { pistonLanguage: "c",      version: "*", fileName: "main.c" },
  cpp:    { pistonLanguage: "c++",    version: "*", fileName: "main.cpp" }
};

const STARTER_CODE = {
  java:
`import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        // Read input using sc.nextLine(), sc.nextInt(), etc.
        // Write your logic below and print the result.

        System.out.println("Your output");
        sc.close();
    }
}`,
  python:
`import sys

def main():
    # Read input with input() or sys.stdin
    # Write your logic below and print the result.

    print("Your output")

if __name__ == "__main__":
    main()`,
  c:
`#include <stdio.h>

int main() {
    // Read input using scanf / fgets.
    // Write your logic below.

    printf("Your output\\n");
    return 0;
}`,
  cpp:
`#include <bits/stdc++.h>
using namespace std;

int main() {
    // Read input using cin / getline.
    // Write your logic below.

    cout << "Your output" << endl;
    return 0;
}`
};

const PROGRAMMING_PROBLEMS = [
  {
    id: 1,
    title: "Reverse a String",
    difficulty: "Easy",
    topics: ["Strings"],
    statement: "Read one line of text from standard input and print the same line reversed.",
    inputFormat: "A single line of text S (1 <= length <= 1000).",
    outputFormat: "The reverse of S on a single line.",
    examples: [{ input: "hello", output: "olleh" }],
    testCases: [
      { input: "hello", expectedOutput: "olleh" },
      { input: "PlacementPro", expectedOutput: "orp tnemezalP" },
      { input: "abc123", expectedOutput: "321cba" }
    ],
    hints: ["Iterate from the last character to the first.", "In Python try slicing: s[::-1]."]
  },
  {
    id: 2,
    title: "Palindrome Check",
    difficulty: "Easy",
    topics: ["Strings"],
    statement: "Read a word and print \"Yes\" if it is a palindrome (case-insensitive), otherwise print \"No\".",
    inputFormat: "A single word W (1 <= length <= 100).",
    outputFormat: "\"Yes\" if W reads the same forwards and backwards ignoring case, else \"No\".",
    examples: [{ input: "Madam", output: "Yes" }],
    testCases: [
      { input: "Madam", expectedOutput: "Yes" },
      { input: "Racecar", expectedOutput: "Yes" },
      { input: "hello", expectedOutput: "No" }
    ],
    hints: ["Convert to lower-case before comparing.", "Compare the string with its reverse."]
  },
  {
    id: 3,
    title: "Largest and Second Largest",
    difficulty: "Easy",
    topics: ["Arrays"],
    statement: "Given N integers (all distinct), find the largest and second largest values.",
    inputFormat: "First line: integer N (2 <= N <= 1000).\nSecond line: N space-separated integers.",
    outputFormat: "Two lines:\nLargest: X\nSecond Largest: Y",
    examples: [{ input: "5\n10 40 20 4 60", output: "Largest: 60\nSecond Largest: 40" }],
    testCases: [
      { input: "5\n10 40 20 4 60", expectedOutput: "Largest: 60\nSecond Largest: 40" },
      { input: "4\n-5 -2 -9 -1", expectedOutput: "Largest: -1\nSecond Largest: -2" },
      { input: "3\n100 99 98", expectedOutput: "Largest: 100\nSecond Largest: 99" }
    ],
    hints: ["Track two variables while scanning once.", "Initialise both with very small values."]
  },
  {
    id: 4,
    title: "Fibonacci Series",
    difficulty: "Easy",
    topics: ["Loops"],
    statement: "Print the first N terms of the Fibonacci series starting with 0 and 1, separated by single spaces.",
    inputFormat: "An integer N (1 <= N <= 30).",
    outputFormat: "The first N Fibonacci terms separated by spaces.",
    examples: [{ input: "5", output: "0 1 1 2 3" }],
    testCases: [
      { input: "5", expectedOutput: "0 1 1 2 3" },
      { input: "1", expectedOutput: "0" },
      { input: "8", expectedOutput: "0 1 1 2 3 5 8 13" }
    ],
    hints: ["Keep two rolling variables a = 0, b = 1.", "Print a then update (a, b) = (b, a + b)."]
  },
  {
    id: 5,
    title: "Prime Number Check",
    difficulty: "Easy",
    topics: ["Math"],
    statement: "Check whether the given positive integer is prime. A prime has exactly two divisors: 1 and itself.",
    inputFormat: "An integer N (1 <= N <= 10^6).",
    outputFormat: "Print \"Prime\" or \"Not Prime\".",
    examples: [{ input: "7", output: "Prime" }],
    testCases: [
      { input: "7", expectedOutput: "Prime" },
      { input: "1", expectedOutput: "Not Prime" },
      { input: "97", expectedOutput: "Prime" }
    ],
    hints: ["Numbers below 2 are not prime.", "Only test divisors up to sqrt(N)."]
  },
  {
    id: 6,
    title: "Factorial",
    difficulty: "Easy",
    topics: ["Math", "Recursion"],
    statement: "Compute the factorial of N using iteration or recursion.",
    inputFormat: "An integer N (0 <= N <= 12).",
    outputFormat: "N! as a single integer.",
    examples: [{ input: "5", output: "120" }],
    testCases: [
      { input: "5", expectedOutput: "120" },
      { input: "0", expectedOutput: "1" },
      { input: "10", expectedOutput: "3628800" }
    ],
    hints: ["Remember 0! = 1.", "Multiply result by i for every i from 1 to N."]
  },
  {
    id: 7,
    title: "Count Vowels",
    difficulty: "Easy",
    topics: ["Strings"],
    statement: "Count how many vowels (a, e, i, o, u - case-insensitive) appear in the given line of text.",
    inputFormat: "One line of text S.",
    outputFormat: "The number of vowels as an integer.",
    examples: [{ input: "Hello World", output: "3" }],
    testCases: [
      { input: "Hello World", expectedOutput: "3" },
      { input: "PLACEMENT", expectedOutput: "3" },
      { input: "xyz", expectedOutput: "0" }
    ],
    hints: ["Normalise case first.", "Check each character against 'aeiou'."]
  },
  {
    id: 8,
    title: "Remove Duplicates from Array",
    difficulty: "Easy",
    topics: ["Arrays"],
    statement: "Remove duplicate values from an array while keeping the FIRST occurrence order intact.",
    inputFormat: "First line: integer N (1 <= N <= 1000).\nSecond line: N space-separated integers.",
    outputFormat: "Unique values in their original relative order, space-separated.",
    examples: [{ input: "5\n1 2 2 3 1", output: "1 2 3" }],
    testCases: [
      { input: "5\n1 2 2 3 1", expectedOutput: "1 2 3" },
      { input: "4\n5 5 5 5", expectedOutput: "5" },
      { input: "3\n1 2 3", expectedOutput: "1 2 3" }
    ],
    hints: ["Use a set to remember what you have already printed.", "Preserve order - do not sort."]
  },
  {
    id: 9,
    title: "Sort an Array (Ascending)",
    difficulty: "Easy",
    topics: ["Arrays", "Sorting"],
    statement: "Sort an array of integers in ascending order. You may use any algorithm or the built-in sort.",
    inputFormat: "First line: integer N (1 <= N <= 1000).\nSecond line: N space-separated integers.",
    outputFormat: "The sorted array, space-separated on one line.",
    examples: [{ input: "3\n3 1 2", output: "1 2 3" }],
    testCases: [
      { input: "3\n3 1 2", expectedOutput: "1 2 3" },
      { input: "4\n5 -1 9 0", expectedOutput: "-1 0 5 9" },
      { input: "3\n2 2 1", expectedOutput: "1 2 2" }
    ],
    hints: ["Built-in sorts are accepted here.", "Watch out for negative numbers."]
  },
  {
    id: 10,
    title: "Find the Missing Number",
    difficulty: "Easy",
    topics: ["Arrays", "Math"],
    statement: "An array holds all numbers from 1 to N except one. Find the missing number.",
    inputFormat: "First line: integer N.\nSecond line: N-1 distinct integers from 1..N.",
    outputFormat: "The missing number as an integer.",
    examples: [{ input: "5\n1 2 4 5", output: "3" }],
    testCases: [
      { input: "5\n1 2 4 5", expectedOutput: "3" },
      { input: "10\n1 2 3 4 5 6 8 9 10", expectedOutput: "7" },
      { input: "3\n3 1", expectedOutput: "2" }
    ],
    hints: ["Sum of 1..N equals N*(N+1)/2.", "Subtract the given sum from the expected sum."]
  },
  {
    id: 11,
    title: "Armstrong Number",
    difficulty: "Medium",
    topics: ["Math"],
    statement: "Check whether N is an Armstrong number - the sum of each digit raised to the power of the digit count equals N itself.",
    inputFormat: "An integer N (1 <= N <= 99999).",
    outputFormat: "Print \"Yes\" if Armstrong, otherwise \"No\".",
    examples: [{ input: "153", output: "Yes" }],
    testCases: [
      { input: "153", expectedOutput: "Yes" },
      { input: "9474", expectedOutput: "Yes" },
      { input: "154", expectedOutput: "No" }
    ],
    hints: ["153 = 1^3 + 5^3 + 3^3.", "Count digits first, then sum digit^count."]
  },
  {
    id: 12,
    title: "Matrix Transpose",
    difficulty: "Medium",
    topics: ["Matrix"],
    statement: "Print the transpose of an R x C matrix (rows become columns).",
    inputFormat: "First line: R and C.\nNext R lines: C integers each.",
    outputFormat: "C lines containing the transposed matrix rows, values space-separated.",
    examples: [{ input: "2 3\n1 2 3\n4 5 6", output: "1 4\n2 5\n3 6" }],
    testCases: [
      { input: "2 3\n1 2 3\n4 5 6", expectedOutput: "1 4\n2 5\n3 6" },
      { input: "1 1\n7", expectedOutput: "7" },
      { input: "3 2\n1 2\n3 4\n5 6", expectedOutput: "1 3 5\n2 4 6" }
    ],
    hints: ["Element at (i, j) moves to (j, i).", "Outer loop over columns for printing."]
  },
  {
    id: 13,
    title: "Sum of Matrix Diagonals",
    difficulty: "Medium",
    topics: ["Matrix"],
    statement: "For a square N x N matrix compute the sums of the primary and secondary diagonals.",
    inputFormat: "First line: integer N.\nNext N lines: N integers each.",
    outputFormat: "Two lines:\nPrimary: P\nSecondary: S",
    examples: [{ input: "3\n1 2 3\n4 5 6\n7 8 9", output: "Primary: 15\nSecondary: 15" }],
    testCases: [
      { input: "3\n1 2 3\n4 5 6\n7 8 9", expectedOutput: "Primary: 15\nSecondary: 15" },
      { input: "2\n1 0\n0 1", expectedOutput: "Primary: 2\nSecondary: 0" },
      { input: "1\n5", expectedOutput: "Primary: 5\nSecondary: 5" }
    ],
    hints: ["Primary diagonal: row index == column index.", "Secondary: column index == N-1-row index."]
  },
  {
    id: 14,
    title: "Swap Two Numbers",
    difficulty: "Easy",
    topics: ["Basics"],
    statement: "Read two integers and print them swapped. Try doing it without a third variable.",
    inputFormat: "One line with two integers A and B separated by a space.",
    outputFormat: "B followed by A, space-separated.",
    examples: [{ input: "10 20", output: "20 10" }],
    testCases: [
      { input: "10 20", expectedOutput: "20 10" },
      { input: "-1 99", expectedOutput: "99 -1" },
      { input: "5 5", expectedOutput: "5 5" }
    ],
    hints: ["a = a + b; b = a - b; a = a - b works without extras.", "Python allows a, b = b, a directly."]
  },
  {
    id: 15,
    title: "GCD and LCM",
    difficulty: "Medium",
    topics: ["Math"],
    statement: "Compute the GCD and LCM of two positive integers.",
    inputFormat: "One line with two integers A and B (1 <= A, B <= 10^6).",
    outputFormat: "Two lines:\nGCD: g\nLCM: l",
    examples: [{ input: "12 18", output: "GCD: 6\nLCM: 36" }],
    testCases: [
      { input: "12 18", expectedOutput: "GCD: 6\nLCM: 36" },
      { input: "4 6", expectedOutput: "GCD: 2\nLCM: 12" },
      { input: "7 13", expectedOutput: "GCD: 1\nLCM: 91" }
    ],
    hints: ["Use the Euclidean algorithm for GCD.", "LCM = (A * B) / GCD."]
  },
  {
    id: 16,
    title: "Binary Search",
    difficulty: "Medium",
    topics: ["Searching", "Arrays"],
    statement: "Perform iterative binary search for a target in a sorted array. Print the 0-based index, or -1 when absent.",
    inputFormat: "First line: target T.\nSecond line: ascending sorted integers (at least 1 value).",
    outputFormat: "Index of T, or -1.",
    examples: [{ input: "7\n1 3 7 9 11", output: "2" }],
    testCases: [
      { input: "7\n1 3 7 9 11", expectedOutput: "2" },
      { input: "4\n2 4 6 8", expectedOutput: "1" },
      { input: "5\n1 2 3", expectedOutput: "-1" }
    ],
    hints: ["Maintain low, high and mid pointers.", "Loop while low <= high."]
  },
  {
    id: 17,
    title: "Second Smallest Element",
    difficulty: "Easy",
    topics: ["Arrays"],
    statement: "Find the second smallest element of an array of DISTINCT integers.",
    inputFormat: "First line: integer N (2 <= N <= 1000).\nSecond line: N space-separated integers.",
    outputFormat: "The second smallest value.",
    examples: [{ input: "4\n4 1 7 3", output: "3" }],
    testCases: [
      { input: "4\n4 1 7 3", expectedOutput: "3" },
      { input: "3\n-2 -8 5", expectedOutput: "-2" },
      { input: "2\n10 20", expectedOutput: "20" }
    ],
    hints: ["Sort, then take index 1 - or scan once keeping two minimums.", "All values are distinct so no tie handling is needed."]
  },
  {
    id: 18,
    title: "Sum of Digits",
    difficulty: "Easy",
    topics: ["Math"],
    statement: "Compute the sum of digits of a non-negative integer.",
    inputFormat: "An integer N (0 <= N <= 10^9).",
    outputFormat: "Sum of the digits of N.",
    examples: [{ input: "123", output: "6" }],
    testCases: [
      { input: "123", expectedOutput: "6" },
      { input: "5000", expectedOutput: "5" },
      { input: "0", expectedOutput: "0" }
    ],
    hints: ["Peel digits with % 10 and / 10.", "Handle N = 0 correctly - answer is 0."]
  },
  {
    id: 19,
    title: "Reverse a Number",
    difficulty: "Easy",
    topics: ["Math"],
    statement: "Reverse the digits of an integer (leading zeros disappear automatically when printed as a number).",
    inputFormat: "An integer N (0 <= N <= 10^9).",
    outputFormat: "The reversed number.",
    examples: [{ input: "1200", output: "21" }],
    testCases: [
      { input: "1200", expectedOutput: "21" },
      { input: "123", expectedOutput: "321" },
      { input: "7", expectedOutput: "7" }
    ],
    hints: ["rev = rev * 10 + n % 10 in a loop.", "Stop when n becomes 0."]
  },
  {
    id: 20,
    title: "Leap Year Check",
    difficulty: "Easy",
    topics: ["Logic"],
    statement: "Determine whether a year is a leap year. Divisible by 4; centuries must be divisible by 400.",
    inputFormat: "A four-digit year Y.",
    outputFormat: "Print \"Leap Year\" or \"Not Leap Year\".",
    examples: [{ input: "2024", output: "Leap Year" }],
    testCases: [
      { input: "2024", expectedOutput: "Leap Year" },
      { input: "1900", expectedOutput: "Not Leap Year" },
      { input: "2000", expectedOutput: "Leap Year" }
    ],
    hints: ["1900 fails because 1900 % 400 != 0.", "Order of checks matters: % 400, then % 100, then % 4."]
  },
  {
    id: 21,
    title: "Perfect Number",
    difficulty: "Medium",
    topics: ["Math"],
    statement: "A perfect number equals the sum of its proper divisors (excluding itself). Check whether N is perfect.",
    inputFormat: "An integer N (1 <= N <= 100000).",
    outputFormat: "Print \"Perfect\" or \"Not Perfect\".",
    examples: [{ input: "28", output: "Perfect" }],
    testCases: [
      { input: "28", expectedOutput: "Perfect" },
      { input: "6", expectedOutput: "Perfect" },
      { input: "12", expectedOutput: "Not Perfect" }
    ],
    hints: ["28 = 1 + 2 + 4 + 7 + 14.", "Divisors pair up - loop only till sqrt(N)."]
  },
  {
    id: 22,
    title: "Count Words in a Sentence",
    difficulty: "Easy",
    topics: ["Strings"],
    statement: "Count the number of words in the given sentence. Words are separated by single spaces.",
    inputFormat: "One line containing a sentence with at least one word.",
    outputFormat: "Number of words as an integer.",
    examples: [{ input: "Hello World", output: "2" }],
    testCases: [
      { input: "Hello World", expectedOutput: "2" },
      { input: "one", expectedOutput: "1" },
      { input: "This is PlacementPro", expectedOutput: "3" }
    ],
    hints: ["Split on spaces and count tokens.", "Be careful: an empty split can produce one empty token in some languages."]
  },
  {
    id: 23,
    title: "Maximum Occurring Character",
    difficulty: "Medium",
    topics: ["Strings", "Hashing"],
    statement: "Given a lowercase word, print the most frequent character and its count separated by a space. If multiple characters share the highest count, print the alphabetically smallest one.",
    inputFormat: "One lowercase word W (1 <= length <= 1000).",
    outputFormat: "<char> <count>",
    examples: [{ input: "hello", output: "l 2" }],
    testCases: [
      { input: "hello", expectedOutput: "l 2" },
      { input: "aabbbcc", expectedOutput: "b 3" },
      { input: "zxy", expectedOutput: "x 1" }
    ],
    hints: ["Use an array/count map of size 26.", "Scan letters 'a' to 'z' in order to break ties."]
  },
  {
    id: 24,
    title: "Decimal to Binary",
    difficulty: "Easy",
    topics: ["Math"],
    statement: "Convert a non-negative decimal integer to its binary representation (without leading zeros).",
    inputFormat: "An integer N (0 <= N <= 10^6).",
    outputFormat: "Binary form of N as text.",
    examples: [{ input: "10", output: "1010" }],
    testCases: [
      { input: "10", expectedOutput: "1010" },
      { input: "255", expectedOutput: "11111111" },
      { input: "0", expectedOutput: "0" }
    ],
    hints: ["Collect remainders of division by 2, then read them backwards.", "Special case: 0 should print just 0."]
  },
  {
    id: 25,
    title: "Linear Search Index",
    difficulty: "Easy",
    topics: ["Searching", "Arrays"],
    statement: "Search for a key in an unsorted array and print its 0-based index, or -1 if not found.",
    inputFormat: "First line: key K.\nSecond line: N space-separated integers.",
    outputFormat: "Index of the first occurrence of K, or -1.",
    examples: [{ input: "30\n10 30 50", output: "1" }],
    testCases: [
      { input: "30\n10 30 50", expectedOutput: "1" },
      { input: "10\n10 30 50", expectedOutput: "0" },
      { input: "99\n10 30 50", expectedOutput: "-1" }
    ],
    hints: ["Scan left to right and return immediately on match.", "-1 only after the full scan finishes."]
  },
  {
    id: 26,
    title: "Rotate Array Right by K",
    difficulty: "Medium",
    topics: ["Arrays"],
    statement: "Rotate an array of N elements to the right by K positions (K may exceed N).",
    inputFormat: "First line: N and K.\nSecond line: N space-separated integers.",
    outputFormat: "The rotated array, space-separated.",
    examples: [{ input: "5 2\n1 2 3 4 5", output: "4 5 1 2 3" }],
    testCases: [
      { input: "5 2\n1 2 3 4 5", expectedOutput: "4 5 1 2 3" },
      { input: "3 1\n1 2 3", expectedOutput: "3 1 2" },
      { input: "3 4\n1 2 3", expectedOutput: "3 1 2" }
    ],
    hints: ["Effective rotation is K % N.", "The element at index i moves to (i + K) % N."]
  },
  {
    id: 27,
    title: "FizzBuzz",
    difficulty: "Easy",
    topics: ["Loops", "Logic"],
    statement: "Print numbers 1 to N, one per line. Replace multiples of 3 with Fizz, multiples of 5 with Buzz, and multiples of both with FizzBuzz.",
    inputFormat: "An integer N (1 <= N <= 100).",
    outputFormat: "N lines as per the rules.",
    examples: [{ input: "5", output: "1\n2\nFizz\n4\nBuzz" }],
    testCases: [
      { input: "5", expectedOutput: "1\n2\nFizz\n4\nBuzz" },
      { input: "3", expectedOutput: "1\n2\nFizz" },
      { input: "15", expectedOutput: "1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz" }
    ],
    hints: ["Check divisibility by 15 first.", "Then check 3, then 5."]
  },
  {
    id: 28,
    title: "Sum of Even Numbers in Range",
    difficulty: "Easy",
    topics: ["Loops", "Math"],
    statement: "Compute the sum of all even numbers between A and B inclusive.",
    inputFormat: "One line with integers A and B (A <= B, values within 1..10000).",
    outputFormat: "The sum as an integer.",
    examples: [{ input: "1 10", output: "30" }],
    testCases: [
      { input: "1 10", expectedOutput: "30" },
      { input: "2 2", expectedOutput: "2" },
      { input: "5 5", expectedOutput: "0" }
    ],
    hints: ["Start the loop at the first even >= A.", "Step by 2 after that."]
  },
  {
    id: 29,
    title: "Longest Word in a Sentence",
    difficulty: "Easy",
    topics: ["Strings"],
    statement: "Find the longest word in the sentence. If several words tie in length, print the earliest one.",
    inputFormat: "One sentence with words separated by single spaces.",
    outputFormat: "The longest word.",
    examples: [{ input: "I love PlacementPro", output: "PlacementPro" }],
    testCases: [
      { input: "I love PlacementPro", expectedOutput: "PlacementPro" },
      { input: "Hi there", expectedOutput: "there" },
      { input: "a bb cc", expectedOutput: "bb" }
    ],
    hints: ["Split into words and track max length and best word.", "Update only when strictly longer to keep the earliest tie."]
  },
  {
    id: 30,
    title: "Anagram Check",
    difficulty: "Medium",
    topics: ["Strings", "Sorting"],
    statement: "Check whether two words are anagrams of each other, ignoring letter case.",
    inputFormat: "One line with two words separated by a space.",
    outputFormat: "Print \"Anagram\" or \"Not Anagram\".",
    examples: [{ input: "listen silent", output: "Anagram" }],
    testCases: [
      { input: "listen silent", expectedOutput: "Anagram" },
      { input: "Hello hello", expectedOutput: "Anagram" },
      { input: "cat dog", expectedOutput: "Not Anagram" }
    ],
    hints: ["Lowercase both words, sort their letters and compare.", "Different lengths can never be anagrams."]
  }
];
