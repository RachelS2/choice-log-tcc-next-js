import { IncomeRange } from "../../../generated/prisma";

export interface UpdateUserProfileDTO {
    name: string;
    email: string;
    incomeRange: IncomeRange;
    image?: string | null;
}

export interface UserAuthDTO {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    emailVerified: boolean;
    name: string;
    email: string;
    image?: string | null;
}

export interface UserCompleteDTO extends UserAuthDTO {
    incomeRange: IncomeRange;
}