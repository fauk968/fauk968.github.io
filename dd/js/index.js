// 1、 tab切换
;(function (window,undefined) {

    var side_r_infos = document.getElementById('side_r_info');
    var info_ls = side_r_infos.children[0];
    var infoDivs = side_r_infos.getElementsByTagName('ul');
    var arr =[
        info_ls.children[0],
        info_ls.children[1],
    ];
    var info_index = 0;
    var i = 0;
    for (; i < arr.length; i++) {
        var info = arr[i];
        info.index = i;
        info.onmouseover = infoMouseover;
        info.onclick = infoMouseover;
    }
    function infoMouseover() {
        for (i = 0; i < arr.length; i++) {
            arr[i].className = '';
            infoDivs[i].style.display = 'none';
        }
        this.className = 'current';

        infoDivs[this.index].style.display = 'block';
        return false;
    }
// 自动切换tab
    setInterval(function () {
        if (info_index === 0) {
            info_index = 1;
        } else {
            info_index = 0;
        }
        arr[info_index].click();
    },3000);
})(window)

// 2、轮播图
;(function (window,undefined) {

    var imgDate = [
        'images/slideshow1.jpg',
        'images/slideshow2.jpg',
        'images/slideshow3.jpg',
        'images/slideshow4.jpg',
        'images/slideshow5.jpg',
        'images/slideshow6.jpg',
        'images/slideshow7.jpg',
        'images/slideshow8.jpg'
    ];
    var slideshow_big = document.getElementById('slideshow_big');
    var slider = document.getElementById('slider');
    var sliderLis= slider.children;
    var index = 0;
    var arrowL = document.getElementById('arrowL');
    var arrowR = document.getElementById('arrowR');
// 根据数据动态创建元素
    imgDate.forEach(function (item,index) {
        var li = document.createElement('li');
        slideshow_big.appendChild(li);
        var link = document.createElement('a');
        link.setAttribute('href','http://www.baidu.com');
        li.appendChild(link);
        var img = document.createElement('img');
        link.appendChild(img);
        img.setAttribute('src',item);

        li = document.createElement('li');
        slider.appendChild(li);
        li.innerText = index + 1;


    });
    var imgWidth = slideshow_big.children[0].children[0].children[0].offsetWidth;

//克隆第一个li
    var lastLi = slideshow_big.children[0].cloneNode(true);
    slideshow_big.appendChild(lastLi);
//默认第一个序号li 高亮
    sliderLis[0].className = 'current';
// 遍历序号li并注册鼠标滑过动画
    var i = 0,len = imgDate.length;
    for (;i < len; i++) {
        sliderLi = sliderLis[i];
        sliderLi.index = i;
        sliderLi.onmouseover = sliderLiMouseover;
        sliderLi.onclick = sliderLiMouseover;
    }
    function sliderLiMouseover() {
        animate(slideshow_big, - this.index * imgWidth);

        //清除默认序号li的样式
        for (i = 0; i < len; i++) {
            sliderLis[i].className = '';
        }
        // 这一步至关重要！！！！
        index = this.index;
        sliderLis[this.index].className = 'current';
    }


//点击箭头时

    arrowL.onclick = function () {

        if (index === 0) {
            slideshow_big.style.left = - len * imgWidth + 'px';
            // index =
            index = 8;
        }


        if (index > 0) {
            sliderLis[index - 1].click();
        }
        return false;
    };
    arrowR.onclick = function () {
        //如果到了克隆的那个li ，索引和len 相对，赶紧初始化索引和位置
        if (index === len) {
            slideshow_big.style.left = 0 + 'px';
            index = 0;
        }

        if (index < len - 1) {
            sliderLis[index + 1].click();
        } else {
            index ++;
            animate(slideshow_big, - (index) * imgWidth);
            //清除默认序号li的样式
            for (i = 0; i < len; i++) {
                sliderLis[i].className = '';
            }
            //设置第一个序号li为高亮显示
            sliderLis[0].className = 'current';
        }
        return false;
    };
// 设置定时器自动轮播
    var timerId = setInterval(function () {
        arrowR.click();
    },2000);

//鼠标放上去清除定时器
    slideshow_big.onmouseover = function () {
        clearInterval(timerId);
    };
//鼠标离开开启定时器
    slideshow_big.onmouseout = function () {
        timerId = setInterval(function () {
            arrowR.click();
        },3000);
    };
})(window)

// 3、回到顶部
;(function (window,undefined) {

    var totop = document.getElementById('totop');
// 点击时操作
    totop.onclick = function () {
        //如果有定时器在则清除定时器
        if (timerId1) {
            clearInterval(timerId1);
        }
        // 定义变量 目标、步进、当前位置
        var target = 0;
        var stop = 10;
        var current = document.documentElement.scrollTop || document.body.scrollTop;
        // 开启定时器
        var timerId1 = setInterval(function () {
            // 如果当前位置大于目标位置，步进变负数，颠倒方向
            if (current > target) {
                stop = -Math.abs(stop);
            }
            // 如果当前位置离目标位置的差比步进小，就直接把当前位置设置为目标位置
            if (Math.abs(current - target) <= Math.abs(stop)) {
                clearInterval(timerId1);
                document.documentElement.scrollTop = target;
                document.body.scrollTop = target;
                return false;
            }
            // 当前位置累加步进数
            current += stop;
            // 赋值
            document.documentElement.scrollTop = current;
            document.body.scrollTop = current;
        },5);
        return false;
    };
})(window)

// 4 选择 显示
;(function (window,undefined) {

    var select = document.getElementById('select');
    var select_ul = document.getElementById('select_ul');
    var selectlists = select_ul.children;
    var span = select.children[0];
// 鼠标滑过
    select.onmouseover = function () {
        select_ul.style.display = 'block';
    };
    // 鼠标离开
    select.onmouseout = function () {
        select_ul.style.display = 'none';
    };
// 点击哪个把span的值文字设为哪个

    var i = 0,len = selectlists.length;
    for (; i < len; i++) {
        selectlists[i].onclick = selectlist;
    }
    // li 点击事件处理函数
    function selectlist() {
        // 将li 文字设为span值
        span.innerText = this.innerText;
        select_ul.style.display = 'none';
    }

})(window)
