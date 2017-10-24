$(document).ready(() => {

  document.addEventListener('keydown', function(e) {
    if (e.which === 37) {
      moveSkierLeft()
    }
  })

  document.addEventListener('keydown', function(e) {
    if (e.which === 39) {
      moveSkierRight()
    }
  })
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

function clearmove() {
    skier.src = "images/Skier.png";
}
