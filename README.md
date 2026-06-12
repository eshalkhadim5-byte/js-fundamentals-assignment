# 🚀 JS Fundamentals Assignment

📚 **Practiced JavaScript basics** including variables, data types, operators, conditions, loops, and functions.  
💻 **Improved problem-solving skills** through comprehensive assignments and practical examples.

---

# **Section A (Theory Questions)**

---

## **Q1: Difference between var, let, const?**

### **Answer:**

1. **Scope:** 
   - `var` is function-scoped
   - `let` and `const` are block-scoped `{}`

2. **Hoisting:** 
   - `var` is hoisted and initialized with `undefined`
   - `let` and `const` are hoisted but in TDZ (Temporal Dead Zone)

3. **TDZ - Temporal Dead Zone:** 
   - Time between entering scope and actual declaration
   - Accessing `let`/`const` in TDZ throws `ReferenceError`
   - `var` just gives `undefined`

4. **Re-declaration & Re-assignment:**
   - `var` → can be re-declared and re-assigned
   - `let` → can be re-assigned but NOT re-declared in same scope
   - `const` → cannot be re-assigned or re-declared
   - For objects/arrays with `const`, you can still change properties

5. **Best Practice:** 
   - Use `const` by default
   - Use `let` only when you need to re-assign
   - Avoid `var` due to scope + hoisting issues

### **Code Example:**

```javascript
// Scope difference
function test() {
  if (true) {
    var x = 1;       // function scoped
    let y = 2;       // block scoped
    const z = 3;     // block scoped
  }
  console.log(x);    // 1 - works
  console.log(y);    // ReferenceError
}

// Hoisting + TDZ
console.log(a);      // undefined - var hoisted
var a = 5;

console.log(b);      // ReferenceError: Cannot access 'b' before initialization
let b = 10;

// Re-declaration
var num = 1;
var num = 2;         // allowed
let str = "hello";
let str = "world";   // SyntaxError - not allowed

// const with objects
const user = { name: "Ali" };
user.name = "Bob";   // allowed - property change
user = {};           // TypeError - reassignment not allowed
```

---

## **Q2: V8 Engine + Why JS is Single-threaded + Async Handling?**

### **Answer:**

1. **V8 Engine:** 
   - Google's open-source JavaScript engine written in C++
   - Converts JS code to machine code
   - Used by Chrome, Edge, Node.js, Deno

2. **JIT Compilation:** 
   - Just-In-Time compilation
   - Interprets code first, then optimizes hot functions to machine code during runtime

3. **Single-threaded:** 
   - JavaScript has only ONE Call Stack
   - Executes one task at a time
   - Avoids complex multi-threading problems like deadlocks

4. **How Async Works:** 
   - JS itself is synchronous
   - Uses Web APIs/Node APIs + Event Loop for asynchronous tasks
   - When calling `setTimeout` or `fetch`, task goes to Web API
   - After completion, callback goes to Callback Queue
   - Event Loop checks if Call Stack is empty, then pushes callback to stack

5. **4 Key Components:**
   - **Call Stack** → where code executes
   - **Web API** → browser APIs for async tasks
   - **Callback Queue** → holds completed callbacks
   - **Event Loop** → bridge that moves callbacks to stack

### **Code Example:**

```javascript
console.log("Start");

setTimeout(() => {
  console.log("Timeout callback");  // goes to Web API, then Callback Queue
}, 0);

console.log("End");

// Output order: 
// Start → End → Timeout callback
// Even with 0ms, callback runs after current stack is empty

// Another example with fetch
console.log("Fetching data...");

fetch("https://api.example.com/data")
  .then(response => response.json())
  .then(data => console.log("Data received:", data));  // callback Queue

console.log("Request sent");

// Output:
// Fetching data...
// Request sent
// Data received: {...}
```

---

## **Q3: 8 Data Types + Type Coercion + typeof null?**

### **Answer:**

1. **8 Data Types:**
   - **7 Primitives:** `string`, `number`, `bigint`, `boolean`, `symbol`, `undefined`, `null` (Stored by value)
   - **1 Object:** Non-primitive type (Stored by reference)

2. **typeof null Bug:** 
   - `typeof null` returns `"object"`
   - This is a 25+ year old bug from the first JS version
   - `null` was represented as `0x00` pointer, and `typeof` treated objects as `0`
   - Cannot fix due to backward compatibility

3. **Implicit Coercion:** 
   - JS automatically converts types based on operators
   - `+` with string converts numbers to string: `5 + "5" = "55"`
   - `-` converts string to number: `"10" - 2 = 8`

