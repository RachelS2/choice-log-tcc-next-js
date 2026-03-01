// app/api/dev/reset-users/route.ts

import { prisma } from "@/lib/prisma";

export async function DELETE() {
// Method to delete all users, sessions, accounts and verifications from the database. This is useful for testing purposes, but should not be exposed in production.
  if (process.env.NODE_ENV !== "development") {
    return new Response("Forbidden", { status: 403 });
  }

  console.log("Deleting all users, sessions, accounts and verifications from DEV database...");
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.verification.deleteMany();
  await prisma.user.deleteMany();

  return Response.json({ message: "All users deleted" });
}