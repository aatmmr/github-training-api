# GraphQL Limits

The GitHub GraphQL API has some limits to prevent abuse. These limits are subject to change.

## Queries

GraphQL quueries come at a cost (non-valuta) which are defined in [docs](https://docs.github.com/en/graphql/overview/rate-limits-and-node-limits-for-the-graphql-api#calculating-a-rate-limit-score-before-running-the-call) in detail. The description below is ment as a brief summary.

### Get Rate Limit

The following query returns the rate limit information. The limitation is defined as

- `limit`: max points/h the token can consume
- `cost`: the query points
- `remaining`: remaining points/h
- `resetAt`: moment when the limit gets restored

```graphql
query {
  viewer {
    login
  }
  rateLimit {
    limit
    cost
    remaining
    resetAt
  }
}
```

### Query Cost Estimation and Calculation

The following query requires _1,051 requests_ to fulfill:

- Request of repositories is `1` event though 50 are requested as we get it from `viewer` object at once.
- The requested 20 pull requests are from 50 separate repositories, so `50` requests are made.
- The requested 10 comments are from 1,000 potential total pull requests, so `1,000` requests are made.

The queries from above can be calculated as follows:

**Number of Nodes**

50 repos + 50 _ 20 pull requests + 50 _ 20 \* 10 comments = 11050 Nodes

**Query Cost**

1 + 50 + 50 \* 20 = 1051 Queries

**Query Points**

Dividing 1051 by 100 gives final score of 11.

```graphql
query {
  viewer {
    repositories(first: 50) {
      edges {
        repository: node {
          name
          pullRequests(first: 20) {
            edges {
              pullRequest: node {
                title
                comments(first: 10) {
                  edges {
                    comment: node {
                      bodyHTML
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
```

### Get Point Value of Query

The query cost can received by using the `rateLimit` query. The `cost` field returns the cost of the query. Append the `rateLimit` to the query from above as in the example below. The result is a actual cost of `10`.

```graphql
query {
  viewer {
    repositories(first: 50) {
      edges {
        repository: node {
          name
          pullRequests(first: 20) {
            edges {
              pullRequest: node {
                title
                comments(first: 10) {
                  edges {
                    comment: node {
                      bodyHTML
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  rateLimit {
    cost
  }
}
```
