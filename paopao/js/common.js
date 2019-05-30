$(function () {
  // 隐藏加载动画

  $('.cover,.spinner').hide();

  // 2. 导航栏小盒子函数与点击添加active类名
  navBox();
});


// 2.导航栏小盒子函数与点击添加active类名
function navBox() {


  // 1. 给导航li注册鼠标滑入事件
  // 2. 获取当前发生事件的li的位置
  // 3. 将盒子用动画的方式移动到哪里
  var curLeft = 0;
  var width = 0;
  var list = $('.navbar-collapse ul:eq(0)').children();
  var box = $('.navbar-collapse>.botton-box');



  var actLi = $(list).siblings('.active');
  var actLeft = actLi.position().left;


  // 1. 一开始先设置盒子的宽度和位置
  box.css({
    left: actLeft,
    width: actLi.width()
  });

  // list的鼠标移入事件
  list.on('mouseenter', function() {
    curLeft = $(this).position().left;
    width = $(this).width();

    box.stop().animate({
      left: curLeft,
      width: width
    }, '0.3s', 'swing')
    // list的鼠标移出事件
  }).on('mouseleave', function() {
    var actLi = $(list).siblings('.active');
    var actLeft = actLi.position().left;

    box.stop().animate({
      left: actLeft,
      width: actLi.width()
    }, '0.3s')
    // list的点击事件
  }).on('click', function() {
    $(this).addClass('active').siblings().removeClass('active');
  });
  // 鼠标离开时，图标自己跑回有active类的li去
}


// 3.监听滚动函数

// 监听函数
// 参数一 要监听的元素，
// 参数二 偏移值
// 参数三 监听后的回调函数,回调函数有个index为索引,item为当前监听到的元素
function sm(select, offset, callback) {
  $(document).scroll(function () {
    // 1. 滚动时循环监听对象
    $(select).each(function (index, item) {
      // 滚动出去的距离
      var offsetTop = $(document).scrollTop();
      // 当前元素的位置离滚动出去的距离
      var curOffset = $(item).offset().top;

      if (offsetTop>=curOffset - offset) {
        // 到达目的地后的回调
        callback && callback(index,item);
      }
    })
  });
}

// 4.上传图片显示图片的函数
// 参数1为上传图片的input选择器
// 参数2为给img上传图片的baseURL的选择器
// 参数3为设置好了之后的回调函数
function showImg(input,target,callback){
  $(input).on('change', function () {
    var file = $(this)[0].files[0];
    // 创建文件读取对象
    var read = new FileReader();
    // 开始读取文件，读取结果在read.result属性里
    read.readAsDataURL(file);
    read.onload = function () {
      $(target).attr('src',read.result).css('display','block');
      callback&&callback();
    }
  })
}

// 5. 点击回到顶部与设置回到顶部显示隐藏
function ClickscrollTop() {
  $('.callTop').on('click', function () {
    $('html,body').animate({
      'scrollTop': 0
    })
  });


  // 设置回到顶部显示隐藏
  $(window).scroll(function () {
    if ($(document).scrollTop() >= 400) {
      console.log('df ');
      $('.callTop').stop().fadeIn(500)
    } else {
      $('.callTop').stop().fadeOut(500)
    }
  });
}