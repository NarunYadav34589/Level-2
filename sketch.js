//                       ASURA MARDAN
//                        Level:- 2
//                   Killing of Kumbhkaran
//                      Good Over Evil

var PLAY = 1;
var END = 0;
var gameState = PLAY;
var count =0;

var arrow, arrowImage;
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4;
var backgroundImg
var score = 0;
var jumpSound, collidedSound;

var gameOver, restart;
var gameWon, nextLevel;

var levelNo, instruction, asuraMardan, hanumanji; 

var count=0;

function preload() {
  jumpSound = loadSound("assets/sounds/jump.wav")
  collidedSound = loadSound("assets/sounds/collided.wav")

  backgroundImg = loadImage("assets/background.jpg")
 

  trex_running = loadAnimation("assets/ramji.png");


  obstacle1 = loadImage("assets/k5.png");
  obstacle2 = loadImage("assets/k3.png");
  obstacle3 = loadImage("assets/k2.png");
  obstacle4 = loadImage("assets/k3.png");

  gameOverImg = loadImage("assets/retry.png");
  restartImg = loadImage("assets/hojaa.png");
  arrowImage = loadImage("assets/ARROW (2).png");

  gameWonImg = loadImage("assets/youWon.png");
  nextLevelImg = loadImage("assets/nextLevel.png");

  levelNoImg = loadImage("assets/l2.png");

  instructionImg = loadImage("assets/instruction.png");

  asuraMardanImg = loadImage("assets/Asura Mardan.png")

  hanumanjiImg = loadImage("assets/hanumaanji.png");
}

function setup() {
  createCanvas(1360, 600);

  trex = createSprite(404,450);
  trex.addAnimation("running", trex_running);
  //trex.debug=true
  trex.setCollider('rectangle', 0, 0, 1500,2500)
  trex.scale = 0.09;
 

  invisibleGround = createSprite(188, 510, 20000, 10);
  invisibleGround.visible=false;
  //invisibleGround.visible =false

  ground = createSprite(115, 513,80000,0.1);

  asuraMardan= createSprite(450,40);
  asuraMardan.addImage(asuraMardanImg);
  asuraMardan.scale=0.2;

  levelNo = createSprite(890,45);
  levelNo.addImage(levelNoImg);
  levelNo.scale=0.15;

  instruction= createSprite(1182,46);
  instruction.addImage(instructionImg);
  instruction.scale=0.1;

  gameOver = createSprite(683, 250);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.09;
  gameOver.visible = false;

  restart = createSprite(680, 315);
  restart.addImage(restartImg);
  restart.scale = 0.09;
  restart.visible = false;
  
  hanumanji = createSprite(538,420);
  hanumanji.addImage(hanumanjiImg);
  hanumanji.scale = 0.21;
  hanumanji.visible = false;

  gameWon = createSprite(683, 250);
  gameWon.addImage(gameWonImg);
  gameWon.scale = 0.37;
  gameWon.visible = false;

  nextLevel = createSprite(680,315);
  nextLevel.addImage(nextLevelImg);
  nextLevel.scale = 0.15;
  nextLevel.visible = false;

  obstaclesGroup = new Group();
 
  score = 0;

  arrowGroup= new Group();
}

function draw() {
  //trex.debug = true;
  background(backgroundImg);
  textSize(20);
  fill("black")
  text("Score: " + score, 30, 50);
  text(mouseX + ',' + mouseY, 33, 23);

  if (gameState === PLAY) {
    
  // release arrow when space key is pressed
 
  if (keyDown("space")) {
    createArrow();
  
  }

    if (arrowGroup.isTouching(obstaclesGroup)) {
      obstaclesGroup.destroyEach();
      arrowGroup.destroyEach();
        score=score+1;
        count=count+1;
        console.log(count);
        
    
  }


  

    score = score + Math.round(getFrameRate() / 60);

    //trex.velocityY = trex.velocityY + 0.8

    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    trex.collide(invisibleGround);
    spawnObstacles();

    if (obstaclesGroup.isTouching(trex)) {
      collidedSound.play()
      
      gameState = END;
    }
    if(count ==5){
      gameState= WON;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    hanumanji.visible = true;
    restart.visible = true;
    if(mousePressedOver(restart)) {
      reset();
      
    }
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
  
    obstaclesGroup.destroyEach();
  }

  drawSprites();
}

function spawnObstacles() {
  if (frameCount % 100 === 0) {
    var obstacle = createSprite(1300, 370);
    obstacle.setCollider('circle', 0, 0, 1000)
    //obstacle.debug = true
    
    obstacle.velocityX = -(6 + 10 * score / 100);

    //generate random obstacles
    var rand = Math.round(random(1, 2));
    switch (rand) {
      case 1: obstacle.addImage(obstacle1);
      
      
        break;
      case 2: obstacle.addImage(obstacle2);
     
        break;
      default: break;
    }

    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.13;
    obstacle.lifetime = 500;
    obstacle.depth = trex.depth;
    trex.depth += 1;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

// Creating  arrows for bow
function createArrow() {
  var arrow= createSprite(500,316, 60, 10);
  arrow.addImage(arrowImage);
  //arrow.y=bow.y;
  arrow.velocityX = 10;
  arrow.lifetime = 500;
  arrow.scale = 0.07;
  arrowGroup.add(arrow);
   
}

function reset() {
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  obstaclesGroup.destroyEach();
  score = 0;
  hanumanji.visible = false;
}

