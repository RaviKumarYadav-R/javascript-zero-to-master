//* ============================================================
//* JAVASCRIPT OBJECTS — PRACTICAL COMPANION
//* ============================================================

//* Definition:
//* An object is a JavaScript value used to represent a collection of
//* properties. Each property has a key and a value. Object values can
//* be primitives, arrays, functions, or other objects.


//* ------------------------------------------------------------
//* 1. OBJECT LITERAL
//* ------------------------------------------------------------

const user = {
  name: "Ravi",
  age: 21,
  isDeveloper: true,
};

console.log(user);

//* key: name
//* value: "Ravi"
//* key-value pair: name: "Ravi"


//* ------------------------------------------------------------
//* 2. ACCESSING PROPERTIES — DOT NOTATION
//* ------------------------------------------------------------

console.log(user.name); // Ravi
console.log(user.age); // 21

//* Dot notation is concise when the property name is a valid identifier
//* and is known directly in the code.


//* ------------------------------------------------------------
//* 3. ACCESSING PROPERTIES — BRACKET NOTATION
//* ------------------------------------------------------------

console.log(user["name"]); // Ravi
console.log(user["age"]); // 21

//* Bracket notation is required or useful for dynamic keys and keys that
//* are not valid identifier-style names.


//* ------------------------------------------------------------
//* 4. DYNAMIC PROPERTY ACCESS
//* ------------------------------------------------------------

const property = "name";
console.log(user[property]); // Ravi

//* Important:
//* user[property] -> uses the value stored in property.
//* user.property -> literally looks for a property named "property".


//* ------------------------------------------------------------
//* 5. ADDING A PROPERTY
//* ------------------------------------------------------------

user.city = "Dhanbad";
user["role"] = "Web Developer";

console.log(user);


//* ------------------------------------------------------------
//* 6. UPDATING A PROPERTY
//* ------------------------------------------------------------

user.age = 22;
console.log(user.age); // 22


//* ------------------------------------------------------------
//* 7. DELETING A PROPERTY
//* ------------------------------------------------------------

const account = {
  username: "ravi",
  password: "secret",
};

delete account.password;
console.log(account);

//* delete removes a property from the object. Avoid storing real passwords
//* in plain JavaScript objects in production applications.


//* ------------------------------------------------------------
//* 8. OBJECTS CAN STORE MANY TYPES
//* ------------------------------------------------------------

const developer = {
  name: "Ravi",
  age: 21,
  skills: ["HTML", "CSS", "JavaScript"],
  address: {
    city: "Dhanbad",
    country: "India",
  },
  greet() {
    return "Hello!";
  },
};

console.log(developer.skills[2]);
console.log(developer.address.city);
console.log(developer.greet());


//* ------------------------------------------------------------
//* 9. NESTED OBJECTS
//* ------------------------------------------------------------

const product = {
  id: 101,
  name: "Laptop",
  price: 50000,
  seller: {
    name: "Ravi Store",
    address: {
      city: "Dhanbad",
    },
  },
};

console.log(product.seller.address.city);


//* ------------------------------------------------------------
//* 10. OPTIONAL CHAINING
//* ------------------------------------------------------------

console.log(product.seller?.address?.city); // Dhanbad
console.log(product.shipping?.address?.city); // undefined

//* ?. stops the property-access chain when the value before it is nullish.


//* ------------------------------------------------------------
//* 11. NULLISH DEFAULT WITH ??
//* ------------------------------------------------------------

const settings = {
  theme: null,
};

console.log(settings.theme ?? "dark"); // dark

//* ?? uses the fallback only when the left side is null or undefined.


//* ------------------------------------------------------------
//* 12. OBJECT KEYS
//* ------------------------------------------------------------

const profile = {
  name: "Ravi",
  age: 21,
  role: "developer",
};

console.log(Object.keys(profile));

//* Object.keys() returns an array of the object's own enumerable string keys.


//* ------------------------------------------------------------
//* 13. OBJECT VALUES
//* ------------------------------------------------------------

console.log(Object.values(profile));

//* Object.values() returns an array of the object's own enumerable string values.


