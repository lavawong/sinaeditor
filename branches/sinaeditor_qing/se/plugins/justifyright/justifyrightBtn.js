
//减少缩进
SinaEditor.plugins.add('justifyrightBtn',function(args){
	var editor = this;

	var btnConf = {
		title:'居右',
		normalClass : 'func_right'
		,disabledClass : 'func_right'
		,clickedClass : 'func_right_hover'
		,mouseoverClass : 'func_right_hover'
		,state : SinaEditor.BUTTONSTATE.DISABLED
		,group : 'r'
	};
	
	btnConf = SinaEditor.util.mix(btnConf,args.btnConf);
	
	var btn = SinaEditor.ButtonFactory.createButton(btnConf,editor);
	
	editor.btns.justifyright = btn;
	
    return {
        "events": [{
            "element": btn.$,
            "events": {
				'click' : function() {
					if(btn.getState() === SinaEditor.BUTTONSTATE.DISABLED) {
						return false;
					}
					editor.operation.justifyright();
					return false;
				}
            }
        }]
    };
});