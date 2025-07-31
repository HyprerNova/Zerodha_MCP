import { KiteConnect } from "kiteconnect";
import dotenv from 'dotenv';
dotenv.config();
// ! ensures non-null assertionss
const apiKey = process.env.API_KEY;
let access_token = process.env.ACCESS_TOKEN;
const kc = new KiteConnect({ api_key: apiKey });
kc.setAccessToken(access_token);

export async function placeOrder(ordertype, tradingsymbol, quantity, type) {
    try {
        const response = await kc.placeOrder(ordertype, {
            exchange: "NSE",
            tradingsymbol: tradingsymbol,
            transaction_type: type,
            quantity: quantity,
            product: "CNC",
            order_type: "MARKET",
        });
        return response.order_id; // ✅ Return the order ID
    }
    catch (err) {
        console.error("Failed to place order:", err);
        throw new Error("Order placement failed"); // ✅ Rethrow to allow caller to handle
    }
}
export async function getStockHolding() {
    try {
        const holdings = await kc.getHoldings();
        return holdings;
    }
    catch(err) {
        console.error(err);
        throw new Error('Failed to get portfolio holdings');
    }
}
export async function placeMutualFundOrder(tradingsymbol, type, quantity, amount) {
    try {
        const orderParams = Object.assign({ tradingsymbol, transaction_type: type }, (type === "BUY" ? { amount } : { quantity }));
        const response = await kc.placeMFOrder(orderParams);
        return response.order_id;
    }
    catch (err) {
        console.error("Failed to place MF order:", err);
        return undefined;
    }
}
export async function canceStocklOrder(variety, order_id) {
    try {
        const response = await kc.cancelOrder(variety, order_id);
        return { order_id: response.order_id }; // Return the order_id
    }
    catch (err) {
        console.error(err); // Log the error
        throw new Error('Failed to cancel order');
    }
}

export async function MF_holdings() {
    try{
        const response = await kc.getMFHoldings();
        return response;
    }
    catch(err){
        console.error(err);
        throw new Error('Failed to get MF holdings');
    }
}

export async function getTrigger(trigger_id) {
    try {
        const response = await kc.getGTT(trigger_id);
        return response;
    } catch (err) {
        console.error(err);
        throw new Error('Failed to get trigger');
    }
}
