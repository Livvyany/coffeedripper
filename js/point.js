const cursor = document.getElementById("cursor");
const cursorBorder = document.getElementById("cursor-border");

let cursorX = 0,
  cursorY = 0,
  borderX = 0,
  borderY = 0;
let deviceType = "";

// 檢查是否為觸摸設備
const isTouchDevice = () => {
  try {
    document.createEvent("TouchEvent");
    deviceType = "touch";
    return true;
  } catch (e) {
    deviceType = "mouse";
    return false;
  }
};

// 移動函數
const move = (e) => {
  if (deviceType === "touch") {
    cursorX = e.touches[0].clientX;
    cursorY = e.touches[0].clientY;
  } else {
    cursorX = e.clientX;
    cursorY = e.clientY;
  }
  updateCursor();
};

// 更新光點位置
const updateCursor = () => {
  cursor.style.left = `${cursorX}px`;
  cursor.style.top = `${cursorY + window.scrollY}px`;
};
// 事件監聽
if (isTouchDevice()) {
  document.addEventListener("touchmove", (e) => {
    move(e);
  });
  document.addEventListener("touchstart", (e) => {
    e.preventDefault();
  });
} else {
  document.addEventListener("mousemove", (e) => {
    move(e);
  });
}

//border動畫
const borderAnimation = () => {
  const gapValue = 5;
  borderX += (cursorX - borderX) / gapValue;
  borderY += (cursorY + window.scrollY - borderY) / gapValue;
  cursorBorder.style.left = `${borderX}px`;
  cursorBorder.style.top = `${borderY}px`;
  requestAnimationFrame(borderAnimation);
};

requestAnimationFrame(borderAnimation);
