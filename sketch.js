var myCanvas;
var points = 0;
var player;
function setup(){
  myCanvas = createCanvas(800, 800);
  background(0);
  
  player = new Player(250, 250);
}
function preload(){
  
}
function draw(){
  background(0);
  player.update();
  player.display();
}

class Player {
  constructor(x, y){
    this.xPos = x;
    this.yPos = y;
    this.state = 0; //if lost or not
  }
  display(){
    imageMode(CENTER);
    fill(255, 255, 255);
    ellipse(this.xPos, this.yPos, 20, 20);
  }
  update(){
    if(keyIsDown(UP_ARROW)){
      this.yPos -= 1;
    }
   if(keyIsDown(DOWN_ARROW)){
      this.yPos += 1;
    } 
    if(keyIsDown(LEFT_ARROW)) {
      this.xPos -= 1;
    }
    if(keyIsDown(RIGHT_ARROW)) {
      this.xPos += 1;
    }
  }
  detectHit(x, y) {
    if (dist(x, y, this.xPos, this.yPos) < 50) {
      // tell the main program that a hit occurred
      return true;
    }
    // not close - not a hit
    return false;
  }
}

class Blobs {
  
}