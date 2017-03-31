"use strict";
class EvaluateUpload {
    constructor(uploadObj, viewObj, buttonObj) {
        this.uploadObj = uploadObj;
        this.viewObj = viewObj;
        this.buttonObj = buttonObj;
        this.basic = new $.JBasic();
    }

    init() {
        this.eventBind();
    }

    eventBind() {
        var _this = this;

        if (typeof FileReader === 'undefined') {
            _this.basic.toast("您的浏览器暂不支持上传图片..");
        }

        _this.uploadObj.bind("click", function(){
            _this.buttonObj.click();
        });

        _this.buttonObj.change(function(){
            if (!this.files.length) {
                return;
            }

            var files = Array.prototype.slice.call(this.files);
            if (files.length > 3) {
                _this.basic.toast("同时上传3张图片");
                return;
            }

            files.forEach(function(file, i) {
                if (!/\/(?:jpeg|png|gif)/i.test(file.type)) {
                    return;
                }

                var fileReader = new FileReader();
                fileReader.readAsDataURL(file);
                fileReader.onload = function(event){
                    var result = event.target.result;   //返回的dataURL
                    var img = new Image();
                    img.src = result;
                    var maxH = 300;

                    img.onload = function(){  //创建一个image对象，给canvas绘制使用
                        var cvs = document.createElement('canvas'),
                            ctx = cvs.getContext('2d');

                        if (img.height > maxH) {
                            img.width *= maxH / img.height;
                            img.height = maxH;
                        }
                        cvs.width = img.width;
                        cvs.height = img.height;

                        ctx.clearRect(0, 0, cvs.width, cvs.height);
                        ctx.drawImage(img, 0, 0, img.width, img.height);
                        var dataUrl = cvs.toDataURL(file.type, 1);

                        $.ajax({
                            url: "api/web/user/upload_img",
                            type: 'POST',
                            data: {image_data: dataUrl},
                            dataType: 'json',
                            success: function (data) {
                                if (data.status == "0000") {
                                    var newImg = '<li class="viewimg">';
                                    newImg += '<div class="upload-img">';
                                    newImg += '<img src="'+data.imgurl+'">';
                                    newImg += '<a href="javascript:;" class="delete-img"></a>';
                                    newImg += '</div>';
                                    newImg += '</li>';
                                    _this.viewObj.append(newImg);
                                }
                            }
                        });
                    }

                }
            })
        });
    }

    compress(res) {
        var that = this;
        var img = new Image(),
            maxH = 300;

        img.onload = function () {
            var cvs = document.createElement('canvas'),
                ctx = cvs.getContext('2d');

            if (img.height > maxH) {
                img.width *= maxH / img.height;
                img.height = maxH;
            }
            cvs.width = img.width;
            cvs.height = img.height;

            ctx.clearRect(0, 0, cvs.width, cvs.height);
            ctx.drawImage(img, 0, 0, img.width, img.height);
            var dataUrl = cvs.toDataURL('image/jpeg', 1);
            that.viewObj.attr("src", dataUrl);
            that.viewObj.show();
            // 上传略
            that.upload(dataUrl);
        };

        img.src = res;
    }

    upload(image_data) {
        var _this = this;
        $.ajax({
            url: "api/web/user/upload_img",
            type: 'POST',
            data: {image_data: image_data},
            dataType: 'json',
            success: function (data) {
                if (data.status == "0000") {
                    //_this.imgUrlObj.val(data.imgurl);
                }
            }
        });
    }

}
