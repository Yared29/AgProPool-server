import express from "express";
import {
  getKebeles,
  createKebele,
  getKebelesForDropdown,
} from "../controllers/kebeleController.js";
import { protect } from "../middleware/authMiddleware.js";
import { isFarmerAgent } from "../middleware/roleCheckMiddleware.js";

const router = express.Router();

// @desc    Get all kebeles
// @route   GET /api/kebele
// @acess   Private
router.route("/").get([protect, isFarmerAgent], getKebeles);

// @desc    Add a new kebele
// @route   POST /api/kebele/add
// @acess   Private
router.route("/add").post([protect, isFarmerAgent], createKebele);

// @desc    Get kebeles for dropdown
// @route   GET /api/kebele/dropdown
// @acess   Private
router.route("/dropdown").get([protect, isFarmerAgent], getKebelesForDropdown);

export default router;
