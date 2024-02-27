import { effect } from '@vue/reactivity';
/**
 * 1. 先获取监听值 生成get函数
 * 2. 生成一个 effect
 * 3. effect 用自己定义的 scheduler去执行
 */

import { isFunction } from "@vue/shared"


export const watch = (source,cb)=>{
  return doWatch(source,cb)
}

function doWatch(source,cb){
  let getter = ()=>{
    return isFunction(source)? source():source
  }
  let oldValue = getter()
  let scheduler = ()=>{
    let newValue = getter()
    cb(oldValue,newValue)
    oldValue = newValue
  }
  const watchEffect =  effect(getter,{
    scheduler
  })
}