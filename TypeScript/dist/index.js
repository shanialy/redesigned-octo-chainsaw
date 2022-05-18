"use strict";
//Types
let id = 5;
let names = "shani";
let isMale = true;
let num = "03323786747";
num = 3;
//array
let arr = [1, 2, 3];
arr.push(4);
let arr1 = [1, "two"];
//tuple
let person = [1, "shani", true];
//Tuple Array
let employee;
employee = [
    [1, "shani"],
    [2, "ahsan"],
];
//Unions  working as or
let pid = 22;
//Enum
var Direction1;
(function (Direction1) {
    Direction1[Direction1["up"] = 1] = "up";
    Direction1[Direction1["down"] = 2] = "down";
    Direction1[Direction1["left"] = 3] = "left";
    Direction1[Direction1["right"] = 4] = "right";
})(Direction1 || (Direction1 = {}));
var Direction2;
(function (Direction2) {
    Direction2["up"] = "Up";
    Direction2["down"] = "down";
    Direction2["left"] = "left";
    Direction2["right"] = "right";
})(Direction2 || (Direction2 = {}));
// console.log(Direction2.left);
//Objects
const user = {
    id: 1,
    name: "shani",
};
const user2 = {
    id: 1,
    name: "shani",
};
//type Assertion
let cid = 1;
// let cusId = <number>cid
let cusId = cid;
//Function with return
function add(x, y) {
    return x + y;
}
console.log(add(1, 9));
//function void return
function log(msg) {
    console.log(msg);
}
log("hey");
const user3 = {
    id: 10,
    name: "shani",
};
const addition = (x, y) => x + y;
const subtraction = (x, y) => x - y;
const multiplication = (x, y) => x * y;
//Classes
class Per {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
    register() {
        return `${this.name} is now registered`;
    }
}
const shani = new Per(1, "shani");
class Personclass {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
    register() {
        return `${this.name} is now registered`;
    }
}
const ahsan = new Per(1, "ahsan");
//Generics
function getArr(items) {
    return new Array().concat(items);
}
let numArray = getArr([1, 2, 3, 4]);
let strArray = getArr(["a", "b", "c", "d"]);
strArray.push("hello");
console.log(numArray, strArray);
