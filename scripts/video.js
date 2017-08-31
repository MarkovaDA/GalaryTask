class Video extends MediaObject {
    constructor(_path){
        super(_path);
        this.root = null;
    }
    src(){
        //иконка в ленте прокрутки для всех видео-элементов одна и та же
        return "images/video_icon.png";
    }
    element(){
        this.root = $('video').clone();
        this.root.find('source').attr('src', this.url);
        this.root.css('display', 'block');
        return this.root;
    }
    animate(){
        this.root.css('width', '30%').css('opacity','0');
        this.root.animate({'width':'50%', 'opacity': '1'},300);
    }
    close(){
        var video = document.getElementById("video_content");
        video.pause();
        console.log("видео остановлено");
    }

}