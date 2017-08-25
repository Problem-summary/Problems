DOM 可以将任何 HTML 或 XML 文档描绘成一个由多层节点构成的结构。节点分为几种不同的类型，每种类型分别表示文档中不同的信息及（或）标记。每个节点都拥有各自的特点、数据和方法，另外也与其他节点存在某种关系。节点之间的关系构成了层次，而所有页面标记则表现为一个以特定节点为根节点的树形结构

文档节点只有一个子节点，即 <html> 元素，我们称之为**文档元素**。文档元素是文档的最外层元素，文档中的其他所有元素都包含在文档元素中。每个文
档只能有一个文档元素。在 HTML 页面中，文档元素始终都是 <html> 元素。在 XML 中，没有预定义的元素，因此任何元素都可能成为文档元素。

每一段标记都可以通过树中的一个节点来表示：HTML 元素通过元素节点表示，特性（attribute）通过特性节点表示，文档类型通过文档类型节点表示，而注释则通过注释节点表示。总共有 12 种节点类型(nodeType)，这些类型都继承自一个基类型。


元素节点查找方法
    方法                               说明
getElementById()              获取特定ID元素的节点;
getElementsByTagName()        获取相同元素的节点列表;
getElementsByName()           获取相同名称的节点列表;
getAttribute()                获取特定元素节点属性的值;
setAttribute()                设置特定元素节点属性的值;
removeAttribute()             移除特定元素节点属性;



1).write()方法
// write()方法可以把任意字符串插入到文档中去;
document.write('<p>这是一个段落!</p>'); // 解析后文字;

(2).createElement()方法
createElement()方法可以创建一个元素节点;
document.createElement('p'); // [object HTMLParagraphElement];

(3).appendChild()方法
appendChild()方法将一个新节点添加到某个节点的子节点列表的末尾上;
var box = document.getElementById('box');
var p = document.createElement('p'); // 创建一个新元素节点<p>;
box.appendChild(p); // 把新元素节点<p>添加子节点末尾;

(4).createTextNode()方法
该方法创建一个文本节点;
var text = document.createTextNode('段落');
p.appendChild(text); // 将文本节点添加到子节点末尾;


层次节点属性
    属性                         说明
childNodes             读取当前元素节点的所有子节点;
firstChild             读取当前元素节点的第一个子节点;
lastChild              获取当前元素节点的最后一个子节点;
ownerDocument          获取该节点的文档根节点,相当于document;
parentNode             获取当前节点的父节点;
previousSibling        获取当前节点的前一个同级节点;
nextSibling            获取当前节点的后一个同级节点;
attributes             获取当前元素节点的所有属性节点集合;


write()             这个方法可以把任意字符串插入到文档中;
createElement()     创建一个元素节点;
appendChild()       将新节点追加到子节点列表的末尾;
createTextNode()    创建一个文件节点;
insertBefore()      将新节点插入在前面;
replaceChild()      将新节点替换旧节点;
cloneNode()         复制节点;
removeChild()       移除节点;
