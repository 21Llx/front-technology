import { hasOwn } from "@vue/shared";

export const PublicInstanceProxyHandlers = {
  get({ _: instance }, key) {
    const {data,props,setupState} = instance
    if(hasOwn(setupState,key)){
      return setupState[key]
    }else if(hasOwn(data,key)){
      return data[key]
    }else if(hasOwn(props,key)){
      return props[key]
    }else{
      return undefined
    }
  },
  set({ _: instance }, key, value) {
    const {data,props,setupState} = instance
    if(hasOwn(setupState,key)){
       setupState[key] = value
    }else if(hasOwn(data,key)){
       data[key]= value
    }else if(hasOwn(props,key)){
       props[key]= value
    }
  },
};
