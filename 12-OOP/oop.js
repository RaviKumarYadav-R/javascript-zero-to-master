//* ============================================================
//* JAVASCRIPT OOP — PRACTICAL COMPANION
//* ============================================================

//* Definition:
//* Object-Oriented Programming (OOP) is a way of organizing software around
//* objects that combine data (state) and behavior (methods).
//*
//* JavaScript supports object-oriented programming through objects,
//* prototypes, constructor functions and classes.


//* ------------------------------------------------------------
//* 1. OBJECT = STATE + BEHAVIOR
//* ------------------------------------------------------------

const user = {
  name: "Ravi",
  login() {
    return `${this.name} logged in`;
  },
};

console.log(user.name);
console.log(user.login());

//* State -> name
//* Behavior -> login()


//* ------------------------------------------------------------
//* 2. CLASS
//* ------------------------------------------------------------

//* A class is syntax for defining a reusable object-creation and inheritance
//* structure. JavaScript classes are built on the prototype system.

class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  greet() {
    return `Hello, ${this.name}`;
  }
}

const ravi = new User("Ravi", "ravi@example.com");
console.log(ravi.greet());


//* ------------------------------------------------------------
//* 3. INSTANCE
//* ------------------------------------------------------------

const user1 = new User("A", "a@example.com");
const user2 = new User("B", "b@example.com");

console.log(user1 instanceof User); // true
console.log(user2 instanceof User); // true
console.log(user1 === user2); // false

//* Each instance has its own instance state.
//* The method greet is normally shared through User.prototype.


//* ------------------------------------------------------------
//* 4. CONSTRUCTOR
//* ------------------------------------------------------------

//* constructor() runs when new User(...) creates an instance.
//* It is commonly used to initialize instance state.


//* ------------------------------------------------------------
//* 5. INSTANCE PROPERTIES
//* ------------------------------------------------------------

class Product {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }
}

const phone = new Product("Phone", 20000);
console.log(phone.name, phone.price);


//* ------------------------------------------------------------
//* 6. INSTANCE METHODS
//* ------------------------------------------------------------

class Cart {
  constructor() {
    this.items = [];
  }

  add(item) {
    this.items.push(item);
  }

  total() {
    return this.items.reduce((sum, item) => sum + item.price, 0);
  }
}

const cart = new Cart();
cart.add({ name: "Keyboard", price: 1500 });
cart.add({ name: "Mouse", price: 700 });
console.log(cart.total());


//* ------------------------------------------------------------
//* 7. THIS IN METHODS
//* ------------------------------------------------------------

class Counter {
  constructor() {
    this.value = 0;
  }

  increment() {
    this.value += 1;
    return this.value;
  }
}

const counter = new Counter();
console.log(counter.increment());
console.log(counter.increment());

//* In a normal method call, this refers to the receiver object.


//* ------------------------------------------------------------
//* 8. THIS IS NOT LEXICALLY FIXED FOR NORMAL METHODS
//* ------------------------------------------------------------

const account = {
  owner: "Ravi",
  showOwner() {
    return this.owner;
  },
};

console.log(account.showOwner());

const detached = account.showOwner;
//* detached(); // In strict mode, this is undefined.


//* ------------------------------------------------------------
//* 9. BINDING A METHOD
//* ------------------------------------------------------------

const boundShowOwner = account.showOwner.bind(account);
console.log(boundShowOwner());

//* bind() creates a new function with this fixed to the supplied object.


//* ------------------------------------------------------------
//* 10. ARROW FUNCTIONS AND THIS
//* ------------------------------------------------------------

//* Arrow functions do not create their own this.
//* They capture this from the surrounding lexical scope.

class Timer {
  constructor() {
    this.seconds = 0;
  }

  start() {
    const tick = () => {
      this.seconds += 1;
      return this.seconds;
    };

    return tick();
  }
}

console.log(new Timer().start());


//* ------------------------------------------------------------
//* 11. PUBLIC CLASS FIELDS
//* ------------------------------------------------------------

class Profile {
  role = "user";

  constructor(name) {
    this.name = name;
  }
}

const profile = new Profile("Ravi");
console.log(profile.name, profile.role);


//* ------------------------------------------------------------
//* 12. PRIVATE FIELDS
//* ------------------------------------------------------------

class BankAccount {
  #balance = 0;

