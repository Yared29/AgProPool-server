import express from "express";
import {
  getCrops,
  createCrop,
  getCropsForDropdown,
} from "../controllers/cropController.js";
import { protect } from "../middleware/authMiddleware.js";
import { isAdminSuperAdminFarmerAgentOrMediator } from "../middleware/roleCheckMiddleware.js";

const router = express.Router();

// @desc    Get all crops
// @route   GET /api/crop
// @acess   Private
router
  .route("/")
  .get([protect, isAdminSuperAdminFarmerAgentOrMediator], getCrops);

// @desc    Add a new crop
// @route   POST /api/crop/add
// @acess   Private
router
  .route("/add")
  .post([protect, isAdminSuperAdminFarmerAgentOrMediator], createCrop);

// @desc    Get crops for dropdown
// @route   GET /api/crop/dropdown
// @acess   Private
router
  .route("/dropdown")
  .get([protect, isAdminSuperAdminFarmerAgentOrMediator], getCropsForDropdown);

export default router;
