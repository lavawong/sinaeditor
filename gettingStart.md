# 欢迎使用 #

> 欢迎您选择SinaEditor，希望它能给您带来全新的编辑体验和插件编写的成就感。本章是一个快速入门的手册，希望您在阅读完以后可以快速上手。目前SinaEditor暂**~~不支持IE浏览器#1~~**，我们将会引入另一个开源项目[ierange](http://code.google.com/p/ierange/)，并进行二次开发。稍后的版本中，我们会尽快完善此功能！

# 快速开始 #

> 在您下载完成SinaEditor后，解压，待用。

## 1.拷贝文件 ##

> 拷贝**style文件夹**(样式和图片)和**sinaeditor\_min.js**(压缩后的编辑器JS文件)到项目的合适的路径下。这些就完成文件的拷贝了。

## 2.修改配置 ##

> ### a.图片路径的配置 ###

> 打开sinaeditor\_min.js，在30行位置，或者搜索:

> `var href = window.location.href;`

> 可以把：
```
var href = window.location.href;
var loc = href.substring(0,href.lastIndexOf('/'));
SinaEditor.CONF.STYLELOC = loc+'/style/';
SinaEditor.CONF.transparentIMG = SinaEditor.CONF.STYLELOC+"imgs/SG_line.gif";
SinaEditor.CONF.fakeFLASH = SinaEditor.CONF.STYLELOC+"imgs/fake_flash.png";
```
> 替换为：
```
SinaEditor.CONF.STYLELOC = 你的style文件存放的路径。
SinaEditor.CONF.transparentIMG = SinaEditor.CONF.STYLELOC+"imgs/SG_line.gif";
SinaEditor.CONF.fakeFLASH = SinaEditor.CONF.STYLELOC+"imgs/fake_flash.png";
```

> 这样，图片的位置就配置完毕了，不会出现找不到图片的问题。

> ### b.部分插件的配置 ###

> 在381行左右,或者搜索：

```
'<form target="#{clientIframe}" id="#{clientForm}" action="postImg.php" method="POST" enctype="multipart/form-data">',
```

> 把其中的 **action** 设置到指定的位置，这样，在使用上传图片组件时，即可上传到后端中。

> 更多的配置信息，您可以参阅代码中的注释。这些配置信息未打包的se/core/init/default.js下。

## 3.设置配置引用 ##

> 接下来就可以在要使用的页面中配置了，首先是引入样式：
```
<!-- 编辑器的样式 -->
<link href="http://%STYPE_PATH%/style/css/editor.css" type="text/css" rel="stylesheet" />
<!-- 浮层，按钮的样式 -->
<link href="http://%STYPE_PATH%/style/css/panel.css" type="text/css" rel="stylesheet" />
<!-- 编辑器的代码 -->
<script type="text/javascript" src="http://%JAVASCRIPT_PATH%/sinaeditor_min.js"></script>
```

> 代码和样式引入完毕，还得把编辑器的位置选定，让它在指定的地方生成编辑器。您可以这边编写编辑器的渲染节点：

```
<!-- 用来控制编辑器的宽 -->
<div style="width:800px">
    <!-- 留给编辑器渲染按用 -->
    <div class="pro_tools" id="testSaveButtons"></div>
    <!-- 渲染编辑器的实体外壳 -->
    <div id="frame" style="height:400px;border:1px solid;">
        <textarea id="frameToText" class="se_textarea"></textarea>
    </div>
</div>
```

> 这样，到创建编辑器时，就会把按钮添加到 _testSaveButtons_ 的div下，编辑器则会嵌入 _frame_ 下。

## 4.创建编辑器 ##

> 经过前面的三步，还有最后一步，配置并创建编辑器。这里有一套默认的配置信息：

```
var config = {
    //编辑器的ID
    "id": "myEditor",
    //编辑器的按钮存放的base dom id 或者dom
    "toolBase": 'testSaveButtons',
    "initType": {
        "name": "initFromStatic",
        "args": {
            "parent": document.getElementById('frame')
        }
    },
    //粘贴进编辑器要过滤的节点
    "filter": {
        "name": "pasteFilter",
        "args": {
            "tagName": "SCRIPT|INPUT|IFRAME|TEXTAREA|SELECT|BUTTON",
            "noFlashExchange": false,
            "attribute": "id"
        }
    },
    //使用哪个类来初始化编辑器
    "editorName": 'SinaEditor._.entyimpl.normalEditor',
    "styles": "body {\
                    margin:0px;\
                    padding:0px;\
                    width:100%;\
                    height:100%;\
                }\
                .biaoqing {\
                    width:22px;\
                    height:22px;\
                }",
    "styleLinks": ['http:/%STYLE_PATH%/style/css/contests.css'],
    //编辑器使用的插件。
    "plugns": [{
        "name": "addContent"
    },{
        "name": "showSource",
        "args": {
            "entyArea": document.getElementById('frameToText')
        }
    },
    {
        "name": "link"
    },{
        "name": "backcolor"
    },
    {
        "name": "forecolor"
    }, {
        "name": "underline"
    },{
        "name": "italic"
    }, {
        "name": "bold"
    }, {
        "name": "linkBubble"
    }, {
        "name": "imgBubble"
    }, {
        "name": "flashBubble"
    }, {
        "name": "redoManager"
    }, {
        "name": "fontFamily"
    }, {
        "name": "fontSize"
    }, {
        "name": "markList"
    }, {
        "name": "numberList"
    }, {
        "name": "indent"
    }, {
        "name": "outdent"
    }, {
        "name": "justifyright"
    }, {
        "name": "justifycenter"
    }, {
        "name": "justifyleft"
    }, {
        "name": "imgUI"
    }, {
        "name": "flashUI"
    }, {
        "name": "tableUI"
    }, {
        "name": "faceUI"
    },{
        "name": "historyUI",
        "args" : {
            "id" : 1
        }
    }]
};
//调用SinaEditor.createEditor来创建编辑器
var editor = SinaEditor.createEditor(config);
```

> 注意，这段代码必须要等到 **sinaeditor\_min.js** 下载完成和编辑器的HTML着床点完成初始化后执行，否则会导致创建失败。这样，您就完成了一次简单的SinaEditor的部署和创建工作。如果您还想对文件部分解更多的细节部分，可以继续前往[FileAnalyze](FileAnalyze.md)进行阅读。

注：
#1：从SinaEditor 0.9.5 beta开始，已经基本支持IE系列浏览器。

