// built in
const names: Array<string> = ['Bob', 'Tom'];

// generic functions: extends - constraint
function merge<T extends object, U extends object>(objA: T, objB: U) {
  return { ...objA, ...objB };
}

const merged = merge({ name: 'Tom' }, { age: 30 });
console.log(merged.name);

// keyof
function extractAndConvert<T extends object, U extends keyof T>(
  obj: T,
  key: U
) {
  return 'Value: ' + obj[key];
}

console.log(extractAndConvert({ name: 'Bob' }, 'name'));

// classes
class DataStorage<T> {
  private data: Array<T>;

  constructor(data: Array<T>) {
    this.data = data;
  }

  add(item: T) {
    this.data.push(item);
  }

  remove(item: T) {
    if (this.data.indexOf(item) === -1) {
      return;
    }
    this.data.splice(this.data.indexOf(item), 1);
  }

  getAll() {
    return this.data;
  }
}

const stringStorage = new DataStorage<string>([]);
const storage = new DataStorage([123, 124]);
storage.add(125);
storage.remove(123);

console.log(storage.getAll());

// built-in utility generics

// Partial - make all object properties optional, allowing empty object initiation
interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

function createCourseGoal(
  title: string,
  description: string,
  completeUntil: Date
): CourseGoal {
  let goal: Partial<CourseGoal> = {}; // initiate with no properties, promising TS that eventually those will be populating
  goal.title = title ?? 'Title';
  goal.description = description ?? 'Description';
  goal.completeUntil = completeUntil;

  return goal as CourseGoal;
}

// Readonly
const namesArray: Readonly<string[]> = ['Bob', 'Tom'];
// namesArray.push(); yells at you
