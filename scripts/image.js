class Image extends MediaObject {
    constructor(_url){
        super(_url);
        this.root = null;
    }

    element(){
        this.root = $('<img />');
        this.root.attr('src', this.url);
        return this.root;
    }
    /*стратегия анимации элемента*/
    animate(){
        this.root.css('width', '30%');
        this.root.animate({'width':'50%'},300);
    }
}