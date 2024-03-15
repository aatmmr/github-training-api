# GraphQL Limits

The GitHub GraphQL API has some limits to prevent abuse. These limits are subject to change.

## Queries

GraphQL queries come at a cost (non-valuta) which are defined in [docs](https://docs.github.com/en/graphql/overview/rate-limits-and-node-limits-for-the-graphql-api#calculating-a-rate-limit-score-before-running-the-call) in detail. The description below is ment as a brief summary.

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

#### Query

The subsequent calculation is based on the following query:

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

The query requires _1,051 requests_ to fulfill:

- Request of repositories is `1` event though 50 are requested as we get it from `viewer` object at once.
- The requested 20 pull requests are from 50 separate repositories, so `50` requests are made.
- The requested 10 comments are from 1,000 potential total pull requests, so `1,000` requests are made.

The queries from above can be calculated as follows:

**Number of Nodes**

| Query         | Nodes          | Sum       |
| ------------- | -------------- | --------- |
| Repositories  | 50             | 50        |
| Pull Requests | 50 \* 20       | 1000      |
| Comments      | 50 \* 20 \* 10 | 10000     |
| **Total**     |                | **11050** |

**Query Cost**

| Query                            | Queries  | Sum      |
| -------------------------------- | -------- | -------- |
| Repositories via `viewer`        | 1        | 1        |
| Pull Requests from 50 repos      | 50       | 50       |
| Comments from 20 PRs of 50 repos | 50 \* 20 | 1000     |
| **Total**                        |          | **1051** |

**Query Points**

Dividing the sum of the queries of 1051 by 100 gives final score of approximately 11.

### Get Point Value of Query

The query cost can received by using the `rateLimit` query. The `cost` field returns the cost of the query. Append the `rateLimit` to the query from above as shown below. The returned result is a actual cost of `10`.

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
