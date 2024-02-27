import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js";
export function createGui(mesh) {
  const gui = new GUI();
  gui
    .add(mesh.position, "x", 0, 200)
    .name("x轴位置")
    .step(1)
    .onChange((value) => {
      // console.log(value);
    });
  // 颜色处理
  gui.addColor({ color: "ffffff" }, "color").onChange((value) => {
    mesh.material.color.set(value);
  });
  // 创建目录
  let meshFolder = gui.addFolder("立方体");
  meshFolder.add(mesh.position, "y", 0, 200).name("y轴位置").step(1);
}
 