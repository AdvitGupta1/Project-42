var banana,bananaImage,monkey,player_running,obstacle,obstacleImage,obstacleGroup,bananaGroup,Background,BackImage,score=0,scores,ground,place;

function preload(){
  
BackImage=loadImage("jungle.jpg");
  
player_running=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
 
bananaImage=loadImage("banana.png");
obstacleImage=loadImage("stone.png");  
}

function obstaclecreate(){
  if(frameCount%300==0){  
  obstacle=createSprite(400,360,10,10);
  obstacle.addImage(obstacleImage);
  obstacle.velocityX=-6;
  obstacle.scale=0.3;    
    
    obstacleGroup.add(obstacle);  
}
}

function fruit(){
  if(frameCount%80==0){
    place=Math.round(random(120,200));
    banana=createSprite(400,place,10,10);
    banana.addImage(bananaImage);
    banana.velocityX=-4;
    banana.lifetime=150;
    banana.scale=0.07;
    
    bananaGroup.add(banana);
  }
}  

function setup() {
  createCanvas(400, 400);
  
Background=createSprite(200,200,20,20);
Background.addImage(BackImage);
Background.velocityX=-5;
  
monkey=createSprite(20,378,20,20);  
monkey.addAnimation("moving",player_running); 
monkey.scale=0.1; 
  
ground=createSprite(0,380,1000,5);  
ground.velocityX=-4;  
ground.visible=false;  
  
bananaGroup=new Group();   
obstacleGroup=new Group();  
  
}  
function draw() {
  background(220);
  
 console.log(ground.x); 
  
  if(Background.x<-60){
    Background.x=200;
  }
  
  if(bananaGroup.isTouching(monkey)){
    score=score+2;
    banana.destroy();
  }
  
  switch(score){
        case 1: monkey.scale=0.12;
        break;
        case 2: monkey.scale=0.14;
        break;
        case 3: monkey.scale=0.16;
        break;
        case 4: monkey.scale=0.18;
        break;
        case 5: monkey.scale=2;
        break;
        default: break;
    }
  
  if(obstacleGroup.isTouching(monkey)){
    monkey.scale=0.1;
  }

  if(keyDown("space")&&monkey.y>120){
  monkey.velocityY=-4;
}    
  
monkey.velocityY=monkey.velocityY+0.4;
  
if(monkey.y<120){
  monkey.velocityY=4;
}  
  if(ground.x<-70){
    ground.x=0;
  }
  
  monkey.collide(ground);
  
  drawSprites();
  fruit();
  obstaclecreate();
  stroke("black");
  textSize(20);
  fill("black");
  text("Score: "+ score,200,50);  
}