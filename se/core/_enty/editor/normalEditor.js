if(!SinaEditor._) {
	SinaEditor._ = {};
}

if(!SinaEditor._.entyimpl) {
	SinaEditor._.entyimpl = {};
}

/**
 * 通常的编辑器类，继承自{@link SinaEditor.$abstract.baseEditor}
 * @class 通常用的编辑器
 */
SinaEditor._.entyimpl.normalEditor = function(){
	/**
	 * 实体对象，即编辑器的iframe节点。
	 */
	this.enty = null;
	/**
	 * iframe的window对象引用。
	 */
	this.entyWin = null;
	/**
	 * iframe的document对象引用。
	 */
	this.entyDoc = null;
	/**
	 * iframe的body节点引用。
	 */
	this.entyBody = null;
}.$extends(SinaEditor.$abstract.baseEditor).$define({
	/**
     * 焦点集中到编辑器中。
     * @memberOf SinaEditor.$abstract.baseEditor#
     */
	focus : function() {
		this.entyWin.focus();
	}
});