// return types
// void methods return undefined
function printToConsole(num: number) {
  // inferences return type as void
  console.log(`Number: ${num}`);
}

function printToConsoleExplicit(num: number): void {
  // explicit return type
  console.log(`Number: ${num}`);
  return; // can use return with void
}

function printToConsoleReturn(num: number): undefined {
  // undefined works similarly to void
  console.log(`Number: ${num}`);
}

// functions as type
const pointer = printToConsole;
pointer(123);

const functionPointer: Function = printToConsole; // explicit

function sum(num1: number, num2: number) {
  return num1 + num2;
}

let arrowPointer: (num1: number, num2: number) => number;
arrowPointer = sum;

let voidArrowPointer: (num: number) => void;
voidArrowPointer = printToConsole;

console.log(`Number: ${arrowPointer(33, 44)}`);
voidArrowPointer(124);

// callbacks
function addAndHandle(
  num1: number,
  num2: number,
  callBack: (num: number) => void // typed callback
) {
  const result = num1 + num2;
  callBack(result);
}

addAndHandle(123, 124, (result) => {
  console.log(result); // anonymous function
});

function returnTheSame(num: number) {
  return num;
}

// void callback return type is not enforced,
// it just suggests that the value is not used inside the host method
addAndHandle(111, 222, returnTheSame);
