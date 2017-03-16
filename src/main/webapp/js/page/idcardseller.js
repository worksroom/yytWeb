"use strict";
class IdCardSeller {
    constructor() {
        this.url = window.params.url;
        this.imgurl = window.params.imgurl;
        this.seller_licence_url = this.url + "/LicenceSeller.html";
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
            "shopName": _this.basic.getQueryString("shopName"),
            "cardFPhoto": $("#Fphoto_url").val(),
            "cardBPhoto": $("#Bphoto_url").val()
        }

        var tempParam = JSON.stringify(param);
        window.location= encodeURI(_this.seller_licence_url+'?tempParam='+tempParam);
    }

}
