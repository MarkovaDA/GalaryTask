/*
* Единичный элемент ленты
* инкапсулирует методы работы с медиа-объектом
*/
class Thumbnail extends EventEmitter {
    constructor(data){
        super();

        this.data = data; //{type,url,index}
        this.root = null;
        this.iconImage = "images/video-icon.png";

        this.initDOM();
    }
    initDOM(){
        //для видео-элементов единая иконка
        const src = this.data.type === 'video' ? this.iconImage : this.data.url;

        this.root = $(`
            <div class="item" type=${this.data.type}>
                <img src=${src}>
            </div>
        `);

        this.root.on('click', () => {
            this.emit('CLICK_THUMBNAIL', this.data.index);
        });

        return this.root;
    }

    //выделить thumbnail
    addSelection(){
        this.root.addClass('selection');
    }

    //снять выделение
    removeSelection(){
        this.root.removeClass('selection');
    }

    /*отступ элемента слева*/
    leftOffset(value){
        if (typeof value !== 'undefined') {
            this.root.offset({left: value});
        } else {
            return parseFloat(this.root.offset().left);
        }
    }

    /*отступ элемента справа*/
    rightOffset(){
        return this.root.parent().width() - (this.leftOffset() + this.root.outerWidth());
    }

}