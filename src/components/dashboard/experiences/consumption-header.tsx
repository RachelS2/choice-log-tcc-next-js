import { Card } from "@/components/ui/card";
import { PageHeader, PageSubtitle, PageTitle } from "@/components/ui/choicelog-pages-title";

export default function ConsumptionHeader() {
    return (
        <Card className="flex flex-col p-4 sm:p-4 items-start text-left">
            <div className="flex  w-full flex-col gap-2 lg:w-auto lg:min-w-[420px]">

                <PageHeader
                    header="Histórico de Consumo"
                    className="justify-start"
                    lineBefore
                    lineAfter={false}
                />

                <PageTitle
                    title="Suas Experiências"
                    className="justify-start"
                />

                <PageSubtitle
                    subtitle="Analise e gerencie seu histórico de consumo."
                    className="justify-start"
                />
            </div>
        </Card>
    )
}