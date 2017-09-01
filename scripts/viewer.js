class Viewer{
    constructor(){
        this.thumbnail = null;

        $('#viewer_right').bind('click', this.next.bind(this));
        $('#viewer_left').bind('click', this.prev.bind(this));
    }
    view(slide){
        //закрыть предыдущий отображаемый элемент
        if (this.thumbnail != null){
            this.thumbnail.close();
        }
        this.thumbnail = slide;

        $('#viewer .explore_zone')
            .empty()
            .append(slide.getPreview());

        slide.animate();
    }
    //запрашиваем следующий элемент для отображения
    next(){
        let nextIndex = this.thumbnail.getNumber();
		emitter.emit("view_another", ++nextIndex);
    }
    //запрашиваем предыдущий элемент для отображения
    prev(){
        let prevIndex = this.thumbnail.getNumber();
		emitter.emit("view_another", --prevIndex);
    }
}