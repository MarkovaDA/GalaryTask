/*
* Единичный элемент ленты
* инкапсулирует методы работы с медиа-объектом
*/
class Thumbnail{

    constructor(media, number){
        this.media = media;
        this.number = number;
        this.root = null;
    }
    initDOM(){
        let type =
            (this.media instanceof Video) ? "video" : "image";
        const elem = `
        <div class="item" type=${type}>
            <img src=${this.media.src()}>
        </div>
        `;
        this.root = $(elem);

        //клик на thumbnail
        const context = this;
        this.root.bind('click', function(){
            emitter.emit('click_thumbnail', context.number);
        });
        return this.root;
    }

    /*представление элемента для отображения во Viewer*/
    getPreview(){
       return this.media.preview();
    }

    /*получить номер текущего thumbnail*/
    getNumber(){
        return this.number;
    }

    animate(){
        this.media.animate();
    }

    /*закрыть элемент (если видео)*/
    close(){
        if (this.media instanceof Video)
            this.media.close();
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