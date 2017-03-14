"use strict";
class Personal {
    constructor() {
        this.url = window.params.url;
        this.imgurl = window.params.imgurl;
        this.personal_url = this.url + "/api/web/user/personal";
        this.basic = new $.JBasic();
    }

    init() {
        var _this = this;
        _this.basic.doRequest(
            this.personal_url,
            function (result, data) {
                if (result) {
                    var status = data["status"];
                    if ("0000" == status) {
                        var result = data["result"];
                        $("#nickname").html(result['nickname']);

                        if(result['phone'].length>0){
                            $("#phone").val(result['phone']);
                        } else {
                            $("#phone").val('请绑定手机号');
                        }

                        if(result['buyerName'].length>0){
                            $("#buyerName").text(result['buyerName']);
                        } else {
                            $("#buyerName").val('前往实名认证');
                        }

                        if(result['sellerName'].length>0){
                            $("#sellerName").text(result['sellerName']);
                        } else {
                            $("#sellerName").val('前往实名认证');
                        }

                    }
                    else {
                        _this.basic.toast("请稍后再试..");
                    }

                } else {
                    _this.basic.toast("请稍后再试..");
                }
            }
            ,
            {}
            ,
            {
                "userId": "1"
            }
        );
    }
}