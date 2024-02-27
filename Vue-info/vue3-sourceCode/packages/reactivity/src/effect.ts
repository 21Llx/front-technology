import { isArray, isInt } from "@vue/shared";
import { TriggerOrTypes } from "./operator";
export function effect(fn, options: any = {}) {
  const effect = createReactiveEffect(fn, options);
  if (!options.lazy) {
    effect();
  }
  return effect;
}
let uid = 0;
let activeEffect;
let effectStack = [];
export const ITERATE_KEY = Symbol("iterate")
export const MAP_KEY_ITERATE_KEY = Symbol("Map key iterate")

function createReactiveEffect(fn, options) {
  const effect = function reactiveEffect() {
    if (!effectStack.includes(effect)) {
      try {
        effectStack.push(effect);
        activeEffect = effect;
        return fn();
      } finally {
        effectStack.pop();
        activeEffect = effectStack[effectStack.length - 1];
      }
    }
  };
  effect.id = uid++;
  effect._isEffect = true; //用于标识是响应式
  effect.raw = fn;
  effect.options = options;
  return effect;
}
const targeMap = new WeakMap();
//收集依赖
export function track(target, type, key) {
  if (!activeEffect) {
    return;
  }
  let depsMap = targeMap.get(target);
  if (!depsMap) {
    depsMap = new Map();
    targeMap.set(target, depsMap);
  }
  let dep = depsMap.get(key);
  if (!dep) {
    dep = new Set();
    depsMap.set(key, dep);
  }
  if (!dep.has(activeEffect)) {
    dep.add(activeEffect);
  }
}
//执行依赖
export function trigger(target, type, key?, value?, oldValue?) {
  const depsMap = targeMap.get(target);
  if (!depsMap) return; //如果没收集过 就不进行操作
  const effects = new Set();
  const add = function (effectToAdd) {
    if (effectToAdd) {
      effectToAdd.forEach((item) => effects.add(item));
    }
  };
  if (key == "length" && isArray(target)) {
    depsMap.forEach((dep, depKey) => {
      if (depKey == "length" || depKey > value) {
        add(dep);
      }
    });
  } else {
    if (key !== undefined) {
      add(depsMap.get(key));
    }

    switch (type) {
      case TriggerOrTypes.ADD:
        if(!isArray(target)){
          add(depsMap.get(ITERATE_KEY))
        }else if(isInt(key)){
          add(depsMap.get("length"));
        }

    }
  }
  effects.forEach((effect: any) => {
    if(effect.options.scheduler){
      effect.options.scheduler(effect)
    }else{
      effect()
    }
  });
}