  deposit(amount) {
    if (amount <= 0) throw new Error("Amount must be positive");
    this.#balance += amount;
  }

  getBalance() {
    return this.#balance;
  }
}

const bankAccount = new BankAccount();
bankAccount.deposit(1000);
console.log(bankAccount.getBalance());

//* #balance is a language-level private field.
//* bankAccount.#balance would be a syntax error outside the class.


//* ------------------------------------------------------------
//* 13. PRIVATE METHODS
//* ------------------------------------------------------------

class SecureAccount {
  #balance = 0;

  #isValidAmount(amount) {
    return Number.isFinite(amount) && amount > 0;
  }

  deposit(amount) {
    if (!this.#isValidAmount(amount)) {
      throw new Error("Invalid amount");
    }

    this.#balance += amount;
  }

  balance() {
    return this.#balance;
  }
}

const secure = new SecureAccount();
secure.deposit(500);
console.log(secure.balance());


//* ------------------------------------------------------------
//* 14. GETTERS
//* ------------------------------------------------------------

class Temperature {
  constructor(celsius) {
    this.celsius = celsius;
  }

  get fahrenheit() {
    return this.celsius * 9 / 5 + 32;
  }
}

const temperature = new Temperature(25);
console.log(temperature.fahrenheit);

//* Getter syntax lets a method be accessed like a property.


//* ------------------------------------------------------------
//* 15. SETTERS
//* ------------------------------------------------------------

class Person {
  constructor(name) {
    this.name = name;
  }

  set username(value) {
    if (typeof value !== "string" || value.length < 3) {
      throw new Error("Username is too short");
    }

    this.name = value;
  }
}

const person = new Person("Ravi");
person.username = "RaviK";
console.log(person.name);


//* ------------------------------------------------------------
//* 16. STATIC METHODS
//* ------------------------------------------------------------

class MathHelper {
  static add(a, b) {
    return a + b;
  }
}

console.log(MathHelper.add(2, 3));

//* Static members belong to the class itself, not normal instances.
//* new MathHelper().add(...) would not work here.


//* ------------------------------------------------------------
//* 17. STATIC FIELDS
//* ------------------------------------------------------------

class AppConfig {
  static environment = "development";
}

console.log(AppConfig.environment);


//* ------------------------------------------------------------
//* 18. STATIC BLOCK
//* ------------------------------------------------------------

class Config {
  static version;

  static {
    Config.version = "1.0.0";
  }
}

console.log(Config.version);

//* A static initialization block runs during class definition/evaluation.


//* ------------------------------------------------------------
//* 19. PROTOTYPE
//* ------------------------------------------------------------

const originalUser = {
  greet() {
    return "hello";
  },
};

const childUser = Object.create(originalUser);
console.log(childUser.greet());
console.log(Object.getPrototypeOf(childUser) === originalUser); // true

//* If a property is not found on childUser, property lookup can continue
//* through its prototype chain.


//* ------------------------------------------------------------
//* 20. PROTOTYPE CHAIN
//* ------------------------------------------------------------

const base = { a: 1 };
const middle = Object.create(base);
middle.b = 2;
const top = Object.create(middle);
top.c = 3;

console.log(top.c);
console.log(top.b);
console.log(top.a);

//* Lookup: top -> middle -> base -> Object.prototype -> null.


//* ------------------------------------------------------------
//* 21. OWN VS INHERITED PROPERTY
//* ------------------------------------------------------------

console.log(Object.hasOwn(top, "c")); // true
console.log(Object.hasOwn(top, "a")); // false
console.log("a" in top); // true

//* Object.hasOwn checks an own property.
//* in checks own + inherited properties.


//* ------------------------------------------------------------
//* 22. CLASS PROTOTYPE
//* ------------------------------------------------------------

console.log(typeof User.prototype); // object
console.log(Object.hasOwn(User.prototype, "greet")); // true
console.log(Object.hasOwn(ravi, "greet")); // false

//* The method is stored on the prototype, while the instance uses prototype
//* lookup to find it.


//* ------------------------------------------------------------
//* 23. CONSTRUCTOR FUNCTION
//* ------------------------------------------------------------

function OldStyleUser(name) {
  this.name = name;
}

OldStyleUser.prototype.greet = function () {
  return `Hi ${this.name}`;
};

const oldUser = new OldStyleUser("Ravi");
console.log(oldUser.greet());

