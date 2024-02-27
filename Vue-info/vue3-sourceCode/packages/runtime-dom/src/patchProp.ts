import { patchAttr } from "./modules/attrs";
import { patchClass } from "./modules/class";
import { patchEvent } from "./modules/events";
import { patchStyle } from "./modules/style";

export const patchProp = (el, key, preValue, nextValue) => {
  switch (key) {
    case "class":
      patchClass(el, nextValue);
      break;
    case "style":
      patchStyle(el, preValue,nextValue);
      break;
    default:
      if(/^on[A-Z]/.test(key)){
        patchEvent(el,key,nextValue)
      }else{
        patchAttr(el,key,nextValue)
      }
      break;
  }
};
