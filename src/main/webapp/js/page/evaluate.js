"use strict";
class Evaluate {
    constructor() {
        this.url = window.params.url;
        this.imgurl = window.params.imgurl;
        this.getorder_url = this.url + "/api/web/login/order/getorder";//查询订单
        this.evaluate_url = this.url + "/api/web/login/order/evaluate";//评价
        this.basic = new $.JBasic();
    }

    init(){
        var _this = this;
        _this.basic.doRequest(
            this.getorder_url,
            function (result, data) {
                if (result) {
                    var status = data["status"];
                    if ("0000" == status) {
                        var order = data["result"];
                        $("#product_detail").html("");//清空原有内容

                        $.each(order.list, function(index, value, array) {
                            _this.appendRow($("#product_detail"), value, index);
                        });
                    }
                    else {
                        _this.basic.toast("请稍后再试..");
                    }

                } else {
                    _this.basic.toast("请稍后再试..");
                }
            },
            _this.basic.getUaHeadParam(),
            {"orderId": _this.basic.getQueryString("orderId")},
            'GET'
        );

        //评价星级绑定点击事件
        $(".star-width .star").each(function (index) {
            $(this).click(function () {
                if($(this).hasClass("star2")){
                    $(this).nextAll().removeClass("star2");
                }else {
                    $(this).prevAll().addClass("star2");
                    $(this).addClass("star2");
                }
            })
        })

        //提交评价绑定点击事件
        $('#submit_evaluate').bind("click", function(){
            _this.submit();
        });
    }

    //订单内商品DOM处理
    appendRow(productDetailTable, productVO, orderIndex){
        var productDetailDiv = $('<div class="commodity padding border-bot white-bg"></div>');

        var html = '<div class="commodity-img evaluate-img"><img src="img/img01.png" alt=""></div>';

        html += '<div class="commodity-cont">';
        html += '<p class="commodity-h1">'+productVO['productName']+'</p>';
        html += '<p class="commodity-h2">'+productVO['productProValue']+'</p>';
        html += '</div>';

        productDetailDiv.append($(html));
        productDetailTable.append(productDetailDiv);
    }

    submit(){
        var star = $(".star-width .star2").length;
        var content = $("#content").val();
        var anonymous=0;
        if($('#allSelect').attr('checked')){
            anonymous = 1;
        }
        alert('star='+star+", content="+content+", anonymous="+anonymous);

        var _this = this;
        _this.basic.doRequest(
            this.evaluate_url,
            function (result, data) {
                if (result) {
                    var status = data["status"];
                    if ("0000" == status) {
                        _this.basic.toast("评价成功");
                    }
                    else {
                        _this.basic.toast("请稍后再试..");
                    }

                } else {
                    _this.basic.toast("请稍后再试..");
                }
            },
            _this.basic.getUaHeadParam(),
            {
                "orderId": _this.basic.getQueryString("orderId"),
                "star": star,
                "content": content,
                "anonymous": anonymous
            },
            'POST'
        );
    }
}