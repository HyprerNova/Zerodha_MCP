import { KiteConnect } from "kiteconnect";

const apiKey = "r04b6rh4v92aq1l6";
let accessToken = "p7mdCop4PxiGeJJrIWkh6IEAYnVQ3Xqa";

const kc = new KiteConnect({ api_key: apiKey });

//console.log(kc.getLoginURL());


export async function placeOrder(tradingsymbol: string, quantity: number, type: "BUY" | "SELL") {
  try {
    kc.setAccessToken(accessToken);
    const profile = await kc.placeOrder('amo',{
      exchange:"NSE",
      tradingsymbol:tradingsymbol,
      transaction_type:type,
      quantity:quantity,
      product:"CNC",
      order_type:"MARKET"
  });
  } catch (err) {
    //console.error(err);
  }
}

export async function getHolding(){
  const holding = await kc.getHoldings();
  let allHolding = "";
  holding.map(hold =>{
    allHolding += `stock: ${hold.tradingsymbol}, qty: ${hold.quantity}, currentPrice : ${hold.last_price}`
  }) 

  return allHolding;
}

