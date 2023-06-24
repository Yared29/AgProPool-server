import asyncHandler from "express-async-handler";
import Transaction from "../models/transactionModel.js";
import Crop from "../models/cropModel.js";
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
      .populate("crop")
      .populate("farmer")
      .sort({ createdAt: -1 });
  } else {
    transactions = await Transaction.find()
      .populate("createdBy")
      .populate("crop")
      .populate("farmer")
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
  const { farmer, crop, quantity } = req.body;

  const transaction = await Transaction.create({
    farmer,
    crop,
    quantity,
    createdBy: req.user.id,
  });

  if (transaction) {
    res.status(201).json(await transaction.populate("createdBy"));
  } else {
    res.status(400);
    throw new Error("Invalid transaction data");
  }
});

const getCropTransactionsWithCount = asyncHandler(async (req, res) => {
  let aggregateArray = [];

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

    aggregateArray = [
      {
        $lookup: {
          from: "transactions",
          localField: "_id",
          foreignField: "crop",
          as: "transactions",
        },
      },
      {
        $match: {
          "transactions.createdAt": { $gte: startDate, $lte: endDate },
        },
      },
      {
        $project: {
          name: 1,
          createdAt: 1,
          quantity: { $sum: "$transactions.quantity" },
        },
      },
      {
        $sort: {
          quantity: -1,
        },
      },
      {
        $match: {
          quantity: { $gt: 0 },
        },
      },
    ];
  } else {
    aggregateArray = [
      {
        $lookup: {
          from: "transactions",
          localField: "_id",
          foreignField: "crop",
          as: "transactions",
        },
      },
      {
        $project: {
          name: 1,
          createdAt: 1,
          quantity: { $sum: "$transactions.quantity" },
        },
      },
      {
        $sort: {
          quantity: -1,
        },
      },
    ];
  }
  const transactionCropsQuantity = await Crop.aggregate(aggregateArray);

  if (transactionCropsQuantity) {
    res.status(201).json(transactionCropsQuantity);
  } else {
    res.status(400);
    throw new Error("Error finding transaction crops count data");
  }
});

export { getTransactions, createTransaction, getCropTransactionsWithCount };
