var obstacle, obstacleImg1, obstacleImg2, obstacleImg3;

var path,mainCyclist;
var player1,player2,player3;
var pathImg,mainRacerImg1,mainRacerImg2,racerEnd;

var oppPink1Img,oppPink2Img;
var oppYellow1Img,oppYellow2Img;
var oppRed1Img,oppRed2Img;
var gameOverImg,cycleBell;

var pinkCG, yellowCG,redCG; 

var END = 0;
var PLAY = 1;
var gameState = PLAY;

var distance=0;
var gameOver, restart;

function preload(){
  pathImg = loadImage("Road.png");
  mainRacerImg1 = loadAnimation("mainPlayer1.png","mainPlayer2.png");
  mainRacerImg2 = loadAnimation("mainPlayer3.png");
  
  oppPink1Img = loadAnimation("opponent1.png","opponent2.png");
  oppPink2Img = loadAnimation("opponent3.png");
  
  oppYellow1Img = loadAnimation("opponent4.png","opponent5.png");
  oppYellow2Img = loadAnimation("opponent6.png");
  
  oppRed1Img = loadAnimation("opponent7.png","opponent8.png");
  oppRed2Img = loadAnimation("opponent9.png");

  obstacleImg1 = loadImage("obstacle1.png");
  obstacleImg2 = loadImage("obstacle2.png");
  obstacleImg3 = loadImage("obstacle3.png");
  
  cycleBell = loadSound("bell.mp3");
  gameOverImg = loadImage("gameOver.png");
}

function setup(){

createCanvas(1200,300);
// Moving background
path=createSprite(100,150);
path.addImage(pathImg);
path.velocityX = -5;

//creating boy running
mainCyclist  = createSprite(70,150);
mainCyclist.addAnimation("Racing",mainRacerImg1);
mainCyclist.scale=0.07;
  
//set collider for mainCyclist
mainCyclist.setCollider("circle",0,0,600);

gameOver = createSprite(650,150);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.8;
gameOver.visible = false;  

racerEnd = createSprite(mainCyclist.y,mainCyclist.x);
racerEnd.addAnimation("game over", mainRacerImg2);
racerEnd.scale = 0.07;
racerEnd.visible = false;
  
pinkCG = new Group();
yellowCG = new Group();
redCG = new Group();
obstacleG = new Group();
  
}



