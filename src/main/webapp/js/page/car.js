"use strict";
class Car {
    constructor() {
        this.url= window.params.url;
        this.imgurl = window.params.imgurl;
        this.url = this.url + "/api/web/login/order/car";
        this.basic = new $.JBasic();
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
            var html = `
            <div class="order-first border-bot">

            <div class="commodity padding address-check">
                <div class="check-left car-top padding-right childrenCheck">
                    <input type="checkbox" class="checks checks2" name="checkbox">
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
                                        <div class="change-number">${item["buyNum"]}</div>
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