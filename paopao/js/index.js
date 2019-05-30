$(function() {
  // 1，首页动画轮播
  showAni();

  // 3. 滚动200像素后加背景
  navBg();
  // 4. 手机页面直接显示服务盒子
  showServe();
  // 5. 第四个盒子的数据可视化操作
  setDataView();

  // 6. 轮播图li的宽度设置与轮播图
  setSlideWidth();

  // 7. 滚动监听加动画函数
  scrollMonitor();

  // 8. 首页第一个盒子动画
  firstAni();
  
  // 9. 登录
  loginBox();

  // 10. 登录的验证码
  authCode();
  
  // 11. 判断是否弹出登录框
  isLogin();
  
});


// 1. 首页动画轮播
function showAni () {
  var index = 1;
  var listLength = $('.first-ani>li').length;
  // 设置定时器更改类名
  setInterval(function () {
    $('.first-ani>li').eq(index).addClass('show').siblings().removeClass('show')

    index++;

    // 判断索引是不是等于li的长度
    if (index >= listLength) {
      index = 0;
    }
  }, 6100);
}

// 3. 滚动200像素后加背景
function navBg() {
  $(document).on('scroll',function () {
    var scrollTop = $(document).scrollTop();
    var opacity = scrollTop * (1/200);
    $('.pp-nav').css({
      'opacity': opacity,
      'visibility': 'visible'
    })
  })
}

// 4. 手机页面直接显示服务盒子
function showServe() {
  if (innerWidth <= 768) {
    $('.second-box .content .shade').css({
      'opacity': 1
    })
  }
}

// 5. 第四个盒子的数据可视化操作
function setDataView() {
  //
  var chart = Highcharts.chart('container',{
    chart: {
      type: 'column',
      margin: 75,
      options3d: {
        enabled: true,
        alpha: 10,
        beta: 25,
        depth: 70,
        viewDistance: 100,      // 视图距离，它对于计算角度影响在柱图和散列图非常重要。此值不能用于3D的饼图
        frame: {                // Frame框架，3D图包含柱的面板，我们以X ,Y，Z的坐标系来理解，X轴与 Z轴所形成
          // 的面为bottom，Y轴与Z轴所形成的面为side，X轴与Y轴所形成的面为back，bottom、
          // side、back的属性一样，其中size为感官理解的厚度，color为面板颜色
          bottom: {
            size: 10
          },
          side: {
            size: 1,
            color: '#E87E04'
          },
          back: {
            size: 1,
            color: '#2c3e50'
          }
        }
      },
    },
    title: {
      text: '2018年服务次数统计表'
    },
    subtitle: {
      text: ''
    },
    plotOptions: {
      column: {
        depth: 25
      },
      // 这里设置统计图初始动画
      series: {
        animation : true
      }
    },
    xAxis: {
      // 设置X轴选项
      categories: ['二月','四月','六月','八月','十月','十二月']
    },
    yAxis: {
      title: {
        text: null
      }
    },
    series: [{
      name: '服务次数',
      data: [561,652,692,752,680,900]
    }]
  });

}

