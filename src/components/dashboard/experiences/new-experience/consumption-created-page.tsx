import { Button } from "@/components/ui/button";
import { CircleCheck } from "lucide-react";
import Link from "next/link";
import { MouseEventHandler } from "react";

interface ConsumptionCreatedPage {
    itemName: string
    onButtonClick: MouseEventHandler<HTMLButtonElement>
}
export default function ConsumptionCreatedPage({itemName, onButtonClick}: ConsumptionCreatedPage) {
    return (
        <div
            className="min-h-screen px-4 py-16"
            style={{ background: "var(--gradient-subtle)" }}
        >
            <div
                className="mx-auto max-w-md rounded-2xl border border-border bg-card p-10 text-center duration-500 animate-in fade-in slide-in-from-bottom-2"
                style={{ boxShadow: "var(--shadow-card)" }}
            >
                <div className="mx-auto mb-5 grid size-14 place-items-center rounded-full bg-primary/10 text-primary">
                    <CircleCheck className="size-7" />
                </div>
                <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                    Consumption saved
                </h1>
                <p className="mt-2 text-sm text-muted-foreground">
                    Your experience with {itemName} is now part of your ChoiceLog
                    history.
                </p>
                <div className="mt-6 space-y-3">
                    <Button
                        className="h-11 w-full"
                        onClick={onButtonClick}
                    >
                        Register another
                    </Button>
                    <Button asChild variant="ghost" className="h-11 w-full">
                        <Link href="/">Back home</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
