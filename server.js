const express = require("express");
const bodyParser = require("body-parser");
const TelegramBot = require("node-telegram-bot-api");

const app = express();
app.use(bodyParser.json());

// ENV VARIABLES
const TOKEN = process.env.BOT_TOKEN;
const ADMIN_ID = process.env.ADMIN_ID;

// Safety check (important)
if (!TOKEN || !ADMIN_ID) {
  console.error("❌ BOT_TOKEN or ADMIN_ID missing in environment variables");
  process.exit(1);
}

// Start Telegram Bot
const bot = new TelegramBot(TOKEN, { polling: true });

bot.on("polling_error", (err) => console.log("Polling error:", err.message));

// Health check route (Render needs this)
app.get("/", (req, res) => {
  res.send("🤖 Bot server is running");
});

// Route to receive order from website
app.post("/order", async (req, res) => {
  try {
    const { orderId, plan, price, code } = req.body;

    const msg = `
🛒 <b>NEW ORDER RECEIVED</b>

🆔 Order ID: ${orderId}
📦 Plan: ${plan}
💰 Price: ${price}
🔑 Code: ${code}
    `;

    await bot.sendMessage(ADMIN_ID, msg, { parse_mode: "HTML" });
    res.sendStatus(200);
  } catch (err) {
    console.error("Order send error:", err.message);
    res.sendStatus(500);
  }
});

// REQUIRED FOR RENDER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("🚀 Server running on port " + PORT));