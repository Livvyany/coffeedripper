// 數值條變化
document.querySelectorAll(".slider").forEach((slider, index) => {
  slider.addEventListener("input", (event) => {
    document.getElementById(`value${index}`).textContent = event.target.value;
  });
});

// 在頁面加載完成時執行
window.onload = function () {
  // 設置初始圖片
  let resultImage = document.getElementById("resultImage");
  resultImage.src = "image/bar/gallery.png";
  resultImage.alt = "Initial Image";
  resultImage.style.width = "100px";
  resultImage.style.height = "auto";
};

// 確認按鈕
document.getElementById("confirmButton").addEventListener("click", () => {
  let total = 0;
  document.querySelectorAll(".slider").forEach((slider) => {
    let value = parseFloat(slider.value); // 將數值改為浮點數
    let weight = parseFloat(slider.getAttribute("data-weight")); // 將數值改為浮點數
    total += value * weight;
  });
  // 將 total 保留小數點第一位
  total = total.toFixed(1);
  console.log(total);

  //提示框
  //alert("Calculated results: " + results.join(", "));
  //});
  let resultImage = document.getElementById("resultImage");

  if (total >= 6.0 && total <= 12.1) {
    resultImage.src = "image/bar/L.1.png";
    resultImage.alt = "Image 1";
    resultImage.style.width = "300px"; // 更改圖片寬度
    resultImage.style.height = "auto"; // 高度自動調整
  } else if (total > 12 && total <= 14) {
    resultImage.src = "image/bar/L.2.png";
    resultImage.alt = "Image 2";
    resultImage.style.width = "300px";
    resultImage.style.height = "auto";
  } else if (total > 14 && total <= 20) {
    resultImage.src = "image/bar/L.3.png";
    resultImage.alt = "Image 3";
    resultImage.style.width = "300px";
    resultImage.style.height = "auto";
  } else if (total > 20 && total <= 30) {
    resultImage.src = "image/bar/L.4.png";
    resultImage.alt = "Image 4";
    resultImage.style.width = "300px";
    resultImage.style.height = "auto";
  } else if (total > 30 && total <= 45) {
    resultImage.src = "image/bar/L.5.png";
    resultImage.alt = "Image 5";
    resultImage.style.width = "300px";
    resultImage.style.height = "auto";
  } else if (total > 45 && total <= 52) {
    resultImage.src = "image/bar/L.6.png";
    resultImage.alt = "Image 6";
    resultImage.style.width = "300px";
    resultImage.style.height = "auto";
  } else if (total > 52 && total <= 60) {
    resultImage.src = "image/bar/L.7.png";
    resultImage.alt = "Image 7";
    resultImage.style.width = "300px";
    resultImage.style.height = "auto";
  } else if (total > 60 && total <= 71) {
    resultImage.src = "image/bar/L.8.png";
    resultImage.alt = "Image 8";
    resultImage.style.width = "300px";
    resultImage.style.height = "auto";
  } else {
    resultImage.src = "";
    resultImage.alt = "No Image";
  }

  alert("Calculated total: " + total);
});
