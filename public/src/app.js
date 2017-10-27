class App {
  constructor() {

  }

  static init() {
    fetch('http://localhost:3000/api/v1/leaderboard')
      .then(resp => resp.json())
      .then(json => this.displayStartMenu(json))
  }

  static generateStatRow(label, cells) {
    let row = `<div class='row-label cell'><p>${label}</p></div>`
    for (let i = 0; i < cells.length; i++) {
      row += `<div class='cell'><p>${cells[i]}</p></div>`
    }
    return row
  }

  static generateStatRow2(label, cells, attribute) {
    let row = `<div class='row-label cell'><p>${label}</p></div>`
    for (let i = 0; i < cells.length; i++) {
      if (attribute === 'leaderboard') {
        row += `<div class='cell'><p>${cells[i][0]}: ${cells[i][1]}</p></div>`
      } else {
        row += `<div class='cell'><p>${cells[i].username}: ${cells[i][attribute]}</p></div>`
      }
    }
    return row
  }

  static displayEndMenu(timeScore, snowmenScore) {

    const leaderboardDisplay = document.querySelector('.leaderboard-display')
    const rowLabels = document.querySelectorAll('.row')
    const labels = [" ", "Time Score", "Total Snowmen", "Total Score"]

    rowLabels[0].innerHTML += this.generateStatRow(labels[0], ["Game Stats"])
    rowLabels[1].innerHTML += this.generateStatRow(labels[1], [timeScore])
    rowLabels[2].innerHTML += this.generateStatRow(labels[2], [`${snowmenScore} Slayed x 100`])
    rowLabels[3].innerHTML += this.generateStatRow(labels[3], [`${timeScore + snowmenScore * 100}`])

    const headerImage = document.querySelector('.header-image')
    headerImage.src = "images/game_over.png"

    const startDiv = document.querySelector('.start-button')



    const userInput = `
    <form>
      <input type="text" class="username" id="username" placeholder='Enter your username'>
      <button type='submit'>Save</button>
    </form>`
    startDiv.innerHTML += userInput
    document.querySelector('canvas').style.zIndex = "-1";
    document.querySelector('.leaderboard-display-wrapper').style.marginTop = "80px";

    startDiv.children[0].addEventListener('submit', (e) => {
      e.preventDefault()

      const username = document.getElementById('username').value
      const totalScore = timeScore + snowmenScore * 100
      const data = JSON.stringify({
        'username': username,
        'total_score': totalScore,
        'snowmen_score': snowmenScore
      })

      fetch('http://localhost:3000/api/v1/update', {
        method: 'post',
        headers: {
          'content-type': 'application/json'
        },
        body: data
      }).then(resp => resp.json())
        .then(json => {
          const userRank = `
          <p>Top Score Rank: #${json.top_score_rank} || Most Snowmen Rank: #${json.most_snowmen_rank} || Total Snowmen Rank: #${json.total_snowmen_rank}</p>`;
          startDiv.innerHTML += userRank;
          startDiv.children[0].innerText = 'SAVED!'
          setTimeout(() => {
            location.reload(true)
          }, 2500)
        })
    })
  }

  static playMainSound(path) {
    const audio = new Audio(`assets/audio/${path}`)
    audio.play()
  }

  static playSound(path) {
    const audio = new Audio(`assets/audio/${path}`)
    audio.play()
    setTimeout(()=>{audio.pause()},250)
  }

  static displayStartMenu(users) {
    this.playMainSound('05-Binrpilot-Underground.mp3')
    const leaderboardDisplay = document.querySelector('.leaderboard-display')
    const rowLabels = document.querySelectorAll('.row')
    const labels = ["Leaderboard", "Top Score", "Most Snowmen", "Total Snowmen"]
    rowLabels[0].innerHTML += this.generateStatRow2(labels[0], ['#1', '#2', '#3'], 'leaderboard')
    rowLabels[1].innerHTML += this.generateStatRow2(labels[1], users.top_scorers, 'top_score')
    rowLabels[2].innerHTML += this.generateStatRow2(labels[2], users.top_slayers, 'most_snowmen')
    rowLabels[3].innerHTML += this.generateStatRow2(labels[3], users.genocidal_maniacs, 'total_snowmen')

    this.removeMenu();
  }

  static removeMenu() {
    const startDiv = document.querySelector('.start-button')
    startDiv.innerHTML += "<button>New Game</button>"
    const leaderboardRows = document.querySelectorAll('.row')
    startDiv.children[0].addEventListener('click', (e) => {
      e.preventDefault()
      startDiv.innerHTML = ''
      leaderboardRows.forEach(row => {row.innerHTML = ''})
      startDiv.innerHTML = ''
      this.startGame();
    })
  }

  static startGame() {
    this.game = new Game()
    this.game.start()
  }
}
