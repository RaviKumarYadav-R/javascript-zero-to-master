//* ============================================================
//* JAVASCRIPT CONDITIONALS
//* ============================================================

//* This file is the practical companion to README.md.
//* Conditional statements let a program choose what to execute
//* based on whether a condition is true or false.


//* ------------------------------------------------------------
//* 1. WHAT IS A CONDITIONAL?
//* ------------------------------------------------------------

//* Definition:
//* A conditional statement controls program flow by evaluating
//* a condition and choosing which code should execute.

const age = 21;

if (age >= 18) {
  console.log("You are an adult.");
}


//* ------------------------------------------------------------
//* 2. IF STATEMENT
//* ------------------------------------------------------------

//* Definition:
//* `if` executes its block only when its condition is truthy.

const temperature = 35;

if (temperature > 30) {
  console.log("It is hot.");
}

//* If the condition is falsy, the block is skipped.

if (temperature < 0) {
  console.log("Freezing temperature.");
}


//* ------------------------------------------------------------
//* 3. IF...ELSE
//* ------------------------------------------------------------

//* Definition:
//* `if...else` chooses between two execution paths.

const isLoggedIn = true;

if (isLoggedIn) {
  console.log("Welcome back!");
} else {
  console.log("Please log in.");
}


//* ------------------------------------------------------------
//* 4. ELSE IF
//* ------------------------------------------------------------

//* Definition:
//* `else if` lets us test another condition when the previous
//* condition was falsy.

const marks = 82;

if (marks >= 90) {
  console.log("Grade A+");
} else if (marks >= 80) {
  console.log("Grade A");
} else if (marks >= 70) {
  console.log("Grade B");
} else if (marks >= 60) {
  console.log("Grade C");
} else {
  console.log("Needs improvement");
}


//* ------------------------------------------------------------
//* 5. CONDITIONAL ORDER MATTERS
//* ------------------------------------------------------------

//* Conditions are checked from top to bottom.
//* Once an `if` or `else if` condition is truthy, its block runs
//* and the remaining branches in that chain are skipped.

const score = 95;

if (score >= 50) {
  console.log("Passed");
} else if (score >= 90) {
  console.log("Excellent");
}

//* Output: Passed
//* The second condition is never reached because score >= 50
//* is already true.


//* ------------------------------------------------------------
//* 6. NESTED CONDITIONALS
//* ------------------------------------------------------------

//* Definition:
//* A nested conditional is a conditional placed inside another
//* conditional block.

const user = {
  isLoggedIn: true,
  role: "admin",
};

if (user.isLoggedIn) {
  if (user.role === "admin") {
    console.log("Admin dashboard");
  } else {
    console.log("User dashboard");
  }
} else {
  console.log("Login required");
}


//* ------------------------------------------------------------
//* 7. TRUTHY AND FALSY CONDITIONS
//* ------------------------------------------------------------

//* `if` performs boolean conversion of its condition.

const username = "Ravi";

if (username) {
  console.log("Username is present.");
}

const emptyName = "";

if (!emptyName) {
  console.log("Name is empty.");
}


//* ------------------------------------------------------------
//* 8. STRICT COMPARISON IN CONDITIONS
//* ------------------------------------------------------------

//* Prefer strict equality (`===`) when comparing values unless
//* you intentionally need loose-equality behavior.

const inputAge = "21";

if (inputAge === 21) {
  console.log("This does not run.");
}

if (inputAge === "21") {
  console.log("The input is the string 21.");
}


//* ------------------------------------------------------------
//* 9. LOGICAL AND &&
//* ------------------------------------------------------------

//* Definition:
//* `&&` can require multiple conditions to be truthy.

const hasUsername = true;
const hasPassword = true;

if (hasUsername && hasPassword) {
  console.log("Login form is complete.");
}


//* ------------------------------------------------------------
//* 10. LOGICAL OR ||
//* ------------------------------------------------------------

//* Definition:
//* `||` can allow a branch when at least one condition is truthy.

const isAdmin = false;
const isModerator = true;

if (isAdmin || isModerator) {
  console.log("You can access moderation tools.");
}


