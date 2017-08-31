//здесь будет класс, обеспечивающий
//взаимодействие галереии и обозревателя
class Slider {
	constructor(){
		this.viewer = new Viewer();
		this.thumbnail = new ThumbnailList();
		this.thumbnail.addSketch('https://i.driver.life/images/redactor_960x1000/940131142574e2d9746e9d.jpg');
        this.thumbnail.addSketch('https://motor.kz/uploads/f412f2643522247800fc7796798e770363d9/b5af448794e14b62d70274adfd87b27c1d32.jpg');
        this.thumbnail.addSketch('http://wallpage.ru/imgbig/wallpapers_29640.jpg');
        this.thumbnail.addSketch('http://svadba-nakipre.ru/assets/gallery/25/822.jpg');
        this.thumbnail.addSketch('https://s.rdrom.ru/1/pubs/4/18871/430583.jpg');
		
		emitter.subscribe('choose_thumbnail', thumbnail => {
			//передаем выбранный thumbnail для отображения во viewer
			this.viewer.view(thumbnail);
		});
		
		emitter.subscribe('view_another', number => {
			//viewer:отобразить следующий или предыдущий элемент во viewer
			emitter.emit('click_thumbnail', number);
		});
	}
}