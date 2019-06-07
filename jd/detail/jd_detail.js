window.$=HTMLElement.prototype.$=function (selector){
		var elem=(this==window?document:this).querySelectorAll(selector);
		return  elem.length==0?null:elem.length==1?elem[0]:elem;

}
function showItems(){
	  this.$("[id$=_items]").style.display="block";
	  this.$("b+a").className="hover";
}
function hideItems(){
	 this.$("[id$=_items]").style.display="none";
	  this.$("b+a").className="";
}
window.onload=function (){
//	var app_jd=document.querySelector(".rt li.app_jd");
//	var service=document.querySelector(".rt li.servicre");
	$(".app_jd").addEventListener("mouseover",showItems);
	$(".app_jd").addEventListener("mouseout",hideItems);
	$('.service').addEventListener("mouseover",showItems);
	$('.service').addEventListener("mouseout",hideItems);
	$("#category").addEventListener("mouseover",showSub1);
	$("#category").addEventListener("mouseout",hideSub1);
	$("#cate_box").addEventListener("mouseover",showSub2);
	$("#cate_box").addEventListener("mouseout",hideSub2);
	$("#product_detail>.main_tabs").addEventListener("click",change);
	 zoom.init();
}


function showSub1(){
this.$("#cate_box").style.display="block";
}
function hideSub1(){
this.$("#cate_box").style.display="none";
} 
function showSub2(e){
		var target=e.target;
		if (target.id!="cate_box")
		{
			while(!(target.nodeName=="LI"&&target.parentNode.id=="cate_box"))
			{
					target=target.parentNode;
				}
				target.$(".sub_cate_box").style.display="block";
				target.$("h3").calssName="hover";
		}
}
function hideSub2(e){
		var target=e.target;
		if (target.id!="cate_box")
		{
			while(!(target.nodeName=="LI"&&target.parentNode.id=="cate_box"))
			{
				target=target.parentNode;
			}
				target.$(".sub_cate_box").style.display="none";
				target.$("h3").calssName="hover";
			
		}
}


function change(e){
	var target=e.target;
	target.nodeName=="A"&&(target.parentNode);
	if (target.nodeName=="LI"&&target.ClassName!="current")
	{
		this.$(".current").className="";
		target.className="current";
		var containers=$("#product_detail>[id^='product_']");
		for(var i=0;i<containers.length;i++){
		  containers[i].style.display="none";
		
		}
		 var i=target.dataset.i;
		 i!="comment"&&($("#product_"+i).style.display="block");
}
}


var  zoom={
		WIDTH:0,
		OFFSET:0,
		moved:0,
		count:0,
		MAX:0,
		MSIZE:0,
		init:function (){
			this.MSIZE=parseFloat(getComputedStyle($("#mask")).width);
			this.MAX=parseFloat(getComputedStyle($("#superMask")).height)-this.MSIZE;
			this.WIDTH=parseFloat(getComputedStyle($("#icon_list>li:first-child")).width);
			this.OFFSET=parseFloat(getComputedStyle($("#icon_list")).left);
			this.count=$("#icon_list>li").length;
			$("#preview>h1>.forward").addEventListener("click",this.moveLeft.bind(this));
			$("#preview>h1>a:first-child").addEventListener("click",this.moveRight.bind(this));
			$("#icon_list").addEventListener("mouseover",this.changeImg);
			$("#superMask").addEventListener("mouseover",this.showMask);
			$("#superMask").addEventListener("mouseout",this.hideMask);
			$("#superMask").addEventListener("mousemove",this.moveMask.bind(this));
		},

		moveMask:function(e){
			var x=e.offsetX,y=e.offsetY;
			var top=y-this.MSIZE/2;
			var left=x-this.MSIZE/2;
			top=top<0?0:top>this.MAX?this.MAX:top;
			left=left<0?0:left>this.MAX?this.MAX:left;
			$("#mask").style.left=left+"px";
			$("#mask").style.top=top+"px";
			$("#largeDiv").style.backgroundPosition=(-left*16/7)+"px "+(-top*16/7)+"px";   
		},
			showMask:function (){
			mask.style.display="block";
			largeDiv.style.display="block";
			//获得mImg的src，保存在变量src中
			var src=$("#mImg").src;
			//获得最后一个.的位置，保存在变量i中
			var i=src.lastIndexOf(".");
			//设置largeDiv的背景图片为:
			$("#largeDiv").style.background="url("+(src.slice(0,i-1)+"l"+src.slice(i))+")";
		  //src的0~i-1的子字符串+l+src的i到结尾的剩余字符串
		},
		hideMask:function(){
				mask.style.display="none";
			largeDiv.style.display="none";
		},

		changeImg:function(e){
			if (e.target.nodeName=="IMG")
			{
				var src=e.target.src;
				var i=src	.lastIndexOf(".");
				$("#mImg").src=src.slice(0,i)+"-m"+src.slice(i);
			}
		},
			moveRight:function(e){
			if (e.target.className.indexOf("_disabled")==-1)
			{
				this.moved--;
				$("#icon_list").style.left=-1*this.moved*this.WIDTH+this.OFFSET+"px";
				this.checkA();
			}
		},
			checkA:function(){
			if (this.count-this.moved==5)
			{
				$("#preview>h1>.forward").className+="_disabled";
			}else if(this.moved==0){
				$("#preview>h1>.backward").className+="_disabled";
			}else{
				$("#preview>h1>a:first-child").className="backward";
				$("#preview>h1>a:first-child+a").className="forward";
			}
		},
			moveLeft:function (e){
			if (e.target.className.indexOf("_disabled")==-1)
			{
				this.moved++;
				$("#icon_list").style.left=-1*this.moved*this.WIDTH+this.OFFSET+"px";
				this.checkA();
			}
		},
}