//* ------------------------------------------------------------
//* 14. OBJECT ENTRIES
//* ------------------------------------------------------------

console.log(Object.entries(profile));

//* Object.entries() returns [key, value] pairs.


//* ------------------------------------------------------------
//* 15. LOOP THROUGH OBJECT
//* ------------------------------------------------------------

for (const [key, value] of Object.entries(profile)) {
  console.log(key, value);
}


//* ------------------------------------------------------------
//* 16. for...in
//* ------------------------------------------------------------

for (const key in profile) {
  console.log(key, profile[key]);
}

//* for...in enumerates enumerable property keys, including enumerable
//* inherited properties. Object.keys/entries are often clearer when you
//* specifically want an object's own enumerable properties.


//* ------------------------------------------------------------
//* 17. HAS OWN PROPERTY — Object.hasOwn()
//* ------------------------------------------------------------

console.log(Object.hasOwn(profile, "name")); // true
console.log(Object.hasOwn(profile, "toString")); // false

//* Object.hasOwn() checks whether the property belongs directly to the object.


//* ------------------------------------------------------------
//* 18. `in` OPERATOR
//* ------------------------------------------------------------

console.log("name" in profile); // true
console.log("toString" in profile); // true

//* `in` checks the object and its prototype chain.
//* Use Object.hasOwn() when inherited properties should not count.


//* ------------------------------------------------------------
//* 19. OBJECT DESTRUCTURING
//* ------------------------------------------------------------

const student = {
  name: "Aman",
  age: 20,
};

const { name, age } = student;

console.log(name, age);


//* ------------------------------------------------------------
//* 20. DESTRUCTURING WITH RENAMING
//* ------------------------------------------------------------

const { name: studentName, age: studentAge } = student;

console.log(studentName, studentAge);

//* `name: studentName` means read the property name and store it in
//* a local variable named studentName.


//* ------------------------------------------------------------
//* 21. DESTRUCTURING DEFAULT VALUE
//* ------------------------------------------------------------

const { city = "Unknown" } = student;
console.log(city); // Unknown

//* Defaults apply when the property value is undefined.


//* ------------------------------------------------------------
//* 22. DESTRUCTURING NESTED OBJECTS
//* ------------------------------------------------------------

const employee = {
  name: "Neha",
  address: {
    city: "Ranchi",
    pin: 834001,
  },
};

const {
  address: { city: employeeCity },
} = employee;

console.log(employeeCity); // Ranchi


//* ------------------------------------------------------------
//* 23. REST IN OBJECT DESTRUCTURING
//* ------------------------------------------------------------

const settingsObject = {
  theme: "dark",
  font: "Inter",
  language: "en",
};

const { theme, ...otherSettings } = settingsObject;

console.log(theme); // dark
console.log(otherSettings); // { font: "Inter", language: "en" }

//* Rest collects remaining own enumerable properties into a new object.


//* ------------------------------------------------------------
//* 24. OBJECT SPREAD
//* ------------------------------------------------------------

const baseUser = {
  name: "Ravi",
  role: "developer",
};

const updatedUser = {
  ...baseUser,
  role: "full-stack developer",
};

console.log(updatedUser);
console.log(baseUser); // unchanged

//* Later properties override earlier properties with the same key.


//* ------------------------------------------------------------
//* 25. SHALLOW COPY WITH SPREAD
//* ------------------------------------------------------------

const originalUser = {
  name: "Ravi",
  address: {
    city: "Dhanbad",
  },
};

const copiedUser = { ...originalUser };
copiedUser.name = "Aman";
copiedUser.address.city = "Ranchi";

console.log(originalUser.name); // Ravi
console.log(originalUser.address.city); // Ranchi

//* Spread copied the top-level object, but nested address is still shared.


//* ------------------------------------------------------------
//* 26. Object.assign()
//* ------------------------------------------------------------

const target = { a: 1 };
const source = { b: 2 };

const assigned = Object.assign(target, source);

console.log(assigned); // { a: 1, b: 2 }
console.log(target); // also changed
console.log(assigned === target); // true

//* Object.assign(target, source) mutates target and returns target.


//* ------------------------------------------------------------
//* 27. NON-MUTATING MERGE WITH SPREAD
//* ------------------------------------------------------------

