
//轻博客的历史版本
SinaEditor.plugins.add('qingHistory',function(args){
	var editor = this;
	
	var uid = args.id || 0;
	var storage = SinaEditor.$abstract.Storage;
	
	/**
	 * 保存文本，根据ID进行绑定。
	 */
	editor.operation.qingSaveData = function() {
		storage.clear();
		editor.operation.submit();
		storage.setItem('qing_data_'+scope.$uid,encodeURIComponent(editor.entyArea.value));
		console.log("qingSaveData:"+decodeURIComponent(storage.getItem('qing_data_'+scope.$uid)));
	};
	
	/**
	 * 获取数据文本数据。
	 * @param {Integer} time 获取的对应时间。
	 * @return {String} 如果没有次参数，返回最新的内容。
	 */
	editor.operation.qingLoadData = function() {
		var str = storage.getItem('qing_data_'+scope.$uid);
		if(str) {
			editor.entyArea.value = decodeURIComponent(decodeURIComponent(str));
			try{
				editor.operation.swapData(false);
			} catch(e){
				console.log(e);
			}
		}
		console.log("qingLoadData:"+editor.entyArea.value);
	};
	
	editor.operation.qingClearAllData = function() {
		storage.clear();
	};
	
	return {
        "events": [{
            "element": editor,
            "events": {
				'editorStateChange' : function() {
					if(this.getState() === SinaEditor.STATE.CREATED) {
						if(scope.$pageid === 'index') {
							editor.operation.qingLoadData();
						}
					}
				}
            }
        },{
            "element": window,
            "events": {
				'beforeunload' : function() {
					try {
						if(scope.$pageid === 'index') {
							//编辑器是直接被替换的，而不是删除，所以判断一下是不是被删除了。
							editor.operation.qingSaveData();
						}
					} catch (e) {}
				}
            }
        }]
    };
});