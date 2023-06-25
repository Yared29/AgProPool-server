import { isEmpty } from "../validations/isEmpty.js";

const isSuperAdmin = async (req, res, next) => {
  if (isEmpty(req.user)) {
    res.status(403);
    return res.json({
      message: "Unauthorized, Token expired",
    });
  }
  if (req.user.role != "super_admin") {
    res.status(403);
    return res.json({
      message: "Only super admins can access this route",
    });
  }
  next();
};

const isAdmin = async (req, res, next) => {
  if (isEmpty(req.user)) {
    res.status(403);
    return res.json({
      message: "Unauthorized, Token expired",
    });
  }
  if (!["super_admin", "admin"].includes(req.user.role)) {
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
  if (!["super_admin", "admin", "farmer_agent"].includes(req.user.role)) {
    res.status(403);
    return res.json({
      message: "Only farmer agent can access this route",
    });
  }
  next();
};

const isMediator = async (req, res, next) => {
  if (isEmpty(req.user)) {
    res.status(403);
    return res.json({
      message: "Unauthorized, Token expired",
    });
  }
  if (!["super_admin", "admin", "mediator"].includes(req.user.role)) {
    res.status(403);
    return res.json({
      message: "Only farmer agent can access this route",
    });
  }
  next();
};

const isAdminSuperAdminFarmerAgentOrMediator = (req, res, next) => {
  if (
    ["super_admin", "admin", "farmer_agent", "mediator"].includes(req.user.role)
  )
    return next();

  return res.status(403).json({
    message: "Forbidden",
  });
};

export {
  isSuperAdmin,
  isAdmin,
  isFarmerAgent,
  isMediator,
  isAdminSuperAdminFarmerAgentOrMediator,
};
