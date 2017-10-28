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
        const lists = board.lists
        const boardDigest = crypto
         .createHash(`md5`)
         .update(JSON.stringify(board))
         .digest(`hex`)
        const boardNode = Object.assign(
          board,
          {
            children: [],
            parent: `root`,
            internal: {
              type: `TrelloBoard`,
              contentDigest: boardDigest,
            },
          },
        );
        // Create Node for each list
        lists.map(list => {
          const childCards =  cards.filter( card=> {
            return card.idList === list.id
          }).map(card => {
            return card.id
          })
          const listDigest = crypto
            .createHash(`md5`)
            .update(JSON.stringify(list))
            .digest(`hex`)
          const listNode = Object.assign(
            list,
            {
              children: childCards,
              parent: list.idBoard,
              internal: {
                type: `TrelloList`,
                contentDigest: listDigest,
              },
            },
          );
          boardNode.children = boardNode.children.concat([listNode.id])
          createNode(listNode);
        })
        // Create Node for each Card
        cards.map(card => {
          const cardDigest = crypto.createHash(`md5`).update(JSON.stringify(card)).digest(`hex`);
          const cardNode = Object.assign(card, {
            children: [],
            parent: card.idList,
            internal: {
              content: card.desc,
              mediaType: `text/markdown`,
              type: `TrelloCard`,
              contentDigest: cardDigest
            }
          });
          createNode(cardNode)
        }); //cards map.
        createNode(boardNode);
      })
    })
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
