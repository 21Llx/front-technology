import * as THREE from "three"


function createTexture(scene) {
  const geometry = new THREE.BoxGeometry(100, 100, 100)
  //创建纹理加载器
  const loadTex = new THREE.TextureLoader()
  let img = require("../assets/image/brick_diffuse.jpg")
  const texture = loadTex.load(img)
  const material = new THREE.MeshBasicMaterial({
    map: texture
  })
  const mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)
}

// 阵列纹理
function createTextureRepeat(scene) {
  const geometry = new THREE.PlaneGeometry(2000,2000)
  const loadTex = new THREE.TextureLoader()
  let img = require("../assets/image/colors.png")
  const texture = loadTex.load(img)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(12,12)
  const material = new THREE.MeshBasicMaterial({
    map: texture
  })
  const mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)
}

export {
  createTexture,
  createTextureRepeat
}