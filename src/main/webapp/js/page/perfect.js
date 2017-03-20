"use strict";
class Perfect {
    constructor() {
        this.url= window.params.url;
        this.imgurl = window.params.imgurl;
        this.perfect_url = this.url + "/api/web/user/perfect";
        this.basic = new $.JBasic();
    }

    bindEvent(){
        //查看全部订单
        $('#all_order').bind("click", function(){
            window.location.href="order.html?type=0";
        });
        //代付款跳转
        $('#wait_pay_btn').bind("click", function(){
            window.location.href="order.html?type=1";
        });

        //待收货跳转
        $('#wait_delivery_btn').bind("click", function(){
            window.location.href="order.html?type=2";
        });

        //待评价跳转
        $('#wait_evaluate_btn').bind("click", function(){
            window.location.href="order.html?type=3";
        });
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
            _this.basic.getUaHeadParam(),
            {}
        );
    }
}