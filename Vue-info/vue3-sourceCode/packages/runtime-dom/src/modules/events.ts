export const patchEvent = (el, key, value) => {
  // 对函数进行缓存
  const invokers = el._vei || (el._vei = {});
  const exist = invokers[key];
  if (value && exist) {
    exist.value = value
  } else {
    const eventName = key.slice(2).toLowerCase();
    if (value) {
      let invoker = (invokers[key] = createInvoker(value));
      el.addEventListener(eventName, invoker);
    }else{
      el.removeEventListener(eventName,exist)
      invokers[key] = undefined
    }
  }
};
function createInvoker(value) {
  const invoker = (e) => {
    invoker.value(e);
  };
  invoker.value = value;
  return invoker;
}
