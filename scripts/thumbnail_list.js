
/*
* Лента прокрутки элементов
*/
class ThumbnailList {

    constructor(){
        this.sketches = [];
        this.current = 0;
        this.w = 120;
		
		//подписка на событие выбора thumbnail
		emitter.subscribe('click_thumbnail', number => {
			this.current = parseInt(number);
			emitter.emit('choose_thumbnail', this.sketches[this.current]);
			//связываемся с классом слайдер
		});
        //обратная связь с обозревателем
        /*this.viewerNextPrevCallback = function(number){
            if (number < 0)
                number = context.count() - 1;
            if (number >= context.count())
                number = 0;
            context.viewer.view(context.sketches[number]);
        };*/
        //this.viewer = new Viewer(this.viewerNextPrevCallback);

        $('#tape_right').bind('click', this.next.bind(this));
        $('#tape_left').bind('click', this.prev.bind(this));
        this.mouseBehaviour();
    }

    /*добавить элемент в ленту прокрутки*/
    addSketch(url){
        let sketch = new Thumbnail(new Image(url),this.sketches.length);
        this.sketches.push(sketch);
        //добавили в дом
        $('#collection').append(sketch.initDOM());
    }
    /*прокрутка вправо*/
    next(){
        this.sketches[this.current].close();//закрываем текущий открытый элемент
        const _w = this.w;
        const length = this.count();
        //расчет смещений для прокрутки
        this.sketches.forEach(function (elem) {
            let value;
            const rightBorder = elem.rightOffset();
            if (rightBorder < 0)
                value = 0;
            else {
                const currentLeft = elem.leftOffset();
                value = currentLeft + _w;
            }
            elem.leftOffset(value);
        });

        //обновление номера текущего слайда
        if (++this.current >= length)
            this.current = 0;
		emitter.emit('choose_thumbnail', this.sketches[this.current]);
    }
    /*прокрутка влево*/
    prev(){
        this.sketches[this.current].close();
        const _w = this.w;
        const length = this.count();
        let totalWidth = parseFloat($('#collection').width()); /*ширина всей конвейерной ленты*/

        //расчет смещений  для элементов ленты
        this.sketches.forEach(function (elem) {
           let value;
            const leftBorder = elem.leftOffset();
            if (leftBorder === 0 || leftBorder < 0) {
                value = totalWidth - _w;
            }
            else {
                value = leftBorder - _w;
            }
            elem.leftOffset(value);
        });

        //обновление номера текущего слайда
        if (--this.current < 0)
            this.current = this.count() - 1;
		emitter.emit('choose_thumbnail', this.sketches[this.current]);
    }
    /*кол-во слайдов в галерее*/
    count(){
        return this.sketches.length;
    }

    mouseBehaviour(){
        //поведение мыши
        $('#collection').mouseover(function () {
            $('.small_arrow').fadeIn(100);
        });
        $('#collection').mouseleave(function () {
            $('.small_arrow').fadeOut(100);
        });
    }

}