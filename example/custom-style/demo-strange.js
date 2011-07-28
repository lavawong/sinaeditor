$(document).ready(function(){
	var btns = $('#strangeEditor .editor-btn');
	//id : [left,top]
	var locations = {};
	var parent = $('#strangeEditor');
	var parentPos = $('#strangeEditor').position();
	var doc = $(document);
	
	for(var i=0; btns[i]; i++) {
		var btn = $(btns[i]);
		var pos = btn.position();
		locations[btns[i].id] = [pos.left+14,pos.top+14];
		(function(b){
			b.fadeOut(2000,function(){
				b.css('opacity','0');
				b.css('display','');
			});
		})(btn);
	}
	
	parent.mousemove(function(e){
		//var scroll = SinaEditor.util.dom.getScrollPos();
		var left = e.clientX - parentPos.left + doc.scrollLeft();
		var top = e.clientY - parentPos.top + doc.scrollTop();
		for(var bid in locations) {
			var btn = locations[bid];
			var distance = parseInt(Math.sqrt((btn[0]-left)*(btn[0]-left)+(btn[1]-top)*(btn[1]-top)));
			if(distance <=100) {
				var o = 0.4;
				if(distance > 14) {
					o = 14*0.4/distance;
				}
				$('#'+bid).css('opacity',o);
			} else {
				$('#'+bid).css('opacity',0);
			}
		}
	});
});