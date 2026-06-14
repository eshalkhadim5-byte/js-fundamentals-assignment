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

<img width="337" height="353" alt="Screenshot 2026-06-13 234018" src="https://github.com/user-attachments/assets/30143937-f8f8-4444-8eda-964070005892" />



## **B2: Type Analyser Function**

<img width="1029" height="408" alt="Screenshot 2026-06-14 004410" src="https://github.com/user-attachments/assets/d0db5213-7e27-4f5d-9f5a-9142cfbb6865" />

---

## **B3: Calculate Discount Function**

<img width="412" height="537" alt="Screenshot 2026-06-14 004930" src="https://github.com/user-attachments/assets/f4f38c8f-6e60-43c9-b753-a265bc4d2022" />

```

---
## **B4: Reference Bugs & Deep Clone Solution**
![Screenshot](https://github.com/user-attachments/assets/e4f825d1-e2ef-48ba-b91b-a1b46b678ec1)

---
## **B5: Pure Functions Library**






---

# **Section C (Scenario-based Problem Solving)**

---

## **C1: E-Commerce Product Filter + Search**

```javascript
// Real-world scenario: Build a product filter and search system

const products = [
  { id: 1, name: 'Laptop', price: 50000, category: 'Electronics', inStock: true },
  { id: 2, name: 'Mouse', price: 2000, category: 'Electronics', inStock: true },
  { id: 3, name: 'Monitor', price: 15000, category: 'Electronics', inStock: false },
  { id: 4, name: 'Keyboard', price: 5000, category: 'Electronics', inStock: true },
  { id: 5, name: 'USB Cable', price: 500, category: 'Accessories', inStock: true },
  { id: 6, name: 'Desk Lamp', price: 3000, category: 'Furniture', inStock: true }
]

// Problem 1: Filter by price range
function filterByPrice(products, minPrice, maxPrice) {
  return products.filter(product => product.price >= minPrice && product.price <= maxPrice)
}

console.log('Products 1000-10000:', filterByPrice(products, 1000, 10000))
// Output: Mouse, Keyboard, USB Cable, Desk Lamp

---

// Problem 2: Filter by category
function filterByCategory(products, category) {
  return products.filter(product => product.category === category)
}

console.log('Electronics:', filterByCategory(products, 'Electronics'))
// Output: Laptop, Mouse, Monitor, Keyboard

---

// Problem 3: Search by name (case-insensitive)
function searchByName(products, searchTerm) {
  const lowerSearch = searchTerm.toLowerCase()
  return products.filter(product => product.name.toLowerCase().includes(lowerSearch))
}

console.log('Search "key":', searchByName(products, 'key'))
// Output: Keyboard

---

// Problem 4: Filter in-stock products only
function filterInStock(products) {
  return products.filter(product => product.inStock === true)
}

console.log('In stock:', filterInStock(products))
// Output: All products except Monitor

---

// Problem 5: Combined filter (AND logic)
function advancedFilter(products, options = {}) {
  return products.filter(product => {
    const matchPrice = !options.minPrice || product.price >= options.minPrice
    const matchPrice2 = !options.maxPrice || product.price <= options.maxPrice
    const matchCategory = !options.category || product.category === options.category
    const matchStock = options.inStock === undefined || product.inStock === options.inStock
    
    return matchPrice && matchPrice2 && matchCategory && matchStock
  })
}

console.log('Electronics, in stock, 2000-20000:', advancedFilter(products, {
  category: 'Electronics',
  inStock: true,
  minPrice: 2000,
  maxPrice: 20000
}))
// Output: Mouse, Keyboard

---

// Problem 6: Sort by price (ascending)
function sortByPriceAsc(products) {
  return [...products].sort((a, b) => a.price - b.price)
}

console.log('Cheapest first:', sortByPriceAsc(products))

---

// Problem 7: Calculate total inventory value
function calculateInventoryValue(products) {
  return products
    .filter(p => p.inStock)
    .reduce((total, product) => total + product.price, 0)
}

console.log('Total in-stock value:', calculateInventoryValue(products))
// Output: 75500 (sum of all in-stock product prices)
```

---

## **C2: Student Grade Management System**

```javascript
// Real-world scenario: Build a student grade tracking system

const students = [
  { id: 1, name: 'Ahmed', marks: [85, 90, 78, 92], passed: true },
  { id: 2, name: 'Zara', marks: [92, 88, 95, 90], passed: true },
  { id: 3, name: 'Ali', marks: [45, 50, 48, 52], passed: false },
  { id: 4, name: 'Sara', marks: [75, 82, 79, 88], passed: true }
]

// Problem 1: Calculate average for each student
function calculateAverage(marks) {
  const sum = marks.reduce((total, mark) => total + mark, 0)
  return (sum / marks.length).toFixed(2)
}

console.log('Ahmed average:', calculateAverage(students[0].marks))  // 86.25

---

// Problem 2: Get grade letter based on average
function getGradeLetter(average) {
  if (average >= 90) return 'A'
  if (average >= 80) return 'B'
  if (average >= 70) return 'C'
  if (average >= 60) return 'D'
  return 'F'
}

console.log('Ahmed grade:', getGradeLetter(calculateAverage(students[0].marks)))  // B

