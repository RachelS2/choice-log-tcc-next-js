import { Button } from "@/components/ui/button";
import { NotificationContent, NotificationWrapper } from "@/components/ui/notification";
import { CircleCheck, ArrowRight } from "lucide-react";
import Link from "next/link";
import { MouseEventHandler } from "react";

interface ConsumptionCreatedPage {
    itemName: string
    onButtonClick: MouseEventHandler<HTMLButtonElement>
}
export default function ConsumptionCreatedPage({ itemName, onButtonClick }: ConsumptionCreatedPage) {
    return (

            <NotificationWrapper>

                <NotificationContent
                    icon={CircleCheck}
                    title="Consumption saved"
                    description={
                        <>
                            Your experience with {itemName} is now part of your ChoiceLog
                            history.
                        </>
                    }
                >
                    <Button
                        className="h-11 bg-blue-700 hover:bg-blue-600 shadow-md w-full"
                        onClick={onButtonClick}
                    >
                        
                        Register another
                    </Button>
                    <Button asChild variant="ghost" className="h-11 hover:text-blue-500 w-full">
                        <Link href="/dashboard/experiences">Check Experience <ArrowRight className="size-4" /></Link> 
                    </Button>
                </NotificationContent>
            </NotificationWrapper>
    );
}
