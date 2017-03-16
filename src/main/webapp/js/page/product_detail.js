"use strict";
class ProductDetail {
    constructor() {
        this.url= window.params.url;
        this.imgurl = window.params.imgurl;
        this.product_url = this.url + "/api/web/product/productDetail";
        this.basic = new $.JBasic();
        this.skus = null;
        this.allProValue = {};
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
                    _this.getSku(data["class"],data["result"]["list"]);
                }
            },
            {},
            {"goodId":goodsId}
        );
    }
    genData(data) {

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

    isHas(array,value){
        var hasItem = false;
        $.each(array,function(index, item) {

            if(value==item){
                hasItem =  true;
            }
        });
        return hasItem;
    }
    getSku(classPro,list){
        var _this = this;
        //生成sku属性用于规格切换时使用
        _this.skus = list;
        //分类名称，id：分类值
        var classid = new Array();
        var classidvalue = new Array();
        $.each(list,function(index, value, array) {
            var salePro = value["salePro"];
            $.each(salePro,function(i, item) {
                classid.push(item["classProId"]);
                classidvalue.push(item["classProValueId"]);
            });

        });

        var classPros = new Array();
        $.each(classPro,function(index, value, array) {

            if(_this.isHas(classid,parseInt(value["pro"]["id"]))){
                var classPro = {};
                classPro["name"] = value["pro"]["name"];
                classPro["id"] = value["pro"]["id"];
                var classProValues = new Array();
                $.each(value["values"],function(i, item) {
                    if(_this.isHas(classidvalue,item["id"])){
                        var classProValue = {};
                        classProValue["name"] = item["name"];
                        classProValue["id"] = item["id"];
                        classProValues.push(classProValue);
                    }
                });
                classPro["classProValues"] = classProValues;
                classPros.push(classPro);
            }


        });
        $.each(classPros,function(i, item) {
            $("#buy_num").before(`<p class="color font-size">${item["name"]}</p>`);
            var div_model = $(`<div class="model"></div>`);
            var sku_is = new Array();
            $.each(item["classProValues"],function(index, value) {
                var sku_id = "sku_"+item["id"]+"_"+value["id"];
                sku_is.push(sku_id);
                div_model.append(`<input type="button" id="${sku_id}" class="cause-btn" value="${value["name"]}" />`);
            });
            _this.allProValue[item["id"]] = sku_is;

            $("#buy_num").before(div_model);
        });
        _this.ggClick();


 }
        //规格事件绑定
        ggClick(){
            var _this = this;

            $(".model input[type='button']").each(function () {
                $(this).click(function () {
                    var item = $(this);

                    var className = item.attr("class");
                    if(className.indexOf("active")>=0){
                        item.removeClass("active");
                    }else{
                        item.addClass("active").siblings("input").removeClass("active");
                    }

                    _this.getNotExitsSku();
                })
            });
        }

        getNotExitsSku(){
            var _this = this;
            //console.log($("[id^=sku_]"));
            var select_sku = $(".active");

            var classPros = new Array();
            var sku_ids = new Array();

            $.each($(".active"),function(index, value) {

                var sku_id = $(value).attr("id");
                sku_ids.push(sku_id);
                var array = sku_id.split("_");
                classPros.push(array[1]);
            });

            for(var item in _this.allProValue){
                if(!_this.isHas(classPros,item)){
                    $("[id^=sku_"+item+"]").each(function () {
                        $(this).unbind("click");
                    });
                }
            }
            $.each(_this.skus,function(index, value) {
                _this.bindSkuClick(value["salePro"],sku_ids);
            });


            //选中有组合的sku

        }

        //将没有选择的分类绑定上
        bindSkuClick(salePro,skuids){
            var _this = this;
            var sale_sku = new Array();
            $.each(salePro,function(index, value) {
                var saleSkuId = "sku_"+value["classProId"] + "_" + value["classProValueId"];
                sale_sku.push(saleSkuId);
            });
            var has = true;
            $.each(skuids,function(index, value) {
                if(!_this.isHas(sale_sku,value)){
                    has = false;
                }else{
                    sale_sku.splice(index,1);
                }
            });

            if(has){

                $.each(sale_sku,function(index, value) {
                    $("#"+sale_sku).on("click",function(){
                        var className = $(this).attr("class");
                        if(className.indexOf("active")>=0){
                            $(this).removeClass("active");
                        }else{
                            $(this).addClass("active");
                        }
                    });
                });
            }

            //$.each(skuids,function(i, item) {
            //
            //    if(!_this.isHas(sale_sku,item)){
            //        console.log("-------")
            //        $("#"+sale_sku).on("click",function(){
            //            var className = this.attr("class");
            //            if(className.indexOf("active")>=0){
            //                this.removeClass("active");
            //            }else{
            //                this.addClass("active");
            //            }
            //        });
            //    }
            //});

        }


}



