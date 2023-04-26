import express from "express";
import cors from "cors";
import TransactionModal from "./models/transaction.js";
import mongoose from "mongoose";
import env from "dotenv";
env.config();
const app = express();

// app.use(cors());
app.use(express.json());
app.use(express.static("public"));
mongoose.connect(process.env.MONGO_URL);

app.post("/api/transaction", async (req, res) => {
    const { name, price, date, description } = req.body;
    const transaction = await TransactionModal.create( { name, price, date, description } );
    res.json(transaction);
});
app.get('/api/transactions', async (req,res) => {
   const  transactions =  await TransactionModal.find();
   res.json(transactions);
});
if(process.env.port){
  app.listen( process.env.port || 5000 , () => {
    console.log("Server is Working!");
  });
}

export default app;