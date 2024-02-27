import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module.js" //渲染频率检测
const width = window.innerWidth;
const height = window.innerHeight;

// 场景
const scene = new THREE.Scene();
// 相机
const camera = new THREE.PerspectiveCamera(75, width / height, 1, 3000);
camera.position.set(200, 200, 200);
camera.lookAt(0, 0, 0);
//物体
let geometry = new THREE.BoxGeometry(100, 100, 100);
// 普通材质 不受光照影响
let material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  //transparent: true, //开启透明度
  //opacity: 0.3,
});

let mesh = new THREE.Mesh(geometry, material);

// mesh.position.set(100, 50, 0);
// 创建坐标轴
const axesHelper = new THREE.AxesHelper(200);

scene.add(camera);
scene.add(mesh);
scene.add(axesHelper);
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
