const express = require("express");
const bodyParser = require("body-parser");
const TelegramBot = require("node-telegram-bot-api");

const app = express();
app.use(bodyParser.json());

// ===== ENV VARIABLES =====
const TOKEN = process.env.BOT_TOKEN;
const ADMIN_ID = process.env.ADMIN_ID;

// Check env vars
if (!TOKEN || !ADMIN_ID) {
  console.error("❌ BOT_TOKEN or ADMIN_ID missing");
  process.exit(1);
}

// ===== TELEGRAM BOT START =====
const bot = new TelegramBot(TOKEN, { polling: true });

bot.on("polling_error", (err) => console.log("Polling error:", err.message));

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "🤖 Bot is LIVE and ready to receive orders!");
});

// ===== HEALTH ROUTE FOR RENDER =====
app.get("/", (req, res) => {
  res.send("Bot server is running ✅");
});

// ===== ORDER ROUTE FROM WEBSITE =====
app.post("/order", async (req, res) => {
  try {
    const { orderId, plan, price, code } = req.body;

    if (!orderId || !plan || !price || !code) {
      return res.status(400).send("Missing order data");
    }

    const message = `
🛒 <b>NEW ORDER RECEIVED</b>

🆔 Order ID: ${orderId}
📦 Plan: ${plan}
💰 Price: ${price}
🔑 Code: ${code}
    `;

    await bot.sendMessage(ADMIN_ID, message, { parse_mode: "HTML" });

    res.status(200).send("Order sent to Telegram");
  } catch (err) {
    console.error("❌ Error sending order:", err.message);
    res.status(500).send("Server error");
  }
});

// ===== START SERVER (RENDER PORT FIX) =====
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("🚀 Server running on port " + PORT));