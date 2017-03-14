"use strict";
class Perfect {
    constructor() {
        this.url= window.params.url;
        this.imgurl = window.params.imgurl;
        this.perfect_url = this.url + "/api/web/user/perfect";
        this.basic = new $.JBasic();
    }

    init(){
        var _this = this;
        _this.basic.doRequest(
            this.perfect_url,
            function(result,data){
                if(result){
                    var status = data["status"];
                    if("0000"==status){
                        var result = data["result"];
                        //{"result":{"shop":0,"waitDelivery":0,"waitPay":0,"goods":0},"status":"0000"}
                        if(result['waitPay']>0){
                            $("#wait_pay").append('<div class="order-number">'+result['waitPay']+'</div>');
                        }

                        if(result['waitDelivery']>0){
                            $("#wait_delivery").append('<div class="order-number">'+result['waitDelivery']+'</div>');
                        }

                        if(result['shop']>0){
                            $("#shop_num").append('('+result['shop']+')');
                        }

                        if(result['goods']>0){
                            $("#goods_num").append('('+result['goods']+')');
                        }

                    }else{
                        _this.basic.toast("请稍后再试..");
                    }

                }else{
                    _this.basic.toast("请稍后再试..");
                }
            },
            {},
            {"userId": "1"}
        );
    }
}