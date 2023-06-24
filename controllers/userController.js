import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";
import { isEmpty } from "../validations/isEmpty.js";

const loginUser = asyncHandler(async (req, res) => {
  const { phone, password } = req.body;
  if (!phone || !password) {
    res.status(401);
    throw new Error("Phone and password are required");
  }
  const user = await User.findOne({ phone }).select("-updatedAt -__v");

  if (user && (await user.matchPassword(password))) {
    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      telegramUsername: user.telegramUsername,
      firebaseUserId: user.firebaseUserId,
      locationName: user.locationName,
      location: user.location,
      role: user.role,
      createdAt: user.createdAt,
      isBlocked: user.isBlocked,
      token: generateToken(user._id, user.role),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const registerFarmerAgent = asyncHandler(async (req, res) => {
  const { name, phone, password } = req.body;

  const phoneExists = await User.findOne({ phone });

  if (phoneExists) {
    res.status(400);
    throw new Error("This phone number is already in use.");
  }

  const user = await User.create({
    name,
    password,
    phone,
    role: "farmer_agent",
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      phone: user.phone,
      role: user.role,
      token: generateToken(user._id, user.role),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const registerFarmer = asyncHandler(async (req, res) => {
  const { name, phone, age, kebele, gender } = req.body;

  const phoneExists = await User.findOne({ phone });

  if (phoneExists) {
    res.status(400);
    throw new Error("This phone number is already in use.");
  }

  const user = await User.create({
    name,
    kebele,
    gender,
    age,
    phone,
    registeredBy: req.user.id,
    role: "farmer",
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      kebele: user.kebele,
      age: user.age,
      phone: user.phone,
      gender: user.gender,
      createdAt: user.createdAt,
      registeredBy: user.registeredBy,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const getFarmers = asyncHandler(async (req, res) => {
  const farmers = await User.find({ role: "farmer" }).populate("registeredBy");

  if (farmers) {
    res.status(201).json(farmers);
  } else {
    res.status(400);
    throw new Error("Error finding farmers");
  }
});

const registerMediator = asyncHandler(async (req, res) => {
  const { name, phone, kebele, gender } = req.body;

  const phoneExists = await User.findOne({ phone });

  if (phoneExists) {
    res.status(400);
    throw new Error("This phone number is already in use.");
  }

  const user = await User.create({
    name,
    kebele,
    gender,
    phone,
    registeredBy: req.user.id,
    role: "mediator",
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      kebele: user.kebele,
      phone: user.phone,
      gender: user.gender,
      createdAt: user.createdAt,
      registeredBy: user.registeredBy,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const getMediators = asyncHandler(async (req, res) => {
  const farmers = await User.find({ role: "mediator" }).populate(
    "registeredBy"
  );

  if (farmers) {
    res.status(201).json(farmers);
  } else {
    res.status(400);
    throw new Error("Error finding farmers");
  }
});

const getFarmersForDropdown = asyncHandler(async (req, res) => {
  const farmerOptions = await User.aggregate([
    {
      $match: {
        role: "farmer",
      },
    },
    {
      $project: {
        value: "$_id",
        label: "$name",
      },
    },

    {
      $sort: {
        name: 1,
      },
    },
  ]);

  if (farmerOptions) {
    res.status(201).json(farmerOptions);
  } else {
    res.status(400);
    throw new Error("Error finding farmers data");
  }
});

export {
  loginUser,
  registerFarmerAgent,
  registerFarmer,
  getFarmers,
  registerMediator,
  getMediators,
  getFarmersForDropdown,
};
