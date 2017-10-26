class App {
  constructor() {

  }

  static init() {
    fetch('http://localhost:3000/api/v1/users')
      .then(resp => resp.json())
      .then(json => this.displayStartMenu(json))
  }

  static generateStatRow(label, cells) {
    return `<div class='row-label cell'><p>${label}</p></div>
    <div class='cell'><p>${cells[0]}</p></div>
    <div class='cell'><p>${cells[1]}</p></div>
    <div class='cell'><p>${cells[2]}</p></div>`
  }

  static displayStartMenu(users) {
    const leaderboardDisplay = document.querySelector('.leaderboard-display')
    const rowLabels = document.querySelectorAll('.row')
    const labels = ["Leaderboard", "Top Score", "Most Snowmen", "Total Snowmen"]
    rowLabels[0].innerHTML += this.generateStatRow(labels[0], ['#1', '#2', '#3'])

    const topScorers = users.sort((a,b) => {
      if (a.top_score < b.top_score) {
        return 1
      } else if (a.top_score > b.top_score) {
        return -1
      } else {
        return 0
      }
    }).slice(0, 4).map(user => user.username)
    rowLabels[1].innerHTML += this.generateStatRow(labels[1], topScorers)

    const mostSnowmen = users.sort((a,b) => {
      if (a.most_snowmen < b.most_snowmen) {
        return 1
      } else if (a.most_snowmen > b.most_snowmen) {
        return -1
      } else {
        return 0
      }
    }).slice(0, 4).map(user => user.username)
    rowLabels[2].innerHTML += this.generateStatRow(labels[2], mostSnowmen)

    const totalSnowmen = users.sort((a,b) => {
      if (a.total_snowmen < b.total_snowmen) {
        return 1
      } else if (a.total_snowmen > b.total_snowmen) {
        return -1
      } else {
        return 0
      }
    }).slice(0, 4).map(user => user.username)
    rowLabels[3].innerHTML += this.generateStatRow(labels[3], totalSnowmen)


    const startDiv = document.querySelector('.start-button')
    const leaderboardRows = document.querySelectorAll('.row')
    startDiv.innerHTML = "<button>Start</button>"
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
