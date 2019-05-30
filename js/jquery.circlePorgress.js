$(function () {

  /*
  传入一个对象，
  circleR/circleL 是左右两个圆的选择器
  percentEle是中间百分比元素的选择器
  number为百分比，比如85%就写85
  time为动画的总时长,毫秒值
  timeFunction 动画时间函数
  "",".circle-r",".percent",32,5000,"ease"
  */
// 封装成jq静态方法
  $.extend({
    circlePorgress : function (options) {
      options = options || {};
      //1. 设置默认值
      var defaults = {
        circleL :  ".circle-l",
        circleR :  ".circle-r",
        percentEle :  ".percent",
        number :  100,
        time : 6000,
        timeFunction : "linear"
      };
      // 2.传入的对象覆盖默认对象
      for (var key in options) {
        defaults[key] = options[key];
      }
      defaults.number = defaults.number > 100 ? 100 : defaults.number;


      // 百分比换算成角度值
      var deg = 360/100 * defaults.number;
      // 2.计算动画的时间
      // 一度的时间
      var oneTime = defaults.time/360;
      // 根据度数算总时间
      var allTime = oneTime * deg;


      // 1.点击时获取第一个内联样式
      var sheet = document.styleSheets[0];

      // 因为一个页面多次使用这个插件的话会导致动画都是同一个，所以在这里设置独一无二的动画名
      var lName = 'l' + Math.floor(Math.random() * 10000);
      var rName = 'r' + Math.floor(Math.random() * 10000);
      // 如果角度大于180,则需要两个圆都转
      if (deg > (180)) {
          // 插入rrotate动画
          sheet.insertRule ( "@keyframes "+lName+"{\n" +
            "    from {\n" +
            "        transform: rotate(45deg);\n" +
            "    }\n" +
            "    to {\n" +
            "        transform: rotate(" + (deg+45-180) + "deg);\n" +
            "    }\n" +
            "}",sheet.cssRules.length);
          // 插入rrotate动画
          sheet.insertRule ( "@keyframes "+rName+"{\n" +
            "    from {\n" +
            "        transform: rotate(45deg);\n" +
            "    }\n" +
            "    to {\n" +
            "        transform: rotate(225deg);\n" +
            "    }\n" +
            "}",sheet.cssRules.length);


        // 左边动画需要的时间 一度需要的时间乘左边的度数
        var ltime = oneTime * (deg-180);
        // 设置添加动画
        $(defaults.circleL).css({animation: lName+" "+ltime+"ms " +defaults.timeFunction+ " "+(defaults.time/2)+"ms forwards"});
        $(defaults.circleR).css({animation: rName+" "+ (defaults.time/2)+"ms " +defaults.timeFunction+ " forwards"});
      } else {

          // 插入rrotate动画
          sheet.insertRule ( "@keyframes "+rName+"{\n" +
            "    from {\n" +
            "        transform: rotate(45deg);\n" +
            "    }\n" +
            "    to {\n" +
            "        transform: rotate(" + (deg+45) + "deg);\n" +
            "    }\n" +
            "}",sheet.cssRules.length);
          // 添加动画                                   所有时间
          $(defaults.circleR).css({animation: rName+" " + allTime + "ms " +defaults.timeFunction+ " forwards"});
        }


      // 中间百分比文字的叠加
      var count = 1;
      var timer = setInterval(function () {
        if (count >= defaults.number) {
          clearInterval(timer);
        }

        $(defaults.percentEle).text(count);
        count += 1;
      },3.6*oneTime); // 一度的角度乘一度的时间
    }
  });

});
