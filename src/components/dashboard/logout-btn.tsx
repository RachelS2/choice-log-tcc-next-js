"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { LogOut } from "lucide-react";

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
          router.push("/login");
          router.refresh();
        },
      },
    });

    setOpen(false);
  }

  return (
    <>
      <Button
        //variant="ghost"
        size="icon"
        onClick={() => setOpen(true)}
      >
        <LogOut className="h-5 w-5" />
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