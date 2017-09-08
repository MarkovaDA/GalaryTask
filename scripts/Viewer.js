class Viewer extends EventEmitter{
    constructor(){
        super();

        this.lastItem = null;
        this.root = null;

        this.initDOM();
        this.bindDOMEvents();
    }

    initDOM(){
        this.root = $(`
            <div class="viewer">
                <div class="arrow arrow-left"></div>
                <div class="arrow arrow-right"></div>
                <div>
                    <div class="explore-zone">
                        <p>Выберите элемент для просмотра</p>
                    </div>
                </div>
            </div>
        `);

        return this.root;
    }
    view(data){
        if (this.lastItem != null){
            //закрываем предыдущий элемент
            this.lastItem.close();
        }
        //формируем элемент для отображения
        let media;

        if (data.type === 'image') {
            media = new Image(data.url);
        } else if (data.type === 'video') {
            media = new Video(data.url);
        }

        this.lastItem = media;

        this.root.find('.explore-zone').empty().append(media.root);

        media.animate();
    }
    //запрашиваем следующий элемент для отображения
    next(){
		this.emit('VIEW_ANOTHER', 1);
    }
    //запрашиваем предыдущий элемент для отображения
    prev(){
		this.emit('VIEW_ANOTHER', -1);
    }

    bindDOMEvents(){
        const root = this.root;

        root.mouseover(()=>{
            root.find('.arrow').fadeIn(100);
        });

        root.mouseleave(()=>{
            root.find('.arrow').fadeOut(100);
        });

        root.find('.arrow-right').on('click', this.next.bind(this));

        root.find('.arrow-left').on('click', this.prev.bind(this));
    }
}