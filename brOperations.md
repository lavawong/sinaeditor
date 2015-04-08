|所在插件的名称|操作的function|传递的参数|作用|查询状态使用的id|
|:--------------------|:----------------|:--------------|:-----|:----------------------|
|backcolor|backcolor|{String} color 要修改的文字背景颜色。| 修改文字的背景颜色| backcolor 返回{String}当前的背景颜色值|
|bold|bold|无|加粗或者取消加粗文字(加粗时使用strong标签添加，取消加粗时是去strong标签和b标签，这里没有对样式的加粗做去除，即有可能出现失效的情况。)|bold 返回boolean，是否加粗|
|addFace|addFace| {String} src 要添加表情的图片地址| 添加表情 | 无|
|flashUI|insertFlash| 1.{String | Element} node 当前的节点html字符串，或者是节点。<br>2.{Boolean} focus 是否选中添加的flash<table><thead><th>添加flash节点</th><th>无</th></thead><tbody>
<tr><td>fontFamily</td><td>fontFamily</td><td>{String} fontFamily 要设置的字体值</td><td>对选中的文字设置字体</td><td>fontFamily 返回{String} 当前选中的文字的值</td></tr>
<tr><td>fontSize</td><td>fontSize</td><td>{String} fontSize 要设置的字体大小</td><td>对选中的文字设置文字大小</td><td>fontSize 返回{String} 当前选中的文字的字体大小值</td></tr>
<tr><td>forecolor</td><td>forecolor</td><td>{String} color 要修改的文字背景颜色。</td><td>修改文字的颜色</td><td>forecolor 返回{String} 当前选中的文字的颜色值</td></tr>
<tr><td>historyUI</td><td>saveData</td><td>无，返回boolean，是否保存成功</td><td>保存当前的文本内容到本地存储,每10分钟自动保存一次。</td><td>无</td></tr>
<tr><td>historyUI</td><td>loadData</td><td>{Integer} time 获取的对应时间 或者 不传递参数。 <br><br>返回{String} 保存指定时间保存的内容(不传递参数为最后保存的内容)</td><td>保存指定时间保存的内容(不传递参数为最后保存的内容)</td><td>无</td></tr>
<tr><td>historyUI</td><td>putData</td><td>{integer} time 要放入的时间，如果没有传递，则放入当前时间。</td><td>把存储的内容放入到编辑器内。</td><td>无</td></tr>
<tr><td>indent</td><td>indent</td><td>无</td><td>增加缩进</td><td>无</td></tr>
<tr><td>italic</td><td>italic</td><td>无</td><td>倾斜字体，或者取消倾斜字体</td><td>italic <br>返回booelan,判断是否已经是倾斜字体</td></tr>
<tr><td>justifycenter</td><td>justifycenter</td><td>无</td><td>文本居中显示</td><td>无</td></tr>
<tr><td>justifyleft</td><td>justifyleft</td><td>无</td><td>文本居左显示</td><td>无</td></tr>
<tr><td>justifyright</td><td>justifyright</td><td>无</td><td>文本居右显示</td><td>无</td></tr>
<tr><td>link</td><td>link</td><td>{Object} opt_obj 包含多种可选参数：<br>{<br>link:链接<br>str:文字<br>range:当前的选区<br>elm:传递的节点，一定是A标签，如果包含有link，那么则替换elm的地址，没有，那么删除A标签的地址}<br></td><td>添加链接或删除链接，根据参数传递的情况决定如何操作：<br>1.有选中文字：首先会清理掉里面所有的A标签<br>    a.不传递：检测选区中的a标签，全部清除。<br>    b.传递link：选区包裹上以A标签作为链接。<br>    c.传递link,str：忽略str,同操作1b。<br>2.没有选中文字：<br>    a.不传递：不做任何操作。<br>    b.传递link:以link作为str来生成链接<br>    c.传递link,str:添加链接。</td><td>无</td></tr>
<tr><td>markList</td><td>markList</td><td>无</td><td>添加项目符号(添加ul标签,无序项目符号)</td><td>无</td></tr>
<tr><td>numberList</td><td>numberList</td><td>无</td><td>添加项目符号(添加ol标签,有序项目符号)</td><td>无</td></tr>
<tr><td>outdent</td><td>outdent</td><td>无</td><td>减少缩进</td><td>无</td></tr>
<tr><td>redoManager</td><td>redo</td><td>无</td><td>重做刚才撤销的操作。</td><td>无</td></tr>
<tr><td>redoManager</td><td>undo</td><td>无</td><td>撤销刚才的操作。</td><td>无</td></tr>
<tr><td>redoManager</td><td>save</td><td>无</td><td>记录刚才的操作。</td><td>无</td></tr>
<tr><td>redoManager</td><td>clearRU</td><td>无</td><td>清理所有的历史记录信息。</td><td>无</td></tr>
<tr><td>showSource</td><td>swapData</td><td>{Boolean} toArea true时为从iframe到textarea</td><td>查看源代码。或者把源代码迁移到iframe中</td><td>无</td></tr>
<tr><td>tableUI</td><td>tableCreate</td><td>{Interget} x 行数<br>{Interget} y 列数<br></td><td>创建一个指定大小的table元素</td><td>无</td></tr>
<tr><td>underline</td><td>underline</td><td>无</td><td>添加下划线，或者取消下划线</td><td>underline 返回是否有下划线</td></tr>
<tr><td>addContent</td><td>addNode</td><td>{Element} node 要添加的节点。<br>{Booelan} focus 是否把焦点集中到新添的节点中</td><td>添加一个节点</td><td>无</td></tr>
<tr><td>addContent</td><td>addContent</td><td>{String} str 要添加的字符串。<br>{Booelan} focus 是否把焦点集中到新添的节点中</td><td>添加字符串到编辑器内</td><td>无</td></tr>
<tr><td>pasteFilter</td><td>pasteFilter</td><td><sub>无</sub>#1</td><td>对粘贴的内容进行过滤</td><td>无</td></tr>