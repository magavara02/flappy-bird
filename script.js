var interValSpeed = 16;

var moveBackgroundInterval = setInterval(moveBackground,interValSpeed);
var backgroundPosition = 0;

var moveBirdInterval = setInterval(moveBird,interValSpeed);

const bird = document.querySelector(".bird");
var birdPosition = bird.getBoundingClientRect().top;
var screenHeight = window.innerHeight;
var birdSpeed = 5;

var moveTubesInterval = setInterval(moveTubes,interValSpeed);

var checkCollisionInterval = setInterval(checkCollision,interValSpeed);

var jumpSound = new Audio("sounds/sfx_wing.mp3");
var pointSound = new Audio("sounds/sfx_point.mp3");
var deathSound = new Audio("sounds/sfx_die.mp3");

var addTubeIn = 10;
function moveBackground(){
    document.body.style.backgroundPosition = `${[backgroundPosition]}px`;
    backgroundPosition-=1;
    addTubeIn--;
    if(addTubeIn == 0){
        createTubes();
        addTubeIn = Math.floor(Math.random()*300);
        while(addTubeIn <=150){
            addTubeIn = Math.floor(Math.random()*300);
        }
    }
}

document.addEventListener("keypress", (e)=>{
    if(e.keyCode == 32){
        jump();
    }
})

function moveBird(){
    if(birdPosition + bird.getBoundingClientRect().height >= screenHeight){
        clearInterval(moveBackgroundInterval);
        clearInterval(moveBirdInterval);
        clearInterval(moveTubesInterval);
        clearInterval(checkCollisionInterval);
        deathSound.play();
        return;
    }
    if(birdPosition + bird.getBoundingClientRect().height <= 0){
        clearInterval(moveBackgroundInterval);
        clearInterval(moveBirdInterval);
        clearInterval(moveTubesInterval);
        clearInterval(checkCollisionInterval);
        deathSound.play();
        return;
    }
    birdPosition+=birdSpeed;
    bird.style.top = birdPosition + "px";
}

function jump(){
    birdSpeed = -20;
    jumpSound.play();
    setTimeout(() => {
        birdSpeedSmoother(5);
    }, 100);
}

function birdSpeedSmoother(speed){
    birdSpeed = 1;
    var smootherInterval = setInterval(() => {
        birdSpeed++;
        if(birdSpeed  >= speed){
            birdSpeed = speed;
            clearInterval(smootherInterval);
        }
    }, 100);
}

function createTubes(){
    var randomTubeGap = Math.floor(Math.random() * 80);
    console.log("First choise = " + randomTubeGap);
    while(randomTubeGap < 20){
        randomTubeGap = Math.floor(Math.random() * 80)
        console.log("Changed that to " + randomTubeGap);
    }
    const tube1 = document.createElement("div");
    const img1 = document.createElement("img");
    tube1.classList.add("tube1");
    img1.src = "images/tube1.png";
    img1.style.height = (randomTubeGap - 15) + "vmin";
    tube1.append(img1);
    document.body.append(tube1);

    const tube2 = document.createElement("div");
    const img2 = document.createElement("img");
    tube2.classList.add("tube2");
    img2.src = "images/tube2.png";
    img2.style.height = (85 - randomTubeGap) + "vmin";
    tube2.append(img2);
    document.body.append(tube2);
}


function moveTubes(){
    const tubes1 = document.querySelectorAll(".tube1");
    const tubes2 = document.querySelectorAll(".tube2");
    for(var i = 0; i < tubes1.length; i++){
        var tubesLeft = tubes1[i].getBoundingClientRect().left;
        tubes1[i].style.left = (tubesLeft - 2)+"px";
        tubes2[i].style.left = (tubesLeft - 2)+"px";
        if((tubesLeft + 20) < 0){
            tubes1[i].remove();
            tubes2[i].remove();
            pointSound.play();
        }
    }
}

function checkCollision(){
    var birdData = bird.getBoundingClientRect();
    const tubes1 = document.querySelectorAll(".tube1");
    const tubes2 = document.querySelectorAll(".tube2");
    
    
    if(birdData.right > tubes2[0].getBoundingClientRect().left &&
        (birdData.top + birdData.height) > tubes2[0].getBoundingClientRect().top
    ){
        clearInterval(moveBackgroundInterval);
        clearInterval(moveBirdInterval);
        clearInterval(moveTubesInterval);
        clearInterval(checkCollisionInterval);
        deathSound.play();
    }

    if(birdData.right > tubes1[0].getBoundingClientRect().left &&
        (birdData.top) < tubes1[0].getBoundingClientRect().bottom
    ){
        clearInterval(moveBackgroundInterval);
        clearInterval(moveBirdInterval);
        clearInterval(moveTubesInterval); 
        clearInterval(checkCollisionInterval);
        deathSound.play();
    }
    
}