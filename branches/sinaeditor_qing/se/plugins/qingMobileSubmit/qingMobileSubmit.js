
//通过textarea的代码提交进行的转换。
SinaEditor.plugins.add('qingMobileSubmit',function(args){
	var editor = this;
	
	/**
	 * 获取最终编辑的内容
	 * @return {String} 最终的html字符串
	 */
	editor.operation.submit = function(){
		return editor.entyArea.value;
	};
});