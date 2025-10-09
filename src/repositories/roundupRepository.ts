import { db } from "../utils/db";
import { Roundup } from "../types/db/types";
import { Updateable, Insertable } from "kysely";

export const roundupRepository = {
  create: async (data: Insertable<Roundup>) => {
    const roundup = await db
      .insertInto("Roundup")
      .values(data)
      .returningAll()
      .executeTakeFirstOrThrow(() => new Error("Couldn't create the roundup."));

    return roundup;
  },
  update: async (id: string, data: Updateable<Roundup>) => {
    const roundup = await db
      .updateTable("Roundup")
      .returningAll()
      .set(data)
      .where("id", "=", id)
      .executeTakeFirstOrThrow(() => new Error("Couldn't update the roundup."));

    return roundup;
  },
  delete: async (id: string) => {
    const roundup = await db
      .deleteFrom("Roundup")
      .returningAll()
      .where("Roundup.id", "=", id)
      .executeTakeFirstOrThrow(() => new Error("Couldn't delete the roundup."));

    return roundup;
  },
  getById: async (id: string) => {
    const roundup = await db
      .selectFrom("Roundup")
      .selectAll()
      .where("Roundup.id", "=", id)
      .executeTakeFirst();

    return roundup;
  },
  getByUserId: async (userId: string) => {
    const roundup = await db
      .selectFrom("Roundup")
      .selectAll()
      .where("Roundup.user_id", "=", userId)
      .execute();

    return roundup;
  },
  getLatestUserRoundup: async (userId: string) => {
    const roundup = await db
      .selectFrom("Roundup")
      .selectAll()
      .where("Roundup.user_id", "=", userId)
      .orderBy("Roundup.created_at", "desc")
      .executeTakeFirst();

    return roundup;
  },
};
