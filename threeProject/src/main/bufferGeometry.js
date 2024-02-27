import * as THREE from "three";

// 添加物体
// 添加立方体
const geometry = new THREE.BufferGeometry();
const vertices = new Float32Array([
  0, 0, 0, 50, 0, 0, 0, 100, 0, 0, 0, 10, 0, 0, 100, 50, 0, 10,
]);

const attribute = new THREE.BufferAttribute(vertices, 3);
// 设置几何体顶点位置
geometry.attributes.position = attribute;
//点模型
const materialPoint = new THREE.PointsMaterial({
  color: 0xffff00,
  size: 5,
});
const poionts = new THREE.Points(geometry, materialPoint);

// 线模型
const materialLine = new THREE.LineBasicMaterial({
  color: 0xffff00,
});
// 开放
const line = new THREE.Line(geometry, materialLine);
// 闭合
const linesLoop = new THREE.LineLoop(geometry, materialLine);
// 非连续
const lineSegment = new THREE.LineSegments(geometry, materialLine);

// 网格模型
const materila = new THREE.MeshBasicMaterial({
  color: 0x00ffff,
  side: THREE.DoubleSide, //双面可见
  wireframe: true  //显示线框
});
//三角形
const triangleMesh = new THREE.Mesh(geometry, materila);

const geometry2 = new THREE.BufferGeometry();
// 矩形平面
const vertices2 = new Float32Array([
  0, 0, 0, 80, 0, 0, 80, 80, 0, 0, 0, 0, 80, 80, 0, 0, 80, 0,
]);
geometry2.attributes.position = new THREE.BufferAttribute(vertices2, 3);
const rectMesh = new THREE.Mesh(geometry2, materila);

const geometry3 = new THREE.BufferGeometry();
// 通过顶点索引建立
const vertices3 = new Float32Array([0, 0, 0, 80, 0, 0, 80, 80, 0, 0, 80, 0]);
geometry3.attributes.position = new THREE.BufferAttribute(vertices3, 3);

const indexs = new Uint16Array([0, 1, 2, 0, 2, 3]);
geometry3.index = new THREE.BufferAttribute(indexs, 1);
const rectMesh2 = new THREE.Mesh(geometry3, materila);
// 球体
const geometrySph = new THREE.SphereGeometry(50);
const sphMesh = new THREE.Mesh(geometrySph, materila);
export {
  poionts,
  line,
  linesLoop,
  lineSegment,
  triangleMesh,
  rectMesh,
  rectMesh2,
  sphMesh,
};
