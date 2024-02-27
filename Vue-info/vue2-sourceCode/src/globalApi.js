import { mergeOptions } from "./utils";

export function globalApi(Vue) {
  Vue.options = {
    _base: Vue  //继承Vue上的方法
  };
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this;
  };
  Vue.extend = function (options) {
    function Sub(options = {}) {
      this._init(options);
    }
    Sub.prototype = Object.create(Vue.prototype); //Sub.prototype.__proto__ = Vue.prototype
    Sub.prototype.constructor = Sub;
    Sub.options = mergeOptions(Vue.options,options);
    return Sub;
  };

  Vue.options.components = {};
  Vue.component = function (id, definition) {
    definition =
      typeof definition == "function" ? definition : Vue.extend(definition);
    Vue.options.components[id] = definition;
  };
}
