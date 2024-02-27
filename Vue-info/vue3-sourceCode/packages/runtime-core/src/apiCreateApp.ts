import { createVode } from "./vnode";

export function createAppApi(render) {
  return function createApp(rootComponent, rootProps) {
    const app = {
      _props: rootProps,
      _component: rootComponent,
      _container: null,
      mount(container) {
        //  1. 根据组件创建虚拟dom
        const vnode = createVode(rootComponent, rootProps);

        //  2. 将虚拟dom和容器获取后调用render进行渲染
        render(vnode, container);

        app._container = container;
      },
    };
    return app;
  };
}
