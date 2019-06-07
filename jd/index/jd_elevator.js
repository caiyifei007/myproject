function getTop(elem){
  //声明变量sum，初始为elem的offsetTop
  var sum=elem.offsetTop;
  //反复判断elem的offsetParent不等于null,
  while(elem.offsetParent){
    //将elem.offsetParent的offsetTop累加到sum上
    sum+=elem.offsetParent.offsetTop;
    elem=elem.offsetParent;//将elem换成elem的offsetParent
  }//(遍历结束)
  return sum;//返回sum
}
window.addEventListener("load",function(){floor.init()});
var floor={
  UPLEVEL:0,//亮灯范围的上线距文档显示区顶部的距离
  DOWNLEVEL:0,//亮灯范围的下线距文档显示区顶部的距离

  distance:0,//保存本次移动的总距离
  DURATION:1000,//保存本次移动的总事件
  STEPS:100,//保存本次移动的总步数
  moved:0,//保存本次已经移动的步数，控制移动结束
  step:0,//保存每步移动的步长
  INTERVAL:0,//保存每步移动的时间间隔
  timer:null,//保存本次移动的序号

  init:function(){
    //计算INTERVAL为DURATION/STEPS
    this.INTERVAL=this.DURATION/this.STEPS;

    //获得id为f1的div，计算后的样式的height，转为浮点数，保存在变量fHeight中
    var fHeight=
      parseFloat(getComputedStyle($("#f1")).height);
    //计算UPLEVEL: (文档显示区的高-fHeight)/2
    this.UPLEVEL=(window.innerHeight-fHeight)/2;
    //计算DOWNLEVEL: UPLEVEL+fHeight;
    this.DOWNLEVEL=this.UPLEVEL+fHeight;
    //为window绑定onscroll事件，提前绑定this
    window.addEventListener(
      "scroll",this.checkLight.bind(this));
    //为id为elevator的div下的ul，绑定鼠标进入事件
    $("#elevator>ul").addEventListener(
      "mouseover",this.showEtitle);
    //为id为elevator的div下的ul，绑定鼠标移出事件
    $("#elevator>ul").addEventListener(
      "mouseout",this.hideEtitle);
    //为id为elevator的div下的ul，绑定单击事件为move，提前绑定this
    $("#elevator>ul").addEventListener(
      "click",this.move.bind(this));
  },
  move:function(e){//负责准备并启动一个动画
    //如果目标元素是a
    if(e.target.nodeName=="A"){
      if(this.timer!=null){//如果timer不是null
        //停止动画，timer置为null，moved归0
        clearTimeout(this.timer);
        this.timer=null;
        this.moved=0;
      }
      //获得当前网页滚动的scrollTop
      var scrollTop=document.body.scrollTop;
      //获得目标元素的父元素下的第一个a元素的内容，转为整数保存在变量i中
      var i=parseInt(
        e.target.parentNode.firstElementChild.innerHTML);
      //查找id为fi下的header下的span，保存在span中
      var span=$("#f"+i+">header>span")
      //获得span距离页面顶部的距离，保存在totalTop中
      var totalTop=getTop(span);
      //计算distance为: totalTop-UPLEVEL-scrollTop
      this.distance=totalTop-this.UPLEVEL-scrollTop;
      //计算step为: distance/STEPS
      this.step=this.distance/this.STEPS;
      //启动一次性定时器，将moveStep作为任务函数，提前绑定this，时间间隔设置为INTERVAL，将序号保存到timer中
      this.timer=setTimeout(
        this.moveStep.bind(this),this.INTERVAL  
      );
    }
  },
  moveStep:function(){//移动一步
    scrollBy(0,this.step);//让当前窗口滚动一个step
    this.moved++;//将moved+1
    if(this.moved<this.STEPS){//如果moved<STEPS
      //启动一次性定时器，将moveStep作为任务函数，提前绑定this，时间间隔设置为INTERVAL，将序号保存到timer中
      this.timer=setTimeout(
        this.moveStep.bind(this),this.INTERVAL  
      );
    }else{//否则
      //停止定时器，timer置为null，moved归0
      clearTimeout(this.timer);
      this.timer=null;
      this.moved=0;
    }
  },
  showEtitle:function(e){//显示当前li下的etitle的a
    var target=e.target;//先获得目标元素target
    //如果target是a,让target变为target的父节点(li)
    target.nodeName=="A"&&(target=target.parentNode);
    if(target.nodeName=="LI"){//如果target是li
      //在target下找第1个a，将其隐藏
      target.$("a:first-child").style.display="none";
      //在target下找第2个a，将其显示
      target.$("a:first-child+a").style.display="block"
    }
  },
  hideEtitle:function(e){//隐藏当前li下的etitle的a
    var target=e.target;//先获得目标元素target
    //如果target是a,让target变为target的父节点(li)
    target.nodeName=="A"&&(target=target.parentNode);
    if(target.nodeName=="LI"){//如果target是li
      //获得target下第一个a元素的内容，转为整数，保存在变量i中
      var i=parseInt(
        target.$("a:first-child").innerHTML
      );
      var span=//id为f+i下的header下的span
                $("#f"+i+">header>span");
      //如果span的class不是hover
      if(span.className!="hover"){
        //在target下找第1个a，将其显示
        target.$("a:first-child").style.display="block";
        //在target下找第2个a，将其隐藏
        target.$("a:first-child+a").style.display="none"
      }
    }
  },
  checkLight:function(){//检查每个楼层中span的亮/灭状态
    //获得当前页面滚动的距离，保存在变量scrollTop中
    var scrollTop=document.body.scrollTop;
    //获得所有class为floor下的header下的直接子节点span，保存在变量spans中
    var spans=$(".floor>header>span");
    for(var i=0;i<spans.length;i++){//遍历spans中每个span
      //用getTop方法获得当前span距页面顶部的总距离，保存在变量totalTop中,
      var totalTop=getTop(spans[i]);
      //用totalTop-scrollTop，将结果保存在变量innerTop
      var innerTop=totalTop-scrollTop;
      
      //查找id为elevator下的ul下的所有li中下标为i的li，保存在变量li中
      var li=$("#elevator>ul>li")[i];
      //在li下找第1个a，保存在变量a1中
      var a1=li.$("a:first-child");
      //在li下找第2个a，保存在变量a2中
      var a2=li.$("a:first-child+a");

      //如果innerTop>=UPLEVEL且innerTop<=DOWNLEVEL
      if(innerTop>=this.UPLEVEL&&innerTop<=this.DOWNLEVEL){
        //将当前span的class设置为hover
        spans[i].className="hover";
        //设置a1隐藏，a2显示
        a1.style.display="none";
        a2.style.display="block";
      }else{//否则
        spans[i].className="";//清除当前span的class
        //设置a1显示，a2隐藏
        a1.style.display="block";
        a2.style.display="none";
      }
    }
    //查找class为floor下的header下的class为hover的span，保存在变量lightSpan中
    var lightSpan=$(".floor>header>span.hover");
    //设置id为elevator的div的display，如果lightSpan不是null，就设置为block，否则设置为none
    $("#elevator").style.display=
      lightSpan!=null?"block":"none";
  }
}