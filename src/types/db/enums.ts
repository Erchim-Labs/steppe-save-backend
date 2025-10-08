export const ROLES = {
    ADMIN: "ADMIN",
    USER: "USER"
} as const;
export type ROLES = (typeof ROLES)[keyof typeof ROLES];
export const GROWTH_STAGES = {
    STAGE_1: "STAGE_1",
    STAGE_2: "STAGE_2",
    STAGE_3: "STAGE_3",
    STAGE_4: "STAGE_4"
} as const;
export type GROWTH_STAGES = (typeof GROWTH_STAGES)[keyof typeof GROWTH_STAGES];
export const ACCOUNT_TYPE = {
    LOCKED_TERM: "LOCKED_TERM",
    FLEXIBLE_TERM: "FLEXIBLE_TERM",
    AUTO_INVESTMENT_TERM: "AUTO_INVESTMENT_TERM"
} as const;
export type ACCOUNT_TYPE = (typeof ACCOUNT_TYPE)[keyof typeof ACCOUNT_TYPE];
