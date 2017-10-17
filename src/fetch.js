const request = require('request-promise-native')

class TrelloSource {
  constructor(key, secret) {
    if (typeof(key) !== 'string') console.error('key should be string')
    if (typeof(secret) !== 'string') console.error('secret should be string')
    this._key = key
    this._secret = secret
    this.TrelloBaseURL = 'https://api.trello.com/1'
  }

  async getBoards(id) {
    const url = `${this.TrelloBaseURL}/boards/${id}?fields=id,name&lists=open&list_fields=id,name&key=${this._key}&token=${this._secret}`
    try {
      console.log(url)
      const data = await request.get(url)
      return data
    } catch (err) {
      throw err
    }
  }

}



module.exports = {
  TrelloSource
}

