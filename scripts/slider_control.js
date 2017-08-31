/**/
$(document).ready(function(){

    const media1 = new Image('https://i.driver.life/images/redactor_960x1000/940131142574e2d9746e9d.jpg');
    const media2 = new Image('https://motor.kz/uploads/f412f2643522247800fc7796798e770363d9/b5af448794e14b62d70274adfd87b27c1d32.jpg');
    const media3 = new Image('http://wallpage.ru/imgbig/wallpapers_29640.jpg');
    const media4 = new Image('http://svadba-nakipre.ru/assets/gallery/25/822.jpg');
    const media5 = new Image('https://s.rdrom.ru/1/pubs/4/18871/430583.jpg');
    const slider = new Gallery(120);

    const video1 = new Video('video/video1.mp4');
    const video2 = new Video('video/video2.mp4');
    slider.add(media1)
          .add(media2)
          .add(video1)
          .add(media3)
          .add(media4)
          .add(media5)
          .add(video2)
});


