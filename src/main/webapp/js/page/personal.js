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

                        if(result['phone']!=undefined && result['phone'].length>0){
                            $("#phone").text(result['phone']);
                        } else {
                            $("#phone").text('请绑定手机号');
                            $("#phone").attr("href","binding.html");
                        }

                        if(result['buyerName']!=undefined && result['buyerName'].length>0){
                            $("#buyerName").text(result['buyerName']);
                            $("#buyerName").attr("href","IDcarBuyerScuess.html");
                        } else {
                            $("#buyerName").text('前往实名认证');
                            $("#buyerName").attr("href","realBuyer.html");
                        }

                        if(result['sellerName']!=undefined && result['sellerName'].length>0){
                            $("#sellerName").text(result['sellerName']);
                            $("#sellerName").attr("href","IDcarSellerScuess.html");
                        } else {
                            $("#sellerName").text('前往实名认证');
                            $("#sellerName").attr("href","realSeller.html");
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
                "userId": "5"
            }
        );
    }
}