const first = { a: 1 };
const second = { b: 2 };
const merged = { ...first, ...second };

console.log(merged);
console.log(first);
console.log(second);


//* ------------------------------------------------------------
//* 28. PROPERTY COLLISION
//* ------------------------------------------------------------

const left = { theme: "light", language: "en" };
const right = { theme: "dark" };

console.log({ ...left, ...right }); // theme becomes dark
console.log({ ...right, ...left }); // theme becomes light

//* With object spread, later sources win for duplicate keys.


//* ------------------------------------------------------------
//* 29. COMPUTED PROPERTY NAMES
//* ------------------------------------------------------------

const keyName = "score";
const score = 95;

const result = {
  [keyName]: score,
};

console.log(result); // { score: 95 }


//* ------------------------------------------------------------
//* 30. METHOD SHORTHAND
//* ------------------------------------------------------------

const calculator = {
  add(a, b) {
    return a + b;
  },
  subtract(a, b) {
    return a - b;
  },
};

console.log(calculator.add(10, 5));
console.log(calculator.subtract(10, 5));


//* ------------------------------------------------------------
//* 31. PROPERTY SHORTHAND
//* ------------------------------------------------------------

const username = "Ravi";
const userRole = "developer";

const userData = {
  username,
  userRole,
};

console.log(userData);

//* `{ username }` is shorthand for `{ username: username }`.


//* ------------------------------------------------------------
//* 32. OBJECT REFERENCE
//* ------------------------------------------------------------

const person1 = { name: "Ravi" };
const person2 = person1;

person2.name = "Aman";

console.log(person1.name); // Aman
console.log(person2.name); // Aman

//* Both variables refer to the same object.


//* ------------------------------------------------------------
//* 33. OBJECT EQUALITY
//* ------------------------------------------------------------

console.log({ name: "Ravi" } === { name: "Ravi" }); // false

const sharedObject = { name: "Ravi" };
const sameObject = sharedObject;

console.log(sharedObject === sameObject); // true

//* Object equality compares identity, not structural content.


//* ------------------------------------------------------------
//* 34. Object.freeze()
//* ------------------------------------------------------------

const frozen = Object.freeze({
  name: "Ravi",
});

//* frozen.name = "Aman"; // ignored in sloppy mode / TypeError in strict mode
console.log(frozen.name); // Ravi

//* Object.freeze() prevents adding/removing/changing own data properties
//* at the top level. It is shallow.


//* ------------------------------------------------------------
//* 35. Object.seal()
//* ------------------------------------------------------------

const sealed = Object.seal({
  name: "Ravi",
});

sealed.name = "Aman"; // allowed
//* sealed.age = 21; // not allowed in strict mode
//* delete sealed.name; // not allowed in strict mode

console.log(sealed);

//* seal() prevents adding/removing own properties but allows changing
//* existing writable properties.


//* ------------------------------------------------------------
//* 36. Object.preventExtensions()
//* ------------------------------------------------------------

const fixedShape = { name: "Ravi" };
Object.preventExtensions(fixedShape);

fixedShape.name = "Aman"; // allowed
//* fixedShape.age = 21; // not allowed in strict mode

console.log(fixedShape);

//* preventExtensions() prevents new own properties but does not itself
//* prevent deleting or modifying existing properties.


//* ------------------------------------------------------------
//* 37. PROPERTY DESCRIPTORS
//* ------------------------------------------------------------

const descriptorObject = { name: "Ravi" };

console.log(Object.getOwnPropertyDescriptor(descriptorObject, "name"));

//* A normal object-literal data property is generally writable, enumerable,
//* and configurable.


//* ------------------------------------------------------------
//* 38. defineProperty()
//* ------------------------------------------------------------

const accountData = {};

Object.defineProperty(accountData, "id", {
  value: 101,
  writable: false,
  enumerable: true,
  configurable: false,
});

console.log(accountData.id); // 101


//* ------------------------------------------------------------
//* 39. enumerable
//* ------------------------------------------------------------

const hidden = {};

Object.defineProperty(hidden, "secret", {
  value: "hidden value",
  enumerable: false,
});

