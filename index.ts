import { canceStocklOrder, getHolding, placeMutualFundOrder, placeOrder } from "./trade";
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

server.tool(
  "buy-stock",
  "Buys the stocks on Zerodha exchange for the user. It executes a real order for the user on the exchange platform",
  {
    variety: z.enum(['amo', 'regular']),
    stock: z.string(),
    qty: z.number(),
  },
  async ({ variety, stock, qty }) => {
    try {
      const order_id = await placeOrder(variety, stock, qty, "BUY");
      return {
        content: [{ type: "text", text: `Stock has been bought. Order ID: ${order_id}` }],
      };
    } catch (err: any) {
      return {
        content: [
          { type: "text", text: `Failed to buy stock. Error: ${err.message || err}` },
        ],
      };
    }
  }
);


server.tool(
  "sell-stock",
  "Sells the stocks on Zerodha exchange platform for the user. It executes a real order for the user on the exchange platform",
  {
    variety: z.enum(['regular']),
    stock: z.string(),
    qty: z.number(),
  },
  async ({ variety, stock, qty }) => {
    try {
      const order_id = await placeOrder(variety, stock, qty, "SELL");
      return {
        content: [{ type: "text", text: `Stock has been sold. Order ID: ${order_id}` }],
      };
    } catch (err: any) {
      return {
        content: [
          { type: "text", text: `Failed to sell stock. Error: ${err.message || err}` },
        ],
      };
    }
  }
);


server.tool("show-portfolio", "Shows my complete portfolio in zerodha",
  { },
  async () =>{
    const holdings = await getHolding();
    return {
      content: [{type:"text",text: holdings }]
    }
  }
)

server.tool("cancel-stock-order", "Cancels the order of the stock on Zerodha",
  { variety: z.enum(['amo', 'regular']), order_id: z.union([z.number(), z.string()]) },
  async ({ variety, order_id }) => {
    try {
      // Call cancelStockOrder and get the response
      const response = await canceStocklOrder(variety, order_id);

      return {
        content: [{ type: "text", text: `Stock order has been cancelled. Order ID: ${response.order_id}` }]
      };
    } catch (err) {
      return {
        content: [
          { type: "text", text: `Failed to cancel stock order. Error: ${err}` }
        ]
      };
    }
  }
);

server.tool(
  "buy-mf",
  "Places a BUY mutual fund order on Zerodha.",
  {
    tradingsymbol: z.string(),
    amount: z.number().min(1, "Amount must be a positive number"),
  },
  async ({ tradingsymbol, amount }) => {
    try {
      const order_id = await placeMutualFundOrder(tradingsymbol, "BUY", 0, amount);
      return {
        content: [{ type: "text", text: `BUY Mutual Fund order placed. Order ID: ${order_id}` }],
      };
    } catch (err: any) {
      return {
        content: [{ type: "text", text: `Error placing BUY Mutual Fund order: ${err.message}` }],
      };
    }
  }
);

server.tool(
  "sell-mf",
  "Places a SELL mutual fund order on Zerodha.",
  {
    tradingsymbol: z.string(),
    quantity: z.number().min(1, "Quantity must be a positive number"),
  },
  async ({ tradingsymbol, quantity }) => {
    try {
      const order_id = await placeMutualFundOrder(tradingsymbol, "SELL", quantity, 0);
      return {
        content: [{ type: "text", text: `SELL Mutual Fund order placed. Order ID: ${order_id}` }],
      };
    } catch (err: any) {
      return {
        content: [{ type: "text", text: `Error placing SELL Mutual Fund order: ${err.message}` }],
      };
    }
  }
);



// This means that Claude and our application exists on the same machine itself so thus comes Stdio
const transport = new StdioServerTransport();
await server.connect(transport);



