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
    blob = blobgs[i];
    blob.update();
    blob.display();
  }
}

class Player {
	constructor(x, y) {
		this.xPos = x;
		this.yPos = y;
		this.state = 0; //if lost or not
		this.size = 5;
	}

	display() {
		imageMode(CENTER);
		fill(255, 255, 255);
		ellipse(this.xPos, this.yPos, 20, 20);
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
		return dist(x, y, this.xPos, this.yPos) < 50;
	}
}

class Blob {
	constructor() {
		this.color = color("red");
		this.direction = random(0, 1) == 1 ? HORIZONTAL : VERTICAL;
    this.xPos = getInitialXPos();
    this.yPos = getInitialYPos():
    this.xDir = getInitialXDir();
    this.yDir = getInitialYDir();
		this.speed = random(15, 50);
	}

  getInitialXDir() {
    if (this.direction == HORIZONTAL) {
    } else {
      return
    }
  }

  getInitialYDir() {

  }

  getInitialXPos() {

  }

  getInitialYPos() {

  }

	display() {
		imageMode(CENTER);
		fill(255, 255, 255);
		ellipse(this.xPos, this.yPos, 20, 20);
	}

  update() {
    if (this.direction == HORIZONTAL) {
      // update x speed
    } else {

    }
  }
}
