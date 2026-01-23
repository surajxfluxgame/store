import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// 🔴 YAHAN APNA BOT TOKEN DAALO
const TOKEN = "8435909622:AAFoGrkT2kbOXLfhcDI82a5mk4ahyUEY2yo";

// 🔴 YAHAN APNI TELEGRAM USER ID DAALO
const CHAT_ID = "6840276332";

app.post("/send-order", async (req, res) => {
  const { orderId, plan, price, code } = req.body;

  const text = `🛒 NEW ORDER
ID: ${orderId}
PLAN: ${plan}
PRICE: ${price}
CODE: ${code}`;

  await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: CHAT_ID, text })
  });

  res.json({ success: true });
});

app.get("/", (req,res)=>res.send("Bot server running ✅"));

app.listen(3000, () => console.log("Server running"));