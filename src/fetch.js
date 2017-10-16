const request = require('request-promise-native')







const TrelloApi = {
  boards: (id) => `${TrelloBaseURL}/boards/${id}?fields=id,name&lists=open&list_fields=id,name&key=${API_KEY}&token=${SECRET}`,
}


class TrelloSource {
  constructor(key, secret) {
    if (typeof(key) !== 'string') console.error('key should be string')
    if (typeof(secret) !== 'string') console.error('secret should be string')
    this._key = key
    this._secret = secret
    this.TrelloBaseURL = 'https://api.trello.com/1/'
  }

  async getLists(id) {
    const url = `${this.TrelloBaseURL}boards/${id}?fields=id,name&lists=open&list_fields=id,name&key=${this._key}&token=${this._secret}`
    const data = await request.get(url)
    return url
  }

  static async getBoards(id) {
    const res = await request.get(TrelloApi.boards(id))
    console.log(res)
  }
}



module.exports = {
  TrelloSource
}

