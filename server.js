const express = require("express");
const bodyParser = require("body-parser");
const TelegramBot = require("node-telegram-bot-api");

const app = express();
app.use(bodyParser.json());

// ENV VARIABLES
const TOKEN = process.env.BOT_TOKEN;
const ADMIN_ID = process.env.ADMIN_ID;

// SAFETY CHECK
if (!TOKEN || !ADMIN_ID) {
  console.error("❌ BOT_TOKEN or ADMIN_ID missing");
  process.exit(1);
}

// BOT WITH POLLING (IMPORTANT)
const bot = new TelegramBot(TOKEN, { polling: true });

// START COMMAND (TEST)
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "✅ Bot is active & ready to receive orders"
  );
});

// ORDER ROUTE
app.post("/order", async (req, res) => {
  try {
    const { orderId, plan, price, code } = req.body;

    const message = `
🛒 NEW ORDER RECEIVED

🆔 Order ID: ${orderId}
📦 Plan: ${plan}
💰 Price: ${price}
🔑 Code: ${code}
`;

    await bot.sendMessage(ADMIN_ID, message);
    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

// HOME ROUTE (Render test)
app.get("/", (req, res) => {
  res.send("🤖 Bot is running");
});

// SERVER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("🚀 Server running on port " + PORT);
});