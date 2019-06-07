// 轮播图模块 失败
// 参数：
;(function (window) {
    // 属性
    function AutoPlay (options) {
        options = options || {};
        this.imgDate = options.imgDate || [];
        this.imgWrap = options.imgWrap || '#imgWrap';
        this.liContainer = options.liContainer || '#slider';
        this.arrow_left = options.arrow_left || '#arrowL';
        this.arrow_Right = options.arrow_Right || '#arrowR';
    }

    this.play = function () {
        console.log(this);
    }

window.AutoPlay = AutoPlay;
})(window)
var auto = new AutoPlay();
auto.play();
console.dir(auto);
