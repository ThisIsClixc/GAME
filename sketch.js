let basket;
let fruits = [];
let score = 0;
let lives = 3;

function setup() {
  createCanvas(600, 800);
  basket = new Basket(width / 2 - 25, height - 100, 50, 50);
  setInterval(addFruit, 1000);
}

function draw() {class Basket {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.dir = 0;
  }

  update() {
    this.x += this.dir * 5;
    this.x = constrain(this.x, 0, width - this.w);
  }

  show() {
    fill(0, 255, 0);
    rect(this.x, this.y, this.w, this.h);
  }
}

class Fruit {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.speed = random(3, 8);
    this.img = loadImage("https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Emoji_u1f34e.svg/1024px-Emoji_u1f34e.svg.png");
  }

  update() {
    this.y += this.speed;
  }

  show() {
    image(this.img, this.x, this.y, this.w, this.h);
  }

  collides(other) {
    let left = this.x;
    let right = this.x + this.w;
    let top = this.y;
    let bottom = this.y + this.h;
    let oLeft = other.x;
    let oRight = other.x + other.w;
    let oTop = other.y;
    let oBottom = other.y + other.h;
    return !(left > oRight || right < oLeft || top > oBottom || bottom < oTop);
  }
}

  background(255);
  basket.update();
  basket.show();

  // update and show each fruit
  for (let i = 0; i < fruits.length; i++) {
    fruits[i].update();
    fruits[i].show();

    // check for collision with basket
    if (fruits[i].collides(basket)) {
      fruits.splice(i, 1);
      score += 10;
    }

    // check for off-screen fruits
    if (fruits[i].y > height) {
      fruits.splice(i, 1);
      lives--;
    }
  }

  // show score and lives
  textSize(24);
  fill(0);
  text("Score: " + score, 10, 30);
  text("Lives: " + lives, width - 100, 30);

  // game over check
  if (lives === 0) {
    textSize(48);
    text("Game Over", width / 2 - 125, height / 2 - 24);
    noLoop();
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    basket.dir = -1;
  } else if (keyCode === RIGHT_ARROW) {
    basket.dir = 1;
  }
}

function keyReleased() {
  if (keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) {
    basket.dir = 0;
  }
}

function addFruit() {
  let x = random(width - 25);
  let y = 0;
  let fruit = new Fruit(x, y, 25, 25);
  fruits.push(fruit);
}
