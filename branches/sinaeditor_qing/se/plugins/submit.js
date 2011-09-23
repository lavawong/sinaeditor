
//获取最终编辑的内容
SinaEditor.plugins.add('submit',function(args){
	var editor = this;
	
	/**
	 * 获取最终编辑的内容
	 * @return {String} 最终的html字符串
	 */
	editor.operation.submit = function(){
		var str = '',
			filter = editor.operation.pasteFilter || function(){};
			swapData = editor.operation.swapData || function(){};
		swapData(true);
		if(SinaEditor.env.$IE) {
			var tmpDiv = document.createElement('div');
			var before = editor.entyArea.value;
			tmpDiv.innerHTML = editor.entyArea.value;
			trace('~~~~~~~~~~~~~~~~~~~~'+(before === editor.entyArea.value));
			editor.entyArea.value = tmpDiv.innerHTML;
		}
		str = editor.entyArea.value;
		swapData(false);
		return str;
	};
});