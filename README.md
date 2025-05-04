Zerodha Trading MCP Server
This project implements a Model Context Protocol (MCP) server for trading on the Zerodha platform using the KiteConnect API. The server allows users to execute buy and sell stock commands programmatically.
Prerequisites
Before setting up the MCP server, ensure you have the following:

Node.js: Install Node.js from nodejs.org.
Zerodha Developer App: Create an app on Zerodha's Developer Portal to obtain your API key and secret.
Access Token: Generate an access token for your Zerodha account. Refer to this YouTube tutorial for step-by-step instructions : https://youtu.be/1iJ34tTjwwo?si=b-lPtW4YZnt_5jtQ

Installation

Clone this repository:
git clone <repository-url>
cd <repository-directory>


Install dependencies:
npm install


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

References
This project is built using the following SDKs and libraries:

KiteConnectJS: Official JavaScript SDK for Zerodha's KiteConnect API.
MCP TypeScript SDK: SDK for implementing MCP servers in TypeScript.

Notes

Ensure your access token is securely stored and not exposed in version control.
Test your trading commands in a simulated environment before executing real trades.
Refer to Zerodha's documentation for rate limits and API usage guidelines.

License
This project is licensed under the MIT License. See the LICENSE file for details.


Links:

https://github.com/zerodha/kiteconnectjs
https://github.com/modelcontextprotocol/typescript-sd
