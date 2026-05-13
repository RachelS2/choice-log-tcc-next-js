"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { LogOut } from "lucide-react";

import { authClient } from "@/lib/auth-client";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ConfirmLogoutModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => Promise<void>;
}

function ConfirmLogoutModal({
  open,
  onOpenChange,
  onConfirm,
}: ConfirmLogoutModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Confirm Logout</DialogTitle>

          <DialogDescription>
            Are you sure you want to logout?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-4">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>

          <Button
            onClick={onConfirm}
            className="bg-red-600 text-white hover:bg-red-700"
          >
            Logout
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

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

      <ConfirmLogoutModal
        open={open}
        onOpenChange={setOpen}
        onConfirm={handleLogout}
      />
    </>
  );
}