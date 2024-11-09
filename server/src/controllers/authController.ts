import { Request, Response, NextFunction } from "express";
import { authenticateUser } from "../services/authService";

// Controller for user authentication (login)
export const loginHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;
    const token = await authenticateUser(email, password);
    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};
