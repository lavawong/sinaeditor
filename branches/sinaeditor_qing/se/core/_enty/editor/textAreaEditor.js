if(!SinaEditor._) {
	SinaEditor._ = {};
}

if(!SinaEditor._.entyimpl) {
	SinaEditor._.entyimpl = {};
}

/**
 * 针对移动设备的编辑器，继承自{@link SinaEditor.$abstract.baseEditor}
 * @class 通常用的编辑器
 */
SinaEditor._.entyimpl.textAreaEditor = function(){
	/**
	 * 用于初始化一些函数
	 */
	this.entyWin = true;
}.$extends(SinaEditor.$abstract.baseEditor).$define({
	/**
     * 焦点集中到编辑器中。
     * @memberOf SinaEditor.$abstract.baseEditor#
     */
	focus : function() {
		this.entyArea.focus();
	}
});