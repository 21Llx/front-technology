import { ShapeFlags, isArray, isObject, isString } from "@vue/shared";
/**
 *
 * @param type  根据type来区分类型
 * @param props
 * @param children
 */
export function createVode(type, props, children = null) {
  // 给虚拟节点加类型
  const shapeFlag = isString(type)
    ? ShapeFlags.ELEMENT
    : isObject(type)
    ? ShapeFlags.STATEFUL_COMPONENT
    : 0;
  const vnode = {
    _v_isVnode: true,
    type,
    props,
    children,
    el: null,
    component: null,
    key: props && props.key,
    shapeFlag,
  };
  normalizeChildren(vnode,children)
  return vnode
}
export function isVnode(vnode){
  return vnode._v_isVnode
}
function normalizeChildren(vnode,children){
  let type = 0
  if(children == null){

  }else if(isArray(children)){
    type = ShapeFlags.ARRAY_CHILDREN
  }else{
    type = ShapeFlags.TEXT_CHILDREN
  }
  vnode.shapeFlag = vnode.shapeFlag | type
}
export const TEXT = Symbol("Text")
export function normalizeVnode(child){
  if(isObject(child)){
    return child
  }
  return createVode(TEXT,null,String(child))
}