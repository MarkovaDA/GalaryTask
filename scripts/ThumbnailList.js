
/*
* Лента прокрутки элементов
*/

class ThumbnailList extends EventEmitter{
    constructor(data){
        super();

        this.data = data;
        this.items = [];
        this.currentIndex = 0;//номер текущего thumbnail
        this.width = 120;
        this.root = null;

        this.initDOM();
        this.loadItems();
        this.bindDOMEvents();
    }

    loadItems(){
        $.each(this.data, (index, item) => {
            item.index = index;
            this.add(item);
        });
    }

    initDOM(){
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
        thumbnail.on('CLICK_THUMBNAIL', (index) => {
            this.onClickThumbnail(index);
        });

        this.items.push(thumbnail);

        this.root.append(thumbnail.root);

        thumbnail.leftOffset(this.items.length * this.width);
    }

    onClickThumbnail(index){
        this.setNewIndex(index);
    }

    /*прокрутка вправо*/
    next(){
        const w = this.width;
        const length = this.items.length;
        //расчет смещений для прокрутки
        this.items.forEach(function (elem) {
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
        this.setNewIndex(newIndex);
    }

    /*прокрутка влево*/
    prev(){
        const w = this.width;
        const totalWidth = parseFloat(this.root.width()); /*ширина всей конвейерной ленты*/

        //расчет смещений  для элементов ленты
        this.items.forEach(function (elem) {
           let value;
            const maxLeftOffset = elem.leftOffset();

            if (maxLeftOffset === 0 || maxLeftOffset < 0) {
                value = totalWidth - w;
            } else {
                value = maxLeftOffset - w;
            }

            elem.leftOffset(value);
        });
        //обновление номера текущего слайда
        let newIndex = this.currentIndex - 1;

        if (newIndex < 0) {
            newIndex = this.items.length - 1;
        }
        this.setNewIndex(newIndex);
    }

    setNewIndex(newIndex){
        this.currentIndex = newIndex; //снятие выделения со всех элементов
        this.selectChosen();
        this.emit('CHOOSE_THUMBNAIL', newIndex);
    }

    selectChosen(){
        this.items.forEach((item) => {
            item.removeSelection();
        });

        this.items[this.currentIndex].addSelection();//подсветка выбранного элемента
    }

    bindDOMEvents(){
        const root = this.root;

        root.find('.small-arrow-left').on('click', this.prev.bind(this));

        root.find('.small-arrow-right').on('click', this.next.bind(this));

        root.mouseover(function () {
            root.find('.small-arrow').fadeIn(100);
        });

        root.mouseleave(function () {
            root.find('.small-arrow').fadeOut(100);
        });
    }
}