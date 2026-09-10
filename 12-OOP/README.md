# 12 — Object-Oriented Programming (OOP)

> Deep JavaScript OOP: objects, constructors, prototypes, classes, encapsulation, inheritance, polymorphism, abstraction, composition, static members, private fields, design decisions, debugging, performance, security, and practice.

## Learning Goal

By the end of this chapter you should be able to explain JavaScript OOP from its prototype foundation, write constructor functions and classes correctly, design controlled public APIs, choose composition or inheritance intentionally, and teach the four major OOP ideas without inaccurate shortcuts.

## 1. What Is OOP?

**Definition:** Object-Oriented Programming organizes software around objects that combine state and behavior and interact through defined interfaces.

**Simple example:**
```js
const user = {
  name: "Ravi",
  greet() {
    return `Hello, ${this.name}`;
  }
};
```

## 2. Why OOP Exists

OOP provides ways to model entities, share behavior, control state, and define interfaces. It is one programming paradigm, not a requirement for every JavaScript application.

## 3. OOP Is a Paradigm

JavaScript supports procedural, functional, event-driven, and object-oriented styles. Use the style that makes the problem easiest to understand and maintain.

## 4. Object Mental Model

An object is a runtime value with properties. Some properties hold data and some can hold functions used as methods.

## 5. State

State is information associated with an object at a particular time.

```js
const account = { balance: 1000 };
```

Here `balance` is part of the object's state.

## 6. Behavior

Behavior describes operations an object can perform.

```js
const account = {
  balance: 1000,
  deposit(amount) {
    this.balance += amount;
  }
};
```

## 7. Identity

Two objects can contain identical data and still be different objects because object identity is distinct.

```js
const a = { id: 1 };
const b = { id: 1 };
console.log(a === b); // false
```

## 8. Object Interface

An interface is the set of operations and data a consumer is expected to use. Good OOP hides unnecessary implementation details behind a clear interface.

## 9. Class Concept

A class describes how instances are constructed and which methods or fields they have. JavaScript classes use the prototype-based object model underneath.

## 10. Instance

An instance is an object created from a constructor or class.

```js
class User {}
const user = new User();
```

## 11. Constructor Function

A constructor function is a normal constructable function commonly used to create instances before class syntax became available.

```js
function User(name) {
  this.name = name;
}
```

## 12. Constructable Function

A constructable function can be called with `new`. Arrow functions are not constructable.

## 13. The new Operator

Conceptually, `new` creates an object, links its prototype, calls the constructor with that object as `this`, and returns the appropriate resulting object.

## 14. new Mental Model

```text
new User("Ravi")
   ↓
create object
   ↓
link to User.prototype
   ↓
call User with this = object
   ↓
return instance
```

## 15. Constructor Naming

Constructor functions and classes are conventionally named with PascalCase, such as `User`, `BankAccount`, or `HttpClient`.

## 16. Constructor Parameters

Constructors initialize instance-specific state.

```js
function User(name, age) {
  this.name = name;
  this.age = age;
}
```

## 17. Constructor Own Properties

Assignments such as `this.name = name` create own properties on each constructed instance.

## 18. Shared Methods Problem

Putting a method inside the constructor creates a new function for every instance.

```js
function User(name) {
  this.name = name;
  this.greet = function () {
    return this.name;
  };
}
```

This can be intentional, but shared behavior usually belongs on the prototype.

## 19. Prototype Solution

```js
User.prototype.greet = function () {
  return this.name;
};
```

Instances can find the method through the prototype chain.

## 20. Prototype

A prototype is an object from which property lookup can continue when a property is not found directly on the receiver.

## 21. Prototype Chain

```text
instance
   ↓
User.prototype
   ↓
Object.prototype
   ↓
null
```

## 22. Property Lookup

JavaScript first considers an object's own properties. If the property is absent, lookup can continue through the prototype chain.

## 23. Own vs Inherited

An own property belongs directly to the object. An inherited property is found through its prototype chain.

## 24. Object.getPrototypeOf

Use `Object.getPrototypeOf(obj)` to inspect an object's immediate prototype.

```js
const user = new User("Ravi");
console.log(Object.getPrototypeOf(user) === User.prototype); // true
```

## 25. Object.create

`Object.create(proto)` creates an object whose prototype is `proto` without calling a constructor.

```js
const child = Object.create(parent);
```

## 26. Object.create Does Not Copy

`Object.create(parent)` establishes a prototype relationship; it does not copy all properties from `parent` into `child`.

## 27. __proto__ Warning

`__proto__` is a legacy accessor. Prefer standardized APIs such as `Object.getPrototypeOf()` and `Object.create()` when working explicitly with prototypes.

## 28. Prototype Property

A constructor function has a `.prototype` property used by instances created with `new`. This is different from the internal prototype of the constructor function itself.

## 29. constructor Property

For a normal constructor function, `Person.prototype.constructor === Person` usually holds because the default prototype object points back to the constructor.