function draw() {
  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,900,30);
  
  if(gameState===PLAY){
    
   obstacles();

   obstacleG.setVelocityXEach(path.velocityX);

   distance = distance + Math.round(getFrameRate()/50);
   path.velocityX = -(10 + 2*distance/75);
  
   mainCyclist.y = World.mouseY;
  
   edges= createEdgeSprites();
   mainCyclist.collide(edges);
  
  //code to reset the background
  if(path.x < 370 ){
    path.x = width/2;
  }
  
    //code to play cycle bell sound
  if(keyDown("space")&&frameCount%25 === 0) {
    cycleBell.play();
  }
  
  //creating continous opponent players
  var select_oppPlayer = Math.round(random(1,3));
  
    if(distance<351){
      if (World.frameCount % 100 == 0) {
        if (select_oppPlayer == 1) {
          pinkCyclists();
        } 
        else if (select_oppPlayer == 2) {
          yellowCyclists();
        } 
        else {
          redCyclists();
        }
      }
    }
    else if(distance>350 && distance<650){
      if (World.frameCount % 75 == 0) {
        if (select_oppPlayer == 1) {
          pinkCyclists();
        } 
        else if (select_oppPlayer == 2) {
          yellowCyclists();
        } 
        else {
          redCyclists();}
        }
    }
    else if(distance>650 && distance<1000){
      if (World.frameCount % 40 == 0) {
        if (select_oppPlayer == 1) {
          pinkCyclists();
        } 
        else if (select_oppPlayer == 2) {
          yellowCyclists();
        } 
        else {
          redCyclists();}
        }
    }
    else{
      if (World.frameCount % 30 == 0) {
        if (select_oppPlayer == 1) {
          pinkCyclists();
        } 
        else if (select_oppPlayer == 2) {
          yellowCyclists();
        } 
        else {
          redCyclists();}
        }
    }

   if(pinkCG.isTouching(mainCyclist)){
     gameState = END;
     player1.velocityY = 0;
     player1.addAnimation("opponentPlayer1",oppPink2Img);
    }
    
    if(yellowCG.isTouching(mainCyclist)){
      gameState = END;
      player2.velocityY = 0;
      player2.addAnimation("opponentPlayer2",oppYellow2Img);
    }
    
    if(redCG.isTouching(mainCyclist)){
      gameState = END;
      player3.velocityY = 0;
      player3.addAnimation("opponentPlayer3",oppRed2Img);
    }

    if(mainCyclist.isTouching(obstacleG)){
      gameState = END;
    }
    
}
else if (gameState === END) {
    gameOver.visible = true;
    //Add code to show restart game instrution in text here
    
    path.velocityX = 0;

    mainCyclist.velocityY = 0;
    mainCyclist.visible = false;

    racerEnd.x = mainCyclist.x;
    racerEnd.y = mainCyclist.y;
    racerEnd.visible = true;
  
    pinkCG.setVelocityXEach(0);
    pinkCG.setLifetimeEach(-1);
  
    yellowCG.setVelocityXEach(0);
    yellowCG.setLifetimeEach(-1);
  
    redCG.setVelocityXEach(0);
    redCG.setLifetimeEach(-1);

    obstacleG.setVelocityXEach(0);
    obstacleG.setLifetimeEach(-1);

    //write condition for calling reset( )
    if(keyDown("up")){
      reset();
    }
}
}



function pinkCyclists(){
        player1 =createSprite(1300,Math.round(random(25, 275)));
        player1.scale =0.06;
        player1.velocityX = -(10 + 2*distance/75);
        player1.addAnimation("opponentPlayer1",oppPink1Img);
        player1.setLifetime=170;
        pinkCG.add(player1);
        player1.setCollider("circle",0,0,600);
}

function yellowCyclists(){
        player2 =createSprite(1300,Math.round(random(25, 275)));
        player2.scale =0.06;
        player2.velocityX = -(10 + 2*distance/75);
        player2.addAnimation("opponentPlayer2",oppYellow1Img);
        player2.setLifetime=170;
        yellowCG.add(player2);
        player2.setCollider("circle",0,0,600);
}

function redCyclists(){
        player3 =createSprite(1300,Math.round(random(25, 275)));
        player3.scale =0.06;
        player3.velocityX = -(10 + 2*distance/75);
        player3.addAnimation("opponentPlayer3",oppRed1Img);
        player3.setLifetime=170;
        redCG.add(player3);
        player3.setCollider("circle",0,0,600);
}

//create reset function here
function reset(){
  gameState = PLAY;

  redCG.destroyEach();
  yellowCG.destroyEach();
  pinkCG.destroyEach();

  obstacleG.destroyEach();

  mainCyclist.visible = true;
  racerEnd.visible = false;

  gameOver.visible = false

  distance = 0;

}

function obstacles(){

  if(frameCount%35 === 0){
  var rand = Math.round(random(1,3));
  obstacle = createSprite(1300,random(25,275));

  obstacle.scale = 0.05;

  obstacle.setCollider("circle",0,0,100);

  if(rand === 1){
    obstacle.addImage(obstacleImg1);
  }
  else if(rand === 2){
    obstacle.addImage(obstacleImg2);
  }
  else{
    obstacle.addImage(obstacleImg3);
  }

  obstacle.velocityX = -(10 + 2*distance/75);

  obstacleG.add(obstacle);

  obstacle.lifetime = 150;
  }
}




