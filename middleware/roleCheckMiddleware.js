import { isEmpty } from "../validations/isEmpty.js";

const isAdmin = async (req, res, next) => {
  if (isEmpty(req.user)) {
    res.status(403);
    return res.json({
      message: "Unauthorized, Token expired",
    });
  }
  if (req.user.role != "admin") {
    res.status(403);
    return res.json({
      message: "Only admins can access this route",
    });
  }
  next();
};

const isFarmerAgent = async (req, res, next) => {
  if (isEmpty(req.user)) {
    res.status(403);
    return res.json({
      message: "Unauthorized, Token expired",
    });
  }
  if (req.user.role != "farmer_agent") {
    res.status(403);
    return res.json({
      message: "Only farmer agent can access this route",
    });
  }
  next();
};

export { isAdmin, isFarmerAgent };
