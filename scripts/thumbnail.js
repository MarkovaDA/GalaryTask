/*
* Единичный элемент ленты
* инкапсулирует методы работы с медиа-объектом
*/
class Thumbnail{

    constructor(media, callback, number){
        this.media = media;
        this.w = 120;
        this.number = number;
        this.root = null;
        this.slideClickCallback = callback;
        console.log('creating sketch');
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
            //выделяем элемент
            //context.addSelection();
            //оповещаем Thumbnail об элементе, который был выбран
            context.slideClickCallback(context);
        });
        return this.root;
    }

    /*представление элемента*/
    getPreview(){
       return this.media.element();
    }
    /*получить номер текущего слайда*/
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