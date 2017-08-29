$(document).ready(function(){


    let delta = '120px';
    let w = 120;
    //инициализация начального положения
    $('.item').each(function (index) {
        $(this).css('left', index*parseFloat(delta) + 'px');
        var url = $(this).attr('url');
        $(this).css('background-image', 'url('.concat(url).concat(')'));
    });

    //прокрутка вправо
    $('#tape_right').click(function(){
        let arr = new Array(4);//заменить на кол-во блоков
        $('.item').each(function (index) {
            let rightBorder = parseFloat($(this).css('right'));
            if (rightBorder < w)
                arr[index] = 0;
            else {
                let currentLeft = parseFloat($(this).css('left'));
                arr[index] = currentLeft + w;
            }
            $(this).css('left', arr[index]);
        });
    });
    //прокрутка влево
    $('#tape_left').click(function(){
        let totalWidth = parseFloat($('#collection').width()); /*ширина всей конвейерной ленты*/
        let arr = new Array(4);//заменить на кол-во блоков
        $('.item').each(function (index) {
            let leftBorder = parseFloat($(this).css('left'));
            if (leftBorder === 0 || leftBorder < 0)
                arr[index] = totalWidth - w;
            else{
                let currentLeft = parseFloat($(this).css('left'));
                arr[index] = currentLeft - w;
            }
            $(this).css('left', arr[index]);
            //$(this).animate({left: arr[index]} ,300);
        });
    });
    //отображение стрелок прокрутки ленты

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
    //выбор элемента и отображение во вьюере
    $('.item').click(function(){
        $('#viewer img').attr('src', $(this).attr('url'));
    });


});