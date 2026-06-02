import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { authClient } from "./auth-client";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function getUserIdServer(): Promise<string> {
  const session = await authClient.getSession();

  const userId = session.data?.user?.id;

  if (!userId) {
    throw new Error("User not authenticated");
  }

  return userId;
}

export async function getUserIdClient(): Promise<string | undefined> {
  const session = await authClient.getSession();
  return session.data?.user?.id;
}