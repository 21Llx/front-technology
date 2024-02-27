import { isObject } from "@vue/shared"
import { reactiveHanders, shallowReactiveHanders, readonlyHanders, shallowReadonlyHanders } from "./baseHandler"

export function reactive(target) {
  return createReactiveObject(target, false, reactiveHanders)
}

export function shallowReactive(target) {
  return createReactiveObject(target, false, shallowReactiveHanders)

}

export function readonly(target) {
  return createReactiveObject(target, true, readonlyHanders)

}

export function shallowReadonly(target) {
  return createReactiveObject(target, true, shallowReadonlyHanders)

}
const reactiveMap = new WeakMap()   //WeakMap 的key 为对象
const readonlyMap = new WeakMap()
export function createReactiveObject(target, isReadOnly, handerls) {
  if (!isObject(target)) {
    return target
  }
  const proxyMap = isReadOnly?readonlyMap: reactiveMap
  const existProxy = proxyMap.get(target)
  if (existProxy) {
    return existProxy
  }

  const proxy = new Proxy(target, handerls)
  proxyMap.set(target, proxy)
  return proxy
}