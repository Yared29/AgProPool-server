import asyncHandler from "express-async-handler";
import Kebele from "../models/kebeleModel.js";
import { isEmpty } from "../validations/isEmpty.js";

const getKebeles = asyncHandler(async (req, res) => {
  const kebeles = await Kebele.find().sort({ name: 1 }).populate("createdBy");

  if (kebeles) {
    res.status(201).json(kebeles);
  } else {
    res.status(400);
    throw new Error("Error finding kebeles data");
  }
});

const createKebele = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const kebeleExist = await Kebele.find({ name: name });
  if (kebeleExist) {
    res.status(400);
    throw new Error("Kebele already exist in database");
  }

  const kebele = await Kebele.create({
    name,
    createdBy: req.user.id,
  });

  if (kebele) {
    res.status(201).json(await kebele.populate("createdBy"));
  } else {
    res.status(400);
    throw new Error("Invalid kebele data");
  }
});

const getKebelesForDropdown = asyncHandler(async (req, res) => {
  const kebeleOptions = await Kebele.aggregate([
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

  if (kebeleOptions) {
    res.status(201).json(kebeleOptions);
  } else {
    res.status(400);
    throw new Error("Error finding kebeles data");
  }
});

export { getKebeles, createKebele, getKebelesForDropdown };
