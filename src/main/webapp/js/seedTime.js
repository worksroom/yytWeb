/**
 * Created by admin on 2016/11/14.
 */
/*---------------获取验证码-------------------*/
var oTime='';
var num=60;
var btn;
function sendTime(thisBtn){
    btn=thisBtn;
    btn.disabled=true;
    btn.value =num+'s';
    oTime=setInterval(showTime,1000);
}
function showTime(){
    num--;
    if(num > 0){
        btn.value =num+'s';
    }else{
        clearInterval(oTime)
        btn.disabled=false;
        btn.value ='重新获取';
        num=60;
    }
}
