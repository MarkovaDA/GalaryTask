class Image extends MediaObject {
    constructor(url){
        super(url);
        this.root = null;

        this.initDOM();
    }

    initDOM(){
        this.root = $(`
            <img src=${this.url}>
        `);
        return this.root;
    }

    /*стратегия анимации элемента*/
    animate(){
        //TODO: написать красивее, заменить метод css на другой
        this.root.css('width', '30%');
        this.root.animate({'width':'50%'},300);
    }
}