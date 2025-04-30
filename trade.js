import { KiteConnect } from "kiteconnect";
import dotenv from "dotenv";
const apiKey = process.env.API_KEY;
let accessToken = process.env.ACCESS_TOKEN;
const kc = new KiteConnect({ api_key: apiKey });
//console.log(kc.getLoginURL());
export async function placeOrder(tradingsymbol, quantity, type) {
    try {
        kc.setAccessToken(accessToken);
        const profile = await kc.placeOrder('amo', {
            exchange: "NSE",
            tradingsymbol: tradingsymbol,
            transaction_type: type,
            quantity: quantity,
            product: "CNC",
            order_type: "MARKET"
        });
    }
    catch (err) {
        //console.error(err);
    }
}
