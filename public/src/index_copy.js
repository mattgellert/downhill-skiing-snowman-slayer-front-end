$(document).ready(() => {
  let app = new App
  app.gameArea.interval = setInterval(app.updateGameArea(), 10);
  const startForm = document.querySelector('form#start')
  const startButton = document.createElement('input')
  startButton.type = "submit"
  startButton.value = "New Game"
  startForm.appendChild(startButton)
  startForm.addEventListener('submit', function(e) {
    e.preventDefault()
    startForm.removeChild(startButton)
    app.startGame();
  })


});
