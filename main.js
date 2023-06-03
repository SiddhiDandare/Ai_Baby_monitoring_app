alarm="";
status="";
object=[];
function setup(){
   canvas= createCanvas(380,380);
   canvas.center();
   video = createCapture(VIDEO);
   video.size(380,380);
   video.hide();
   objectDetected= ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
}
function modelLoaded(){
    console.log("Model Loaded!");
    status=true;
    
}
function gotResult(error,results){
    if(error){
        console.log(error);
    }
    console.log(results);
    object=results;
}
function preload(){
    alarm= loadSound("Alarm.mp3");
}

function draw(){
    image(video, 0,0,380,380);
    if(status!="")
    {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetected.detect(video,gotResult);
        for(i=0; i<object.length; i++)
        {

        document.getElementById("status").innerHTML="Status: Objects Detected";  
        fill(r,g,b);
        percentage= floor(object[i].confidence*100);
        text(object[i].label+ " "+ percentage+ "%", object[i].x+10, object[i].y+20);
        noFill();
        stroke(r,g,b);
        rect(object[i].x, object[i].y, object[i].width, object[i].height);
        if(object[i].label=="person"){
            document.getElementById("status").innerHTML="Status: Baby Found";
            console.log("stop");
            alarm.stop(); 
        }
        else{
            document.getElementById("status").innerHTML="Status: Baby not Found";
            console.log("play");
            alarm.play();   
        }
        }
        if(object.length==0){
            document.getElementById("status").innerHTML="Status: Baby not Found";
            console.log("play");
            alarm.play();  
        }
    }
}