// 6. 轮播图li的宽度设置
function setSlideWidth() {

  // 初始化宽度与拖拽窗口时实时设置宽度
  slideWidth();
  window.onresize = function () {
    slideWidth();
  };

    function slideWidth () {
      var count;

      if(innerWidth >= 992) {
        count = 3;
      } else if(innerWidth >= 768) {
        count = 2;
      } else {
        count = 1;
      }


      var totalWidth = $('.slide-view').width();
      var mr = 30;
      var list = $('.slide-view li');
      // 要减去的外边距
      var mCount = (count-1) * mr;
      var slideLiWidth = ((totalWidth - mCount) / count) + 'px';

      if (innerWidth < 768) {
        slideLiWidth = innerWidth * 0.8 + 'px';
        // 轮播图每次移动的距离
        window.moveDistance = innerWidth * 0.8 + mr;
        $('.slide-view').css('width', innerWidth * 0.8);

      } else {
        $('.slide-view').css('width', '100%');
        // 轮播图每次移动的距离
        window.moveDistance = parseInt(slideLiWidth) + mr;
      }

      // 开始设置
      list.css({
        'width': slideLiWidth,
        'marginRight': mr + 'px'
      });

      // 轮播图
        var ul = $('.slide-view>ul');
        var index = 0;

        // 开启定时器
        if (window.timer) return;

        window.timer = setInterval(intervarMove,2600);
        // 定时器轮播动画函数
        function intervarMove () {
          index++;
          ul.css({
            'transition': 'all 0.5s',
            'transform': 'translateX(-'+ index * window.moveDistance +'px)'
          });

          // 无缝滚动
          ul.on('transitionend', function () {
            if (index >= list.length / 2 ) {
              index = 0;
              ul.css({
                'transition': 'none',
                'transform': 'translateX(0px)'
              })
            }


          });

      }

        // 鼠标移入停止动画
      $('.fifth-box .container').hover(function () {
        clearInterval(window.timer);
      },function () {
        window.timer = setInterval(intervarMove,2600);
      })


      }
}

// 7. 滚动监听动画函数
function scrollMonitor() {

  sm('.monitor',120,function (index, item) {
    // 所有要做动画的父盒子
    var monitor = $('.monitor');
    // 中间线动画
    $('.line').eq(index).addClass('active');
    // 第二个盒子动画
    monitor.eq(index).find('[class^=platform-]').addClass('active');
    // 第三个盒子动画
    var thirdBox = monitor.eq(index).find('.third-animate');
    monitor.eq(index).find('.third-introduce').addClass('active');
    thirdBox.addClass('active');
    // 第四个盒子动画
    monitor.eq(index).find('.data-view').addClass('active');
    // 第五个盒子动画
    monitor.eq(index).find('.slide-view').addClass('active');
  })

}

// 8. 首页第一个盒子动画
function firstAni () {
  var firstBox = $('.first-box');
  // 当加载完毕时
  firstBox.ready(function () {
    firstBox.find('h2').addClass('active');
    firstBox.find('p').addClass('active');
    firstBox.find('a').addClass('active');
  });
}


// 9. 登录
function loginBox() {
  // 1. 点击登录按钮弹出登录框
  $('.nav .login-link').on('click',function () {
    $('.login-box').css('display', 'block')
  })
  // 2. 点击遮盖层取消登录
  $('.login-box .conceal').on('click', function () {
    $('.login-box').css('display', 'none')
  })
  // 3. 拖动登录框
  $('.login-box .login-title').on('mousedown', function (e) {
    var boxContent = $('.login-box .login-content');
    // 鼠标在盒子中的距离
    var mouseX = e.clientX - boxContent.position().left;
    var mouseY = e.clientY - boxContent.position().top;
    // 当移动时
    $(document).on('mousemove',function (e) {
      var boxX = e.clientX -  mouseX;
      var boxY = e.clientY - mouseY;

      // 不然盒子出去
      boxX = boxX <= 150? 150 : boxX;
      boxX = boxX >= 150 + innerWidth - boxContent.outerWidth()? 150 +  innerWidth - boxContent.outerWidth() : boxX;
      boxY = boxY <= 177.5? 177.5 : boxY;
      boxY = boxY >= 177.5 + innerHeight - boxContent.outerHeight()? 177.5 +  innerHeight - boxContent.outerHeight() : boxY;
      console.log(boxX);

      boxContent.css({
        'top': boxY + 'px',
        'left': boxX + 'px'
      })


    })


    // 4. 松开鼠标时取消事件
    $(document).on('mouseup', function () {
      $(document).off('mousemove');
    })
  })

}
// 10 登录验证码
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

  // 2. 点击换一张.form .trade,
  $('.form .trade,.form .verify-canvas').on('click', function () {
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

// 11. 判断是否弹出登录框
function isLogin() {
  var hash = window.location.hash;
  if (hash === '#login') {
    $('.login-box').css('display', 'block');
    console.log( hash);
  }
}