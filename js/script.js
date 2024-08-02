$(document).ready(function () {
  // Show or hide the back-to-top button
  $(window).scroll(function () {
    //當滾動超過20時顯示按鈕
    if ($(this).scrollTop() > 20) {
      $("#backToTop").fadeIn();
    } else {
      $("#backToTop").fadeOut();
    }
  });

  // Scroll to top when the button is clicked
  $("#backToTop").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 900);
    return false;
  });

  // 緩衝函數使滾動更自然
  $.easing.easeInOutCubic = function (x, t, b, c, d) {
    if ((t /= d / 2) < 1) return (c / 2) * t * t * t + b;
    return (c / 2) * ((t -= 2) * t * t + 2) + b;
  };
  //滾動到card
  //$("#tocard").click(function () {
  // $("html, body").animate(
  //  {
  //   scrollTop: $("#targetSection").offset().top,
  // },
  // 800
  //); // 调整滚动时间
  //});
  //滾動到toCustomization
  //$("#toCustomization").click(function () {
  // $("html, body").animate(
  //  {
  //   scrollTop: $("#targetSection2").offset().top,
  // },
  // 800
  //); // 调整滚动时间
  //});
  $("#tocard").click(function () {
    // 在新窗口中打開 card.html 頁面
    window.open("card.html", "_blank");
  });
  $("#toCustomization").click(function () {
    // 在新窗口中打開 coffee.html 頁面
    window.open("coffee.html", "_blank");
  });
  $("#Title1").click(function () {
    // 返回到 index.html 页面
    window.location.href = "index.html";
  });

  // 點擊任意卡片時，隱藏並清空box2
  $(".card").on("click", function () {
    $(".box2").addClass("hidden").find("h1").empty();
  });

  // 點擊按钮時，顯示相應的信息到box2
  $(".card").on("click", function (event) {
    event.stopPropagation(); // 阻止事件冒泡到父元素的點擊事件
    var header = $(this).data("header");
    var body = $(this).data("body");
    $(".box2").removeClass("hidden").find("h4").text(header);
    $(".box2").find("p").text(body);
  });

  // 點擊左右按钮時，移動圖片
  let position = 0;
  $(".arrow.right").on("click", function () {
    position -= 210;
    $(".card").css("transform", `translateX(${position}px)`);
  });

  $(".arrow.left").on("click", function () {
    position += 210;
    $(".card").css("transform", `translateX(${position}px)`);
  });
});
