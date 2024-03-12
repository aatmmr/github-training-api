# Query with CURL

## Single Request

Fetching all reposotories of the [GitHub Actions Organization](https://github.com/actions).

```bash
curl --location --request GET 'https://api.github.com/orgs/actions/repos' \
```

## Paginated Request

Some endpoints return a large number of items, such as `repos`. To keep responses fast, paginated requests return a subset of the items. You can request the next subset of items using the `page` query parameter.

```bash
curl --location --request GET 'https://api.github.com/orgs/actions/repos?page=1&per_page=10'
```