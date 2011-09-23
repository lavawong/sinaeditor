
//插入链接的按钮
SinaEditor.plugins.add('qingLinkRemoveBtn',function(args){
    var editor = this;
	
	var btnConf = {
		title:'删除链接',
        normalClass: 'func_removelink',
        disabledClass: 'func_removelink_dis',
        clickedClass: 'func_removelink_act',
        mouseoverClass: 'func_removelink_hover',
        state: SinaEditor.BUTTONSTATE.DISABLED,
        group: 'lr'
    };
	
	btnConf = SinaEditor.util.mix(btnConf,args.btnConf);
	
	var btn = SinaEditor.ButtonFactory.createButton(btnConf,editor);
	
	editor.btns.qingLinkRemove = btn;
	
	var getChilds = function(node) {
		var nodes = node.childNodes,
			nodesArr = [],
			i=0;
		for(;nodes[i]; i++) {
			if(nodes[i].nodeType === SinaEditor.NODETYPE.ELEMENT) {
				nodesArr[nodesArr.length] = nodes[i];
			}
		}
		return nodesArr;
	};
	
	var clearElementA = function(container,doOper) {
		var childNodes = getChilds(container),
			i=0;
		for(;childNodes[i];i++) {
			if(childNodes[i].tagName.toUpperCase() === 'A') {
				if (doOper) {
					editor.operation.link({
						'elm': childNodes[i]
					});
				}
				return false;
			}
			clearElementA(childNodes[i],doOper);
		}
		return true;
	};
	
	return {
		"events": [{
            "element": btn.$,
            "events": {
                'click' : function() {
					if(editor.btns.qingLinkRemove.getState() === SinaEditor.BUTTONSTATE.DISABLED) {
						return false;
					}
					if(SinaEditor.env.$IE) {
						editor.operation.save(editor);
						editor.entyDoc.execCommand('unlink',false,'');
						editor.operation.save(editor);
						return false;
					} else {
						var range = SinaEditor.range.getCurrentRanges(editor.entyWin)[0],
							node = range.commonAncestorContainer,
							startContainer = range.startContainer,
							endContainer = range.endContainer;
						node = node.nodeType === SinaEditor.NODETYPE.TEXT ? node.parentNode : node;
						if (node && node.tagName) {
							if(node.tagName.toUpperCase() === 'A') {
								editor.operation.link({'elm':node});
								return false;
							}
							clearElementA(node,true);
							//node = node.parentNode;
						}
	                    return false;
					}
				}
            }
        },{
            "element": editor,
            "events": {
				'editorOnladed' : function(){
					btn.setState(SinaEditor.BUTTONSTATE.DISABLED);
				},
				'editorSelectionChange' : function() {
					var range = SinaEditor.range.getCurrentRanges(editor.entyWin)[0];
					if(range.collapsed) {
						btn.setState(SinaEditor.BUTTONSTATE.DISABLED);
						return;
					}
					
					btn.setState(SinaEditor.BUTTONSTATE.NORMAL);
					return;
					
						var	node = range.commonAncestorContainer;
						console.log(node);
						node = node.nodeType === SinaEditor.NODETYPE.TEXT ? node.parentNode : node;
						if (node && node.tagName) {
							if(node.tagName.toUpperCase() === 'A') {
								btn.setState(SinaEditor.BUTTONSTATE.NORMAL);
								return;
							}
							if(node.childNodes.length !== 1) {
								btn.setState(SinaEditor.BUTTONSTATE.DISABLED);
								return;
							}
							if(!clearElementA(node,false)) {
								btn.setState(SinaEditor.BUTTONSTATE.NORMAL);
								return;
							}
						}
						btn.setState(SinaEditor.BUTTONSTATE.DISABLED);
				}
            }
        }]
	};
});
