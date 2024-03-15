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

gh api repos/aatmmr/github-training-api/issues --paginate --jq length## Usage

### Pagination

Get issue count of a repository:

```bash

```

### Fetch Repositories of Oranization

The query string can be added inline

```bash
gh api graphql -F login='octokit' -f query='
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
gh api graphql -F login=octokit -F query=@src/graphql/list-repos.graphql --paginate
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
## GitHub CLI in GitHub Action Workflows

The GitHub CLI can be used in GitHub Action Workflows as it is preinstalled on GitHub hosted runners. Simply use the `gh` command in the workflow in a `run` step.

An example can be found in [CLI Demo Workflow](../.github/workflows/cli-demo.yml).

>[!IMPORTANT]
> Make sure to checkout the repository before using the `gh` command as the CLI needs the repository to be present to know the context.

> [!IMPORTANT]
> The `GITHUB_TOKEN` has to be passed to the `gh` command as an environment variable (`env`) to authenticate the command. The token is automatically provided in the workflow with the restricted scope of the repository the workflow is executed from.

## Extensions

- List installed extensions: `gh extension list`
- Browse catalogue: `gh extension browse`
- Install an extension: `gh extension install <extension>`
