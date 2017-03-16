"use strict";
class H5Upload {
    constructor(uploadObj, viewObj, imgUrlObj) {
        this.uploadObj = uploadObj;
        this.viewObj = viewObj;
        this.imgUrlObj = imgUrlObj;
        this.basic = new $.JBasic();
    }

    init() {
        this.eventBind();
    }

    eventBind() {
        if (typeof FileReader === 'undefined') {
            alert('FileReader');
        }
        var that = this;
        that.uploadObj.change(function () {
            var reader = new FileReader();
            reader.onload = function (e) {
                that.compress(this.result);
            };
            reader.readAsDataURL(this.files[0]);
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
                    _this.imgUrlObj.val(data.imgurl);
                }
            }
        });
    }

}
