var boy, boyi
var ground, invisibleGround, groundImage;
var cboy
var PLAY = 1 
var END = 0
var bg
var Gamestate = PLAY 
var obstacle1, obstacle2, obstacle3,obstacle4,obstacle5,obstacle6 
 

var restart, RIMG
var gameover, OVERIMG
var score=0
var obgroup
var clgroup

function preload(){
  boyi = loadImage("boy.png");
  cboy= loadImage("cryingboy.png")
  cloudImage=loadImage("cloud.png")
  groundImage = loadImage("ground2.png");
  obstacle1 = loadImage("obstacle1.png") 
  obstacle2 = loadImage("obstacle2.png") 
  obstacle3 = loadImage("obstacle3.png") 
  obstacle4 = loadImage("obstacle4.png") 
  obstacle5 = loadImage("obstacle5.png") 
  obstacle6 = loadImage("obstacle6.png") 
  RIMG= loadImage("restart.png")
  OVERIMG= loadImage("gameOver.png")
  bg = loadImage("forest.png")
}

function setup() {
bg.scale= 1.2
  createCanvas(400,200)
  //background=addImage("forest", bg)
  //create a trex sprite
  boy = createSprite(50,160,20,50);
  boy.addImage("running", boyi);
  boy.addImage("crying", cboy)
  boy.scale = 0.3;
  boy.setCollider("circle",0,0,40)
  boy.debug=true
  //create a ground sprite
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  //creating invisible ground
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  //generate random numbers
  var rand =  Math.round(random(1,100))
  console.log(rand)
  obgroup = new Group()
  clgroup = new Group()
  
  restart=createSprite(300,140)
  restart.addImage(RIMG)
  gameover=createSprite(300,100)
  gameover.addImage(OVERIMG)
  restart.scale=0.5
  gameover.scale=2.5
}

function draw() {
  //set background color
  background(bg);
  text("Score;"+score,500,50)

  if(Gamestate===PLAY){
    ground.velocityX= -3
    score =score+Math.round(frameCount  /60 )
    if(keyDown("space")&& boy.y >= 100) {
      boy.velocityY = -10;
    }
    boy.velocityY = boy.velocityY + 0.8
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    spawnClouds()
  spawnObstacles()
  if(obgroup.isTouching(boy)){
    Gamestate= END
  }
  gameover.visible=false
  restart.visible=false
  }
  else if(Gamestate===END){
ground.velocityX=0
boy.velocityY=0
obgroup.setLifetimeEach(-1)
clgroup.setLifetimeEach(-1)
//trex.changeAnimation("collided", trex_collided)
boy.changeImage("crying", cboy)
obgroup.setVelocityXEach(0)
clgroup.setVelocityXEach(0)
gameover.visible=true
restart.visible=true
  }
  
  
  // jump when the space key is pressed

  boy.collide(invisibleGround);
 
  
  
  //stop trex from falling down
  if(mousePressedOver(restart)) {
    reset();
  }
  //Spawn Clouds
  
  drawSprites();
}

function reset(){
  Gamestate=PLAY
  gameover.visible=false
  restart.visilbe=false
  obgroup.destroyEach()
  clgroup.destroyEach()
  boy.changeImage("running", boyi);
score=0
//trex.changeAnimation("running",trex_running)
}

//function to spawn the clouds
function spawnClouds(){
 // write your code here 


if(frameCount %120===0){
  cloud=createSprite(600,100,40,10) 
cloud.velocityX=-3
cloud.addImage(cloudImage)
cloud.y=Math.round(random(10,60))
console.log(boy.depth)
console.log(cloud.depth)
cloud.depth=boy.depth
boy.depth=boy.depth+1
clgroup.add(cloud)
cloud.scale=0.1

}
}

function spawnObstacles(){
  if(frameCount %120===0){
    obstacle=createSprite(600,165,10,10)
    var num= Math.round(random(1,6))
     switch(num) {
      case 1 : obstacle.addImage (obstacle1)
      break
      case 2 : obstacle.addImage (obstacle2)
       break
       case 3 : obstacle.addImage (obstacle3)
       break
       case 4 : obstacle.addImage (obstacle4)
       break
       case 5 : obstacle.addImage (obstacle5)
       break
       case 6 : obstacle.addImage (obstacle6)
       break
       default : break
       
     }
obstacle.velocityX =  -5
obstacle.scale= 0.5
obstacle.lifetime= 200
obgroup.add(obstacle)
  }
}


