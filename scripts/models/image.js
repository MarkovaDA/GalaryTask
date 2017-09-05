class Image extends MediaObject {
    constructor(_url){
        super(_url);
        this.root = null;
    }

    preview(){
        const elem = `
            <img src=${this.url}>
        `;
        this.root = $(elem);
        return this.root;
    }

    /*стратегия анимации элемента*/
    animate(){
        this.root.css('width', '30%');
        this.root.animate({'width':'50%'},300);
    }
}