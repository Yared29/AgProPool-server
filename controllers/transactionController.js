import asyncHandler from "express-async-handler";
import Transaction from "../models/transactionModel.js";
import { isEmpty } from "../validations/isEmpty.js";

const getTransactions = asyncHandler(async (req, res) => {
  let transactions;
  if (req.query.selectedDate) {
    const targetDate = new Date(req.query.selectedDate);

    const startDate = new Date(
      targetDate.getFullYear(),
      targetDate.getMonth(),
      targetDate.getDate(),
      0,
      0,
      0
    );

    const endDate = new Date(
      targetDate.getFullYear(),
      targetDate.getMonth(),
      targetDate.getDate(),
      23,
      59,
      59
    );

    console.log(targetDate);
    transactions = await Transaction.find({
      createdAt: { $gte: startDate, $lte: endDate },
    })
      .populate("createdBy")
      .sort({ createdAt: -1 });
  } else {
    transactions = await Transaction.find()
      .populate("createdBy")
      .sort({ createdAt: -1 });
  }

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
