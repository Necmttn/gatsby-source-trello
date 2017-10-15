import { TrelloSource } from './index.js'

let _verbose
let _apiKey
let _secret
let _boardId

exports.sourceNodes = async (
  { boundActionCreators },
  // Options part.
  {
    apiKey,
    secret,
    boardId,
    verboseOutput = false
  }
) => {
  const { createNode } = boundActionCreators
  _verbose = verbose
  _apiKey = apiKey
  _secret = secret
  _boardId = boardId

  console.log(boardId)
  console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
  console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
  console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
  console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')

  // Create nodes here, generally by downloading data
  // from a remote API.

  const data = TrelloSource.getBoards(boardId)

  // Process data into nodes.
  // data.forEach(datum => createNode(processDatum(datum)))

  // We're done, return.
  return
}


