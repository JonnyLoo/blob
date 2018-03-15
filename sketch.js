// python 2 server, run `python -m SimpleHTTPServer`
// python 3 server, run `python -m http.server`

var myCanvas;
var points = 0;
var player;

// array to store blobs
var blobs = [];
var blobCount = 15;

// direction
var HORIZONTAL = "horizontal";
var VERTICAL = "vertical";

// points
var points = 0;

function setup() {
    myCanvas = createCanvas(500, 500);
    myCanvas.parent("game-container");
    background(0);

    player = new Player(250, 250);

    for (var i = 0; i < blobCount; i++) {
        var blob = new Blob();
        blobs.push(blob);
    }
}

function preload() {}

function draw() {
    background(0);
    player.update();
    player.display();

    for (var i = 0; i < blobCount; i++) {
        blob = blobs[i];
        blob.update();
        blob.display();

        var isHit = player.detectHit(blob);

        // player is eaten by a blob
        if (isHit && blob.size >= player.size) {
            points--;
            player.restartGame();
        }

        // if player eats a blob, remove that blob
        if (isHit && blob.size < player.size) {
            points++;
            blob.restart();
        }
    }
}

class Player {
    constructor(x, y) {
        this.xPos = x;
        this.yPos = y;
        this.state = 0; //if lost or not
        this.size = 30;
        this.speed = 2;
    }

    display() {
        imageMode(CENTER);
        fill(255, 255, 255);
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

    restartGame() {
        this.xPos = 250;
        this.yPos = 250;

        for (var i = 0; i < blobCount; i++) {
            var blob = blobs[i];
            blob.restart();
        }
    }
}

class Blob {
    constructor() {
        this.direction = flipCoin() ? HORIZONTAL : VERTICAL;
        this.xDir = this.getInitialXDir();
        this.yDir = this.getInitialYDir();
        this.xPos = this.getInitialXPos();
        this.yPos = this.getInitialYPos();
        this.speed = random(0.1, 3);
        this.size = int(random(10, 50));
        if(this.size < 20) {
          this.color = color("red");
        }
        else if(this.size < 30) {
          this.color = color("orange");
        }
        else if(this.size < 40) {
          this.color = color("green");
        }
        else {
          this.color = color("blue");
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
        this.speed = random(0.1, 3);
        this.size = int(random(10, 50));
        if(this.size < 20) {
          this.color = color("red");
        }
        else if(this.size < 30) {
          this.color = color("orange");
        }
        else if(this.size < 40) {
          this.color = color("green");
        }
        else {
          this.color = color("blue");
        }
    }
}

function flipCoin() {
    return random(0, 1) < 0.5;
}
