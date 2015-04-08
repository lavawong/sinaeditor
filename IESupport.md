# SinaEditor从0.9.5版开始支持IE浏览器了 #

> SinaEditor添加了一个对IE的textRange进行兼容的插件[ierange-m2.js](http://sinaeditor.googlecode.com/svn/tags/sinaeditor_0.9.5/ierange-m2.js)，根据[IERange](http://code.google.com/p/ierange/)进行了更细的修改和优化，减少了多次对range的连续操作造成的错误。以插件的形式做兼容，这样可以使核心的代码最小化。目前尚处于待测试状态，但是已经兼容IE6,7,8,9全系列浏览器。


# 新增加的重要文件 #

> 在0.9.5版中，增加了两个比较重要的文件，[ierange-m2.js](http://sinaeditor.googlecode.com/svn/tags/sinaeditor_0.9.5/ierange-m2.js)和[ierange-m2\_raw.js](http://sinaeditor.googlecode.com/svn/tags/sinaeditor_0.9.5/ierange-m2_raw.js)(ierange-m2.js压缩后的文件)，这个在初始化时(像[initFromStatic.js](http://sinaeditor.googlecode.com/svn/tags/sinaeditor_0.9.5/se/plugins/initFromStatic.js)这样的的初始化文件)会被加载到编辑器的iframe中，这样，就可以在IE下使用标准的W3Crange了。线上使用可以使用压缩后的文件，调试时可以切换到ierange-m2.js中。

# 注意事项 #

> 由于仅是模拟w3c range,目前还是会有以下的一些无法避免的问题，需要在开发插件的情况下尽量规避这些已知的风险：

  1. inaeditor的operation操作之前，需要对编辑器<font color='red'><b>进行focus()操作</b></font>。由于IE的一个页面,同一时间下，仅允许出现一个选区，所以，当有浮层弹出等需要失去焦点进行操作的情况下，需要让编辑器再被focus，而后再进行对应的操作，否则有可能会<font color='red'>操作失败</font>。因为我们在onbeforedeactivate事件发生时(移出焦点时)记录了当前的选区，当需要进行操作时需要吧range再赋值回来，所以在onactivate事件发生时返回之前的选区。而onactivate事件需要通过编辑器获取焦点时触发。
  1. ange.setStart(container,offset),range.setEnd(container,offset)方法中，<font color='red'>如果offset大于节点的字数，会选中别的节点</font>。而在w3c range 中会报错。为了提升效率，这里并没有做跨节点的判断。<font color='red'>container如果是文本节点(nodeType为3)，那么必须是父节点的第一个子节点，否则会定位错误</font>。
  1. ange.selectNode(refNode)方法中，<font color='red'>不要确信它的修正后的选区是正确的</font>。如果refNode是**块元素**，它的选区是不可靠的，例如refNode为：< p>test< /p>。我们使用此方法的理想情况是：|< p>test< /p>|。但是很有可能range会变成:< p>|test< /p>|。如果P标签元素前有节点，我们可以尽心二次修正。而如果它的前面没有的话，最好还是使用原生的方法，插入占位节点，操作完成后再移除，这里需要规避此风险造成的程序不稳定现象。
  1. ange.extractContents()和range.deleteContents()方法要<font color='red'>慎用</font>。它极有可能会破坏的是别的创建出来的range的startContianer或者endContianer。这样会造成未知的错误。定位起来也比较困难。
  1. ange.createContextualFragment(tagString)方法未实现。
  1. ange.detach()方法未实现。
  1. ange.cloneContents()方法方法没有实现。