class LoginAuth {
    constructor() {
        this.url = window.params.url;
        this.imgurl = window.params.imgurl;
        this.basic = new $.JBasic();
    }

    isLogin() {
        var _this = this;
        var sessionid = _this.basic.getCookie("sessionid");
        var userid = _this.basic.getCookie("userid");
        var ak = _this.basic.getCookie("ak");
        if (userid == null || userid == "undefined" || sessionid == null || sessionid == "undefined") {
            window.location.href = "login.html";
            return false;
        }
        return true;
    }
}
//$(document).ready(function(){
//    var auth = new LoginAuth();
//    var flag = auth.isLogin();
//    if(flag==false){
//        return;
//    }
//});
