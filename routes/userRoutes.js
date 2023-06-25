import express from "express";
import {
  loginUser,
  registerAdmin,
  registerFarmer,
  registerFarmerAgent,
  getFarmers,
  registerMediator,
  getMediators,
  getFarmersForDropdown,
  getAdmins,
  getFarmerAgents,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import {
  validateFarmerAgentRegisterationInput,
  validateFarmerRegisterationInput,
  validateMediatorRegisterationInput,
  validateAdminInput,
} from "../validations/registrationValidator.js";
import {
  isFarmerAgent,
  isAdmin,
  isSuperAdmin,
  isAdminSuperAdminFarmerAgentOrMediator,
} from "../middleware/roleCheckMiddleware.js";

const router = express.Router();

// @desc    Login user
// @route   POST /api/user/login-user
// @acess   Public
router.route("/login-user").post(loginUser);

// @desc    Register a new admin
// @route   POST /api/user/register-admin
// @acess   Private
router
  .route("/register-admin")
  .post([protect, validateAdminInput, isSuperAdmin], registerAdmin);

// @desc    Register a new farmer
// @route   POST /api/user/register-farmer
// @acess   Private
router
  .route("/register-farmer-agent")
  .post(
    [protect, validateFarmerAgentRegisterationInput, isAdmin],
    registerFarmerAgent
  );

// @desc    Register a new farmer
// @route   POST /api/user/register-farmer
// @acess   Private
router
  .route("/register-farmer")
  .post(
    [
      protect,
      isAdminSuperAdminFarmerAgentOrMediator,
      validateFarmerRegisterationInput,
    ],
    registerFarmer
  );

// @desc    Get all farmers
// @route   GET /api/user/farmers
// @acess   Private
router
  .route("/farmers")
  .get([protect, isAdminSuperAdminFarmerAgentOrMediator], getFarmers);

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
  .get(
    [protect, isAdminSuperAdminFarmerAgentOrMediator],
    getFarmersForDropdown
  );

// @desc    Get all admins
// @route   GET /api/user/admins
// @acess   Private
router.route("/admins").get([protect, isSuperAdmin], getAdmins);

// @desc    Get all farmer-agents
// @route   GET /api/user/farmer-agents
// @acess   Private
router.route("/farmer-agents").get([protect, isAdmin], getFarmerAgents);

export default router;
