import express from "express";
import {
  loginUser,
  registerFarmer,
  registerFarmerAgent,
  getFarmers,
  registerMediator,
  getMediators,
  getFarmersForDropdown,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import {
  validateFarmerAgentRegisterationInput,
  validateFarmerRegisterationInput,
  validateMediatorRegisterationInput,
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

// @desc    Register a new mediator
// @route   POST /api/user/register-mediator
// @acess   Private
router
  .route("/register-mediator")
  .post(
    [protect, isFarmerAgent, validateMediatorRegisterationInput],
    registerMediator
  );

// @desc    Get all mediators
// @route   GET /api/user/mediators
// @acess   Private
router.route("/mediators").get([protect, isFarmerAgent], getMediators);

// @desc    Get farmers for dropdown
// @route   GET /api/user/farmer/dropdown
// @acess   Private
router
  .route("/farmers/dropdown")
  .get([protect, isFarmerAgent], getFarmersForDropdown);

export default router;
