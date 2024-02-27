import * as THREE from "three";

let geometry = new THREE.BoxGeometry(50,50,50)
let material = new THREE.MeshBasicMaterial({color: 0x00ffff})

let mesh1 = new THREE.Mesh(geometry,material)
let mesh2 = new THREE.Mesh(geometry,material)
mesh2.position.x = 100
let group = new THREE.Group()

group.add(mesh1,mesh2)

export {
  group
}