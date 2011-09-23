
//上传图片
SinaEditor.plugins.add('imgFlashUI',function(args){
    var editor = this;
	//传递的类来自：
	//$import("comps/publish/upimgflash.js");
	var upImgObj = args.upImgObj;
	editor.callPlugin({
		'name' : 'imgFlashUIBtn',
		'args' : args
	});

	editor.operation.resetUpImg = function(){
		var __this = this;
		var upImgBtn = editor.btns.imgFlashUI.$;
		upImgObj.setBtn(upImgBtn.parentNode, onFileSelect, onFileComplete, onAllComplete, onError, 20);
		function onFileSelect(){
			//trace("onFileSelect");
			dis_form();
		}
		
		function onFileComplete(fileName, picInfo){
			//trace("onFileComplete");
			var __info = Core.String.j2o(picInfo);
			var frage = editor.entyDoc.createDocumentFragment();
			var img = editor.entyDoc.createElement('img');
			img.src = __info.original_pic.replace("/large/", "/mw600/");
			img.className = 'long_pic';
			img.onload = function(){
				if(img.width>500) {
					img.width = 500;
				}
			};
			editor.operation.addNode(img);
			return;
		}
		function onAllComplete(){
			//trace("onAllComplete");
			//window.editor.insertHTML("<br />");
			nor_form();
		}
		function onError(){
			//trace("onError");
			nor_form();
		}
		// 切换按钮状态
		function nor_form(){
			//trace("nor_form");
			upImgBtn.className = "func_insertpic";
			upImgBtn._disabled = false;
			editor.operation.resetUpImg();
			//先focus标题输入框，解决中文输入时上传图片后不能输入中文的bug
			//__this.nodes.inputTitle.focus();
			
			editor.blur();
			editor.focus();
			//trace("after focus127");
		}
		function dis_form(){
			//trace("dis_form");
			upImgBtn.className = "func_loading";
			upImgBtn._disabled = true;
			upImgObj.minize();
		}
	};
	
	editor.operation.resetUpImg();
});
