import asyncHandler from "express-async-handler";
import Transaction from "../models/transactionModel.js";
import { isEmpty } from "../validations/isEmpty.js";

const getTransactions = asyncHandler(async (req, res) => {
  const transactions = await Transaction.find();

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
  });

  if (transaction) {
    res.status(201).json({
      _id: transaction._id,
      farmer_name: transaction.farmer_name,
      crop: transaction.crop,
      quantity: transaction.quantity,
    });
  } else {
    res.status(400);
    throw new Error("Invalid transaction data");
  }
});

export { getTransactions, createTransaction };
