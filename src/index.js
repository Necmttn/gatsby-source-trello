const request = require('request-promise-native')



const API_KEY = "9ef9dd82a4cfa9ab9f0987478a2c63a6"
const SECRET = "0b1d9a7dc1539b1050cfc1d9cf77c6c894e3c4c98666b4a062f9719f4eb397d5"



const TrelloBaseURL = 'https://api.trello.com/1/'

const TrelloApi = {
  boards: (id) => `${TrelloBaseURL}/boards/${id}?fields=id,name&lists=open&list_fields=id,name&key=${API_KEY}&token=${SECRET}`,
}


class TrelloSource {
  constructor(key, secret) {

  }
  static async getBoards(id) {
    const res = await request.get(TrelloApi.boards(id))
    console.log(res)
  }
}



module.export = {
  TrelloSource
}

