const express = require("express");
const bodyParser = require("body-parser");
const TelegramBot = require("node-telegram-bot-api");

const app = express();
app.use(bodyParser.json());

// ENV VARIABLES
const TOKEN = process.env.BOT_TOKEN;
const ADMIN_ID = process.env.ADMIN_ID;

// Create bot WITHOUT polling (important for Render)
const bot = new TelegramBot(TOKEN);

// Home route (Render ko batane ke liye server alive hai)
app.get("/", (req, res) => {
  res.send("Bot server is running ✅");
});

// Order route from website
app.post("/order", async (req, res) => {
  console.log("ORDER RECEIVED:", req.body);

  const { orderId, plan, price, code } = req.body;

  const msg = `
🛒 NEW ORDER RECEIVED

🆔 Order ID: ${orderId}
📦 Plan: ${plan}
💰 Price: ${price}
🔑 Code: ${code}
  `;

  try {
    await bot.sendMessage(ADMIN_ID, msg);
    console.log("Message sent to Telegram");
    res.sendStatus(200);
  } catch (err) {
    console.log("Telegram Error:", err);
    res.sendStatus(500);
  }
});

// 🔥 VERY IMPORTANT FOR RENDER
const PORT = process.env.PORT || 10000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});