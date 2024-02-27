export const nodeOps = { //dom元素操作
  // 元素
  createElement: target=> document.createElement(target),
  remove: child =>{
    const parnet = child.parentNode
    if(parnet){
      parnet.removeChild(child)
    }
  },
  insert: (child,parent,anchor=null)=>{
    parent.insertBefore(child,anchor)
  },
  querySelector:(selector)=>document.querySelector(selector),
  setElementText:(el,text) =>el.textContent = text,
  //文本
  createText: text=> document.createTextNode(text),
  setText: (node,text)=>node.nodeValue = text,
  nextSibling:(node)=> node.nextSibling
}