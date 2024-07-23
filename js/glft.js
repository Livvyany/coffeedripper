// 創建渲染器
const renderer = new THREE.WebGLRenderer({ antialias: true });
const initialWidth = 600; // 設置初始大小-寬度
const initialHeight = 400; //設置初始大小-高度
renderer.setSize(initialWidth, initialHeight);
document.getElementById("canvas-container").appendChild(renderer.domElement);

// 場景
const scene = new THREE.Scene();
scene.background = new THREE.Color("#f9f8bf");

// 相機
const camera = new THREE.PerspectiveCamera(
  75,
  initialWidth / initialHeight,
  0.1,
  1000
);
camera.position.set(0, 4, 3); // 設置初始相機位置
camera.fov = 50; // 設置相機的初始視角（fov）

// 調整窗口大小時更新渲染器大小和相機視野
function onWindowResize() {
  const width = Math.min(window.innerWidth, initialWidth);
  const height = Math.min(window.innerHeight, initialHeight);
  const aspectRatio = initialWidth / initialHeight;
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
// 添加窗口大小調整的事件監聽器
onWindowResize();
window.addEventListener("resize", onWindowResize);

// 渲染場景
function render() {
  renderer.render(scene, camera);
}

// 添加 OrbitControls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // 開啟緩衝效果
controls.dampingFactor = 0.1; // 設置緩衝係數
//開啟OrbitControls自動旋轉
console.log("Adding OrbitControls");
controls.autoRotate = true; // 開啟自動旋轉
controls.autoRotateSpeed = 2.0; // 設置自動旋轉速度
console.log("OrbitControls added");

// 在全局範圍内聲明模型變量數組
const models = Array(10).fill(null);

// 加載 GLTF 模型
const loader = new THREE.GLTFLoader();
const modelPaths = [
  "./assets/T1-0.5.glb",
  "./assets/T2-0.5.glb",
  "./assets/T3-0.5.glb",
  "./assets/T4-0.5.glb",
  "./assets/T5-0.5.glb",
  "./assets/T6-0.5.glb",
  "./assets/T7-0.5.glb",
  "./assets/T8-0.5.glb",
  "./assets/T9-0.5.glb",
  "./assets/T10-0.5.glb",
];

modelPaths.forEach((path, index) => {
  loader.load(path, function (gltf) {
    models[index] = gltf.scene;
    models[index].position.set(0, 0, 0);
    models[index].visible = index === 0; // 只顯示第一個模型
    scene.add(models[index]);
  });
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

let isRendering = false;

// 渲染循環
function animate() {
  if (isRendering) {
    requestAnimationFrame(animate);
    controls.update(); // 更新控制器
    render();
  }
}

// 添加 Intersection Observer
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        isRendering = true;
        animate();
      } else {
        isRendering = false;
      }
    });
  },
  {
    threshold: 0.1,
  }
);

observer.observe(targetSection2);

// 添加按鈕點擊事件監聽器
for (let i = 0; i < 10; i++) {
  const button = document.getElementById(`btn${i + 1}`);
  if (button) {
    button.addEventListener("click", function () {
      showModel(i);
    });
  } else {
    console.error(`Button btn${i + 1} not found`);
  }
}

// 定義一個函數來切換模型的可見性
function showModel(index) {
  models.forEach((model, i) => {
    if (model) {
      model.visible = i === index;
    }
  });

  // 重置相機位置
  camera.position.set(0, 4, 3);
  camera.lookAt(0, 0, 0);
}

//加載動畫
const loadingAnimation = document.getElementById("loading-animation");

// 监听窗口滚动事件
window.addEventListener("scroll", checkVisibility);

function checkVisibility() {
  const container = document.querySelector("#canvas-container");
  const rect = container.getBoundingClientRect();

  // 如果容器完全显示在视口中，则显示加载动画，否则隐藏加载动画
  if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
    showLoadingAnimation();
  } else {
    hideLoadingAnimation();
  }
}

function showLoadingAnimation() {
  loadingAnimation.style.display = "block";
}

function hideLoadingAnimation() {
  loadingAnimation.style.display = "none";
}

// 模型加载成功或失败后隐藏加载动画
loader.load(
  "./path/to/model.glb",
  function (gltf) {
    // 模型加载成功后的回调函数
    const model = gltf.scene;
    // 在这里对模型进行操作
    scene.add(model);
    // 隐藏加载动画
    hideLoadingAnimation();
  },
  undefined,
  function (error) {
    // 模型加载失败时的回调函数
    console.error("Error loading model:", error);
    // 隐藏加载动画
    hideLoadingAnimation();
  }
);
