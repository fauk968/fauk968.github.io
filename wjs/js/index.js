$(function () {
  // 1.模拟数据
  // 2.判断是什么设备
  // 3.根据设备动态添加HTML
  // 4.移动端滑动手势滑动轮播图
  // 5.测试
// 轮播图
  banner();
  // 初始化tab切换
  initTab();
  // 初始化提示
  $(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })
});


// 定义轮播图方法
var banner = function () {
  // 0.拿到需要的元素
  var $banner = $(".carousel");
  // 小圆点容器
  var $arrowWrap = $(".carousel-indicators");
  // 轮播图大容器
  var $imgWrap = $(".carousel-inner");

  // 1.模拟数据
  var data = [
    {
      pcSrc : "images/slide_01_2000x410.jpg",
      mSrc : "images/slide_01_640x340.jpg"
    },
    {
      pcSrc : "images/slide_02_2000x410.jpg",
      mSrc : "images/slide_02_640x340.jpg"
    },
    {
      pcSrc : "images/slide_03_2000x410.jpg",
      mSrc : "images/slide_03_640x340.jpg"
    },
    {
      pcSrc : "images/slide_04_2000x410.jpg",
      mSrc : "images/slide_04_640x340.jpg"
    }
  ];

  var render = function () {
    // 1.存字符串的变量
    var arrowHTML = '';
    var imgHTML = '';
    // 2.判断是什么设备
    var isPC = $(window).width() > 768;
    // 3.遍历数组，拼接HTML代码
    $.each(data,function (index,item) {
      // 拼接小圆点
      arrowHTML += '<li data-target="#carousel-example-generic" data-slide-to="'+index+'"'+(index==0 ? ' class="active"' : '')+'></li>\n';
      // 拼接图片
      imgHTML += '<div class="item '+(index === 0 ? 'active' : '')+'">';
      // 按需加载 如果是PC端就加载PC端图片 否则移动端
      if (isPC) {
        imgHTML += '<a href="#" class="pc_slide_wrap" style="background-image: url('+item.pcSrc+');"></a>';
      } else {
        imgHTML += '<a href="#" class="m_imgBox"><img src="'+item.mSrc+'">';
      }
      imgHTML += '</div>';
    });

    // 4.追加到DOM树上
    $arrowWrap.html(arrowHTML);
    $imgWrap.html(imgHTML);
  };

  // 屏幕拖拽事件发生时重新添加渲染
  $(window).on("resize",function () {
    render();
  }).resize();

  // 4.移动端滑动事件时上一张或者下一张
  var startX = 0;
  var moveX = 0;
  var distanceX = 0;
  var isMove = false;
  // touch事件群
  $banner.on("touchstart",function (e) {
    // 开始坐标
    startX = e.targetTouches[0].clientX;
  }).on("touchmove",function (e) {
    // 移动的坐标
    moveX = e.targetTouches[0].clientX;
    // 已经移动
    isMove = true;
  }).on("touchend",function (e) {
    // 滑动的距离
    distanceX = moveX - startX;

    // 如果滑动了并且滑动距离大于50 则认为触发了滑动手势
    if (isMove && Math.abs(distanceX) >= 50) {
      if (distanceX > 0) {
        // 小于0则上一张
        $banner.carousel('prev');
      } else {
        // 大于0则下一张
        $banner.carousel('next');
      }
    }

    // 重置变量
    startX = 0;
    moveX = 0;
    distanceX = 0;
    isMove = false;
  })

  // 配置轮播图参数
  $banner.carousel({
    interval: 3000
  })
};

// 初始化tab 解决移动端tab导航放不下掉下来的bug
var initTab = function () {
  /*
  1. 设置tab导航的ul 的宽度为 所有 li 的宽度
  2. 在tab导航上包一个外皮，设置溢出隐藏
  3. 使用iScroll 使ul 可以滚动

   */
  // 获取元素
  var navTab = $(".product .nav-tabs");
  var list = navTab.children("li");

  // 设置tab导航的ul 的宽度为 所有 li 的宽度
  var ulWidth = 0;
  list.each(function (index,element) {
    ulWidth += $(element).outerWidth(true);
  });
  // 设置ul的宽度
  navTab.width(ulWidth);

  // 初始化iscroll
  new IScroll(".nav-tabs-wrap",{
    scrollX : true,
    scrollY : false
  })
};
