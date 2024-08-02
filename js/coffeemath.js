var sliders = [
  { id: "slider0", valueId: "value0", property: "acidity" },
  { id: "slider0", valueId: "value0-1", property: "acidity" },
  { id: "slider1", valueId: "value1", property: "sweetness" },
  { id: "slider1", valueId: "value1-1", property: "sweetness" },
  { id: "slider2", valueId: "value2", property: "taste" },
  { id: "slider2", valueId: "value2-1", property: "taste" },
];

sliders.forEach(function (slider) {
  document.getElementById(slider.id).addEventListener("input", function () {
    document.getElementById(slider.valueId).textContent = this.value;
  });
});

/////////////////////--監聽多選框的勾選事件--/////////////////////
var checkboxes = document.querySelectorAll(".roastingOption");
var resultDisplay = document.getElementById("roast-result");

////--顯示焙度文字--//////
function updateResult() {
  var selectedOptions = [];
  checkboxes.forEach(function (checkbox) {
    if (checkbox.checked) {
      selectedOptions.push(checkbox.value);
    }
  });
  if (selectedOptions.length > 0) {
    resultDisplay.textContent = " " + selectedOptions.join(", ");
  } else {
    resultDisplay.textContent = "";
  }
}

checkboxes.forEach(function (checkbox) {
  checkbox.addEventListener("change", function () {
    if (this.checked) {
      // 如果這個選項被勾選，取消其他所有選項的勾選狀態
      checkboxes.forEach(function (otherCheckbox) {
        if (otherCheckbox !== checkbox) {
          otherCheckbox.checked = false;
        }
      });
    } else {
      // 如果這個選項被取消勾選，確保至少有一個選項是勾選狀態
      var checkedCount = 0;
      checkboxes.forEach(function (checkbox) {
        if (checkbox.checked) {
          checkedCount++;
        }
      });
      // 如果沒有選項勾選，預設推薦最佳/不限焙度被勾選
      if (checkedCount === 0) {
        document.getElementById("Roastingother").checked = true;
      }
    }
    updateResult();
  });
});

///////////////////////////////--加载3D模型--/////////////////////////////////////////
let scene, camera, renderer, raycaster, mouse;
let modelRotationEnabled = true; // 控制模型是否旋轉的標誌

// 初始化場景、相機和渲染器
function init() {
  // 創建渲染器並設置 alpha: true 以支持透明背景
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  const initialWidth = 800; // 設置初始大小-寬度
  const initialHeight = 800; //設置初始大小-高度
  renderer.setSize(initialWidth, initialHeight);
  document.getElementById("canvas-container").appendChild(renderer.domElement);

  //場景
  scene = new THREE.Scene();
  //scene.background = new THREE.Color("#fccbcb");
  scene.background = null; // 設置背景為透明

  //相機
  camera = new THREE.PerspectiveCamera(
    75,
    initialWidth / initialHeight,
    0.1,
    1000
  );
  camera.position.set(0, 4, 4); //設置初始相機位置
  camera.fov = 45; // 設置相機的初始視角（fov）

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

  // 初始化 Raycaster 和滑鼠向量
  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();

  // 監聽滑鼠移動事件
  document.addEventListener("mousemove", onMouseMove, false);

  // 添加 OrbitControls
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; // 開啟緩衝效果
  controls.dampingFactor = 0.2; // 設置緩衝係數

  // 設置光照
  // 設置環境光
  const ambientLight = new THREE.AmbientLight(0x404040, 1); // soft white light
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

  // 添加線框
  const boxGeometry = new THREE.BoxGeometry(2, 2, 2);
  const wireframe = new THREE.WireframeGeometry(boxGeometry);
  const line = new THREE.LineSegments(wireframe);
  line.material.depthTest = false;
  line.material.opacity = 0.25;
  line.material.transparent = true;
  scene.add(line);

  // 啟動渲染循環
  animate();
}

// 滑鼠移動事件處理
function onMouseMove(event) {
  const canvasBounds = renderer.domElement.getBoundingClientRect();
  const isMouseInCanvas =
    event.clientX >= canvasBounds.left &&
    event.clientX <= canvasBounds.right &&
    event.clientY >= canvasBounds.top &&
    event.clientY <= canvasBounds.bottom;

  if (isMouseInCanvas) {
    // 將滑鼠位置轉換為歸一化設備座標 (-1 到 +1)
    mouse.x =
      ((event.clientX - canvasBounds.left) / canvasBounds.width) * 2 - 1;
    mouse.y =
      -((event.clientY - canvasBounds.top) / canvasBounds.height) * 2 + 1;

    // 更新 Raycaster 位置
    raycaster.setFromCamera(mouse, camera);

    // 檢測滑鼠和模型的碰撞
    const intersects = raycaster.intersectObjects(scene.children, true);
    modelRotationEnabled = intersects.length === 0;
  }
}

