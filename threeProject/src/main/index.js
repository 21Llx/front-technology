import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module.js" //渲染频率检测
import {group} from "./group"
import {createTexture,createTextureRepeat} from "./texture"
const width = window.innerWidth;
const height = window.innerHeight;

// 场景
const scene = new THREE.Scene();
// 相机
const camera = new THREE.PerspectiveCamera(75, width / height, 1, 3000);
camera.position.set(200, 200, 200);
camera.lookAt(0, 0, 0);
scene.add(camera);
// 创建坐标轴
const axesHelper = new THREE.AxesHelper(200);
scene.add(axesHelper);

// 创建网格地面
const grideHelper = new THREE.GridHelper(600,50)
scene.add(grideHelper)

// 组渲染
// scene.add(group)

// 纹理
// createTextureRepeat(scene)


//渲染器
const renderer = new THREE.WebGL1Renderer({
  antialias: true, //抗锯齿
});
renderer.setSize(width, height);
// 设置设备像素比
renderer.setPixelRatio(window.devicePixelRatio)
// // 设置背景颜色
// renderer.setClearColor(0x00ffff) 
document.body.appendChild(renderer.domElement);

let state = new Stats()
document.body.appendChild(state.domElement);

render();
// 创建相机控件
const controls = new OrbitControls(camera, renderer.domElement);
// 渲染函数
function render() {
  
  state.update()
  renderer.render(scene, camera);
  requestAnimationFrame(render)
}
// 处理页面宽高
window.onresize = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  renderer.setSize(width, height);
  camera.aspect = width/height
  camera.updateProjectionMatrix()
  
};
