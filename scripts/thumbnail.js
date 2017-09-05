/*
* Единичный элемент ленты
* инкапсулирует методы работы с медиа-объектом
*/
class Thumbnail extends EventEmitter {

    constructor(data){
        super();
        this.data = data; //{type,url,index}
        this.root = null;
        this.iconImage = "images/video_icon.png";
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

    /*отступ элемента слева*/
    leftOffset(value){
        if (typeof value !== 'undefined') {
            this.root.offset({left: value});
        } else { // TODO: Неправильно!
            return parseFloat(this.root.offset().left);
        }
    }

    /*отступ элемента справа*/
    rightOffset(){
        return parseFloat(this.root.css('right')); // TODO: Неправильно!!!
    }

}