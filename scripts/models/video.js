class Video extends MediaObject {
    constructor(path){
        super(path);
        this.root = null;

        this.initDOM();
    }
    src(){
        return "images/video_icon.png";
    }
    initDOM(){
        this.root = $(`
            <video id="video_content" controls="controls" autoplay poster="images/video_poster.jpg">
                <source src=${this.url} type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'>
            </video>
        `);
        return this.root;
    }
    animate(){
        //TODO: некрасиво
        this.root.animate({'width':'50%'},300);
    }
    close(){
        this.root.get(0).pause();
        console.log("video stopping");
    }
}