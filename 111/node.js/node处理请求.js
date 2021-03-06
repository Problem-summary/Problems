当回调启动，我们的 onRequest() 函数被触发的时候，有两个参数被传入：request 和 response 。

它们是对象，你可以使用它们的方法来处理HTTP请求的细节，并且响应请求（比如向发出请求的浏览器发回一些东西）。

所以我们的代码就是：当收到请求时，使用 response.writeHead() 函数发送一个HTTP状态200和HTTP头的内容类型（content-type），使用 response.write() 函数在HTTP相应主体中发送文本“Hello World"。

最后，我们调用 response.end() 完成响应。

目前来说，我们对请求的细节并不在意，所以我们没有使用 request 对象。

服务端的模块放在哪里

OK，就像我保证过的那样，我们现在可以回到我们如何组织应用这个问题上了。我们现在在 server.js 文件中有一个非常基础的HTTP服务器代码，而且我提到通常我们会有一个叫 index.js 的文件去调用应用的其他模块（比如 server.js 中的HTTP服务器模块）来引导和启动应用。

我们现在就来谈谈怎么把server.js变成一个真正的Node.js模块，使它可以被我们（还没动工）的 index.js 主文件使用。

也许你已经注意到，我们已经在代码中使用了模块了。像这样：

var http = require("http");

...

http.createServer(...);
node.js中自带了一个叫做“http”的模块，我们在我们的代码中请求它并把返回值赋给一个本地变量。

这把我们的本地变量变成了一个拥有所有 http 模块所提供的公共方法的对象。

给这种本地变量起一个和模块名称一样的名字是一种惯例，但是你也可以按照自己的喜好来：

var foo = require("http");

...

foo.createServer(...);
很好，怎么使用Node.js内部模块已经很清楚了。我们怎么创建自己的模块，又怎么使用它呢？

等我们把 server.js 变成一个真正的模块，你就能搞明白了。

事实上，我们不用做太多的修改。把某段代码变成模块意味着我们需要把我们希望提供其功能的部分 导出 到请求这个模块的脚本。

目前，我们的HTTP服务器需要导出的功能非常简单，因为请求服务器模块的脚本仅仅是需要启动服务器而已。

我们把我们的服务器脚本放到一个叫做 start 的函数里，然后我们会导出这个函数。

var http = require("http");

function start() {
  function onRequest(request, response) {
    console.log("Request received.");
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello World");
    response.end();
  }

  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
}

exports.start = start;
这样，我们现在就可以创建我们的主文件 index.js 并在其中启动我们的HTTP了，虽然服务器的代码还在 server.js 中。

创建 index.js 文件并写入以下内容：

var server = require("./server");

server.start();
正如你所看到的，我们可以像使用任何其他的内置模块一样使用server模块：请求这个文件并把它指向一个变量，其中已导出的函数就可以被我们使用了。

好了。我们现在就可以从我们的主要脚本启动我们的的应用了，而它还是老样子：

node index.js
非常好，我们现在可以把我们的应用的不同部分放入不同的文件里，并且通过生成模块的方式把它们连接到一起了。

我们仍然只拥有整个应用的最初部分：我们可以接收HTTP请求。但是我们得做点什么——对于不同的URL请求，服务器应该有不同的反应。

对于一个非常简单的应用来说，你可以直接在回调函数 onRequest() 中做这件事情。不过就像我说过的，我们应该加入一些抽象的元素，让我们的例子变得更有趣一点儿。

处理不同的HTTP请求在我们的代码中是一个不同的部分，叫做“路由选择”——那么，我们接下来就创造一个叫做 路由 的模块吧。