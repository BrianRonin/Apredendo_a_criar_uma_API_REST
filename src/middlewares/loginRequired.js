import jwt from "jsonwebtoken";
import Staff from "../models/Staff";

export default async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      error: "login required",
    });
  }

  const [, token] = authorization.split(" ");

  try {
    const userData = jwt.verify(token, process.env.TOKEN_SECRET);
    const { id, email } = userData;
    const staff = await Staff.findOne({
      where: {
        id,
        email,
      },
    });

    if (!staff) {
      return res.status(401).json({
        error: "email or id invalid",
      });
    }

    req.userId = id;
    req.userEmail = email;
    return next();
  } catch (e) {
    return res.status(401).json({
      error: "token expired or invalid",
    });
  }
};
