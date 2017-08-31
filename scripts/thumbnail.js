/*
* Единичный элемент ленты
* инкапсулирует методы работы с медиа-объектом
*/
class Thumbnail{

    constructor(media, number){
        this.media = media;
        this.w = 120;
        this.number = number;
        this.root = null;
    }
    initDOM(){
        const elem = `
        <div class="item">
            <img src=${this.media.src()}>
        </div>
        `;
        this.root = $(elem);
        //позиционирование созданного элемента
        this.root.offset({left: this.number * this.w});

        //обработка клика на элементе
        const context = this;
        this.root.bind('click', function(){
			//передаем thumbnaillist номер дочернего элемента thumbnail
            emitter.emit('click_thumbnail', context.number);
        });
        return this.root;
    }

    /*представление элемента для отображения во Viwer*/
    getPreview(){
       return this.media.element();
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
            this.root.css('left', value);
        } else {
            return parseFloat(this.root.css('left'));
        }
    }
    /*отступ элемента справа*/
    rightOffset(){
        return parseFloat(this.root.css('right'));
    }

}