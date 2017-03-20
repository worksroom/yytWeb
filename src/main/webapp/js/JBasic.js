(function($) {
	$.JBasic = function() {

		this.settings = $.extend(true, {}, $.JBasic.defaults);
		this.init();
	};
	$.extend($.JBasic, {
		defaults : {//变量绑定
			ua_result : null,
			loading_init:false,
			loading_css:"http://www.youguu.com/resource/css/loading.css",
			loading_img:"http://img.youguu.com/resource/img/loading.png",
			download_div:null,
			download_zw:null, //添加下载占位层
			ua_def:{
				platform: 'unknown',
				app: 'unknown',
				version: 'unknown',
				ak: 'unknown',
				userid: '-1',
				sessionid: '-1'
			}
		},
		prototype : {
			init:function(){
				this.initUaData();
			},
			winHeight:function(){
				return $(window).height();
			},
			divHeight:function(div){
				return $(div).outerHeight();
			},
			toast:function(str){
				var toastPos=$("<div></div>");
				toastPos.css({
					"position":"fixed",
					"bottom":"60px",
					"width":"100%",
					"z-index": "1000"
				});
				var toast_div = $("<div></div>");
				var hfontSize = $('html').css("font-size");
				var radius = (4/parseFloat(hfontSize))+"rem";
				var lineHeight = (21/parseFloat(hfontSize))+"rem";
				var padding = (5/parseFloat(hfontSize))+"rem";
				var fontSize = (15/parseFloat(hfontSize))+"rem";
				var shadow1 = (1/parseFloat(hfontSize))+"rem";
				var shadow2 = (2/parseFloat(hfontSize))+"rem";
				var shadow3 = (5/parseFloat(hfontSize))+"rem";
				toast_div.css({
					"display": "-webkit-box",
					"display": "-webkit-flex",
					"display": "flex",
					"flex-wrap": "wrap",/*标准版本项目换行*/
					"-webkit-flex-flow": "row wrap",/*混合版本项目换行*/
					"-webkit-box-pack": "center",
					"box-pack":"center",
					"-webkit-justify-content": "center",/*新版本水平居中*/
					"justify-content": "center",
					"width":"60%",
					"border-radius":radius,
					"line-height":lineHeight,
					"padding":padding,
					"background":"#5A5A5A",
					"z-index": "1000",
					"text-align":"center",
					"color":"#ffffff",
					"font-size":fontSize,
					"margin":"0 auto",
					"box-shadow": "0 0 0 #fff,"+shadow1+" "+shadow2+" "+shadow3+" rgba(69, 69, 69, 0.3),0 0 0 #fff,"+shadow1+" "+shadow2+" "+shadow3+" rgba(69, 69, 69, 0.3)"
				});
				toast_div.html(str);
				$(document.body).append(toastPos);
				toastPos.append(toast_div);
				setTimeout(function(){
					toastPos.remove();
				},3000);
			},
			toast2:function(str){
				var toastPos=$("<div></div>");
				toastPos.css({
					"position":"fixed",
					"bottom":"0.75rem",
					"width":"100%",
					"z-index": "1000"
				});
				var toast_div = $("<div></div>");
				toast_div.css({
					"display": "-webkit-box",
					"display": "-webkit-flex",
					"display": "flex",
					"flex-wrap": "wrap",/*标准版本项目换行*/
					"-webkit-flex-flow": "row wrap",/*混合版本项目换行*/
					"-webkit-box-pack": "center",
					"box-pack":"center",
					"-webkit-justify-content": "center",/*新版本水平居中*/
					"justify-content": "center",
					"width":"60%",
					"border-radius":"0.2rem",
					"line-height":"0.525rem",
					"padding":"0.375rem",
					"background":"#5A5A5A",
					"z-index": "1000",
					"text-align":"center",
					"color":"#ffffff",
					"font-size":"0.75rem",
					"margin":"0 auto",
					"box-shadow": "0 0 0 #fff,1px 0.05rem 0.125rem rgba(69, 69, 69, 0.3),0 0 0 #fff,1px 0.05rem 0.125rem rgba(69, 69, 69, 0.3)"
				});
				toast_div.html(str);
				$(document.body).append(toastPos);
				toastPos.append(toast_div);
				setTimeout(function(){
					toastPos.remove();
				},3000);
			},
			downloadDiv:function(dir){ //下载
				dir = dir || "bottom";
				var _this = this;
				if(!_this.settings.download_div){
					function oldDownload(){
						//console.log(dir);
						_this.settings.download_div = $('<div id="downloadDiv"></div>');
						_this.settings.download_div.css({
							"position":"fixed",
							"left":"0",
							"z-index":16777271,
							"width":"100%",
							"max-width":"600px",
							"-webkit-tap-highlight-color":"transparent",
							"box-sizing":"border-box"
						});
						if(dir == 'top'){
							_this.settings.download_div.css({
								top:'0'
							});
						}else{
							_this.settings.download_div.css({
								bottom:'0'
							});
						}
						_this.settings.download_div.append("<a href='http://download.youguu.com/download/mncg_code.html'>"
							//+ "<img src='http://img.youguu.com/resource/img/download.png' id='down_img' />" + "</a>");
							+ "<img src='http://img.youguu.com/resource/img/new-download-img.jpg' id='down_img' />" + "</a>");
						$(document.body).append(_this.settings.download_div);
						if(dir == 'top'){
							$("body").css("padding-top",(_this.settings.download_div[0].offsetWidth*(126/750))+"px");
						}else{
							$("body").css("padding-bottom",(_this.settings.download_div[0].offsetWidth*(126/750))+"px");
						}
					}
					function newDownload(){
						//console.log(dir);
						_this.settings.download_div = $('<div id="downloadDiv"></div>');
						_this.settings.download_div.css({
							position:'fixed',
							left:'0',
							"z-index":16777271,
							width:'100%',
							height:'auto',
							overflow:'hidden'
						});
						if(dir == 'top'){
							_this.settings.download_div.css({
								top:'0'
							});
						}else{
							_this.settings.download_div.css({
								bottom:'0'
							});
						}
						var imgDom = $('<a href="http://download.youguu.com/download/mncg_code.html">' +
							'<img id="download_img" src="http://img.youguu.com/resource/img/new-download-img.jpg"></a>');
						_this.settings.download_div.append(imgDom);
						_this.settings.download_div.find('a').css({
							display:'block',
							width:'100%',
							overflow:'hidden'
						});
						_this.settings.download_div.find('img').css({
							width:'100%',
							border:'0 none',
							float:'left'
						});
						$(document.body).append(_this.settings.download_div);
						_this.settings.download_zw = $('<div id="download-zw"></div>');
						_this.settings.download_zw.css({
							width:'100%',
							height:'3.15rem'
						});
						if(dir == 'top'){
							$(document.body).prepend(_this.settings.download_zw);
						}else{
							$(document.body).append(_this.settings.download_zw);
						}
					}
					//console.log($(document.documentElement).css('fontSize'));
					if($(document.documentElement).css('fontSize') == '12px'){
						oldDownload();
					}else{
						newDownload();
					}
				}else{
					_this.settings.download_div.show();
				}
			},downloadDivHide:function() { //隐藏
				var _this = this;
				if(_this.settings.download_div){
					_this.settings.download_div.hide();
					//需要把占位层也隐藏
					_this.settings.download_zw&&_this.settings.download_zw.hide();
					//之前的隐藏没有做body去掉padding 这里加上
					$("body").css("padding",'0');
				}
			},
			getQueryString:function(key){
				var reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)', 'i');
				var r = window.location.search.substr(1).match(reg);
				if (r !== null) {
					return unescape(r[2]);
				}
				return null;
			},
			initUaData:function(){
				if(!this.settings.ua_result){
					var ua = navigator.userAgent.toLowerCase();
					var info = ua.match(/jhss{1}(\/.+)+/g);
					if(info){
						var infos = info[0].split('/');
						this.settings.ua_result = {
							platform: infos[1] || 'unknown',
							app: infos[2] || 'unknown',
							version: info[3] || 'unknown',
							ak: infos[4] || 'unknown',
							userid: infos[5] || '-1',
							sessionid: infos[6] || '-1'
						};
					}
				}
			},
			getUaData:function(key){
				var _this = this;
				var result = this.settings.ua_result == null ? this.settings.ua_def:this.settings.ua_result;
				return result[key];
			},
			getUaHeadParam:function(){
				var headParam = new Object();
				//headParam.userid = this.getUaData("userid");
				//headParam.ak = this.getUaData("ak");
				//headParam.sessionid = this.getUaData("sessionid");
				if(this.getCookie("userid")==null || this.getCookie("userid")=="undefined"){
					headParam.userid = -1;
				} else{
					headParam.userid = this.getCookie("userid");
				}

				if(this.getCookie("ak")==null || this.getCookie("ak")=="undefined"){
					headParam.ak = -1;
				} else {
					headParam.ak = this.getCookie("ak");
				}

				if(this.getCookie("sessionid")==null || this.getCookie("sessionid")=="undefined"){
					headParam.sessionid = -1;
				} else {
					headParam.sessionid = this.getCookie("sessionid");
				}
				return headParam;
			},
			isInApp:function(){

				return this.settings.ua_result==null?false:true;
			},
			isIos:function(){

				var isIos=navigator.userAgent.match(/iphone|ipod/ig);
				var isIpad=navigator.userAgent.match(/ipad/ig);

				if(isIos || isIpad){
					return true;
				}else{
					return false;
				}
			},
			isAndroid:function(){
				var isAndroid=navigator.userAgent.match(/android/ig);
				if(isAndroid){
					return true;
				}else{
					return false;
				}
			},
			isWechat:function(){
				var isMicro=navigator.userAgent.match(/MicroMessenger/ig);
				if(isMicro){
					return true;
				}else{
					return false;
				}
			},
			/**
			 * 使用方式如：
			 * <input type="text" placeholder="请输入你的姓名" id="name" validate="notNull" errTag="">
			 * 无errTag属性则使用 placeholder属性
			 * 支持的验证格式:
			 * notNull 非空
			 * phone   手机号码
			 */
			validate:function() {
				var _this = this;
				var checkResult = true;
				$("input").each(function () {
					var validate = $(this).attr("validate");
					if(validate){
						var value = $(this).val();
						if(validate == "notNull"){
							if(value==""){
								checkResult = false;
							}
						}else if(validate == "phone"){
							if(value.length!=11 || value.indexOf("1")!=0 || isNaN(value)){
								checkResult = false;
							}
						}
						if(!checkResult){
							var toast = $(this).attr("errTag") || $(this).attr("placeholder");
							_this.toast(toast);
							return false;
						}
					}
				});
				return checkResult;
			},
			doRequest:function(url,callBack,headParam,queryParam,method){
				if(!queryParam){
					queryParam = {};
				}
				if(!method){
					method = "GET";
				}
				return $.ajax({
					url:url,
					type:method,
					data:queryParam,
					beforeSend: function(xhr) {
						if(headParam){
							for(name in headParam){
								xhr.setRequestHeader(name, headParam[name]);
							}
						}
					},
					success:function(data){
						callBack(true,data);
					},
					error:function(data){
						callBack(false,data);
					}
				});
			},
			loadingInit:function(){
				var _this = this;
				if(!_this.settings.loading_init){
					var links = $("link");
					links.each(function(i,item){
						if($(item).attr("href")==_this.settings.loading_css){
							_this.settings.loading_init =true;
							return false;
						}
					});
					if(!_this.settings.loading_init){
						$("<link>")
							.attr({ rel: "stylesheet",
								type: "text/css",
								href: _this.settings.loading_css
							}).appendTo("head");
					}

					var loading_div = $("#jhss_loading");
					if(loading_div.length==0){
						loading_div = $("<div id='jhss_loading'></div>")
										.append("<div class='loadLayer'></div>")
										.append("<div class='loading'>" +
													"<div class='loadImg'><img src='"+_this.settings.loading_img+"'></div>"+
												"</div>");
						loading_div.hide();
						$("body").append(loading_div);

					}

				}
			},
			loading:function(){
				$("#jhss_loading").show();
			},
			loadingHide:function(){
				$("#jhss_loading").hide();
			},
			setCookie: function (name, value) {
				var Days = 7; //此 cookie 将被保存 30 天
				var exp = new Date();
				//exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
				exp.setTime(exp.getTime() + 10 * 60 * 1000);
				document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
			},
			getCookie: function (name) {
				var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
				if (arr != null) {
					return unescape(arr[2]);
				}
				return null;
			},
			getRandomCode: function () {
				return (Math.random() * 0x10000)+new Date().getMilliseconds();
			},
			removeURLParameter:function(url, parameters){
				var urlparts= url.split('?');
				if (urlparts.length>=2) {

					var pars= urlparts[1].split(/[&;]/g);

					//reverse iteration as may be destructive
					for (var i= pars.length; i-- > 0;) {
						//idiom for string.startsWith
						for(var n=0;n<parameters.length;n++){
							var prefix= encodeURIComponent(parameters[n])+'=';
							if (pars[i].lastIndexOf(prefix, 0) !== -1) {
								pars.splice(i, 1);
								break;
							}
						}
					}
					url= urlparts[0] + (pars.length > 0 ? '?' + pars.join('&') : "");
					return url;
				} else {
					return url;
				}
			}
		}
	});
})(jQuery);