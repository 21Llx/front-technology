export {}  //处理多文件同名冲突
// 基本类型
let num: number = 1;
let str: string = "abc";
let bool: boolean = true
let arry:number[] = [1,3]
let qwe: any = "any"
let obj = {
  
}
// 函数
function fn(a:number,b:string):number{
  return a
}
fn(21,"wqe")
function fn2(obj:{ first: string; last?: string }){

}
fn2({ first: "Bob" });
fn2({ first: "Alice", last: "Alisson" });
function printId(id: number | string) {
  console.log("Your ID is: " + id);
  
}

// 别名
type Point = {
  x: number;
  y: number;
};
function printCoord(pt: Point) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
type ID = number | string;
type UserInputSanitizedString = string;
 
function sanitizeInput(str: string): UserInputSanitizedString {
  return "str"  
}
type Animal2 = {
  name: string
}
type Bear2 = Animal & { 
  honey: boolean 
}
// 接口
interface Point2 {
  x: number;
  y: number;
}
interface Point2 {
  z:string
}
function printCoord2(pt: Point2) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
 
printCoord2({ x: 100, y: 100,z:"qwe" });
interface Animal {
  name: string
}

interface Bear extends Animal {
  honey: boolean
}
// 文字类型
function printText(s: string, alignment: "left" | "right" | "center") {
  // ...
}
printText("Hello, world", "left");
printText("G'day, mate", "center");

function compare(a: string, b: string): -1 | 0 | 1 {
  return a === b ? 0 : a > b ? 1 : -1;
}
// 类型断言
const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;
const myCanvas2 = <HTMLCanvasElement>document.getElementById("main_canvas");

type DescribableFunction = {
  description: string;
  (someArg: number): boolean;
};
function doSomething(fn: DescribableFunction) {
  console.log(fn.description + " returned " + fn(6));
}

// 泛型
function identity<Type>(arg: Type): Type {
  return arg;
}
interface Lengthwise {
  length: number;
}
 
function loggingIdentity<Type extends Lengthwise>(arg: Type): Type {
  console.log(arg.length); // Now we know it has a .length property, so no more error
  return arg;
}

function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
  return obj[key];
}
 
let x = { a: 1, b: 2, c: 3, d: 4 };
 
getProperty(x, "a");
// getProperty(x, "m");

// Clsaa
class User{
  name="user"
  _age = 123
  getUser(){
    console.log(this.name)
  }
  get age(){
    return this.age
  }
  set age(value){
    this._age = value 
  }
}

interface A {
  x: number;
  y?: number;
}
class C implements A {
  
  x = 0;
}
const c = new C();

