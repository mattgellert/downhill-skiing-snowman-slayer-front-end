class User {
  constructor(data) {
    this.id = data.id;
    this.username = data.username;
    this.top_score = data.top_score;
    this.most_snowmen = data.most_snowmen;
    this.total_snowmen = data.total_snowmen;
    this.game_count = data.game_count;
    User.all.push(this);
  }

  renderListItem() {
    return `
    <li>
      <h3>${this.username}
        <button data-id=${this.id}>edit</button>
      </h3>
    </li>`;
  }
}

User.all = [];
