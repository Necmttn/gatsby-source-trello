const request = require('request-promise-native');

class TrelloSource {
  constructor(key, secret) {
    if (typeof key !== 'string') console.error(`key should be string given is ${key}, type ${typeof key}`);
    if (typeof secret !== 'string') console.error(`secret should be string given is ${key}, type ${typeof key}`);
    this._key = key;
    this._secret = secret;
    this.TrelloBaseURL = 'https://api.trello.com/1';
  }

  async getBoards(id) {
    const url = `${this.TrelloBaseURL}/boards/${id}?fields=all&lists=all&cards=all&customFields=true&card_customFieldItems=true&key=${this._key}&token=${this._secret}`;
    const data = await request.get(url);
    return data;
  }

  async getTeam(id) {
    const url = `${this.TrelloBaseURL}/organizations/${id}?fields=all&key=${this._key}&token=${this._secret}`;
    const data = await request.get(url);
    return data;
  }

}

module.exports = {
  TrelloSource
};