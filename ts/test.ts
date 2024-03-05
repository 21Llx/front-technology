
function fn(pt:Pt={x:1,y:"2"}):number{
  return pt.x
}
type Pt = {
  x:number,
  y?:string
}

interface Point {
  x: number;
  y: number;
}
interface Point{
  r:string
}
let obj:Point = {x:1,y:2,r:"f"}

let a:number = 1

function fn2<Type>(x:Type,t:1|2|3|'e'):Type{
  return x
}
let a1 = fn2("qwe","e")

function makeDate(timestamp: number): Date;
function makeDate(m: number, d: number): Date;
function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
  if (d !== undefined && y !== undefined) {
    return new Date(y, mOrTimestamp, d);
  } else {
    return new Date(mOrTimestamp);
  }
}

function fn123(q?:number): void;
function fn123() {

}
fn123()

type DescribableFunction = {
  description: string;
  (someArg: number): boolean;
};
function doSomething(fn: DescribableFunction) {
  console.log(fn.description + " returned " + fn(6));
}
 
function myFunc(someArg: number) {
  return someArg > 3;
}
myFunc.description = "default description";
 
doSomething(myFunc);

function firstElement<Type>(arr: Type[]): Type | undefined {
  return arr[0];
}

firstElement([{a:1},{b:2},123])

function multiply(n: number, ...m: number[]) {
  return m.map((x) => n * x);
}

multiply(1,2,123)


interface SquareConfig {
  color?: string;
  width?: number;
  [propName: string]: any;
}
let squ:SquareConfig = {
  a:12,b:2
}

type Point1 = { x: number; y: number };
type P = keyof Point1;

let pp:P ="x"

type Person = { age: number; name: string; alive: boolean };
type I1 = Person["age" | "name"];
let t1:I1 = 123

// Conditional Types