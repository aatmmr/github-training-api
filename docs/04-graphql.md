# Query with GraphQL

## Docs

- [Public Scheme for Download](https://docs.github.com/en/graphql/overview/public-schema)
- [GraphQL Documentation](https://docs.github.com/en/graphql)
- [GraphQL Explorer](https://docs.github.com/en/graphql/overview/explorer)

## Queries (Get Data)

### Simple Query

```graphql
query {
  viewer {
    login
    bio
  }
}
```

### Paginated Query

Repository information is a paginated list. You can use `first` and `after` to fetch more data, i.e. `repositories(first: 3)`.

#### Organization

```graphql
query {
  organization(login: "xpirit-training") {
    repositories(first: 3) {
      nodes {
        id
        name
        description
      }
    }
  }
}
```

#### User

Query repositories of a user. Change `organisation` with `user` and `login` with the username.

```graphql
query {
  user(login: "aatmmr") {
    repositories(first: 3) {
      nodes {
        id
        name
        description
      }
    }
  }
}
```

Fetch more data you are interested in. For example, you can add `url` and `createdAt` to the query.

```graphql
query {
  user(login: "aatmmr") {
    repositories(first: 20) {
      nodes {
        id
        name
        description
        url
        createdAt
      }
    }
  }
}
```

### Simplify with Variables

Define variable in `query` and is use it in desired place, e.g. `login`.

```graphql
query ($org: String!) {
  user(login: $org) {
    repositories(first: 20) {
      nodes {
        name
      }
    }
  }
}
```

Assign value to variable separately ( separate, transport-specific (usually JSON) variables dictionary).

```json
{
  "org": "xpirit-training"
}
```

### Fragments

- A [GraphQL fragment](https://graphql.org/learn/queries/#fragments) is a piece of logic that can be shared between multiple queries and mutations.
- You can see how the above query would be pretty repetitive if the fields were repeated.
- The concept of fragments is frequently used to split complicated application data requirements into smaller chunks
- The `AuditEntry` fragment can be used in multiple queries and mutations.

#### Available Fragment from Scheme

```graphql
query ($org: String!) {
  organization(login: $org) {
    auditLog(first: 20) {
      nodes {
        ... on AuditEntry {
          action
        }
      }
    }
  }
}
```

#### Own Fragment

```graphql
query ($org: String!) {
  organization(login: $org) {
    auditLog(first: 20) {
      nodes {
        ...repoAccess
      }
    }
  }
}

fragment repoAccess on AuditEntry {
  action
}
```

Now add more fields to the fragment (below `action` in fragment).

```graphql
  actor {
    ... on User {
      login
    }
  }
```

### Aliases

Rename a field in the response to custom name adding it in front of the field name. Here `myAccount is added in front of `viewer`.

```graphql
query {
  myAccount: viewer {
    login
    bio
  }
}
```

## Queries (Modify Data) aka Mutations

### Change User Status

- `changeUserStatus` **arguments**: What to be changed
- `changeUserStatus` **body**: defines desired return values

```graphql
mutation {
  changeUserStatus(input: { emoji: ":owl:", message: null }) {
    status {
      message
      emoji
      indicatesLimitedAvailability
    }
  }
}
```

### Change Repository Name

> [!WARNING]
> Changing repository names has implications - be cautious!

First, get repository ID.

```graphql
query {
  repository(owner: "xpirit-training", name: "training-manual") {
    id
  }
}
```

Use fetched `id` to change repository name.

```graphql
mutation($repoId: ID!) {
  updateRepository(input: { repositoryId: $repoId, name: "training manual" }) {
    repository {
      name
    }
  }
}
```

The ìd` is passed as a variable.

```json
{
  "repoId": "{the-id}"
}
```