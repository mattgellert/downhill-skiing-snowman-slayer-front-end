let myBackground;
let mySkier;
let totalSnowmen = [];

function startGame() {
  myBackground = new Component(480, 270, "images/bg.png", 0, 0, "background");
  mySkier = new Component(40, 40, "images/Skier.png", 220, 210, "image")
  // snowball = new Component(9, 15, "images/Snowball.png", 0, 0, "image")
  // snowman = new Component(40, 60, "images/Snowman1.png", 220, 0, "image")
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
let snowballs = []
  function updateGameArea() {

    myGameArea.clear();
    // mySkier.x = 0
    if (myGameArea.keys && myGameArea.keys[37]) {
      if (mySkier.x > 0) {
        mySkier.image.src = "images/LeftTurn/SkierTurnLeft3.png"
        mySkier.x -= 2
      }
    }
    if (myGameArea.keys && myGameArea.keys[39]) {
      if (mySkier.x < (myBackground.width - 40)){
        mySkier.image.src = "images/RightTurn/SkierTurnRight3.png"
        mySkier.x += 2
      }
    }


    // if (myGameArea.keys && myGameArea.keys[32]) {
      // let snowball = new Component(9, 15, "images/Snowball.png", mySkier.x + 35, mySkier.y + 20, "image")
      // mySkier.image.src = "images/ForwardThrow/SkierForwardThrow6.png"
      // snowballs.push(snowball)
    // }

    myBackground.speedY = 1;
    myBackground.newPos();
    myBackground.update();
    mySkier.newPos()
    mySkier.update()

    snowballs.forEach(snowball => {
      // snowball.speedY = -5
      snowball.y -= 5
      snowball.update()
    })

    let newSnowmen = snowmanController(1.07)
    totalSnowmen = [...totalSnowmen, ...newSnowmen]
    totalSnowmen = totalSnowmen.filter(snowman => {
      snowman.speedY = 1;
      snowman.newPos()
      snowman.update()

      snowballs = snowballs.filter(snowball => {
        if (snowball.x >= snowman.x && snowball.x <= snowman.x + snowman.width && snowman.y + 50 === snowball.y) {
          snowman.image.src = "images/SnowmanDeath2.png" //replace with skier dying
          return false
        }
        if (snowball.y < 0) {
          return false
        } else {
          return true
        }
      })

      if (mySkier.x >= snowman.x && mySkier.x <= snowman.x + snowman.width && snowman.y + 50 === mySkier.y) {
        snowman.image.src = "images/SnowmanDeath2.png" //replace with skier dying
      }

      if (snowman.y > myBackground.height) {
        return false
      } else {
        return true
      }

    })
    snowballTimer++
  }

  function snowmanController(difficulty) {
    let num = Math.floor(Math.random() * difficulty)
    let newSnowmen = []
    for (var i = 0; i < num; i++) {
      newSnowmen.push(new Component(40, 60, "images/Snowman1.png", Math.floor(Math.random() * myBackground.width), 0, "image"))
    }
    return newSnowmen
  }

  function clearmove() {
      mySkier.image.src = "images/Skier.png";
      // mySkier.speedX = 0;
      // mySkier.speedY = 0;
  }

  let snowballTimer = 20
  $(document).ready(() => {

    document.addEventListener('keydown', function(e) {
      e.preventDefault()
      if (e.which === 32) {
        if (snowballTimer > 20) {
          let snowball = new Component(9, 15, "images/Snowball.png", mySkier.x + 35, mySkier.y + 20, "image")
          mySkier.image.src = "images/ForwardThrow/SkierForwardThrow6.png"
          snowballs.push(snowball)
          snowballTimer = 0
        }
      } else {
        myGameArea.keys = (myGameArea.keys || [])
        myGameArea.keys[e.keyCode] = (e.type == 'keydown')
      }
    })

    document.addEventListener('keyup', function(e) {
      if (e.which !== 32) {
        myGameArea.keys[e.keyCode] = (e.type == 'keydown')
        clearmove()
      }
    })

    startGame()
  });
