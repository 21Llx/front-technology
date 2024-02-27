import * as THREE from "three"

const geometry = new THREE.BoxGeometry(100,100,100)
const material = new THREE.MeshBasicMaterial({
  color: 0x00ffff,
})

// geometry.scale(2,2,2)  //缩放
// geometry.translate(100,0,0)  //平移
geometry.rotateX(Math.PI/4)  //旋转


console.log(geometry.attributes.position)
const boxMesh = new THREE.Mesh(geometry,material)

export {
  boxMesh
}