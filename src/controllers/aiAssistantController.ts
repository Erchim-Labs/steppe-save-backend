import { Request, Response, NextFunction } from "express";
import { idSchema, loginSchema } from "../validations/sharedSchema";
import { CustomError } from "../exceptions/CustomError";
import { AuthenticatedRequest } from "../../custom";
import { db } from "../utils/db";
import { userService } from "../services/userService";
import { aiGrowthService } from "../services/aiGrowthService";

export const aiAssistantController = {
  treeyAssistant: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user_id } = req.body;
      if (!user_id) {
        throw new CustomError("Could not parse user_id from body request", 400);
      }
      const user = await userService.getUserById(user_id);
      if (!user) {
        throw new CustomError("User not found", 400);
      }

      const response = await aiGrowthService.treeyAssistant(
        user_id,
        req.body.message
      );
      res.status(200).json({
        success: true,
        data: {
          user_id: user_id,
          reply: response.choices[0].message.content,
        },
      });
    } catch (error) {
      next(error);
    }
  },
};
