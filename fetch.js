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
    const url = `${this.TrelloBaseURL}/boards/${id}?fields=id,name&lists=open&list_fields=id,name&cards=open&key=${this._key}&token=${this._secret}`;
    const data = await request.get(url);
    return data;
  }

}

module.exports = {
  TrelloSource
};