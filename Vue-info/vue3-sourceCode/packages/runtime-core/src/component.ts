import { ShapeFlags, isFunction, isObject } from "@vue/shared";
import { PublicInstanceProxyHandlers } from "./componentInstancePublic";

export function createComponentInstance(vnode) {
  const instance = {
    vnode,
    type: vnode.type,
    props: {a:1},
    attrs: {},
    slots: {},
    data:{c:3},
    setupState: {b:2},
    ctx: {},
    render: null,
    isMounted: false,
  };
  instance.ctx = { _: instance };
  return instance;
}

export function setupComponent(instance) {
  const { props, children } = instance.vnode;
  instance.props = props;
  instance.children = children;
  
  let isStateFul = instance.vnode.shapeFlag & ShapeFlags.STATEFUL_COMPONENT;
  if (isStateFul) {
    setupStatefulComponent(instance);
  }
}
export let currentInstance = null
export const setCurrentInstance = (instance)=>{
  currentInstance = instance
}
export const getCurrentInstance = ()=>{
  return currentInstance
}
function setupStatefulComponent(instance) {
  // 1. 代理，传递给render函数的参数
  instance.proxy = new Proxy(instance.ctx,PublicInstanceProxyHandlers as any)
  // 2. 获取组件类型，拿到setup方法
  let Component = instance.type;
  let { setup } = Component;
  if(setup){
    currentInstance = instance
    let setupContext = createSetupContext(instance);
    const setupResult =  setup(instance.props,setupContext);
    currentInstance = null
    handleSetupResult(instance,setupResult)
  }else{
    finishComponentSetup(instance)
  }
  
  //Component.render(instance.proxy)
}
function handleSetupResult(instance,setupResult){
  if(isFunction(setupResult)){
    instance.render = setupResult
  }else if(isObject(setupResult)){
    instance.setupState = setupResult
  }
  finishComponentSetup(instance)
}
function finishComponentSetup(instance){
  let Component = instance.type;
  let { render } = instance;
  if(!render){
    if(!Component.render && Component.template){
      // 进行模板编译 赋值给 Component.render
    }
    instance.render = Component.render
  }
}
function createSetupContext(instance) {
  return {

    attrs: instance.attrs,
    slots: instance.slots,
    emit: () => {},
    expos: () => {},
  };
}
