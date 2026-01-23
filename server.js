import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// 🔐 Yaha apna NEW bot token daalna (BotFather se revoke karke)
const BOT_TOKEN = "PASTE_NEW_TOKEN_HERE";
const CHAT_ID = "8435909622"; // jahan orders aayenge

app.post("/order", async (req, res) => {
  const { orderId, plan, price, code, time, status } = req.body;

  const message = `
🛒 <b>NEW ORDER RECEIVED</b>

🧾 Order ID: <b>${orderId}</b>
📦 Plan: <b>${plan}</b>
💰 Price: <b>${price}</b>
🔑 Code: <b>${code}</b>
⏰ Time: <b>${time}</b>
📌 Status: <b>${status}</b>
`;

  try {
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: "HTML"
      })
    });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

app.get("/", (req,res)=>res.send("Bot Server Running ✅"));

app.listen(3000, () => console.log("Server started"));