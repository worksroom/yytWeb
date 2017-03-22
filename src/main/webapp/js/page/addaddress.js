"use strict";
class AddressCURD {
    constructor() {
        this.url = window.params.url;
        this.imgurl = window.params.imgurl;
        this.address_add_url = this.url + "/api/web/address/add";
        this.address_get_url = this.url + "/api/web/address/get";
        this.basic = new $.JBasic();
    }

    init(){
        var _this = this;
        var addrId = _this.basic.getQueryString("addrId");
        if(addrId>0){
            _this.loadAddr(addrId);
        }

        $('#submit').bind("click", function(){
            _this.add();
        });
    }

    loadAddr(addrId){
        var _this = this;
        _this.basic.doRequest(
            this.address_get_url,
            function (result, data) {
                if (result) {
                    var status = data["status"];
                    if ("0000" == status) {
                        var result = data["result"];
                        $("#id").val(result['id']);
                        $("#name").val(result['name']);
                        $("#phone").val(result['phone']);
                        $("#region").html(result['region']);
                        $("#street").val(result['street']);
                        $("#addr").val(result['addr']);
                        if(result['defaultAddr']==1){
                            $("#default_flag").attr("class", "checks2");
                            $('#default_flag').attr('checked','checked');
                        }

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
                "addrId": addrId
            },''
        );
    }

    //添加或修改收货地址
    add(){
        var default_flag=0;
        if($('#default_flag').attr('checked')){
            default_flag = 1;
        }
        var param ={
            "id": $("#id").val(),
            "name": $("#name").val(),
            "phone": $("#phone").val(),
            "region": $("#region").html(),
            "street": $("#street").val(),
            "addr": $("#addr").val(),
            "default_flag": default_flag
        }
        var _this = this;
        _this.basic.doRequest(
            this.address_add_url,
            function (result, data) {
                if (result) {
                    var status = data["status"];
                    if ("0000" == status) {
                        _this.basic.toast("保存成功");
                        window.history.back();
                    }
                    else {
                        _this.basic.toast("请稍后再试..");
                    }

                } else {
                    _this.basic.toast("请稍后再试..");
                }
            },
            _this.basic.getUaHeadParam(),
            param,
            'POST'
        );
    }

}