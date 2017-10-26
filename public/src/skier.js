class Skier extends Component {
  constructor(width, height, source, x, y, type, game) {
    super(width, height, source, x, y, type, game)
    this.snowballCheck = true;
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

  checkForSnowballThrow() {
    if (this.game.keys && this.game.keys[32] && this.snowballCheck === true) {

      let snowball = new Component(9, 15, "images/Snowball.png", this.x + 30, this.y + 20, "image", this);
      this.image.src = "images/ForwardThrow/SkierForwardThrow6.png";
      this.game.snowballs.push(snowball);

      this.snowballCheck = false;
      setTimeout(()=>{this.snowballCheck = true},this.game.snowballDelay)
  }
}

}
