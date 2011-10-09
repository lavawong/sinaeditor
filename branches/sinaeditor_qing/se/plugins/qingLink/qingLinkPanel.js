
//插入链接的弹出浮层，专为轻博客重写的编辑器
SinaEditor.plugins.add('qingLinkPanel',function(args){
    var editor = this;
	
    var linkPanel = SinaEditor.winDialog.create({
        title: '添加链接',
        content: SinaEditor.TOOLCONF.qingLinkTemplate,
		funcClose:function(){
			_back();
		}
    });
	
    linkPanel.setMiddle();
    linkPanel.setFixed(true);
    linkPanel.nodes.content.className = 'editLink';
    var okNode = linkPanel.nodes.ok;
    var cancelNode = linkPanel.nodes.cancel;
    var textNode = linkPanel.nodes.text;
	var hiddNode = linkPanel.nodes.hidden;
    var linkNode = linkPanel.nodes.link;
	var _tmpNode;
    
	var _back = function() {
		hiddNode.style.display = 'none';
		_tmpNode = null;
        textNode.value = '';
		linkNode.value = '';
	};
	
	editor.panels.link = linkPanel;
	
	//link浮层的代码
    SinaEditor.CONF.aBubbleModify = function(node) {
		linkNode.value = decodeURI(node.href);
		_tmpNode = node;
		linkPanel.show();
	};
	
	SinaEditor.CONF.aBubbleDelete = function(node) {
		editor.operation.link({'elm':node});
	};
	
    return {
        "events": [{
            "element": okNode,
            "events": {
                'click': function(){
					if(SinaEditor.util.trim(linkNode.value)) {
						editor.operation.link({
							'link' : linkNode.value,
							'str' : textNode.value,
							'elm' : _tmpNode
						});
					}
					_back();
					linkPanel.hidden();
                }
            }
        },{
            "element": cancelNode,
            "events": {
                'click': function(){
                    _back();
        			linkPanel.hidden();
                }
            }
        },{
			"element": linkNode,
            "events": {
                'focus': function(){
					this.className = 'focus';
                },
				'blur': function(){
					this.className = '';
                },
				'keydown':function(e){
					var which = e.which || e.keyCode || e.charCode;
					if(which === 13) {
						if(hiddNode.style.display !== '') {
							SinaEditor.ev.stopEvent(e);
							SinaEditor.ev.fire(okNode,'click');
							return false;
						} else {
							textNode.focus();
						}
					}
				}
            }
		},{
			"element": textNode,
            "events": {
                'focus': function(){
					this.className = 'focus';
                },
				'blur': function(){
					this.className = '';
                },
				'keydown':function(e){
					var which = e.which || e.keyCode || e.charCode;
					if(which === 13) {
						SinaEditor.ev.stopEvent(e);
						SinaEditor.ev.fire(okNode,'click');
						return false;
					}
				}
            }
		}]
    };
});
