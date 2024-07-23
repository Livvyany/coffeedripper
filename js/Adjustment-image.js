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
  resultImage.src = "image/test/數字-01.jpg";
  resultImage.alt = "Initial Image";
  resultImage.style.width = "100px";
  resultImage.style.height = "auto";
};

// 確認按鈕
document.getElementById("confirmButton").addEventListener("click", () => {
  let total = 0;
  document.querySelectorAll(".slider").forEach((slider) => {
    let weight = parseFloat(slider.getAttribute("data-weight")); // 將數值改為浮點數
    total += value * weight;
  });
  // 將 total 保留小數點第一位
  total = total.toFixed(1);
  console.log(total);

  let resultImage = document.getElementById("resultImage");

  alert("Calculated total: " + total);
});
