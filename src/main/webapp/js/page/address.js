"use strict";
class Address {
    constructor() {
        this.url = window.params.url;
        this.imgurl = window.params.imgurl;
        this.addressList_url = this.url + "/api/web/address/addressList";
        this.basic = new $.JBasic();
    }

    init() {
        var _this = this;
        _this.basic.doRequest(
            this.addressList_url,
            function (result, data) {
                if (result) {
                    var status = data["status"];
                    if ("0000" == status) {
                        var result = data["result"];
                        $("#address_list").html("");
                        $.each(result, function(index, value, array) {
                            var addressBoxDiv;
                            if(index==0){
                                addressBoxDiv = $('<div class="address-box"></div>');
                            } else {
                                addressBoxDiv = $('<div class="address-box margin"></div>');
                            }

                            var firstDiv = $('<div class="padding padding-bottom"><p>'+value['name']+' <span>'+value['phone']+'</span></p><p>'+value['addr']+'</p></div>');
                            addressBoxDiv.append(firstDiv);

                            var secDiv = '<div class="address-select">';
                            secDiv += '<div class="address-check">';
                            secDiv += '<div class="check-left">';
                            secDiv += '<input type="checkbox" class="checks2" name="carCheckBox">';
                            secDiv += '</div>';
                            secDiv += '<div class="check-right address-widths">';
                            secDiv += '<em class="select select-color">设置为默认地址</em>';
                            secDiv += '<span>';
                            secDiv += '<a href="addlocation.html" class="margin-right"><img src="img/updata.png" width="18" alt="" class="img-middle"> 编辑</a>';
                            secDiv += '<a class="delete"><img src="img/delect.png" width="18" alt="" class="img-middle"> 删除</a>';
                            secDiv += '</span>';
                            secDiv += '</div>';
                            secDiv += '</div>';
                            secDiv += '</div>';

                            addressBoxDiv.append($(secDiv));

                            $("#address_list").append(addressBoxDiv);
                        });
                    }
                    else {
                        _this.basic.toast("请稍后再试..");
                    }

                } else {
                    _this.basic.toast("请稍后再试..");
                }
            }
            ,
            {}
            ,
            {
                "userId": "1"
            }
        );
    }
}