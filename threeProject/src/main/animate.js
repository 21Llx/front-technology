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
let geometry = new THREE.BoxGeometry(50, 50, 50);
// 普通材质 不受光照影响
let material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  transparent: true,//开启透明度
  opacity:0.3
});

let mesh = new THREE.Mesh(geometry, material);

// mesh.position.set(100, 50, 0);
// 创建坐标轴
const axesHelper = new THREE.AxesHelper(200);

scene.add(camera);
scene.add(mesh);
scene.add(axesHelper);
//渲染器
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);
render()

// 创建相机控件
const controls = new OrbitControls(camera,renderer.domElement)


// 渲染函数
function render(){
  mesh.rotateY(0.01)
  renderer.render(scene, camera);
  requestAnimationFrame(render)
}
