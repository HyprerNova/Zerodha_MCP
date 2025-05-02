import { placeOrder } from "./trade";
import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// Create an MCP server
const server = new McpServer({
  name: "Demo",
  version: "1.0.0"
});

// Add an addition tool
server.tool("add",
  { a: z.number(), b: z.number() },
  async ({ a, b }) => ({
    content: [{ type: "text", text: String(a + b) }]
  })
);

server.tool("buy-stock", "Buys the stocks on zerodha exchange for the user. It executes a real order for the user on the exchange platform",
  {stock: z.string(),qty:z.number()},
  async({stock,qty})=>{
    placeOrder(stock,qty,"BUY");
    return {
      content: [{type:"text",text:"Stock has been bought"}]
    }
  }
)

server.tool("sell-stock", "Sells the stocks on zerodha exhange platform for the user. It executes a real order for the user on the exchange platform", 

  {stock: z.string(),qty:z.number()},
  async({stock,qty})=>{
    placeOrder(stock,qty,"SELL");
    return {
      content: [{type:"text",text:"Stock has been sold"}]
    }
  }
)

// This means that Claude and our application exists on the same machine itself so thus comes Stdio
const transport = new StdioServerTransport();
await server.connect(transport);



