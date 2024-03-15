import { Octokit } from "octokit";
import dotenv from "dotenv";

// Get environment variables
dotenv.config();

// Initialize Octokit
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

// Get authenticated user
const {
  data: { login },
} = await octokit.rest.users.getAuthenticated();

// Use GraphQL API for same purpose
// const {
//   viewer: { login },
// } = await octokit.graphql(`{
//   viewer {
//     login
//   }
// }`);

// Get repositories
const { data: repositories } = await octokit.rest.repos.listForAuthenticatedUser({
  per_page: 5,
});

console.log("👋 Hello, %s", login);

console.log("\r\n📦 Some of your repositories are:");

// List repositories
for (const { name } of repositories) {
  console.log("- %s", name);
}

// Get issues in github-api-training repository
const { data: issues } = await octokit.rest.issues.listForRepo({
  owner: login,
  repo: "github-training-api",
  per_page: 5,
});

console.log("\r\n🎫 Some issues in github-training-api repository are:");

// List issues
for (const { title } of issues) {
  console.log("- %s", title);
}