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
        this.root.width('30%');
        this.root.animate({
            'width':'50%'
        },300);
    }
}