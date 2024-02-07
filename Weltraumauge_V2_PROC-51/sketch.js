var ship,shipImg;
var boss, canonBoss1,canonBoss2,canonBoss3;
var boss1Img, boss2Img, boss3Img, boss4Img, boss5Img
var bullet1,bullet1Img,bullet1Group;
var shotBoss1, shotBoss2, shotBoss3,
    shotBossAnim, shotBoss1Group, shotBoss2Group, shotBoss3Group;
var canonBall1, canonBall2, canonBall3,
    canonBallAnim, canonBall1Group, canonBall2Group, canonBall3Group;
var bossLife=1300, shipLife=3, canonLife1=0, canonLife2=500, canonLife3=500//////
var timeShot=5;
var laser1, laser2, laserImg
var gameState=1;
var END=0, SERVE=1, PLAY=2

function preload(){
  shipImg=loadImage("ship.png")
  boss1Img=loadImage("boss1.png"), boss2Img=loadImage("boss2.png"), boss3Img=loadImage("boss3.png")
  boss4Img=loadImage("boss4.png"), boss5Img=loadImage("boss5.png")
  bullet1Img=loadImage("red_bullet.png")
  shotBossAnim=loadAnimation("energyBall1.png","energyBall2.png")
  canonBallAnim=loadAnimation("canonBall1.png","canonBall2.png","canonBall2.png")
  laserImg=loadAnimation("laser1.png","laser2.png","laser3.png","laser4.png",)
}
  
function setup() {
  createCanvas(1000,500);
  ship=createSprite(300, 250, 50, 50);
  ship.addImage(shipImg)
  ship.debug=true
  ship.setCollider("rectangle",0,0,200,200)
  ship.scale=0.3

  boss=createSprite(880, 250, 50, 50);
  boss.addImage(boss1Img);
  boss.debug=false
  boss.setCollider("circle",80,0,25)
  boss.scale=0.6

  laser1=createSprite(450,125,950,50)
  laser1.debug=true
  laser1.visible=false
  laser1.addAnimation("laser",laserImg)
  laser1.setCollider("rectangle",50,0,950,50)

  laser2=createSprite(450,375,950,50)
  laser2.debug=true
  laser2.visible=false
  laser2.addAnimation("laser",laserImg)
  laser2.setCollider("rectangle",50,0,950,50)

  canonBoss1=createSprite(840, 40, 0, 0);
  canonBoss1.debug=false
  canonBoss1.visible=false
  canonBoss1.setCollider("rectangle",0,50,50,-150)

  canonBoss2=createSprite(880, 250, 50, 0);
  canonBoss2.debug=false
  canonBoss2.visible=false
  canonBoss2.setCollider("rectangle",50,0,150,150)

  canonBoss3=createSprite(840, 460, 0, 0);
  canonBoss3.debug=false
  canonBoss3.visible=false
  canonBoss3.setCollider("rectangle",0,-50,50,150)

  bullet1Group = new Group()
  shotBoss1Group = new Group()
  shotBoss2Group = new Group()
  shotBoss3Group = new Group()
}

