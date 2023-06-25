import express from "express";
import {
  getKebeles,
  createKebele,
  getKebelesForDropdown,
} from "../controllers/kebeleController.js";
import { protect } from "../middleware/authMiddleware.js";
import { isAdminSuperAdminFarmerAgentOrMediator } from "../middleware/roleCheckMiddleware.js";

const router = express.Router();

// @desc    Get all kebeles
// @route   GET /api/kebele
// @acess   Private
router
  .route("/")
  .get([protect, isAdminSuperAdminFarmerAgentOrMediator], getKebeles);

// @desc    Add a new kebele
// @route   POST /api/kebele/add
// @acess   Private
router
  .route("/add")
  .post([protect, isAdminSuperAdminFarmerAgentOrMediator], createKebele);

// @desc    Get kebeles for dropdown
// @route   GET /api/kebele/dropdown
// @acess   Private
router
  .route("/dropdown")
  .get(
    [protect, isAdminSuperAdminFarmerAgentOrMediator],
    getKebelesForDropdown
  );

export default router;
