export const patchAttr = (el,key,next)=>{
  if (next === null) {
    el.removeAttribute(key);
  }else{
    el.setAttribute(key, next)
  }
}