4. **Explicit Coercion:** 
   - Manual conversion using built-in functions
   - `Number("123")` → `123`
   - `String(123)` → `"123"`
   - `Boolean("")` → `false`

5. **== vs ===:**
   - `==` does type coercion before comparison: `0 == false` → `true`
   - `===` checks type + value without coercion: `0 === false` → `false`
   - Always prefer `===` to avoid bugs

### **Code Example:**

```javascript
// typeof with all data types
console.log(typeof "hello");        // "string"
console.log(typeof 123);            // "number"
console.log(typeof 123n);           // "bigint"
console.log(typeof true);           // "boolean"
console.log(typeof Symbol());       // "symbol"
console.log(typeof undefined);      // "undefined"
console.log(typeof null);           // "object" - BUG!
console.log(typeof {});             // "object"

// Implicit Coercion
console.log(5 + "5");               // "55" - string concatenation
console.log(5 - "2");               // 3 - converted to number
console.log("10" * "2");            // 20 - both converted
console.log("10" / "2");            // 5 - division

// Explicit Coercion
console.log(Number("100"));         // 100
console.log(String(123));           // "123"
console.log(Boolean(0));            // false
console.log(Boolean(1));            // true
console.log(Boolean(""));           // false
console.log(Boolean("hello"));      // true

// == vs ===
console.log(0 == false);            // true - coercion
console.log(0 === false);           // false - strict check
console.log("5" == 5);              // true - coercion
console.log("5" === 5);             // false - strict check
console.log(null == undefined);     // true - special case
console.log(null === undefined);    // false - strict check
```

---

## **Q4: Primitive vs Non-Primitive + Memory + Copy?**

### **Answer:**

1. **Primitive Types:** 
   - `string`, `number`, `bigint`, `boolean`, `symbol`, `undefined`, `null`
   - Stored in **Stack memory**
   - Fixed size, value is accessed directly

2. **Non-Primitive Types:** 
   - `Object`, `Array`, `Function`
   - Stored in **Heap memory**
   - Variable size, stack stores only reference/pointer to heap location

3. **Copy Behavior - Primitive:** 
   - When you assign, actual value is copied
   - Changes to copy don't affect original

4. **Copy Behavior - Non-Primitive:** 
   - When you assign, reference is copied
   - Both variables point to same heap object
   - Changes reflect in both

5. **Memory Diagram:**
   - **Stack:** stores primitives directly and references to heap
   - **Heap:** stores objects and arrays

### **Code Example:**

```javascript
// Primitive - value copy
let a = 10;
let b = a;              // copy of value 10
b = 20;
console.log(a);         // 10 - unchanged
console.log(b);         // 20

// Non-primitive - reference copy
let user1 = { name: "Ali", age: 20 };
let user2 = user1;      // copy of reference/address
user2.age = 25;
console.log(user1.age); // 25 - original changed!
console.log(user2.age); // 25

// To make real copy of object - Shallow Copy
let user3 = { ...user1 };    // spread operator
user3.age = 30;
console.log(user1.age);      // 25 - now unchanged
console.log(user3.age);      // 30

// Another method - Object.assign()
let user4 = Object.assign({}, user1);
user4.name = "Bob";
console.log(user1.name);     // "Ali" - unchanged

// Array copy
let arr1 = [1, 2, 3];
let arr2 = arr1;             // reference copy
arr2[0] = 99;
console.log(arr1[0]);        // 99 - changed

let arr3 = [...arr1];        // shallow copy
arr3[0] = 1;
console.log(arr1[0]);        // 99 - unchanged
```

---

## **Q5: Pass by Value vs Pass by Reference?**

### **Answer:**

1. **Primitive passed by value:** 
   - A copy of the actual value is passed to function
   - Function can't change original variable

2. **Object passed by value of reference:** 
   - JS always passes by value
   - For objects, the "value" being passed is the memory address/reference
   - So function can mutate the object

3. **Key Nuance:** 
   - JS does NOT have true "pass by reference"
   - It has "pass by sharing" - you get a copy of the reference

4. **Reassignment Proof:** 
   - If you reassign the parameter to a new object inside function, original outside won't change
   - You only changed the local copy of reference

5. **Mutation vs Reassignment:**
   - `obj.prop = 5` mutates original object
   - `obj = {}` just changes local reference

### **Code Example:**

