/**
 * Created by admin on 2016/11/14.
 */
$(function(){
    /*-----------------复选框样式切换-----------*/
    $("input[type='checkbox']").click(function(){
        if($(this).hasClass("checks")){
            $(this).addClass("checks2").attr("checked","checked");
            $(this).parent("div").siblings("div").children("em").addClass("select-color");
            $(this).removeClass("checks").attr("checked","");
        }else{
            $(this).addClass("checks").attr("checked","");
            $(this).removeClass("checks2").attr("checked","checked");
            $(this).parent("div").siblings("div").children("em").removeClass("select-color");
        }
    })
    /*-----------------地址切换选择-------------*/
    $("input[name='carCheckBox']").click(function () {
        if($(this).hasClass("checks2")){
            $(this).parents("div").siblings("div").find("input").removeClass("checks2").addClass("checks");
            $(this).parents("div").siblings("div").find("em").removeClass("select-color");
            $(this).parent("div").siblings("div").children("em").addClass("select-color");
        }
    })
    /*---------点击一级菜单二级菜单展示-----------*/
    $(".div-list").click(function(){
        $(this).addClass("list-down").next("ul.list-ul").slideToggle(300).siblings("ul.list-ul").slideUp("slow");
        $(this).siblings().removeClass("list-down");
    });
    /*---------------点击Tab菜单切换---------------*/
    var tabMenu=$(".tab li");
    tabMenu.click(function () {
        var index=$(this).index();
        $(".tab li").eq(index).addClass("active").siblings().removeClass("active");
        $(".first").eq(index).show().siblings().hide();
    })
    //var orderTab=$(".order-tab li");
    //orderTab.click(function () {
    //    var index=$(this).index();
    //    $(".order-tab li").eq(index).addClass("order-active").siblings().removeClass("order-active");
    //    $(".order-cont").eq(index).show().siblings().hide();
    //})
    /*-------------所有宝贝分类---------*/
    //var tabMenu=$(".dotey li");
    //tabMenu.click(function () {
    //    var index=$(this).index();
    //    $(".dotey li").eq(index).addClass("active").siblings().removeClass("active");
    //    $(".dotey-display").eq(index).show().siblings().hide();
    //})
    /*-----点击全选时，购物车按钮全部选中--------*/
    $("#allSelect").click(function(){
        if($(this).hasClass("checks2")){
            $("input[name='checkbox']").addClass("checks2");
        }else{
            $("input[name='checkbox']").removeClass("checks2");
        }
    })
    /*--------点击选中公司时，同时选中公司产品-------*/
    var companyCheck=$(".isSelect input[type='checkbox']");
    companyCheck.click(function(){
        if($(this).hasClass("checks2")){
            $(this).parents("div").nextAll("div").children("div").children("input").addClass("checks2")
        }else{
            $(this).parents("div").nextAll("div").children("div").children("input").removeClass("checks2");
        }
    })
    /*--------------------型号选择--------------*/
    //$(".model input[type='button']").each(function () {
    //    $(this).click(function () {
    //        $(this).addClass("active").siblings("input").removeClass("active");
    //    })
    //})
    /*------------------添加购买数量-------------*/
    $("#add").click(function () {
        var addValue=$("#modelNumber");
            addNumber(addValue);
    });
    $("#lose").click(function () {
        var changeNumber=$("#modelNumber");
        loseNumber(changeNumber);
    });
    $("#shadeAdd").click(function () {
        var addValue=$("#shadeNumber");
        addNumber(addValue);
    });
    $("#shadeLose").click(function () {
        var changeNumber=$("#shadeNumber");
        loseNumber(changeNumber)
    });
    $("#shade-Add").click(function () {
        var addValue=$("#shade-Number");
        addNumber(addValue);
    });
    $("#shade-Lose").click(function () {
        var changeNumber=$("#shade-Number");
        loseNumber(changeNumber)
    });
    /*-----------购物车数量增加减少-----------*/
    var carValue=$(".addValue");
    carValue.click(function () {
        var addValue=$(this).prev("div");
        addNumber(addValue);
    });
    var carLoseValue=$(".loseValue");
    carLoseValue.click(function () {
        var changeNumber=$(this).next("div");
        loseNumber(changeNumber);
    })
    function addNumber(addValue){
        var modelNumber=addValue.html();
        var modelSum=parseInt(modelNumber)+1;
        addValue.html(modelSum);
        if(modelSum==0){
            return
        }
        addValue.html(modelSum);
    }
    function loseNumber(changeNumber){
        var modelNumbers=changeNumber.html();
        var modelSubtract=parseInt(modelNumbers)-1;
        if(modelSubtract<1){
            modelSubtract=1;
        }
        changeNumber.html(modelSubtract);
    }
    /*------------点击展开选择品牌型号-------------*/
    $("#selectModel").click(function(){
        $(".product-cont").toggle();
        $(this).toggleClass("up");
        if($(this).hasClass("up")){
            $(this).html("请选择");
        }else{
            $(this).html("选择  产品型号 规格");
        }
    });
    /*------------点击查看全部评论-------------*/
    $("#lookReview").click(function () {
        $(".review").show();
    })
    /*---------点击添加购物车----------*/
    $("#addCar").click(function(){
        $(".shade").show();
        animateCont();
    })
    $(".shade-close").click(function () {
        $(".shade,.affirm").hide();
        $(".shade-cont").animate({
            height:"0",
        });
        $(".section").css("backgroundColor","#f0f0f0");
        $(".scaled").animate({
            width:"100%",
            marginLeft:"0",
        })
    })
    function animateCont() {
        $(".shade-cont").animate({
            height:"75%",
        },"slow");
        $(".section").css("backgroundColor","#000000");
        $(".scaled").animate({
            width:"90%",
            marginLeft:"5%",
        },"slow")
    }
    /*-------------评价-------------*/
    $(".star-width .star").each(function () {
        $(this).click(function () {
            if($(this).hasClass("star2")){
                $(this).nextAll().removeClass("star2");
            }else {
                $(this).prevAll().addClass("star2");
            }
        })
    })
    /*--------点击价钱时，由多到少--------*/
    //$(".dotey li:last-child").click(function () {
    //    if($(this).hasClass("active")){
    //        $(this).click(function () {
    //            $(this).addClass("money-top");
    //            $(this).click(function () {
    //                if($(this).hasClass("money-top")){
    //                    $(this).addClass("money-down").removeClass("money-top");
    //                }else {
    //                    $(this).removeClass("money-down").addClass("money-top");
    //                }
    //            })
    //        })
    //    }
    //})
    //$(".dotey li:last-child").prevAll().click(function () {
    //    if($(".dotey li:last-child").hasClass("money-top")){
    //        $(".dotey li:last-child").removeClass("money-top");
    //    }else{
    //        $(".dotey li:last-child").removeClass("money-down");
    //    }
    //})
    /*----------------删除地址----------------*/
    //var deleteIncident=$(".delete");
    //for(var i=0;i<deleteIncident.length;i++){
    //    deleteIncident.click(function () {
    //        $(this).parents("div").hide();
    //    })
    //}
    /*-------当所搜框有内容时无背景图片------*/
    $(".search-btn").bind("blur",function () {
        if($(this).val().length==""){
            $(this).removeClass("searchValue");
        }else{
            $(this).addClass("searchValue");
        }
    })
    /*------------首页搜索跳转另一个页面---------*/
    $("#searchLocation").focus(function () {
        window.location="search.html";
    })

    /*-----------------消息、联系人切换-----------*/
    var tabA=$("#footer a");
    tabA.click(function(){
        var index=$(this).index();
        $(".first").eq(index).show().siblings().hide();
        if(!$(".first").eq(0).is(':hidden')){
            tabA.eq(0).addClass("message-active").removeClass("message");
        }else{
            tabA.eq(0).addClass("message").removeClass("message-active");
        };
        if(!$(".first").eq(1).is(':hidden')){
            tabA.eq(1).addClass("linkman-active").removeClass("linkman");
        }else{
            tabA.eq(1).addClass("linkman").removeClass("linkman-active");
        }
    })
    /*----------------厂商供应及用户需求切换---------------------*/
    var facturerTab=$("#facturer a");
    facturerTab.click(function(){
        var index=$(this).index();
        $("#facturer a").eq(index).addClass("facturer-active").siblings().removeClass("facturer-active");
        if (!$("#facturer a").eq(0).hasClass("facturer-active")){
            $("#carImg").attr("src","img/zx/icon04.png");
        }else {
            $("#carImg").attr("src","img/zx/icon02.png");
        };
        if (!$("#facturer a").eq(1).hasClass("facturer-active")){
            $("#needImg").attr("src","img/zx/icon03.png");
        }else {
            $("#needImg").attr("src","img/zx/icon05.png");
        }
        $(".hide").eq(index).show().siblings().hide();
    })
    $(".add-btn").click(function () {
        $("#neverAll").toggle();
    })
})
function back() {
    window.history.back();
}
//function next() {//绑定手机
//    window.location="binding.html";
//}
//function openLocation() {//添加地址
//    window.location="addlocation.html";
//}
function openEvaluate() {//评价
    window.location="evaluate.html";
}
function openPay() {//立即购买
    window.location="affirm.html";
}function addLocation() {//添加地址完成
    window.location="address.html";
}
/*----------聊天页面跳转--------*/
function  missZhao() {
    window.location="chat.html";
};
function backUp(){
    window.location="index.html";
}