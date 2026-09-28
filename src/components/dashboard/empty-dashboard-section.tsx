"use client";
import { Plus, Sparkles } from "lucide-react";
import { NotificationContent } from "../ui/choicelog-notification-card";
import { Button } from "../ui/button";
import Link from "next/link";

export default function EmptyDashboardSection() {
    return (
        <NotificationContent icon={Sparkles} iconClassName="bg-blue-700"
            title="Seu dashboard começa com uma experiência"
            children={<Button
                asChild
                className="gap-2 bg-blue-700 hover:bg-blue-800"
            >
                <Link href="/dashboard/experiences/new-experience">
                    <Plus className="size-4" />
                    Registrar primeira experiência
                </Link>
            </Button>}
            description="Registre uma experiência de consumo para começar a acompanhar sua satisfação, seus hábitos e seus padrões de consumo." />
    )
}