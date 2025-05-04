import { KiteConnect } from "kiteconnect";
import dotenv from 'dotenv';
dotenv.config();
// ! ensures non-null assertionss
const apiKey = process.env.API_KEY;
let access_token = process.env.ACCESS_TOKEN;
const kc = new KiteConnect({ api_key: apiKey });
kc.setAccessToken(access_token);
console.log(kc.getLoginURL());
export async function placeOrder(tradingsymbol, quantity, type) {
    try {
        await kc.placeOrder('amo', {
            exchange: "NSE",
            tradingsymbol: tradingsymbol,
            transaction_type: type,
            quantity: quantity,
            product: "CNC",
            order_type: "MARKET",
        });
    }
    catch (err) {
        console.error(err);
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
