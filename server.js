const express = require("express");
const bodyParser = require("body-parser");
const TelegramBot = require("node-telegram-bot-api");

const app = express();
app.use(bodyParser.json());

const TOKEN = process.env.BOT_TOKEN;
const ADMIN_ID = process.env.ADMIN_ID;

const bot = new TelegramBot(TOKEN);

// Route to receive order from website
app.post("/order", (req, res) => {
  const { orderId, plan, price, code } = req.body;

  const msg = `
🛒 NEW ORDER RECEIVED

🆔 Order ID: ${orderId}
📦 Plan: ${plan}
💰 Price: ${price}
🔑 Code: ${code}
  `;

  bot.sendMessage(ADMIN_ID, msg);
  res.sendStatus(200);
});

// IMPORTANT FOR RENDER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port " + PORT));