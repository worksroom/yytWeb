/**
 * Created by admin on 2016/11/14.
 */
window.onload=function(){
    var objul=document.getElementsByTagName("ul")[1];
    var lis=objul.getElementsByTagName("li");
    document.getElementsByTagName("li").length;
    //alert(lis.length);
    var perLiVal = 100/lis.length-0.1;
    $(".phone li").css({width:perLiVal+"%"});
}
