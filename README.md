Zerodha Trading MCP Server
This project implements a Model Context Protocol (MCP) server for trading on the Zerodha platform using the KiteConnect API. The server allows users to execute buy and sell stock commands programmatically. Additionally, it supports cloning GitHub repositories locally using the GitHub API for managing related codebases.
Prerequisites
Before setting up the MCP server, ensure you have the following:

Node.js: Install Node.js from nodejs.org.
Zerodha Developer App: Create an app on Zerodha's Developer Portal to obtain your API key and secret.
Access Token: Generate an access token for your Zerodha account. Refer to this YouTube tutorial for step-by-step instructions.
Git: Install Git from git-scm.com to clone repositories locally.
GitHub Personal Access Token: Create a token with repo scope for GitHub API access. See GitHub Docs.

Installation

Clone this repository:
git clone <repository-url>
cd <repository-directory>


Install dependencies:
npm install


Install additional dependencies for GitHub API integration:
npm install @octokit/rest


Configure the MCP server by creating or updating the MCP configuration file with the following structure:
{
  "mcpServers": {
    "trader": {
      "command": "<path-to-node-executable>",
      "args": ["<path-to-index.js>"]
    }
  }
}


Replace <path-to-node-executable> with the path to your Node.js executable (e.g., C:\\Program Files\\nodejs\\node.exe).
Replace <path-to-index.js> with the path to the index.js file in your project folder (e.g., C:\\Projects\\mcp-servers\\zero\\index.js).



Usage

Ensure your Zerodha access token is available and configured in your application.
Start the MCP server:node index.js


Send commands to the server to buy or sell stocks as per your implementation.

Cloning Repositories Locally
To clone GitHub repositories (e.g., for testing or integrating related codebases), use the provided script leveraging the GitHub API via Octokit.js. Example script (clone-repo.js):
const { Octokit } = require("@octokit/rest");
const { execSync } = require("child_process");

const octokit = new Octokit({ auth: "your-github-personal-access-token" });

async function cloneRepo(owner, repo) {
  try {
    const response = await octokit.repos.get({ owner, repo });
    const cloneUrl = response.data.clone_url;
    execSync(`git clone ${cloneUrl}`, { stdio: "inherit" });
    console.log(`Cloned ${repo} to local machine`);
  } catch (error) {
    console.error(`Error cloning ${repo}:`, error.message);
  }
}

// Example: Clone the KiteConnectJS repository
cloneRepo("zerodha", "kiteconnectjs");

Run the script:
node clone-repo.js

References
This project is built using the following SDKs and libraries:

KiteConnectJS: Official JavaScript SDK for Zerodha's KiteConnect API.
MCP TypeScript SDK: SDK for implementing MCP servers in TypeScript.
Octokit.js: JavaScript SDK for the GitHub REST API, used for cloning repositories.

Notes

Ensure your Zerodha and GitHub access tokens are securely stored and not exposed in version control.
Test your trading commands in a simulated environment before executing real trades.
Refer to Zerodha's documentation for rate limits and API usage guidelines.
For private repositories, ensure your GitHub Personal Access Token has the appropriate permissions.

License
This project is licensed under the MIT License. See the LICENSE file for details.