```javascript
// Primitive - pass by value
function changePrimitive(num) {
  num = 100;             // changes local copy only
}
let x = 10;
changePrimitive(x);
console.log(x);          // 10 - unchanged

// Object - pass by sharing (reference copy)
function changeObject(obj) {
  obj.name = "Ali";      // mutates original object
  obj = { name: "New" }; // reassign local reference only
}
let user = { name: "Ahmed" };
changeObject(user);
console.log(user.name);  // "Ali" - not "New"

// Mutation example
function mutateArray(arr) {
  arr[0] = 99;           // mutates original
  arr.push(4);           // mutates original
}
let nums = [1, 2, 3];
mutateArray(nums);
console.log(nums);       // [99, 2, 3, 4] - changed

// Reassignment doesn't affect original
function reassignArray(arr) {
  arr = [10, 20, 30];    // local reassignment only
}
let nums2 = [1, 2, 3];
reassignArray(nums2);
console.log(nums2);      // [1, 2, 3] - unchanged
```

---

## **Q6: What is a Function + Declaration + Hoisting + Return + Params?**

### **Answer:**

1. **Function Definition:** 
   - A reusable block of code that takes inputs, processes them, and returns output
   - Solves code repetition and improves maintainability

2. **Parameters vs Arguments:** 
   - **Parameter** = placeholder in function definition: `function add(a, b)`
   - **Argument** = actual value in function call: `add(5, 3)`

3. **Hoisting:** 
   - Function declarations are **fully hoisted** - you can call them before definition
   - Function expressions are NOT hoisted, only the variable is hoisted as `undefined`

4. **Return Value:** 
   - `return` sends value back to caller and stops execution
   - If no `return` is written, function returns `undefined` by default

5. **Function Types:**
   - Function Declaration
   - Function Expression
   - Arrow Functions

### **Code Example:**

```javascript
// Function Declaration - hoisted
console.log(validateAge(20));  // Works! Function hoisted

function validateAge(age) {
  if (typeof age !== "number") {
    return "Invalid input: age must be number";
  }
  if (age >= 18) {
    return "You are eligible";
  } else {
    return "You are not eligible";
  }
}

console.log(validateAge(20));   // "You are eligible"
console.log(validateAge(15));   // "You are not eligible"

// Function Expression - not hoisted
console.log(checkAge);          // undefined - only variable hoisted

const checkAge = function(age = 18) {  // default parameter
  return age >= 18;
};

console.log(checkAge(20));      // true
console.log(checkAge());        // true - uses default value

// Arrow Function
const greet = (name) => {
  return `Hello, ${name}!`;
};

console.log(greet("Ali"));      // "Hello, Ali!"

// Functions are objects in JS
function demo() {}
console.log(typeof demo);       // "function"
console.log(demo.name);         // "demo"
console.log(demo.length);       // 0 - number of parameters
console.log(demo instanceof Object);  // true

// Multiple parameters and return
function calculateGrade(marks1, marks2, marks3) {
  const total = marks1 + marks2 + marks3;
  const average = total / 3;
  
  if (average >= 80) return "A";
  if (average >= 60) return "B";
  return "C";
}

console.log(calculateGrade(85, 90, 88));  // "A"
console.log(calculateGrade(60, 65, 70));  // "B"
```

---

## **Summary Table**

| Concept | Key Point |
|---------|-----------|
| **var vs let vs const** | Use `const` by default, `let` when needed, avoid `var` |
| **V8 Engine** | Converts JS to machine code with JIT compilation |
| **Async Handling** | Uses Event Loop, Web APIs, and Callback Queue |
| **Data Types** | 7 Primitives + 1 Object type |
| **typeof null** | Returns `"object"` - a 25+ year old bug |
| **Type Coercion** | Implicit (automatic) vs Explicit (manual) |
| **Primitives** | Stored in Stack, passed by value |
| **Objects** | Stored in Heap, passed by reference (sharing) |
| **Functions** | Declarations are hoisted, expressions are not |

---

# **Section B (Coding Questions)**

---

## **B1: Hoisting + TDZ + const reassignment fix**

```javascript
var a
console.log('a before assignment:', a) // undefined due to hoisting
a = 10
console.log('a after assignment:', a) // 10

let b = 20
console.log('b:', b) // 20 - declared before use

const c = 30
console.log('c:', c) // 30 - declared before use

var a = 99 // var can be redeclared
console.log('final a:', a) // 99
```

---

## **B2: Type Analyser Function**

```javascript
// B2: typeAnalyser function - analyze data types and truthiness

function typeAnalyser(value) {
  let type = typeof value
  if (value === null) type = 'null'
  if (Array.isArray(value)) type = 'array'
  return {
    input: value,
    typeofResult: typeof value,
    actualType: type,
    isFalsy: !value,
    isTruthy: !!value
  }
}

// 8 test cases - MUST run
console.log(typeAnalyser(42))
console.log(typeAnalyser('hello'))
console.log(typeAnalyser(null))
console.log(typeAnalyser([]))
console.log(typeAnalyser(undefined))
console.log(typeAnalyser(true))
console.log(typeAnalyser(0))
console.log(typeAnalyser(''))
```

