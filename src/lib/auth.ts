import { Auth, betterAuth, BetterAuthOptions } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import {Resend} from "resend";
import { emailVerification } from "@/lib/email";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }), 
    session: {   
        expiresIn: 60 * 60 * 24 * 7, // 7 days if "Remember me" is enabled
        updateAge: 60 * 60 * 24, // Refresh session every 1 day
    }, 
    emailAndPassword: {
        enabled: true, 
        // TODO: Reativar a verificação de e-mail depois, quando o domínio tiver sido comprado
        
        // requireEmailVerification: true,
    // },
    // emailVerification: {
    //     sendVerificationEmail: async (params) => {
    //         const { user, url } = params;
    //         await emailVerification({
    //             username: user.name,
    //             email: user.email,
    //             url,
    //         });
    //     },
    //     sendOnSignUp: true,
    // },
    }
});
