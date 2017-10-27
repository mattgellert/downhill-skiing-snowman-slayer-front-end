class App {
  constructor() {

  }

  static init() {
    fetch('http://localhost:3000/api/v1/users')
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

  static generateStatRow2(label, cells) {
    let row = `<div class='row-label cell'><p>${label}</p></div>`
    for (let i = 0; i < cells.length; i++) {
      row += `<div class='cell'><p>${cells[i][0]}: ${cells[i][1]}</p></div>`
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
          startDiv.children[0].innerText = 'SAVED!'
          setTimeout(() => {
            location.reload(true)
          }, 2000)
        })
    })
  }

  static displayStartMenu(users) {
    const leaderboardDisplay = document.querySelector('.leaderboard-display')
    const rowLabels = document.querySelectorAll('.row')
    const labels = ["Leaderboard", "Top Score", "Most Snowmen", "Total Snowmen"]
    rowLabels[0].innerHTML += this.generateStatRow2(labels[0], ['#1', '#2', '#3'])

    const topScorers = users.sort((a,b) => {
      if (a.top_score < b.top_score) {
        return 1
      } else if (a.top_score > b.top_score) {
        return -1
      } else {
        return 0
      }
    }).slice(0, 3).map(user => [user.username, user.top_score])
    rowLabels[1].innerHTML += this.generateStatRow2(labels[1], topScorers)

    const mostSnowmen = users.sort((a,b) => {
      if (a.most_snowmen < b.most_snowmen) {
        return 1
      } else if (a.most_snowmen > b.most_snowmen) {
        return -1
      } else {
        return 0
      }
    }).slice(0, 3).map(user => [user.username, user.most_snowmen])
    rowLabels[2].innerHTML += this.generateStatRow2(labels[2], mostSnowmen)

    const totalSnowmen = users.sort((a,b) => {
      if (a.total_snowmen < b.total_snowmen) {
        return 1
      } else if (a.total_snowmen > b.total_snowmen) {
        return -1
      } else {
        return 0
      }
    }).slice(0, 3).map(user => [user.username, user.total_snowmen])
    rowLabels[3].innerHTML += this.generateStatRow2(labels[3], totalSnowmen)

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
