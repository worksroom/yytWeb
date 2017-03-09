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
    getData(){
        var _this = this;
        var classId = _this.basic.getQueryString("classId");
        _this.basic.doRequest(
            this.product_url,
            function(result,data){

            },
            {},
            {"pageIndex":_this.pageIndex,
            "pageSize":_this.pageSize,
            "classId":classId,
            "type":_this.type}
        );

    }

}