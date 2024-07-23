let scene, camera, renderer;

// 初始化场景、相机和渲染器
function init() {
  // 創建渲染器
  renderer = new THREE.WebGLRenderer({ antialias: true });
  const initialWidth = 600; // 設置初始大小-寬度
  const initialHeight = 400; //設置初始大小-高度
  renderer.setSize(initialWidth, initialHeight);
  document.getElementById("canvas-container").appendChild(renderer.domElement);

  //場景
  scene = new THREE.Scene();
  scene.background = new THREE.Color("#f9f8bf");

  //相機
  camera = new THREE.PerspectiveCamera(
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

  // 启动渲染循环
  animate();
}

// 渲染循环
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

///////////////////--動態加載模型--//////////////////////////////
function loadModel(modelPath) {
  const loader = new THREE.GLTFLoader();
  loader.load(
    modelPath,
    function (gltf) {
      // 成功加載模型的處理邏輯
      while (scene.children.length > 2) {
        scene.remove(scene.children[2]);
      }
      const model = gltf.scene;
      model.position.set(0, 0, 0);
      scene.add(model);
      model.visible = true;

      // 將相機位置和角度重設為初始值
      camera.position.set(0, 4, 4);
      camera.lookAt(0, 0, 0);
    },
    undefined,
    function (error) {
      // 加載失敗時的錯誤處理
      console.error("無法加載模型：", error);
    }
  );
}

// 初始化場景
init();