## 30. Prototype Method

```js
function Person(name) {
  this.name = name;
}

Person.prototype.sayHi = function () {
  return `Hi ${this.name}`;
};
```

All instances can use the same function.

## 31. Method Sharing

Prototype methods are shared by instances rather than recreated for every instance. This can reduce repeated function allocations.

## 32. Class Syntax

Classes provide a convenient syntax for constructors, prototype methods, fields, private elements, and inheritance.

```js
class Person {
  constructor(name) {
    this.name = name;
  }

  sayHi() {
    return `Hi ${this.name}`;
  }
}
```

## 33. Class Is Not a Separate Object Model

JavaScript classes provide class-oriented syntax and semantics over the language's prototype-based object model.

## 34. Class Constructor

The `constructor()` method runs when an instance is created with `new`.

## 35. Class Instance Method

Methods defined in a class body normally live on the class's prototype instead of becoming a separate function property on every instance.

## 36. Class Declaration

Class declarations are lexical declarations. They are not hoisted like function declarations in the sense of being safely usable before evaluation.

## 37. Class TDZ

A class binding is in a temporal dead zone until its declaration is evaluated.

```js
// ReferenceError
const user = new User();
class User {}
```

## 38. Class Expression

A class can be assigned to a variable as an expression.

```js
const User = class {
  constructor(name) {
    this.name = name;
  }
};
```

## 39. Anonymous Class Expression

Class expressions can be anonymous. Giving classes useful names can improve debugging and stack traces.

## 40. Named Class Expression

```js
const User = class UserRecord {
  constructor(name) {
    this.name = name;
  }
};
```

The internal name can be useful in debugging and recursive scenarios.

## 41. Classes Need new

Normally, calling a class without `new` throws a TypeError.

```js
class User {}
// User(); // TypeError
```

## 42. Constructor Function vs Class

Constructor functions are ordinary functions that can be constructable. Classes have additional syntax and semantics, while both participate in prototype-based object behavior.

## 43. this in Instance Methods

When a method is called as `object.method()`, the call expression supplies the receiver as `this` under ordinary method-call semantics.

## 44. this Is Call-Sensitive

Do not memorize that `this` always means the object where a function was written. For ordinary functions, `this` depends on how the function is called.

## 45. Detached Method

```js
const person = new Person("Ravi");
const greet = person.sayHi;
// greet();
```

Extracting a method changes the call context. In strict mode, an unbound ordinary function call has `this === undefined`.

## 46. bind for Methods

```js
const greet = person.sayHi.bind(person);
console.log(greet());
```

`bind()` creates a function with a bound `this` value.

## 47. call

`call()` invokes a function immediately with an explicitly supplied `this` value and individual arguments.

## 48. apply

`apply()` invokes a function immediately with an explicitly supplied `this` value and an array-like argument collection.

## 49. bind

`bind()` returns a new function with bound `this` and optionally pre-filled arguments. It does not immediately invoke the original function.

## 50. Arrow Functions and this

Arrow functions use lexical `this`. They do not create their own dynamic `this`.

## 51. Arrow Function Constructor Trap

Arrow functions cannot be called with `new` and are not constructable.

## 52. Instance Fields

Classes can define instance fields.

```js
class User {
  role = "member";
}
```

Each instance receives its own `role` property.

## 53. Field Initialization

Instance fields are initialized for each instance according to class field initialization semantics. They are not shared prototype properties.

## 54. Public Fields

Class fields are public by default. Public fields can be directly accessed by consumers.

## 55. Private Fields

A field beginning with `#` is a language-enforced private class element.

```js
class BankAccount {
  #balance = 0;

  deposit(amount) {
    this.#balance += amount;
  }
}
```

## 56. Private Means Private

`#balance` cannot be accessed through ordinary external property syntax. The private name is enforced by the language.

## 57. Private Methods

Classes can define private methods such as `#validate()` for implementation details that should not be part of the public API.

## 58. Private Static Fields

`static #cache` creates private state associated with the class rather than each instance.

## 59. Private Static Methods

A class can define `static #helper()` for internal class-level behavior.

## 60. Underscore Convention

`_name` is not private. The underscore is only a naming convention communicating intended internal use.

## 61. Closure Privacy

Closures can hide state through lexical scope.

```js
function createCounter() {
  let count = 0;
  return {
    increment() { count++; },
    get() { return count; }
  };
}
```

## 62. Class Privacy vs Closure Privacy

Private fields attach private state to class instances. Closures hide state in lexical environments. Choose according to lifecycle and API needs.

## 63. Encapsulation

**Encapsulation** means controlling access to state and implementation through a deliberate interface while preserving valid object invariants.

## 64. Encapsulation Is More Than Private Fields

Private fields are one mechanism. Modules, closures, getters/setters, validation, and carefully designed public APIs can also provide encapsulation.

## 65. Invariant

An invariant is a condition that should remain true for valid object state.

