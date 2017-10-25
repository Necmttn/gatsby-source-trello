const { TrelloSource } = require('./fetch.js');
const crypto = require('crypto')

let _verbose;
let _apiKey;
let _secret;
let _teamId;

exports.sourceNodes = async (
  { boundActionCreators },
  {
    apiKey,
    secret,
    teamId,
    verboseOutput = false
  }
) => {
  const { createNode } = boundActionCreators;
  _verbose = verboseOutput;
  _apiKey = apiKey;
  _secret = secret;
  _teamId = teamId;
  try {
    const fetcher = new TrelloSource(_apiKey, _secret)
    const raw = await fetcher.getTeam(_teamId)
    const data = JSON.parse(raw)
    const boardIDs = data.idBoards

    const promiseArray = []

    boardIDs.map(async id => {
      promiseArray.push(fetcher.getBoards(id))
    })

    await Promise.all(promiseArray).then(async (boards) => {
      boards.map(rawBoard => {
        const board = JSON.parse(rawBoard)
        const cards = board.cards
        //  TODO: createNode for cards
        //  Create Connection with idList idBoard
        const lists = board.lists
        //  TODO: createNode for lists
        //  Create Connection with idBoard
        //  The Order should be Boards first.
        //  Then Lists.
        //  Then Cards.
        //
       const digest = crypto
         .createHash(`md5`)
         .update(JSON.stringify(board))
         .digest(`hex`)
       const node = Object.assign(
         board,
         {
           children: [],
           parent: `root`,
           internal: {
             type: `TrelloBoard`,
             contentDigest: digest,
           },
         },
       );
       createNode(node);
       console.log(node)
      })
    })
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
