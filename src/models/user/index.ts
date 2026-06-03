import { IncomeRange } from "../../../generated/prisma";

export interface UserProfileViewDTO {
    name: string;
    email: string;
    image: string | null;
    emailVerified: boolean;
    incomeRange: IncomeRange;
}
