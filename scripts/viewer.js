class Viewer extends EventEmitter{

    constructor(){
        super();
        this.lastNumber = null;
        this.lastItem = null;

        this.cacheNodes();

        DOMEvents.mouseViewerBehaviour();
        DOMEvents.bindViewerNext(this.next.bind(this));
        DOMEvents.bindViewerPrev(this.prev.bind(this));
    }
    cacheNodes() {
        this.nodes = {
            exploreZone:  $('#viewer .explore-zone')
        };
    }
    view(type, url, number){

        if (this.lastItem != null){
            //зпкрываем предыдущий элемент
            this.lastItem.close();
        }
        //формируем элемент для отображения
        let media;
        if (type === 'image')
            media = new Image(url);
        if (type === 'video')
            media = new Video(url);

        this.lastNumber = number;
        this.lastItem = media;
        //добавляем в область просмотра
        this.nodes.exploreZone
             .empty()
             .append(media.preview());

        media.animate();
    }
    //запрашиваем следующий элемент для отображения
    next(){
		this.emit('VIEW_ANOTHER', this.lastNumber + 1);
    }
    //запрашиваем предыдущий элемент для отображения
    prev(){
		this.emit('VIEW_ANOTHER', this.lastNumber - 1);
    }
}