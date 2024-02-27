// 判断是否是原始标签
const isReserveTag = (tag)=>{
  return ['a','p','span','h1','div','li','button','ul'].includes(tag)
}

// _c
export function createElement(vm,tag,data={},...children){
  if(!data){
    data = {}
  }
  let key = data.key
  if(key){
    delete data.key
  }
  if(isReserveTag(tag)){  //判断是原始标签还是 自定义组件标签
    return vnode(vm,tag,key,data,children)
  }else{
    let Ctor = vm.$options.components[tag]
    return createComponentVnode(vm,tag,key,data,children,Ctor)
  }
  
}

function createComponentVnode(vm,tag,key,data,children,Ctor){
  if(typeof Ctor === 'object'){
    Ctor = vm.$options._base.extend(Ctor)
    data.hook = {
      init(vnode){ //创建真实节点，如果是组件则调用此方法
       let instance = vnode.componentInstance =  new vnode.componentOptions.Ctor
       instance.$mount()
      }
    }

    return vnode(vm,tag,key,data,children,null,{Ctor})
  }
}
// _v
export function createTextVNode(vm,text){
  return vnode(vm,undefined,undefined,undefined,undefined,text)
}

function vnode(vm,tag,key,data,children,text,componentOptions){
  return {
    vm,
    tag,
    key,
    data,
    children,
    text,
    componentOptions
  }
}

export function isSameVnode(odlVnode,newVode){
  return odlVnode.tag === newVode.tag && odlVnode.key === newVode.key
}
