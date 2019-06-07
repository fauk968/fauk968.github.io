/**
 *
 * @param element
 * @param target
 * @param callback
 */
function animate (element,target,callback) {
    // 解决多次点击动画变快的bug
    if (element.timerId) {// 如果点击的时候有计时器在执行，没有就清除掉它
        clearTimeout(element.timerId);
    }
    element.timerId = setInterval(function () {

        // 当前div的位置
        var current= element.offsetLeft;
        // 步进
        // 如果current > target ,就让count变成负数（向反方向移动）
        var count = 10;
        if (current > target) {
            count = -Math.abs(count);
        }
        //将current >= target换成current绝对值 - target绝对值的差小于一个数
        if (Math.abs(current - target) <= Math.abs(count)) {
            element.style.left = target + 'px';
            // 回调函数
            // 判断是否传入了这个函数，有就执行
            if (callback) {
                callback();
            }
            //清除定时器
            clearTimeout(element.timerId);
            return;
        }
        // 执行一次当前的等于当前的加步进的
        current += count;
        element.style.left = current + 'px';
    },5);
}