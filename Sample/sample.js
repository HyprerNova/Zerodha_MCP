import { placeOrder,canceStocklOrder, getStockHolding, MF_holdings } from "/Projects/mcp-servers/zero/Main/trade.js"

//aceOrder('regular','BAJAJHFL',1,'BUY');

// canceStocklOrder('regular',250730000804807);

async function main() {
    const result = await getStockHolding();
    const tableData = result.map(stock => ({
      Name: stock.tradingsymbol,
      Value: stock.last_price,   // or any other value field you want
      Quantity: stock.quantity
    }));
    console.table(tableData);
  }
  main();

// async function main() {
//   const mfHoldings = await MF_holdings();
//   console.log(mfHoldings);
// }
// main();