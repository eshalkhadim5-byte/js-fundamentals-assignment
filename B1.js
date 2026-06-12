// B1: Hoisting + TDZ + const reassignment fix

var a
console.log('a before assignment:', a) // undefined due to hoisting
a = 10
console.log('a after assignment:', a) // 10

let b = 20
console.log('b:',b) // 20 - declared before use

const c = 30
console.log('c:',c) //30 - declared before use

var a = 99 // var can be redeclared
console.log('final a:', a) // 99
