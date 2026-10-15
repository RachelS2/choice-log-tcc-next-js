import { Button } from "@/components/ui/button";
import { NotificationContent } from "@/components/ui/choicelog-notification-card";
import { CircleCheck, ArrowRight, ChevronRight, Plus } from "lucide-react";
import Link from "next/link";
import { MouseEventHandler } from "react";

interface ConsumptionCreatedPage {
    itemName: string
    onButtonClick: MouseEventHandler<HTMLButtonElement>
}
export default function ConsumptionCreatedPage({ itemName, onButtonClick }: ConsumptionCreatedPage) {
    return (

        <div className="flex w-full max-w-md flex-col items-center justify-center">
            <NotificationContent
                icon={CircleCheck}
                title="Consumo salvo"
                description={
                    <>
                        Sua experiência com <b>{itemName}</b> agora faz parte do seu histórico.
                    </>
                }
            >
                <Button
                    className="h-11 bg-blue-900 hover:bg-blue-800 shadow-md w-full"
                    onClick={onButtonClick}
                >

                    <Plus className="size-4" />
                    Registrar outra
                </Button>
                <Button asChild variant="ghost" className="h-11 mt-4 hover:text-blue-900 w-full">
                    <Link href="/dashboard/experiences">Ver experiência <ChevronRight className="size-4" /></Link>
                </Button>
            </NotificationContent>
        </div>
    );
}
