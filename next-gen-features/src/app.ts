let phrase = 'Hello!';
console.log(phrase);

// arrow functions
const add = (a: number, b: number) => {
  return a + b;
};

const addOneLiner = (a: number, b: number) => a + b; // when we only have one statement

const button = document.querySelector('button');

if (button) {
  button.addEventListener('click', (event) => {
    console.log(event);
  });
}

if (button) {
  // same but one liner
  button.addEventListener('click', (event) => console.log(event));
}

// default arguments
const addWithDefault = (a: number, b: number = 1) => a + b; // default arguments have to be last

// const addWithDefault2 = (a: number = 1, b: number) => a + b;
// this will result in an error: An argument for 'b' was not provided.

// spread operators
const hobbies = ['Singing', 'Painting', 'Hiking'];
console.log(hobbies[0]);

const newHobbies = ['Cycling'];

hobbies.push(...newHobbies); // spreads (flattens) the array into a comma separated list of values
const evenNewerHobbies = ['Cooking', ...hobbies];

const person = {
  firstName: 'Tom',
  age: 123,
};

const newPerson = { ...person }; // spread the object into a collection of key-value pairs to create a copy

// rest parameters (kind of the opposite to the spread operator)
function addMultiple(...numbers: number[]) {
  let sum = 0;

  numbers.forEach((number) => {
    sum = sum + number;
  });

  return sum;
}

console.log(addMultiple(1, 2, 3, 4));

// array and object destructuring
const [hobby1, hobby2, ...remaining] = hobbies; // array
console.log(hobby2);

const { firstName, age } = person; // object, those are actual property names, since the order is not guarantied
console.log(firstName);

const { firstName: userName, age: userAge } = person; // can use aliases
