// 創建渲染器
const renderer = new THREE.WebGLRenderer({ antialias: true });
const initialWidth = 600; // 設置初始大小-寬度
const initialHeight = 400; //設置初始大小-高度
renderer.setSize(initialWidth, initialHeight);
document.getElementById("canvas-container").appendChild(renderer.domElement);

//場景
const scene = new THREE.Scene();
scene.background = new THREE.Color("#f9f8bf");

//相機
const camera = new THREE.PerspectiveCamera(
  75,
  initialWidth / initialHeight,
  0.1,
  1000
);
camera.position.set(0, 4, 4); //設置初始相機位置
camera.fov = 50; // 設置相機的初始視角（fov）

// 调整窗口大小時時更新渲染器大小和相機視野
function onWindowResize() {
  const width = Math.min(window.innerWidth, initialWidth);
  const height = Math.min(window.innerHeight, initialHeight);
  // 計算新的宽高比
  const aspectRatio = initialWidth / initialHeight;
  // 保持比例设置渲染器大小
  let newWidth, newHeight;

  if (width / height > aspectRatio) {
    newHeight = height;
    newWidth = newHeight * aspectRatio;
  } else {
    newWidth = width;
    newHeight = newWidth / aspectRatio;
  }
  // 確保渲染器的大小不超過初始尺寸
  newWidth = Math.min(newWidth, initialWidth);
  newHeight = Math.min(newHeight, initialHeight);
  renderer.setSize(newWidth, newHeight);
  // 更新相機的縱横比
  camera.aspect = newWidth / newHeight;
  camera.updateProjectionMatrix();
}
// 初始設置
onWindowResize();
// 添加窗口大小調整的事件監聽器
window.addEventListener("resize", onWindowResize);
// 渲染場景
function render() {
  renderer.render(scene, camera);
}

// 添加 OrbitControls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // 開啟緩衝效果
controls.dampingFactor = 0.1; // 設置緩衝係數

// 在全局範圍内聲明模型變量
let model1;
let model2;
let model3;
let model4;
let model5;
let model6;
let model7;
let model8;
let model9;
let model10;

// 加載 GLTF 模型1
const loader1 = new THREE.GLTFLoader();
loader1.load("./assets/T1-0.5.glb", function (gltf) {
  // 將模型添加到場景中
  model1 = gltf.scene;
  model1.position.set(0, 0, 0); // 設置模型位置
  scene.add(model1);
  model1.visible = true; // 初始顯示模型
});

// 加載 GLTF 模型2
const loader2 = new THREE.GLTFLoader();
loader2.load("./assets/T2-0.5.glb", function (gltf) {
  model2 = gltf.scene;
  model2.position.set(0, 0, 0); // 設置模型位置
  scene.add(model2);
  model2.visible = false; // 初始隱藏模型
});

