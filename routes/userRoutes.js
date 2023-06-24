import express from "express";
import {
  loginUser,
  registerFarmer,
  registerFarmerAgent,
  getFarmers,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import {
  validateFarmerAgentRegisterationInput,
  validateFarmerRegisterationInput,
} from "../validations/registrationValidator.js";
import { isFarmerAgent } from "../middleware/roleCheckMiddleware.js";

const router = express.Router();

// @desc    Login user
// @route   POST /api/user/login-user
// @acess   Public
router.route("/login-user").post(loginUser);

// @desc    Register a new farmer
// @route   POST /api/user/register-farmer
// @acess   Private
router
  .route("/register-farmer-agent")
  .post([validateFarmerAgentRegisterationInput], registerFarmerAgent);

// @desc    Register a new farmer
// @route   POST /api/user/register-farmer
// @acess   Private
router
  .route("/register-farmer")
  .post(
    [protect, isFarmerAgent, validateFarmerRegisterationInput],
    registerFarmer
  );

// @desc    Get all farmers
// @route   GET /api/user/farmers
// @acess   Private
router.route("/farmers").get([protect, isFarmerAgent], getFarmers);

export default router;