//* Constructor functions are the older pre-class style for creating instances.
//* Classes still use prototypes under the hood.


//* ------------------------------------------------------------
//* 24. THE NEW OPERATOR
//* ------------------------------------------------------------

//* Conceptually, new performs important steps including:
//* 1. Create a new object.
//* 2. Connect its prototype to Constructor.prototype.
//* 3. Call the constructor with this bound to the new object.
//* 4. Return the object unless the constructor explicitly returns a suitable object.


//* ------------------------------------------------------------
//* 25. NEW WITH A CONSTRUCTOR FUNCTION
//* ------------------------------------------------------------

function ProductFactory(name) {
  this.name = name;
}

const product = new ProductFactory("Laptop");
console.log(product.name);
console.log(Object.getPrototypeOf(product) === ProductFactory.prototype);


//* ------------------------------------------------------------
//* 26. INHERITANCE
//* ------------------------------------------------------------

class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    return `${this.name} makes a sound`;
  }
}

class Dog extends Animal {
  bark() {
    return `${this.name} barks`;
  }
}

const dog = new Dog("Bruno");
console.log(dog.speak());
console.log(dog.bark());


//* ------------------------------------------------------------
//* 27. SUPER
//* ------------------------------------------------------------

class Employee extends User {
  constructor(name, email, role) {
    super(name, email);
    this.role = role;
  }

  describe() {
    return `${this.name} is a ${this.role}`;
  }
}

const employee = new Employee("Ravi", "ravi@example.com", "developer");
console.log(employee.describe());

//* super(...) calls the parent constructor.


//* ------------------------------------------------------------
//* 28. OVERRIDING METHODS
//* ------------------------------------------------------------

class Cat extends Animal {
  speak() {
    return `${this.name} says meow`;
  }
}

console.log(new Cat("Milo").speak());

//* A subclass can provide its own implementation of an inherited method.


//* ------------------------------------------------------------
//* 29. CALLING PARENT METHOD WITH SUPER
//* ------------------------------------------------------------

class LoudDog extends Animal {
  speak() {
    return super.speak().toUpperCase();
  }
}

console.log(new LoudDog("Rocky").speak());


//* ------------------------------------------------------------
//* 30. MULTILEVEL INHERITANCE
//* ------------------------------------------------------------

class LivingThing {
  alive() {
    return true;
  }
}

class Mammal extends LivingThing {
  warmBlooded() {
    return true;
  }
}

class Human extends Mammal {
  speakLanguage() {
    return "JavaScript";
  }
}

const human = new Human();
console.log(human.alive(), human.warmBlooded(), human.speakLanguage());

//* Deep inheritance is possible, but deep hierarchies can become difficult to maintain.


//* ------------------------------------------------------------
//* 31. COMPOSITION
//* ------------------------------------------------------------

const canLog = (state) => ({
  log(message) {
    console.log(`[${state.name}] ${message}`);
  },
});

const canSave = () => ({
  save() {
    return "saved";
  },
});

function createService(name) {
  const state = { name };
  return {
    ...state,
    ...canLog(state),
    ...canSave(),
  };
}

const service = createService("UserService");
service.log("created");
console.log(service.save());

//* Composition builds behavior by combining smaller capabilities.
//* It is often preferable to inheritance when relationships are not truly "is-a".


//* ------------------------------------------------------------
//* 32. INHERITANCE VS COMPOSITION
//* ------------------------------------------------------------

//* Inheritance:
//* Dog extends Animal
//* "Dog is an Animal"
//*
//* Composition:
//* User has logger behavior
//* "User uses a logger"
//*
//* Choose based on the domain, not because OOP requires inheritance everywhere.


//* ------------------------------------------------------------
//* 33. ENCAPSULATION
//* ------------------------------------------------------------

//* Encapsulation means keeping implementation details behind a controlled API.

class Wallet {
  #balance = 0;

  addMoney(amount) {
    if (amount <= 0) throw new Error("Invalid amount");
    this.#balance += amount;
  }

  getBalance() {
    return this.#balance;
  }
}

const wallet = new Wallet();
wallet.addMoney(100);
console.log(wallet.getBalance());


//* ------------------------------------------------------------
//* 34. ABSTRACTION
//* ------------------------------------------------------------

//* Abstraction means exposing the important operation while hiding unnecessary
//* implementation details.

