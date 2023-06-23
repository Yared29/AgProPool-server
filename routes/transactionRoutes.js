import express from "express";
import {
  getTransactions,
  createTransaction,
} from "../controllers/transactionController.js";
import { protect } from "../middleware/authMiddleware.js";
import { validatCreateTransactionInput } from "../validations/transactionValidator.js";
import { isFarmerAgent } from "../middleware/roleCheckMiddleware.js";

const router = express.Router();

// @desc    Get all transactions
// @route   GET /api/transaction/all
// @acess   Private
router.route("/all").get([protect, isFarmerAgent], getTransactions);

// @desc    Create a new transaction
// @route   POST /api/transaction/create
// @acess   Private
router
  .route("/create")
  .post(
    [protect, isFarmerAgent, validatCreateTransactionInput],
    createTransaction
  );

export default router;
