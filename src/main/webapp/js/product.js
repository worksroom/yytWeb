/**
 * Created by admin on 2016/11/24.
 */
/*---------------图片切换----------------*/
$(document).ready(function() {
    tag_num = $(".cnt >li").length;
    nav_widthx = document.body.clientWidth; //获取可视区域宽度
    max_width = (tag_num * 140 - nav_widthx + 100) * -1; //获取左滑最大距离
    //alert(max_width);
    document.getElementById("slider").addEventListener('touchstart', touchStart);
    document.getElementById("slider").addEventListener('touchmove', touchMove);
    document.getElementById("slider").addEventListener('touchend', function() {
        isMove = false;
    });

});
//滑动开始事件
function touchStart(e) {
    isMove = true;
    e.preventDefault();
    tx = parseInt($("#slider").css('left'));
    x = e.touches[0].pageX;
}

function touchMove(e) {
    if (isMove) {
        e.preventDefault();
        var n = tx + e.touches[0].pageX - x;
        if (n <= 0 && n > max_width) {
            $("#slider").css('left', n + 'px');
        }
    }
}
