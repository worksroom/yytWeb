"use strict";
class ProductDetail {
    constructor() {
        this.url= window.params.url;
        this.imgurl = window.params.imgurl;
        this.product_url = this.url + "/api/web/product/productDetail";
        this.basic = new $.JBasic();


    }
    init(){
        this.getData();
    }

    banner(){
        var scrollPicView = document.getElementById("scroll_pic_view"),
            scrollPicViewDiv = document.getElementById("scroll_pic_view_div"),
            lis = scrollPicViewDiv.querySelectorAll("li"),
            w = scrollPicView.offsetWidth,
            len = lis.length;
        for(var i=0; i<len; i++){
            lis[i].style.width = w+"px";
            if(i == len-1){
                scrollPicViewDiv.style.width = w * len + "px";
            }
        }

        var scroll_pic_view = new iScroll('scroll_pic_view', {
            snap: true,
            momentum: false,
            hScrollbar: false,
            useTransition: true,
            onScrollEnd: function() {
                $("#scroll_pic_nav li").removeClass("on").eq(this.currPageX).addClass("on");
                //$("#scroll_pic_nav li.on").prev().addClass("left");
                //$("#scroll_pic_nav li.on").next().removeClass("left");

                var  list=$("#scroll_pic_nav li");
                for(var k=0;k<list.length;k++){
                    if(k<this.currPageX)
                        $(list[k]).addClass("left");
                    else
                        $(list[k]).removeClass("left");
                }
            }
        });
        //
        var nav_lis = new Array(lis.length);
        //document.write('<li class="on"><span></span></li>');
        //for(var i=1; i<nav_lis.length; i++){
        //    document.write("<li><span>"+""+"</span></li>");
        //}
    }

    getData(){
        var _this = this;
        var goodsId = _this.basic.getQueryString("goodId");
        _this.basic.doRequest(
            this.product_url,
            function(result,data){
                if(result){
                    _this.genData(data["result"]);

                }
            },
            {},
            {"goodId":goodsId}
        );
    }
    genData(data) {
        console.log(data);
        $("#product_name").html(data["mallGoods"]["name"]);
        $("#product_price").html(`
                    <font class="font-size">￥</font><font>${data["mallGoods"]["minPrice"]}</font>-</font><font>${data["mallGoods"]["maxPrice"]}</font>元
                    <span class="color font-size">评价：0条</span>
        `);
        var banner_url = eval('(' + data["mallGoods"]["img"] + ')');

        $.each(data, function(index, value, array) {
            var li = `<li> <a onclick="return false;"><img src="${value}"></a> </li>`;
            $("#scroll_pic_view_ul").append(li);
        });
        this.banner();

        $("#product_content").append(data["mallGoods"]["des"]);
    }


    getSku(classPro,list){

    }



}
