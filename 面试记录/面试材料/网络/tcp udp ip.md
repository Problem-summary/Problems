首先知道TCP是一种面向连接的、可靠的、基于字节流的运输层（Transport layer）通信协议。是专门为了在不可靠的互联网络上提供一个可靠的端到端字节流而设计的。每一次TCP连接都需要三个阶段：连接建立、数据传送和连接释放。“三次握手”就发生在连接建立阶段。


4.协议栈的层次划分：7层网络模型，4层网络模型，每一层有哪些协议：
 

5.网络数据抓包工具有哪些？
答：Wireshark ，Fiddler，network monitor

 

6，TCP UDP的区别？什么使用用TCP，什么时候用UDP？
答：首先传输控制协议TCP是一种面向连接的、可靠的、基于字节流的运输层（Transport layer）通信协议。是专门为了在不可靠的互联网络上提供一个可靠的端到端字节流而设计的。

用户数据报协议UDP是 ISO 参考模型中一种无连接的传输层协议，提供面向操作的简单不可靠的非连接传输层服务。

他们之间有三方面区别：

第一：TCP是基于连接的，可靠性高;UDP基于无连接，可靠性较低。

第二：由于TCP是连接的通信，需要有三次握手、重新确认等连接过程，会有时延，实时性差；同时过程复杂，也使其易于被攻击；而UDP无连接，无建立连接的过程，因而实时性较强，也稍安全。

 第三：在传输相同大小的数据时，TCP首部开销20字节;UDP的首部开销小，只有8个字节，TCP报头比UDP复杂，故实际包含的用户数据较少。TCP无丢包，而UDP有丢包，故TCP的开销大，UDP开销较小。

第四：每一条TCP连接只能是点到点的;UDP支持一对一，一对多，多对一和多对多的交互通信
应用方面：

 1.由于TCP的实时性差，故对实时性要求高和高速传输的场合需用UDP。

 2.TCP适用于传输大量数据，对可靠性要求高的环境；而在可靠性要求较低，追求效率时可用UDP。

   

7.IP,端口号，网关，DNS，路由，掩码作用？

答：1、IP是能使连接到网上的所有计算机网络实现相互通信的一套规则，规定了计算机在因特网上进行通信时应当遵守的规则。任何厂家生产的计算机系统，只要遵守IP协议就可以与因特网互连互通。

2：端口号：在网络技术中，端口（Port）大致有两种意思：一是物理意义上的端口，比如，ADSL Modem、集线器、交换机、路由器用于连接其他网络设备的接口。二是逻辑意义上的端口，一般是指TCP/IP协议中的端口，端口号的范围从0到65535，比如用于浏览网页服务的80端口，用于FTP服务的21端口，通俗话来说端口号就好比你家的门牌号，端口就是把你家的门，有了这个端口号，送信员就知道这座楼那个门送了。。

 

3、网关:用于两个高层协议不同的网络互连。网关是一种充当转换重任的计算机系统或设备。使用在不同的通信协议、数据格式或语言，甚至体系结构完全不同的两种系统之间，网关是一个翻译器。与网桥只是简单地传达信息不同，网关对收到的信息要重新打包，以适应目的系统的需求。

4，DNS：因特网上作为域名和IP地址相互映射的一个分布式数据库，能够使用户更方便的访问互联网，而不用去记住能够被机器直接读取的IP数串。

 

5.路由：是指把数据从一个地方传送到另一个地方的行为和动作。


6.子网掩码的作用，就是将某个IP地址划分成网络地址和主机地址两部分。