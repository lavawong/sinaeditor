
//插入链接
SinaEditor.plugins.add('link',function(args){
    var editor = this;
    var btn = null;
    
    if (!args.customerPanel) {
       editor.callPlugin({
			'name' : 'qingLinkPanel',
			'args' : args
		});
    }
	
	if (!args.customerBtn) {
       editor.callPlugin({
			'name' : 'linkBtn',
			'args' : args
		});
    }
    
    /**
     * 添加链接，根据参数传递的情况决定如何操作
     * 1.有选中文字：首先会清理掉里面所有的A标签
     * 	a.不传递：检测选区中的a标签，全部清除。
     * 	b.传递link：选区包裹上以A标签作为链接。
     * 	c.传递link,str：忽略str,同操作1b。
     * 2.没有选中文字：
     * 	a.不传递：不做任何操作。
     * 	b.传递link:以link作为str来生成链接
     * 	c.传递link,str:添加链接。
     * @param {Object} opt_obj 包含多种可选参数：
     * 	link 链接
     * 	str 文字
     * 	range 当前的选区
     * 	elm 传递的节点，一定是A标签，如果包含有link，那么则替换elm的地址，没有，那么删除A标签的地址
     */
    editor.operation.link = function(optObj){
		editor.focus();
        var range = optObj.range || SinaEditor.range.getCurrentRanges(editor.entyWin)[0];
		var link = optObj.link;
		var str = optObj.str || link;
		var zeroBlank = editor.entyDoc.createDocumentFragment(),
				tmp = editor.entyDoc.createElement('div');
		tmp.innerHTML = SinaEditor.env.$IE ? '' : '&#8203;';
		zeroBlank = tmp.firstChild;
		
        if (!link && !range) {
            //2a.不传递：不做任何操作。
			console.log("2a.不传递：不做任何操作。");
            return;
        }
        
        editor.operation.save(editor);
		
		if(optObj.elm) {
			var elm = optObj.elm;
			if(optObj.link) {
				//更换标签的src
				elm.href = encodeURI(optObj.link);
				range.selectNodeContents(elm);
				SinaEditor.range.applyRanges(editor.entyWin, range);
			} else {
				//清除A标签
				SinaEditor.util.dom.removeTag(elm);
			}
		} else {
			var a = SinaEditor.util.dom.createDom('a', {
						ownerDocument: editor.entyDoc,
			            properties: {
			                'target': '_blank'
			            }
			        });
			link = link.indexOf('://') === -1 ? 'http://'+link : link;

			try {
				a.href = encodeURI(link);
				if(window._linkElm) {
					if(window._linkElm.parentNode && window._linkElm.parentNode.href) {
						window._linkElm.parentNode.href = a.href;
						return;
					}
					window._linkElm.parentNode.insertBefore(a,window._linkElm);
					a.appendChild(window._linkElm);
					window._linkElm = null;
					editor.focus();
					return;
				}
			} catch(e){trace(e)}

	        if (!range || range && range.collapsed) {
	            //2b,c.添加链接。 
				a.innerHTML = str;
				a.href = encodeURI(link);
	            //range ? range.insertNode(a) : editor.entyBody.appendChild(a);
				if(range) {
					range.insertNode(a);
					if (!SinaEditor.env.$IE) {
						SinaEditor.util.dom.insertAfter(zeroBlank,a);
						range.selectNodeContents(zeroBlank);
						range.collapse(false);
						editor.focus();
					} else {
						range.selectNodeContents(a);
					}
				} else {
					editor.entyBody.appendChild(a);
					range.selectNodeContents(a);
				}
				SinaEditor.range.applyRanges(editor.entyWin, range);
	        } else {
				//1a：检测选区中的a标签，全部清除。
				editor.entyDoc.execCommand('unlink',false,'');
				var range = SinaEditor.range.getCurrentRanges(editor.entyWin)[0];
				var bookMark = new SinaEditor.range.createBookmark(editor,{'range':range});
				//debugger;
				
				if(SinaEditor.env.$IE) {
					bookMark.start = SinaEditor.range.breakParent.call(editor, bookMark.start,true);
					bookMark.end = SinaEditor.range.breakParent.call(editor, bookMark.end,true);
				} else {
					bookMark.end = SinaEditor.range.breakParent.call(editor, bookMark.end,true);
                	bookMark.start = SinaEditor.range.breakParent.call(editor, bookMark.start,true);
				}

				SinaEditor.util.dom.insertAfter(a,bookMark.start);
				
				var getNext = function(elm) {
					var next = elm.nextSibling,
						current = elm;
					while(!next) {
						current = current.parentNode;
						next = current.nextSibling;
					}
					return next;
				};
				
				var next = getNext(a);
				
				//debugger;
				
				while(next !== bookMark.end) {
					if(next.nodeType === SinaEditor.NODETYPE.ELEMENT) {
						switch(next.tagName.toUpperCase()) {
							case 'BR':
								if(a.childNodes.length !== 0) {
									a = a.cloneNode(false);
								}
								SinaEditor.util.dom.insertAfter(a, next);
								next = a;
								break;
							case 'DIV' : 
							case 'P':
								if (next.parentNode.tagName.toUpperCase() === 'BODY') {
									if(a.childNodes.length !== 0) {
										a = a.cloneNode(false);
									}
									next.insertBefore(a, next.childNodes[0]);
									next = a;
								}
								else {
									a.appendChild(next);
								}
								break;
							default :
								a.appendChild(next);
								break;
						}
					} else {
						a.appendChild(next);
					}
					next = getNext(next);
				}
				
				bookMark.start.parentNode.removeChild(bookMark.start);
				bookMark.end.parentNode.removeChild(bookMark.end);
				
				if(a.childNodes.length === 0 && a.parentNode && zeroBlank) {
					SinaEditor.util.dom.insertAfter(zeroBlank,a);
					a.parentNode.removeChild(a);
					range.selectNodeContents(zeroBlank);
					range.collapse(false);
					editor.focus();
				}
	        }
		}
        
        editor.operation.save(editor);
    };
});
