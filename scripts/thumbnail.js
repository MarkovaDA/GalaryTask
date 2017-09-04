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
    }
    initDOM(){
        const src = (this.type ==='video') ?
                    "images/video_icon.png":
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

    /*получить номер текущего thumbnailList*/
    getNumber(){
        return this.number;
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