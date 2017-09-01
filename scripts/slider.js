//здесь будет класс, обеспечивающий
//взаимодействие галереии и обозревателя
class Slider {
	constructor(){

		this.viewer = new Viewer();

		this.thumbnail = new ThumbnailList();

		emitter.subscribe('choose_thumbnail', thumbnail => {
			//передаем выбранный thumbnail для отображения во viewer
			this.viewer.view(thumbnail);
		});

        //viewer:отобразить следующий или предыдущий элемент во viewer
		emitter.subscribe('view_another', number => {
			emitter.emit('click_thumbnail', number);
		});
	}
	/*чтение json-данных*/
	init(){

        const context = this;

		$.getJSON('server/data.json',function(data){
            $.each(data.objects, function(index, item) {
				if (item.type === "image") {
                    context.thumbnail.add(new Image(item.url));
				}
				else if (item.type === "video") {
                    context.thumbnail.add(new Video(item.url));
				}
			});
		});
	}
}