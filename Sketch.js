var player, playerImg;
var playButton, playButtonImg;
var bg, waitScreenImg;
var enemy, enemyImg, enemyg,enemy2Img,enemy3Img;
var enemyObstacles,enemyObstaclesImg,enemyObstacles2Img,enemyObstacles3Img,
enemyObstacles4Img,enemyObstacles5Img,enemyObstacles;
var obstacles,obstaclesImg1,obstaclesImg2,obstaclesImg3,obstaclesImg4,obstaclesImg5,obstaclesG;
var invisibleGround;
var bullet,bulletImg,bulletG;

var shootingSound,attackSound,jumpSound,hurtingSound,scoreUpSound,growlingSound,clickSound;

var gameState = "wait";

var maxHealth = 200;

var health = maxHealth;

var score = 0;

var level = 0;

function preload() {
  bg = loadImage("Assets/bg.jpeg");
  waitScreenImg = loadImage("Assets/GIF/WaitScreen.gif");

  playerImg = loadImage("Assets/player.png");
  playButtonImg = loadImage("Assets/PlayButton.png");

  enemyImg = loadImage("Assets/Zombie.gif");
  enemy2Img = loadImage("Assets/zombie2gif.gif");
  enemy3Img = loadImage("Assets/zombie3gif.gif");

  enemyObstaclesImg = loadImage("Assets/enemyObstacles.gif");
  enemyObstacles2Img = loadImage("Assets/enemyObstacles2.gif");
  enemyObstacles3Img = loadImage("Assets/enemyObstacles3.gif");
  enemyObstacles4Img = loadImage("Assets/enemyObstacles4.gif");
  enemyObstacles5Img = loadImage("Assets/enemyObsacles5.gif");

  obstaclesImg1 = loadImage("Assets/flower.png");
  obstaclesImg2 = loadImage("Assets/skul.png");
  obstaclesImg3 = loadImage("Assets/tree.png");
  obstaclesImg4 = loadImage("Assets/stone.png");
  obstaclesImg5 = loadImage("Assets/mushroom.png");

  bulletImg = loadImage("Assets/bullet1_image.png");

  shootingSound = loadSound("Assets/Sounds/gun-shot.mp3");
  attackSound = loadSound("Assets/Sounds/attack.mp3");
  jumpSound = loadSound("Assets/Sounds/jump.mp3");
  hurtingSound = loadSound("Assets/Sounds/hurting.mp3");
  scoreUpSound = loadSound("Assets/Sounds/points.mp3");
  growlingSound = loadSound("Assets/Sounds/zombie-Growling.mp3");
  clickSound = loadSound("Assets/Sounds/click.mp3");
}


function setup() {
  createCanvas(windowWidth, windowHeight);

  playButton = createImg("Assets/PlayButton.png");
  playButton.position(windowWidth/2 - 200, windowHeight / 2);
  playButton.size(width /4, width / 4);
  playButton.hide();

  player = createSprite(windowWidth / 6, windowHeight - 290);
  player.addImage(playerImg);
  player.scale = 1.3;
  player.debug = false;
  player.setCollider("rectangle",-20,0,50,150);

  player.visible = false;

   invisibleGround = createSprite(windowWidth / 6,windowHeight - 120,windowWidth * 2,30);
   invisibleGround.visible = false;

  enemyg = new Group();

  enemyObstaclesg = new Group();

  obstaclesG = new Group();

  bulletG = new Group();


}


