import { KiteConnect } from "kiteconnect";
import dotenv from 'dotenv';
dotenv.config();
const apiKey = process.env.API_KEY;
const apiSecret = process.env.API_SECRET;
const requestToken = "kzaDPLUM8nqD518JFVNw14Q7p424F92Q"; // get this from login url and then parse this to get the access token
const kc = new KiteConnect({ api_key: apiKey });
console.log(kc.getLoginURL());
async function init() {
    try {
        await generateSession();
        await getProfile();
    }
    catch (err) {
        console.error(err);
    }
}
async function generateSession() {
    try {
        const response = await kc.generateSession(requestToken, apiSecret);
        kc.setAccessToken(response.access_token);
        console.log("Session generated:", response);
    }
    catch (err) {
        console.error("Error generating session:", err);
    }
}
async function getProfile() {
    try {
        const profile = await kc.getProfile();
        console.log("Profile:", profile);
    }
    catch (err) {
        console.error("Error getting profile:", err);
    }
}
// Initialize the API calls
init();
