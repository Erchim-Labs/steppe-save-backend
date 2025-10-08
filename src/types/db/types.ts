import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

import type { ROLES, GROWTH_STAGES, ACCOUNT_TYPE } from "./enums";

export type Roundup = {
    id: Generated<string>;
    user_id: string;
    title: string;
    target_amount: Generated<number>;
    current_amount: Generated<number>;
    account_id: string;
    created_at: Generated<Timestamp>;
    updated_at: Generated<Timestamp>;
};
export type Transaction = {
    id: Generated<string>;
    from_user_id: string;
    amount: number;
    to_user_id: string;
    created_at: Generated<Timestamp>;
    updated_at: Generated<Timestamp>;
};
export type Tree = {
    id: Generated<string>;
    roundup_id: string;
    name: string | null;
    growth_percentage: Generated<number>;
    created_at: Generated<Timestamp>;
    updated_at: Generated<Timestamp>;
};
export type User = {
    id: Generated<string>;
    prefix: Generated<string>;
    telNumber: string | null;
    password: string;
    nickName: string | null;
    email: string;
    role: Generated<ROLES>;
};
export type UserAccountInfo = {
    id: Generated<string>;
    user_id: string;
    balance: Generated<number>;
    account_type: Generated<string>;
    created_at: Generated<Timestamp>;
    updated_at: Generated<Timestamp>;
};
export type DB = {
    Roundup: Roundup;
    Transaction: Transaction;
    Tree: Tree;
    User: User;
    UserAccountInfo: UserAccountInfo;
};
