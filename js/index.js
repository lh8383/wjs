/**
 * Created by liuhuan on 2016/8/19.
 */
$(function () {
    banner();
    //inittab();
    initTab()
    $('[data-toggle="tool"]').tooltip()
})
function banner() {
    //抽象出来数据
    //1.动态的根据屏幕的大小显示对应的轮播图  和小圆点
    //2.利用template 动态的加载
    //2.1 设置模板
    //2.2 把模板转化为方法
    //2.3 在页面上渲染
    var imgList = [
        {
            pcimg: "image/slide_01_2000x410.jpg",
            mimg: "image/slide_01_640x340.jpg"
        },
        {
            pcimg: "image/slide_02_2000x410.jpg",
            mimg: "image/slide_02_640x340.jpg"
        },
        {
            pcimg: "image/slide_03_2000x410.jpg",
            mimg: "image/slide_03_640x340.jpg"
        },
        {
            pcimg: "image/slide_04_2000x410.jpg",
            mimg: "image/slide_04_640x340.jpg"
        }
    ];
    var randerHtml = function () {
        var width = $(window).width();
        var isMobile = width >= 768 ? false : true;

        //准备模板 得到的是 定义的模板
        var pointstr = $("#point-template").html();
        var imgstr = $("#img-template").html();
        // 把模板转化为模板方法 得到的是一个方法
        var pointFuc = _.template(pointstr);
        var imgFuc = _.template(imgstr);
        //解析html结构 变成html样式
        var pointhtml = pointFuc({model: imgList});
        var imghtml = imgFuc({model: imgList, isMobile: isMobile});
        $(".carousel-indicators").html(pointhtml);
        $(".carousel-inner").html(imghtml);
    }
//屏幕改变的时候 重新渲染
    $(window).on("resize", function () {
        randerHtml();
    }).trigger("resize");

    var start = 0, move = 0, distance = 0, ismove = false;
    $(".wjs_banner").on("touchstart", function (e) {
        start = e.originalEvent.touches[0].clientX;
    }).on("touchmove", function (e) {
        move = e.originalEvent.touches[0].clientX;
        distance = move - start;
        ismove = true;
    }).on("touchend", function (e) {
        if (ismove && Math.abs(distance) > 50) {
            if (distance > 0) {
                $(".carousel").carousel('prev')
            } else {
                $(".carousel").carousel('next')
            }
        }
    })


}

//在移动设置ul的宽度
/*初始化也签*/
function initTab() {
    /*
     * 1.计算ul的宽度 设置好
     * 2.父容器设置成一个溢出隐藏的盒子
     * 3.初始化 滑动组件
     * */

    /*获取到相关元素*/
    var $parent = $('.wjs_product_box');
    var $child = $parent.find('ul');
    var $lis = $child.find('li');
    /*计算ul的宽度 设置好*/
    var width = 0;

    $lis && $lis.each(function () {
        width += $(this).outerWidth(true);
        /*
         * width  取得是内容的宽度
         * innerWidth 取得是 内容 和 内边距
         * outerWidth 取得是 内容 和 内边距 和 边框
         * outerWidth 取得是 内容 和 内边距 和 边框 和 外边距  (传true )
         * */
    });

    /*设置ul的宽度*/
    $child.width(width);

    /*初始化 滑动组件*/
    itcast.iScroll({
        swipeDom: $parent.get(0),
        swipeType: 'x',
        swipeDistance: '50'
    });

}