console.log(hidden.secret); // hidden value
console.log(Object.keys(hidden)); // []

//* Non-enumerable properties are not returned by Object.keys/values/entries.


//* ------------------------------------------------------------
//* 40. PROPERTY KEYS ARE STRINGS OR SYMBOLS
//* ------------------------------------------------------------

const numericKeyObject = {
  1: "one",
};

console.log(numericKeyObject[1]); // one
console.log(numericKeyObject["1"]); // one

//* Ordinary object property keys are strings or Symbols. A numeric-looking
//* key in an object literal is represented as a string property key.


//* ------------------------------------------------------------
//* 41. SYMBOL PROPERTY
//* ------------------------------------------------------------

const secretKey = Symbol("secret");
const symbolObject = {
  name: "Ravi",
  [secretKey]: 123,
};

console.log(symbolObject[secretKey]); // 123
console.log(Object.keys(symbolObject)); // ["name"]
console.log(Object.getOwnPropertySymbols(symbolObject)); // [Symbol(secret)]

//* Symbols are useful for unique property keys that do not collide with
//* ordinary string-named properties.


//* ------------------------------------------------------------
//* 42. SYMBOLS ARE NOT PRIVATE
//* ------------------------------------------------------------

//* A Symbol-keyed property is not automatically secret. Code with access
//* to the object can discover symbol keys using Object.getOwnPropertySymbols().


//* ------------------------------------------------------------
//* 43. PROTOTYPE BASICS
//* ------------------------------------------------------------

const plainObject = {};

console.log(Object.getPrototypeOf(plainObject) === Object.prototype); // true
console.log(Object.getPrototypeOf(plainObject));

//* Objects can inherit properties and methods through their prototype chain.


//* ------------------------------------------------------------
//* 44. prototype CHAIN LOOKUP
//* ------------------------------------------------------------

const parent = {
  greet() {
    return "Hello from parent";
  },
};

const child = Object.create(parent);
child.name = "Ravi";

console.log(child.greet()); // Hello from parent
console.log(Object.hasOwn(child, "greet")); // false
console.log("greet" in child); // true


//* ------------------------------------------------------------
//* 45. Object.create(null)
//* ------------------------------------------------------------

const dictionary = Object.create(null);
dictionary.apple = 10;
dictionary.banana = 20;

console.log(dictionary.apple);
console.log(Object.getPrototypeOf(dictionary)); // null

//* Useful for dictionary-like objects when a prototype is not desired.


//* ------------------------------------------------------------
//* 46. Object.hasOwn() VS in
//* ------------------------------------------------------------

const parentRecord = { inherited: true };
const childRecord = Object.create(parentRecord);
childRecord.own = true;

console.log(Object.hasOwn(childRecord, "own")); // true
console.log(Object.hasOwn(childRecord, "inherited")); // false
console.log("inherited" in childRecord); // true


//* ------------------------------------------------------------
//* 47. GETTERS
//* ------------------------------------------------------------

const rectangle = {
  width: 10,
  height: 5,
  get area() {
    return this.width * this.height;
  },
};

console.log(rectangle.area); // 50

//* A getter is accessed like a property, not called like a method.


//* ------------------------------------------------------------
//* 48. SETTERS
//* ------------------------------------------------------------

const profileData = {
  firstName: "Ravi",
  lastName: "Kumar",
  set fullName(value) {
    const [first, last] = value.split(" ");
    this.firstName = first;
    this.lastName = last;
  },
};

profileData.fullName = "Aman Singh";
console.log(profileData.firstName, profileData.lastName);


//* ------------------------------------------------------------
//* 49. `this` IN OBJECT METHODS
//* ------------------------------------------------------------

const counter = {
  value: 0,
  increment() {
    this.value += 1;
  },
};

counter.increment();
counter.increment();
console.log(counter.value); // 2

//* In a normal method call such as counter.increment(), `this` refers to
//* the receiver object in non-strict/strict semantics according to the call form.


//* ------------------------------------------------------------
//* 50. ARROW FUNCTION AS OBJECT METHOD — WARNING
//* ------------------------------------------------------------

