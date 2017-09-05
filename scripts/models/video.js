class Video extends MediaObject {
    constructor(_path){
        super(_path);
        this.root = null;
    }
    src(){
        //иконка в ленте прокрутки для всех видео-элементов одна и та же
        return "images/video_icon.png";
    }
    preview(){
        const elem = `
        <video id="video_content" controls="controls" autoplay poster="images/video_poster.jpg">
            <source src=${this.url} type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'>
        </video>
        `;
        this.root = $(elem);
        return this.root;
    }
    animate(){
        this.root.animate({'width':'50%'},300);
    }
    close(){
        this.root.get(0).pause();
        console.log("video stopping");
    }
}