import mongoose from "mongoose";

const transactionSchema = mongoose.Schema(
  {
    farmer: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    crop: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Crop",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
