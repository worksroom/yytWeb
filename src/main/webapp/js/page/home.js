"use strict";
class Home {
    constructor() {
        this.url= window.params.url;
        this.imgurl = window.params.imgurl;
        this.url = this.url + "/api/web/home/index";
        this.basic = new $.JBasic();
    }
    getData(){
        var _this = this;
        _this.basic.doRequest(
            this.url,
            function(result,data){
                if(result){
                    var status = data["status"];
                    if("0000"==status){
                        var result = data["result"];
                        $.each(result, function(index, value, array) {
                            var html = _this.genDoc(value);
                            $(".section").append(html);
                        });
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

    genDoc(item){
        var _this = this;
        var type = item["type"];
        console.log(type==3);
        var content = eval('(' +  item["content"] + ')');
        var html = "";
        if(type==0){ //单图banner

            var obj = content[0];
            html = `
                        <div class="banner"><img src="${_this.imgurl+obj['img']}" alt="" onclick="window.href='${obj["url"]}'"></div>
                    `
        }else if(type==1){//类别区
            var obj = content[0];
            html = `
                        <div class="title title-bg">
                            <img src="img/icon13.png" alt="" class="margin-img2">${obj["name"]}<img src="img/icon14.png" alt="" class="margin-img">
                        </div>
                    `;
        }else if(type==2){//两张图片

            var li = "";
            $.each(content, function(index, value, array) {
                li += `
                  <li>
                    <a href="${value["url"]}"><img src="${value["img"]}" alt=""></a>
                </li>
                `;
            });

            html = `
                        <ul class="material white-bg">
                        ${li}
                        </ul>
                    `;

        }else if(type==3){//两张图片带价格

            var obj = content[0];
            var obj1 = content[1];
            html =
                `
                    <div class="index-product">
                        <div class="div-product">
                            <a href="${obj["url"]}">
                                <img src="${_this.imgurl+obj["img"]}" alt="">
                                <div class="white-bg lose-margin">
                                    <p>${obj["name"]}</p>
                                    <p>
                                        <font class="pink">￥${obj["price"]}</font><font class="del-text">原价:￥${obj["salePrice"]}</font>
                                        <span class="pink-discount">${obj["discount"]}折</span>
                                    </p>
                                </div>
                            </a>
                        </div>
                        <div class="div-product product-margin">
                            <a href="${obj1["url"]}">
                                <img src="${_this.imgurl+obj1["img"]}" alt="">
                                <div class="white-bg lose-margin">
                                    <p>${obj1["name"]}</p>
                                    <p>
                                        <font class="pink">￥${obj1["price"]}</font><font class="del-text">原价:￥${obj1["salePrice"]}</font>
                                        <span class="pink-discount">${obj1["discount"]}折</span>
                                    </p>
                                </div>
                            </a>
                        </div>
                    </div>
              `;
            console.log(html);
        }else if(type==4){//三图区
            var obj1 = content[0];
            var obj2 = content[1];
            var obj3 = content[2];


            var li = "";

            $.each(content, function(index, value, array) {
                li += `
                  <li>
                       <a href="${value["url"]}">
                           ${value["name"]}
                           <p class="center absolute-center"><img src="${value["img"]}" width="45%" alt=""></p>
                       </a>
                   </li>
                `;
            });

            html =
                `
                    <ul class="facility">
                       ${li}
                   </ul>
              `;
        }
        return html;
    }
}