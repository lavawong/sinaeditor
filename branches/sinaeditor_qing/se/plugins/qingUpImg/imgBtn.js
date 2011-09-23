
//上传图片
SinaEditor.plugins.add('imgFlashUIBtn',function(args){
    var editor = this;

	var btnConf = {
		title:'插入图片',
        normalClass: 'func_insertpic',
        disabledClass: 'func_insertpic',
        clickedClass: 'func_insertpic',
        state: SinaEditor.BUTTONSTATE.NORMAL,
        group: 'imgFlashUIBtn'
    };
	
	btnConf = SinaEditor.util.mix(btnConf,args.btnConf);
	
	var btn = SinaEditor.ButtonFactory.createButton(btnConf,editor);
	
	editor.btns.imgFlashUI = btn;
    /*
    return {
		'events' : [{
			"element": btn.$,
            "events": {
				'click' : function() {
				}
            }
		}]
	};
	*/
});
