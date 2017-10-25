class App {

  constructor() {
    this.gameArea = {
      canvas : document.createElement("canvas"),
      start : function() {
        this.canvas.width = 480;
        this.canvas.height = 540;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        // this.interval = setInterval(App.updateGameArea(), 10);
      }.bind(this),
      clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      }.bind(this),
      stop : function() {
        clearInterval(this.interval);
      }.bind(this)
    };
    this.background = new Component(480, 540, "images/bg.png", 0, 0, "background");
    this.skier = new Component(40, 40, "images/Skier.png", 220, 480, "image");
    this.score = new Component("20px", "Consolas", "blue", 340, 40, "text");
    this.snowmenScore = new Component("20px", "Consolas", "blue", 340, 80, "text");

    function updateSkierDirection() {
      if (myGameArea.keys && myGameArea.keys[37]) {
        if (mySkier.x > 0) {
          mySkier.image.src = "images/LeftTurn/SkierTurnLeft3.png";
          mySkier.x -= 2;
        };
      };
      if (myGameArea.keys && myGameArea.keys[39]) {
        if (mySkier.x < (this.background.width - 40)){
          mySkier.image.src = "images/RightTurn/SkierTurnRight3.png";
          mySkier.x += 2;
        };
      };
    };

    let snowmen = [];
    let snowballs = [];
    let snowmenHit = 0;


    function snowmanCreator(difficulty) {
      let num = Math.floor(Math.random() * difficulty);
      let newSnowmen = [];
      for (var i = 0; i < num; i++) {
        newSnowmen.push(new Component(40, 60, "images/Snowman1.png", Math.floor(Math.random() * this.background.width), 0, "image"));
      }
      return newSnowmen;
    };

    let snowballTimer = 14;
    document.addEventListener('keydown', function(e) {
      e.preventDefault();
      if (e.which === 32) {
        if (snowballTimer > 14) {
          let snowball = new Component(9, 15, "images/Snowball.png", mySkier.x + 30, mySkier.y + 20, "image");
          mySkier.image.src = "images/ForwardThrow/SkierForwardThrow6.png";
          snowballs.push(snowball);
          snowballTimer = 0;
        }
      } else {
        myGameArea.keys = (myGameArea.keys || []);
        myGameArea.keys[e.keyCode] = (e.type == 'keydown');
      }
    });

    document.addEventListener('keyup', function(e) {
      if (e.which !== 32) {
        myGameArea.keys[e.keyCode] = (e.type == 'keydown');
        clearmove();
      }
    });

    function clearmove() {
        mySkier.image.src = "images/Skier.png";
    };

    function endGame() {
      myGameArea.stop();
      setTimeout(function() {
        document.body.removeChild(document.querySelector('canvas'))
        // postScore();
        resetGameComponents();
        displayScore();
        startForm.appendChild(startButton)
      }, 1000);
    };

    function resetGameComponents() {
      snowmen = [];
      snowballs = [];
      snowmenHit = 0;
    };

    function displayScore() {
      console.log("user score:",parseInt(myScore.text.slice(7)))
    }

  };

  // displayMenu() {
  //
  // }
  //
  startGame() {
    this.gameArea.start();
  };
  //
  // createGameArea() {
  //
  // };
  //
  updateGameArea() {
    this.gameArea.frameNo++
    this.gameArea.clear();

    updateSkierDirection();

    this.background.speedY = 1;
    this.background.newPos();
    this.background.update(myGameArea);
    mySkier.newPos()
    mySkier.update(myGameArea)

    snowballs.forEach(snowball => {
      snowball.y -= 5
      snowball.update(myGameArea)
    })

    let newSnowmen = snowmanCreator(1.05)
    snowmen = [...snowmen, ...newSnowmen]

    this.background.detectCollisions(snowmen, mySkier, myGameArea, snowballs, snowmenHit);

    myScore.text="SCORE: " + myGameArea.frameNo;
    myScore.update(myGameArea);

    mySnowmenScore.text="Snowmen: " + snowmenHit;
    mySnowmenScore.update(myGameArea)

    snowballTimer++;
  };
  //
  // endGame() {
  //
  // };
  //
  // resetGame() {
  //
  // };
  //
  // displayScore() {
  //
  // };
};
