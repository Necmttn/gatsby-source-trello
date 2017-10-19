const { crelloSource } = require('./fetch.js')


const API_KEY = "9ef9dd82a4cfa9ab9f0987478a2c63a6"
const SECRET = "0b1d9a7dc1539b1050cfc1d9cf77c6c894e3c4c98666b4a062f9719f4eb397d5"

describe('Genereal Type Checkings', () => {
  test('type of Class should be function', () => {
    expect(typeof(TrelloSource)).toBe('function')
  })

  test('return data', async () => {
    const fetcher = new TrelloSource(API_KEY, SECRET)
    const list = await fetcher.getBoards('571680f0c1a563f82af4b31f')
    expect(list).toBe('something')
  })
})
