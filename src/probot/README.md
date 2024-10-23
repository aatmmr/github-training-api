# Probot Example App

A GitHub App built with [Probot](https://github.com/probot/probot) that represents an example Probot App. It creates the local application using Javascript ([index.js](index.js)) listening to the `"issues.opened"` event on GitHub and commenting on the created issue once it is opened. The app also sets up an [smee.io](https://smee.io) channel which can be used to observe the webhook event.

## Setup

```sh
# Install dependencies
npm install

# Run the bot
npm start
```
Once stared, the app is available at `localhost:3000`. On the first start, the app will ask you to create a GitHub App. Do so and select the target user namespace or organisation. Probot takes care of all configurations. Custom settings, such as, repository access can be made once the GitHub App finished installing. After everything is set, restart the local app and reopen `localhost:3000`. The Probot app is now up and running and ready for testing.

## Use the App

## Docker

```sh
# 1. Build container
docker build -t example-app .

# 2. Start container
docker run -e APP_ID=<app-id> -e PRIVATE_KEY=<pem-value> example-app
```

## Contributing

If you have suggestions for how example-app could be improved, or want to report a bug, open an issue! We'd love all and any contributions.

For more, check out the [Contributing Guide](../../../CONTRIBUTING.md).