const badCounter = {
  value: 0,
  increment: () => {
    //* `this` is NOT dynamically bound to badCounter here.
  },
};

//* Prefer a normal method when you need this to refer to the object.


//* ------------------------------------------------------------
//* 51. METHOD BORROWING
//* ------------------------------------------------------------

const firstPerson = {
  name: "Ravi",
  greet() {
    return `Hello, ${this.name}`;
  },
};

const secondPerson = { name: "Aman" };

console.log(firstPerson.greet.call(secondPerson)); // Hello, Aman

//* call() invokes a function with an explicitly supplied this value.


//* ------------------------------------------------------------
//* 52. call(), apply(), bind()
//* ------------------------------------------------------------

function introduce(greeting, punctuation) {
  return `${greeting}, ${this.name}${punctuation}`;
}

const person = { name: "Ravi" };

console.log(introduce.call(person, "Hello", "!"));
console.log(introduce.apply(person, ["Hi", "."]));

const boundIntroduce = introduce.bind(person, "Welcome");
console.log(boundIntroduce("!"));

//* call -> arguments individually
//* apply -> arguments as an array-like list
//* bind -> returns a new function with this/arguments preset


//* ------------------------------------------------------------
//* 53. CONSTRUCTOR FUNCTION
//* ------------------------------------------------------------

function User(name, age) {
  this.name = name;
  this.age = age;
}

const user1 = new User("Ravi", 21);
const user2 = new User("Aman", 20);

console.log(user1);
console.log(user2);

//* `new` creates a new object, links it to User.prototype, calls User with
//* that object as this, and returns the resulting object unless the function
//* explicitly returns another object.


//* ------------------------------------------------------------
//* 54. Object.getPrototypeOf()
//* ------------------------------------------------------------

console.log(Object.getPrototypeOf(user1) === User.prototype); // true


//* ------------------------------------------------------------
//* 55. CLASS PREVIEW
//* ------------------------------------------------------------

class Developer {
  constructor(name) {
    this.name = name;
  }

  code() {
    return `${this.name} is coding`;
  }
}

const dev = new Developer("Ravi");
console.log(dev.code());

//* Classes are covered deeply in the OOP chapter. Here, focus on the
//* object created by `new` and the prototype-based behavior underneath.


//* ------------------------------------------------------------
//* 56. OBJECT PROPERTY EXISTENCE
//* ------------------------------------------------------------

const config = {
  port: 3000,
};

console.log(Object.hasOwn(config, "port")); // true
console.log(Object.hasOwn(config, "host")); // false


//* ------------------------------------------------------------
//* 57. OPTIONAL CHAINING WITH METHODS
//* ------------------------------------------------------------

const apiResponse = {
  user: {
    getName() {
      return "Ravi";
    },
  },
};

console.log(apiResponse.user?.getName?.()); // Ravi
console.log(apiResponse.profile?.getName?.()); // undefined


//* ------------------------------------------------------------
//* 58. OBJECT DESTRUCTURING IN FUNCTION PARAMETERS
//* ------------------------------------------------------------

function printUser({ name, age }) {
  console.log(`${name} is ${age} years old`);
}

printUser({ name: "Ravi", age: 21 });

//* This is common for configuration objects and function APIs.


//* ------------------------------------------------------------
//* 59. DEFAULT OBJECT PARAMETER
//* ------------------------------------------------------------

function createUser({ name = "Guest", role = "user" } = {}) {
  return { name, role };
}

console.log(createUser());
console.log(createUser({ name: "Ravi" }));


//* ------------------------------------------------------------
//* 60. IMMUTABLE UPDATE PATTERN
//* ------------------------------------------------------------

const state = {
  user: {
    name: "Ravi",
    settings: {
      theme: "light",
    },
  },
};

const nextState = {
  ...state,
  user: {
    ...state.user,
    settings: {
      ...state.user.settings,
      theme: "dark",
    },
  },
};

console.log(nextState);
console.log(state.user.settings.theme); // light

//* Nested spread creates new objects along the path being updated.


//* ------------------------------------------------------------
//* 61. Object.keys() + map()
//* ------------------------------------------------------------

const scores = {
  Ravi: 90,
  Aman: 85,
  Neha: 95,
};

