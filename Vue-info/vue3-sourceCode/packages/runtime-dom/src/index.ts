import { extend } from "@vue/shared";
import { patchProp } from "./patchProp";
import { nodeOps } from "./nodeOps";
import { createRenderer } from "@vue/runtime-core";
export const renderOptions = extend({patchProp},nodeOps)

export function createApp(rootComponent,rootProps=null){
  const app = createRenderer(renderOptions).createApp(rootComponent,rootProps)
  let {mount} = app
  app.mount = function(container){
    container = nodeOps.querySelector(container)
    container.innerHTML = ""
    mount(container)
  }
  return app
}

export * from "@vue/runtime-core"