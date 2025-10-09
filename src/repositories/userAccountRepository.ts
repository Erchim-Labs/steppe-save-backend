import { db } from "../utils/db";
import { UserAccountInfo } from "../types/db/types";
import { Updateable, Insertable } from "kysely";

export const userAccountRepository = {
  create: async (data: Insertable<UserAccountInfo>) => {
    const userAccount = await db
      .insertInto("UserAccountInfo")
      .values(data)
      .returningAll()
      .executeTakeFirstOrThrow(
        () => new Error("Couldn't create the user account.")
      );

    return userAccount;
  },
  update: async (id: string, data: Updateable<UserAccountInfo>) => {
    const userAccount = await db
      .updateTable("UserAccountInfo")
      .returningAll()
      .set(data)
      .where("id", "=", id)
      .executeTakeFirstOrThrow(
        () => new Error("Couldn't update the user account.")
      );

    return userAccount;
  },
  delete: async (id: string) => {
    const userAccount = await db
      .deleteFrom("UserAccountInfo")
      .returningAll()
      .where("UserAccountInfo.id", "=", id)
      .executeTakeFirstOrThrow(
        () => new Error("Couldn't delete the user account.")
      );

    return userAccount;
  },
  getById: async (id: string) => {
    const userAccount = await db
      .selectFrom("UserAccountInfo")
      .selectAll()
      .where("UserAccountInfo.id", "=", id)
      .executeTakeFirst();

    return userAccount;
  },
  getByUserId: async (userId: string) => {
    const userAccount = await db
      .selectFrom("UserAccountInfo")
      .selectAll()
      .where("UserAccountInfo.user_id", "=", userId)
      .execute();

    return userAccount;
  },
};
