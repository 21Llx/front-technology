import { isSameVnode } from "./index.js";

function createComponent(vnode){
  let i = vnode.data
  if((i = i.hook) && (i = i.init)){
    i(vnode)
  }
  if(vnode.componentInstance){
    return true
  }
}

export function createElm(vnode) {
  let { tag, data, children, text } = vnode;
  if (typeof tag == "string") {

    // 判断是元素还是组件
    if(createComponent(vnode)){
      return vnode.componentInstance.$el
    }

    vnode.el = document.createElement(tag);
    patchProps(vnode.el, {}, data);
    children.forEach((child) => {
      vnode.el.appendChild(createElm(child));
    });
  } else {
    vnode.el = document.createTextNode(text);
  }
  return vnode.el;
}
export function patchProps(el, oldProps = {}, props = {}) {
  let oldStyle = oldProps?.style || {};
  let newStyle = props?.style || {};
  for (let key in oldStyle) {
    if (!newStyle[key]) {
      el.style[key] = "";
    }
  }
  for (let key in oldProps) {
    if (!props[key]) {
      el.removeAttribute(key);
    }
  }
  for (let key in props) {
    if (key == "style") {
      for (let styleName in props.style) {
        el.style[styleName] = props.style[styleName];
      }
    } else {
      el.setAttribute(key, props[key]);
    }
  }
}
// 生成真实dom
export function patch(oldVNode, vnode) {
  if(!oldVNode){
    return createElm(vnode);
  }
  const isRealElement = oldVNode.nodeType;
  if (isRealElement) {
    const elm = oldVNode; //获取真实元素
    const parentElm = elm.parentNode; // 获取父元素
    let newElm = createElm(vnode);
    parentElm.insertBefore(newElm, elm.nextSibling);
    parentElm.removeChild(elm);
    return newElm;
  } else {
    /**  diff
     * 1.两个节点不是同一个 不需要比较 直接替换
     * 2.两个节点是同一个节点 (判断节点的tag和 节点的key)  比较两个节点的属性是否有差异 （复用老的节点，将差异的属性更新）
     * 3.节点比较完毕后就需要比较两人的儿子
     */
    return patchVnode(oldVNode, vnode);
  }
}

function patchVnode(oldVNode, vnode) {
  if (!isSameVnode(oldVNode, vnode)) {
    let el = createElm(vnode);
    oldVNode.el.parentNode.replaceChild(el, oldVNode.el);
    return el;
  }

  // 文本的情况  文本我们期望比较一下文本的内容
  let el = (vnode.el = oldVNode.el); // 复用老节点的元素
  if (!oldVNode.tag) {
    // 是文本
    if (oldVNode.text !== vnode.text) {
      el.textContent = vnode.text; // 用新的文本覆盖掉老的
    }
  }
  patchProps(el, oldVNode.data, vnode.data);
  let oldChildren = oldVNode.children || [];
  let newChildren = vnode.children || [];
  
  if (oldChildren.length > 0 && newChildren.length > 0) {
    updateChildren(el, oldChildren, newChildren);
  } else if (newChildren.length > 0) {
    mountChildren(el, newChildren);
  } else if (oldChildren.length > 0) {
    el.innerHTML = "";
  }

  return el;
}

function mountChildren(el, newChildren) {
  for (let i = 0; i < newChildren.length; i++) {
    let child = newChildren[i];
    el.appendChild(createElm(child));
  }
}

function updateChildren(el, oldChildren, newChildren) {
  // 操作列表 经常会是有  push shift pop unshift reverse sort这些方法  （针对这些情况做一个优化）
  // vue2中采用双指针的方式 比较两个节点
  let oldStartIndex = 0;
  let newStartIndex = 0;

  let oldEndIndex = oldChildren.length - 1;
  let newEndIndex = newChildren.length - 1;

  let oldStartVnode = oldChildren[0];
  let newStartVode = newChildren[0];

  let oldEndVnode = oldChildren[oldEndIndex];
  let newEndVnode = newChildren[newEndIndex];
  function makeIndexByKey(children) {
    let map = {};
    children.forEach((item, index) => {
      map[item.key] = index;
    });
    return map;
  }
  let map = makeIndexByKey(oldChildren);
  // 双方指针有一方 头指针大于尾指针 停止比较
  while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
    if (!oldStartVnode) {
      oldStartVnode = oldChildren[++oldStartIndex];
    } else if (!oldEndVnode) {
      oldEndVnode = oldChildren[--oldEndIndex];
    } else if (isSameVnode(oldStartVnode, newStartVode)) {
      // 两个头是相同的
      patchVnode(oldStartVnode, newStartVode);
      oldStartVnode = oldChildren[++oldStartIndex];
      newStartVode = newChildren[++newStartIndex];
    } else if (isSameVnode(oldEndVnode, newEndVnode)) {
      // 两个尾是相同的
      patchVnode(oldEndVnode, newEndVnode);
      oldEndVnode = oldChildren[--oldEndIndex];
      newEndVnode = newChildren[--newEndIndex];
    } else if (isSameVnode(oldEndVnode, newStartVode)) {
      // 新头和旧尾 相同 头尾比较
      patchVnode(oldEndVnode, newStartVode);
      el.insertBefore(oldEndVnode.el, oldStartVnode.el);
      oldEndVnode = oldChildren[--oldEndIndex];
      newStartVode = newChildren[++newStartIndex];
    } else if (isSameVnode(oldStartVnode, newEndVnode)) {
      // 旧头和新尾相同 头和尾比
      patchVnode(oldStartVnode, newEndVnode);
      el.insertBefore(oldStartVnode.el, oldEndVnode.el.nextSibling);
      oldStartVnode = oldChildren[++oldStartIndex];
      newEndVnode = newChildren[--newEndIndex];
    } else {
      // 乱序比对
      // 根据老的列表做一个映射关系 ，用新的去找，找到则移动，找不到则添加，最后多余的就删除
      let moveInedx = map[newStartVode.key];
      if (moveInedx) {
        let moveVnode = oldChildren[moveInedx];
        el.insertBefore(moveVnode.el, oldStartVnode.el);
        oldChildren[moveInedx] = undefined; //表示节点已被移到
        patchVnode(moveVnode, newStartVode);
      } else {
        el.insertBefore(createElm(newStartVode), oldStartVnode.el);
      }
      newStartVode = newChildren[++newStartIndex];
    }
  }
  //新的多需要插入
  if (newStartIndex <= newEndIndex) {
    for (let i = newStartIndex; i <= newEndIndex; i++) {
      let childEl = createElm(newChildren[i]);
      //  newEndIndex+1 如果有值 则向前插入 如果null 向后插入
      let anchor = newChildren[newEndIndex + 1]
        ? newChildren[newEndIndex + 1].el
        : null;
      el.insertBefore(childEl, anchor);
    }
  }
  // 老的多需要删除
  if (oldStartIndex <= oldEndIndex) {
    for (let i = oldStartIndex; i <= oldEndIndex; i++) {
      if (oldChildren[i]) {
        let childEl = oldChildren[i].el;
        el.removeChild(childEl);
      }
    }
  }
}
