// interfaces
interface PersonInterface {
  readonly firstName: string; // can use readonly
  readonly lastName: string;
  readonly middleName?: string; // ? - optional
  readonly age: number;

  // optional argument: intro
  greet(phrase: string, intro?: string): void;
}

let user: PersonInterface;

user = {
  firstName: 'Bob',
  lastName: 'Marley',
  age: 36,
  greet(phrase: string) {
    console.log(`${phrase}. My name is ${this.firstName}`);
  },
};

user.greet('Hi there!');

// interface as function arguments
function printPerson(person: PersonInterface) {
  console.log(
    `Hi! My name is ${person.firstName}, I am ${person.age} years old.`
  );
}

printPerson(user);

// using with classes
interface Logger {
  log(text: string): void; // can have no implementation
}

class FileLogger implements Logger {
  log(text: string): void {
    console.log(`Log into a file: ${text}`);
  }
}

class CloudLogger implements Logger {
  log(text: string): void {
    console.log(`Log into cloud: ${text}`);
  }
}

let logger: Logger;

logger = new FileLogger();
logger.log('First log');

logger = new CloudLogger();
logger.log('Second log');

// multiple implementation
interface IWriteFiles {
  write(): void;
}

interface IReadFiles {
  read(): string;
}

class FileProcessor implements IWriteFiles, IReadFiles {
  write(): void {
    throw new Error('Method not implemented.');
  }

  read(): string {
    throw new Error('Method not implemented.');
  }
}

// multiple inheritance
interface FileProcessorInterface extends IReadFiles, IWriteFiles {}

// interface as a function type
interface AddFunction {
  (a: number, b: number): number;
}

let func: AddFunction;
func = (a: number, b: number) => a + b;