class EmailService {
  send(to, message) {
    return this.#connectAndSend(to, message);
  }

  #connectAndSend(to, message) {
    return `Sent to ${to}: ${message}`;
  }
}

console.log(new EmailService().send("user@example.com", "Hello"));


//* ------------------------------------------------------------
//* 35. POLYMORPHISM
//* ------------------------------------------------------------

class CreditCardPayment {
  pay(amount) {
    return `Card payment: ${amount}`;
  }
}

class UpiPayment {
  pay(amount) {
    return `UPI payment: ${amount}`;
  }
}

function checkout(paymentMethod, amount) {
  return paymentMethod.pay(amount);
}

console.log(checkout(new CreditCardPayment(), 500));
console.log(checkout(new UpiPayment(), 500));

//* Different objects respond to the same method name with their own behavior.


//* ------------------------------------------------------------
//* 36. DUCK TYPING
//* ------------------------------------------------------------

function printPaymentResult(paymentMethod) {
  if (typeof paymentMethod?.pay !== "function") {
    throw new TypeError("Object must provide pay()");
  }

  console.log(paymentMethod.pay(100));
}

printPaymentResult({
  pay(amount) {
    return `Custom payment: ${amount}`;
  },
});

//* JavaScript often uses structural behavior rather than requiring a specific class.


//* ------------------------------------------------------------
//* 37. PRIVATE STATE WITH CLOSURE
//* ------------------------------------------------------------

function createCounter() {
  let value = 0;

  return {
    increment() {
      value += 1;
      return value;
    },
    getValue() {
      return value;
    },
  };
}

const privateCounter = createCounter();
console.log(privateCounter.increment());
console.log(privateCounter.getValue());

//* OOP-style encapsulation can also be built with closures, without classes.


//* ------------------------------------------------------------
//* 38. OBJECT DESCRIPTORS
//* ------------------------------------------------------------

const settings = {};

Object.defineProperty(settings, "mode", {
  value: "dark",
  writable: false,
  enumerable: true,
  configurable: false,
});

console.log(settings.mode);
console.log(Object.getOwnPropertyDescriptor(settings, "mode"));


//* ------------------------------------------------------------
//* 39. FREEZE
//* ------------------------------------------------------------

const config = Object.freeze({
  theme: "dark",
});

//* config.theme = "light"; // ignored or throws depending on strictness
console.log(config.theme);

//* Object.freeze is shallow.


//* ------------------------------------------------------------
//* 40. SEAL
//* ------------------------------------------------------------

const profileData = Object.seal({
  name: "Ravi",
});

profileData.name = "Developer";
//* profileData.age = 21; // cannot add a property
console.log(profileData.name);

//* seal prevents adding/removing properties but existing writable properties
//* can still be changed.


//* ------------------------------------------------------------
//* 41. OBJECT.CREATE
//* ------------------------------------------------------------

const vehicleMethods = {
  start() {
    return `${this.name} started`;
  },
};

const car = Object.create(vehicleMethods);
car.name = "Car";
console.log(car.start());


//* ------------------------------------------------------------
//* 42. SETTING A PROTOTYPE CAREFULLY
//* ------------------------------------------------------------

const admin = Object.create(user);
admin.name = "Admin";
console.log(admin.login());

//* Prefer Object.create or class/constructor patterns rather than repeatedly
//* mutating prototypes at runtime without a clear reason.


//* ------------------------------------------------------------
//* 43. INSTANCEOF
//* ------------------------------------------------------------

console.log(dog instanceof Dog); // true
console.log(dog instanceof Animal); // true
console.log(dog instanceof Object); // true

//* instanceof follows the relevant prototype chain.


//* ------------------------------------------------------------
//* 44. SYMBOL.HASINSTANCE CONCEPT
//* ------------------------------------------------------------

const EvenNumber = {
  [Symbol.hasInstance](value) {
    return Number.isInteger(value) && value % 2 === 0;
  },
};

console.log(2 instanceof EvenNumber); // true
console.log(3 instanceof EvenNumber); // false

//* instanceof can be customized through Symbol.hasInstance.


//* ------------------------------------------------------------
//* 45. METHODS ARE FUNCTIONS
//* ------------------------------------------------------------

class Calculator {
  add(a, b) {
    return a + b;
  }
}

const calculator = new Calculator();
console.log(typeof calculator.add); // function

