const express = require("express");
const bodyParser = require("body-parser");
const TelegramBot = require("node-telegram-bot-api");

const app = express();
app.use(bodyParser.json());

const TOKEN = process.env.BOT_TOKEN; // Render env variable
const OWNER_ID = process.env.OWNER_ID; // Tumhara Telegram ID

const bot = new TelegramBot(TOKEN, { polling: true });

bot.on("message", (msg) => {
  if (msg.text === "/start") {
    bot.sendMessage(msg.chat.id, "✅ Bot is active and connected!");
  }
});

app.post("/order", async (req, res) => {
  const { orderId, plan, price, code } = req.body;

  const message = `
🛒 *NEW ORDER RECEIVED*

🆔 Order ID: ${orderId}
📦 Plan: ${plan}
💰 Price: ${price}
🔑 Code: ${code}
`;

  try {
    await bot.sendMessage(OWNER_ID, message, { parse_mode: "Markdown" });
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.get("/", (req, res) => {
  res.send("Bot Server Running ✅");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Bot is running..."));