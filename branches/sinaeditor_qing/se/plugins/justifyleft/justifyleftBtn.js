
//居左
SinaEditor.plugins.add('justifyleftBtn',function(args){
	var editor = this;
	
	var btnConf = {
		title:'居左',
		normalClass : 'func_left'
		,disabledClass : 'func_left'
		,clickedClass : 'func_left_hover'
		,mouseoverClass : 'func_left_hover'
		,state : SinaEditor.BUTTONSTATE.DISABLED
		,group : 'l'
	};
	
	btnConf = SinaEditor.util.mix(btnConf,args.btnConf);
	
	var btn = SinaEditor.ButtonFactory.createButton(btnConf,editor);
	
	editor.btns.justifyleft = btn;
	
    return {
        'initialize': function(){
        },
        "events": [{
            "element": btn.$,
            "events": {
				'click' : function() {
					if(btn.getState() === SinaEditor.BUTTONSTATE.DISABLED) {
						return false;
					}
					editor.operation.justifyleft();
					return false;
				}
            }
        }]
    };
});