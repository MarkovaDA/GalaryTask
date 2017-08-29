/*класс Slider, реализующий функционал галереи*/
class Slider {
    constructor(width) {
        this.w = width;
        this.currentIndex = 0;
        $('#tape_right').bind('click', this.next);
        $('#tape_left').bind('click', this.prev);
        this.mouseBehaviour();
    }
    /*добавить слайд в галерею*/
    addSlide(url){
        let slideContainer = $('<div class="item"></div>');
        slideContainer.attr('url', url);
        slideContainer.css('background-image', 'url('.concat(url).concat(')'));
        slideContainer.css('left', $('.item').length * this.w);
        $('#collection').append(slideContainer);
        //привязываем событие отображения при клике на иконку в ленте
        var selectFunc = this.select;
        slideContainer.bind('click', function () {
            selectFunc($(this));
        });
    }

    /*следующий слайд*/
    next(){
        let _w = 120;
        let arr = new Array($('.item').length);//заменить на кол-во блоков
        $('.item').each(function (index) {
            let rightBorder = parseFloat($(this).css('right'));
            if (rightBorder < _w)
                arr[index] = 0;
            else {
                let currentLeft = parseFloat($(this).css('left'));
                arr[index] = currentLeft + _w;
            }
            $(this).css('left', arr[index]);
        });
        console.log(this.currentIndex++);
    }
    /*предыдущий слайд*/
    prev(){
        let _w = 120;
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
        console.log(this.currentIndex--);
    }
    viewerPrev(){
        //отображение с слайдере следующей картинки
    }
    viewerNext(){
        //отображение с слайдере предыдущей картинки
    }
    /*отображение выбранного элемента из ленты*/
    select(sliderItem){
         console.log('from select', sliderItem.attr('url'));
         $('#viewer img').attr('src', sliderItem.attr('url'));
         //небольшой эффект увеличения слайда
         $('#viewer img').css('width', '30%');
         $('#viewer img').animate({'width':'50%'},300);
    }
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