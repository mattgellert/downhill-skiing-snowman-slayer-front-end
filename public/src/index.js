let myBackground;
let mySkier;

function startGame() {
  myBackground = new Component(656, 270, "images/bg.png", 0, 0, "background");
  mySkier = new Component(40, 40, "images/Skier.png", 220, 210, "image")
  myGameArea.start();

}


let myGameArea = {
  canvas : document.createElement("canvas"),
  start : function() {
    this.canvas.width = 480;
    this.canvas.height = 270;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.frameNo = 0;
    this.interval = setInterval(updateGameArea, 20);
  },
  clear : function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  stop : function() {
    clearInterval(this.interval);
  }
}

function Component(width, height, source, x, y, type) {
  this.type = type;
  if (type == "image" || type == "background") {
    this.image = new Image();
    this.image.src = source;
  }
  this.width = width;
  this.height = height;
  this.speedX = 0;
  this.speedY = 0;
  this.x = x;
  this.y = y;
  this.update = function() {
    ctx = myGameArea.context;
    if (type == "image" || type == "background") {
      ctx.drawImage(this.image,
        this.x,
        this.y,
        this.width, this.height);
        if (type == "background") {
          ctx.drawImage(this.image,
              this.x,
              this.y - this.height,
              this.width, this.height);

        }
      } else {
        ctx.fillStyle = source;
        ctx.fillRect(this.x, this.y, this.width, this.height);
      }
    }
    this.newPos = function() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.type == "background") {
        if (this.y == this.height) {
          this.y = 0;
        }
      }
    }
  }

  function updateGameArea() {
    myGameArea.clear();
    myBackground.speedY = 1;
    myBackground.newPos();
    myBackground.update();
    mySkier.newPos()
    mySkier.update()
  }

  function move(dir) {
      mySkier.image.src = "images/Skier.png";
      // if (dir == "up") {mySkier.speedY = -1; }
      // if (dir == "down") {mySkier.speedY = 1; }
      if (dir == "left") {mySkier.speedX = -1; }
      if (dir == "right") {mySkier.speedX = 1; }
  }

  function clearmove() {
      mySkier.image.src = "smiley.gif";
      mySkier.speedX = 0;
      mySkier.speedY = 0;
  }


  $(document).ready(() => {

    document.addEventListener('keydown', function(e) {
      if (e.which === 37) {
        move("left")
      } else {
        clearmove()
      }
    })

    document.addEventListener('keydown', function(e) {
      while (e.which === 39) {
        move("right")
      } else {
        clearmove()
    })

    startGame()
  });

  function moveSkierLeft() {
    var leftNumbers = skier.style.left.replace('px', '')
    var left = parseInt(leftNumbers, 10)

    if (left > 0) {
      skier.style.left = `${left - 10}px`
      skier.src = "images/LeftTurn/SkierTurnLeft3.png";
    }


  }

  function moveSkierRight() {
    var rightNumbers = skier.style.left.replace('px', '')
    var right = parseInt(rightNumbers, 10)

    if (right < 760) {
      skier.style.left = `${right + 10}px`
    }
  }
