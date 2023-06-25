import express from "express";
import {
  getTransactions,
  createTransaction,
  getCropTransactionsWithCount,
} from "../controllers/transactionController.js";
import { protect } from "../middleware/authMiddleware.js";
import { validatCreateTransactionInput } from "../validations/transactionValidator.js";
import { isAdminSuperAdminFarmerAgentOrMediator } from "../middleware/roleCheckMiddleware.js";

const router = express.Router();

// @desc    Get all transactions
// @route   GET /api/transaction
// @acess   Private
router
  .route("/")
  .get([protect, isAdminSuperAdminFarmerAgentOrMediator], getTransactions);

// @desc    Create a new transaction
// @route   POST /api/transaction/create
// @acess   Private
router
  .route("/create")
  .post(
    [
      protect,
      isAdminSuperAdminFarmerAgentOrMediator,
      validatCreateTransactionInput,
    ],
    createTransaction
  );

// @desc    Get crops transaction with count list
// @route   GET /api/transaction/crops-with-count
// @acess   Private
router
  .route("/crops-transaction-with-count")
  .get(
    [protect, isAdminSuperAdminFarmerAgentOrMediator],
    getCropTransactionsWithCount
  );
export default router;
