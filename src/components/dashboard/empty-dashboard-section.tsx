"use client";
import { Sparkles } from "lucide-react";
import { NotificationContent } from "../ui/choicelog-notification-card";

export default function EmptyDashboardSection() {
    return (
        <NotificationContent icon={Sparkles} iconClassName="bg-blue-600" title="Seu dashboard começa com uma experiência"

            description="Registre uma experiência de consumo para começar a acompanhar sua satisfação, seus hábitos e seus padrões de consumo." />
    )
}