```text
balance >= 0
```

A well-designed account API prevents operations from breaking that rule.

## 66. Encapsulation Example

```js
class BankAccount {
  #balance = 0;

  deposit(amount) {
    if (amount <= 0) throw new Error("Invalid amount");
    this.#balance += amount;
  }

  getBalance() {
    return this.#balance;
  }
}
```

## 67. Getter

A getter provides property-like read access while allowing custom logic.

```js
class User {
  constructor(name) { this.name = name; }
  get displayName() { return this.name.trim(); }
}
```

## 68. Setter

A setter intercepts property assignment and can validate or normalize input.

```js
class User {
  set age(value) {
    if (value < 0) throw new Error("Invalid age");
    this._age = value;
  }
}
```

## 69. Getter/Setter Tradeoff

Property syntax can hide computation. Keep getters predictable and avoid surprising side effects.

## 70. Abstraction

**Abstraction** means exposing the important interface while hiding unnecessary implementation complexity.

## 71. Encapsulation vs Abstraction

Encapsulation asks **“Who can access this state or implementation?”** Abstraction asks **“What should the consumer need to know?”**

## 72. Abstraction Example

A `PaymentService.charge()` method can hide validation, network calls, retries, and provider-specific details behind one application-facing operation.

## 73. Inheritance

**Inheritance** lets one class obtain behavior through a prototype relationship established by mechanisms such as `extends`.

## 74. Is-A Relationship

Inheritance is most appropriate when the subtype genuinely represents an **is-a** relationship and the inherited contract remains valid.

## 75. extends

```js
class Animal {
  speak() { return "sound"; }
}

class Dog extends Animal {
  bark() { return "woof"; }
}
```

## 76. Prototype Inheritance

`extends` establishes prototype relationships for instances and also connects the derived constructor to the base constructor's static inheritance path.

## 77. super Constructor

A derived constructor must call `super()` before accessing `this`.

```js
class Dog extends Animal {
  constructor(name) {
    super();
    this.name = name;
  }
}
```

## 78. Derived Constructor Rule

Using `this` before `super()` in a derived constructor throws an error. `super()` performs the required base initialization.

## 79. super Method

`super.method()` invokes an inherited method according to class semantics.

## 80. super Is Not a Normal Variable

`super` is special syntax tied to the class's prototype relationships. It is not simply a variable containing a parent object.

## 81. Method Overriding

A subclass can define a method with the same name as a parent method.

```js
class Dog extends Animal {
  speak() { return "woof"; }
}
```

## 82. Polymorphism

**Polymorphism** means the same operation can work with different objects while each object supplies appropriate behavior.

## 83. Polymorphism Example

```js
function makeAnimalSpeak(animal) {
  return animal.speak();
}
```

Any object with the required behavior can participate; `instanceof` is not required.

## 84. Duck Typing

JavaScript commonly supports behavior-based polymorphism. If an object provides the operation your code needs, it can often participate without sharing a class hierarchy.

## 85. Runtime Dispatch

When `animal.speak()` runs, property lookup follows the object's own properties and prototype chain to find the applicable method.

## 86. Polymorphism Without Inheritance

```js
const dog = { speak: () => "woof" };
const cat = { speak: () => "meow" };
```

Both satisfy the same behavioral expectation without sharing a parent class.

## 87. Composition

**Composition** builds objects from smaller components or delegates behavior to collaborators rather than inheriting everything from a parent.

## 88. Composition Example

```js
class Logger {
  log(message) { console.log(message); }
}

class UserService {
  constructor(logger) {
    this.logger = logger;
  }
}
```

## 89. Composition vs Inheritance

Composition often reduces tight coupling because collaborators can be replaced independently. Inheritance can be useful for a genuine subtype relationship.

## 90. Favor Composition

“Favor composition over inheritance” is a heuristic, not an absolute law. Choose the design with the clearest dependency and behavioral contract.

## 91. Abstraction Through Base Class

A base class can provide shared workflow and define operations that subclasses specialize. JavaScript has no built-in `abstract class` keyword.

## 92. Abstract-Like Class

You can emulate an abstract base class with `new.target` checks or methods that throw until overridden.

## 93. new.target

`new.target` lets constructor code detect which constructor was directly invoked with `new`.

```js
class Shape {
  constructor() {
    if (new.target === Shape) throw new Error("Shape is abstract");
  }
}
```

## 94. Abstract-Like Method

```js
class Shape {
  area() {
    throw new Error("Subclass must implement area()");
  }
}
```

This is runtime enforcement, not compile-time interface checking.

## 95. Interfaces in JavaScript

JavaScript has no native TypeScript-style `interface` construct. Contracts can be expressed with conventions, runtime checks, tests, or TypeScript.

## 96. TypeScript Interfaces

TypeScript can describe structural contracts at compile time, but JavaScript runtime does not enforce TypeScript interfaces.

## 97. Static Members

Static members belong to the class/constructor rather than instances.

