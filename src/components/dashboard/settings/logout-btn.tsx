"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";

import { Button } from "@/components/ui/button";

import Modal from "@/components/ui/choicelog-modal";

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
        Sair
      </Button>

      <Modal
        open={open}
        onOpenChange={setOpen}
        onConfirm={handleLogout}
        dialogTitle="Encerrar sessão"
        dialogDescription="Tem certeza que deseja encerrar sua sessão?"
        buttonText="Sim"
      />
    </>
  );
}