import { ShapeFlags } from "@vue/shared";
import { createAppApi } from "./apiCreateApp";
import { createComponentInstance, setupComponent } from "./component";
import { effect } from "@vue/reactivity";
import { TEXT, normalizeVnode } from "./vnode";
import { queenJob } from "./schedule";
import { invokeArrayFns } from "./apiLifeCycle";

export function createRenderer(renderOptions) {
  const {
    insert: hostInsert,
    remove: hostRemove,
    patchProp: hostPatchProp,
    createElement: hostCreateElement,
    createText: hostCreateText,
    setText: hostSetText,
    setElementText: hostSetElementText,
    nextSibling: hostNextSibling,
  } = renderOptions;
  const setupRenderEffect = (instance, container) => {
    instance.update = effect(
      function componentEffect() {
        if (!instance.isMounted) {
          let proxyTouser = instance.proxy;
          let {bm,m} = instance
          if(bm){
            invokeArrayFns(bm)
          }
          let subTree = (instance.subTree = instance.render.call(
            proxyTouser,
            proxyTouser
          ));
          patch(null, subTree, container);
          instance.isMounted = true;
          if(m){
            invokeArrayFns(m)
          }
        } else {
          const prevTree = instance.subTree;
          let proxyTouser = instance.proxy;
          let {bu,u} = instance
          if(bu){
            invokeArrayFns(bu)

          }
          const nextTree = instance.render.call(proxyTouser, proxyTouser);
          patch(prevTree, nextTree, container);
          if(u){
            invokeArrayFns(u)
          }
        }
      },
      {
        scheduler: queenJob,
      }
    );
  };

  // ----------处理组件
  const processComponent = (n1, n2, container) => {
    if (n1 == null) {
      // 初始化
      mountComponent(n2, container);
    } else {
      // 更新
    }
  };
  const mountComponent = (initialVNode, container) => {
    // 组件渲染流程
    // 1. 创建实例
    const instance = (initialVNode.component =
      createComponentInstance(initialVNode));

    // 2.将需要的数据解析到实例上
    setupComponent(instance);

    // 3.创建一个effect 让render函数执行
    setupRenderEffect(instance, container);
  };
  const patchProp = (oldProps, newProps, el) => {
    if (oldProps != newProps) {
      for (let key in newProps) {
        let prev = oldProps[key];
        let next = newProps[key];
        if (prev != next) {
          hostPatchProp(el, key, prev, next);
        }
      }
      for (let key in oldProps) {
        if (!(key in newProps)) {
          hostPatchProp(el, key, oldProps[key], null);
        }
      }
    }
  };
  const unmountChildren = (children) => {
    children.forEach((child) => {
      unmount(child);
    });
  };
  // diff算法
  const patchKeyChildren = (c1, c2, el) => {
    let i = 0;
    let e1 = c1.length - 1;
    let e2 = c2.length - 1;
    while (i <= e1 && i <= e2) {
      const n1 = c1[i];
      const n2 = c2[i];
      if (isSameVnodeType(n1, n2)) {
        patch(n1, n2, el);
      } else {
        break;
      }
      i++;
    }
    while (i <= e1 && i <= e2) {
      const n1 = c1[e1];
      const n2 = c2[e2];
      if (isSameVnodeType(n1, n2)) {
        patch(n1, n2, el);
      } else {
        break;
      }
      e1--;
      e2--;
    }
    if (i > e1) {
      // 老的少 新的多
      if (i <= e2) {
        while (i <= e2) {
          const nextPos = e2 + 1;
          let achor = nextPos < c2.length ? c2[nextPos].el : null;
          patch(null, c2[i], el, achor);
          i++;
        }
      }
    } else if (i > e2) {
      // 老的多
      while (i <= e1) {
        unmount(c1[i]);
        i++;
      }
    } else {
      // 乱序
      let s1 = i;
      let s2 = i;
      const keyToNewIndexMap = new Map();
      for (let i = s2; i <= e2; i++) {
        const childVNode = c2[i];
        keyToNewIndexMap.set(childVNode.key, i);
      }
      const toBePatch = e2 - s2 + 1;
      const newIndexToOldIndexArr = new Array(toBePatch).fill(0);
      
      for (let i = s1; i <= e1; i++) {
        const oldVNode = c1[i];
        let newIndex = keyToNewIndexMap.get(oldVNode.key);
        if (newIndex === undefined) {
          unmount(oldVNode);
        } else {
          newIndexToOldIndexArr[newIndex - s2] = i + 1;
          patch(oldVNode, c2[newIndex], el);
        }
      }
      let increasingNewIndexSequence = getSequence(newIndexToOldIndexArr)
      let moveJ = increasingNewIndexSequence.length-1
      for (let i = toBePatch - 1; i >= 0; i--) {
        let currentIndex = i + s2;
        let child = c2[currentIndex];
        let anchor =
          currentIndex + 1 < c2.length ? c2[currentIndex + 1].el : null;
        if(newIndexToOldIndexArr[i]==0){  //新元素有，旧的没有
          patch(null,child,el,anchor)
        }else{
          if(i !=increasingNewIndexSequence[moveJ]){  //判断当前索引 是不是最长序列的索引
            hostInsert(child.el,el,anchor)
          }else{
            moveJ--
          }
          
        }
      }
    }
  };
  function getSequence(arr) {  //获取最长地址序列   贪心+二分
    const len = arr.length;
    const result = [0];  //索引数组
    const p = arr.slice(0);
    let start;
    let end;
    let middle;
    for (let i = 0; i < len; i++) {
      const arrI = arr[i];
      if (arrI != 0) {
        let resultIndex = result[result.length - 1];
        if (arrI > arr[resultIndex]) {  //当前项比最长序列最后一项大
          p[i] = resultIndex;  //记录当前项的上一项索引
          result.push(i);
          continue;
        }
        // 二分法
        start = 0;
        end = result.length - 1;
        while (start < end) {  //获取当前项在最长序列的位置并替换
          middle = ((start + end) / 2) | 0;
          if (arr[result[middle]] < arrI) {
            start = middle + 1;
          } else {
            end = middle;
          }
        }
        if (arr[result[start]] > arrI) {
          if (start > 0) {
            p[i] = result[start - 1];  //记录当前项的上一项索引
          }
          result[start] = i;
        }
      }
    }
    let len1 = result.length;
    let last = result[len1 - 1];
    while (len1-- > 0) {  //从后往前 根据上一项索引获取正确的最长序列索引
      result[len1] = last; 
      last = p[last];
    }
    return result;
  }
  const patchChildren = (n1, n2, el) => {
    let c1 = n1.children;
    let c2 = n2.children;
    const prevShapeFlag = n1.shapeFlag;
    const shapeFlag = n2.shapeFlag;
    if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
      // 新的是文本
      if (c2 != c1) {
        // 老的是 数组 新的是文本
        if (prevShapeFlag & ShapeFlags.ARRAY_CHILDREN) {
          unmountChildren(c2);
        }
        hostSetElementText(el, c2);
      }
    } else {
      // 当前是元素
      if (prevShapeFlag & ShapeFlags.ARRAY_CHILDREN) {
        if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
          // 当前和之前都是数组
          // 数组比较 -》 diff算法
          patchKeyChildren(c1, c2, el);
        } else {
          // 没有孩子
          unmountChildren(c1);
        }
      } else {
        if (prevShapeFlag & ShapeFlags.TEXT_CHILDREN) {
          //上一次是文本
          hostSetElementText(el, "");
        }
        if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
          mountedChildren(c2, el);
        }
      }
    }
  };
  // 元素是相同节点的情况
  const patchElement = (n1, n2, container) => {
    let el = (n2.el = n1.el);
    const oldProps = n1.props || {};
    const newProps = n2.props || {};
    patchProp(oldProps, newProps, el);
    patchChildren(n1, n2, el);
  };
  // -----------------处理元素
  const processElement = (n1, n2, container, anchor) => {
    if (n1 == null) {
      mountedElement(n2, container, anchor);
    } else {
      patchElement(n1, n2, container);
    }
  };
  const mountedElement = (vnode, container, anchor = null) => {
    const { props, shapeFlag, type, children } = vnode;
    let el = (vnode.el = hostCreateElement(type));
    if (props) {
      for (const key in props) {
        hostPatchProp(el, key, null, props[key]);
      }
    }
    if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
      hostSetElementText(el, children);
    } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
      mountedChildren(children, el);
    }
    hostInsert(el, container, anchor);
  };
  const mountedChildren = (children, el) => {
    for (let i = 0; i < children.length; i++) {
      let child = normalizeVnode(children[i]);
      patch(null, child, el);
    }
  };
  // ------处理文本
  const processText = (n1, n2, container) => {
    if (n1 == null) {
      hostInsert((n2.el = hostCreateText(n2.children)), container);
    }
  };
  // 判断节点是否相同
  const isSameVnodeType = (n1, n2) => {
    return n1.type == n2.type && n1.key == n2.key;
  };
  const unmount = (n1) => {
    hostRemove(n1.el);
  };
  // 处理节点
  const patch = (n1, n2, container, anchor = null) => {
    const { shapeFlag, type } = n2;

    if (n1 && !isSameVnodeType(n1, n2)) {
      anchor = hostNextSibling(n1.el);
      unmount(n1);
      n1 = null;
    }
    switch (type) {
      case TEXT:
        processText(n1, n2, container);
        break;
      default:
        if (shapeFlag & ShapeFlags.ELEMENT) {
          // 元素
          processElement(n1, n2, container, anchor);
        } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
          //组件
          processComponent(n1, n2, container);
        }
        break;
    }
  };
  const render = (vnode, container) => {
    // 默认调用，初始化
    patch(null, vnode, container);
  };
  return {
    createApp: createAppApi(render),
  };
}
