//здесь будет класс, обеспечивающий
//взаимодействие галереии и обозревателя
class Slider {
	constructor(url, elem){
        this.data = [];
        this.root = elem;

        this.chosenIndex = 0;

        $.getJSON(url).then((data) => {
            this.data = data;

            this.initThumbnails();

            this.initViewer();

            this.bindEvents();
        });
	}

	initViewer(){
        this.viewer = new Viewer();
        //добавляем копонент viewer в слайдер
        this.root.append(this.viewer.root);
	}


    initThumbnails() {
        this.thumbnailList = new ThumbnailList(this.data);
        //добавляем копонент thumbnailList в слайдер
        this.root.append(this.thumbnailList.root);
    }

    bindEvents() {
        //thumbnailList:отобразить выбранный thumbnail
        this.thumbnailList.on('CHOOSE_THUMBNAIL', (index) => {
            this.chosenIndex = index;
            this.viewer.view(this.data[index]);
        });

        //viewer: отобразить следующий/предыдущий элемент
        this.viewer.on('VIEW_ANOTHER',(delta) => {

            let anotherIndex = this.chosenIndex + delta;
            if (anotherIndex < 0){
                anotherIndex = this.data.length - 1;
            } else if (anotherIndex > this.data.length - 1){
                anotherIndex = 0;
            }
            this.chosenIndex = anotherIndex;
            this.viewer.view(this.data[anotherIndex]);
        });
    }
}