//* ------------------------------------------------------------
//* 11. LOGICAL NOT !
//* ------------------------------------------------------------

//* Definition:
//* `!` negates the boolean interpretation of a value.

const loggedIn = false;

if (!loggedIn) {
  console.log("Please log in first.");
}


//* ------------------------------------------------------------
//* 12. MULTIPLE CONDITIONS
//* ------------------------------------------------------------

const userAge = 22;
const hasId = true;

if (userAge >= 18 && hasId) {
  console.log("Access granted.");
} else {
  console.log("Access denied.");
}


//* ------------------------------------------------------------
//* 13. GROUPING CONDITIONS WITH PARENTHESES
//* ------------------------------------------------------------

const role = "editor";
const verified = true;

if ((role === "admin" || role === "editor") && verified) {
  console.log("Verified content access granted.");
}

//* Parentheses make the intended logical grouping explicit.


//* ------------------------------------------------------------
//* 14. SWITCH STATEMENT
//* ------------------------------------------------------------

//* Definition:
//* `switch` compares an expression against case values and runs
//* the matching case. Case matching uses strict-equality semantics.

const day = "Monday";

switch (day) {
  case "Monday":
    console.log("Start of the week.");
    break;

  case "Friday":
    console.log("Almost weekend.");
    break;

  case "Sunday":
    console.log("Weekend.");
    break;

  default:
    console.log("Regular day.");
}


//* ------------------------------------------------------------
//* 15. WHY BREAK IS IMPORTANT IN SWITCH
//* ------------------------------------------------------------

//* `break` exits the switch statement.
//* Without it, execution can continue into the next case.

const fruit = "apple";

switch (fruit) {
  case "apple":
    console.log("Apple selected.");
    break;

  case "banana":
    console.log("Banana selected.");
    break;

  default:
    console.log("Unknown fruit.");
}


//* ------------------------------------------------------------
//* 16. SWITCH FALL-THROUGH
//* ------------------------------------------------------------

//* Fall-through can be intentional when multiple cases should
//* execute the same block.

const permission = "editor";

switch (permission) {
  case "admin":
  case "editor":
    console.log("Can edit content.");
    break;

  case "viewer":
    console.log("Can view content.");
    break;

  default:
    console.log("Unknown permission.");
}


//* ------------------------------------------------------------
//* 17. DEFAULT IN SWITCH
//* ------------------------------------------------------------

//* `default` runs when no case matches.

const command = "delete";

switch (command) {
  case "create":
    console.log("Creating...");
    break;
  case "update":
    console.log("Updating...");
    break;
  default:
    console.log("Unsupported command.");
}


//* ------------------------------------------------------------
//* 18. TERNARY OPERATOR
//* ------------------------------------------------------------

//* Definition:
//* The conditional (ternary) operator is an expression that
//* selects one of two values.

const ageStatus = age >= 18 ? "Adult" : "Minor";

console.log(ageStatus); // Adult

//* Syntax:
//* condition ? valueIfTrue : valueIfFalse


//* ------------------------------------------------------------
//* 19. TERNARY VS IF
//* ------------------------------------------------------------

//* Ternary is useful when selecting a value.

const isOnline = true;
const status = isOnline ? "Online" : "Offline";

console.log(status); // Online

//* For multiple statements or complex control flow, `if` is
//* usually clearer.


//* ------------------------------------------------------------
//* 20. CONDITIONAL RETURN
//* ------------------------------------------------------------

//* A function can use conditions to return early.

function canVote(age) {
  if (age < 18) {
    return false;
  }

  return true;
}

console.log(canVote(21)); // true
console.log(canVote(16)); // false


//* ------------------------------------------------------------
//* 21. EARLY RETURN WITH VALIDATION
//* ------------------------------------------------------------

function createUsername(username) {
  if (!username) {
    return "Username is required.";
  }

  if (username.length < 3) {
    return "Username must have at least 3 characters.";
  }

  return `Username '${username}' is valid.`;
}

console.log(createUsername(""));
console.log(createUsername("ab"));
console.log(createUsername("ravi"));


