let obj = {
  a: 1,
  b: 2,
};

//---------- call
Function.prototype.myCall = function (obj, ...args) {
  let thisObj = obj ? Object(obj) : {};
  thisObj.fn = this;
  let result = thisObj.fn(...args);
  delete thisObj.fn;
  return result;
};
function fn(x, y, z) {
  console.log(this.a);
  console.log(x, y, z);
}
// fn.myCall(obj,4,5,6);

//----------apply
Function.prototype.myApply = function (obj, argArr) {
  let thisObj = obj ? Object(obj) : {};
  thisObj.fn = this;
  let result = thisObj.fn(...argArr);
  delete thisObj.fn;
  return result;
};
function fn2(x, y, z) {
  console.log(this.a);
  console.log(x, y, z);
}
// fn2.myApply(obj,[4,5,6]);

//----------bind
Function.prototype.myBind = function (obj, ...argArr) {
  let thisObj = obj ? Object(obj) : {};
  let fn = this;
  return function (...args) {
    thisObj.fn = fn;
    let result = thisObj.fn(...args.concat(argArr));
    delete thisObj.fn;
    return result;
  };
};
function fn3(x, y, z) {
  console.log(this.a);
  console.log(x, y, z);
}
let bindFn = fn3.myBind(obj, 4, 5, 6);
// bindFn();
