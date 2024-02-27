// 光源

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

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

// 受光照影响的材质
let material = new THREE.MeshLambertMaterial({color: 0x00ff00,})
let mesh = new THREE.Mesh(geometry, material);

// 创建坐标轴
const axesHelper = new THREE.AxesHelper(200);

// 创建点光源
const pointLight = new THREE.PointLight(0xffffff,1)
pointLight.position.set(100,100,80)
// 创建点光源可视化器
const pointLightHelp = new THREE.PointLightHelper(pointLight,10) 
// 创建环境光
const ambient = new THREE.AmbientLight(0xffffff,0.4)

// 创建平行光
const directionLight = new THREE.DirectionalLight(0xffffff,1)
directionLight.position.set(50,100,60)
directionLight.target = mesh
// 可视化平行光
const directionLightHelp = new THREE.DirectionalLightHelper(directionLight,5,'orange')



scene.add(camera);
scene.add(mesh);
scene.add(axesHelper);
scene.add(ambient)
// scene.add(pointLight)
// scene.add(pointLightHelp)
scene.add(directionLight)
scene.add(directionLightHelp)



//渲染器
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);
render()

// 创建相机控件
const controls = new OrbitControls(camera,renderer.domElement)
controls.addEventListener("change",()=>{
  render()
})
// 渲染函数
function render(){
  renderer.render(scene, camera);
}