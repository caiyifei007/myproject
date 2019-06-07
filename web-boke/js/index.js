$(document).ready(function(){
	//文章分享部分实现点击切换效果
	$('.column .title li').click(function(){
		$(this).siblings('.active').removeClass('active');
		$(this).addClass('active');
		var number=$(this).attr('data-set');
		$('#show'+number).siblings('ul').hide();
		$('#show'+number).show();
	});
})