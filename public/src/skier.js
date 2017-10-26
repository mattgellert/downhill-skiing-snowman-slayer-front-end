class Skier extends Component {
  constructor(width, height, source, x, y, type, game) {
    super(width, height, source, x, y, type, game)
  }


  updateSkierDirection() {
    if (this.game.keys && this.game.keys[37]) {
      if (this.x > 0) {
        this.image.src = "images/LeftTurn/SkierTurnLeft3.png";
        this.x -= 2;
      };
    };
    if (this.game.keys && this.game.keys[39]) {
      if (this.x < (this.game.background.width - 40)){
        this.image.src = "images/RightTurn/SkierTurnRight3.png";
        this.x += 2;
      };
    };
    if (this.game.keys && this.game.keys[38]) {
      this.image.src = "images/SkierJump.png";
    };
  };

}
