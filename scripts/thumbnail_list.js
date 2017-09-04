
/*
* Лента прокрутки элементов
*/
class ThumbnailList extends EventEmitter{

    constructor(){
        super();

        this.thumbnails = [];
        this.current = 0;
        this.w = 120;

        $('#tape_right').bind('click', this.next.bind(this));
        $('#tape_left').bind('click', this.prev.bind(this));
    }
    add(type, url){
        const thumbnail = new Thumbnail(type, url, this.count());


        thumbnail.subscribe('CLICK_THUMBNAIL', (number)=>{
            this.onClickThumbnail(number);
        });
        this.thumbnails.push(thumbnail);
        $('#collection')
            .append(thumbnail.initDOM());
        thumbnail.leftOffset(this.count() * this.w);
    }
    onClickThumbnail(number){
        const count = this.count();
        if (number < 0)
            number = count - 1;
        if (number >= count)
            number = 0;
        this.current = parseInt(number);
        const type = this.thumbnails[number].type;
        const url =  this.thumbnails[number].url;
        this.emit('CHOOSE_THUMBNAIL', {"type":type, "url":url, "number":number});
    }
    /*прокрутка вправо*/
    next(){
        const _w = this.w;
        const length = this.count();
        //расчет смещений для прокрутки
        this.thumbnails.forEach(function (elem) {
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

        const type = this.thumbnails[this.current].type;
        const url =  this.thumbnails[this.current].url;

        this.emit('CHOOSE_THUMBNAIL', {"type":type, "url":url, "number":this.current});
    }

    /*прокрутка влево*/
    prev(){
        const _w = this.w;
        let totalWidth = parseFloat($('#collection').width()); /*ширина всей конвейерной ленты*/

        //расчет смещений  для элементов ленты
        this.thumbnails.forEach(function (elem) {
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

        const type = this.thumbnails[this.current].type;
        const url =  this.thumbnails[this.current].url;

        this.emit('CHOOSE_THUMBNAIL', {"type":type, "url":url, "number": this.current});
    }

    /*кол-во слайдов в галерее*/
    count(){
        return this.thumbnails.length;
    }
}