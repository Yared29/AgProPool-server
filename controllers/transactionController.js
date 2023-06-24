import asyncHandler from "express-async-handler";
import Transaction from "../models/transactionModel.js";
import { isEmpty } from "../validations/isEmpty.js";

const getTransactions = asyncHandler(async (req, res) => {
  const transactions = await Transaction.find()
    .populate("createdBy")
    .sort({ createdAt: -1 });

  if (transactions) {
    res.status(201).json(transactions);
  } else {
    res.status(400);
    throw new Error("Error finding transaction data");
  }
});

const createTransaction = asyncHandler(async (req, res) => {
  const { farmer_name, crop, quantity } = req.body;

  const transaction = await Transaction.create({
    farmer_name,
    crop,
    quantity,
    createdBy: req.user.id,
  });

  if (transaction) {
    res.status(201).json(transaction.populate("createdBy"));
  } else {
    res.status(400);
    throw new Error("Invalid transaction data");
  }
});

export { getTransactions, createTransaction };
