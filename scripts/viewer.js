class Viewer extends EventEmitter{

    constructor(){
        super();
        this.lastNumber = null;
        this.lastItem = null;
        $('#viewer_right').bind('click', this.next.bind(this));
        $('#viewer_left').bind('click', this.prev.bind(this));
    }
    cacheNodes() {
        this.nodes = {
            buttonLeft: '',
            buttonRight: '',
            exploreZone: '',
        };
    }
    view(type, url, number){
        if (this.lastItem != null){
            this.lastItem.close();
        }
        let media;
        if (type === 'image')
            media = new Image(url);
        if (type === 'video')
            media = new Video(url);

        this.lastNumber = number;
        this.lastItem = media;

        $('#viewer .explore_zone')
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