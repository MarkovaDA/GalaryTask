/*отдельный элемент галереи*/
class ItemGallery {
    constructor(_media, _w){
        this.media = _media; /*отображаемый объект: изображение или видео*/
        this.w = _w;/*ширина одного элемента в ленте*/
        this.root = null;
    }
    /*единичный элемент в ленте*/
    slider(){
        this.root = $('<div class="item"></div>');
        const url = this.media.src();
        this.root.attr('url', url);
        this.root.css('background-image', 'url('.concat(url).concat(')'));

        if (this.media instanceof Video) //корректируем размер иконки для видео-контента
            this.root.css('background-size', '50% auto');

        this.root.css('left', $('.item').length * this.w);
        return this.root;
    }
    /*анимация при отображении*/
    animate(){
        this.media.animate();
    }
    /*представление элемента*/
    preview(){
        return this.media.element();
    }
    /*выделить элемент рамкой*/
    pickout(){
        this.root.addClass('selection');
    }
    /*закрытие элемента*/
    close(){
        if (this.media instanceof Video)
            this.media.close();
    }
    /*отступ элемента слева*/
    leftProp(value){
        if (typeof value !== 'undefined') {
            this.root.css('left', value);
        } else {
            return parseFloat(this.root.css('left'));
        }
    }
    /*отступ элемента справа*/
    rightProp(){
        return parseFloat(this.root.css('right'));
    }
}

/*галерея как набор элементов*/
class Gallery {
    constructor(width) {
        this.w = width;
        this.currentIndex = -1;
        this.slides = [];//набор слайдов

        $('#tape_right, #viewer_right').bind('click', this.next.bind(this));
        $('#tape_left, #viewer_left').bind('click', this.prev.bind(this));

        this.mouseBehaviour();
    }

    /*добавить слайд в галерею*/
    add(media){
        const itemGalery = new ItemGallery(media, this.w);
        this.slides.push(itemGalery);
        const slider =  itemGalery.slider();
        $('#collection').append(slider);

        //привязка реакции на клик
        const context = this;
        slider.bind('click', function () {
            context.currentIndex = $('.item').index(slider);
            context.view();
        });
        return this;
    }
    /*прокрутка ленты вперед*/
    next(){

        if (this.currentIndex === -1) //прокрутка не выполняется если не выбран элемент
            return;
        this.currentSlide().close();//закрываем текущий открытый элемент
        const _w = this.w;
		const itemLength = this.count();

        //расчет смещений  для элементов ленты
        let elem, value;
        for(let i=0; i < itemLength; i++){
            elem = this.slides[i];
            const rightBorder = elem.rightProp();
            if (rightBorder < 0)
                value = 0;
            else {
                const currentLeft = elem.leftProp();
                value = currentLeft + _w;
            }
            elem.leftProp(value);
        }
        //обновление номера текущего слайда
        if (++this.currentIndex >= itemLength)
            this.currentIndex = 0;
        //отображаем выбранный элемент в просмотрщике
        this.view();
    }

    /*прокрутка ленты назад*/
    prev(){
        if (this.currentIndex === -1) //прокрутка не выполняется если не выбран элемент
            return;
        this.currentSlide().close();
        const _w = this.w;
        const itemLength = this.count();
        let totalWidth = parseFloat($('#collection').width()); /*ширина всей конвейерной ленты*/

        //расчет смещений  для элементов ленты
        let elem, value;
        for(let i=0; i < itemLength; i++){
            elem = this.slides[i];
            const leftBorder = elem.leftProp();
            if (leftBorder === 0 || leftBorder < 0)
                value = totalWidth - _w;
            else
                value = leftBorder - _w;
            elem.leftProp(value);
        }
        //обновление номера текущего слайда
        if (--this.currentIndex < 0)
            this.currentIndex = this.count() - 1;
        //отображаем выбранный элемент в просмотрщике
        this.view();
    }

    /*текущий слайд*/
    currentSlide(){
        return this.slides[this.currentIndex];
    }
    /*кол-во слайдов в галерее*/
    count(){
        return this.slides.length;
    }
    /*обзор  выбранного элемента*/
    view(){
        $('#viewer .explore_zone').empty().append(this.currentSlide().preview());
        this.currentSlide().animate();
        this.unselectAll();
        this.currentSlide().pickout();
    }

    unselectAll(){
        $('.item').removeClass('selection');
    }
	/*поведение отдельных элементов слайдера при наведении мыши*/
    mouseBehaviour(){
        //поведение мыши
        $('#collection').mouseover(function () {
            $('.small_arrow').fadeIn(100);
        });
        $('#collection').mouseleave(function () {
            $('.small_arrow').fadeOut(100);
        });
        //отображение стрелок прокрутки в элементе обзора
        $('#viewer').mouseover(function () {
            $('.arrow').fadeIn(100);
        });
        $('#viewer').mouseleave(function () {
            $('.arrow').fadeOut(100);
        });
    }
}