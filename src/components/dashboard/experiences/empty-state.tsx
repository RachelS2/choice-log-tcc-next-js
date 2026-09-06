"use client";
import { Button } from "@/components/ui/button";
import { NotificationContent } from "@/components/ui/choicelog-notification-card";
import { AlertTriangle, type LucideIcon } from "lucide-react";
import { redirect } from "next/navigation";

export function ErrorConsumptionsState() {
    return (
        <main
            className="min-h-screen py-10 flex flex-col items-center justify-center"
        >
            <div className="max-w-xl shadow-md border-b border-blue-900 flex items-center justify-center w-full rounded-2xl bg-white max-w-5xl px-4 sm:px-6"
            >

                <NotificationContent
                    icon={AlertTriangle}
                    title="Não foi possível carregar seus consumos."
                    description="Ocorreu um erro ao buscar o histórico. Tente novamente em instantes."
                    children={
                        <Button className="bg-blue-900 text-white hover:bg-blue-800" onClick={() => {
                            redirect("/dashboard/experiences")
                        }}>
                            Tentar novamente
                        </Button>
                    }
                />
            </div>
        </main>
    )
}