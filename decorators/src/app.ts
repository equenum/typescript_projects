// logging decorator
function Logger(constructor: Function) {
  console.log('Logging');
  console.log(constructor);
}

@Logger // attaches to the constructor and gets executed right before it
class Person {
  firstName = 'Bob';

  constructor() {
    console.log('Hi from Person constructor');
  }
}

const person = new Person();
console.log(person);

// decorator factory: allows for arguments to configure decorators
function LoggerFactory(message: string) {
  // the decorator itself
  return function (constructor: Function) {
    console.log(message);
    console.log(constructor);
  };
}

@LoggerFactory('Logging...')
class Company {
  companyName = 'ABC';

  constructor() {
    console.log('Hi from Company constructor');
  }
}

// html element decorators
function WithInnerHtml(innerHtml: string, hookId: string) {
  return function (constructor: any) {
    const element = document.getElementById(hookId);
    const constr = new constructor();
    if (element) {
      element.innerHTML = innerHtml;
      element.querySelector('h1')!.textContent = constr.brand;
    }
  };
}

// decorators are executed bottom up
@LoggerFactory('Logging car...') // executes second
@WithInnerHtml('<h1>HTML DECORATOR HERE</h1>', 'divElement') // executes first
class Car {
  readonly brand = 'Toyota';

  constructor() {
    console.log('Hi from Car constructor');
  }
}

const car = new Car();

// property decorators
function LogDecorator(target: any, propertyName: string | Symbol) {
  console.log('Property decorator here:');
  console.log(target, propertyName);
}

// accessor decorator
function LogDecorator2(
  target: any,
  name: string,
  descriptor: PropertyDescriptor
) {
  console.log('Accessor decorator here:');
  console.log(target, name, descriptor);
}

// method decorator
function LogDecorator3(
  target: any,
  name: string,
  descriptor: PropertyDescriptor
) {
  console.log('Method decorator here:');
  console.log(target, name, descriptor);
}

// method argument decorator
function LogDecorator4(
  target: any,
  methodName: string | Symbol,
  position: number
) {
  console.log('Method argument decorator here:');
  console.log(target, methodName, position);
}

class Product {
  @LogDecorator
  readonly title: string;
  private _price: number;

  @LogDecorator2
  set price(value: number) {
    if (this._price > 0) {
      this._price = value;
    }
  }

  constructor(title: string, price: number) {
    this.title = title;
    this._price = price;
  }

  @LogDecorator3
  getPriceWithTaxes(@LogDecorator4 taxAmount: number) {
    return this._price + taxAmount;
  }
}

const product = new Product('Laptop', 1000);

// decorator execution:
//  they are executed when a class in defined in JS
//  they are executed even without the class being instantiated and only runs once per instantiation
//  they are not like events

// decorators that replace the original constructor functions
// only executes when the original constructor is executed
function WithNewConstructor() {
  return function <T extends { new (...args: any[]): { color: string } }>(
    originalConstructor: T
  ) {
    return class extends originalConstructor {
      // new class definition
      constructor(...args: any[]) {
        // new constructor logic
        super();
        console.log(
          'Extending the original constructor of type: ' +
            typeof originalConstructor
        );
      }
    };
  };
}

@WithNewConstructor()
class DesignElement {
  color = 'Red';
}

// WithNewConstructor only gets executed if we create an object
const design = new DesignElement();

// autobind decorators
class Printer {
  message = 'Printing';

  print() {
    console.log(this.message);
  }
}

const printer = new Printer();

const button = document.getElementById('button')!;

// have to use bind so that printer.print refers to the printer instance and not the event listener
button.addEventListener('click', printer.print.bind(printer));

// same but with an autobind decorator

function Autobind(_: any, _2: string | Symbol, descriptor: PropertyDescriptor) {
  // make sure `this` on Print method always points to the instance
  const originalDescriptor = descriptor.value;
  const updatedDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      // this getter will be called by the consumer when calling a method
      const boundFunc = originalDescriptor.bind(this); // always bind to the original instance method
      return boundFunc;
    }
  };

  return updatedDescriptor;
}

class PrinterWithAutoBind {
  message = 'Printing with autobind';

  @Autobind
  print() {
    console.log(this.message);
  }
}

const boundPrinter = new PrinterWithAutoBind();
const button2 = document.getElementById('button')!;
button.addEventListener('click', boundPrinter.print); // no need to use `bind`