function draw() {
  if (gameState == "wait") {
    background(waitScreenImg);
    health = 200;
    maxHealth = 200;
    level = 0;
    playButton.show();
  }

  playButton.mousePressed(() => {
    playButton.hide();
    clickSound.play();
    gameState = "level1";
    console.log(gameState)
  })

  if (gameState == "level1" ) {

    background(bg);
    player.visible = true;
    player.position.x = windowWidth / 6;
    player.position.y = windowHeight - 290;
    level = 1;
  
    bg.velocityX = -3;

    movement();
    healthlevel();
    spawnEnemies();

    invisibleGround.visible = false;
    player.collide(invisibleGround);


    for(i = 0; i < enemyg.length; i++){
      if(bulletG.isTouching(enemyg.get(i))){
          score += 5;
          enemyg.get(i).remove();
          bulletG.destroyEach();

          scoreUpSound.play();
      }
    }

    for(i = 0;i <enemyg.length; i++){
      if(player.isTouching(enemyg.get(i)) && health > 0 ){
          health -= 20;
          enemyg.get(i).remove();
          bulletG.destroyEach();

          attackSound.play();
          hurtingSound.play();
      }
    }

    if(health <= 0){
      gameState = "end";
      player.visible = false;
      enemyg.destroyEach();
      bulletG.destroyEach();
      gameEnd();
    }

    if((health > 0 && score >= 10)){
      gameState = "level1Win";
    }
  }
  
  if(gameState == "level1Win"){
    background("white");
    player.visible = false;
    level = 2;
    score = 0;
    enemyg.destroyEach();
    bulletG.destroyEach();
    Level1Win();
  }

  if(gameState == "level2"){
    
    background(bg);
    player.visible = true;
    player.position.x = windowWidth / 6;
    player.position.y = windowHeight - 290;

    movement();
    healthlevel();
    spawnObstacles();
    spawnEnemiesLevel2();

    invisibleGround.visible = false;
    player.collide(invisibleGround);

    for(i = 0; i < enemyObstaclesg.length; i++){
      if(bulletG.isTouching(enemyObstaclesg.get(i))){
          score += 5;
          enemyObstaclesg.get(i).remove();
          bulletG.destroyEach();

          scoreUpSound.setVolume(0.5);
          scoreUpSound.play();
      }
    }

    for(i = 0; i < obstaclesG.length; i++){
      if(player.isTouching(obstaclesG.get(i)) && health > 0){
        health -=20;
        obstaclesG.get(i).remove();

        hurtingSound.setVolume(0.5);
        hurtingSound.play();
    }
  }

    for(i = 0;i <enemyObstaclesg.length; i++){
      if(player.isTouching(enemyObstaclesg.get(i)) && health > 0 ){
          health -= 20;
          enemyObstaclesg.get(i).remove();
          bulletG.destroyEach();

          hurtingSound.setVolume(0.5);
          hurtingSound.play();
      }
    }

    if(health <= 0){
      gameState = "end";
      player.visible = false;
      enemyObstaclesg.destroyEach();
      bulletG.destroyEach();
      gameEnd();
    }

    if((health > 0 && score >= 10)){
      gameState = "Win";
    }
  }

  if(gameState == "Win"){
  background("white");
  enemyObstaclesg.destroyEach();
  obstaclesG.destroyEach();
  bulletG.destroyEach();
  player.visible = false;
  gameWin();
  }

  if(gameState == "restart"){
  background("white");
  enemyObstaclesg.destroyEach();
  obstaclesG.destroyEach();
  bulletG.destroyEach();
  player.visible = true;
  score = 0;
  level = 0;
  health = 200;
  gameState = "wait";
  }
  
  drawSprites();

  textSize(50);
  fill("darkblue");
  text("Level : "+level,windowWidth / 2,windowHeight / 10);
  
  fill("darkblue");
  textSize(50);
  text("Score : "+score,windowWidth - 250,windowHeight /10);
}


function movement(){
  if(keyDown("a")){
    player.x -= 6;  
  }
   
  if(keyDown("d")){
    player.x+= 6;
  }
  
  if(keyDown("DOWN_ARROW")){
    spawnBullets();
    shootingSound.setVolume(0.5);
    shootingSound.play();
  }

  if(keyDown("space")){
    player.velocityY = -8;
    jumpSound.setVolume(0.2);
    jumpSound.play(); 
  }
  player.velocityY += 0.8
}


function healthlevel(){
  stroke("lightGreen");
  strokeWeight(2);
  noFill();
  rect(windowWidth/8 ,windowHeight/8,maxHealth,20);

  noStroke();
  fill("Green");
  rect(windowWidth/8,windowHeight/8,health,20);
}


function spawnEnemies() {
  if (frameCount % 150 == 0) {

    enemy = createSprite(windowWidth+50, windowHeight - 250);  
    
    var rand = Math.round((Math.random()*2)+1);
    console.log("value of rand :"+rand);
    switch (rand) {
    case 1:
      enemy.addImage(enemyImg); 
      enemy.scale = 0.8;
      enemy.velocityX= -2;
      //console.log("passed");
      break;

    case 2:
      enemy.addImage(enemy2Img);
      enemy.scale = 0.8;
      enemy.velocityX= -2;
      //console.log("passed2"); 
      break;

    case 3: 
      enemy.addImage(enemy3Img);
      enemy.scale = 0.8;
      enemy.velocityX = -2;  
      break;

    default:
      break;
  }
  enemyg.add(enemy);
  }
}


