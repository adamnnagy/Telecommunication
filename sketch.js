

var defaultDiameter = 1;
var speed = 0.1;
var myAnimation;
var someText = ". Never gonna give you up Never gonna let you down Never gonna run around and desert you Never gonna make you cry Never gonna say goodbye Never gonna tell a lie and hurt you";
var buttonPressed = false;
var button;
var never;

var someLyrics = someText.split(" ");

var myAnimation = new Animation(defaultDiameter);

function preload() {
  never = loadSound('never.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  textSize(50);
  fill(10);
  noStroke();

  console.log(sqrt(sq(height)+sq(width)));

  text('HOLD "A"! ;)', windowWidth/2, windowHeight/2);
  text('(or push the button)', windowWidth/2, windowHeight/2 + 100);
}

function draw() {


  fill(40);
  ellipse(width/2, height/2, 0);

  myAnimation.display();



  if (myAnimation.diameter + 15 > sqrt(sq(height)+sq(width))) {
    myAnimation.flipValue();

    //button INTERACTION

    if (buttonPressed) {
      myAnimation.grow();
      // never.play();
    } else {
      // never.stop();
    }


  }

  //KEYBOARD INTERACTION

  if (keyIsDown(65)) {
    myAnimation.grow();
    // never.loop();
  } else {
    // never.stop();
  }
}


function keyPressed() {
  if (keyCode === 65) {
    never.play();
  }


}

function keyReleased() {
  never.stop();
}
//CLASS ASSIGNMENT


function Animation(diameter) {
  this.diameter = diameter;
  this.rateOfGrowth = 0.1;
  this.fillValue = 0;
  this.counter = 0;
}

Animation.prototype.grow = function () {
  if (abs(this.diameter) < sqrt(sq(height)+sq(width))) {
    for (var i = this.diameter; i < sqrt(sq(height)+sq(width)); i ++) {
      this.diameter += this.rateOfGrowth;
    }

  }
};

Animation.prototype.reverseGrowth = function () {
    this.rateOfGrowth *= -1;
    console.log(this.rateOfGrowth);
};

Animation.prototype.display = function () {

  fill(this.fillValue);
  ellipse(width/2, height/2, this.diameter);
  textSize(250);
  if (this.counter > 0) {
    fill(219, 63, 203);
    text(someLyrics[(myAnimation.counter%(someLyrics.length))].toUpperCase(), windowWidth/2, windowHeight/2);
//    img.position(width/2, height/2 - 100);
  }
};

Animation.prototype.flipValue = function () {
  background(this.fillValue);
  this.diameter = 0;
  if (this.fillValue === 0) {
    this.fillValue = 255;
  } else {
    this.fillValue = 0;
  }
  this.counter++;
};



function serialEvent() {
  var button = serial.read();
  if (button = 1) {
    buttonPressed = true;
  } else {
    buttonPressed = false;
  }

}

function serialError(err) {
  console.log('Something went wrong with the serial port. ' + err);
}

function portClose() {
  console.log('The serial port closed.');
}

function printList(portList) {
  for (var i = 0; i < portList.length; i++) {
    console.log(i + " " + portList[i]);
  }
}


function serverConnected() {
  console.log('connected to server.');
}

function portOpen() {
  console.log('the serial port opened.')
}
