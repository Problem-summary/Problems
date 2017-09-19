jQuery Mobile 是创建移动 web 应用程序的框架。

jQuery Mobile 适用于所有流行的智能手机和平板电脑。

jQuery Mobile 使用 HTML5 和 CSS3 通过尽可能少的脚本对页面进行布局。



jQuery Mobile Tap

	tap 事件在用户敲击某个元素时触发。

	下面的例子当 <p> 元素上触发 tap 事件时，隐藏当前 <p> 元素：
	实例

	$("p").on("tap",function(){
 	 $(this).hide();
	});


jQuery Mobile Taphold

	taphold 事件在用户敲击某个元素并保持一秒时被触发：
	实例

	$("p").on("taphold",function(){
 	 $(this).hide();
	});


jQuery Mobile Swipe

	swipe 事件在用户在某个元素上水平滑动超过 30px 时被触发：
	实例

	$("p").on("swipe",function(){
  		$("span").text("Swipe detected!");
	});
