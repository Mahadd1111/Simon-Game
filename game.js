let gamePattern=[];
let started=false;
let userClickedPattern=[];
let level=0;
let userChosenColor="";
let btns=$("button");
let keyA=$(document);
let buttonColors=["red","blue","green","yellow"];

function nextSequence(){
    userClickedPattern=[];
    level++;
    let title=$("h1");
    title.text("Level "+level);
    let num = Math.floor(Math.random()*4);
    let randomChosenColor=buttonColors[num];
    gamePattern.push(randomChosenColor);
    console.log("___________________Pattern: "+gamePattern+"__________");
    let currentButton=$("#"+randomChosenColor);
    currentButton.fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    //playSound(randomChosenColor);
}

function playSound(name){
    let audio=new Audio("./sounds"+name+".mp3");
    audio.crossOrigin="anonymous";
    audio.play();
}

function animatePress(currentColour){
    let obj=$("."+currentColour);
    obj.addClass("pressed");
    setTimeout(function(){
        obj.removeClass("pressed");    
    },100);
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        if(currentLevel===gamePattern.length-1){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        console.log("Wrong");
        gameOver();
    }
}

function gameOver(){
    $("h1").text("Game Over, Wrong Pattern!");
    $("body").css("background-color","red");
    setTimeout(function(){
        userChosenColor="";
        level=0;
        userClickedPattern=[];
        gamePattern=[];
        started=false;
        $("h1").text("Press A to start the Game!");
        $("body").css("background-color","#011F3F");
    },2000)
}

btns.click(function(e){
    userChosenColor=e.target.id;
    userClickedPattern.push(userChosenColor);
    console.log("User has clicked: "+userClickedPattern);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
    //playSound(userChosenColor);
});

keyA.keydown(function(e){
    if(e.key==="a" && started==false){
        started=true;
        nextSequence();
    }
});
