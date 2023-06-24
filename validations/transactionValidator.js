import Validator from "validator";
import { isEmpty } from "./isEmpty.js";

const validatCreateTransactionInput = async (req, res, next) => {
  let data = req.body;
  let errors = {};
  data.farmer = !isEmpty(data.farmer) ? data.farmer : "";
  data.crop = !isEmpty(data.crop) ? data.crop : "";
  data.quantity = !isEmpty(data.quantity) ? "" + data.quantity : "";

  if (Validator.isEmpty(data.farmer)) {
    errors.farmer = "Farmer name field is required";
  }

  if (Validator.isEmpty(data.crop)) {
    errors.crop = "Crop field is required";
  }

  if (Validator.isEmpty(data.quantity)) {
    errors.quantity = "Quantity field is required";
  }

  if (!Validator.isNumeric(data.quantity)) {
    errors.quantity = "Quantity must be a number type";
  }

  if (!isEmpty(errors)) {
    res.status(400);
    return res.json({ message: errors });
  }

  next();
};

export { validatCreateTransactionInput };
