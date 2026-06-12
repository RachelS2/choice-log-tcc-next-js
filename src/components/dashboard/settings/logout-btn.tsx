"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";

import { Button } from "@/components/ui/button";

import Modal from "@/components/ui/modal";

export default function LogoutButton() {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  async function handleLogout() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in");
          router.refresh();
        },
      },
    });

    setOpen(false);
  }

  return (
    <>
      <Button
        variant="outline"
        type="button"
        size="sm"
        className="w-24 h-9 text-blue-500 bg-white/80 text-md shadow-md hover:text-blue-600"
        onClick={() => setOpen(true)}
      >
        Logout
      </Button>

      <Modal
        open={open}
        onOpenChange={setOpen}
        onConfirm={handleLogout}
        dialogTitle="Confirm Logout"
        dialogDescription="Are you sure you want to logout?"
        buttonText="Logout"
      />
    </>
  );
}