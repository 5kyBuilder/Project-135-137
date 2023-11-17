objects = [];
video = "";
Status = "";
object_to_find = null;

function play()
{
    object_detection = ml5.objectDetector('cocossd', modelReady);
    document.getElementById("status").innerHTML = "Detecting Objects..";
    Status = true;
}

function preload()
{
    video = createVideo("video.mp4");
}

function setup()
{
    canvas = createCanvas(600,370);
    canvas.position(460,300);

    video.hide();
}

function modelReady()
{
    console.log("model ready");
    video.volume(0);
    video.speed(1);
    video.loop();
}

function gotResult(err, results)
{
    if(err){ return; }

    console.log(results);
    objects = results;
}

function draw()
{
    image(video, 0, 0, 700, 500);
    object_to_find = document.getElementById("input").value;
    if(Status === true){
        object_detection.detect(video, gotResult);

        for(var i = 1; i<=objects.length; i++) // first object, i = 1. second object, i = 2. length = 2
        {
            if(objects[i-1].label == object_to_find){
                words = object_to_find + " has been detected!";
                translate = new SpeechSynthesisUtterance();
                translate.text = words;
                speech = speechSynthesis.speak(translate);
                document.getElementById("objects").innerHTML = words;
            }else{
                document.getElementById("objects").innerHTML = object_to_find + " has not been detected";
            }
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            fill("#FF0000");
            var percentage = floor(objects[i - 1].confidence * 100);
            text(objects[i - 1].label + " " + percentage + "%", objects[i - 1].x + 15, objects[i - 1].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i - 1].x, objects[i - 1].y, objects[i - 1].width, objects[i - 1].height);
        }
    }
}