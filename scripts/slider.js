//здесь будет класс, обеспечивающий
//взаимодействие галереии и обозревателя
class Slider extends EventEmitter{
	constructor(url){
        super();

        this.viewer = new Viewer();

		this.thumbnailList = new ThumbnailList();

		//viewer: отобразить следующий/предыдущий элемент
		this.viewer.on('VIEW_ANOTHER',(number)=>{
            const count = this.thumbnailList.count();
            if (number < 0)
                number = count - 1;
            if (number >= count)
                number = 0;
            const anotherItem = this.thumbnailList.thumbnails[number];
			this.viewer.view(anotherItem.type, anotherItem.url, number);
		});

		//thumbnailList:отобразить выбранный thumbnail
        this.thumbnailList.on('CHOOSE_THUMBNAIL', (data) => {
			this.viewer.view(data.type, data.url, data.number);
		});

        this.init(url);
	}

	init(url){
        $.getJSON(url, (data) =>
            {
                $.each(data.objects, (index, item) => {
                    if (item.type === "image") {
                        this.thumbnailList.add(item.type, item.url);
                    } else if (item.type === "video") {
                        this.thumbnailList.add(item.type, item.url);
                    }
                });
            });

	}
}