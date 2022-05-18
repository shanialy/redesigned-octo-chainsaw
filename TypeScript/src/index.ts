//Types
let id: number = 1;
let names: string = "shani";
let isMale: boolean = true;
let num: any = "03323786747";
num = 3;

//array

let arr: number[] = [1, 2, 3];
arr.push(4);
let arr1: any[] = [1, "two"];

//tuple
let person: [number, string, boolean] = [1, "shani", true];
//Tuple Array
let employee: [number, string][];
employee = [
  [1, "shani"],
  [2, "ahsan"],
];

//Unions  working as or
let pid: string | number = 22;

//Enum
enum Direction1 {
  up = 1,
  down,
  left,
  right,
}

enum Direction2 {
  up = "Up",
  down = "down",
  left = "left",
  right = "right",
}

// console.log(Direction2.left);

//Objects
const user: {
  id: number;
  name: string;
} = {
  id: 1,
  name: "shani",
};
//otherWay
type User = {
  id: number;
  name: string;
};
const user2: User = {
  id: 1,
  name: "shani",
};

//type Assertion
let cid: any = 1;
// let cusId = <number>cid
let cusId = cid as number;

//Function with return
function add(x: number, y: number): number {
  return x + y;
}

console.log(add(1, 9));
//function void return
function log(msg: string | number): void {
  console.log(msg);
}
log("hey");

//Interfaces
interface UserInterface {
  id: number;
  name: string;
  age?: number;
}
const user3: UserInterface = {
  id: 10,
  name: "shani",
};

// type point = number | string;
// const p1: point = 1;

interface MathFunc {
  (x: number, y: number): number;
}
const addition: MathFunc = (x: number, y: number): number => x + y;
const subtraction: MathFunc = (x: number, y: number): number => x - y;
const multiplication: MathFunc = (x: number, y: number): number => x * y;

//Classes
class Per {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  register() {
    return `${this.name} is now registered`;
  }
}
const shani = new Per(1, "shani");
// console.log(shani.register())
// console.log(shani)

interface PerInterface {
  id: number;
  name: string;
  register(): string;
}

class Personclass implements PerInterface {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  register() {
    return `${this.name} is now registered`;
  }
}
const ahsan = new Per(1, "ahsan");

//Generics
function getArr<T>(items: T[]): T[] {
  return new Array().concat(items);
}

let numArray = getArr<number>([1, 2, 3, 4]);
let strArray = getArr<string>(["a", "b", "c", "d"]);

strArray.push("hello");
console.log(numArray, strArray);
