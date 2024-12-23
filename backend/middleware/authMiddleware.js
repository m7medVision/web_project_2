import { User } from "../models/User.js";
import { Session } from "../models/Session.js";
import { Op } from "sequelize";

export const authenticateUser = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1] || req.cookies?.token; // Changed to match cookie name

  if (!token) {
    return res.status(401).json({ error: "Authentication required" });
  }

  try {
    const session = await Session.findOne({
      where: {
        token,
        expiresAt: {
          [Op.gt]: new Date(), // Check if session hasn't expired
        },
      },
      include: User,
    });

    if (!session) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }

    req.user = session.User;
    next();
  } catch (error) {
    res.status(401).json({ error: "Authentication failed" });
  }
};
