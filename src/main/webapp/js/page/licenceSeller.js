"use strict";
class LicenceSeller {
    constructor() {
        this.url = window.params.url;
        this.imgurl = window.params.imgurl;
        this.seller_auth_url = this.url + "/api/web/user/seller_auth";
        this.basic = new $.JBasic();
    }

    init(){
        var _this = this;
        $('#submit').click(function () {
            _this.submit();
        });
    }

    submit(){
        var _this = this;
        var tempParam = _this.basic.getQueryString("tempParam");
        alert(tempParam);
        var param = JSON.parse(tempParam);
        param.licencePhone = $("#Licence_url").val();
        param.userid = _this.basic.getUaData("userid");

        _this.basic.doRequest(
            this.seller_auth_url,
            function (result, data) {
                if (result) {
                    var status = data["status"];
                    if ("0000" == status) {
                        _this.basic.toast("保存成功");
                        window.location="IDcarSellerScuess.html";
                    }
                    else {
                        _this.basic.toast("请稍后再试..");
                    }

                } else {
                    _this.basic.toast("请稍后再试..");
                }
            },
            {},
            param,
            'POST'
        );
    }

}
