const { TrelloSource } = require('./fetch.js');
const crypto = require('crypto');

let _verbose;
let _apiKey;
let _secret;
let _boards;

exports.sourceNodes = async ({ boundActionCreators },
// Options part.
{
  apiKey,
  secret,
  boards,
  verboseOutput = false
}) => {
  const { createNode } = boundActionCreators;
  _verbose = verboseOutput;
  _apiKey = apiKey;
  _secret = secret;
  _boards = boards;
  try {
    const fetcher = new TrelloSource(_apiKey, _secret);
    console.log('started');
    console.log(_boards);

    _boards.map(async board => {
      let data = await fetcher.getBoards(board.id);
      data = JSON.parse(data);
      const digest = crypto.createHash(`md5`).update(JSON.stringify(data)).digest(`hex`);
      const boardID = data.id;
      const boardName = data.name;
      const lists = data.lists;

      const node = {
        id: boardID,
        name: boardName,
        data: lists,
        children: [],
        parent: null,
        internal: {
          type: `TrelleBoard`,
          contentDigest: digest
        }
      };
      console.log(node);
      createNode(node);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};