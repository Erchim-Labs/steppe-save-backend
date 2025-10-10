import { openAiClient } from "..";
import { CustomError } from "../exceptions/CustomError";
import { userRepository } from "../repositories/userRepository";
import { db } from "../utils/db";
import { userService } from "./userService";

export const aiGrowthService = {
  generateWeeklyInsights: async () => {
    return "Weekly growth summary generated.";
  },
  treeyAssistant: async (userId: string, message: string) => {
    const user = await userRepository.getById(userId);
    if (!user) {
      throw new CustomError("User not found", 400);
    }
    const userData = await userService.getUserSavingsData(userId);
    const prompt = `
        You are Treey 🌳, a friendly AI savings coach.
        User data:
        - Current savings: ₮${userData.totalSaved}
        - Goal: ₮${userData.roundupGoal}
        - Weekly average: ₮${userData.avgWeekly}
        - Weeks remaining: ${userData.weeksRemaining}
        - Username: Team 2

        Answer concisely and positively.
        User asked: "${message}".
        
        Respond as Treey 🌳 with warmth and motivation.
      - Give concise yet insightful advice
      - Suggest practical actions if needed
      - Use positive and encouraging tone
        `;

    const response = await openAiClient.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "system", content: prompt }],
    });

    return response;
  },
};