```js
class MathBox {
  static add(a, b) { return a + b; }
}
```

## 98. Calling Static Methods

```js
MathBox.add(2, 3);
```

Static methods are not instance methods.

## 99. Static this

Static methods **do have `this`**. A normal `MathBox.add()` call supplies `MathBox` as the receiver.

## 100. Static Inheritance

Static methods can be inherited and overridden through constructor/class inheritance.

## 101. super in Static Methods

`super.someMethod()` can be used inside a static method to access inherited static behavior.

## 102. Static Fields

```js
class Config {
  static environment = "production";
}
```

The field belongs to `Config`, not each instance.

## 103. Static Initialization Block

A `static {}` block provides controlled one-time class-level initialization.

## 104. Instance vs Static

Instance members model per-object state or behavior. Static members model behavior or state associated with the class itself.

## 105. Static Factory

A static method can provide a named construction operation.

```js
class User {
  constructor(name) { this.name = name; }
  static fromJSON(json) {
    return new User(json.name);
  }
}
```

## 106. Factory Method

A factory creates objects without forcing callers to know all construction details. It can also choose among implementations.

## 107. Constructor vs Factory

Use a constructor when direct construction is clear. Use a factory when creation requires validation, configuration, caching, or implementation selection.

## 108. Private Constructor Simulation

JavaScript has no native private constructor modifier. A factory plus module-scoped token or other controlled boundary can emulate restricted construction.

## 109. Method Chaining

Methods can return `this` when a fluent API is intentional.

```js
class Query {
  where(value) { this.value = value; return this; }
}
```

## 110. Fluent API Tradeoff

Chaining can improve readability for configuration-style APIs but can obscure mutation and control flow when overused.

## 111. Immutability and OOP

OOP does not require mutation. Methods can return new objects instead of changing the current object.

## 112. Mutable Object

A mutable object changes its internal state over time. Mutation can be useful but requires clear ownership and invariants.

## 113. Immutable-Style Object

```js
class Money {
  constructor(amount) { this.amount = amount; }
  add(other) { return new Money(this.amount + other.amount); }
}
```

## 114. Value Object

A value object is defined primarily by its value rather than identity, such as a coordinate or money amount. Equality rules should be explicit.

## 115. Entity Object

An entity is identified by a stable identity even if some properties change, such as a user with a unique ID.

## 116. Domain Model

A domain model represents business concepts and rules. OOP can help when objects naturally own behavior and invariants.

## 117. Anemic Model

An anemic model stores mostly data while business behavior lives elsewhere. This is not automatically wrong; architectural context matters.

## 118. Rich Domain Object

A rich object keeps relevant rules close to the state they govern, reducing invalid states and scattered business logic.

## 119. Dependency Injection

Dependency injection means supplying dependencies from outside instead of constructing them invisibly inside a class.

## 120. Constructor Injection

```js
class OrderService {
  constructor(paymentGateway, logger) {
    this.paymentGateway = paymentGateway;
    this.logger = logger;
  }
}
```

## 121. Why Dependency Injection Helps

Dependencies can be replaced with fakes or mocks in tests, and production implementations can change without rewriting object creation logic.

## 122. Dependency Inversion

High-level business logic should depend on stable abstractions or contracts rather than tightly coupling itself to low-level infrastructure.

## 123. Interface-Like Contract

A class can expect an object with methods such as `charge()` and `refund()` without requiring that collaborator to inherit from a particular class.

## 124. Composition With Contracts

Composition works especially well with behavior contracts: a service receives collaborators and delegates work to them.

## 125. SOLID Preview

SOLID is a family of design principles. Learn the principles after understanding responsibilities, dependencies, and polymorphism rather than memorizing the acronym alone.

## 126. Single Responsibility Principle

A class should have a focused responsibility and a coherent reason to change. It does not mean every class must contain exactly one method.

## 127. Open/Closed Principle

Software should generally be open to extension while minimizing unnecessary modification of stable code. Polymorphism and composition can help.

## 128. Liskov Substitution Principle

A subtype should be usable where its base abstraction is expected without violating the base contract. If subclass behavior breaks expectations, inheritance may be wrong.

## 129. Interface Segregation Principle

Consumers should not be forced to depend on large interfaces containing operations they do not need. Smaller contracts often improve composition.

## 130. Dependency Inversion Principle

High-level policy should not be tightly coupled to low-level details. Both should depend on appropriate abstractions.

## 131. Prototype vs Class

Prototype mechanisms are the underlying object-linking system. Classes provide cleaner syntax and additional semantics for constructors, methods, fields, private elements, and inheritance.

## 132. Class vs Object Literal

Use object literals for simple values and behavior. Use classes or constructors when repeated instances, shared behavior, private state, or explicit lifecycle justify them.

## 133. Class vs Factory

Factories can hide construction and return different implementations. Classes provide recognizable instance types and prototype-based methods.

## 134. Class vs Module

