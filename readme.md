# Gatsby Source From Trello Board.

[![npm](https://img.shields.io/npm/dt/gatsby-source-trello.svg?style=flat-square)](https://www.npmjs.com/package/gatsby-source-trello)
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)
Source plugin for pulling data into Gatsby from Trello using `team`.

<p align="center">
	<img src="https://raw.githubusercontent.com/Necmttn/gatsby-source-trello/master/logo.png">
</p>

## Install
```
 npm install --save gatsby-source-trello
```

## How to use 
use organization `id` or `name` for fetch data from trello api. 

```
// In your  gatsby-config.js
plugins: [
  {
    resolve: 'gatsby-source-trello',
    options: {
      teamId: `your_team_id/name`,
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
