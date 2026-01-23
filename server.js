import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = "6840276332";

app.post("/order", async (req, res) => {
  const { orderId, plan, price } = req.body;

  const text = `🛒 NEW ORDER\nOrder: ${orderId}\nPlan: ${plan}\nPrice: ${price}`;

  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({chat_id:CHAT_ID,text})
  });

  res.json({ok:true});
});

app.listen(3000);