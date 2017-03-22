"use strict";
class Order {
    constructor() {

        this.url = window.params.url;
        this.imgurl = window.params.imgurl;
        this.order_url = this.url + "/api/web/login/order/orderlist";
        this.basic = new $.JBasic();
    }

    /**
     * type,0-全部订单；1-代付款；2-待收货；3-待评价
     */
    init(){
        var _this = this;
        var orderTab = $(".order-tab li");
        orderTab.click(function () {
            var index = $(this).index();
            $(".order-tab li").eq(index).addClass("order-active").siblings().removeClass("order-active");
            $(".order-cont").eq(index).show().siblings().hide();
            _this.loadOrderList(index);
        })

        var type = _this.basic.getQueryString("type");

        switch (parseInt(type)) {
            case 0:
                orderTab.eq(0).addClass("order-active").siblings().removeClass("order-active");
                $(".order-cont").eq(0).show().siblings().hide();
                _this.loadOrderList(0);
                break;
            case 1:
                orderTab.eq(1).addClass("order-active").siblings().removeClass("order-active");
                $(".order-cont").eq(1).show().siblings().hide();
                _this.loadOrderList(1);
                break;
            case 2:
                orderTab.eq(2).addClass("order-active").siblings().removeClass("order-active");
                $(".order-cont").eq(2).show().siblings().hide();
                _this.loadOrderList(2);
                break;
            case 3:
                orderTab.eq(3).addClass("order-active").siblings().removeClass("order-active");
                $(".order-cont").eq(3).show().siblings().hide();
                _this.loadOrderList(3);
                break;
            default:
                break;
        }
    }

    loadOrderList(type){
        var _this = this;
        _this.basic.doRequest(
            this.order_url,
            function(result,data){
                if(result){
                    var status = data["status"];
                    if("0000"==status){
                        var result = data["result"];

                        alert(result);

                    }else{
                        _this.basic.toast("请稍后再试..");
                    }

                }else{
                    _this.basic.toast("请稍后再试..");
                }
            },
            _this.basic.getUaHeadParam(),
            {"type": type}
        );
    }
}
