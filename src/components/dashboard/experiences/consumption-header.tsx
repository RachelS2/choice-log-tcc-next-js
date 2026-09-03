import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function ConsumptionHeader() {
    return (
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
                <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                    Meus Consumos
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    Consulte e analise suas experiências de consumo registradas.
                </p>
            </div>
            <Button asChild className="h-11">
                <Link href="/dashboard/experiences/new-experience">
                    <Plus className="size-4" />
                    Registrar consumo
                </Link>
            </Button>
        </header>
    )
}