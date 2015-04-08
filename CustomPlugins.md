# 自定义插件 #

> 当前开发的插件并不能满足所有的需求，所以有可能需要开发自定义的插件。

### 编写一个插件 ###

> 插件的编码形式如下：

```
        SinaEditor.plugins.add('plugin',function(args){
            var editor = this;
            
            //plugin 代码...
            
            return {
                'initialize':function(){
                    //...插件初始化时执行的代码。
                }
                ,'events' : [
                    //对应要绑定的元素
                    'element':Element,
                    'events' : {
                        {eventName:function(){}}
                        //...所有此元素要绑定的事件
                    }
                ]
            }
        });
```

> 插件的返回不是必须的，只是方便了您绑定的事件，**initialize\*函数会对一个编辑器触发一次，如果在一个页面上有多个编辑器时则要考虑**initialize\*中的全局变量。

### 完整的功能 ###

> 完全的功能一般最多由三个插件组成：
    1. 按钮插件(pluginUIBtn)，用于激活插件的逻辑部分。按照约定，按钮存放于_editor_.btns.pluginUI下。
    1. 浮层插件(pluginUIPanel)，或者对话框。有可能在点击了按钮后，并不会迅速触发逻辑，而是在用户选择数据后进行真正的逻辑触发。按照约定，浮层会存放于_editor_.panels.pluginUI下。
    1. 逻辑插件(plugin)，实际需要操作的逻辑。按照约定，存放于_editor_.operation.plugin下。

> 按钮，浮层都是必要的插件，如果需要，则是通过逻辑插件调用(_editor_.callPlugin)按钮插件和浮层插件实现联动的。

## helloworld ##

> 先来一个helloword的实例，当用户点击按钮后，弹出"helloworld"的提示。在/se/plugins/下创建helloworld.js的插件文件，代码非常的简单：
```
SinaEditor.plugins.add('helloworld',function(args){
    var editor = this;
    var btn = SinaEditor.ButtonFactory.createButton({
        title:'弹出hello world',
        //通常情况下的样式。
        //这里的逻辑默认为显示源代码的情况下，按钮为不可点击。
        //这里的样式可以在editor.css下添加
        normalClass: 'ico_hello_1',
        disabledClass: 'ico_hello_4',
        clickedClass: 'ico_hello_3',
        mouseoverClass: 'ico_hello_2',
        properties : {'innerHTML':'H'},
        state: SinaEditor.BUTTONSTATE.DISABLED,
        //定义为自己的组
        group: 'mine'
    },editor);
    //提供出按钮，方便其他插件可能的调用。
    editor.btns.helloworldUI = btn;
    return {
        'events' : [
            {
                //对应要绑定的元素
                'element':btn.$,
                'events' : {
                    'click':function(){
                        //当按钮的状态不是可以点击时，不响应任何事件。
                        if(btn.getState() === SinaEditor.BUTTONSTATE.DISABLED) {
                            return false;
                        }
                        alert('helloworld');
                        return false;
                    }
                }
            }
        ]
    }
});
```

> 这样就完成了一个插件的编写。

### 重新打包或者是直接添加 ###

> 如果插件会在多个页面同时使用，可以考虑把它打包到**sinaeditor.js\*中。如果只是临时添加，可以在**

&lt;script type="text/javascript" src="sinaeditor.js"&gt;



&lt;/script&gt;

下添加此js文件即可绑定：


`<script type="text/javascript" src="/se/plugins/helloworld.js"></script>`

### 如何在声明中使用此插件 ###

> 经过了上一步的操作，仅仅是在编辑器系统中添加了此插件，并没有实际应用到具体的编辑器中，您可以在创建编辑器时申明要调用此插件：

```
"plugns": [
//...其他插件
{"name": "helloworld"}
//...其他插件
]
```

这样，我们就可以看到效果了![http://sinaeditor.googlecode.com/svn/example/wiki-pic/custom-plugin01.jpg](http://sinaeditor.googlecode.com/svn/example/wiki-pic/custom-plugin01.jpg)。测试页面在[这里](http://sinaeditor.googlecode.com/svn/example/custom-plugin/helloworld.html)。

点击了按钮后，就会弹出提示，至此，自定义的插件就完成了。