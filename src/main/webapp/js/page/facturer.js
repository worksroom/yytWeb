"use strict";
class Facturer {
    constructor() {
        this.url = window.params.url;
        this.imgurl = window.params.imgurl;
        this.supply_url = this.url + "/api/web/info/supplyList";
        this.demand_url = this.url + "/api/web/info/demandList";
        this.supply_detail_url = this.url + "/api/web/info/getSupplyInfo";
        this.basic = new $.JBasic();
    }

    loadSupplyList() {
        var _this = this;
        _this.basic.doRequest(
            this.supply_url,
            function (result, data) {
                if (result) {
                    var status = data["status"];
                    if ("0000" == status) {
                        var result = data["result"];
                        $("#facturer_supply").html("");
                        var ul = $('#facturer_supply');
                        $.each(result, function(index, value, array) {
                            var li = $('<li class="item item-thumbnail-left" onClick="clickSupply('+value['id']+')"></li>');
                            var img = $('<img src="img/zx/img09.png" alt="">');
                            var title = $('<h2>'+value['title']+'</h2>');
                            var des = $('<p>'+value['des']+'</p>');
                            var time = $('<p class="pad-top">'+value['createTime']+'</p>');

                            li.append(img);
                            li.append(title);
                            li.append(des);
                            li.append(time);

                            ul.append(li);
                        });
                    } else {
                        _this.basic.toast("请稍后再试..");
                    }

                } else {
                    _this.basic.toast("请稍后再试..");
                }
            },
            {},
            {}
        );
    }

    loadDemandList() {
        var _this = this;
        _this.basic.doRequest(
            this.demand_url,
            function (result, data) {
                if (result) {
                    var status = data["status"];
                    if ("0000" == status) {
                        var result = data["result"];
                        $("#facturer_demand").html("");
                        var ul = $('#facturer_demand');
                        $.each(result, function(index, value, array) {
                            var li = $('<li class="item" onClick="clickDemand('+value['id']+')"></li>');
                            var title = $('<h2>'+value['title']+'</h2>');
                            var time = $('<p>'+value['createTime']+'</p>');

                            li.append(title);
                            li.append(time);

                            ul.append(li);
                        });
                    } else {
                        _this.basic.toast("请稍后再试..");
                    }

                } else {
                    _this.basic.toast("请稍后再试..");
                }
            },
            {},
            {}
        );
    }

}
