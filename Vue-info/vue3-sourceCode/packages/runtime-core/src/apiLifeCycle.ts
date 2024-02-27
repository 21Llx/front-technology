import { currentInstance, setCurrentInstance } from "./component"

const enum LifeCycleHooks {
  BEFOR_MOUNt = "bm",
  MOUNTED = "m",
  BEFORE_UPDATE = "bu",
  UPDATED = "u"
}

const injeckHook = (type,hook,target)=>{
  if(!target){
    return console.log("err")
  }else{
    const hooks = target[type] || (target[type]=[])
    const wrap = ()=>{
      setCurrentInstance(target)
      hook.call(target)
      setCurrentInstance(null)

    }
    hooks.push(wrap)
  }
}

const createHook = (lifyCycle)=>{
  return  (hook,target = currentInstance)=>{
    injeckHook(lifyCycle,hook,target)
  }
}
export const invokeArrayFns = (fns)=>{
  for(let i=0;i<fns.length;i++){
    fns[i]()
  }
}
export const onBeforeMount = createHook(LifeCycleHooks.BEFOR_MOUNt)
export const onMounted = createHook(LifeCycleHooks.MOUNTED)
export const onBeforeUpdate = createHook(LifeCycleHooks.BEFORE_UPDATE)
export const onUpdated = createHook(LifeCycleHooks.UPDATED)