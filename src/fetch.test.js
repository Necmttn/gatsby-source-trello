const { TrelloSource } = require('./fetch.js')


const API_KEY = "9ef9dd82a4cfa9ab9f0987478a2c63a6"
const SECRET = "0b1d9a7dc1539b1050cfc1d9cf77c6c894e3c4c98666b4a062f9719f4eb397d5"

describe('Genereal Type Checkings', () => {
  test('type of Class should be function', () => {
    console.log(TrelloSource)
    expect(typeof(TrelloSource)).toBe('function')
  })

  test('return something', () => {
    const fetcher = new TrelloSource(API_KEY, SECRET)

    const list = fetcher.getBoards('PP')
    console.log('list', list)
  })

  test('return data', async () => {
    const fetcher = new TrelloSource(API_KEY, SECRET)

    const list = await fetcher.getBoards('u1Rg4E5s')
    expect(data).toBe('something')
  })
})
