# 目录结构 #

> 下载压缩包后，解压后，文件的目录结构如下：

> ![http://sinaeditor.googlecode.com/svn/example/wiki-pic/file-analyze01.jpg](http://sinaeditor.googlecode.com/svn/example/wiki-pic/file-analyze01.jpg)

## se文件夹 ##

> se文件夹下是所有零散的js文件，这个稍后再做详细的分析。

## style文件夹 ##

> style文件夹下有编辑器必须的样式和图片。style/css下文件的作用分别是：

| **文件名称** | **主要用途** |
|:-----------------|:-----------------|
|contents.css|非必选样式，编辑器的iframe内body的样式，可以修改成最终页的样式进行替换，这样编辑时的呈现更接近最终效果。|
|editor.css|编辑器要使用的样式，按钮的样式等，建议自定义的插件按钮样式可以放到这里面来。|
|panel.css|浮层的样式，一些弹出浮层的样式和对话框的样式。|

> contents.css这个文件的自定义概率比较高。


## build.xml ##

> SinaEditor基于[ant](http://ant.apache.org/)进行合并操作，把se文件下的所有js文件合并成大文件sinaeditor.js。所以build.xml就是ant合并文件的配置文件。如果您要[自定义插件](http://code.google.com/p/sinaeditor/wiki/CustomPlugins)，也希望合并到大文件中，通过查看配置可以看到：

```
<!-- 初始化插件资源 -->
<fileset dir="${src.dir}">
    <include name="plugins/**/*.js" />
</fileset>
```

> 所以建议自定义的插件可以放在plugins/文件夹下，这样可以在不修改build.xml文件的情况下把新增的插件合并到sinaeditor.js中。

> 关于更多的[ant](http://ant.apache.org/)的配置，可以参考[ant](http://ant.apache.org/)页面的内容。

## example.html ##

> 作用如其名，一个快速可以双击使用的html文件，您可以通过example.html来了解[如何快速配置](http://code.google.com/p/sinaeditor/wiki/gettingStart)sinaeditor到您的项目中。

## sinaeditor.js ##

> 经过ant合并后的大文件，里面也包含注释,方便开发人员进行调试。

## sinaeditor\_min.js ##

> sinaeditor.js经过[Closure Compiler](http://code.google.com/intl/zh-CN/closure/compiler/)部分压缩后的版本。比较神奇的地方是，如果您也要使用它混淆时， **SinaEditor.TOOLCONF.COLOR** 这个JSON对象会被破坏掉('000000'被解析成0)。所以如果要自己混淆代码的话，请特别注意一下。