sass基础SASS是Ruby语言写的
是一个CSS预编译器

SASS文件就是普通的文本文件，里面可以直接使用CSS语法。文件后缀名是.scss，意思为Sassy CSS。


下面的命令，可以在屏幕上显示.scss文件转化的css代码。（假设文件名为test。）
　　sass test.scss
如果要将显示结果保存成文件，后面再跟一个.css文件名。
　　sass test.scss test.css

SASS提供四个编译风格的选项：
　　* nested：嵌套缩进的css代码，它是默认值。
　　* expanded：没有缩进的、扩展的css代码。
　　* compact：简洁格式的css代码。
　　* compressed：压缩后的css代码。
生产环境当中，一般使用最后一个选项。
　　sass --style compressed test.sass test.css
你也可以让SASS监听某个文件或目录，一旦源文件有变动，就自动生成编译后的版本。
　　// watch a file
　　sass --watch input.scss:output.css
　　// watch a directory
　　sass --watch app/sass:public/stylesheets
SASS的官方网站，提供了一个在线转换器。你可以在那里，试运行下面的各种例子。



SASS允许使用变量，所有变量以$开头。
　　$blue : #1875e7;　
　　div {
　　　color : $blue;
　　}
如果变量需要镶嵌在字符串之中，就必须需要写在#{}之中。
　　$side : left;
　　.rounded {
　　　　border-#{$side}-radius: 5px;
　　}