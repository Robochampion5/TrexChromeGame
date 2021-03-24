var trex,trex_running,trex_collided;
var ground,ground_image, ground2;
var    obstacle,obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6, obstaclegroup;
var cloud, cloudgroup, cloud_img;
var sscore, gamestate, PLAY, END,restarts,gameover_img, restart_img, game_over;

function preload(){
  trex_running= loadAnimation("trex1.png", "trex3.png", "trex4.png");
  ground_image= loadImage("ground2.png");
  cloud_img= loadImage("cloud.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2= loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  trex_collided = loadAnimation("trex_collided.png");
  gameover_img = loadImage("gameOver.png");
  restart_img = loadImage("restart.png");
}
    

function setup() {
  createCanvas(600, 200);
  sscore=0;
  trex= createSprite(50, 170, 30,30);
  trex.addAnimation("trexrunning", trex_running);
  trex.addAnimation("trexcollide", trex_collided);
  trex.scale=0.54;
  
  ground= createSprite(300,170, 600,30);
  ground.addImage("groundsprite", ground_image);
  
  restarts = createSprite(300,100,30,30);
  restarts.addImage("restarticon", restart_img);
  restarts.visible=false;
  restarts.scale=0.7;
  
  game_over = createSprite(300,50,100,100)
  game_over.addImage("gameOver", gameover_img);
  game_over.scale=0.7;
  game_over.visible=false;
  
  ground2 = createSprite(300,170,600,10);
  ground2.visible=false;
  
  PLAY=1;
  END=0;
  
  gamestate=PLAY;
  
  sscore=0;
  
  obstaclegroup=new Group();
  cloudgroup=new Group();
}

function draw() {
  background(180);
  if(gamestate===PLAY){
     if(ground.x<0){
    ground.x=ground.width/2;
  }
  
  if (keyDown("space") && trex.y>136){
    trex.velocityY=-14;
  }
    ground.velocityX=-(8);  

  sscore=sscore+Math.round(frameRate()/30);
  clouds();
  obstacle();
    
  if(trex.isTouching(obstaclegroup)){
    gamestate=END;
  }
  }
  
  else if(gamestate===END){
   ground.velocityX=0;
   obstaclegroup.setVelocityXEach(0);
   cloudgroup.setVelocityXEach(0);
   obstaclegroup.setLifetimeEach(-1);
   trex.changeAnimation("trexcollide", trex_collided);
   game_over.visible=true;
   restarts.visible=true;
    if(mousePressedOver(restarts)){
      reset();
    }
    
}
  trex.velocityY=trex.velocityY+0.8;  
  trex.collide(ground2); 
  text("Score: "+sscore,500,50);
  drawSprites();
}

function clouds(){
  if(frameCount%70===0){
    var cloud = createSprite(600,random(50,100),30,30);
    cloud.velocityX=-(8+sscore/100);
    cloudgroup.add(cloud);
    cloud.scale=0.5;
    cloud.addAnimation("clouds", cloud_img);
    cloud.lifetime=200;
     }
}

function obstacle(){
  if(frameCount%60===0){
    var obstacle= createSprite(600,150,30,30);
    var rand = Math.round(random(1,6));
    switch(rand){
      case 1:obstacle.addImage(obstacle1);
            break;
      case 2:obstacle.addImage(obstacle2);
            break;  
      case 3:obstacle.addImage(obstacle3);
            break; 
      case 4:obstacle.addImage(obstacle4);
            break;
      case 5:obstacle.addImage(obstacle5);
            break;
      case 6:obstacle.addImage(obstacle6);
            break;
     default: break;
    }
    obstacle.velocityX=-8;
    obstaclegroup.add(obstacle);
    obstacle.scale=0.7; 
    obstacle.lifetime=200;
  }
}

function reset(){
      gamestate=PLAY;
      obstaclegroup.destroyEach();
      cloudgroup.destroyEach();
      restarts.visible=false;
      game_over.visible=false;
      trex.changeAnimation("trexrunning", trex_running);
}