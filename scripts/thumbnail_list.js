
/*
* Лента прокрутки элементов
*/
class ThumbnailList {

    constructor(){
        this.slides = [];
        this.current = 0;
        this.w = 120;
		
		//выбор thumbnail в thumbnailList
		emitter.subscribe('click_thumbnail', number => {
		    //закольцовываем прокрутку
            const count = this.count();
            if (number < 0)
                number = count - 1;
            if (number >= count)
                number = 0;
			this.current = parseInt(number);
			emitter.emit('choose_thumbnail', this.slides[this.current]);
		});
		
        $('#tape_right').bind('click', this.next.bind(this));
        $('#tape_left').bind('click', this.prev.bind(this));
    }
    add(media){
        let thumbnail = new Thumbnail(media,this.count());
        this.slides.push(thumbnail);
        $('#collection')
            .append(thumbnail.initDOM());
        thumbnail.leftOffset(this.count() * this.w);
    }

    /*прокрутка вправо*/
    next(){
        const _w = this.w;
        const length = this.count();
        //расчет смещений для прокрутки
        this.slides.forEach(function (elem) {
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
		emitter.emit('choose_thumbnail', this.slides[this.current]);
    }

    /*прокрутка влево*/
    prev(){
        const _w = this.w;
        let totalWidth = parseFloat($('#collection').width()); /*ширина всей конвейерной ленты*/

        //расчет смещений  для элементов ленты
        this.slides.forEach(function (elem) {
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
		emitter.emit('choose_thumbnail', this.slides[this.current]);
    }

    /*кол-во слайдов в галерее*/
    count(){
        return this.slides.length;
    }
}