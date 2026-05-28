import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { authClient } from "./auth-client";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function getUserId(): Promise<string> {
  const session = await authClient.getSession();

  const userId = session.data?.user?.id;

  if (!userId) {
    throw new Error("User not authenticated");
  }

  return userId;
}