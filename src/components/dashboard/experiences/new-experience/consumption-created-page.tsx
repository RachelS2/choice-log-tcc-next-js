import { Button } from "@/components/ui/button";
import { NotificationContent } from "@/components/ui/choicelog-notification-card";
import { CircleCheck, ArrowRight } from "lucide-react";
import Link from "next/link";
import { MouseEventHandler } from "react";

interface ConsumptionCreatedPage {
    itemName: string
    onButtonClick: MouseEventHandler<HTMLButtonElement>
}
export default function ConsumptionCreatedPage({ itemName, onButtonClick }: ConsumptionCreatedPage) {
    return (


                <NotificationContent
                    icon={CircleCheck}
                    title="Consumo salvo"
                    description={
                        <>
                            Sua experiência com {itemName} agora faz parte do seu histórico.
                        </>
                    }
                >
                    <Button
                        className="h-11 bg-blue-900 hover:bg-blue-800 shadow-md w-full"
                        onClick={onButtonClick}
                    >
                        
                        Registrar outro
                    </Button>
                    <Button asChild variant="ghost" className="h-11 hover:text-blue-900 w-full">
                        <Link href="/dashboard/experiences">Ver experiência <ArrowRight className="size-4" /></Link> 
                    </Button>
                </NotificationContent>
    );
}