//* ------------------------------------------------------------
//* 22. REAL-WORLD LOGIN EXAMPLE
//* ------------------------------------------------------------

function login(username, password, isVerified, isBlocked) {
  if (isBlocked) {
    return "Account is blocked.";
  }

  if (!username || !password) {
    return "Username and password are required.";
  }

  if (!isVerified) {
    return "Please verify your account.";
  }

  return "Login successful.";
}

console.log(login("ravi", "secret123", true, false));
// Login successful.

console.log(login("ravi", "secret123", false, false));
// Please verify your account.

console.log(login("ravi", "secret123", true, true));
// Account is blocked.


//* ------------------------------------------------------------
//* 23. REAL-WORLD DISCOUNT EXAMPLE
//* ------------------------------------------------------------

function calculateDiscount(total) {
  if (total >= 5000) {
    return 20;
  }

  if (total >= 2000) {
    return 10;
  }

  if (total >= 1000) {
    return 5;
  }

  return 0;
}

console.log(calculateDiscount(6000)); // 20
console.log(calculateDiscount(2500)); // 10
console.log(calculateDiscount(500));  // 0


//* ------------------------------------------------------------
//* 24. COMMON MISTAKE: ASSIGNMENT VS COMPARISON
//* ------------------------------------------------------------

let points = 10;

//* Wrong in most condition checks:
//* if (points = 20) { ... }
//* This assigns 20 instead of comparing values.

if (points === 20) {
  console.log("Points are exactly 20.");
}


//* ------------------------------------------------------------
//* 25. COMMON MISTAKE: WRONG CONDITION ORDER
//* ------------------------------------------------------------

const percentage = 95;

//* Better: test the most specific/highest threshold first.
if (percentage >= 90) {
  console.log("A+");
} else if (percentage >= 80) {
  console.log("A");
} else {
  console.log("Below A");
}


//* ------------------------------------------------------------
//* 26. COMMON MISTAKE: OVERUSING NESTED IF
//* ------------------------------------------------------------

//* Deep nesting can make code harder to read.
//* Prefer guard clauses / early returns where appropriate.

function accessPage(user) {
  if (!user) {
    return "No user.";
  }

  if (!user.isLoggedIn) {
    return "Login required.";
  }

  if (user.role !== "admin") {
    return "Admin access required.";
  }

  return "Access granted.";
}

console.log(accessPage({ isLoggedIn: true, role: "admin" }));
// Access granted.


//* ------------------------------------------------------------
//* 27. OUTPUT PREDICTION
//* ------------------------------------------------------------

const number = 10;

if (number > 5) {
  console.log("A");
} else if (number > 8) {
  console.log("B");
} else {
  console.log("C");
}

//* Output: A
//* Why? The first condition is already true.


//* ------------------------------------------------------------
//* 28. MINI CHALLENGES
//* ------------------------------------------------------------

//* Challenge 1:
//* Write a function that checks whether a number is positive,
//* negative, or zero.

//* Challenge 2:
//* Create a grade calculator using if / else if / else.

//* Challenge 3:
//* Create a voting eligibility checker.

//* Challenge 4:
//* Create a login function using username, password,
//* verification, and blocked status.

//* Challenge 5:
//* Create a day-of-week message using switch.

//* Challenge 6:
//* Create a function that returns "Even" or "Odd" using `%`.

//* Challenge 7:
//* Rewrite a simple if/else value selection using a ternary.


//* ------------------------------------------------------------
//* 29. TEACH-BACK QUESTIONS
//* ------------------------------------------------------------

//* 1. What is a conditional statement?
//* 2. What happens when an if condition is falsy?
//* 3. What is the purpose of else?
//* 4. When should you use else if?
//* 5. Why does condition order matter?
//* 6. What is a nested conditional?
//* 7. How do && and || help build conditions?
//* 8. What is switch useful for?
//* 9. Why is break commonly used in switch cases?
//* 10. What is the ternary operator?
//* 11. Why can early returns make validation easier to read?
//* 12. What is the difference between = and === in a condition?


//* ============================================================
//* END OF CONDITIONALS
//* ============================================================
