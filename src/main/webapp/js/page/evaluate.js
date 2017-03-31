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

                        _this.event();
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

    }

    event(){
        var _this = this;
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
        var section = $('<section class="section" goodsId="'+orderIndex+'"></section>');
        var firstWhiteBgDiv = $('<div class="white-bg"></div>');
        var productDetailDiv = $('<div class="commodity padding border-bot white-bg"></div>');

        var html = '<div class="commodity-img evaluate-img"><img src="img/img01.png" alt=""></div>';

        html += '<div class="commodity-cont">';
        html += '<p class="commodity-h1">'+productVO['productName']+'</p>';
        html += '<p class="commodity-h2">'+productVO['productProValue']+'</p>';
        html += '</div>';

        productDetailDiv.append($(html));
        firstWhiteBgDiv.append(productDetailDiv);
        section.append(firstWhiteBgDiv);

        var secWhiteBgDiv = $('<div class="white-bg"></div>');

        var secHtml = '<div class="evaluate-title">';
        secHtml += '<div class="float">评分</div>';
        secHtml += '<div class="star-width">';
        secHtml += '<div class="star"></div>';
        secHtml += '<div class="star"></div>';
        secHtml += '<div class="star"></div>';
        secHtml += '<div class="star"></div>';
        secHtml += '<div class="star"></div>';
        secHtml += '</div>';
        secHtml += '</div>';
        secHtml += '<div class="evaluate-minute padding">';
        secHtml += '<div class="float">满分</div>';
        secHtml += '<div class="float minute">';
        secHtml += '<textarea id="content" name="content" placeholder="商品满意吗？写下您的使用感受来帮助其他小伙伴~" class="textarea"></textarea>';
        secHtml += '</div>';
        secHtml += '</div>';
        secHtml += '<ul class="phone bg-none padding" id="img_ul">';
        secHtml += '<li class="addimg" id="phoneUpload" name="phoneUpload"></li>';
        secHtml += '</ul>';
        secHtml += '<input type="file" id="uploadButton" name="uploadButton" accept="image/*" style="height:0px;width:0px;border:0px;display:none;" />';

        secWhiteBgDiv.append($(secHtml));
        section.append(secWhiteBgDiv);

        productDetailTable.append(section);
    }

    submit(){
        var evaluateData = new Array();
        var rows = $("#product_detail section");
        $.each(rows, function (i, item){
            var evaluate = new Object();
            var star = $(item).find(".star-width .star2").length;
            var content = $(item).find("[name='content']").val();

            var imgs = $(item).find(".phone .viewimg img");
            var img_list = new Array();
            $.each(imgs, function (i, item){
                img_list.push($(item)[0].src);
            });

            evaluate.star = star;
            evaluate.content = content;
            evaluate.imgarray = img_list;
            evaluate.goodsId = 1;
            evaluateData.push(evaluate);
        });

        var anonymous=0;
        if($('#allSelect').attr('checked')){
            anonymous = 1;
        }

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
                "anonymous": anonymous,
                "evaluateData": JSON.stringify(evaluateData)
            },
            'POST'
        );
    }
}