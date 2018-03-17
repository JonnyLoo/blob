var myCanvas;
var player;

// array to store blobs
var blobs = [];
var blobCount = 15;

// direction
var HORIZONTAL = "horizontal";
var VERTICAL = "vertical";

// points
var score;
var blobSize;

var font;

function setup() {
    myCanvas = createCanvas(520, 500);
    myCanvas.parent("game-container");
    background(0);
    noStroke();
    rectMode(CORNERS);

    player = new Player(250, 250);
    score = new ScoreKeeper();
    blobSize = 10;

    for (var i = 0; i < blobCount; i++) {
        var blob = new Blob();
        blobs.push(blob);
    }

    textFont(font);
}

function preload() {
  font = loadFont('font.ttf');
}

function draw() {
  //cheats
  if(keyIsDown(87)) {
    //instant win
    score.points = 50;
  }
  if(keyIsDown(76)) {
    //instant lose
    score.points = -10;
  }

  if (score.won()) {
      background("#15b5b0");
      textSize(20);
      fill('#F7E7CE');
      text("YOU WIN", 210, 220);
      text("PRESS R TO RESTART", 120, 270);

      if(keyIsDown(82)) {
        score.reset();
        player.reset();
      }
  }
  else if(score.lost()) {
    background("#15b5b0");
    textSize(20);
    fill('#f9bdc0');
    text("YOU LOSE", 195, 220);
    text("PRESS R TO RESTART", 120, 270);

    if(keyIsDown(82)) {
      score.reset();
      player.reset();
    }
  }
  else {
    background("#15b5b0");
    player.update();
    player.display();

    for (var i = 0; i < blobCount; i++) {
        blob = blobs[i];
        blob.update();
        blob.display();

        var isHit = player.detectHit(blob);

        // player is eaten by a blob
        if (isHit && blob.size >= player.size) {
            score.loseDecr();
            player.shrink();
            player.restartGame();
        }

        // if player eats a blob, remove that blob
        if (isHit && blob.size < player.size) {
            score.incr();
            player.grow();
            blob.restart();
        }
    }

    score.display();
  }
}

class Player {
    constructor(x, y) {
        this.xPos = x;
        this.yPos = y;
        this.state = 0; //if lost or not
        this.size = 20;
        this.speed = 2;
    }

    display() {
        imageMode(CENTER);
        fill("#F7E7CE");
        ellipse(this.xPos, this.yPos, this.size, this.size);
    }

    update() {
        if (keyIsDown(UP_ARROW) && this.yPos > (0 + this.size / 2)) {
            this.yPos -= this.speed;
        }
        if (keyIsDown(DOWN_ARROW) && this.yPos < (500 - this.size / 2)) {
            this.yPos += this.speed;
        }
        if (keyIsDown(LEFT_ARROW) && this.xPos > (0 + this.size / 2)) {
            this.xPos -= this.speed;
        }
        if (keyIsDown(RIGHT_ARROW) && this.xPos < (500 - this.size / 2)) {
            this.xPos += this.speed;
        }
    }

    detectHit(blob) {
        // check the size of the bigger one
        var size = blob.size > this.size ? blob.size : this.size;
        // tell the main program that a hit occurred
        // if not close - not a hit
        return dist(this.xPos, this.yPos, blob.xPos, blob.yPos) < size;
    }

    grow() {
        this.size += .5;
    }

    shrink() {
      this.size -= .5;
    }

    restartGame() {
        this.xPos = 250;
        this.yPos = 250;

        for (var i = 0; i < blobCount; i++) {
            var blob = blobs[i];
            blob.restart();
        }
    }

    reset() {
      this.restartGame();
      this.size = 20;
    }
}

class Blob {
    constructor() {
        this.direction = flipCoin() ? HORIZONTAL : VERTICAL;
        this.xDir = this.getInitialXDir();
        this.yDir = this.getInitialYDir();
        this.xPos = this.getInitialXPos();
        this.yPos = this.getInitialYPos();
        this.speed = random(0.1, 1.1);
        this.size = int(random(blobSize, blobSize + 40));
        if (this.size < 20) {
            this.color = color("#6dece0");
        } else if (this.size < 30) {
            this.color = color("#fbe698");
        } else if (this.size < 40) {
            this.color = color("#f9bdc0");
        } else {
            this.color = color("#BAECB4");
        }
    }

    getInitialXDir() {
        if (this.direction == HORIZONTAL) {
            // either move towards the right or towards the left
            return flipCoin() ? 1 : -1;
        }

        return 1;
    }

    getInitialYDir() {
        if (this.direction == HORIZONTAL) {
            return 1;
        }

        // either move upwards or downwards
        return flipCoin() ? 1 : -1;
    }

    getInitialXPos() {
        if (this.direction == HORIZONTAL) {
            if (this.xDir == 1) {
                // moving right
                return random(-50, 0)
            } else {
                // moving left
                return random(500, 550)
            }
        }

        return random(0, 500)
    }

    getInitialYPos() {
        if (this.direction == VERTICAL) {
            if (this.yDir == 1) {
                // moving down
                return random(-50, 0)
            } else {
                // moving up
                return random(500, 550)
            }
        }

        return random(0, 500)
    }

    display() {
        imageMode(CENTER);
        fill(this.color);
        ellipse(this.xPos, this.yPos, this.size, this.size);
    }

    update() {
        if (this.direction == HORIZONTAL) {
            // update x position for horizontally moving blob
            this.xPos += this.speed * this.xDir;
        } else {
            // update y position for vertically moving blob
            this.yPos += this.speed * this.yDir;
        }

        if (this.isOffscreen()) {
            this.restart();
        }
    }

    isOffscreen() {
        if (this.xDir == 1 && this.xPos >= 500)
            return true

        if (this.xDir == -1 && this.xPos <= 0)
            return true

        if (this.yDir == 1 && this.yPos >= 500)
            return true

        if (this.yDir == -1 && this.yPos <= 0)
            return true

        return false
    }

    restart() {
        this.direction = flipCoin() ? HORIZONTAL : VERTICAL;
        this.xDir = this.getInitialXDir();
        this.yDir = this.getInitialYDir();
        this.xPos = this.getInitialXPos();
        this.yPos = this.getInitialYPos();
        this.speed = random(0.1, 4.1);
        this.size = int(random(blobSize, blobSize + 40));
        if (this.size < 20) {
            this.color = color("#6dece0");
        } else if (this.size < 30) {
            this.color = color("#fbe698");
        } else if (this.size < 40) {
            this.color = color("#f9bdc0");
        } else {
            this.color = color("#BAECB4");
        }
    }
}

class ScoreKeeper {
    constructor() {
        this.points = 0;
    }

    display() {
        fill("#006666");
        rect(500, 0, 520, 500);
        if(this.points >= 0) {
          fill("#F7E7CE");
          rect(500, 500 - this.points * 10, 520, 500);
        }
        else {
          fill('#BE7BEA');
          rect(500, 0, 520, this.points * -50);
        }
    }

    incr() {
        this.points++;
        blobSize += .25;
    }

    decr() {
        this.points--;
    }

    loseDecr() {
      this.points = -10;
    }

    won() {
        return this.points >= 50;
    }

    lost() {
        return this.points <= -10;
    }

    reset() {
        this.points = 0;
    }
}

function flipCoin() {
    return random(0, 1) < 0.5;
}
