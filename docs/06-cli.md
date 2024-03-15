# GitHub CLI

## Installation

- From Website: [GitHub CLI](https://cli.github.com/)
- From Homebrew: `brew install gh`
- Others: [GitHub CLI Installation Docs](https://github.com/cli/cli#installation)

## Docs

- [The Source of Truth](https://cli.github.com/manual/)

## Login

- Either login using `gh auth login` or set `GITHUB_TOKEN`
- For Enterprise Server add `--hostname <hostname>`
- Troubleshooting: `gh auth status`

## Usage

### Pagination

Get issue count of a repository:

```bash
gh api repos/xpirit-training/demo-features-issueops/issues --paginate --jq length
```

### Fetch Repositories of Oranization

The query string can be added inline

```bash
gh api graphql -F login='xpirit-training' -f query='
  query($login: String!) {
    organization(login: $login) {
      repositories(first: 20) {
        nodes { name }
      }
    }
  }
'
```

or as file

```bash
gh api graphql -F login=aatmmr -F query=@src/graphql/list-repos.graphql --paginate
```

Be aware that to add a `@` in front of the file name and that any parameter that is used in the query in the file must be added as `-F` parameter in the CLI command to be passed in to the query.

## Use Build-In Commands

The CLI has a long list pf build in commands that wrap API calls. For example, you can list issues of a repository:

```bash
gh issue list --repo octokit/octokit.js 
```
This call is independent of the context you are in as the desired repository is defined via `--repo`.

## Context Awareness

The CLI is aware of the context you are in. For example, if you are in a repository folder, the CLI will use the repository as the default context.

Listing the issues of the repository gets as simple as

```bash
gh issue list
```

Listing the secrets of the repository gets as simple as

```bash
gh secret list
```

## Extensions

- List installed extensions: `gh extension list`
- Browse catalogue: `gh extension browse`
- Install an extension: `gh extension install <extension>`
