(function(d, $){
    var scrollPicView = d.getElementById("scroll_pic_view"),
        scrollPicViewDiv = d.getElementById("scroll_pic_view_div"),
        lis = scrollPicViewDiv.querySelectorAll("li"),
        w = scrollPicView.offsetWidth,
        len = lis.length;
    for(var i=0; i<len; i++){
        lis[i].style.width = w+"px";
        if(i == len-1){
            scrollPicViewDiv.style.width = w * len + "px";
        }
    }

    scroll_pic_view = new iScroll('scroll_pic_view', {
        snap: true,
        momentum: false,
        hScrollbar: false,
        useTransition: true,
        onScrollEnd: function() {
            $("#scroll_pic_nav li").removeClass("on").eq(this.currPageX).addClass("on");
            //$("#scroll_pic_nav li.on").prev().addClass("left");
            //$("#scroll_pic_nav li.on").next().removeClass("left");

            var  list=$("#scroll_pic_nav li");
            for(var k=0;k<list.length;k++){
                if(k<this.currPageX)
                    $(list[k]).addClass("left");
                else
                    $(list[k]).removeClass("left");
            }
        }
    });
    //
    var nav_lis = new Array(lis.length);
    d.write('<li class="on"><span></span></li>');
    for(var i=1; i<nav_lis.length; i++){
        d.write("<li><span>"+""+"</span></li>");
    }
})(document, $);