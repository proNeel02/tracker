import { Schema, model } from "mongoose";

const TransactionSchema = new Schema({
  name: { type: String, required: true },
  price:{type:Number, required: true},
  date: { type: Date, required: true },
  description: { type: String, required: true },
});

const TransactionModal = model('Transaction', TransactionSchema);

export default TransactionModal;