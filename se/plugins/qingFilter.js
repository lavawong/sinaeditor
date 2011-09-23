
//粘贴过滤

SinaEditor.plugins.add('qingFilter', function(args){
    var editor = this;
	var filterTag = {'SCRIPT':1,'INPUT':1,'IFRAME':1,'TEXTAREA':1,'INPUT':1,'BUTTON':1,'OBJECT':1,'EMBED':1};
	var noFilterTag = {'STRONG': 1,'B': 1,'IMG': 1,'P': 1,'A' : 1};
    editor.operation.pasteFilter = function(){
		filterForbidden();
        //try {
			var start = editor.entyDoc.createElement('span');
			start.innerHTML = '&nbsp;';
			editor.entyBody.insertBefore(start,editor.entyBody.firstChild);
			var end = editor.entyDoc.createElement('span');
			end.innerHTML = '&nbsp;';
			editor.entyBody.appendChild(end);
			_getNextNode(start,end,function(elm){
				if(elm.nodeType === 1) {
					var up = elm.tagName.toUpperCase();
					if(noFilterTag[up]) {
						elm.style.cssText = '';
						return;
					}
					if(up === 'DIV') {
						var ta = elm.style.textAlign;
						elm.style.cssText = 'text-align:'+ ta;
						return;
					}
					if(up !== 'BR') {
						SinaEditor.util.dom.removeTag(elm);
					}
				}
			});
			start.parentNode.removeChild(start);
			end.parentNode.removeChild(end);
		//} catch(e){console.log(e);}
    };
	
	
	/**
     * 深度优先遍历节点
     * @param {Object} begin 起始节点，肯定是BOOKMARK的起始点
     * @param {Object} end 结束节点，BOOKMARK的结束点
     * @param {Function} func 回调函数
     */
    var _getNextNode = function(begin, end, callBack){
        var current = __getNextElement(begin, true);
		//debugger;
        while (current && current != end) {
            //保留第一个元素，当它被摧毁时(如删除这个标签)，可以依然找到下一个节点
            var handleEle = current;
            current = __getNextElement(current);
			if(handleEle.nodeType === SinaEditor.NODETYPE.TEXT || (handleEle.nodeType === SinaEditor.NODETYPE.ELEMENT && !SinaEditor.util.dom.containsNode(handleEle,end))) {
				callBack(handleEle);
			}
        }
    };
    
    /**
     * 获得下一个可用的节点
     * 1.有子节点。返回第一个子节点。
     * 2.无子节点：
     * 	a.有下一个兄弟节点。返回下一个兄弟节点。
     * 	b.无下一个兄弟节点。向上到父节点，再进行判断。
     * @param {Object} elm 当前节点
     * @return {Element} 下一个可用的节点，出现问题直接抛出异常
     */
    var __getNextElement = function(elm, skipChildren){
        //首先检测是不是有子节点
        if (elm.hasChildNodes() && !skipChildren) {
            var firstEl = elm.firstChild;
            if (firstEl) {
                return firstEl;
            }
        }
        //查找兄弟节点
        var nextEl = elm.nextSibling;
        while (!nextEl) {
            nextEl = elm.parentNode;
            //父节点肯定有tagName
			if (nextEl.tagName.toUpperCase() == 'HTML') {
                //到达了最高级
                throw '确定在遍历节点时有结束标记的节点?';
            }
            //鸡肋
            elm = nextEl;
            nextEl = elm.nextSibling;
        }
        return nextEl;
    };
	
	
	var filterForbidden = function(){
		var i=0,
			tags = editor.entyBody.getElementsByTagName('*');
		while(tags[i]) {
			if(tags[i].nodeType === 1 && filterTag[tags[i].tagName.toUpperCase()]) {
				SinaEditor.util.dom.removeTag(tags[i]);
				i--;
			}
			i++;
		}
	};
    
    return {
        "events": [{
            "element": editor.entyBody,
            "events": {
                'paste': function(e){
					//#BLOGBUG-12321 safari下，焦点在table内，从word粘贴会跳出，原因是粘贴出了和<tr>标签并列的<p>标签。延迟。
                    setTimeout(function(){
						var i=0,tds;
						editor.operation.pasteFilter();
                    }, 10);
                }
            }
        }]
    };
});