const scoreMessages = Object.entries(scores).map(
  ([name, score]) => `${name}: ${score}`
);

console.log(scoreMessages);


//* ------------------------------------------------------------
//* 62. CONVERT OBJECT TO QUERY STRING
//* ------------------------------------------------------------

const params = {
  search: "javascript",
  page: 2,
};

const queryString = new URLSearchParams(params).toString();
console.log(queryString);

//* URLSearchParams is a Web API; this example is useful in browser/Node
//* environments that provide it. It is not part of the object model itself.


//* ------------------------------------------------------------
//* 63. OBJECT TO JSON
//* ------------------------------------------------------------

const jsonUser = {
  name: "Ravi",
  age: 21,
};

const jsonText = JSON.stringify(jsonUser);
console.log(jsonText);

const parsedUser = JSON.parse(jsonText);
console.log(parsedUser);

//* JSON.stringify() converts a JavaScript value to JSON text.
//* JSON.parse() converts valid JSON text into a JavaScript value.


//* ------------------------------------------------------------
//* 64. JSON LIMITATIONS
//* ------------------------------------------------------------

const jsonExample = {
  date: new Date("2026-01-01"),
  missing: undefined,
  method() {
    return true;
  },
};

console.log(JSON.stringify(jsonExample));

//* JSON serialization does not preserve every JavaScript value/type.
//* Functions and undefined object properties are omitted; Date uses its
//* string serialization. Do not treat JSON as a general-purpose clone format.


//* ------------------------------------------------------------
//* 65. structuredClone()
//* ------------------------------------------------------------

const originalData = {
  user: {
    name: "Ravi",
    skills: ["JS"],
  },
};

const deepCopy = structuredClone(originalData);
deepCopy.user.skills.push("React");

console.log(originalData.user.skills); // ["JS"]
console.log(deepCopy.user.skills); // ["JS", "React"]

//* structuredClone() supports many structured-cloneable values and creates
//* a deep copy. It is not a universal clone for every possible object.


//* ------------------------------------------------------------
//* 66. PROPERTY ORDER — PRACTICAL NOTE
//* ------------------------------------------------------------

const ordered = {
  b: "B",
  2: "two",
  1: "one",
  a: "A",
};

console.log(Object.keys(ordered));

//* Object property ordering has defined rules, including integer-index-like
//* keys being ordered before other string keys. Do not use plain objects as
//* a substitute for every ordered collection requirement; Map may be clearer.


//* ------------------------------------------------------------
//* 67. MAP VS OBJECT — QUICK DECISION
//* ------------------------------------------------------------

const objectDictionary = { apple: 10, banana: 20 };
const mapDictionary = new Map([
  ["apple", 10],
  ["banana", 20],
]);

console.log(objectDictionary.apple);
console.log(mapDictionary.get("apple"));

//* Object: record-like data with named properties.
//* Map: dedicated key-value collection with arbitrary key types and collection APIs.


//* ------------------------------------------------------------
//* 68. OBJECT AS RECORD
//* ------------------------------------------------------------

const blogPost = {
  id: 1,
  title: "Learn Objects",
  author: "Ravi",
  published: true,
};

console.log(`${blogPost.title} by ${blogPost.author}`);


//* ------------------------------------------------------------
//* 69. REAL-WORLD: USER PROFILE
//* ------------------------------------------------------------

function createProfile(name, email, role) {
  return {
    name: name.trim(),
    email: email.trim().toLowerCase(),
    role,
    isActive: true,
    createdAt: new Date(),
  };
}

console.log(createProfile(" Ravi ", "RAVI@EXAMPLE.COM", "developer"));


//* ------------------------------------------------------------
//* 70. REAL-WORLD: CART ITEM UPDATE
//* ------------------------------------------------------------

const cartItems = [
  { id: 1, name: "Keyboard", quantity: 1 },
  { id: 2, name: "Mouse", quantity: 2 },
];

const updatedCart = cartItems.map((item) =>
  item.id === 2 ? { ...item, quantity: item.quantity + 1 } : item
);

console.log(updatedCart);
console.log(cartItems);


