"use strict";
class Company {
    constructor() {
        this.url = window.params.url;
        this.imgurl = window.params.imgurl;
        this.supply_detail_url = this.url + "/api/web/info/getSupplyInfo";
        this.basic = new $.JBasic();
        this.isMove = false;
    }

    imgSlider(){
        var _this = this;
        var tag_num = $(".cnt >li").length;
        var nav_widthx = document.body.clientWidth; //获取可视区域宽度
        var max_width = (tag_num * 140 - nav_widthx + 100) * -1; //获取左滑最大距离
        //alert(max_width);
        document.getElementById("slider").addEventListener('touchstart', _this.touchStart);
        document.getElementById("slider").addEventListener('touchmove', _this.touchMove);
        document.getElementById("slider").addEventListener('touchend', function() {
            _this.isMove = false;
        });
    }

    //滑动开始事件
    touchStart(e) {
        var _this = this;
        _this.isMove = true;
        e.preventDefault();
        _this.tx = parseInt($("#slider").css('left'));
        _this.x = e.touches[0].pageX;
    }

    touchMove(e) {
        var _this = this;
        if (_this.isMove) {
            e.preventDefault();
            var n = tx + e.touches[0].pageX - x;
            if (n <= 0 && n > max_width) {
                $("#slider").css('left', n + 'px');
            }
        }
    }

    loadSupplyInfo(infoId) {
        var _this = this;
        _this.basic.doRequest(
            this.supply_detail_url,
            function (result, data) {
                if (result) {
                    var status = data["status"];
                    if ("0000" == status) {
                        var result = data["result"];
                        $("#company_title").html(result['title']);
                        $("#company_time").html(result['createTime']);
                        $("#mainBusiness").html(result['mainBusiness']);
                        $("#superiority").html(result['superiority']);
                        $("#area").html(result['area']);
                        $("#address").html(result['address']);

                    } else {
                        _this.basic.toast("请稍后再试..");
                    }

                } else {
                    _this.basic.toast("请稍后再试..");
                }
            },
            {},
            {"id": infoId}
        );
    }
}

