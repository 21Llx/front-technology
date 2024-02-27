import Dep, { popTarget, pushTarget } from "./dep";

let id = 0;
class Watcher {
  constructor(vm,exprOrFn,options,cb) {
    this.id = id++;
    this.renderWatcher = options
    if(typeof exprOrFn==="string"){
      console.log(exprOrFn)
      this.getter = function(){
        return vm[exprOrFn]
      }
    }else{
      this.getter = exprOrFn
    }
    
    this.deps = []
    this.depsId = new Set()
    this.lazy = options.lazy
    this.dirty = this.lazy
    this.cb = cb
    this.user = options.user //判断是否是用户自己的watch
    this.vm = vm
    this.value = this.lazy ? undefined : this.get()
  } 
  get(){
    pushTarget(this)
    let value = this.getter.call(this.vm)
    popTarget()
    return value
  }
  evulate(){
    this.value = this.get()
    this.dirty = false
  }
  depend(){
    let i = this.deps.length
    while(i--){
      this.deps[i].depend()
    }
  }
  addDep(dep){
    let id = dep.id
    if(!this.depsId.has(id)){
      this.deps.push(dep)
      this.depsId.add(id)
      dep.addSub(this)
    }
  }
  update(){
    if(this.lazy){
      this.dirty = true
    }else{
      queueWatcher(this)  //把watcher存起来 用异步的方式去执行更新
    }
    
  }
  run(){
    let oldValue = this.value
    let newValue = this.get()
    if(this.user){
      this.cb.call(this.vm,newValue,oldValue)
    }
  }
}

function flushSchedulerQueue(){
  let flushQueue = queue.slice(0)
  flushQueue.forEach(q=>q.run())
  queue = []
  has = {}
  pending = false
}
let queue = []
let has = {}
let pending = false

function queueWatcher(watcher){
  const id = watcher.id
  if(!has[id]){
    queue.push(watcher)
    has[id] = true
    if(!pending){
      //批处理，在最后异步调用刷新
      nextTick(flushSchedulerQueue,0)
      pending = true
    }
  }
}
function flushCallbacks(){
  waiting = false
  let cbs = callbacks.slice(0)
  callbacks = []
  cbs.forEach(cb=>cb())
}
let callbacks = []
let waiting = false
// nextTick 没有直接使用某个api 而是采用优雅降级的方式 
// 内部先采用的是promise （ie不兼容）  MutationObserver(h5的api)  可以考虑ie专享的 setImmediate  setTimeout

// let timerFunc;
// if (Promise) {
//     timerFunc = () => {
//         Promise.resolve().then(flushCallbacks)
//     }
// }else if(MutationObserver){
//     let observer = new MutationObserver(flushCallbacks); // 这里传入的回调是异步执行的
//     let textNode = document.createTextNode(1);
//     observer.observe(textNode,{
//         characterData:true
//     });
//     timerFunc = () => {
//         textNode.textContent = 2;
//     }
// }else if(setImmediate){
//     timerFunc = () => {
//        setImmediate(flushCallbacks);
//     }
// }else{
//     timerFunc = () => {
//         setTimeout(flushCallbacks);
//      }
// }
export function nextTick(cb) { // 先内部还是先用户的？
    callbacks.push(cb); // 维护nextTick中的cakllback方法
    if (!waiting) {
        // timerFunc()
        Promise.resolve().then(flushCallbacks)
        waiting = true
    }
}
export default Watcher