A class models instances and behavior. A module models file-level dependency and encapsulation. A module can export a class, but the concepts solve different problems.

## 135. Class vs Closure

A closure hides state through lexical scope. A class can provide private fields and structured instance behavior. Both can encapsulate state.

## 136. Inheritance vs Composition

Inheritance creates a subtype relationship and shared prototype behavior. Composition assembles behavior through collaborators. Prefer the relationship that matches the domain.

## 137. Encapsulation vs Abstraction

Encapsulation controls access and state. Abstraction hides unnecessary complexity. Strong designs often use both.

## 138. Inheritance vs Abstraction

Inheritance describes a relationship and reuse mechanism. Abstraction defines what consumers need to interact with while hiding implementation details.

## 139. Abstraction vs Polymorphism

Abstraction defines a useful interface. Polymorphism allows different implementations to satisfy the same operation or contract.

## 140. OOP Memory Trick

```text
Encapsulation → Who can access this?
Abstraction   → What should the user see/use?
Inheritance   → What can this type inherit?
Polymorphism  → How can different objects behave through the same operation?
```

## 141. Wrong: Shared Method in Constructor

```js
function User(name) {
  this.name = name;
  this.greet = () => `Hi ${this.name}`;
}
```

This recreates the function for every instance. It may be intentional, but shared behavior generally belongs on the prototype when per-instance closure state is unnecessary.

## 142. Correct: Prototype Method

```js
function User(name) {
  this.name = name;
}
User.prototype.greet = function () {
  return `Hi ${this.name}`;
};
```

## 143. Wrong: Fake Private Property

```js
class User {
  constructor() {
    this._password = "secret";
  }
}
```

`_password` is publicly accessible.

## 144. Correct: Private Field

```js
class User {
  #password = "secret";
  checkPassword(value) {
    return value === this.#password;
  }
}
```

## 145. Wrong: Derived this Before super

```js
class Dog extends Animal {
  constructor(name) {
    this.name = name;
    super();
  }
}
```

This is invalid because a derived constructor must initialize the base class before using `this`.

## 146. Correct: super First

```js
class Dog extends Animal {
  constructor(name) {
    super();
    this.name = name;
  }
}
```

## 147. Wrong: Static Through Instance

```js
class MathBox {
  static add(a, b) { return a + b; }
}
const box = new MathBox();
// box.add(1, 2); // not an instance method
```

## 148. Correct: Static Call

```js
MathBox.add(1, 2);
```

## 149. Wrong: Assuming instanceof Is Polymorphism

Polymorphism does not require `instanceof`. A function can depend on behavior rather than class identity.

## 150. Correct: Behavior Contract

```js
function render(shape) {
  return shape.draw();
}
```

Any compatible object can participate.

## 151. Output Prediction — Prototype

```js
function User(name) { this.name = name; }
User.prototype.role = "member";
const a = new User("A");
console.log(a.role);
```

**Answer:** `member`, because lookup continues from `a` to `User.prototype`.

## 152. Output Prediction — Own Property

```js
function User(name) { this.name = name; }
const a = new User("A");
console.log(Object.hasOwn(a, "name"));
```

**Answer:** `true`, because `name` was assigned directly on the instance.

## 153. Output Prediction — Shared Prototype

```js
function User() {}
User.prototype.role = "member";
const a = new User();
const b = new User();
console.log(a.role === b.role);
```

**Answer:** `true`.

## 154. Output Prediction — Method Identity

```js
function User() {}
User.prototype.greet = function () {};
const a = new User();
const b = new User();
console.log(a.greet === b.greet);
```

**Answer:** `true`, because both resolve to the same prototype function.

## 155. Output Prediction — Static

```js
class Counter {
  static count = 1;
}
const c = new Counter();
console.log(Counter.count);
```

**Answer:** `1`.

## 156. Output Prediction — Private

```js
class Account {
  #balance = 100;
  getBalance() { return this.#balance; }
}
console.log(new Account().getBalance());
```

**Answer:** `100`.

## 157. Debugging Prototype Lookup

When a property unexpectedly comes from a prototype, inspect `Object.hasOwn(obj, key)` and `Object.getPrototypeOf(obj)`.

## 158. Debugging this

Log `this` at the call site and inspect how the method was invoked. Compare `obj.method()`, extracted functions, `.call()`, and `.bind()`.

## 159. Debugging super

If a derived class fails during construction, check whether `super()` executes before any access to `this`.

## 160. Debugging Private Fields

Private field names are enforced by the language. Misspelled private names or access from unrelated classes produce errors rather than ordinary missing-property behavior.

## 161. Debugging Static Members

If `instance.someStaticMethod` is missing, check whether the method was declared with `static`. Call it through the class.

## 162. Debugging Inheritance

Inspect both `Object.getPrototypeOf(instance)` and `Object.getPrototypeOf(Subclass)` when you need to understand instance and static inheritance relationships.

## 163. Performance: Prototype Sharing

