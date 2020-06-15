
var PLAY=1;
var END=0;
var gameState=PLAY
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage, cloudImage, obstical1Image;
var obsticalGroup
var cloudGroup
var GameOverImage, restartImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var gameover
var restart
var jumpSound,dieSound,checkpointsound;
var score=0;


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  cloudImage= loadImage("cloud.png");
  obstical1Image=loadImage("obstacle1.png");
 gameOverImage= loadImage("gameOver.png");
  restartImage=loadImage("restart.png")
  
  jumpSound=loadSound("jump.mp3");
  dieSound=loadSound("die.mp3");
  checkpointSound=loadSound("checkPoint.mp3")
                      
  
}

function setup() {
  background(220)
  
  
  
  
  //create a trex sprite
  trex = createSprite(50,380,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  //create a ground sprite
  ground = createSprite(200,380,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  //creating invisible ground
  invisibleGround = createSprite(200,390,400,10);
  invisibleGround.visible = false;
  
  obsticalGroup=new Group();
  cloudGroup=new Group();
  gameover=createSprite(200,150,20,8);
  restart=createSprite(200,250,10,8);
  gameover.addImage(gameOverImage);
  restart.addImage(restartImage);
  restart.visible=false;
  gameover.visible=false;
}

function draw() {
  //set background color
  background("black");
  trex.debug=true;
  score = score + Math.round(getFrameRate()/60);
  text("score:"+score,200,100)
  if(score % 100==0){
    //checkpointSound.play();
    
    }
  
  // jump when the space key is pressed
  
  //trex.setCollider("rectangle",0,0,140,40);
  
  
 
  
  //stop trex from falling down
  trex.collide(invisibleGround);
  
  
  if(gameState==PLAY){
     ground.velocityX = -(6+score/100)
     spawnClouds();
     obsticals();
    
     if (ground.x < 0){
    ground.x = ground.width/2;
       trex.velocityY = trex.velocityY + 0.10
  }
    if(keyDown("space")&& trex.y >= 361) {
    trex.velocityY = -13
       //jumpSound.play();
  }
    trex.velocityY = trex.velocityY + 0.8
    if(obsticalGroup.isTouching(trex)){
   gameState=END
     // trex.velocityY=-13
  //dieSound.play();
    
  }
    
  }
  
  if(gameState==END){
   trex.velocityY=0
    ground.velocityX=0
    cloudGroup.setVelocityXEach(0)
    obsticalGroup.setVelocityXEach(0)
    restart.visible=true;
  gameover.visible=true;
    if(mousePressedOver(restart)){
     reset();
        
      
    }
    
  }
  
  console.log(trex.y)
  drawSprites();
}
function spawnClouds(){
if(World.frameCount%60==0){
  var cloud=createSprite(400,100,50,10)
 cloud.y=Math.round(random(280,320))
   cloud.velocityX=-3
  cloud.addImage(cloudImage)
  cloud.scale=0.5
  console.log(cloud.depth)
  cloud.depth=trex.depth
  trex.depth=trex.depth+1
  cloudGroup.add(cloud);
  
}

  
  
}
function obsticals(){
  
  if(World.frameCount%60==0){
    var obstical=createSprite(200,355,8,50)
    obstical.velocityX=-(2+score/100)
    obstical.addImage(obstical1Image)
    obstical.x=Math.round(random(280,320))
    obstical.scale=0.5
    obsticalGroup.add(obstical);
  }
  
  
}

function reset(){
  gameState=PLAY
  obsticalGroup.destroyEach();
    restart.visible=false;
  gameover.visible=false;
  cloudGroup.destroyEach();
  score=0
}

