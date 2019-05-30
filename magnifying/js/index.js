
var wrap = document.getElementById('wrap');
var small = wrap.firstElementChild;
var mirror = small.children[0];
var big = wrap.children[1];
var bigImg = big.children[0];
// 1.鼠标移动到小框，
small.onmouseenter = function () {
    mirror.style.display = 'block';
    big.style.display = 'block';
    small.style.cursor = 'move';
};
// 2.鼠标离开小框
small.onmouseleave = function () {
    mirror.style.display = 'none';
    big.style.display = 'none';
};

// 鼠标移动的时候
//鼠标移动的时候让鼠标跟着镜子走，并在镜子的中间
small.onmousemove = function (e) {
    // 鼠标在盒子中的坐标
    var x = e.pageX - small.offsetLeft;
    var y = e.pageY - small.offsetTop;
    //镜子坐标等于鼠标在盒子中的坐标 - 镜子宽高的一半
    var mirrorX =  x - mirror.offsetWidth / 2 ;
    var mirrorY =  y - mirror.offsetHeight / 2;

    //限制范围
    mirrorX = mirrorX < 0 ? 0 : mirrorX;
    mirrorX = mirrorX > small.offsetWidth - mirror.offsetWidth ? small.offsetWidth - mirror.offsetWidth : mirrorX;
    mirrorY = mirrorY < 0 ? 0 : mirrorY;
    mirrorY = mirrorY > small.offsetHeight - mirror.offsetHeight ? small.offsetHeight - mirror.offsetHeight : mirrorY;
    // 赋值
    mirror.style.left = mirrorX + 'px';
    mirror.style.top = mirrorY + 'px';


    // 放大镜
    // 大图片能够移动的最大位置
    var bigMaxX = bigImg.offsetWidth - big.offsetWidth;
    var bigMaxY = bigImg.offsetHeight - big.offsetHeight;


    var minX = small.offsetWidth - mirror.offsetWidth;
    var minY = small.offsetHeight - mirror.offsetHeight;

    var maxImgX = mirrorX * bigMaxX / minX;
    var maxImgY = mirrorY * bigMaxY / minY;

    bigImg.style.left = - maxImgX + 'px';
    bigImg.style.top = - maxImgY + 'px';
    // console.log('小图'+mirrorX);
    // console.log("大图" + maxImgX);
};