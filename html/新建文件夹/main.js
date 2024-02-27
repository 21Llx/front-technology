import WindowManager from './WindowManager.js'
 
const t = THREE;
let camera, scene, renderer, world;
let near, far;
let pixR = window.devicePixelRatio ? window.devicePixelRatio : 1;
let cubes = [];
let sceneOffsetTarget = {x: 0, y: 0};
let sceneOffset = {x: 0, y: 0};
 
let today = new Date();
today.setHours(0);
today.setMinutes(0);
today.setSeconds(0);
today.setMilliseconds(0);
today = today.getTime();
 
let internalTime = getTime();
let windowManager;
let initialized = false;
 
// // 获取从一天开始以来的秒数（以便所有窗口使用相同的时间）
function getTime () {
	return (new Date().getTime() - today) / 1000.0;
}
 
if (new URLSearchParams(window.location.search).get("clear")) {
	localStorage.clear();
}
else {	
	// 在某些浏览器中避免在实际点击URL之前预加载页面内容
	document.addEventListener("visibilitychange", () => {
		if (document.visibilityState != 'hidden' && !initialized) {
			init();
		}
	});
  // 确保在窗口完全加载后，只有在页面可见时才执行初始化逻辑
	window.onload = () => {
		if (document.visibilityState != 'hidden') {
			init();
		}
	};
 
  // 初始化操作
	function init () {
		initialized = true;
 
		// 短时间内window.offsetX属性返回的值可能不准确，需要添加一个短暂的延迟，等待一段时间后再执行相关操作。
		setTimeout(() => {
			setupScene();
			setupWindowManager();
			resize();
			updateWindowShape(false);
			render();
			window.addEventListener('resize', resize);
		}, 500)	
	}
 
  // 设置场景相关的配置
	function setupScene () {
		camera = new t.OrthographicCamera(0, 0, window.innerWidth, window.innerHeight, -10000, 10000);
		
		camera.position.z = 2.5;
		near = camera.position.z - .5;
		far = camera.position.z + 0.5;
 
		scene = new t.Scene();
		scene.background = new t.Color(0.0);
		scene.add( camera );
 
		renderer = new t.WebGLRenderer({antialias: true, depthBuffer: true});
		renderer.setPixelRatio(pixR);
	    
	  	world = new t.Object3D();
		scene.add(world);
 
		renderer.domElement.setAttribute("id", "scene");
		document.body.appendChild( renderer.domElement );
	}
 
  // 设置窗口管理器的相关配置
	function setupWindowManager () {
		windowManager = new WindowManager();
		windowManager.setWinShapeChangeCallback(updateWindowShape);
		windowManager.setWinChangeCallback(windowsUpdated);
 
		let metaData = {foo: "bar"};
 
		// 初始化窗口管理器(windowmanager)并将当前窗口添加到窗口池中。
		windowManager.init(metaData);
 
		windowsUpdated();
	}
 
	function windowsUpdated () {
		updateNumberOfCubes();
	}
 
	function updateNumberOfCubes () {
		let wins = windowManager.getWindows();
 
		cubes.forEach((c) => {
			world.remove(c);
		})
 
		cubes = [];
 
		for (let i = 0; i < wins.length; i++) {
			let win = wins[i];
 
			let c = new t.Color();
			c.setHSL(i * .1, 1.0, .5);
 
			let s = 100 + i * 50;
			let cube = new t.Mesh(new t.BoxGeometry(s, s, s), new t.MeshBasicMaterial({color: c , wireframe: true}));
			cube.position.x = win.shape.x + (win.shape.w * .5);
			cube.position.y = win.shape.y + (win.shape.h * .5);
 
			world.add(cube);
			cubes.push(cube);
		}
	}
 
	function updateWindowShape (easing = true) {
		sceneOffsetTarget = {x: -window.screenX, y: -window.screenY};
		if (!easing) sceneOffset = sceneOffsetTarget;
	}
 
 
	function render () {
		let t = getTime();
 
		windowManager.update();
 
		// 根据当前位置和新位置之间的偏移量以及一个平滑系数来计算出窗口的新位置
		let falloff = .05;
		sceneOffset.x = sceneOffset.x + ((sceneOffsetTarget.x - sceneOffset.x) * falloff);
		sceneOffset.y = sceneOffset.y + ((sceneOffsetTarget.y - sceneOffset.y) * falloff);
 
		world.position.x = sceneOffset.x;
		world.position.y = sceneOffset.y;
 
		let wins = windowManager.getWindows();
 
 
		// 遍历立方体对象，并根据当前窗口位置的变化更新它们的位置。
		for (let i = 0; i < cubes.length; i++) {
			let cube = cubes[i];
			let win = wins[i];
			let _t = t;// + i * .2;
 
			let posTarget = {x: win.shape.x + (win.shape.w * .5), y: win.shape.y + (win.shape.h * .5)}
 
			cube.position.x = cube.position.x + (posTarget.x - cube.position.x) * falloff;
			cube.position.y = cube.position.y + (posTarget.y - cube.position.y) * falloff;
			cube.rotation.x = _t * .5;
			cube.rotation.y = _t * .3;
		};
 
		renderer.render(scene, camera);
		requestAnimationFrame(render);
	}
 
 
	// 调整渲染器大小以适合窗口大小
	function resize () {
		let width = window.innerWidth;
		let height = window.innerHeight
		
		camera = new t.OrthographicCamera(0, width, 0, height, -10000, 10000);
		camera.updateProjectionMatrix();
		renderer.setSize( width, height );
	}
}