---

// Problem 3: Get top performer
function getTopPerformer(students) {
  return students.reduce((top, student) => {
    const currentAvg = parseFloat(calculateAverage(student.marks))
    const topAvg = parseFloat(calculateAverage(top.marks))
    return currentAvg > topAvg ? student : top
  })
}

console.log('Top performer:', getTopPerformer(students))  // Zara

---

// Problem 4: Get students who passed
function getPassedStudents(students) {
  return students.filter(student => student.passed === true)
}

console.log('Passed students:', getPassedStudents(students))

---

// Problem 5: Get lowest and highest marks for a student
function getMarkRange(marks) {
  return {
    lowest: Math.min(...marks),
    highest: Math.max(...marks)
  }
}

console.log('Ahmed marks range:', getMarkRange(students[0].marks))  // { lowest: 78, highest: 92 }

---

// Problem 6: Sort students by average score (descending)
function sortByAverage(students) {
  return [...students].sort((a, b) => {
    const avgA = parseFloat(calculateAverage(a.marks))
    const avgB = parseFloat(calculateAverage(b.marks))
    return avgB - avgA
  })
}

console.log('Ranked students:', sortByAverage(students))

---

// Problem 7: Create detailed report for each student
function generateReport(students) {
  return students.map(student => ({
    name: student.name,
    average: calculateAverage(student.marks),
    grade: getGradeLetter(parseFloat(calculateAverage(student.marks))),
    status: student.passed ? '✅ Passed' : '❌ Failed'
  }))
}

console.log('Class Report:', generateReport(students))
```

---

## **C3: Bank Transaction Manager**

```javascript
// Real-world scenario: Build a transaction tracking system

const accounts = {
  'AC001': { balance: 50000, transactions: [] },
  'AC002': { balance: 30000, transactions: [] }
}

// Problem 1: Deposit money
function deposit(accountId, amount) {
  if (amount <= 0) return 'Invalid amount'
  if (!accounts[accountId]) return 'Account not found'
  
  accounts[accountId].balance += amount
  accounts[accountId].transactions.push({
    type: 'Deposit',
    amount: amount,
    date: new Date().toISOString(),
    newBalance: accounts[accountId].balance
  })
  return `✅ Deposited ${amount}. New balance: ${accounts[accountId].balance}`
}

console.log(deposit('AC001', 5000))

---

// Problem 2: Withdraw money
function withdraw(accountId, amount) {
  if (amount <= 0) return 'Invalid amount'
  if (!accounts[accountId]) return 'Account not found'
  if (accounts[accountId].balance < amount) return '❌ Insufficient funds'
  
  accounts[accountId].balance -= amount
  accounts[accountId].transactions.push({
    type: 'Withdrawal',
    amount: amount,
    date: new Date().toISOString(),
    newBalance: accounts[accountId].balance
  })
  return `✅ Withdrawn ${amount}. New balance: ${accounts[accountId].balance}`
}

console.log(withdraw('AC001', 2000))

---

// Problem 3: Transfer between accounts
function transfer(fromId, toId, amount) {
  if (amount <= 0) return 'Invalid amount'
  if (!accounts[fromId] || !accounts[toId]) return 'Account not found'
  if (accounts[fromId].balance < amount) return '❌ Insufficient funds'
  
  accounts[fromId].balance -= amount
  accounts[toId].balance += amount
  
  accounts[fromId].transactions.push({
    type: 'Transfer out',
    amount: amount,
    to: toId,
    date: new Date().toISOString(),
    newBalance: accounts[fromId].balance
  })
  
  accounts[toId].transactions.push({
    type: 'Transfer in',
    amount: amount,
    from: fromId,
    date: new Date().toISOString(),
    newBalance: accounts[toId].balance
  })
  
  return `✅ Transferred ${amount} from ${fromId} to ${toId}`
}

console.log(transfer('AC001', 'AC002', 3000))

---

// Problem 4: Get account balance
function getBalance(accountId) {
  if (!accounts[accountId]) return 'Account not found'
  return accounts[accountId].balance
}

console.log('AC001 Balance:', getBalance('AC001'))

---

// Problem 5: Get transaction history
function getTransactionHistory(accountId) {
  if (!accounts[accountId]) return 'Account not found'
  return accounts[accountId].transactions
}

console.log('AC001 Transactions:', getTransactionHistory('AC001'))

---

// Problem 6: Calculate total deposits
function calculateTotalDeposits(accountId) {
  if (!accounts[accountId]) return 'Account not found'
  return accounts[accountId].transactions
    .filter(t => t.type === 'Deposit')
    .reduce((sum, t) => sum + t.amount, 0)
}

console.log('AC001 Total Deposits:', calculateTotalDeposits('AC001'))

---

// Problem 7: Find largest transaction
function getLargestTransaction(accountId) {
  if (!accounts[accountId]) return 'Account not found'
  const transactions = accounts[accountId].transactions
  if (transactions.length === 0) return 'No transactions'
  
  return transactions.reduce((largest, current) => 
    current.amount > largest.amount ? current : largest
  )
}

console.log('Largest transaction:', getLargestTransaction('AC001'))
```

---

**Happy Learning! 🎓**
