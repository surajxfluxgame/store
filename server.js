const express = require("express");
const bodyParser = require("body-parser");
const TelegramBot = require("node-telegram-bot-api");

const app = express();
app.use(bodyParser.json());

// ENV VARIABLES (Render me add karna hota hai)
const TOKEN = process.env.BOT_TOKEN;
const ADMIN_ID = process.env.ADMIN_ID;

if (!TOKEN || !ADMIN_ID) {
  console.error("❌ BOT_TOKEN ya ADMIN_ID missing hai");
  process.exit(1);
}

// Bot start (Polling mode for Render)
const bot = new TelegramBot(TOKEN, { polling: true });

bot.on("polling_error", (err) => console.log(err));

// Test command
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "🤖 Bot is live and working!");
});

// WEBSITE SE ORDER RECEIVE KARNE KA ROUTE
app.post("/order", async (req, res) => {
  try {
    const { orderId, plan, price, code } = req.body;

    if (!orderId || !plan || !price || !code) {
      return res.status(400).send("Missing order data");
    }

    const message = `
🛒 *NEW ORDER RECEIVED*

🆔 Order ID: ${orderId}
📦 Plan: ${plan}
💰 Price: ${price}
🔑 Code: ${code}
    `;

    await bot.sendMessage(ADMIN_ID, message, { parse_mode: "Markdown" });

    console.log("✅ Order sent to Telegram:", orderId);
    res.sendStatus(200);
  } catch (err) {
    console.error("❌ Error sending order:", err);
    res.sendStatus(500);
  }
});

// Home route (browser me open karne pe error na aaye)
app.get("/", (req, res) => {
  res.send("✅ Bot Server is Running");
});

// Render ke liye port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("🚀 Server running on port " + PORT));