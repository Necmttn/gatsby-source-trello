const { TrelloSource } = require('./fetch.js');
const crypto = require('crypto')

let _verbose;
let _apiKey;
let _secret;
let _boards;

exports.sourceNodes = async (
  { boundActionCreators },
  {
    apiKey,
    secret,
    boards,
    verboseOutput = false
  },
) => {
  const { createNode } = boundActionCreators;
  _verbose = verboseOutput;
  _apiKey = apiKey;
  _secret = secret;
  _boards = boards;
  try {
    const fetcher = new TrelloSource(_apiKey, _secret);
    const NewNodes = [] // initiliaze empty array for nodes.
    _boards.map(async board => {
      const raw = await fetcher.getBoards(board.id);
      const data = JSON.parse(raw)
      const boardID = data.id
      const boardName = data.name
      const lists = data.lists
      const cards = data.cards
      lists.map( list => {
        const digest = crypto
          .createHash(`md5`)
          .update(JSON.stringify(list))
          .digest(`hex`)
        const node = Object.assign(
          list,
          {
            id: boardID,
            children: [],
            parent: `root`,
            internal: {
              type: `TrelloList`,
              contentDigest: digest,
            },
          },
        );
        NewNodes.push(node)
      })
      cards.map( card => {
        const digest = crypto
          .createHash(`md5`)
          .update(JSON.stringify(card))
          .digest(`hex`)
        const node = Object.assign(
          card,
          {
            id: boardID,
            children: [],
            parent: `root`,
            internal: {
              type: `TrelloCard`,
              content: 'neco',
              contentDigest: digest,
            },
          },
        );
        NewNodes.push(node)
      })
    }) // boards map ends here.
    NewNodes.map(node => createNode(node))
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

