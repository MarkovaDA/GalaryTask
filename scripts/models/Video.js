class Video extends MediaObject {
    constructor(path){
        super(path);
        this.root = null;

        this.initDOM();
    }
    src(){
        return "images/video-icon.png";
    }
    initDOM(){
        this.root = $(`
            <video id="video_content" width="640" height="480" controls="controls" autoplay poster="images/video-poster.jpg">
                <source src=${this.url} type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'>
            </video>
        `);

        return this.root;
    }
    animate(){
        this.root.animate({
            'width':'50%'
        }, 300);
    }

    close(){
        this.root.get(0).pause();
        console.log('video stopping');
    }
}