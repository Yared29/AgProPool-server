import express from "express";
import {
  getCrops,
  createCrop,
  getCropsForDropdown,
} from "../controllers/cropController.js";
import { protect } from "../middleware/authMiddleware.js";
import { isFarmerAgent } from "../middleware/roleCheckMiddleware.js";

const router = express.Router();

// @desc    Get all crops
// @route   GET /api/crop
// @acess   Private
router.route("/").get([protect, isFarmerAgent], getCrops);

// @desc    Add a new crop
// @route   POST /api/crop/add
// @acess   Private
router.route("/add").post([protect, isFarmerAgent], createCrop);

// @desc    Get crops for dropdown
// @route   GET /api/crop/dropdown
// @acess   Private
router.route("/dropdown").get([protect, isFarmerAgent], getCropsForDropdown);

// // @desc    Get crops crop with count list
// // @route   GET /api/crop/crops-with-count
// // @acess   Private
// router
//   .route("/crops-with-count")
//   .get([protect, isFarmerAgent], getCropCropsWithCount);
export default router;
