$(function () {
  // 1. 验证码
  authCode();

  // 2. 导航栏小盒子函数与点击添加active类名
  navBox();



// 1 登录验证码
  function authCode() {

    // 1. 验证验证码是否正确
    var str = getauth();
    $('.form .verify').on('change', function () {
      var userStr = $(this).val();

      if (str !== userStr) {
        // 失败了，调用失败函数
        fail();
        // 然后两秒后在换新的
        setTimeout(function () {
          str = getauth();
        }, 2000);
        // 设置边框为红色
        $(this).css('border', '1px solid red');
      } else {
        $(this).css('border', '1px solid green')
      }
    });

    // 2. 点击换一张
    $('.form .trade').on('click', function () {
      str = getauth();
    });




    // 失败的函数
    function fail () {

      var myCanvas = document.querySelector("canvas");
      var ctx = myCanvas.getContext("2d");

      ctx.clearRect(0,0,78, 40);

      // 中心坐标
      var x = ctx.canvas.width/2;
      var y = ctx.canvas.height/2;

      // 1.画一个十字坐标轴
      // 2.画文字
      ctx.beginPath();
      var str = "验证码错误";
      // 文字描边
      // ctx.strokeText(str,x,y);
      // 文字大小及字体
      ctx.font = "13px Microsoft YaHei";
      // 文字水平对齐方式
      ctx.textAlign = "center";
      // 文字垂直对齐
      ctx.textBaseline = "middle";
      ctx.fillStyle = 'red';
      // 文字填充
      ctx.fillText(str,x,y+0.5);

    }


    // 获取验证码的函数
    function getauth() {

      var c = document.getElementById('myc');
      var ctx = c.getContext('2d');


      ctx.clearRect(0,0,78, 40);

      var space = 5;

      var radius = 1;

      var textSpace = 18;
      // 存储生成的验证码
      var str = '';


      // 绘制数字
      for (let i = 1; i <= 4; i++) {
        var num = Math.floor(Math.random() * 10);

        str += num;

        // 文字水平对齐方式
        ctx.textAlign = "right";
        ctx.fillStyle = getRandom();
        // 文字垂直对齐
        ctx.textBaseline = "middle";
        ctx.font = "25px Microsoft YaHei";
        ctx.fillText(num, i * textSpace,20);
      }

      // 多少个
      var countX = Math.floor(c.width / (radius));
      var countY = Math.floor(c.height / (radius));

      // 开始绘制圆点
      for (var j = 0; j< countY; j++) {
        // 绘制X轴
        for (var i = 0; i < countX; i++) {
          ctx.beginPath();
          ctx.arc(i * space, j * space, radius, 0, 360,true);
          ctx.fillStyle = getRandom();
          ctx.fill();
        }
      }


      return str;


      // 随机颜色
      function getRandom() {
        return `rgb(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)})`;
      }

    }
  }
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
  // box.css({
  //   'left': actLi.position().left,
  //   'width': actLi.width()
  // });
  // list的鼠标移入事件
  list.on('mouseenter', function() {
    curLeft = $(this).position().left;
    width = $(this).width();

    box.css('display', 'block');

    box.stop().animate({
      left: curLeft,
      width: width
    }, '0.5s', 'swing')
    // list的鼠标移出事件
  }).on('mouseleave', function() {

    box.css('display', 'none');
    // list的点击事件
  }).on('click', function() {
    $(this).addClass('active').siblings().removeClass('active');
  });
  // 鼠标离开时，图标自己跑回有active类的li去
}
