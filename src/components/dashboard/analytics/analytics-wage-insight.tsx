import { MINIMUM_WAGE } from "@/lib/utils";
import { MinimumWageSpendingInsightModel } from "@/models/dashboard/analytics";

export function MinimumWageSpendingInsight({
    data,
}: {
    data: MinimumWageSpendingInsightModel;
}) {
    const totalSpent = data.totalSpent.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });

    const minimumWage = MINIMUM_WAGE.value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });

    const isLessThanOneMinimumWage =
        data.equivalentMinimumWages < 1;

    return (
        <>
            Você registrou <strong>{totalSpent}</strong> em gastos, o equivalente a
            aproximadamente{" "}
            <strong>
                {isLessThanOneMinimumWage
                    ? `${(data.equivalentMinimumWages * 100).toFixed(0)}% de um salário mínimo`
                    : `${data.equivalentMinimumWages.toFixed(1)} salários mínimos`}
            </strong>.

            <>
                <div className="mt-1 text-xs text-muted-foreground">
                    Considerando {minimumWage} como valor de referência.
                </div>
            </>
        </>
    );
}