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
gh api graphql —-paginate -f organization=<orgname> -f query="@path/to/query-file.graphql"
```

## Use build in Commands

Fetch issues of a repository:

```bash
gh issue list --repo xpirit-training/demo-features-issueops
```

## Context Awareness

The CLI is aware of the context you are in. For example, if you are in a repository folder, the CLI will use the repository as the default context.

You can list secrets of a repository:

```bash
gh secret list
```

or run 

```bash
gh issue list
```

## Extensions

- List installed extensions: `gh extension list`
- Browse catalogue: `gh extension browse`
- Install an extension: `gh extension install <extension>`
