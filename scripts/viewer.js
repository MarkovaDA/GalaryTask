class Viewer{
    constructor(callback){
        this.lastSketch = null;
        this.callback = callback;
        this.mouseBehaviour();
        $('#viewer_right').bind('click', this.next.bind(this));
        $('#viewer_left').bind('click', this.prev.bind(this));
    }
    view(sketch){
        this.lastSketch = sketch;
        //отображаем выделенный элемент
        $('#viewer .explore_zone').empty()
            .append(sketch.getPreview());
        //производим анимацию элемента
        sketch.animate();
    }
    //запрашиваем следующий элемент для отображения
    next(){
        let nextIndex = this.lastSketch.getNumber();
        this.callback(++nextIndex);
    }
    //запрашиваем предыдущий элемент для отображения
    prev(){
        let prevIndex = this.lastSketch.getNumber();
        this.callback(--prevIndex);
    }
    mouseBehaviour() {
        //отображение стрелок прокрутки в элементе обзора
        $('#viewer').mouseover(function () {
            $('.arrow').fadeIn(100);
        });
        $('#viewer').mouseleave(function () {
            $('.arrow').fadeOut(100);
        });
    }
}