"use strict";
class Binding {
    constructor() {
        this.url = window.params.url;
        this.imgurl = window.params.imgurl;
        this.address_binding_url = this.url + "/api/web/user/bindPhone";
        this.basic = new $.JBasic();
    }

    submit(){
        var _this = this;
        var param ={
            "phone": $("#phone").val(),
            "smsCode": $("#smsCode").val(),
            "userid": _this.basic.getUaData("userid")
        }


        _this.basic.doRequest(
            this.address_binding_url,
            function (result, data) {
                if (result) {
                    var status = data["status"];
                    if ("0000" == status) {
                        _this.basic.toast("保存成功");
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