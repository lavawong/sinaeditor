SinaEditor是基于新浪博客编辑器的开源编辑器。您可以用它来编辑富文本内容。

编辑器的核心是一个执行队列的调度系统，加入插件来实现功能，并通过事件来驱动编辑器的运行。我们对事件进行了一次封装，有效的解决了匿名事件函数不能回收的问题，减少内存占用的情况。

## 特性 ##

  1. 所有的功能基于插件方式编写。可以自由配置功能。
  1. 提供了Range的API。对IE的text range进行了标准的兼容及扩展，降低插件编写难度。
  1. 支持外观修改。可通过在修改或添加极少代码的情况下，让编辑器的呈现变得更个性化。

## 形态 ##

SinaEditor没有具体的形态，如果您一定要给它一个形态，这里有一个：

![http://sinaeditor.googlecode.com/svn/example/wiki-pic/head-pic01.png](http://sinaeditor.googlecode.com/svn/example/wiki-pic/head-pic01.png)

你可以到[这里](http://sinaeditor.googlecode.com/svn/example/custom-plugin/helloworld.html)来体验。

当然，如果你是一个有想象力的人，你也可以把它转换成这样：

![http://sinaeditor.googlecode.com/svn/example/wiki-pic/head-pic02.png](http://sinaeditor.googlecode.com/svn/example/wiki-pic/head-pic02.png)

也可以到[这里](http://sinaeditor.googlecode.com/svn/example/custom-style/demo.html)来实际体验一番。

所以，它在您心中怎么样，您可以通过修改css或者在插件加载时修改配置，修改按钮位置，它便可以从一个形态切换到你想要的形态。

## 授权 ##

SinaEditor是基于New BSD协议进行开发的，无论是个人开发还是商业应用，都可以免费使用。

## 感谢您使用 ##

SinaEditor的诞生还属于一次全新的尝试，目前还仅有一些比较基本的功能，但是在接下来的项目中，我们会添加更多的插件，并生产更多的个性化编辑主题。

我们的理想是：让互联网更加开放，编辑器功能更加完善。

我们也希望您能为我们的开源编辑器贡献更多的插件。

在使用过程中发现的bug或者建议，可以在[这里](http://code.google.com/p/sinaeditor/issues/list)提交，或者直接联系我们sinaopensrc#gmail.com。