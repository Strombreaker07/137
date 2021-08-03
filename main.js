video = "";
status = "";
objects = [];

function preload()
{
    video = createCapture(380, 380);
    video.hide();
}

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Object";
    object_found = document.getElementById("inp").value;
}

function draw()
{
    image(video, 0, 0, 480, 380);
    if(status != "")
    {
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) 
        {
            document.getElementById("status").innerHTML = "Status : Object Detected";
   
            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        if(objects[i].label == object_found) 
        {
            document.getElementById("object_status").innerHTML = "Object Found";
            console.log("Object_Found");
            video.stop();
            objectDetector.detect(gotResult);
            speech = window.speechSynthesis;
            Utter_this = new SpeechSynthesisUtterance(object_found + "Found");
            speech.speak(Utter_this);
        }
        else
        {
            document.getElementById("object_status").innerHTML = "Object Not Found";
            console.log("Object_Not_Found");
        }
        }
    }
}

function modelLoaded() 
{
    console.log("Model Loaded!")
    status = true;
}

function gotResult(error, results)
{
    if(error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}