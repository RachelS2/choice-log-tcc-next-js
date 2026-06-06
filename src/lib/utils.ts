import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { authClient } from "./auth-client";
import { UserAuthDTO } from "@/models/user";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function getUserAuthData(): Promise<UserAuthDTO | null> {
  const session = await authClient.getSession();
  if (!session.data?.user) {
    return null;
  }
  return {
    ...session.data.user,
    image: session.data.user.image ?? null,
  };
}
