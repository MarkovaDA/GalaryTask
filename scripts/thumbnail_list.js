
/*
* Лента прокрутки элементов
*/
class ThumbnailList extends EventEmitter{

    constructor(){
        super();

        this.thumbnails = [];
        this.current = 0;//номер текущего thumbnail
        this.w = 120;

        DOMEvents.mouseThumbnailBehaviour();
        DOMEvents.bindThumbnailNext(this.next.bind(this));
        DOMEvents.bindThumbnailPrev(this.prev.bind(this));
    }
    add(type, url){
        const thumbnail = new Thumbnail(type, url, this.count());

        //thumbnail: выбран новый элемент для отображения
        thumbnail.on('CLICK_THUMBNAIL', (number)=>{
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

        this.current = number;

        this.emit('CHOOSE_THUMBNAIL', this.getInfo(number));
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

        this.emit('CHOOSE_THUMBNAIL', this.getInfo(this.current));
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

        this.emit('CHOOSE_THUMBNAIL', this.getInfo(this.current));
    }

    /*кол-во слайдов в галерее*/
    count(){
        return this.thumbnails.length;
    }

    /*данные выбранного thumbnail*/
    getInfo(number){
        const thumbnail = this.thumbnails[number];
        return {'type': thumbnail.type, 'url': thumbnail.url, 'number': number};
    }
}