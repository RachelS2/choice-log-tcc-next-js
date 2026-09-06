import { PageHeader, PageSubtitle, PageTitle } from "@/components/ui/choicelog-pages-title";

export default function ConsumptionHeader() {
    return (
        <header className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-center text-center">
            <div>
                <PageHeader
                    header="Histórico de Consumo" className="justify-center"
                    lineBefore
                    lineAfter
                />
                <PageTitle title="Suas Experiências" className="justify-center" />
                <PageSubtitle subtitle="Analise e gerencie seu histórico de consumo." className="justify-center" />
                
            </div>

        </header>
    )
}