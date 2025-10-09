import { Insertable } from "kysely";

import { db } from "../utils/db";
import logger from "../config/winston";
import { config } from "../config/config";
import {
  User,
  UserAccountInfo,
  Roundup,
  Tree,
  Transaction,
} from "../types/db/types";
import { ROLES } from "../types/db/enums";

const users: Insertable<User>[] = [
  {
    id: "b156e14a-d5d6-4638-9158-bf58521b21fe",
    phone: "+976 80 870 027",
    first_name: "Дөлгөөн",
    last_name: "Баттулга",
    first_name_en: "Dulguun",
    last_name_en: "Battulga",
    email: "bdulguunod@gmail.com",
    role: ROLES.USER,
  },
];

const userAccounts: Insertable<UserAccountInfo>[] = [
  {
    id: "c267f25b-e6e7-4748-a269-cg69632c32gf",
    user_id: "b156e14a-d5d6-4638-9158-bf58521b21fe",
    balance: 250000,
    account_type: "savings",
    created_at: new Date("2025-01-15"),
    updated_at: new Date("2025-10-09"),
  },
  {
    id: "d378g36c-f7f8-4859-b37a-dh70743d43hg",
    user_id: "b156e14a-d5d6-4638-9158-bf58521b21fe",
    balance: 125000,
    account_type: "flexible",
    created_at: new Date("2025-02-20"),
    updated_at: new Date("2025-10-09"),
  },
];

const roundups: Insertable<Roundup>[] = [
  {
    id: "e489h47d-a8a9-496a-c48b-ei81854e54ih",
    user_id: "b156e14a-d5d6-4638-9158-bf58521b21fe",
    title: "Green Future Fund",
    target_amount: 500000,
    current_amount: 342000,
    account_id: "c267f25b-e6e7-4748-a269-cg69632c32gf",
    created_at: new Date("2025-03-10"),
    updated_at: new Date("2025-10-09"),
  },
  {
    id: "f59ai58e-b9ba-5a7b-d59c-fj92965f65ji",
    user_id: "b156e14a-d5d6-4638-9158-bf58521b21fe",
    title: "Emergency Savings",
    target_amount: 1000000,
    current_amount: 650000,
    account_id: "d378g36c-f7f8-4859-b37a-dh70743d43hg",
    created_at: new Date("2025-04-01"),
    updated_at: new Date("2025-10-09"),
  },
];

const trees: Insertable<Tree>[] = [
  {
    id: "g6abj69f-caca-6b8c-e6ad-gk03a76g76kj",
    roundup_id: "e489h47d-a8a9-496a-c48b-ei81854e54ih",
    name: "Oak Tree",
    growth_percentage: 68,
    created_at: new Date("2025-03-10"),
    updated_at: new Date("2025-10-09"),
  },
  {
    id: "h7bck7ag-dbdb-7c9d-f7be-hl14b87h87lk",
    roundup_id: "e489h47d-a8a9-496a-c48b-ei81854e54ih",
    name: "Pine Tree",
    growth_percentage: 45,
    created_at: new Date("2025-05-15"),
    updated_at: new Date("2025-10-09"),
  },
  {
    id: "i8cdl8bh-ecec-8dae-g8cf-im25c98i98ml",
    roundup_id: "f59ai58e-b9ba-5a7b-d59c-fj92965f65ji",
    name: "Birch Tree",
    growth_percentage: 65,
    created_at: new Date("2025-04-01"),
    updated_at: new Date("2025-10-09"),
  },
];

const transactions: Insertable<Transaction>[] = [
  {
    id: "j9dem9ci-fefe-9ebe-h9dg-jn36da9j99nm",
    from_user_id: "b156e14a-d5d6-4638-9158-bf58521b21fe",
    to_user_id: "b156e14a-d5d6-4638-9158-bf58521b21fe",
    amount: 50000,
    created_at: new Date("2025-09-15"),
    updated_at: new Date("2025-09-15"),
  },
  {
    id: "k0efn0dj-gfgf-9fcf-i9eh-ko47eb0k00on",
    from_user_id: "b156e14a-d5d6-4638-9158-bf58521b21fe",
    to_user_id: "b156e14a-d5d6-4638-9158-bf58521b21fe",
    amount: 75000,
    created_at: new Date("2025-10-01"),
    updated_at: new Date("2025-10-01"),
  },
];

export async function insertSeed() {
  try {
    // Delete in reverse order of foreign key dependencies
    await db.deleteFrom("Transaction").execute();
    await db.deleteFrom("Tree").execute();
    await db.deleteFrom("Roundup").execute();
    await db.deleteFrom("UserAccountInfo").execute();
    await db.deleteFrom("User").execute();

    // Insert in order of dependencies
    await db.insertInto("User").values(users).returningAll().execute();
    await db
      .insertInto("UserAccountInfo")
      .values(userAccounts)
      .returningAll()
      .execute();
    await db.insertInto("Roundup").values(roundups).returningAll().execute();
    await db.insertInto("Tree").values(trees).returningAll().execute();
    await db
      .insertInto("Transaction")
      .values(transactions)
      .returningAll()
      .execute();

    logger.info(`Seeding done. Inserted data to DB: ${config.PGDATABASE}`);
  } catch (error) {
    logger.error("Seeding failed:", error);
    throw error;
  }
}

insertSeed();
