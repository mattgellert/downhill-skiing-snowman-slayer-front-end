class App {
  constructor() {

  }

  static init() {
    const startForm = document.querySelector('form#start')
    startForm.innerHTML = "<input type='submit' value='New Game'></input>"
    startForm.addEventListener('submit', (e) => {
      e.preventDefault()
      startForm.innerHTML = ''
      this.startGame();
    })
  }

  static startGame() {
    this.game = new Game()
    this.game.start()
  }
}


class Game {
  constructor() {
    this.canvas = document.createElement("canvas")
    this.canvas.width = 480;
    this.canvas.height = 540;
    this.context = this.canvas.getContext("2d");


    this.updateGameArea = this.updateGameArea.bind(this)
  }

  start() {
    document.body.insertBefore(this.canvas, document.body.childNodes[0])
    this.frameNo = 0;
    this.background = new Component(480, 540, "images/bg.png", 0, 0, "background", this);
    this.skier = new Skier(40, 40, "images/Skier.png", 220, 480, "image", this);
    this.score = new Component("20px", "Consolas", "blue", 340, 40, "text", this);
    this.snowmenScore = new Component("20px", "Consolas", "blue", 340, 80, "text", this);
    this.interval = setInterval(this.updateGameArea, 5)
    this.snowmen = [];
    this.snowballs = [];
    this.snowmenHit = 0;
    this.snowballTimer = 14;

    this.addKeyPressListeners();
  }

  clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  stop() {
    clearInterval(this.interval);
  }

  updateGameArea() {
    this.frameNo++
    this.clear()

    this.skier.updateSkierDirection();

    this.background.speedY = 1;
    this.background.newPos();
    this.background.update();
    this.skier.newPos();
    this.skier.update();

    this.snowballs.forEach(snowball => {
      snowball.y -= 5
      snowball.update()
    })

    let newSnowmen = this.snowmanCreator(1.05)
    this.snowmen = [...this.snowmen, ...newSnowmen]

    this.detectCollisions(this.snowmen)

    this.score.text="SCORE: " + this.frameNo;
    this.score.update();

    this.snowmenScore.text="Snowmen: " + this.snowmenHit;
    this.snowmenScore.update()

    this.snowballTimer++;
  }

  addKeyPressListeners() {
    document.addEventListener('keydown', (e) => {
      e.preventDefault();
      if (e.which === 32) {
        if (this.snowballTimer > 14) {
          let snowball = new Component(9, 15, "images/Snowball.png", this.skier.x + 30, this.skier.y + 20, "image", this);
          this.skier.image.src = "images/ForwardThrow/SkierForwardThrow6.png";
          this.snowballs.push(snowball);
          this.snowballTimer = 0;
        }
      } else {
        this.keys = (this.keys || []);
        this.keys[e.keyCode] = (e.type === 'keydown');

      }
    });

    document.addEventListener('keyup', (e) => {
      if (e.which !== 32) {
        this.keys[e.keyCode] = (e.type === 'keydown');
        this.clearMove();
      }
    });
  }

  clearMove() {
    this.skier.image.src = "images/Skier.png";
  }

  snowmanCreator(difficulty) {
    let num = Math.floor(Math.random() * difficulty);
    let newSnowmen = [];
    for (var i = 0; i < num; i++) {
      newSnowmen.push(new Component(40, 60, "images/Snowman1.png", Math.floor(Math.random() * this.background.width), -10, "image", this));
    }
    return newSnowmen;
  }

  detectCollisions(snowmen) {
    snowmen = snowmen.filter(snowman => {
      snowman.speedY = 1;
      snowman.newPos()
      snowman.update()

      this.detectSnowballCollision(snowman)
      this.detectSkierCollision(snowman, "snowman");

      // snowman.y > this.background.height ? false : true
      if (snowman.y > this.background.height) {
        // snowman = null
        return false
      } else {
        return true
      }
    })
  }

  detectSnowballCollision(snowman) {
    this.snowballs = this.snowballs.filter(snowball => {

      let withinY = (snowball.y <= (snowman.y + snowman.height) && snowball.y >= snowman.y)
      let upperLeftwithinX = (snowball.x >= snowman.x && snowball.x <= (snowman.x + snowman.width))
      let upperRightwithinX = (snowball.x + snowball.width) >= snowman.x && (snowball.x + snowball.width) <= (snowman.x + snowman.width)

      if (withinY && (upperLeftwithinX || upperRightwithinX)) {
        snowman.image.src = "images/SnowmanDeath2.png"
        setTimeout(function(){
          snowman.height = 0
          snowman.width = 0
        }, 200)
        this.snowmenHit++
        return false
      }
      if (snowball.y < 0) {
        // snowball = null
        return false
      } else {
        return true
      }
    });
  }

  detectSkierCollision(component, type) {
    let withinY = ((this.skier.y + 12) <= (component.y + component.height) && (this.skier.y + 12) >= component.y)
    let upperLeftwithinX = ((this.skier.x + 14) >= component.x && (this.skier.x + 14) <= (component.x + component.width))
    let upperRightwithinX = (this.skier.x + this.skier.width - 14) >= component.x && (this.skier.x + this.skier.width - 14) <= (component.x + component.width)

    if (withinY && (upperLeftwithinX || upperRightwithinX)) {
      if (type === "snowman") {
        this.endGame();
      } else if (type === "tree") {
        // ADD TREE LOGIC
      }
    }
  }

  endGame() {
    this.stop();
    // const startForm = document.querySelector('form#start')
    // const startButton = document.createElement('input')
    // startButton.type = "submit"
    // startButton.value = "New Game"
    document.body.removeChild(document.querySelector('canvas'))
    this.displayScore();
    setTimeout(() => {
      location.reload(true)
    }, )

    // App.init();
    // setTimeout(() => {
    //   document.body.removeChild(document.querySelector('canvas'))
    //   this.resetGameComponents();
    //   this.displayScore();
    //   App.init();
    // }, 1000);
  };

  displayScore() {
    console.log("user score:",parseInt(this.score.text.slice(7)))
  }
}
