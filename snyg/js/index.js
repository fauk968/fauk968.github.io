$(function () {
  // 轮播图
  // 0.拿取元素
  // 轮播图外皮
  var $banner = $(".banner");
  var width = $banner.width();
  // ul
  var $imgs = $banner.find("ul:first");
  // li
  var $list = $imgs.children();

  // 小圆点
  var $arrowList = $banner.find("ul:last").children();
  // 1.无缝滚动
  var index = 1;
  // 轮播函数
  var bannerFun = function () {
    // 每次以动画的方式移动ul
    $imgs.animate({"transform": "translateX("+-(index * width)+"px)"},200,"linear",function () {

      // 判断索引，当图片为最后一个时瞬间定位到第一张图片
      if (index >= $list.length - 1) {
        index = 1;
        // 瞬间定位
        $imgs.css({"transform": "translateX("+-(index * width)+"px)"})
      } else if (index <= 0) {
        index = 8;
        // 瞬间定位
        $imgs.css({"transform": "translateX("+-(index * width)+"px)"})
      }

      // 这里索引范围为1-8
      // 小圆点类名改变
      $arrowList.removeClass("now").eq(index-1).addClass("now");
    });
  };
  // 定时轮播
  var timer = setInterval(function () {
    index ++;
    bannerFun();
  },3000);

  // 2.手势滑动
  // 上一张
  $imgs.on("swipeRight",function () {
    index --;
    bannerFun();
  });
  // 下一张
  $imgs.on("swipeLeft",function () {
    index ++;
    bannerFun();
  });



});