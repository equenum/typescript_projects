// numbers
const number1 = 4.5;
const number2 = 5.5;

const sum = add(number1, number2);
console.log(`Result: ${sum}.`);

function add(number1: number, number2: number) {
  return number1 + number2;
}

// string + boolean
const text = "Hello World!";
const isUpper = true;

printToConsole(text, isUpper);

function printToConsole(text: string, isUpperCase: boolean) {
  if (isUpperCase) {
    text = text.toUpperCase();
  }

  console.log(text);
}

// objects + arrays
const bob = {
  firstName: "Bob",
  lastName: "Marley",
  age: 36,
  hobbies: ["Music", "Soccer"],
};

console.log(bob);

for (const hobby of bob.hobbies) {
  console.log(hobby.toLocaleUpperCase());
}

// tuples
const person: {
  firstName: string;
  lastName: string;
  age: number;
  hobbies: [number, string]; // tuple
} = {
  firstName: "Bob",
  lastName: "Marley",
  age: 36,
  hobbies: [2, "Soccer"], // tuple
};

person.hobbies.push("Painting"); // push is allowed by TypeScript

// enums
enum Hobby {
  "Music",
  "Soccer",
}

enum Role {
  Admin = 0,
  Dev = 1,
  Maintainer = 2,
}

enum Color {
  Red = "Red",
  Blue = "Blue",
}

const role = Role.Admin; // value Role.Admin
const color = Color.Blue.valueOf(); // value string

console.log(role); // output: 0
console.log(Role.Admin); // output: 0

console.log(color); // output: Blue
console.log(Color.Blue); // output: Blue

// any - should be avoided at all costs, obviously
let anyArray: any[];
let anyValue: any;

// union + literal types
function combine(
  input1: number | string, // union type
  input2: number | string,
  outputType: "as-number" | "as-text" // literal union type
) {
  let result: string | number;

  if (typeof input1 === "number" && typeof input2 === "number") {
    result = input1 + input2;
  } else {
    result = input1.toString() + input2.toString();
  }

  if (outputType === "as-number") {
    result = +result;
  } else {
    result = result.toString();
  }

  return result;
}

console.log(combine(2.5, 2.5, "as-number"));
console.log(combine("Bob", "Marley", "as-text"));

// type aliases
type Combinable = number | string;
type OutputDescriptor = "as-number" | "as-text";

function combineRefactored(
  input1: Combinable,
  input2: Combinable,
  outputType: OutputDescriptor
) {
  let result: Combinable;

  if (typeof input1 === "number" && typeof input2 === "number") {
    result = input1 + input2;
  } else {
    result = input1.toString() + input2.toString();
  }

  if (outputType === "as-number") {
    result = +result;
  } else {
    result = result.toString();
  }

  return result;
}

// unknown
let userInput: unknown; // we don't know what the value would be
let userName: string;

// can store any value like 'any' does
userInput = 5;
userInput = "Bob";

if (typeof userInput === "string") {
  // we have to implement an explicit type check to assign the value
  userName = userInput;
}

// never
function generateError(message: string, code: number): never {
  // a utility function, throw never produces a value
  // since the method is never executed to the end
  throw { errorMessage: message, errorCode: code };
}

generateError("Invalid input!", 112);

// another example of a function that never returns a value
function infiniteLoop() {
  //while(true) {
  //}
}
