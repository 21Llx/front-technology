export const patchStyle = (el, pre, next) => {
  const style = el.style;
  if (next === null) {
    el.removeAttribute("style");
  } else {
    if (pre) {  //处理老的有 新的没有 给赋空
      for (let key in pre) {
        if (next[key] == null) {
          style[key] = "";
        }
      }
    }
    for (let key in next) {
      style[key] = next[key];
    }
  }
};
