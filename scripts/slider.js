//здесь будет класс, обеспечивающий
//взаимодействие галереии и обозревателя
class Slider {
	constructor(url, elem){
        this.data = [];
        this.root = elem;

        $.getJSON(url).then((data) => {
            this.data = data;
            //инициализация thumbnailsList
            this.initThumbnails();
            //инициализация Viewer
            this.initViewer();
            //привязка событий
            this.bindEvents();
        });
	}

	initViewer(){
        const elem = this.viewer = new Viewer();
        //добавляем копонент в слайдер
        this.root.append(elem.root);
	}


    initThumbnails() {
        const elem = this.thumbnailList = new ThumbnailList(this.data);

        this.root.append(elem.root);

        elem.bindDOMEvents();//говнокод

        $.each(this.data, (index, item) => {
            item.index = index;
            this.thumbnailList.add(item);
        });
    }

    bindEvents() {
        //thumbnailList:отобразить выбранный thumbnail
        this.thumbnailList.on('CHOOSE_THUMBNAIL', (index) => {
            const exploredItem = this.thumbnailList.get(index);
            this.viewer.view(exploredItem.data);
        });

        //viewer: отобразить следующий/предыдущий элемент
        this.viewer.on('VIEW_ANOTHER',(index)=>{
            const anotherItem = this.thumbnailList.get(index);
            this.viewer.view(anotherItem.data);
        });
    }
}