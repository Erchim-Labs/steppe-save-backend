import { db } from "../utils/db";
import { Transaction } from "../types/db/types";
import { Updateable, Insertable } from "kysely";

export const transactionRepository = {
  create: async (data: Insertable<Transaction>) => {
    const transaction = await db
      .insertInto("Transaction")
      .values(data)
      .returningAll()
      .executeTakeFirstOrThrow(
        () => new Error("Couldn't create the transaction.")
      );

    return transaction;
  },
  update: async (id: string, data: Updateable<Transaction>) => {
    const transaction = await db
      .updateTable("Transaction")
      .returningAll()
      .set(data)
      .where("id", "=", id)
      .executeTakeFirstOrThrow(
        () => new Error("Couldn't update the transaction.")
      );

    return transaction;
  },
  delete: async (id: string) => {
    const transaction = await db
      .deleteFrom("Transaction")
      .returningAll()
      .where("Transaction.id", "=", id)
      .executeTakeFirstOrThrow(
        () => new Error("Couldn't delete the transaction.")
      );

    return transaction;
  },
  getById: async (id: string) => {
    const transaction = await db
      .selectFrom("Transaction")
      .selectAll()
      .where("Transaction.id", "=", id)
      .executeTakeFirst();

    return transaction;
  },
  getByUserId: async (userId: string, intervalDay?: number) => {
    const transaction = await db
      .selectFrom("Transaction")
      .selectAll()
      .where("Transaction.from_user_id", "=", userId)
      .orderBy("Transaction.created_at", "desc")
      .execute();

    return transaction;
  },
};
