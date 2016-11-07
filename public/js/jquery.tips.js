$.tips = function(text, type, time){
	var tip_elem = $('<div class="tips_elem" style="width:580px;height:54px;position:fixed;background-color:#39ce25;color:#FFF;line-height:54px;text-align:center;border-radius:8px;left:50%;margin-left:-290px;top:120px;font-size:16px;font-family:Microsoft Yahei;z-index:10002;"><span class="tip_icon" style="display:inline-block;width:27px;height:27px;vertical-align:middle;margin-right:8px;"></span><span class="tip_text"></span></div>');
	tip_elem.find('.tip_text').text(text);
	if(type == 1){
		//操作成功
		tip_elem.css('background-color', '#39ce25').find('.tip_icon').css('background-image', 'url(/js/tips/succ.png)');
	}
	else{
		//操作失败1
		tip_elem.css('background-color', '#ff5f5f');
	}
	var t = 3000;
	//设置显示时间
	if(typeof time == 'number'){console.log(1);
		t = time;
	}else{

	}
	$(document.body).append(tip_elem);
	setTimeout(function(){
		tip_elem.fadeOut(1000, function(){
			tip_elem.remove();
		});
	}, t);
}