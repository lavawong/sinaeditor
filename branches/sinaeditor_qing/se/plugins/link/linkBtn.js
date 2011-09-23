
//插入链接的按钮
SinaEditor.plugins.add('linkBtn',function(args){
    var editor = this;
	var linkPanel = editor.panels.link;
	var hidden = linkPanel.nodes.hidden;
	
	var btnConf = {
		title:'插入链接',
        normalClass: 'func_addlink',
        disabledClass: 'func_addlink_dis',
        clickedClass: 'func_addlink_act',
        mouseoverClass: 'func_addlink_hover',
        state: SinaEditor.BUTTONSTATE.DISABLED,
        group: 'la'
    };
	
	btnConf = SinaEditor.util.mix(btnConf,args.btnConf);
	
	var btn = SinaEditor.ButtonFactory.createButton(btnConf,editor);
	
	editor.btns.link = btn;
	
	return {
		"events": [{
            "element": btn.$,
            "events": {
                'click' : function() {
					if(editor.btns.link.getState() === SinaEditor.BUTTONSTATE.DISABLED) {
						return false;
					}
					var range = SinaEditor.range.getCurrentRanges(editor.entyWin)[0];
					var str = range.toString();
					if(SinaEditor.TOOLCONF.addLinkNow && SinaEditor.TOOLCONF.addLinkNow.test(str)) {
						editor.operation.link({'link':str,'range':range});
					} else {
//						var start = range.startContainer;
//						//要选中A
//						if(start)
//						
//						
//						linkNode.value = decodeURI(node.href);
//		_tmpNode = node;
//		linkPanel.show();
//						
//						if() {
//							editor.panels.link.nodes.linkNode.value = decodeURI(node.href);
//						}
						
						if(range.collapsed) {
							hidden.style.display = '';
						}
						linkPanel.show();
					}
                    return false;
				}
            }
        }]
	};
});