function draw() {
  background("gray");  
  if (gameState===SERVE) {
    if (keyDown("e")) {
      gameState=PLAY
    }
  }

  if (gameState===PLAY) {
    ShotBullets()
    keyMove()
    CanonBossF()
    if (canonLife1<499) {
      ShotBossF1()
      ShotBossF2()
    }
    if (canonLife3>1) {
      ShotBossF3()
      ShotBossF2()
    }
    if (bossLife==0) {
      gameState=END
    }
    if (shipLife<=0) {
      gameState=END
    }
  }
 
  if (gameState===END) {
    
  }

  drawSprites();
  fill("white")
  text("vida: "+bossLife,500,250)
  text("vidas: "+shipLife,500,50)
  text("count: "+timeShot,500,450)
  text("cañon1: "+canonLife1,700,50)
  text("cañon2: "+canonLife2,700,250)
  text("cañon3: "+canonLife3,700,450)
  edges = createEdgeSprites();
}
////////////////////////////////////////////////////////////
function ShotBullets() {
  if (timeShot<10) {
    timeShot+=Math.round(getFrameRate()/60);
  }

  if(boss.isTouching(bullet1Group)){
  for(var i=0;i<bullet1Group.length;i++){     
   if(boss.isTouching(bullet1Group)){
        bullet1Group[i].destroy();
        bossLife-=10    
    }
  }
}

  if (timeShot>5) {
    if (keyDown("space")) {
        bullet1 = createSprite(ship.x,ship.y,20,10)
        bullet1.addImage(bullet1Img)
        bullet1.scale=0.2
        bullet1.velocityX = 20
        bullet1.lifetime=50
        bullet1Group.add(bullet1)
        timeShot=0
    }
  }
}
////////////////////////////////////////////////////////////
function CanonBossF() {
  if(canonBoss1.isTouching(bullet1Group)){
    for(var i=0;i<bullet1Group.length;i++){     
     if(canonBoss1.isTouching(bullet1Group)){
          bullet1Group[i].destroy();
          canonLife1+=10
      }
    }
  }
  if(canonBoss2.isTouching(bullet1Group)){
    for(var i=0;i<bullet1Group.length;i++){     
     if(canonBoss2.isTouching(bullet1Group)){
      bullet1Group[i].destroy();
       if (canonLife1>=500&&canonLife3<=0) {
         canonLife2-=10
       }
      }
    }
  }
  if(canonBoss3.isTouching(bullet1Group)){
    for(var i=0;i<bullet1Group.length;i++){     
     if(canonBoss3.isTouching(bullet1Group)){
          bullet1Group[i].destroy();
          canonLife3-=10   
      }
    }
  }
  if (canonLife1>=500) {
    canonBoss1.destroy()
    boss.addImage(boss2Img);
    boss.changeAnimation(boss2Img);
  }
  if (canonLife3<=0) {
    canonBoss3.destroy()
    boss.addImage(boss3Img);
    boss.changeAnimation(boss3Img);
  }
  if (canonLife1>=500&&canonLife3<=0) {
    boss.addImage(boss4Img);
    boss.changeAnimation(boss4Img);
  }
  if (canonLife2<=0) {
    canonBoss2.destroy()
    boss.addImage(boss5Img);
    boss.changeAnimation(boss5Img);

if (ship.isTouching(laser1)||ship.isTouching(laser2)) {
  gameState=END
}
  }
}
////////////////////////////////////////////////////////////
function ShotBossF1(){
  if(ship.isTouching(shotBoss1Group)){
    for(var i=0;i<shotBoss1Group.length;i++){
     if(ship.isTouching(shotBoss1Group)){
      shotBoss1Group[i].destroy();
      shipLife-=1
      }
    }
  }

if(frameCount%40===0){
  var delta=Math.round(random(1,2))
  switch (delta) {
    case 1:
      shotBoss1 = createSprite(canonBoss1.x,canonBoss1.y+80,40,40)
      shotBoss1.addAnimation("energyBall",shotBossAnim)
      shotBoss1.scale = 0.15
      shotBoss1.velocityX = -10
      shotBoss1.debug= false
      shotBoss1.setCollider("rectangle",0,0,400,400)
      shotBoss1.lifetime = 400
      shotBoss1Group.add(shotBoss1)
      break;
  
    case 2:
      shotBoss1 = createSprite(canonBoss1.x,canonBoss1.y,40,40)
      shotBoss1.addAnimation("energyBall",canonBallAnim)
      shotBoss1.scale = 0.15
      shotBoss1.velocityX = -10
      shotBoss1.debug= false
      shotBoss1.setCollider("rectangle",0,0,500,250)
      shotBoss1.lifetime = 400
      shotBoss1Group.add(shotBoss1)
      break; 
  }

}
}
////////////////////////////////////////////////////////////
function ShotBossF2(){
    if(ship.isTouching(shotBoss2Group)){
      for(var i=0;i<shotBoss2Group.length;i++){
       if(ship.isTouching(shotBoss2Group)){
        shotBoss2Group[i].destroy();
        shipLife-=1
        }
      }
    }

  if(frameCount%50===0){
  var delta=Math.round(random(1,2))
  switch (delta) {
    case 1:
      shotBoss2 = createSprite(boss.x+80,boss.y,40,40)
      shotBoss2.addAnimation("energyBall",shotBossAnim)
      shotBoss2.scale = 0.15
      shotBoss2.velocityX = -10
      shotBoss2.debug= false
      shotBoss2.setCollider("rectangle",0,0,300,300)
      shotBoss2.lifetime = 400
      shotBoss2Group.add(shotBoss2)
      break;

    case 2:
      shotBoss2 = createSprite(boss.x,boss.y,40,40)
      shotBoss2.addAnimation("energyBall",canonBallAnim)
      shotBoss2.scale = 0.15
      shotBoss2.velocityX = -10
      shotBoss2.debug= false
      shotBoss2.setCollider("rectangle",0,0,500,250)
      shotBoss2.lifetime = 400
      shotBoss2Group.add(shotBoss2)
      break;
    }
  }
}
////////////////////////////////////////////////////////////
function ShotBossF3(){
  if(ship.isTouching(shotBoss3Group)){
    for(var i=0;i<shotBoss3Group.length;i++){
     if(ship.isTouching(shotBoss3Group)){
      shotBoss3Group[i].destroy();
      shipLife-=1
      }
    }
  }

if(frameCount%40===0){
  var delta=Math.round(random(1,2))
  switch (delta) {
    case 1:
      shotBoss3 = createSprite(canonBoss3.x,canonBoss3.y-80,40,40)
      shotBoss3.addAnimation("energyBall",shotBossAnim)
      shotBoss3.scale = 0.15
      shotBoss3.velocityX = -10
      shotBoss3.debug= false
      shotBoss3.setCollider("rectangle",0,0,400,400)
      shotBoss3.lifetime = 400
      shotBoss3Group.add(shotBoss3)
      break;
  
    case 2:
      shotBoss3 = createSprite(canonBoss3.x,canonBoss3.y,40,40)
      shotBoss3.addAnimation("energyBall",canonBallAnim)
      shotBoss3.scale = 0.15
      shotBoss3.velocityX = -10
      shotBoss3.debug= false
      shotBoss3.setCollider("rectangle",0,0,500,250)
      shotBoss3.lifetime = 400
      shotBoss3Group.add(shotBoss3)
      break; 
   }
  }
}
////////////////////////////////////////////////////////////
  function keyMove() {
   if (keyDown("w")) {
    ship.y-=10
  }
   if (keyDown("a")) {
    ship.x-=10
  }
   if (keyDown("s")) {
     ship.y+=10
  }
   if (keyDown("d")) {
     ship.x+=10
  }
  ship.collide(edges);
}