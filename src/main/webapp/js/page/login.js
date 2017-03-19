class Login{
    constructor() {
        this.url = window.params.url;
        this.imgurl = window.params.imgurl;
        this.login_url = this.url + "/api/wx/account_login";
        this.basic = new $.JBasic();
    }

    init(){
        var _this = this;
        $('#login_btn').bind("click", function(){
            _this.login();
        });
    }

    login() {
        var _this = this;
        var param = {
            "username": $("#username").val(),
            "password": $("#password").val()
        };

        _this.basic.doRequest(
            this.login_url,
            function (result, data) {
                if (result) {
                    var status = data["status"];
                    if ("0000" == status) {
                        _this.basic.setCookie("sessionid", data["sessionid"]);
                        _this.basic.setCookie("userid", data["userid"]);
                        _this.basic.setCookie("ak", "0310010010909");
                        _this.basic.toast("登录成功");
                        window.history.back();
                    }
                    else {
                        _this.basic.toast("请稍后再试..");
                    }

                } else {
                    _this.basic.toast("请稍后再试..");
                }
            },{},param,'POST'
        );
    }
}
$(document).ready(function(){
    var login = new Login();
    login.init();
});