//* ------------------------------------------------------------
//* 71. REAL-WORLD: CONFIGURATION OBJECT
//* ------------------------------------------------------------

function createServerConfig({ port = 3000, host = "localhost", debug = false } = {}) {
  return { port, host, debug };
}

console.log(createServerConfig({ port: 8080, debug: true }));

//* Configuration objects make functions easier to extend than long lists
//* of positional parameters.


//* ------------------------------------------------------------
//* 72. REAL-WORLD: GROUP BY CATEGORY
//* ------------------------------------------------------------

const productsList = [
  { name: "Keyboard", category: "electronics" },
  { name: "Mouse", category: "electronics" },
  { name: "Notebook", category: "stationery" },
];

const byCategory = productsList.reduce((groups, productItem) => {
  (groups[productItem.category] ??= []).push(productItem);
  return groups;
}, {});

console.log(byCategory);

//* ??= assigns only when the current property is nullish.


//* ------------------------------------------------------------
//* 73. REAL-WORLD: PICK SELECTED FIELDS
//* ------------------------------------------------------------

function pickUserFields(userObject) {
  const { name, email } = userObject;
  return { name, email };
}

console.log(
  pickUserFields({ name: "Ravi", email: "ravi@example.com", password: "secret" })
);

//* Useful when preparing a public response without exposing unrelated fields.


//* ------------------------------------------------------------
//* 74. COMMON MISTAKE: DOT VS BRACKET
//* ------------------------------------------------------------

const selectedKey = "name";
const selectedUser = { name: "Ravi" };

console.log(selectedUser[selectedKey]); // Ravi
console.log(selectedUser.selectedKey); // undefined


//* ------------------------------------------------------------
//* 75. COMMON MISTAKE: const DOES NOT FREEZE OBJECT
//* ------------------------------------------------------------

const mutableUser = { name: "Ravi" };
mutableUser.name = "Aman";
console.log(mutableUser.name); // Aman

//* const prevents rebinding the variable, not mutation of the object.


//* ------------------------------------------------------------
//* 76. COMMON MISTAKE: OBJECT SPREAD IS SHALLOW
//* ------------------------------------------------------------

const sourceObject = { nested: { value: 1 } };
const copyObject = { ...sourceObject };

copyObject.nested.value = 2;
console.log(sourceObject.nested.value); // 2


//* ------------------------------------------------------------
//* 77. COMMON MISTAKE: in VS Object.hasOwn()
//* ------------------------------------------------------------

const ownRecord = {};

console.log("toString" in ownRecord); // true
console.log(Object.hasOwn(ownRecord, "toString")); // false

//* `in` includes the prototype chain; Object.hasOwn() does not.


//* ------------------------------------------------------------
//* 78. COMMON MISTAKE: Object.keys() RETURNS VALUES
//* ------------------------------------------------------------

const info = { name: "Ravi", age: 21 };

console.log(Object.keys(info)); // ["name", "age"]
console.log(Object.values(info)); // ["Ravi", 21]


//* ------------------------------------------------------------
//* 79. COMMON MISTAKE: JSON IS NOT A CLONE OF EVERYTHING
//* ------------------------------------------------------------

const data = {
  value: undefined,
  calculate() {
    return 10;
  },
};

const jsonCloneText = JSON.stringify(data);
console.log(jsonCloneText); // {}

//* JSON serialization loses some JavaScript values and behaviors.


//* ------------------------------------------------------------
//* 80. COMMON MISTAKE: this IN ARROW FUNCTION
//* ------------------------------------------------------------

const arrowObject = {
  name: "Ravi",
  greet: () => `Hello ${this.name}`,
};

//* Do not expect arrowObject.greet() to make this === arrowObject.
//* Arrow functions capture lexical this instead of creating their own this.


//* ------------------------------------------------------------
//* 81. OUTPUT PREDICTION
//* ------------------------------------------------------------

const predictionObject = {
  name: "Ravi",
  age: 21,
};

predictionObject.age = 22;
console.log(predictionObject.age); // ?
console.log(Object.keys(predictionObject)); // ?
console.log(Object.values(predictionObject)); // ?

//* Answers: 22, ["name", "age"], ["Ravi", 22].


