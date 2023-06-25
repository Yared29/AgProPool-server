import Validator from "validator";
import { isEmpty } from "./isEmpty.js";

const validateFarmerAgentRegisterationInput = async (req, res, next) => {
  let data = req.body;
  let errors = {};
  data.name = !isEmpty(data.name) ? data.name : "";
  data.gender = !isEmpty(data.gender) ? data.gender : "";
  data.kebele = !isEmpty(data.kebele) ? data.kebele : "";
  data.phone = !isEmpty(data.phone) ? data.phone : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  if (Validator.isEmpty(data.gender)) {
    errors.gender = "Gender field is required";
  }

  if (Validator.isEmpty(data.kebele)) {
    errors.kebele = "Kebele field is required";
  }

  if (!Validator.isLength(data.phone, { min: 10, max: 14 })) {
    errors.phone = "Phone number must contain a minimum of 10 digit";
  }

  if (Validator.isEmpty(data.phone)) {
    errors.phone = "Phone field is required";
  }

  if (!Validator.isLength(data.password, { min: 6 })) {
    errors.password = "Password too short";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (!isEmpty(errors)) {
    res.status(400);
    return res.json({ message: errors });
  }

  next();
};

const validateFarmerRegisterationInput = async (req, res, next) => {
  let data = req.body;
  let errors = {};
  data.name = !isEmpty(data.name) ? data.name : "";
  data.phone = !isEmpty(data.phone) ? data.phone : "";
  data.kebele = !isEmpty(data.kebele) ? data.kebele : "";
  data.gender = !isEmpty(data.gender) ? data.gender : "";

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  if (Validator.isEmpty(data.kebele)) {
    errors.kebele = "Kebele field is required";
  }

  if (Validator.isEmpty(data.gender)) {
    errors.gender = "Gender field is required";
  }

  if (!Validator.isLength(data.phone, { min: 10, max: 14 })) {
    errors.phone = "Phone number must contain a minimum of 10 digit";
  }

  if (Validator.isEmpty(data.phone)) {
    errors.phone = "Phone field is required";
  }

  if (!isEmpty(errors)) {
    res.status(400);
    return res.json({ message: errors });
  }

  next();
};

const validateMediatorRegisterationInput = async (req, res, next) => {
  let data = req.body;
  let errors = {};
  data.name = !isEmpty(data.name) ? data.name : "";
  data.phone = !isEmpty(data.phone) ? data.phone : "";
  data.kebele = !isEmpty(data.kebele) ? data.kebele : "";
  data.gender = !isEmpty(data.gender) ? data.gender : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  if (Validator.isEmpty(data.kebele)) {
    errors.kebele = "Kebele field is required";
  }

  if (Validator.isEmpty(data.gender)) {
    errors.gender = "Gender field is required";
  }

  if (!Validator.isLength(data.phone, { min: 10, max: 14 })) {
    errors.phone = "Phone number must contain a minimum of 10 digit";
  }

  if (Validator.isEmpty(data.phone)) {
    errors.phone = "Phone field is required";
  }

  if (!Validator.isLength(data.password, { min: 6 })) {
    errors.password = "Password too short";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (!isEmpty(errors)) {
    res.status(400);
    return res.json({ message: errors });
  }

  next();
};

const validateAdminInput = async (req, res, next) => {
  let data = req.body;
  let errors = {};
  data.name = !isEmpty(data.name) ? data.name : "";
  data.phone = !isEmpty(data.phone) ? data.phone : "";
  data.gender = !isEmpty(data.gender) ? data.gender : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (Validator.isEmpty(data.gender)) {
    errors.gender = "Gender field is required";
  }

  if (!Validator.isLength(data.phone, { min: 10, max: 14 })) {
    errors.phone = "Phone number must contain a minimum of 10 digit";
  }

  if (Validator.isEmpty(data.phone)) {
    errors.phone = "Phone field is required";
  }

  if (!Validator.isLength(data.password, { min: 6 })) {
    errors.password = "Password too short";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (!isEmpty(errors)) {
    res.status(400);
    return res.json({ message: errors });
  }

  next();
};

export {
  validateFarmerAgentRegisterationInput,
  validateFarmerRegisterationInput,
  validateMediatorRegisterationInput,
  validateAdminInput,
};