// 渲染循環
function animate() {
  requestAnimationFrame(animate);

  // 如果場景中存在模型，則讓它自轉
  if (scene.children.length > 2) {
    const model = scene.children[2];
    if (modelRotationEnabled) {
      model.rotation.y += 0.01; // 每次渲染時繞Y軸旋轉0.01弧度
    }
  }
  renderer.render(scene, camera);
}

///////////////////////////////////////////////////////////////////////////////
//////////////////--讀取網頁數據--//////////////////

document.getElementById("make-dripper").addEventListener("click", function () {
  // 跳轉到 .section-two
  var sectionTwo = document.querySelector(".section-two");
  sectionTwo.scrollIntoView({ behavior: "smooth" });
});

document.getElementById("confirmButton").addEventListener("click", function () {
  // 清空表格數據
  var resultsTableBody = document
    .getElementById("resultsTable")
    .querySelector("tbody");
  resultsTableBody.innerHTML = ""; // 清空現有的表格數據

  // 跳轉到 .step-four
  var stepFour = document.querySelector(".step-four");
  stepFour.scrollIntoView({ behavior: "smooth" });

  // 根據勾選的焙度選項決定要顯示的組別範圍
  var startIndex = 1;
  var endIndex = 30;

  if (document.getElementById("Roastinglight").checked) {
    startIndex = 1;
    endIndex = 10;
  } else if (document.getElementById("Roastingmid").checked) {
    startIndex = 11;
    endIndex = 20;
  } else if (document.getElementById("Roastingdeep").checked) {
    startIndex = 21;
    endIndex = 30;
  } else if (document.getElementById("Roastingother").checked) {
    startIndex = 1;
    endIndex = 30;
  }

  // 用於存儲計算結果的陣列
  var calculationResults = [];

  // 固定組別編號的起始值
  var fixedGroupNumber = startIndex;

  data.slice(startIndex - 1, endIndex).forEach(function (item, index) {
    var totalDifference = 0;
    var squaredSum = 0;
    var row = document.createElement("tr");

    // 組別編號
    var groupNumberCell = document.createElement("td");
    groupNumberCell.textContent = fixedGroupNumber + index; // 使用固定組別編號
    row.appendChild(groupNumberCell);

    //**均方根誤差（RMSE）**
    //計算差異→平方差異→計算平方差異的平均值→計算 RMSE

    sliders.forEach(function (slider) {
      var sliderValue = parseFloat(document.getElementById(slider.id).value);
      var dataValue = item[slider.property];
      //**均方根誤差（RMSE）**計算每個屬性的差異（Difference）
      var difference = sliderValue - dataValue;
      //計算每個屬性的總差異（totalDifferenceCell）
      totalDifference += difference;
      //**均方根誤差（RMSE）**差異平方和
      squaredSum += Math.pow(difference, 2);

      var cell = document.createElement("td");
      cell.textContent = difference.toFixed(1);
      row.appendChild(cell);
    });

    var totalDifferenceCell = document.createElement("td");
    totalDifferenceCell.textContent = totalDifference.toFixed(1);
    row.appendChild(totalDifferenceCell);

    //**均方根誤差（RMSE）**計算平均值後開根號
    var rmse = Math.sqrt(squaredSum / sliders.length);
    var rmseCell = document.createElement("td");
    rmseCell.textContent = rmse.toFixed(3);
    row.appendChild(rmseCell);

    // 將每組計算結果加入陣列
    calculationResults.push({
      groupNumber: startIndex + index,
      totalDifference: totalDifference,
      rmse: parseFloat(rmse),
    });

    // resultsTableBody.appendChild(row);
  });

  // 在所有計算結果顯示後進行判斷
  var foundValidResults = false;
  var minNegativeRMSE = Infinity;
  var bestNegativeGroupNumber = null;
  var minNonNegativeRMSE = Infinity;
  var bestNonNegativeGroupNumber = null;
  var closestGroupNumber = null;

  //////////////////--判斷焙度大小--//////////////////
  if (
    document.getElementById("Roastinglight").checked ||
    document.getElementById("Roastingmid").checked ||
    document.getElementById("Roastingdeep").checked ||
    document.getElementById("Roastingother").checked
  ) {
    calculationResults.forEach(function (result) {
      if (result.totalDifference <= 0 && result.rmse < minNegativeRMSE) {
        minNegativeRMSE = result.rmse;
        bestNegativeGroupNumber = result.groupNumber;
        foundValidResults = true;
      }
      if (result.totalDifference >= 0 && result.rmse < minNonNegativeRMSE) {
        minNonNegativeRMSE = result.rmse;
        bestNonNegativeGroupNumber = result.groupNumber;
        foundValidResults = true;
      }
    });
  }

  ///////////////////////--計算closestGroupNumber--////////////////////////////////

  if (minNegativeRMSE !== Infinity && minNonNegativeRMSE !== Infinity) {
    if (Math.abs(minNegativeRMSE) < Math.abs(minNonNegativeRMSE)) {
      // 總差異小於0的均方根誤差更接近0
      closestGroupNumber = bestNegativeGroupNumber;
    } else {
      // 總差異大於等於0的均方根誤差更接近0，或兩者相等
      closestGroupNumber = bestNonNegativeGroupNumber;
    }
  } else if (minNegativeRMSE !== Infinity) {
    closestGroupNumber = bestNegativeGroupNumber;
  } else if (minNonNegativeRMSE !== Infinity) {
    closestGroupNumber = bestNonNegativeGroupNumber;
  }

  // 存儲提示框回答的陣列
  var resultsArray = [];

  /////////////////////--結果，顯示--////////////////////////////
  if (foundValidResults) {
    // 數值調整到10以內
    if (bestNegativeGroupNumber >= 11 && bestNegativeGroupNumber <= 20) {
      bestNegativeGroupNumber -= 10;
    } else if (bestNegativeGroupNumber >= 21 && bestNegativeGroupNumber <= 30) {
      bestNegativeGroupNumber -= 20;
    }

    if (bestNonNegativeGroupNumber >= 11 && bestNonNegativeGroupNumber <= 20) {
      bestNonNegativeGroupNumber -= 10;
    } else if (
      bestNonNegativeGroupNumber >= 21 &&
      bestNonNegativeGroupNumber <= 30
    ) {
      bestNonNegativeGroupNumber -= 20;
    }

    if (closestGroupNumber >= 11 && closestGroupNumber <= 20) {
      closestGroupNumber -= 10;
    } else if (closestGroupNumber >= 21 && closestGroupNumber <= 30) {
      closestGroupNumber -= 20;
    }

    var message = "";
    if (bestNegativeGroupNumber !== null) {
      message += "最接近理想-大：" + bestNegativeGroupNumber + "\n";
      resultsArray.push(bestNegativeGroupNumber);
    }
    if (bestNegativeGroupNumber == null) {
      message += "最接近理想-大：" + bestNonNegativeGroupNumber + "\n";
      resultsArray.push(bestNonNegativeGroupNumber);
    }
    if (bestNonNegativeGroupNumber !== null) {
      message += "最接近理想-小：" + bestNonNegativeGroupNumber + "\n";
      resultsArray.push(bestNonNegativeGroupNumber);
    }
    if (bestNonNegativeGroupNumber == null) {
      message += "最接近理想-小：" + bestNegativeGroupNumber + "\n";
      resultsArray.push(bestNegativeGroupNumber);
    }
    if (closestGroupNumber !== null) {
      message += "最接近組別：" + closestGroupNumber;
      resultsArray.push(closestGroupNumber);
    }
    //--顯示提示框--///
    alert(message);

    ///////////////////--動態更新模型路徑--//////////////////////////////
    var selectedData = data2.find(function (item) {
      return (
        (item.bestNegativeGroupNumber === resultsArray[0] &&
          item.bestNonNegativeGroupNumber === resultsArray[1] &&
          item.closestGroupNumber === resultsArray[2]) ||
        (item.bestNegativeGroupNumber === resultsArray[1] &&
          item.bestNonNegativeGroupNumber === resultsArray[0] &&
          item.closestGroupNumber === resultsArray[2])
      );
    });

    if (selectedData) {
      loadModel(selectedData.modelpath); // 使用動態模型路徑加載模型
      document.getElementById("resultImage").src = selectedData.path;
    } else {
      //document.getElementById("resultImage").src = "image/bar/gallery.png";
      loadModel("./assets/LittleWhale.glb");
    }
  } else {
    alert("無符合條件的組別");
  }
});
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
