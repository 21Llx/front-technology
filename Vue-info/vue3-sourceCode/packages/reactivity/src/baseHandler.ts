import {
  hasChange,
  hasOwn,
  isArray,
  isInt,
  isObject,
} from "@vue/shared";
import { reactive, readonly } from "./reactive";
import { track, trigger,ITERATE_KEY } from "./effect";
import { TrackOptypes, TriggerOrTypes } from "./operator";

function createGetter(isReadonly = false, shallow = false) {
  return function get(target, key, receiver) {
    const res = Reflect.get(target, key, receiver);
    if (!isReadonly) {
      track(target, TrackOptypes.GET, key);
    }

    if (shallow) {
      return res;
    }
    if (isObject(res)) {
      return isReadonly ? readonly(res) : reactive(res);
    }
    return res;
  };
}
function createSetter(Shallow = false) {
  return function set(target, key, value, receiver) {
    const oldValue = target[key];
    let hasKey =
      isArray(target) && isInt(key)
        ? Number(key) < target.length
        : hasOwn(target, key);

    const res = Reflect.set(target, key, value, receiver);
    if (!hasKey) {
      // 新增
      trigger(target, TriggerOrTypes.ADD, key, value);
    } else if (hasChange(oldValue, value)) {
      // 修改
      trigger(target, TriggerOrTypes.SET, key, value, oldValue);
    }
    return res;
  };
}
function ownKeys(target){
  track(target, TrackOptypes.GET, ITERATE_KEY);
  return Reflect.ownKeys(target)
}
const get = createGetter();
const shallowGet = createGetter(false, true);
const readonlywGet = createGetter(true, false);
const shallowReadonlyGet = createGetter(true, true);

export const reactiveHanders = {
  get,
  set: createSetter(),
  ownKeys
};
export const shallowReactiveHanders = {
  get: shallowGet,
  set: createSetter(true),
};
export const readonlyHanders = {
  get: readonlywGet,
  set: () => {
    console.log("error");
  },
};
export const shallowReadonlyHanders = {
  get: shallowReadonlyGet,
  set: () => {
    console.log("error");
  },
};