//* ------------------------------------------------------------
//* 82. OUTPUT PREDICTION — SHALLOW COPY
//* ------------------------------------------------------------

const firstObject = {
  profile: { name: "Ravi" },
};

const secondObject = { ...firstObject };
secondObject.profile.name = "Aman";

console.log(firstObject.profile.name); // ?

//* Answer: Aman.


//* ------------------------------------------------------------
//* 83. OUTPUT PREDICTION — SPREAD ORDER
//* ------------------------------------------------------------

const defaults = { theme: "light", language: "en" };
const preferences = { theme: "dark" };

console.log({ ...defaults, ...preferences }); // ?

//* Answer: { theme: "dark", language: "en" }.


//* ------------------------------------------------------------
//* 84. MINI CHALLENGES
//* ------------------------------------------------------------

//* Challenge 1:
//* Create a student object with name, marks, and grade.

//* Challenge 2:
//* Add, update, and delete properties from an object.

//* Challenge 3:
//* Write a function that returns only public user fields.

//* Challenge 4:
//* Count the number of properties in an object.

//* Challenge 5:
//* Convert an object's keys and values into readable messages.

//* Challenge 6:
//* Find the highest-scoring student from an array of objects.

//* Challenge 7:
//* Group products by category.

//* Challenge 8:
//* Merge two configuration objects with correct override order.

//* Challenge 9:
//* Implement an immutable nested object update.

//* Challenge 10:
//* Write a function that checks whether an object owns a property.

//* Challenge 11:
//* Build a cart object and calculate its total.

//* Challenge 12:
//* Create a user factory function.

//* Challenge 13:
//* Build a simple object-based cache.

//* Challenge 14:
//* Convert an object to JSON and restore it.

//* Challenge 15:
//* Explain when you would choose Object vs Map.


//* ------------------------------------------------------------
//* 85. DEBUGGING CHALLENGES
//* ------------------------------------------------------------

//* Debug 1:
//* const key = "name";
//* const user = { name: "Ravi" };
//* console.log(user.key);
//* Question: Why is the result undefined?

//* Debug 2:
//* const user = { name: "Ravi" };
//* const copy = { ...user };
//* copy.name = "Aman";
//* Question: Why does this NOT change user.name?
//* Follow-up: What changes when name is a nested object?

//* Debug 3:
//* const user = {};
//* if ("toString" in user) console.log("found");
//* Question: Why does this report a property that was not defined directly?

//* Debug 4:
//* const user = { name: "Ravi" };
//* const { username } = user;
//* console.log(username);
//* Question: Why is username undefined?

//* Debug 5:
//* const object = { a: 1, b: 2 };
//* console.log(Object.keys(object).map(([key, value]) => value));
//* Question: Why does this not destructure key/value pairs?
//* Hint: Object.keys() returns keys, while Object.entries() returns pairs.


//* ------------------------------------------------------------
//* 86. TEACH-BACK QUESTIONS
//* ------------------------------------------------------------

//* 1. What is an object?
//* 2. What is a property?
//* 3. What is the difference between dot and bracket notation?
//* 4. Why do we need bracket notation for dynamic keys?
//* 5. What does Object.keys() return?
//* 6. What does Object.values() return?
//* 7. What does Object.entries() return?
//* 8. What is the difference between `in` and Object.hasOwn()?
//* 9. What is object destructuring?
//* 10. What is object spread?
//* 11. Why is object spread only a shallow copy?
//* 12. How does Object.assign() differ from object spread?
//* 13. What does const mean when the value is an object?
//* 14. What is object identity?
//* 15. What is a prototype?
//* 16. What is the prototype chain?
//* 17. What does Object.create() do?
//* 18. What are getters and setters?
//* 19. How does `this` work in a normal object method?
//* 20. Why can an arrow function be problematic as an object method?
//* 21. What are call(), apply(), and bind()?
//* 22. What does Object.freeze() actually freeze?
//* 23. What is a Symbol property?
//* 24. Why are Symbol properties not truly private?
//* 25. When would you choose Object instead of Map?


//* ============================================================
//* END OF OBJECTS
//* ============================================================
