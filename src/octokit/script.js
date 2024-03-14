import { Octokit } from "octokit";
import dotenv from "dotenv";

dotenv.config();

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

const {
  data: { login },
} = await octokit.rest.users.getAuthenticated();

const { data: repositories } = await octokit.rest.repos.listForAuthenticatedUser({
  per_page: 10,
});

console.log("Hello, %s", login);

console.log("Some of your repositories are:");

for (const { name } of repositories) {
  console.log("- %s", name);
}
