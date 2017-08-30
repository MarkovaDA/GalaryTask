/*отдельный элемент галереи*/
class ItemGallery {
    constructor(media){
        this.media = media;
        this.w = 120;/*ширина одного элемента в ленте*/
        this.root = null;
    }
    /*единичный элемент в ленте*/
    slider(){
        this.root = $('<div class="item"></div>');
        const url = this.media.getSrc();
        this.root.attr('url', url);
        this.root.css('background-image', 'url('.concat(url).concat(')'));
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
        console.log(this.root);
        this.root.addClass('selection');
    }
}

/*галерея как набор элементов*/
class Gallery {

    constructor(width) {
        this.w = width;
        this.currentIndex = -1;
        this.sliders = new Array();//набор слайдеров

        $('#tape_right').bind('click', this.next.bind(this));
        $('#tape_left').bind('click', this.prev.bind(this));
        $('#viewer_left').bind('click', this.viewerPrev.bind(this));
        $('#viewer_right').bind('click', this.viewerNext.bind(this));
        this.mouseBehaviour();
    }

    /*добавить слайд в галерею*/
    addSlide(media){
        const itemGalery = new ItemGallery(media);
        this.sliders.push(itemGalery);
        const slider =  itemGalery.slider();
        $('#collection').append(slider);

        const context = this;
        slider.bind('click', function () {
            context.currentIndex = $('.item').index(slider);
            context.view();
        });
    }
    /*прокрутка ленты вперед*/
    next(){
        const _w = this.w;
		const itemLength = $('.item').length;//заменить длиной массива
        const arr = new Array(itemLength);//заменить на кол-во блоков
        //заменить циклом по элементам
        $('.item').each(function (index) {
            let rightBorder = parseFloat($(this).css('right'));
            if (rightBorder < 0)
                arr[index] = 0;
            else {
                let currentLeft = parseFloat($(this).css('left'));
                arr[index] = currentLeft + _w;
            }
            $(this).css('left', arr[index]);
        });
        if (++this.currentIndex >= itemLength) this.currentIndex = 0;
    }
    /*прокрутка ленты назад*/
    prev(){
        let _w = this.w;
        let totalWidth = parseFloat($('#collection').width()); /*ширина всей конвейерной ленты*/
        let arr = new Array($('.item').length);//заменить на кол-во блоков
        $('.item').each(function (index) {
            let leftBorder = parseFloat($(this).css('left'));
            if (leftBorder === 0 || leftBorder < 0)
                arr[index] = totalWidth - _w;
            else{
                let currentLeft = parseFloat($(this).css('left'));
                arr[index] = currentLeft - _w;
            }
            $(this).css('left', arr[index]);
            //$(this).animate({left: arr[index]} ,300);
        });
        if (--this.currentIndex < 0) this.currentIndex = $('.item').length - 1;		
    }

    currentSlide(){
        return this.sliders[this.currentIndex];
    }

    /*обзор предыдущего слайда*/
	viewerPrev(){
		if (--this.currentIndex < 0) this.currentIndex = $('.item').length - 1;
        //отображение предыдущего элемента в контейнере обзора
        this.view();
      
    }
	/*обзор следующего слайда*/
    viewerNext(){
		const itemLength = $('.item').length;
        //отображение следующего элемента в контейнере обзора
		if (++this.currentIndex >= itemLength) this.currentIndex = 0;
        this.view();
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