//* A method is function behavior associated with an object/class, but its this
//* behavior depends on how the function is called.


//* ------------------------------------------------------------
//* 46. CLASS EXPRESSIONS
//* ------------------------------------------------------------

const NamedUser = class UserClass {
  constructor(name) {
    this.name = name;
  }
};

console.log(new NamedUser("Ravi").name);


//* ------------------------------------------------------------
//* 47. CLASS IS NOT HOISTED LIKE FUNCTION DECLARATIONS
//* ------------------------------------------------------------

//* new FutureClass(); // ReferenceError
//* class FutureClass {}
//*
//* Class declarations are in a temporal dead zone until evaluation reaches them.


//* ------------------------------------------------------------
//* 48. CLASS METHODS ARE NON-ENUMERABLE
//* ------------------------------------------------------------

class Example {
  method() {}
}

console.log(Object.keys(Example.prototype)); // []
console.log(Object.getOwnPropertyNames(Example.prototype)); // constructor, method

//* Class prototype methods are non-enumerable by default.


//* ------------------------------------------------------------
//* 49. SUPER AND THIS
//* ------------------------------------------------------------

//* In a derived constructor, you generally must call super() before accessing
//* this. Otherwise JavaScript throws a ReferenceError.


//* ------------------------------------------------------------
//* 50. ABSTRACT-CLASS-STYLE PATTERN
//* ------------------------------------------------------------

class Shape {
  area() {
    throw new Error("Shape.area() must be implemented");
  }
}

class Rectangle extends Shape {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
  }

  area() {
    return this.width * this.height;
  }
}

console.log(new Rectangle(5, 4).area());

//* JavaScript does not require an abstract keyword for this pattern.


//* ------------------------------------------------------------
//* 51. INTERFACE-STYLE PROGRAMMING
//* ------------------------------------------------------------

//* JavaScript has no built-in runtime interface keyword.
//* You can define a behavioral contract through documentation, validation,
//* TypeScript interfaces, or runtime checks.

function runRepository(repository) {
  if (typeof repository.findById !== "function") {
    throw new TypeError("Repository must provide findById()");
  }

  return repository.findById(1);
}

console.log(
  runRepository({
    findById(id) {
      return { id };
    },
  })
);


//* ------------------------------------------------------------
//* 52. SINGLE RESPONSIBILITY IN CLASSES
//* ------------------------------------------------------------

//* A class should ideally have a focused responsibility.
//* Avoid giant classes such as UserManagerEverything.


//* ------------------------------------------------------------
//* 53. DEPENDENCY INJECTION
//* ------------------------------------------------------------

class OrderService {
  constructor(paymentGateway) {
    this.paymentGateway = paymentGateway;
  }

  pay(amount) {
    return this.paymentGateway.charge(amount);
  }
}

const fakeGateway = {
  charge(amount) {
    return `charged ${amount}`;
  },
};

const orderService = new OrderService(fakeGateway);
console.log(orderService.pay(999));

//* The class depends on a capability instead of constructing a concrete gateway itself.


//* ------------------------------------------------------------
//* 54. OOP REAL-WORLD MODEL
//* ------------------------------------------------------------

class TodoList {
  #todos = [];

  add(title) {
    if (!title.trim()) throw new Error("Title required");

    this.#todos.push({
      id: this.#todos.length + 1,
      title,
      completed: false,
    });
  }

  complete(id) {
    const todo = this.#todos.find((item) => item.id === id);
    if (!todo) return false;

    todo.completed = true;
    return true;
  }

  getAll() {
    return this.#todos.map((todo) => ({ ...todo }));
  }
}

const todos = new TodoList();
todos.add("Learn JavaScript OOP");
todos.add("Build a project");
todos.complete(1);
console.log(todos.getAll());


//* ------------------------------------------------------------
//* 55. COMMON MISTAKE — CONFUSING CLASS WITH OBJECT
//* ------------------------------------------------------------

//* class User {} -> blueprint/definition mechanism
//* new User() -> creates an instance
//*
//* Do not expect class fields to behave like one shared ordinary object.


//* ------------------------------------------------------------
//* 56. COMMON MISTAKE — USING ARROW METHODS FOR EVERY METHOD
//* ------------------------------------------------------------

//* class User {
//*   greet = () => this.name;
//* }
//*
//* This can be useful when you specifically want an instance field function that
//* retains lexical this, but it has different memory/prototype characteristics
//* from a normal prototype method.


