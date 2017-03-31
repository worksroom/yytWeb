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
                        $("#orderlist_"+type).html("");//清空订单列表
                        $.each(result, function(index, value, array) {
                            _this.appendRow($("#orderlist_"+type), value, index);
                        });
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

    /**
     * 数据库中订单状态，和前端的状态进行匹配查询
     * 0 待支付
     * 1 已支付，待发货
     * 2 已发货
     * 3 结束
     */
    appendRow(orderTable, order, orderIndex){
        var orderDiv = $('<div class="order-first margin"></div>');

        var orderTitle = $('<div class="order-title"></div>');
        orderTitle.append(order['shopName']+' &nbsp;');
        orderTitle.append($('<img src="img/icon05.png" width="7" class="img-middle" alt="">'));
        if(order['status']==0){
            orderTitle.append($('<span><a href="javascript:;">等待买家付款</a></span>'));
        } else if(order['status']==1){
            orderTitle.append($('<span><a href="javascript:;">等待卖家发货</a></span>'));
        } else if(order['status']==2){
            orderTitle.append($('<span><a href="javascript:;">卖家已发货</a></span>'));
        } else if(order['status']==3 || order['status']==5){
            orderTitle.append($('<span><a href="javascript:;">交易成功</a></span>'));
        }

        orderDiv.append(orderTitle);

        //遍历订单内商品详情
        $.each(order.list, function(index, value, array) {
            var productDiv = $('<div class="commodity padding"></div>');
            var productDivHtml = '<div class="commodity-img">';
            productDivHtml += '<img src="img/img01.png" alt="">';
            productDivHtml += '</div>';
            productDivHtml += '<div class="commodity-cont">';
            productDivHtml += '<p class="commodity-h1">'+value['productName']+'</p>';
            productDivHtml += '<p class="commodity-h2">规格：'+value['productProValue']+' <span>'+value['productNum']+'件</span></p>';
            productDivHtml += '<p class="commodity-h3">￥'+value['price']+'<font class="font-size">/箱</span></font></p>';
            productDivHtml += '</div>';

            productDiv.append($(productDivHtml));
            if(index>0){
                productDiv.addClass("margin");
            }

            orderDiv.append(productDiv);
        });

        var moneyDiv = $('<div class="total"></div>');
        moneyDiv.append($('<span>共计'+order['totalum']+'件商品  合计：￥'+order['totalAmount']+'</span>'));

        var bottomDiv = $('<div class="total"></div>');
        if(order['status']==0){
            bottomDiv.append($('<span><input type="button" value="去付款" class="order-btn"></span>'));
        } else if(order['status']==1){
            bottomDiv.append($('<span><input type="button" value="取消订单" class="order-btn"></span>'));
        } else if(order['status']==2){
            bottomDiv.append($('<span><input type="button" value="查看物流" class="order-btn order-border margin-right"><input type="button" value="确认收货" class="order-btn"></span>'));
        } else if(order['status']==3){
            bottomDiv.append($('<span><input type="button" value="评价" onclick="openEvaluate('+order['orderId']+')" class="order-btn"></span>'));
        } else if(order['status']==5){
            bottomDiv.append($('<span><input type="button" value="已评价" class="order-btn"></span>'));
        }



        orderTable.append(orderDiv);
        orderTable.append(moneyDiv);
        orderTable.append(bottomDiv);
    }
}