function spawnEnemiesLevel2(){

  if(frameCount % 183 == 0){
  enemyObstacles = createSprite(windowWidth+50, windowHeight - 200);  
    
  var rand1 = Math.round((Math.random()*4)+1);
  switch (rand1) {
  case 1:
    enemyObstacles.addImage(enemyObstaclesImg); 
    enemyObstacles.scale = 0.5,
    enemyObstacles.velocityX= -2;
    //console.log("passed");
    break;

  case 2:
    enemyObstacles.addImage(enemyObstacles2Img);
    enemyObstacles.scale = 0.5,
    enemyObstacles.velocityX= -2;
    //console.log("passed2"); 
    break;

  case 3:
    enemyObstacles.addImage(enemyObstacles3Img);
    enemyObstacles.scale = 0.5,
    enemyObstacles.velocityX= -2;
    break;

  case 4:
    enemyObstacles.addImage(enemyObstacles4Img);
    enemyObstacles.scale = 0.5,
    enemyObstacles.velocityX= -2;  
    break;

  case 5:
    enemyObstacles.addImage(enemyObstacles5Img);
    enemyObstacles.scale = 0.5,
    enemyObstacles.velocityX= -2;  
    break;

  default:
    break;
}
enemyObstaclesg.add(enemyObstacles);
console.log(enemyObstaclesg)
}
}


function spawnBullets() {
    bullet = createSprite(player.position.x+20,player.position.y+20,20,20);
    bullet.addImage(bulletImg);
    bullet.scale = 0.3;
    bullet.velocityX = 10;
    bullet.depth = player.depth;
    player.depth = player.depth + 1;
    bulletG.add(bullet);
}


function spawnObstacles(){
  if(frameCount % 300 == 0){
  var obstacles = createSprite(windowWidth+50, windowHeight-200);
  console.log("Inside spawn obstacles");
  var rand2 = Math.round((Math.random()*4)+1);

  switch(rand2){

    case 1: 
      obstacles.addImage(obstaclesImg1);
      obstacles.scale = 0.4;
      obstacles.velocityX = -2;
      obstacles.debug = false;
      obstacles.setCollider("rectangle", 0,0,50,100);
      break;

    case 2:
      obstacles.addImage(obstaclesImg2);
      obstacles.scale = 1;
      obstacles.velocityX = -2;
      obstacles.setCollider("rectangle", 0,0,50,100);
      obstacles.debug = false;
      break;

    case 3:
      obstacles.addImage(obstaclesImg3);
      obstacles.scale = 0.5;
      obstacles.velocityX = -2; 
      obstacles.setCollider("rectangle", 0,0,50,100);
      obstacles.debug = false;
      break;
      
    case 4:
      obstacles.addImage(obstaclesImg4);
      obstacles.scale = 0.3;
      obstacles.velocityX = -2; 
      obstacles.setCollider("rectangle", 0,0,50,100);
      obstacles.debug = false;
      break;

    case 5:
      obstacles.addImage(obstaclesImg5);
      obstacles.scale = 1;
      obstacles.velocityX = -2; 
      obstacles.setCollider("rectangle", 0,0,50,100); 
      obstacles.debug = false; 
      break;

    default: 
      break; 
  }

  obstaclesG.add(obstacles)

  }
}


function gameEnd(){
  swal({
    title:"Game Over",
    text:"Press the button to restart the game",
    textAlign: "CENTER",
    confirmButtonText:"Try Again",
    confirmButtonColor :"Red",
        
  },
  function(){    
    gameState = "wait"
  }
  )
}


function Level1Win(){
  swal({
    title:"1ST Level Won",
    text:"Press the button to continue",
    textAlign: "CENTER",
    confirmButtonText: "Continue",
    confirmButtonColor:"Green",
  },
  function(){
    gameState = "level2";
  }
  )  
}


function gameWin(){
  swal({
    title:"Game Won",
    text:"Press the button to restart the game",
    textAlign: "CENTER",
    confirmButtonText: "Restart",
    confirmButtonColor:"Green",
  },
  function(){
    gameState = "restart";
  }
  )
  
}


