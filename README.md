***Zerodha Trading MCP Server***
<!-- -->
This project implements a Model Context Protocol (MCP) server for trading on the Zerodha platform using the KiteConnect API. The server allows users to execute buy and sell stock commands programmatically.

**Prerequisites**
Before setting up the MCP server, ensure you have the following:

1) Node.js: Install from nodejs.org.
2) Install the Clause Desktop Application
3) Zerodha Developer App: Create an app on Zerodha's Developer Portal to obtain your API key and secret.
4) Access Token: Generate an access token for your Zerodha account. Refer to this YouTube tutorial for step-by-step instructions.
5) Have the developer mode switched on in clause desktop version

**Installation**

Clone this repository:
```
git clone https://github.com/kingnavneeth094/Zerodha-MCP.git
cd Zerodha-MCP
```

Install dependencies:
```npm install```


Configure the MCP server:Create or update the MCP configuration file with the following structure:
```
{
  "mcpServers": {
    "trader": {
      "command": "<path-to-node-executable>",
      "args": ["<path-to-index.js>"]
    }
  }
}
```


Replace <path-to-node-executable> with the path to your Node.js executable (e.g., C:\Program Files\nodejs\node.exe).
Replace <path-to-index.js> with the path to the index.js file in your project folder (e.g., C:\Projects\mcp-servers\zero\index.js).


**Usage**
1) Ensure your Zerodha access token is available and configured in your application.
2) Open claude and check the tools menu to see if the server tools are available. 
3) If yes, Send commands to the server to buy or sell stocks as per your implementation.


**References**
This project is built using the following SDKs and libraries:

KiteConnectJS: Official JavaScript SDK for Zerodha's KiteConnect API.
MCP TypeScript SDK: SDK for implementing MCP servers in TypeScript.
