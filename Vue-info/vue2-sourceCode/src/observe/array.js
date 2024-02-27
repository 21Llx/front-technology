let oldArrayProto = Array.prototype
// Object.create将数组原型放到 newArrayProto.__proto__上
export let newArrayProto = Object.create(oldArrayProto) //获取数组原型 赋值给新原型
let methods = [  //会修改原数组的方法
  'push',
  'pop',
  'shift',
  'unshift',
  'reverse',
  'sort',
  'splice',
]

methods.forEach(method=>{
  // 重写数组方法
  newArrayProto[method] = function(...args){
    // 内部调用原数组方法（函数劫持）
    const result = oldArrayProto[method].call(this,...args)
    let inserted
    let ob = this.__ob__
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args
        break;
      case 'splice':
        inserted = args.slice(2)
      default:
        break;
    }
    if(inserted){
      ob.observeArray(inserted)
    }
    ob.dep.notify()
    return result
  }
})