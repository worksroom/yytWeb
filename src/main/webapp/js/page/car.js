"use strict";
class Car {
    constructor() {
        this.url= window.params.url;
        this.imgurl = window.params.imgurl;
        this.url = this.url + "/api/web/login/order/car";
        this.basic = new $.JBasic();
    }
    init(){
        var _this = this;
        $("#createOrder").on("click",function(){
            _this.createOrder();
        });

        _this.getData();
    }
    clickCheckbox(){
        var _this = this;
        $("input[name='checkbox']").click(function () {
            if($(this).hasClass("checks2")){
                $(this).removeClass("checks2");
            }else{
                $(this).addClass("checks2");
            }
            _this.collectOrder();
        });

        $("#allSelect").click(function(){
            if($(this).hasClass("checks2")){
                $("input[name='checkbox']").addClass("checks2");
            }else{
                $("input[name='checkbox']").removeClass("checks2");
            }
            _this.collectOrder();
        });

    }
    collectOrder(){
        var price = 0;
        $("input[name='checkbox']").each(function(){
            var item  = $(this);
            if(item.hasClass("checks2")){
                price +=  parseFloat($(this).attr("price"));
            }
        });
        $("#allPrice").html("￥"+price);
    }

    createOrder(){

        var _this = this;
        var orders = 0;
        var productId = "";
        $("input[name='checkbox']").each(function(){
            var item  = $(this);
            if(item.hasClass("checks2")){
                productId += $(this).attr("pro") + ",";
                orders++;
            }
        });
       if(orders==0){
           _this.basic.toast("请选择您要购买的商品");
       }else{
           window.location.href="affirm.html?skuId="+productId;
       }
    }
    getData(){
        var _this = this;
        _this.basic.doRequest(
            this.url,
            function(result,data){
                if(result){
                    console.log(data);
                    var status = data["status"];
                    if("0000"==status){
                        _this.genData(data["result"]);
                        _this.clickCheckbox();
                    }else{
                        _this.basic.toast("请稍后再试..");
                    }

                }else{
                    _this.basic.toast("请稍后再试..");
                }
            },
            {},
            {"userId":224}
        );

    }

    genData(data){
        $.each(data, function(index, value, array) {

            var item = value["shoppingCart"];

            var pro = value["productset"]["mallProduct"]["id"];

            var html = `
            <div class="order-first border-bot">

            <div class="commodity padding address-check">
                <div class="check-left car-top padding-right childrenCheck">
                    <input type="checkbox" class="checks" name="checkbox" pro="${pro}" price="${item["salePrice"]}">
                </div>
                <div class="check-right">
                    <a href="product_detail.html?goodId=${item["goodsId"]}">
                        <div class="commodity-img car-img">
                            <img src="img/img01.png" alt="">
                        </div>
                        <div class="commodity-cont car-cont">
                            <p class="commodity-h1 car-h1">${item["productName"]}</p>
                            <div class="commodity-h2 car-down">规格：${item["property"]}</div>
                            <div class="commodity-h3">
                                ￥${item["salePrice"]}
                                <span>
                                    <div class="number">
                                        <div class="subtract loseValue"></div>
                                        <div class="change-number" id="num_${pro}">${item["buyNum"]}</div>
                                        <div class="add addValue"></div>
                                    </div>
                                </span>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </div>


            `;
            $("#content").append(html);
        });
    }
}