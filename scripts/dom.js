
class DOMEvents{
    static bindThumbnailNext(callback){
        $('#tape_right').bind('click', callback);
    };
    static bindThumbnailPrev(callback){
        $('#tape_left').bind('click', callback);
    };
    static bindViewerNext(callback){
        $('#viewer_right').bind('click', callback);
    };
    static bindViewerPrev(callback){
        $('#viewer_left').bind('click', callback);
    };
    static mouseThumbnailBehaviour(){
        $('#collection').mouseover(function () {
            $('.small-arrow').fadeIn(100);
        });
        $('#collection').mouseleave(function () {
            $('.small-arrow').fadeOut(100);
        });

    };
    static mouseViewerBehaviour(){
        $('#viewer').mouseover(function () {
            $('.arrow').fadeIn(100);
        });
        $('#viewer').mouseleave(function () {
            $('.arrow').fadeOut(100);
        });
    }
}

