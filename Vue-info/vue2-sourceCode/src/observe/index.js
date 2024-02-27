import { newArrayProto } from "./array";
import Dep from "./dep";

class Observe {
  constructor(data) {

    // 给每个对象都增加收集功能
    this.dep = new Dep()

    Object.defineProperty(data,'__ob__',{
      value: this,
      enumerable: false,
    })
    if (Array.isArray(data)) {
      //重写数组的7个方法，保留原数组的特性，重写部分内容
      data.__proto__ = newArrayProto;
      
      this.observeArray(data);
    } else {
      this.walk(data);
    }
  }
  walk(data) {
    // 重新定义属性
    Object.keys(data).forEach((key) => defineReactive(data, key, data[key]));
  }
  observeArray(data) {
    data.forEach((item) => observe(item));
  } 
}
function dependArray(value){
  for(let i=0;i<value.length;i++){
    let current = value[i]
    current.__ob__?.dep.depend()
    if(Array.isArray(current)){
      dependArray(current)
    }
  }
}
//重新定义属性
function defineReactive(target, key, value) {
  let childOb = observe(value); //对属性值是对象的进行深度劫持
  let dep = new Dep()
  Object.defineProperty(target, key, {
    get() {
      if(Dep.target){
        dep.depend() //这个属性收集器记住当前watcher
        if(childOb){
          childOb.dep.depend()  
          if(Array.isArray(value)){
            dependArray(value)
          }
        }
      }
      return value;
    },
    set(newValue) {
      if (newValue == value) {
        return;
      }
      value = newValue;
      dep.notify()
    },
  });
}
export function observe(data) {
  if (typeof data !== "object" || data == null) {
    return; //只劫持对象
  }
  if(data.__ob__ instanceof Observe){
    return data.__ob__
  }
  // 一个对象只劫持一次
  return new Observe(data);
}