Prototype methods allow instances to share function objects. This can reduce repeated allocations compared with defining identical functions in every constructor call.

## 164. Performance: Object Shapes

JavaScript engines optimize common object layouts. Consistent initialization patterns can help, although engine internals are not guaranteed APIs.

## 165. Performance: Avoid Premature Optimization

Do not choose an inheritance hierarchy merely for theoretical memory savings. Measure real bottlenecks after designing a clear model.

## 166. Performance: Deep Hierarchies

Very deep inheritance structures can make reasoning and maintenance harder. Composition often produces clearer dependency relationships.

## 167. Performance: Getters

Getters can hide computation behind property syntax. Avoid expensive or side-effectful getters when callers reasonably expect a simple property read.

## 168. Security: Encapsulation

Private fields can reduce accidental external access to internal state, but they do not automatically make an application secure. Validation, authorization, and trusted boundaries still matter.

## 169. Security: Prototype Pollution

Unsafe prototype manipulation or merging attacker-controlled keys can contribute to prototype-pollution vulnerabilities. Validate input and use safe object-handling patterns.

## 170. Security: Object Contracts

Do not trust an object merely because it is an instance of a class. Runtime data crossing network, storage, or serialization boundaries should be validated.

## 171. Security: Serialization

Private fields and prototype behavior are not automatically represented in JSON. Never assume serialization preserves an object's security invariants.

## 172. Browser Example

```js
class TodoItem {
  constructor(text) {
    this.text = text;
  }

  render() {
    const li = document.createElement("li");
    li.textContent = this.text;
    return li;
  }
}
```

## 173. Node.js Example

```js
class FileLogger {
  constructor(fs) {
    this.fs = fs;
  }

  write(path, message) {
    return this.fs.writeFileSync(path, message);
  }
}
```

Dependency injection makes the filesystem collaborator replaceable in tests.

## 174. Real-World Example: API Client

```js
class ApiClient {
  constructor(baseUrl, fetchFn = fetch) {
    this.baseUrl = baseUrl;
    this.fetch = fetchFn;
  }

  async get(path) {
    return this.fetch(`${this.baseUrl}${path}`);
  }
}
```

## 175. Real-World Example: Repository

A repository class can expose `findById()` and `save()` while hiding database-driver details from application services.

## 176. Real-World Example: Service

A service can coordinate domain rules and collaborators. Keep transport, persistence, and presentation responsibilities separate when they do not belong in the service.

## 177. Real-World Example: Controller

A controller can translate HTTP input into application operations and responses. Avoid putting all business logic inside controller methods.

## 178. Real-World Example: UI Component

A class can own lifecycle or behavior where class-based components are appropriate. Modern frontend frameworks may instead favor functions and hooks.

## 179. OOP Does Not Mean Everything Is a Class

JavaScript applications often use plain objects, functions, modules, closures, and classes together. Use the smallest abstraction that clearly solves the problem.

## 180. OOP Does Not Mean Inheritance

Object-oriented design can rely heavily on composition, delegation, modules, and behavior contracts without deep inheritance trees.

## 181. OOP Does Not Mean Mutation

Objects can be immutable-style values. OOP is about object organization and interaction, not a requirement to mutate state.

## 182. OOP Does Not Mean Getters Everywhere

Use methods when an operation is clearly an action. Use getters when property-like access accurately communicates the behavior.

## 183. OOP Does Not Mean Private Everything

Public APIs are necessary. Encapsulation means deliberate access, not maximum restriction.

## 184. Delegation

Delegation means one object asks another object to perform behavior instead of inheriting that behavior.

## 185. Delegation Example

```js
class ReportService {
  constructor(formatter) {
    this.formatter = formatter;
  }

  create(data) {
    return this.formatter.format(data);
  }
}
```

## 186. Adapter Pattern Preview

An adapter wraps an incompatible interface and exposes the interface your application expects. Composition makes adapters straightforward.

## 187. Strategy Pattern Preview

A strategy object represents interchangeable behavior. A service can receive different strategies through dependency injection.

## 188. Factory Pattern Preview

A factory centralizes object creation and can select implementations based on configuration or input.

## 189. Observer Pattern Preview

Observers subscribe to changes or events. JavaScript event systems often implement observer-like behavior without requiring classes.

## 190. Template Method Pattern Preview

A base class can define an overall workflow while subclasses override specific steps. Use carefully because it increases inheritance coupling.

## 191. Composition Project

Build a notification system where `NotificationService` receives email, SMS, and logging collaborators. Swap implementations without changing the service workflow.

## 192. Inheritance Project

Build `Shape`, `Circle`, `Rectangle`, and `Triangle` with a shared `area()` contract. Explain why each subtype satisfies the base expectation.

## 193. Encapsulation Project

Build a bank account with private balance, deposit/withdraw validation, transaction history, and a read-only balance getter.

## 194. Static Factory Project

Build a `User` class with `fromJSON()` and `fromDatabaseRow()` static factories. Keep normalization logic out of callers.

