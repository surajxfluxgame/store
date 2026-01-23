const TelegramBot = require('node-telegram-bot-api');

const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "✅ Bot is LIVE and working!");
});

bot.on('message', (msg) => {
    if (msg.text && !msg.text.startsWith('/')) {
        bot.sendMessage(msg.chat.id, "💬 Message received: " + msg.text);
    }
});

console.log("Bot is running...");