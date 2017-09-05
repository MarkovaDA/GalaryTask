/*
* Единичный элемент ленты
* инкапсулирует методы работы с медиа-объектом
*/
class Thumbnail extends EventEmitter{

    constructor(type, url, number){
        super();
        this.type = type;
        this.url = url;
        this.number = number;
        this.root = null;
        this.iconImage = "images/video_icon.png";
    }
    initDOM(){
        //для видео-элементов единая иконка
        const src = (this.type ==='video') ?
                     this.iconImage:
                     this.url;

        const elem = `
        <div class="item" type=${this.type}>
            <img src=${src}>
        </div>
        `;

        this.root = $(elem);

        this.root.bind('click', () => {
            this.emit('CLICK_THUMBNAIL', this.number);
        });
        return this.root;
    }

    /*отступ элемента слева*/
    leftOffset(value){
        if (typeof value !== 'undefined') {
            this.root.offset({left: value});
        }
        else {
            return parseFloat(this.root.offset().left);
        }
    }

    /*отступ элемента справа*/
    rightOffset(){
        return parseFloat(this.root.css('right'));
    }

}