import { Card } from "@/components/ui/card";
import { PageHeader, PageSubtitle, PageTitle } from "@/components/ui/choicelog-pages-title";

export default function AnalyticsHeader() {
    return (
        <Card className="flex flex-col p-4 sm:p-4 items-start text-left">
            <div className="flex  w-full flex-col gap-2 lg:w-auto lg:min-w-[420px]">

                <PageHeader
                    header="Insights"
                    className="justify-start"
                    textClassName="text-md"
                    lineBefore
                    lineAfter={false}
                />

                <PageTitle
                    title="Análises de Consumo"
                    className="justify-start"
                />

                <PageSubtitle
                    subtitle="Entenda seus padrões de consumo e descubra o que está por trás das
                    suas escolhas."
                    className="justify-start"
                />
            </div>
        </Card>
    )
}