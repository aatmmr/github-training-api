# GitHub API Training Sample Repository

The GitHub API training covers a broad range of topics across GitHub's API, GitHub Apps, Webhooks, and more.

The exact content of the training is described at [GitHub's Expert Services](https://github.com/services/api-training).

This repository contains demos and examples that can be used during the training. It is free to be shared with trainees to enable them to follow along and revisit the examples after the training.

## Usage

The repository is designed as a template. Click "Use Template" to create a new repository with the same content in your own namespace.

## Structure

- `docs`: Contains demo-related content and commands and adds links to additional resources.
- `src/graphql`: Contains example GraphQL queries used in CLI calls.
- `src/octokit`: Contains a simple example of how to use Octokit with JavaScript.
- `.github/workflows`: Contains a GitHub Action workflow that uses the GitHub CLI to list issues of a repository.

## Contribute

If you have a demo or example that you would like to share, please open a pull request. 

There are some pieces missing that would be great to have:

- Simple Probot Demo executed from a GitHub Action.