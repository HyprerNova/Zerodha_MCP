import { canceStocklOrder, getStockHolding, placeMutualFundOrder, placeOrder, MF_holdings, getTrigger } from "./trade.js";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
// Create an MCP server
const server = new McpServer({
    name: "Demo",
    version: "1.0.0"
});
// Add an addition tool
server.tool("add", { a: z.number(), b: z.number() }, async ({ a, b }) => ({
    content: [{ type: "text", text: String(a + b) }]
}));
server.tool("buy-stock", "Buys the stocks on Zerodha exchange for the user. It executes a real order for the user on the exchange platform", {
    variety: z.enum(['amo', 'regular']),
    stock: z.string(),
    qty: z.number(),
}, async ({ variety, stock, qty }) => {
    try {
        const order_id = await placeOrder(variety, stock, qty, "BUY");
        return {
            content: [{ type: "text", text: `Stock has been bought. Order ID: ${order_id}` }],
        };
    }
    catch (err) {
        return {
            content: [
                { type: "text", text: `Failed to buy stock. Error: ${err.message || err}` },
            ],
        };
    }
});
server.tool("sell-stock", "Sells the stocks on Zerodha exchange platform for the user. It executes a real order for the user on the exchange platform", {
    variety: z.enum(['regular']),
    stock: z.string(),
    qty: z.number(),
}, async ({ variety, stock, qty }) => {
    try {
        const order_id = await placeOrder(variety, stock, qty, "SELL");
        return {
            content: [{ type: "text", text: `Stock has been sold. Order ID: ${order_id}` }],
        };
    }
    catch (err) {
        return {
            content: [
                { type: "text", text: `Failed to sell stock. Error: ${err.message || err}` },
            ],
        };
    }
});
server.tool("show-portfolio", "Shows my complete portfolio in zerodha", {}, async () => {
    const holdings = await getStockHolding();
    let totalProfit = 0;
    let totalInvested = 0;
    const tableData = holdings.map(stock => {
        totalProfit += stock.pnl;
        const invested = stock.average_price * stock.quantity;
        totalInvested += invested;
        const profitPercent = invested !== 0 ? (stock.pnl / invested) * 100 : 0;
        return {
            Name: stock.tradingsymbol,
            Value: stock.last_price,
            Quantity: stock.quantity,
            'Purchase Value': stock.average_price,
            Profit: stock.pnl,
            'Profit %': profitPercent.toFixed(2)
        };
    });
    const totalProfitPercent = totalInvested !== 0 ? (totalProfit / totalInvested) * 100 : 0;
    // Convert tableData to a string table for text response
    const tableString = [
        '| Name      | Value     | Quantity | Purchase Value | Profit    | Profit % |',
        '|-----------|-----------|----------|---------------|-----------|----------|',
        ...tableData.map(row => `| ${row.Name} | ${row.Value} | ${row.Quantity} | ${row['Purchase Value']} | ${row.Profit} | ${row['Profit %']} |`),
        '',
        `Total Profit: ${totalProfit}`,
        `Total Profit %: ${totalProfitPercent.toFixed(2)}`
    ].join('\n');
    return {
        content: [{ type: "text", text: tableString }]
    };
});
server.tool("cancel-stock-order", "Cancels the order of the stock on Zerodha", { variety: z.enum(['amo', 'regular']), order_id: z.union([z.number(), z.string()]) }, async ({ variety, order_id }) => {
    try {
        // Call cancelStockOrder and get the response
        const response = await canceStocklOrder(variety, order_id);
        return {
            content: [{ type: "text", text: `Stock order has been cancelled. Order ID: ${response.order_id}` }]
        };
    }
    catch (err) {
        return {
            content: [
                { type: "text", text: `Failed to cancel stock order. Error: ${err}` }
            ]
        };
    }
});
server.tool("buy-mf", "Places a BUY mutual fund order on Zerodha.", {
    tradingsymbol: z.string(),
    amount: z.number().min(1, "Amount must be a positive number"),
}, async ({ tradingsymbol, amount }) => {
    try {
        const order_id = await placeMutualFundOrder(tradingsymbol, "BUY", 0, amount);
        return {
            content: [{ type: "text", text: `BUY Mutual Fund order placed. Order ID: ${order_id}` }],
        };
    }
    catch (err) {
        return {
            content: [{ type: "text", text: `Error placing BUY Mutual Fund order: ${err.message}` }],
        };
    }
});
server.tool("sell-mf", "Places a SELL mutual fund order on Zerodha.", {
    tradingsymbol: z.string(),
    quantity: z.number().min(1, "Quantity must be a positive number"),
}, async ({ tradingsymbol, quantity }) => {
    try {
        const order_id = await placeMutualFundOrder(tradingsymbol, "SELL", quantity, 0);
        return {
            content: [{ type: "text", text: `SELL Mutual Fund order placed. Order ID: ${order_id}` }],
        };
    }
    catch (err) {
        return {
            content: [{ type: "text", text: `Error placing SELL Mutual Fund order: ${err.message}` }],
        };
    }
});
server.tool("show-mf-holdings", "Shows the holdings of the mutual funds on Zerodha", {}, async () => {
    const holdings = await MF_holdings();
    return {
        content: [{ type: "text", text: holdings }]
    };
});
server.tool("get-trigger", "Get a GTT (trigger) by its ID", {
    trigger_id: z.union([z.number(), z.string()])
}, async ({ trigger_id }) => {
    try {
        const trigger = await getTrigger(trigger_id);
        return {
            content: [{ type: "text", text: JSON.stringify(trigger, null, 2) }]
        };
    } catch (err) {
        return {
            content: [{ type: "text", text: `Failed to get trigger. Error: ${err.message || err}` }]
        };
    }
});
// This means that Claude and our application exists on the same machine itself so thus comes Stdio
const transport = new StdioServerTransport();
await server.connect(transport);
