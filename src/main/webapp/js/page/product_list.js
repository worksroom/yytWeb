"use strict";
class ProductList {
    constructor() {
        this.pageIndex = 1;
        this.pageSize = 20;
        this.type = 0;
        this.url= window.params.url;
        this.imgurl = window.params.imgurl;
        this.product_url = this.url + "/api/web/product/classProduct";
        this.basic = new $.JBasic();


    }
    init(){
        this.clickBind();
        this.getData();
    }
    clickBind(){
        var _this = this;

        var tabMenu=$(".dotey li");
        tabMenu.click(function () {
            var index=$(this).index();
            $(".dotey li").eq(index).addClass("active").siblings().removeClass("active");
            $(".dotey-display").eq(index).show().siblings().hide();
        })

        $("#type_0").on("click",function(){
            _this.type=0;
            $("#product").html("");
            _this.getData();
        });

        $("#type_1").on("click",function(){
            _this.type=1;
            $("#product").html("");
            _this.getData();
        });

        $("#type_2").on("click",function(){
            _this.type=2;
            $("#product").html("");
            _this.getData();
        });
    }
    getData(){
        var _this = this;
        var classId = _this.basic.getQueryString("classId");
        _this.basic.doRequest(
            this.product_url,
            function(result,data){
                if(result){
                    console.log(data)
                    _this.genHtml(data["result"]);
                }
            },
            {},
            {"pageIndex":_this.pageIndex,
            "pageSize":_this.pageSize,
            "classId":classId,
            "type":_this.type}
        );

    }

    genHtml(data){
        var _this = this;
        $.each(data, function(index, value, array) {

           var div = $(`<div class="div-product">
                    <a href="product_detail.html?goodId=${value["id"]}">
                        <img src="${value["img"]}" alt="">
                        <div class="white-bg lose-margin">
                            <p>${value["name"]}</p>
                            <p>
                                <font class="pink">￥${value["minPrice"]} - ${value["maxPrice"]}</font>
                            </p>
                        </div>
                    </a>
                </div>`);
            if((index+1)%2==0){
                div.addClass("product-margin");
            }
            $("#product").append(div);
        });
    }

}

/**
 *
 * $(".dotey li:last-child").click(function () {
        if($(this).hasClass("active")){
            $(this).click(function () {
                $(this).addClass("money-top");
                $(this).click(function () {
                    if($(this).hasClass("money-top")){
                        $(this).addClass("money-down").removeClass("money-top");
                    }else {
                        $(this).removeClass("money-down").addClass("money-top");
                    }
                })
            })
        }
    })
 $(".dotey li:last-child").prevAll().click(function () {
        if($(".dotey li:last-child").hasClass("money-top")){
            $(".dotey li:last-child").removeClass("money-top");
        }else{
            $(".dotey li:last-child").removeClass("money-down");
        }
    })

 var tabMenu=$(".dotey li");
 tabMenu.click(function () {
        var index=$(this).index();
        $(".dotey li").eq(index).addClass("active").siblings().removeClass("active");
        $(".dotey-display").eq(index).show().siblings().hide();
    })
 **/