//* ------------------------------------------------------------
//* 57. COMMON MISTAKE — MUTATING PROTOTYPES CARELESSLY
//* ------------------------------------------------------------

//* Adding arbitrary properties to built-in prototypes such as Array.prototype
//* can cause collisions and surprising behavior. Avoid it in application code.


//* ------------------------------------------------------------
//* 58. COMMON MISTAKE — DEEP INHERITANCE
//* ------------------------------------------------------------

//* A long chain of base classes can make behavior difficult to trace.
//* Prefer composition when it expresses the domain more clearly.


//* ------------------------------------------------------------
//* 59. COMMON MISTAKE — PRIVATE FIELD SYNTAX
//* ------------------------------------------------------------

//* #balance is different from a property named "#balance".
//*
//* this.#balance -> private field syntax
//* this["#balance"] -> completely different public property name


//* ------------------------------------------------------------
//* 60. COMMON MISTAKE — LOST THIS
//* ------------------------------------------------------------

const printer = {
  name: "Printer",
  print() {
    return this.name;
  },
};

const safePrint = printer.print.bind(printer);
console.log(safePrint());

//* If passing an object method as a callback, consider bind or an arrow wrapper
//* when the intended receiver would otherwise be lost.


//* ------------------------------------------------------------
//* 61. COMMON MISTAKE — STATIC VS INSTANCE
//* ------------------------------------------------------------

//* static create() belongs to ClassName.create().
//* normal method belongs to instance.create().


//* ------------------------------------------------------------
//* 62. COMMON MISTAKE — OVERRIDING WITHOUT SUPER
//* ------------------------------------------------------------

//* A child method replaces the inherited implementation unless it explicitly
//* calls super.method().


//* ------------------------------------------------------------
//* 63. COMMON MISTAKE — ASSUMING PRIVATE FIELDS ARE JSON DATA
//* ------------------------------------------------------------

const privateExample = new BankAccount();
privateExample.deposit(50);
console.log(JSON.stringify(privateExample));

//* Private fields are not ordinary enumerable object properties and therefore
//* are not serialized by JSON.stringify.


//* ------------------------------------------------------------
//* 64. COMMON MISTAKE — FREEZE IS DEEP
//* ------------------------------------------------------------

const nested = Object.freeze({
  settings: { theme: "dark" },
});

nested.settings.theme = "light";
console.log(nested.settings.theme);

//* The nested object was not frozen. Object.freeze is shallow.


//* ------------------------------------------------------------
//* 65. OUTPUT PREDICTION
//* ------------------------------------------------------------

class A {
  greet() {
    return "A";
  }
}

class B extends A {
  greet() {
    return super.greet() + "B";
  }
}

console.log(new B().greet());
//* Predict: AB


//* ------------------------------------------------------------
//* 66. OUTPUT PREDICTION
//* ------------------------------------------------------------

const proto = { value: 10 };
const object = Object.create(proto);
object.value = 20;

console.log(object.value);
delete object.value;
console.log(object.value);

//* Predict: 20, then 10.
//* After deletion, lookup finds the inherited property.


//* ------------------------------------------------------------
//* 67. MINI CHALLENGES
//* ------------------------------------------------------------

//* Challenge 1: Create a Student class with name, marks and average().
//* Challenge 2: Create a BankAccount with private balance.
//* Challenge 3: Add deposit() and withdraw() validation.
//* Challenge 4: Create Animal -> Dog -> Puppy inheritance.
//* Challenge 5: Override a parent method and call super.
//* Challenge 6: Build a Cart class with add/remove/total.
//* Challenge 7: Build a TodoList using private fields.
//* Challenge 8: Build Shape, Circle and Rectangle polymorphism.
//* Challenge 9: Build a Logger class with static levels.
//* Challenge 10: Build a repository interface-style contract.
//* Challenge 11: Replace inheritance with composition.
//* Challenge 12: Create an object with Object.create().
//* Challenge 13: Inspect a class prototype with descriptors.
//* Challenge 14: Implement a private cache.
//* Challenge 15: Build a small payment system using polymorphism.


//* ------------------------------------------------------------
//* 68. DEBUGGING CHALLENGES
//* ------------------------------------------------------------

//* Debug 1: this is undefined in a callback.
//* Ask: how was the method passed and what receiver called it?

