CSS 相关问题
display:none和visibility:hidden的区别？

display:none  隐藏对应的元素，在文档布局中不再给它分配空间，它各边的元素会合拢，
就当他从来不存在。

visibility:hidden  隐藏对应的元素，但是在文档布局中仍保留原来的空间。



position的absolute与fixed共同点与不同点

	A：共同点：
	1.改变行内元素的呈现方式，display被置为block；2.让元素脱离普通流，不占据空间；3.默认会覆盖到非定位元素上

	B不同点：
	absolute的”根元素“是可以设置的，而fixed的”根元素“固定为浏览器窗口。当你滚动网页，fixed元素与浏览器窗口之间的距离是不变的。



介绍一下CSS的盒子模型？

	1）有两种， IE 盒子模型、标准 W3C 盒子模型；IE的content部分包含了 border 和 pading;

	2）盒模型： 内容(content)、填充(padding)、边界(margin)、 边框(border).


列出display的值，说明他们的作用。position的值， relative和absolute分别是相对于谁进行定位的？

	1.   
 	 block 象块类型元素一样显示。
  	inline 缺省值。象行内元素类型一样显示。
  	inline-block 象行内元素一样显示，但其内容象块类型元素一样显示。
  	list-item 象块类型元素一样显示，并添加样式列表标记。

  2. 
  *absolute 
        生成绝对定位的元素，相对于 static 定位以外的第一个祖先元素进行定位。 

  *fixed （老IE不支持）
        生成绝对定位的元素，相对于浏览器窗口进行定位。 

  *relative 
        生成相对定位的元素，相对于其在普通流中的位置进行定位。 

  * static  默认值。没有定位，元素出现在正常的流中
  *（忽略 top, bottom, left, right z-index 声明）。

  * inherit 规定从父元素继承 position 属性的值。







为什么要初始化CSS样式。

	因为浏览器的兼容问题，不同浏览器对有些标签的默认值是不同的，如果没对CSS初始化往往会出现浏览器之间的页面显示差异。

    当然，初始化样式会对SEO有一定的影响，但鱼和熊掌不可兼得，但力求影响最小的情况下初始化。

*最简单的初始化方法就是： * {padding: 0; margin: 0;} （不建议）

    淘宝的样式初始化： 
    body, h1, h2, h3, h4, h5, h6, hr, p, blockquote, dl, dt, dd, ul, ol, li, pre, form, fieldset, legend, button, input, textarea, th, td { margin:0; padding:0; }
    body, button, input, select, textarea { font:12px/1.5tahoma, arial, \5b8b\4f53; }
    h1, h2, h3, h4, h5, h6{ font-size:100%; }
    address, cite, dfn, em, var { font-style:normal; }
    code, kbd, pre, samp { font-family:couriernew, courier, monospace; }
    small{ font-size:12px; }
    ul, ol { list-style:none; }
    a { text-decoration:none; }
    a:hover { text-decoration:underline; }
    sup { vertical-align:text-top; }
    sub{ vertical-align:text-bottom; }
    legend { color:#000; }
    fieldset, img { border:0; }
    button, input, select, textarea { font-size:100%; }
    table { border-collapse:collapse; border-spacing:0; }



对BFC规范的理解？

	BFC，块级格式化上下文，一个创建了新的BFC的盒子是独立布局的，盒子里面的子元素的样式不会影响到外面的元素。在同一个BFC中的两个毗邻的块级盒在垂直方向（和布局方向有关系）的margin会发生折叠。
    （W3C CSS 2.1 规范中的一个概念，它决定了元素如何对其内容进行布局，以及与其他元素的关系和相互作用。）



解释下 CSS sprites，以及你要如何在页面或网站中使用它。
	
	CSS Sprites其实就是把网页中一些背景图片整合到一张图片文件中，再利用CSS的“background-image”，“background- repeat”，“background-position”的组合进行背景定位，background-position可以用数字能精确的定位出背景图片的位置。这样可以减少很多图片请求的开销，因为请求耗时比较长；请求虽然可以并发，但是也有限制，一般浏览器都是6个。对于未来而言，就不需要这样做了，因为有了`http2`。