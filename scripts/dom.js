$(document).ready(function(){
    //поведение мыши
    $('#collection').mouseover(function () {
        $('.small_arrow').fadeIn(100);
    });
    $('#collection').mouseleave(function () {
        $('.small_arrow').fadeOut(100);
    });
    $('#viewer').mouseover(function () {
        $('.arrow').fadeIn(100);
    });
    $('#viewer').mouseleave(function () {
        $('.arrow').fadeOut(100);
    });

});