## 195. Repository Project

Create an in-memory repository and a production-style repository contract. Make a service depend on repository behavior rather than a specific storage implementation.

## 196. Debugging Project

Create five intentionally broken classes involving `this`, `super`, static members, private fields, and prototype lookup. Fix them without changing the intended public API.

## 197. Refactoring Challenge

Take a giant class with many unrelated methods and split responsibilities into cohesive collaborators. Document why each new class exists.

## 198. Beginner Practice

Create a `Person` class with `name`, `age`, and `greet()`. Instantiate three people and explain which properties are own properties and where the method is stored.

## 199. Beginner Practice

Create a `Rectangle` class with `width`, `height`, `area()`, and `perimeter()`. Add validation for non-negative dimensions.

## 200. Intermediate Practice

Create a `ShoppingCart` class with private items, `add()`, `remove()`, `total()`, and a read-only item count. Preserve invariants after every operation.

## 201. Intermediate Practice

Implement the same notification system once with inheritance and once with composition. Compare coupling, testing, and extensibility.

## 202. Advanced Practice

Implement a plugin registry using behavior contracts. Plugins should provide `name` and `execute()`. Avoid requiring all plugins to inherit from one class.

## 203. Advanced Practice

Implement repository/service architecture with dependency injection and write tests using an in-memory repository.

## 204. Advanced Practice

Implement a small state machine using private state and explicit transition methods. Reject invalid transitions without corrupting state.

## 205. Interview: Prototype Chain

**Question:** What is the prototype chain?

**Answer target:** Explain property lookup from an object's own properties through linked prototypes until `null`.

## 206. Interview: Class Model

**Question:** Is JavaScript class-based or prototype-based?

**Answer target:** Explain that JavaScript object inheritance is prototype-based while `class` provides class-oriented syntax and semantics over that model.

## 207. Interview: Prototype Methods

**Question:** Why put methods on the prototype?

**Answer target:** Explain function sharing, instance behavior, and avoiding unnecessary recreation of the same method for every instance.

## 208. Interview: new

**Question:** What does `new` do?

**Answer target:** Explain object creation, prototype linkage, constructor invocation, `this`, and the constructor return rule conceptually.

## 209. Interview: Arrow Constructors

**Question:** Why can arrow functions not be constructors?

**Answer target:** Explain that arrow functions do not provide construct behavior and cannot be used with `new`.

## 210. Interview: Encapsulation

**Question:** What is encapsulation?

**Answer target:** Explain controlled access to state/implementation and preservation of invariants, not merely private fields.

## 211. Interview: Abstraction

**Question:** What is abstraction?

**Answer target:** Explain exposing a useful interface while hiding unnecessary implementation complexity.

## 212. Interview: Inheritance

**Question:** What is inheritance?

**Answer target:** Explain prototype relationships and subtype reuse, then mention semantic substitutability.

## 213. Interview: Polymorphism

**Question:** What is polymorphism?

**Answer target:** Explain how one operation can support different implementations, including duck-typed objects.

## 214. Interview: instanceof

**Question:** Does polymorphism require `instanceof`?

**Answer:** No. Behavior-based contracts often provide polymorphism without runtime class checks.

## 215. Interview: Composition

**Question:** What is composition?

**Answer target:** Explain assembling behavior through collaborators and why it can reduce inheritance coupling.

## 216. Interview: Static vs Instance

**Question:** What is the difference between static and instance methods?

**Answer target:** Static methods belong to the class/constructor and can have that class as `this`; instance methods are normally resolved through the instance's prototype.

## 217. Interview: Static this

**Question:** Can static methods use `this`?

**Answer:** Yes. A normal `Class.method()` call supplies the class/constructor as the receiver.

## 218. Interview: super

**Question:** What is `super()`?

**Answer target:** Explain base-class constructor initialization and why derived constructors must call it before using `this`.

## 219. Interview: Private Fields

**Question:** What is a private class field?

**Answer target:** Explain `#field` syntax and language-enforced private access.

## 220. Interview: Underscore

**Question:** Is `_name` private?

**Answer:** No. It is only a naming convention.

## 221. Interview: Protected

**Question:** Does JavaScript support protected fields?

**Answer:** JavaScript has no native `protected` access modifier. It has public members and language-enforced private `#` elements.

## 222. Interview: Overloading

**Question:** Does JavaScript support traditional function overloading?

**Answer:** No native overload signatures. Same-name declarations replace earlier declarations; overload-like behavior requires manual argument handling or another design.

## 223. Interview: Class vs Factory

**Question:** Class vs factory?

**Answer target:** Explain that factories can hide or vary construction while classes provide recognizable instance types and prototype-based methods.

## 224. Teach-Back: Prototype

Teach prototypes to a beginner using a lookup-chain diagram. Distinguish `User.prototype` from `Object.getPrototypeOf(instance)`.

## 225. Teach-Back: new

