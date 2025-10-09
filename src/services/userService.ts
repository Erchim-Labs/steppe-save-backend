import { Insertable } from "kysely";
import { CustomError } from "../exceptions/CustomError";
import { encryptionHelper } from "../lib/encryptionHelper";
import { hideSensitiveData } from "../lib/hideDataHelper";
import { userRepository } from "../repositories/userRepository";
import { generateTokens } from "../utils/jwt";
import { Roundup } from "../types/db/types";
import { roundupRepository } from "../repositories/roundupRepository";
import { userAccountRepository } from "../repositories/userAccountRepository";
import { transactionRepository } from "../repositories/transactionRepository";

function estimateMissedAutoSaves(transactions: any[], start: Date, now: Date) {
  // const expectedWeeks = Math.ceil(
  //   (now.getTime() - start.getTime()) / (7 * 24 * 60 * 60 * 1000)
  // );
  // const actualWeeksWithAutoSaves = new Set(
  //   transactions
  //     .filter((t) => t.type === "auto")
  //     .map((t) => new Date(t.createdAt).getWeek())
  // ).size;
  // return Math.max(0, expectedWeeks - actualWeeksWithAutoSaves);
  return 0;
}

export const userService = {
  getUserById: async (id: string) => {
    const user = await userRepository.getById(id);
    if (!user) {
      throw new CustomError("User not found", 400);
    }
    return user;
  },
  // login: async (email: string, password: string) => {
  //   const user = await userRepository.getByEmail(email);
  //   if (!user || !user.password)
  //     throw new CustomError(
  //       "Oops! We couldn't log you in. Please double-check your email and password and try again.",
  //       400
  //     );
  //   const isValidPassword = await encryptionHelper.compare(
  //     password,
  //     user.password
  //   );
  //   if (!isValidPassword)
  //     throw new CustomError(
  //       "Oops! We couldn't log you in. Please double-check your email and password and try again.",
  //       400
  //     );
  //   const { accessToken, refreshToken } = generateTokens({
  //     id: user.id,
  //     role: user.role,
  //   });

  //   const sanitizedUser = hideSensitiveData(user, ["password"]);

  //   return { user: sanitizedUser, accessToken, refreshToken };
  // },
  // create: async (
  //   prefix: string,
  //   telNumber: string,
  //   password: string,
  //   nickName: string | null,
  //   email: string
  // ) => {
  //   const hasUser = await userRepository.getByEmail(email);
  //   if (hasUser)
  //     throw new CustomError("User already exists with this email.", 400);

  //   const hashedPassword = await encryptionHelper.encrypt(password);
  //   const user = await userRepository.create({
  //     prefix,
  //     telNumber,
  //     password: hashedPassword,
  //     nickName,
  //     email,
  //   });
  //   const { accessToken, refreshToken } = generateTokens({
  //     id: user.id,
  //     role: user.role,
  //   });

  //   const sanitizedUser = hideSensitiveData(user, ["password"]);
  //   return { user: sanitizedUser, accessToken, refreshToken };
  // },
  createRoundup: async (data: Insertable<Roundup>, issuerId: string) => {
    const user = await userRepository.getById(issuerId);
    if (!user) {
      throw new CustomError("User not found", 400);
    }
    const account = await userAccountRepository.getById(data.account_id);
    if (!account || account.user_id !== issuerId) {
      throw new CustomError("Account not found", 400);
    }
    data.account_id = account.id;
    data.user_id = user.id;
    data.created_at = new Date();
    data.updated_at = new Date();

    const roundup = await roundupRepository.create(data);

    return roundup;
  },
  getUserSavingsData: async (userId: string) => {
    const roundup = await roundupRepository.getLatestUserRoundup(userId);
    if (!roundup) {
      throw new CustomError("User has no roundup data", 400);
    }

    const transactions = await transactionRepository.getByUserId(userId);
    if (!transactions) {
      throw new CustomError("User has no transactions", 400);
    }
    const now = new Date();
    const start = new Date(roundup.created_at);
    const weeksElapsed = Math.max(
      1,
      Math.ceil((now.getTime() - start.getTime()) / 1000 / 60 / 60 / 24 / 7)
    );
    const totalSaved = transactions.reduce((sum, t) => sum + t.amount, 0);
    const averageWeeklySavings = totalSaved / weeksElapsed;

    const remaining = Math.max(0, roundup.target_amount - totalSaved);
    const weeksRemaining =
      averageWeeklySavings > 0
        ? Math.ceil(remaining / averageWeeklySavings)
        : Infinity;
    const missedAutoSaves = estimateMissedAutoSaves(transactions, start, now);
    return {
      userId: userId,
      roundupGoal: roundup.target_amount,
      roundupTitle: roundup.title,
      totalSaved: totalSaved,
      avgWeekly: averageWeeklySavings,
      weeksRemaining: weeksRemaining,
      missedAutoSaves: missedAutoSaves,
    };
  },
};
