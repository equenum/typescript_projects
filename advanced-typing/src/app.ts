// intersection types
type Admin = {
  name: string;
  roles: string[];
};

type Employee = {
  name: string;
  department: string;
};

// intersection: similar to interface inheritance, but less code
type PrincipalEmployee = Admin & Employee;

let principal: PrincipalEmployee;
principal = {
  name: 'Tom',
  roles: ['Big Boss, IT guy'],
  department: 'IT',
};

// intersection with union types
type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric; // takes all common types

// type guards
type GeneralEmployee = Admin | Employee;

function printEmployee(employee: GeneralEmployee) {
  console.log(employee.name);
  // check if a given property exists as part of object
  if ('roles' in employee) {
    console.log(employee.roles);
  }

  if ('department' in employee) {
    console.log(employee.department);
  }
}

// instanceof
class Car {
  ride() {
    console.log('Riding a car');
  }
}

class Truck {
  ride() {
    console.log('Riding a truck');
  }

  load(cargoWeight: number) {
    console.log(`Loading in ${cargoWeight} tons of cargo`);
  }
}

type Vehicle = Car | Truck;

var car = new Car();
var truck = new Truck();

function useVehicle(vehicle: Vehicle) {
  vehicle.ride();

  if (vehicle instanceof Truck) {
    vehicle.load(1000);
  }
}

useVehicle(car);
useVehicle(truck);

// discriminated unions: works with interfaces and classes
interface Bird {
  type: 'bird';
  flyingSpeed: number;
}

interface Horse {
  type: 'horse';
  runningSpeed: number;
}

type Animal = Horse | Bird;

function moveAnimal(animal: Animal) {
  let speed: number;
  switch (animal.type) {
    case 'bird':
      speed = animal.flyingSpeed;
      break;
    case 'horse':
      speed = animal.runningSpeed;
      break;
  }

  console.log(`Moving at speed: ${speed}`);
}

// type casting
const paragraph1 = document.querySelector('p'); // inferred type: HTMLParagraphElement
const paragraph2 = document.getElementById('paragraph') as HTMLParagraphElement; // inferred type: HTML element
const paragraph3 = <HTMLParagraphElement>document.getElementById('paragraph');

// index properties
interface ErrorContainer {
  [prop: string]: string; // index property that has a string name and string value
  //id: string; // we can also add predefined properties, but only if they are of the same type as the index one(s)
}

const errorBag: ErrorContainer = {
  email: 'Invalid email',
  errorCode: 'INVEM101',
};

// function overloads

//type Combinable = string | number;
function add(a: string, b: string): string;
function add(a: number, b: string): string;
function add(a: string, b: number): string;
function add(a: number, b: number): number;
function add(a: Combinable, b: Combinable) {
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString();
  }

  return a + b;
}

const resultNumber = add(1, 2); // inferred type: number
const resultString = add('1', '2'); // inferred type: string

// optional chaining and nullish coalescing
// console.log(user?.job?.title); ? - auto null check

const userInput = null;
const storedData = userInput ?? 'DEFAULT'; // ?? - null or undefined
