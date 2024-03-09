// classes
class Person {
  // fields: public by default
  readonly firstName: string; // firstName: string = 'DEFAULT'; - default value
  readonly lastName: string;

  // protected modifier is also available

  constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  // also public by default
  // this 'argument makes sure that this always refers to the object and to the caller'
  getFullInfo(this: Person) {
    return `${this.firstName} ${this.lastName}`;
  }
}

const person = new Person('Bob', 'Marley');
console.log(person);
console.log(person.getFullInfo());

// shorthand syntax for property initialization
class ShortPerson {
  constructor(
    public readonly firstName: string,
    public readonly lastName: string
  ) {}
}

const shortPerson = new ShortPerson('Name', 'LastName');
console.log(shortPerson);

// inheritance
class Employee extends Person {
  readonly departmentName: string;

  constructor(departmentName: string, firstName: string, lastName: string) {
    super(firstName, lastName); // base constructor

    this.departmentName = departmentName;
  }

  override getFullInfo(this: Employee) {
    return `Department: ${this.departmentName}, 
    Full name: ${super.getFullInfo()}`; // super - base class reference
  }
}

const employee = new Employee('Sales', 'Tom', 'Scott');
console.log(employee.getFullInfo());

// getters / setters
class Company {
  private departments: string[];

  get departmentNames(): string[] {
    return this.departments;
  }

  set departmentNames(names: string[]) {
    if (names.length === 0) {
      throw new Error('Invalid argument');
    }

    this.departments.push(...names);
  }

  constructor(departments: string[]) {
    this.departments = departments;
  }
}

const company = new Company([]);
company.departmentNames = ['Logistics'];

console.log(company.departmentNames);
// company.departmentNames = []; - throws error

// static properties and methods
Math.PI; // JS

class DepartmentNames {
  static readonly Logistics = 'LOGISTICS';
  static readonly Sales = 'SALES';
  static readonly Engineering = 'ENGINEERING';
}

console.log(DepartmentNames.Engineering);

class ConsoleLogger {
  static log(text: string) {
    console.log(text);
  }
}

ConsoleLogger.log('Log this!');