//* Debug 2: child constructor throws before super().
//* Ask: is this being accessed before super()?

//* Debug 3: method is not found.
//* Check the prototype chain and spelling.

//* Debug 4: static method called on instance.
//* Check whether the method belongs to the class or instance.

//* Debug 5: private field syntax error.
//* Check whether #field is being accessed outside its declaring class.

//* Debug 6: inherited property unexpectedly appears.
//* Check Object.hasOwn() versus in and inspect the prototype.

//* Debug 7: frozen nested object still changes.
//* Remember Object.freeze() is shallow.

//* Debug 8: class instance JSON does not contain private data.
//* Private fields are not ordinary enumerable properties.

//* Debug 9: subclass behavior unexpectedly replaces parent behavior.
//* Check whether super.method() is needed.

//* Debug 10: class hierarchy is becoming huge.
//* Consider composition and smaller objects.


//* ------------------------------------------------------------
//* 69. TEACH-BACK QUESTIONS
//* ------------------------------------------------------------

//* 1. What is OOP?
//* 2. What is an object?
//* 3. What is a class?
//* 4. What is an instance?
//* 5. What does constructor() do?
//* 6. What is this?
//* 7. What is a prototype?
//* 8. Explain the prototype chain.
//* 9. How does new work conceptually?
//* 10. What is inheritance?
//* 11. What does extends do?
//* 12. What does super do?
//* 13. What is method overriding?
//* 14. What is encapsulation?
//* 15. What is abstraction?
//* 16. What is polymorphism?
//* 17. Inheritance vs composition?
//* 18. What are private class fields?
//* 19. Static vs instance methods?
//* 20. Why can this be lost?
//* 21. What is Object.create()?
//* 22. What does instanceof check?
//* 23. What is dependency injection?
//* 24. How can closures create private state?
//* 25. Why is deep inheritance risky?


//* ------------------------------------------------------------
//* 70. INTERVIEW QUESTIONS
//* ------------------------------------------------------------

//* Q1. Are JavaScript classes real classes or prototype syntax?
//* Q2. Explain the prototype chain.
//* Q3. Explain new step by step.
//* Q4. Difference between class methods and class fields?
//* Q5. Why are class methods generally shared through the prototype?
//* Q6. How does this behave in normal methods vs arrow functions?
//* Q7. Explain extends and super.
//* Q8. What is method overriding?
//* Q9. What is polymorphism in JavaScript?
//* Q10. Inheritance vs composition?
//* Q11. What are private fields and private methods?
//* Q12. Static members vs instance members?
//* Q13. How does instanceof work conceptually?
//* Q14. Own property vs inherited property?
//* Q15. Object.freeze vs Object.seal?
//* Q16. How would you implement encapsulation without classes?
//* Q17. What is dependency injection?
//* Q18. Why should giant classes be avoided?
//* Q19. Why can prototype mutation be dangerous?
//* Q20. How would you design a testable OOP service?


//* ------------------------------------------------------------
//* 71. MASTERY CHECKLIST
//* ------------------------------------------------------------

//* [ ] I can explain object state and behavior.
//* [ ] I can create classes and instances.
//* [ ] I understand constructors.
//* [ ] I understand this.
//* [ ] I understand prototypes and prototype chains.
//* [ ] I understand new conceptually.
//* [ ] I can use private fields.
//* [ ] I can use getters/setters.
//* [ ] I understand static members.
//* [ ] I can use inheritance.
//* [ ] I understand super.
//* [ ] I can override methods.
//* [ ] I can explain encapsulation.
//* [ ] I can explain abstraction.
//* [ ] I can demonstrate polymorphism.
//* [ ] I can choose composition over unnecessary inheritance.
//* [ ] I can inspect prototypes and descriptors.
//* [ ] I can use dependency injection.
//* [ ] I can debug lost this.
//* [ ] I can teach JavaScript OOP without treating classes as the whole story.

//* ============================================================
//* FINAL RULE
//* ============================================================

//* JavaScript OOP is bigger than class syntax.
//* Master these layers in order:
//*
//* Object -> this -> prototype -> prototype chain -> constructor/new
//* -> class syntax -> inheritance -> encapsulation -> polymorphism
//* -> composition -> design.
//*
//* Once you understand prototypes, classes stop feeling magical.

//* END OF JAVASCRIPT OOP
