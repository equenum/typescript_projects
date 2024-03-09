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
  if (vehicle instanceof Car) {
    vehicle.ride();
  }

  if (vehicle instanceof Truck) {
    vehicle.ride();
    vehicle.load(1000);
  }
}

useVehicle(car);
useVehicle(truck);
