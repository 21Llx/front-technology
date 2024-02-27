
function fn(pt:Pt={x:1,y:"2"}):number{
  return pt.x
}
type Pt = {
  x:number,
  y?:string
}
1
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