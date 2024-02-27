import { isArray, isObject } from "@vue/shared";
import { createVode, isVnode } from "./vnode";
/**
 *
 * @param type
 * @param propsOrChildren
 * @param children  儿子节点要么是字符串 要么是数组
 * @returns
 */
export function h(type, propsOrChildren, children) {
  const l = arguments.length;
  if (l == 2) {
    //类型+属性   类型+孩子
    if (isObject(propsOrChildren) && !isArray(propsOrChildren)) {
      if (isVnode(propsOrChildren)) {
        return createVode(type, null, [propsOrChildren]);
      }
      return createVode(type, propsOrChildren);
    } else {
      return createVode(type, null, propsOrChildren);
    }
  } else {
    if (l > 3) {
      children = Array.prototype.slice.call(arguments, 2);
    } else if (l == 3 && isVnode(children)) {
      children = [children];
    }
    return createVode(type, propsOrChildren, children);
  }
}
