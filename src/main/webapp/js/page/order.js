"use strict";
class Order {
    constructor() {
        this.url= window.params.url;
        this.imgurl = window.params.imgurl;
        this.url = this.url + "/api/web/login/order/car";
        this.basic = new $.JBasic();
    }
    init(){

    }

}