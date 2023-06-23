import mongoose from "mongoose";

const transactionSchema = mongoose.Schema(
  {
    farmer_name: {
      type: String,
      required: true,
    },
    crop: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
