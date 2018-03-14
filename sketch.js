// python 2 server, run `python -m SimpleHTTPServer`
// python 3 server, run `python -m http.server`

var myCanvas;
var points = 0;
var player;

// array to store blobs
var blobs = [];

// direction
var HORIZONTAL = "horizontal";
var VERTICAL = "vertical";

function setup() {
    myCanvas = createCanvas(500, 500);
    myCanvas.parent("game-container");
    background(0);

    player = new Player(250, 250);

    for (var i = 0; i < 10; i++) {
        var blob = new Blob();
        blobs.push(blob);
    }
}

function preload() {}

function draw() {
    background(0);
    player.update();
    player.display();

    for (var i = 0; i < 10; i++) {
        blob = blobs[i];
        blob.update();
        blob.display();
    }
}

class Player {
    constructor(x, y) {
        this.xPos = x;
        this.yPos = y;
        this.state = 0; //if lost or not
        this.size = 20;
    }

    display() {
        imageMode(CENTER);
        fill(255, 255, 255);
        ellipse(this.xPos, this.yPos, this.size, this.size);
    }

    update() {
        if (keyIsDown(UP_ARROW)) {
            this.yPos -= 1;
        }
        if (keyIsDown(DOWN_ARROW)) {
            this.yPos += 1;
        }
        if (keyIsDown(LEFT_ARROW)) {
            this.xPos -= 1;
        }
        if (keyIsDown(RIGHT_ARROW)) {
            this.xPos += 1;
        }
    }

    detectHit(x, y) {
        // tell the main program that a hit occurred
        // if not close - not a hit
        return dist(x, y, this.xPos, this.yPos) < this.size;
    }
}

class Blob {
    constructor() {
        this.color = color("red");
        this.direction = flipCoin() ? HORIZONTAL : VERTICAL;
        this.xPos = this.getInitialXPos();
        this.yPos = this.getInitialYPos();
        this.xDir = this.getInitialXDir();
        this.yDir = this.getInitialYDir();
        this.speed = random(2, 5);
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
            return flipCoin() ? -100 : 0;
        }

        return random(0, 500)
    }

    getInitialYPos() {
        if (this.direction == HORIZONTAL) {
            return random(0, 500)
        }

        return flipCoin() ? -100 : 0;
    }

    display() {
        imageMode(CENTER);
        fill(this.color);
        ellipse(this.xPos, this.yPos, 20, 20);
    }

    update() {
        if (this.direction == HORIZONTAL) {
            // update x position for horizontally moving blob

            this.xPos += this.speed * this.xDir;
            // if it hits the wall, remove it from array?
        } else {
            // update y position for vertically moving blob
            this.yPos += this.speed * this.yDir;
            // if it hits the wall, remove it from array?
        }
    }
}

function flipCoin() {
    return random(0, 1) < 0.5;
}
