
//居中
SinaEditor.plugins.add('justifycenterBtn',function(args){
	var editor = this;

	var btnConf = {
		title:'居中',
		normalClass : 'func_center'
		,disabledClass : 'func_center'
		,clickedClass : 'func_center_hover'
		,mouseoverClass : 'func_center_hover'
		,state : SinaEditor.BUTTONSTATE.DISABLED
		,group : 'c'
	};
	
	btnConf = SinaEditor.util.mix(btnConf,args.btnConf);
	
	var btn = SinaEditor.ButtonFactory.createButton(btnConf,editor);
	
	editor.btns.justifycenter = btn;
	
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
					editor.operation.justifycenter();
					return false;
				}
            }
        }]
    };
});