class Component {
  constructor(width, height, source, x, y, type) {
    this.type = type;
    if (type === "image" || type === "background") {
      this.image = new Image();
      this.image.src = source;
    }
    if (type === "text") {
      this.source = source
    }
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
  };

  update(myGameArea) {
    let ctx = myGameArea.context;
    if (this.type == "image" || this.type == "background") {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
      if (this.type == "background") {
        ctx.drawImage(this.image, this.x, this.y - this.height, this.width, this.height);
      }
      } else {
        ctx.fillStyle = this.source;
        ctx.fillRect(this.x, this.y, this.width, this.height);
      }
      if (this.type == "text") {
        ctx.font = this.width + " " + this.height;
        ctx.fillStyle = this.source;
        ctx.fillText(this.text, this.x, this.y);
      }
  };

  newPos() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.type == "background") {
      if (this.y == this.height) {
        this.y = 0;
      };
    };
  };

  detectCollisions(snowmen, mySkier, myGameArea, snowballs, snowmenHit) {
    console.log(snowmen.length)
    snowmen = snowmen.filter(snowman => {
      snowman.speedY = 1;
      snowman.newPos()
      snowman.update(myGameArea)

      snowman.snowballCollision(snowballs, snowmenHit)
      mySkier.skierCollision(snowman, "snowman", snowmenHit);

      snowman.y > this.height ? false : true
    })
  };

  snowballCollision(snowballs, snowmenHit) {
    snowballs = snowballs.filter(snowball => {

      let withinY = (snowball.y <= (this.y + this.height) && snowball.y >= this.y)
      let upperLeftwithinX = (snowball.x >= this.x && snowball.x <= (this.x + this.width))
      let upperRightwithinX = (snowball.x + snowball.width) >= this.x && (snowball.x + snowball.width) <= (this.x + this.width)

      if (withinY && (upperLeftwithinX || upperRightwithinX)) {
        this.image.src = "images/SnowmanDeath2.png"
        setTimeout(function(){
          this.height = 0
          this.width = 0
        }.bind(this), 200)
        snowmenHit++
        return false
      }
      if (snowball.y < 0) {
        return false
      } else {
        return true
      }
    });
  };

  skierCollision(component, type) {
    let withinY = (this.y <= (component.y + component.height) && this.y >= component.y)
    let upperLeftwithinX = (this.x >= component.x && this.x <= (component.x + component.width))
    let upperRightwithinX = (this.x + this.width) >= component.x && (this.x + this.width) <= (component.x + component.width)

    if (this.x >= component.x && this.x <= (component.x + component.width) && (component.y + 50) === this.y) {
      if (type === "snowman") {
        endGame();
      } else if (type === "tree") {
        // ADD TREE LOGIC
      }
    }
  };
};
