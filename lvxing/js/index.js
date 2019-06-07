/***********************顶部导航条****************************/
//实现 简体中文 弹窗
$('#language').mouseover(function(){
    $(this).children('.selected').addClass('hover');
    $(this).children('.language_list').show();
})
$('#language').mouseout(function(){
    $(this).children('.selected').removeClass('hover');
    $(this).children('.language_list').hide();
})
//实现 国内电话 弹窗
$('#service').mouseover(function(){
    $(this).find('.service_tel').addClass('hover');
    $(this).find('.service_wrap').show();
})
$('#service').mouseout(function(){
    $(this).find('.service_tel').removeClass('hover');
    $(this).find('.service_wrap').hide();
})
//实现 无线 弹窗
$('#ico_app').mouseover(function(){
    $(this).children('.wireless_box').show();
})
$('#ico_app').mouseout(function(){
    $(this).children('.wireless_box').hide();
})
$('#ico_wechat').mouseover(function(){
    $(this).children('.wireless_box').show();
})
$('#ico_wechat').mouseout(function(){
    $(this).children('.wireless_box').hide();
})
/*****************************导航*****************************/
//实现导航菜单弹窗
$('#nav_content>li').mouseover(function(){
    $(this).children('a').addClass('hover');
    $(this).children('.subnav_wrap').show();
})
$('#nav_content>li').mouseout(function(){
    $(this).children('a').removeClass('hover');
    $(this).children('.subnav_wrap').hide();
})
/*************************广告轮播*******************************/
var bannerShow={
    INTERVAL:3000,//自动轮播间隔
    curIndex:0,
    timer:null,
    arr:['pic1','pic2','pic3','pic4','pic5','pic6','pic7'],//数组元素对应图片的父元素的id
    init:function(){
        var me=this;//留住this
        this.timer=setInterval(me.changeImg.bind(me),me.INTERVAL); //设置自动轮播定时器
        $('#slide_banner').mouseover(me.stopChange.bind(me));//为广告轮播绑定鼠标移入事件
        $('#slide_banner').mouseout(me.autoChange.bind(me));//为广告轮播绑定鼠标移出事件
        $('#banner_dot a').mouseover(me.changeBanner.bind(me));//为广告图片对应的小点绑定鼠标移入事件
    },
    changeBanner:function(e){//将图片换成小点对应的图片
        var target=e.target;//获取事件的目标对象
        if(target.nodeName==='A'){
            this.curIndex=parseInt($(target).attr('data-index'));
            $(target).addClass('dot_current');
            $(target).siblings().removeClass('dot_current');
            var id='#'+this.arr[this.curIndex];
            $(id).siblings().hide();//隐藏其他所有图片
            $(id).show();//显示当前图片
            clearInterval(this.timer);//停止轮播
        }
    },
    stopChange:function(){//停止轮播
        clearInterval(this.timer);
    },
    autoChange:function(){//启动轮播
        this.timer=setInterval(this.changeImg.bind(this),this.INTERVAL);
    },
    changeImg:function(){//改变当前图片
        if(this.curIndex===this.arr.length-1){
            this.curIndex=0;
        }else{
            this.curIndex++;
        }
        var id='#'+this.arr[this.curIndex];
        $(id).siblings().hide();//隐藏其他所有图片
        $(id).show();//显示当前图片
        $('[data-index='+this.curIndex+']').addClass('dot_current');//为当前图片对应的小点添加属性
        $('[data-index='+this.curIndex+']').siblings().removeClass('dot_current');//其他小点移出该属性
    }
}
bannerShow.init();
/**********************广告轮播上方输入框的目的地弹窗************************/
$('#destination_search_box').click(function(){//为目的地输入框绑定鼠标点击事件
    $(this).attr('placeholder','');//点击时清空input的内容
    $(this).next().show();//点击时显示下面的目的地弹窗
})
$('#destination_box').click(function(e){//为目的地弹窗绑定鼠标点击事件
    if(e.target.nodeName==='LI'){//判断事件目标对象是不是li
        $('#destination_search_box').val($(e.target).html());//将目的地输入框的内容改为当前被点击的li的内容
        $('#destination_search_box').focus();//目的地输入框获得焦点
        $(this).hide();//目的地弹窗隐藏
    }
})
$('#destination_box .close').click(function(){//为右上方的X符号绑定鼠标点击事件
    $(this).parent().parent().hide();//隐藏目的地弹窗
    if($('#destination_search_box').val()===''){//判断目的地输入框是否为空
        $('#destination_search_box').attr('placeholder','中文/拼音');//目的地输入框为空时，重新设置提示内容
    }
})
$('#destination_box a').click(function(){
    $(this).siblings('.current').removeClass('current');
    $(this).addClass('current');
})
/****************************左侧电梯导航**********************************/
var elevatorNav={
    init:function(){
        var me=this;//留住this
        $('#elevator_nav').css('top',$('#tmh').offset().top);//初始化电梯导航的初始位置
        $(window).scroll(me.elevatorLocation);
        $(window).scroll(me.scrollShow.bind(me));
        $('#elevator_nav a').click(me.moveTo.bind(me));//为电梯导航里的a绑定鼠标点击事件
    },
    moveTo:function(e){//实现页面动态移动到对应的楼层去
        var me=this;
        e.preventDefault();//阻止a链接的默认行为
        if(e.target.nodeName==='A'){
            var $a=$(e.target);
        }
        var id = $a.attr('href');
        $(window).unbind();//解除window所有绑定事件
        var offsetTop=$(id).offset().top;//对应楼层相对文档的偏移高度
        $(document.body).animate({scrollTop:offsetTop-200},500,function(){//动画结束后执行的函数
            $a.parent().siblings().removeClass('active');
            $a.parent().addClass('active');
            $(window).scroll(me.elevatorLocation);
            $(window).scroll(me.scrollShow.bind(me));
        });//实现对应楼层动态移动到偏移窗口顶部200px的位置
    },
    elevatorLocation:function(){//电梯导航定位
        var tmhOffsetTop=$('#tmh').offset().top-$(window).scrollTop();//特卖汇楼层距窗口顶部的偏移高度
        if(tmhOffsetTop>200){
            $('#elevator_nav').css('top',tmhOffsetTop);
        }else{
            $('#elevator_nav').css('top','200px');
        }
    },
    scrollShow:function(){//滚动到对应楼层时，电梯导航显示对应楼层的名称
        $('#main>div').each(function(i){//遍历所有楼层
            if(this.id!=='tmh' && this.id!=='serve'){//第一个楼层跟最后一个楼层比较特殊，先区分出来
                var curOffsetTop=$(this).offset().top-$(window).scrollTop();//当前对应楼层距窗口顶部的偏移高度
                if(curOffsetTop >= -50 && curOffsetTop <= parseFloat($(this).prev().css('height'))-50){//设定当前楼层滚动的范围
                    var id = $(this).attr('id');
                    $('[href="#'+id+'"]').parent().siblings().removeClass('active');//移除所有电梯导航li中的active样式
                    $('[href="#'+id+'"]').parent().addClass('active');//为当前楼层对应的电梯导航li添加active样式
                }
            }else if(this.id==='tmh'){
                var tmhOffsetTop=$(this).offset().top-$(window).scrollTop();
                if(tmhOffsetTop >= -50){//设定第一个楼层滚动的范围
                    var id = $(this).attr('id');
                    $('[href="#'+id+'"]').parent().siblings().removeClass('active');
                    $('[href="#'+id+'"]').parent().addClass('active');
                }
            }else if(this.id==='serve'){//设定最后一个楼层滚动的范围
                var serveOffsetTop=$(this).offset().top-$(window).scrollTop();
                if(serveOffsetTop  <= parseFloat($(this).prev().css('height'))-50){
                    var id = $(this).attr('id');
                    $('[href="#'+id+'"]').parent().siblings().removeClass('active');
                    $('[href="#'+id+'"]').parent().addClass('active');
                }
            }
        })
    }
}
elevatorNav.init();










天青色等烟雨
而我在等你
炊烟袅袅升起
隔江千万里