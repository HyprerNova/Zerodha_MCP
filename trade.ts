import { KiteConnect } from "kiteconnect";
import dotenv from 'dotenv';
dotenv.config();

// ! ensures non-null assertionss
const apiKey = process.env.API_KEY!;
let access_token = process.env.ACCESS_TOKEN!;

const kc = new KiteConnect({ api_key: apiKey });
kc.setAccessToken(access_token);

console.log(kc.getLoginURL());


export async function placeOrder(
  ordertype: 'amo' | 'regular',
  tradingsymbol: string,
  quantity: number,
  type: "BUY" | "SELL"
): Promise<string> {
  try {
    const response = await kc.placeOrder(ordertype, {
      exchange: "NSE",
      tradingsymbol: tradingsymbol,
      transaction_type: type,
      quantity: quantity,
      product: "CNC",
      order_type: "MARKET",
    });
    console.log("Order placed successfully:", response.order_id);
    return response.order_id;  // ✅ Return the order ID
  } catch (err) {
    console.error("Failed to place order:", err);
    throw new Error("Order placement failed");  // ✅ Rethrow to allow caller to handle
  }
}

export async function getHolding() {
  const holdings = await kc.getPositions();
  console.log(holdings);
  let allHoldings = "";
  holdings.net.map((holding) => {
    allHoldings += `stock: ${holding.tradingsymbol}, qty: ${holding.quantity}, currentPrice : ${holding.last_price}`;
  });

  return allHoldings;
}


export async function placeMutualFundOrder(
  tradingsymbol: string,
  type: "BUY" | "SELL",
  quantity: number,
  amount: number
) {
  try {
    const orderParams = {
      tradingsymbol,
      transaction_type: type,
      ...(type === "BUY" ? { amount } : { quantity }),
    };
    const response = await kc.placeMFOrder(orderParams);
    console.log("Order placed successfully:", response.order_id);
  } catch (err) {
    console.error("Failed to place MF order:", err);
  }
}


export async function canceStocklOrder(
  variety: 'amo' | 'regular', 
  order_id: string | number
): Promise<{ order_id: string }> { 
  try {
    const response = await kc.cancelOrder(variety, order_id);
    console.log(response.order_id);
    return { order_id: response.order_id };  // Return the order_id
  } catch (err) {
    console.error(err);  // Log the error
    throw new Error('Failed to cancel order');  
  }
}


