
/*
* Лента прокрутки элементов
*/

/*const  WIDTH = 120;*/

class ThumbnailList extends EventEmitter{
    constructor(){
        super();

        this.thumbnails = [];
        this.currentIndex = 0;//номер текущего thumbnail
        this.width = 120;
        this.root = null;

        this.initDOM();
        this.bindDOMEvents();
    }
    initDOM(){
        //this.root = $('.collection');
        this.root = $(`
            <div class="collection">
                <div class="small-arrow small-arrow-left"></div>
                <div class="small-arrow small-arrow-right"></div>
            </div>
        `);
    }

    add(data){
        const thumbnail = new Thumbnail(data);

        //thumbnail: выбран новый элемент для отображения
        thumbnail.on('CLICK_THUMBNAIL', (index)=> {
            this.onClickThumbnail(index);
        });

        this.thumbnails.push(thumbnail);

        this.root.append(thumbnail.root);

        thumbnail.leftOffset(this.count() * this.width);
    }
    onClickThumbnail(index){
        this.currentIndex = index;
        this.emit('CHOOSE_THUMBNAIL', index);
    }
    /*прокрутка вправо*/
    next(){
        const w = this.width;
        const length = this.count();
        //расчет смещений для прокрутки
        this.thumbnails.forEach(function (elem) {
            let value;
            const maxRightOffset = elem.rightOffset();

            if (maxRightOffset < 0) {
                value = 0;
            } else {
                const currentLeft = elem.leftOffset();
                value = currentLeft + w;
            }

            elem.leftOffset(value);
        });

        //обновление номера текущего слайда

        let newIndex = this.currentIndex + 1;

        if (newIndex >= length) {
            newIndex = 0;
        }
        this.currentIndex = newIndex;

        this.emit('CHOOSE_THUMBNAIL', newIndex);
    }

    /*прокрутка влево*/
    prev(){
        const w = this.width;
        const totalWidth = parseFloat(this.root.width()); /*ширина всей конвейерной ленты*/

        //расчет смещений  для элементов ленты
        this.thumbnails.forEach(function (elem) {
           let value;
            const maxLeftOffset = elem.leftOffset();
            if (maxLeftOffset === 0 || maxLeftOffset < 0) {
                value = totalWidth - w;
            }
            else {
                value = maxLeftOffset - w;
            }
            elem.leftOffset(value);
        });

        //обновление номера текущего слайда
        let newIndex = this.currentIndex - 1;
        if (newIndex < 0) {
            newIndex = this.count() - 1;
        }
        this.currentIndex = newIndex;

        this.emit('CHOOSE_THUMBNAIL', newIndex);
    }
    get(index){
        let newIndex;

        if (index == this.count()){
            newIndex = 0;
        } else if (index < 0){
            newIndex = this.count() - 1;
        } else {
            newIndex = index;
        }
        return this.thumbnails[newIndex];
    }

    /*кол-во слайдов в галерее*/
    count(){
        return this.thumbnails.length;
    }

    bindDOMEvents(){
        const root = this.root;

        root.find('.small-arrow-left').bind('click', this.next.bind(this));

        root.find('.small-arrow-right').bind('click', this.prev.bind(this));

        root.mouseover(function () {
            root.find('.small-arrow').fadeIn(100);
        });

        root.mouseleave(function () {
            root.find('.small-arrow').fadeOut(100);
        });
    }
}