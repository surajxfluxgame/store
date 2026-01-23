const express = require("express");
const TelegramBot = require("node-telegram-bot-api");

const app = express();

// ====== ENV VARIABLES ======
const token = process.env.BOT_TOKEN;
const adminId = process.env.ADMIN_ID;

// ====== TELEGRAM BOT ======
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "🔥 Bot is LIVE and working!");
});

// Example order receive endpoint
app.use(express.json());

app.post("/order", (req, res) => {
  const { orderId, plan, price, code } = req.body;

  const text = `
🛒 *NEW ORDER RECEIVED*
Order ID: ${orderId}
Plan: ${plan}
Price: ${price}
Code: ${code}
  `;

  bot.sendMessage(adminId, text, { parse_mode: "Markdown" });

  res.send({ status: "Order sent to Telegram" });
});

// ====== RENDER PORT FIX ======
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port " + PORT));