---

## **B3: Calculate Discount Function**

```javascript
// B3: calculateDiscount - applies 7 discount rules

function calculateDiscount(price, userType, isMember) {
  // Rule 1: Validate price input
  if (typeof price !== 'number' || price <= 0) {
    return 'Invalid price'
  }

  let finalPrice = price

  // Rule 2-4: Apply discount based on userType and price
  if (userType === 'admin') {
    finalPrice = price * 0.5  // 50% discount for admin
  } else if (price > 1000) {
    finalPrice = price * 0.8  // 20% discount for price > 1000
  } else if (price > 500) {
    finalPrice = price * 0.9  // 10% discount for price > 500
  }

  // Rule 5: Apply member discount (5% off)
  if (isMember === true) {
    finalPrice = finalPrice * 0.95
  }

  // Rule 6: Ensure minimum price of 1
  if (finalPrice < 1) {
    finalPrice = 1
  }

  // Rule 7: Return formatted result to 2 decimal places
  return finalPrice.toFixed(2)
}

// Test cases
console.log(calculateDiscount(1200, 'user', false))   // 960.00
console.log(calculateDiscount(1200, 'user', true))    // 912.00
console.log(calculateDiscount(600, 'admin', true))    // 285.00
console.log(calculateDiscount(-50, 'user', false))    // Invalid price
console.log(calculateDiscount('abc', 'user', false))  // Invalid price
```

---

## **B4: Reference Bugs & Deep Clone Solutions**

```javascript
// B4: Reference bugs and how to fix them

// ❌ BUG 1: Shallow copy with nested arrays
// Problem: Spread operator only copies first level
const cart1 = { items: ['JS Book', 'React Book'], total: 150 }
const cart2 = { ...cart1 }  // ❌ items array is still shared reference
cart2.items.push('Node Book')
console.log('cart1 items:', cart1.items)  // ❌ ['JS Book', 'React Book', 'Node Book'] - MUTATED!

// ✅ FIX 1: Deep copy nested structures
const cart2Fixed = { ...cart1, items: [...cart1.items] }
cart2Fixed.items.push('Node Book')
console.log('cart1 items:', cart1.items)  // ✅ ['JS Book', 'React Book'] - unchanged!

---

// ❌ BUG 2: Function should not mutate original
// Problem: Direct object modification
function applyTaxBuggy(order) {
  order.total = order.total * 1.17  // ❌ Mutates original!
  return order
}
const myOrder = { id: 1, total: 100 }
const taxedOrder = applyTaxBuggy(myOrder)
console.log('Original total:', myOrder.total)  // ❌ 117 - MUTATED!

// ✅ FIX 2: Return new object without mutation
function applyTax(order) {
  return { ...order, total: order.total * 1.17 }  // ✅ Creates new object
}
const myOrder2 = { id: 1, total: 100 }
const taxedOrder2 = applyTax(myOrder2)
console.log('Original total:', myOrder2.total)  // ✅ 100 - unchanged!
console.log('Taxed total:', taxedOrder2.total)   // ✅ 117

---

// ❌ BUG 3: Shallow reset doesn't handle nested objects
// Problem: Nested objects are still shared
const defaultConfig = { theme: 'dark', lang: 'en', nested: { fontSize: 14 } }
const appConfig = { theme: 'light', lang: 'ur', nested: { fontSize: 20 } }
const buggyReset = { ...defaultConfig }  // ❌ nested object is shared reference
buggyReset.nested.fontSize = 30
console.log('defaultConfig fontSize:', defaultConfig.nested.fontSize)  // ❌ 30 - MUTATED!

// ✅ FIX 3: Use structureClone for deep copy
const deepResetConfig = structureClone(defaultConfig)  // ✅ Complete deep copy
deepResetConfig.nested.fontSize = 30
console.log('defaultConfig fontSize:', defaultConfig.nested.fontSize)  // ✅ 14 - unchanged!
console.log('Reset config fontSize:', deepResetConfig.nested.fontSize)  // ✅ 30

---

// Summary of Copy Methods:
// 1. Spread {...obj} = Shallow copy (nested objects still shared)
// 2. Object.assign({}, obj) = Shallow copy (nested objects still shared)
// 3. structureClone(obj) = Deep copy (completely independent)
// 4. JSON.parse(JSON.stringify(obj)) = Deep copy (limited compatibility)
```

---

**Happy Learning! 🎓**