Explain `new` as: create object → link prototype → call constructor with `this` → return the appropriate result.

## 226. Teach-Back: Encapsulation

Explain encapsulation using a bank-account invariant and show why uncontrolled balance mutation can create invalid state.

## 227. Teach-Back: Abstraction

Explain a payment service whose public method is `charge()` while provider-specific implementation stays hidden.

## 228. Teach-Back: Inheritance

Explain `extends`, prototype relationships, `super()`, overriding, and why inheritance should represent a meaningful subtype relationship.

## 229. Teach-Back: Polymorphism

Demonstrate the same `draw()` call working with circle, rectangle, and duck-typed shape objects.

## 230. Teach-Back: Composition

Explain dependency injection with a service that receives a logger and repository rather than constructing them internally.

## 231. Teach-Back: Static Members

Explain why `User.createGuest()` belongs to `User` while `user.getName()` belongs to an instance.

## 232. Teach-Back: Private Fields

Explain why `#balance` is different from `_balance`, and show how public methods can preserve invariants.

## 233. Teach-Back: Classes Under the Hood

Explain that class methods normally live on the prototype and that `extends` establishes prototype inheritance. Avoid saying classes create a completely separate object model.

## 234. Mastery: Objects

- [ ] I can explain state, behavior, identity, and interface.
- [ ] I can distinguish own properties from inherited properties.
- [ ] I can inspect prototype relationships.

## 235. Mastery: Constructors

- [ ] I can write constructor functions.
- [ ] I understand `new` conceptually.
- [ ] I know why shared methods commonly belong on prototypes.

## 236. Mastery: Classes

- [ ] I can write class constructors and instance methods.
- [ ] I understand class TDZ behavior.
- [ ] I know classes normally require `new`.

## 237. Mastery: this

- [ ] I can explain call-sensitive `this`.
- [ ] I can use `call`, `apply`, and `bind`.
- [ ] I understand arrow-function lexical `this`.

## 238. Mastery: Encapsulation

- [ ] I understand true private `#` fields.
- [ ] I know `_name` is only a convention.
- [ ] I can protect invariants through a public API.

## 239. Mastery: Inheritance

- [ ] I can use `extends` and `super()`.
- [ ] I understand derived-constructor initialization.
- [ ] I can explain prototype inheritance under classes.

## 240. Mastery: Polymorphism

- [ ] I can explain method overriding.
- [ ] I can use behavior-based polymorphism.
- [ ] I know `instanceof` is not required for polymorphism.

## 241. Mastery: Composition

- [ ] I can inject collaborators.
- [ ] I can choose composition when inheritance creates unnecessary coupling.
- [ ] I can explain delegation.

## 242. Mastery: Static

- [ ] I understand static methods and fields.
- [ ] I know static methods have `this`.
- [ ] I know static members belong to the class/constructor rather than instances.

## 243. Mastery: Architecture

- [ ] I can split responsibilities into cohesive classes/modules.
- [ ] I can design stable public interfaces.
- [ ] I can identify when a class has become a god object.

## 244. Mastery: Design

- [ ] I can compare inheritance, composition, delegation, and factories.
- [ ] I can apply basic SOLID reasoning.
- [ ] I can justify an OOP design rather than applying patterns mechanically.

# Final Mental Model

```text
JavaScript Objects
      │
      ├── Own Properties
      │       ├── State
      │       └── Instance Fields
      │
      ├── Prototype Chain
      │       ├── Shared Methods
      │       └── Inherited Behavior
      │
      ├── Classes / Constructors
      │       └── Object Creation
      │
      ├── Encapsulation
      │       ├── Private # Fields
      │       ├── Closures
      │       └── Public API + Invariants
      │
      ├── Inheritance
      │       └── extends / super
      │
      ├── Polymorphism
      │       └── Same Operation → Different Behavior
      │
      └── Composition
              └── Objects + Collaborators
```

# Final OOP Challenge

Build a **complete Order Management System** using JavaScript OOP.

Requirements:

1. Create `Product`, `Cart`, `Order`, and `User` classes.
2. Use private fields where state needs controlled access.
3. Preserve invariants such as valid quantities and non-negative totals.
4. Put genuinely shared methods on prototypes/classes rather than recreating them unnecessarily.
5. Use composition for payment, logging, and persistence services.
6. Demonstrate one meaningful inheritance hierarchy.
7. Demonstrate polymorphism without relying on `instanceof` everywhere.
8. Add at least one static factory method.
9. Inject external dependencies.
10. Write tests for public behavior.
11. Draw object/prototype relationships.
12. Explain every design choice.
13. Identify one place where inheritance would be worse than composition.
14. Refactor one god-class into smaller collaborators.
15. Teach the completed architecture to another beginner without opening your notes.

**Mastery standard:** You are not finished when you can write `class User`. You are finished when you can explain **why** a class, prototype, module, closure, factory, composition relationship, or plain object is the right abstraction for a particular problem.
