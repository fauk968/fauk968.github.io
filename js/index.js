$(function () {
  // 1. 滑动到一定高度导航栏变固定
  navFiex();
  // 2. 轮播第一屏动画
  showS1();
  // 3. 监听函数动画与导航栏高亮
  scrollWatch();
  // 4. 点击导航页面滚动到该位置
  clickNav();

});
// 1. 滑动到一定高度导航栏变固定
function navFiex() {
  // 注册滚动事件
  $(window).scroll(function() {
    if ($(document).scrollTop() >= window.innerHeight) {
      // 让导航栏变固定
      $('.resume-nav').css({
        position: 'fixed',
        top: 0,
        left: 0
      });
      // 让第二部分加上外边距
      $('#section2').css('marginTop','70px');
    } else {
      // 让导航栏变固定
      $('.resume-nav').css({
        position: 'relative',
        top: 0,
        left: 0
      });
      // 让第二部分加上外边距
      $('#section2').css('marginTop','0px');
    }
  });
}

// 2. 轮播第一屏动画
function showS1() {
  var index = 1;
  var list = $('.bg-wrap .bg-item');
  setInterval(function () {
    list.eq(index).addClass('show').siblings().removeClass('show');
    index ++;

    if (index >= list.length) {
      index = 0;
    }
  },5500);
}

// 3. 监听函数动画与导航栏高亮
function scrollWatch() {
  // 获取常用元素与变量
  var section = $('.section');
  var callTop = $('#section1 .callTop');
  var progressIndex = section.has('.circle-wrap').index('.section');
  var flag = true;

  // 设置第一屏动画
  $('#section1 h1').addClass('fadein1');
  $('#section1 .description').addClass('fadein2');
  $('#section1 .regards, #section1 .works').addClass('fadein3');

  // 注册滚动事件
  $(document).scroll(function () {
    var scrollTop = $(document).scrollTop();

    // 循环要监听的元素
    $('.section').each(function (index,item) {
      // 获取每个元素在页面中的距离和页面滚动出去的距离
      var offsetTop = item.offsetTop;
      // 当滚动出去的距离到达一定条件时
      if(scrollTop >= offsetTop - 70) {
        // 当前导航高亮
        $('.navbar-right li').eq(index).addClass('active').siblings().removeClass('active');
        // 添加类名
        section.eq(index).find('.ani1').addClass('fadein1');
        section.eq(index).find('.line').addClass('scale');
        // 这是设置圆形进度条
        if (index >= progressIndex && flag) {
          setProgress();
          flag = false;
        }

      }
    })

    // 5. 回到顶部功能
    if(scrollTop >= window.innerHeight) {
      callTop.fadeIn(400);
    } else {
      callTop.fadeOut(400);
    }

    // 注册点击事件
    callTop.on('click',function () {
      $("html,body").stop().animate({
        scrollTop: '0'
      },500)
    })

  })
}

// 4. 点击导航页面滚动到该位置
function clickNav() {
  var flag = false;
  // 导航栏的点击
  $('.navbar-right li').on('click',function () {
    var activeIndex = $(this).index();
    var height  = $('.section').eq(activeIndex).offset().top - 69;
    ani(height);

    // 收起导航
    $('.navbar-collapse').slideUp(300);
    flag = false;
  });

  // 这里切换移动端菜单按钮
  $('.resume-nav .navbar-toggle').on('click',function () {
    if (flag) {
      $('.navbar-collapse').slideUp(300);
      flag = false;
    } else {
      $('.navbar-collapse').slideDown(300);
      flag = true;
    }
  });



  // 首页关于我和我的作品的点击
  $('.s1-content span').on('click',function () {
    var activeIndex = $(this).data('index');
    var height  = $('.section').eq(activeIndex).offset().top - 69;
    ani(height);
  });

  // 动画函数
  function ani(height) {
    $("html,body").stop().animate({
      'scrollTop':height
    },500);
  }
}

/*
传入一个对象，
circleR/circleL 是左右两个圆的选择器
percentEle是中间百分比元素的选择器
number为百分比，比如85%就写85
time为动画的总时长,毫秒值
timeFunction 动画时间函数
"",".circle-r",".percent",32,5000,"ease"
*/
// 这里是设置元素滚动条的函数
function setProgress() {
  // 第一个
  $.circlePorgress({
    number : 85,
    time : 3000,
    percentEle: '.percent .span1',
    circleR: '.cr1',
    circleL: '.cl1',
  });
  // 第二个
  $.circlePorgress({
    number : 85,
    time : 3000,
    percentEle: '.percent .span2',
    circleR: '.cr2',
    circleL: '.cl2',
  });
  // 第三个
  $.circlePorgress({
    number : 80,
    time : 3000,
    percentEle: '.percent .span3',
    circleR: '.cr3',
    circleL: '.cl3',
  });
  // 第四个
  $.circlePorgress({
    number : 80,
    time : 3000,
    percentEle: '.percent .span4',
    circleR: '.cr4',
    circleL: '.cl4',
  });
}