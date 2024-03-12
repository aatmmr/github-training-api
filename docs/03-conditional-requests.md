# Conditional Requests

Conditional requests are a way to ask the server to send a resource only if it has changed since the last time it was requested. This can be useful to save bandwidth and time, especially when dealing with large files.

## How?

- Add the desired header to the request
- Possible headers are listed in [docs](https://docs.github.com/en/rest/using-the-rest-api/getting-started-with-the-rest-api?apiVersion=2022-11-28#headers)

## Example

```bash
curl --location --request GET 'https://api.github.com/orgs/actions/repos' --header 'If-Modified-Since: Tue, 12 Mar 2024 00:00:00 GMT'
```
