import asyncHandler from "express-async-handler";
import Crop from "../models/cropModel.js";
import { isEmpty } from "../validations/isEmpty.js";

const getCrops = asyncHandler(async (req, res) => {
  const crops = await Crop.find().populate("createdBy").sort({ name: -1 });

  if (crops) {
    res.status(201).json(crops);
  } else {
    res.status(400);
    throw new Error("Error finding crops data");
  }
});

const createCrop = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const cropExist = await Crop.find({ name: name });
  if (cropExist) {
    res.status(400);
    throw new Error("Crop already exist in database");
  }
  const crop = await Crop.create({
    name,
    createdBy: req.user.id,
  });

  if (crop) {
    res.status(201).json(await crop.populate("createdBy"));
  } else {
    res.status(400);
    throw new Error("Invalid crop data");
  }
});

const getCropsForDropdown = asyncHandler(async (req, res) => {
  const cropOptions = await Crop.aggregate([
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

  if (cropOptions) {
    res.status(201).json(cropOptions);
  } else {
    res.status(400);
    throw new Error("Error finding crops data");
  }
});
export { getCrops, createCrop, getCropsForDropdown };
