// 创建一个tab模块，以后可以多次使用
// 属性：
// contrainer    菜单跟菜单内容的父容器
// tabmenuSelected  当前菜单的选中的样式
// tabmainSelecten 当前内容选中的样式
;(function (window,undefined) {

    // 定义变量
    var _munes = null;
    var _mains = null;
    var _that = null;
    var _index = null;
    var _mainBlooean = false;
    var _menuBlooean = false;
    function Tab(options) {
        options = options || {};
        this.container = options.container || '#tab_wrap';
        this.tabMenuSelected = options.tabMenuSelected || 'current';
        this.tabMainSelected = options.tabMainSelected || 'current';


        _that = this;
        // 实现具体功能
        _tab.call(this);
    }

    function _tab() {
//      1 获取需要的元素
        var container = document.querySelector(this.container);
        _munes = container.children[0].children;
        _mains = container.children[1].children;
//      2 菜单鼠标移入样式改变
        var i = 0, len = _munes.length;
        for (; i < len; i++) {
            var mune = _munes[i];
            var main = _mains[i];
            mune.index = i;
            mune.onmouseover = _muneMouseover;
            mune.onmouseout = _muneMouseout;
            main.onmouseover = _mainMouseover;
            main.onmouseout = _mainMouseout;
        }
    }



    // 菜单鼠标移入事件
    function _muneMouseover() {
        _index = this.index;
        // 取消所有当前样式
        for (var i = 0; i < _munes.length; i++) {
            var mune = _munes[i];
            // 将当前类名替换为空字符串
            mune.className = mune.className.replace(_that.tabMenuSelected,'');
            // 内容清除默认样式
            _mains[i].className = _mains[i].className.replace(_that.tabMainSelected,'');
        }
        // 当前选中添加样式
        this.className = this.className + _that.tabMenuSelected;
        _mains[this.index].className = _mains[this.index].className + _that.tabMainSelected;
    }
    // 内容鼠标移入事件
    function _mainMouseover() {
        // 当前选中添加样式
        _munes[_index].className = _munes[_index].className + _that.tabMenuSelected;
        _mains[_index].className = _mains[_index].className + _that.tabMainSelected;
    }

    // 菜单鼠标移出事件
    function _muneMouseout() {
        // 取消所有当前样式
        for (var i = 0; i < _munes.length; i++) {
            // 菜单的
            _munes[i].className = _munes[i].className.replace(_that.tabMenuSelected,'');
            // 内容的
            _mains[i].className = _mains[i].className.replace(_that.tabMainSelected,'');
        }
    }

    // 内容移出事件
    function _mainMouseout() {
        // 取消所有当前样式
        for (var i = 0; i < _munes.length; i++) {
            // 菜单的
            _munes[i].className = _munes[i].className.replace(_that.tabMenuSelected,'');
            // 内容的
            _mains[i].className = _mains[i].className.replace(_that.tabMainSelected,'');
        }
    }


    window.Tab = Tab;
})(window)
new Tab();