// 加載 GLTF 模型3
const loader3 = new THREE.GLTFLoader();
loader3.load("./assets/T3-0.5.glb", function (gltf) {
  model3 = gltf.scene;
  model3.position.set(0, 0, 0); // 設置模型位置
  scene.add(model3);
  model3.visible = false; // 初始隱藏模型
});
// 加載 GLTF 模型4
const loader4 = new THREE.GLTFLoader();
loader4.load("./assets/T4-0.5.glb", function (gltf) {
  model4 = gltf.scene;
  model4.position.set(0, 0, 0); // 設置模型位置
  scene.add(model4);
  model4.visible = false; // 初始隱藏模型
});
// 加載 GLTF 模型5
const loader5 = new THREE.GLTFLoader();
loader5.load("./assets/T5-0.5.glb", function (gltf) {
  model5 = gltf.scene;
  model5.position.set(0, 0, 0); // 設置模型位置
  scene.add(model5);
  model5.visible = false; // 初始隱藏模型
});
// 加載 GLTF 模型6
const loader6 = new THREE.GLTFLoader();
loader6.load("./assets/T6-0.5.glb", function (gltf) {
  model6 = gltf.scene;
  model6.position.set(0, 0, 0); // 設置模型位置
  scene.add(model3);
  model6.visible = false; // 初始隱藏模型
});
// 加載 GLTF 模型7
const loader7 = new THREE.GLTFLoader();
loader7.load("./assets/T7-0.5.glb", function (gltf) {
  model7 = gltf.scene;
  model7.position.set(0, 0, 0); // 設置模型位置
  scene.add(model7);
  model7.visible = false; // 初始隱藏模型
});
// 加載 GLTF 模型8
const loader8 = new THREE.GLTFLoader();
loader8.load("./assets/T8-0.5.glb", function (gltf) {
  model8 = gltf.scene;
  model8.position.set(0, 0, 0); // 設置模型位置
  scene.add(model8);
  model8.visible = false; // 初始隱藏模型
});
// 加載 GLTF 模型9
const loader9 = new THREE.GLTFLoader();
loader9.load("./assets/T9-0.5.glb", function (gltf) {
  model9 = gltf.scene;
  model9.position.set(0, 0, 0); // 設置模型位置
  scene.add(model9);
  model9.visible = false; // 初始隱藏模型
});
// 加載 GLTF 模型10
const loader10 = new THREE.GLTFLoader();
loader10.load("./assets/T10-0.5.glb", function (gltf) {
  model10 = gltf.scene;
  model10.position.set(0, 0, 0); // 設置模型位置
  scene.add(model10);
  model10.visible = false; // 初始隱藏模型
});

// 設置光照
// 設置環境光
const ambientLight = new THREE.AmbientLight(0x404040, 0.5); // soft white light
scene.add(ambientLight);
// 設置方向光
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(10, 10, 10);
directionalLight.castShadow = true; // 開啟方向光的陰影
directionalLight.shadow.mapSize.width = 2048; // 提高陰影貼圖的分辨率
directionalLight.shadow.mapSize.height = 2048;
scene.add(directionalLight);
// 設置輔助光源來模擬自然光
const fillLight = new THREE.DirectionalLight(0xffffff, 0.5);
fillLight.position.set(-10, 10, -10);
scene.add(fillLight);

const backLight = new THREE.DirectionalLight(0xffffff, 0.3);
backLight.position.set(0, -10, 10);
scene.add(backLight);
// 設置點光源
const pointLight = new THREE.PointLight(0xffffff, 0.5, 100);
pointLight.position.set(0, 4, 4);
scene.add(pointLight);
// 設置聚光燈
const spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(15, 20, 10);
spotLight.angle = Math.PI / 5;
spotLight.penumbra = 0.1;
spotLight.decay = 2;
spotLight.distance = 200;
spotLight.intensity = 0.3;

spotLight.castShadow = true;
spotLight.shadow.mapSize.width = 2048; // 提高陰影貼圖的分辨率
spotLight.shadow.mapSize.height = 2048;
spotLight.shadow.camera.near = 10;
spotLight.shadow.camera.far = 200;

scene.add(spotLight);

// 渲染循環
function animate() {
  requestAnimationFrame(animate);
  controls.update(); // 更新控制器
  renderer.render(scene, camera);
}

animate();

// 添加按鈕點擊事件監聽器
document.getElementById("btn1").addEventListener("click", function () {
  toggleModelsVisibility(model1, model2);
});

document.getElementById("btn2").addEventListener("click", function () {
  toggleModelsVisibility(model2, model1);
});

// 定義一個函數來切換模型的可見性
function toggleModelsVisibility(modelToShow, modelToHide) {
  if (modelToShow && modelToHide) {
    modelToShow.visible = true;
    modelToHide.visible = false;
  } else {
    console.error("Model 1 or Model 2 is not loaded yet.");
  }
  // 重置相機位置
  camera.position.set(0, 4, 4);
  camera.lookAt(0, 0, 0);
}
