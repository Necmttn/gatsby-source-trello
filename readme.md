## [WIP] Gatsby Source From Trello Board.
  Source plugin for pulling data into Gatsby from Trello using `team`.

## Install
```
 npm install --save gatsby-plugin-netlify
```

## How to use 
use organization `id` or `name` for fetch data from trello api. 

```
// In your  gatsby-config.js
plugins: [
  {
    resolve: 'gatsby-source-trello',
    options: {
      teamId: 'your_team_id/name',
      apiKey: `your_trello_access_token`,
      secret: `your_trello_secret`
    }
  },
]
```

## How to query
it's creates 3 different nodes `TrelloBoard` , `TrelloList`, `TrelloCard` 

#### Querying all boards
 
```
{
  allTrelloBoard {
    edges {
      node {
        id
        name
      }
    }
  }
}
```

#### Querying all lists
```
{
  allTrelloList {
    edges {
      node {
        id
        name
      }
    }
  }
}
```

#### Querying all cards 
```
{
  allTrelloCard {
    edges {
      node {
        id
        name
      }
    }
  }
}
```
