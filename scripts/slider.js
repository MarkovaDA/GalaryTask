/*класс Slider, реализующий функционал галереи*/
class Slider {
    constructor(width) {
        this.w = width;
        this.currentIndex = -1;
        $('#tape_right').bind('click', this.next.bind(this));
        $('#tape_left').bind('click', this.prev.bind(this));
        $('#viewer_left').bind('click', this.viewerPrev.bind(this));
        $('#viewer_right').bind('click', this.viewerNext.bind(this));
        this.mouseBehaviour();
    }
    /*добавить слайд в галерею*/
    addSlide(url){
        let slideContainer = $('<div class="item"></div>');
		let classContext = this;
        slideContainer.attr('url', url);
        slideContainer.css('background-image', 'url('.concat(url).concat(')'));
        slideContainer.css('left', $('.item').length * this.w);
        $('#collection').append(slideContainer);
        //привязываем событие отображения при клике на иконку в ленте
        var selectFunc = this.select;
		
        slideContainer.bind('click', function () {
			console.log(classContext, classContext.currentIndex);			
			classContext.currentIndex = $('.item').index(slideContainer); 
			console.log('currentIndex from addSlide', classContext.currentIndex);
            selectFunc($(this));
        });
    }

    /*прокрутка ленты вперед*/
    next(){
        let _w = this.w;
		let itemLength = $('.item').length;
        let arr = new Array(itemLength);//заменить на кол-во блоков
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
    /*обзор предыдущего слайда*/
	viewerPrev(){
		if (--this.currentIndex < 0) this.currentIndex = $('.item').length - 1;
        //отображение предыдущего элемента в контейнере обзора
        this.select($('.item').eq(this.currentIndex));
      
    }
	/*обзор следующего слайда*/
    viewerNext(){
		let itemLength = $('.item').length;
        //отображение следующего элемента в контейнере обзора
		if (++this.currentIndex >= itemLength) this.currentIndex = 0;
        this.select($('.item').eq(this.currentIndex));   
    }
	
    /*выбор элемента из ленты для обзора*/
    select(sliderItem){		 
		 $('#viewer img').attr('src', sliderItem.attr('url'));
		 //небольшой эффект увеличения слайда
		 $('#viewer img').css('width', '30%');
		 $('#viewer img').animate({'width':'50%'},300);
		  //выделяем отображаемый в данный момент элемент рамкой
	     $('.item').removeClass('selection');
         sliderItem.addClass('selection');
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