"use strict";
class Classify {
    constructor() {
        this.url= window.params.url;
        this.imgurl = window.params.imgurl;
        this.fir_url = this.url + "/api/web/classify/index";
        this.sec_url = this.url + "/api/web/classify/classify";
        this.basic = new $.JBasic();
    }
    getFirstData(){
        var _this = this;
        _this.basic.doRequest(
            this.fir_url,
            function(result,data){
                if(result){

                    var status = data["status"];
                    if("0000"==status){
                        var result = data["result"];
                        var li = "";
                        $.each(result, function(index, value, array) {
                            var li = $(`<li>${value["name"]}</li>`);
                            li.attr("id","genli_"+index)
                            if(index==0){
                                li.addClass("active");
                                $("#classify").attr("cur",index);
                            }
                            li.on("click",function(){
                                var pre = $("#classify").attr("cur");
                                li.addClass("active");

                                $("#genli_"+pre).removeClass("active")
                                $("#classify").attr("cur",index);
                                _this.getSecData(value["id"]);

                            });
                            $("#classify").append(li);
                        });
                        var sec = data["sec"];
                        _this.genDom(sec);

                    }else{
                        _this.basic.toast("请稍后再试..");
                    }

                }else{
                    _this.basic.toast("请稍后再试..");
                }
            },
            {},
            {}
        );

    }
    genDom(result){
        var _this = this;
        var html = "";
        var ul = null;
        $("#sec_class").html("");
        $.each(result, function(index, value, array) {
            if(index%3==0){
                ul = $("<ul class=\"product margin\"></ul>");
                $("#sec_class").append(ul);
            }
            var li = `<li>
                            <a href="product_list.html?classId=${value["id"]}">
                                <img src="${_this.imgurl+value["logo"]}" alt="" class="product-img">
                                <p>${value["name"]}</p>
                            </a>
                        </li>`;
            ul.append(li);

        });

    }
    getSecData(id){
        var _this = this;
        _this.basic.doRequest(
            this.sec_url,
            function(result,data){
                if(result){

                    var status = data["status"];
                    if("0000"==status){
                        var result = data["result"];
                        _this.genDom(result);

                    }else{
                        _this.basic.toast("请稍后再试..");
                    }

                }else{
                    _this.basic.toast("请稍后再试..");
                }
            },
            {},
            {"parentId":id}
        );
    }


}