"use strict";
class IdCardBuyer {
    constructor() {
        this.url = window.params.url;
        this.imgurl = window.params.imgurl;
        this.buyer_auth_url = this.url + "/api/web/user/buyer_auth";
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
        var param ={
            "name": _this.basic.getQueryString("name"),
            "cardFPhoto": $("#Fphoto_url").val(),
            "cardBPhoto": $("#Bphoto_url").val()
        }


        _this.basic.doRequest(
            this.buyer_auth_url,
            function (result, data) {
                if (result) {
                    var status = data["status"];
                    if ("0000" == status) {
                        _this.basic.toast("保存成功");
                        window.location="IDcarBuyerScuess.html";
                    }
                    else {
                        _this.basic.toast("请稍后再试..");
                    }

                } else {
                    _this.basic.toast("请稍后再试..");
                }
            },
            _this.basic.getUaHeadParam(),
            param,
            'POST'
        );
    }

}
