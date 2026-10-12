import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { RatingStars } from "../ui/rating-starts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ReadConsumptionModel } from "@/models/dashboard/consumption";
import { PageHeader } from "../ui/choicelog-pages-title";
import { cn } from "@/lib/utils";

export default function RecentExperiences({
  consumptions,
}: {
  consumptions: ReadConsumptionModel[];
}) {
  const gridColumns =
    "grid-cols-[minmax(180px,2fr)_minmax(120px,1.1fr)_minmax(100px,0.7fr)_minmax(110px,0.9fr)_minmax(130px,1fr)_minmax(110px,0.8fr)]";

  return (
    <Card className="w-full min-w-0 gap-4 rounded-2xl">
      {/* Header */}
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base font-semibold text-slate-900">
          <PageHeader
            lineBefore
            header="Experiências recentes"
            textClassName="text-sm"
          />
        </CardTitle>
      </CardHeader>

      <CardContent className="min-w-0 px-3 sm:px-6">

        {/* Área com scroll horizontal */}
        <div className="choicelog-scrollbar w-full min-w-0 overflow-x-auto rounded-xl border border-slate-200 bg-blue-50">

          {/* Tabela com largura mínima */}
          <div className="min-w-[850px] bg-blue-600">

            {/* Cabeçalho */}
            <div
              className={cn(
                "grid items-center gap-4 border-b border-blue-400/50 px-4 py-3",
                gridColumns
              )}
            >
              <span className="text-sm font-medium text-white/90">
                Item
              </span>

              <span className="text-sm font-medium text-white/90">
                Categoria
              </span>

              <span className="text-sm font-medium text-white/90">
                Data
              </span>

              <span className="text-sm font-medium text-white/90">
                Valor
              </span>

              <span className="text-sm font-medium text-white/90">
                Avaliação
              </span>

              <span className="text-sm font-medium text-white/90">
                Recompraria
              </span>
            </div>

            {/* Linhas */}
            {consumptions.map((consumption) => (
              <div
                key={consumption.id}
                className={cn(
                  "grid items-center gap-4 border-b border-blue-400/50 bg-blue-500 px-4 py-3 text-white transition-colors last:border-b-0 hover:bg-blue-600",
                  gridColumns
                )}
              >
                {/* Item */}
                <div className="min-w-0">
                  <p
                    className="truncate text-sm font-medium text-white"
                    title={consumption.item.friendlyName}
                  >
                    {consumption.item.friendlyName}
                  </p>
                </div>

                {/* Categoria */}
                <div className="min-w-0">
                  <p
                    className="truncate text-sm text-white/90"
                    title={consumption.item.categoryName}
                  >
                    {consumption.item.categoryName}
                  </p>
                </div>

                {/* Data */}
                <p className="whitespace-nowrap text-sm text-white/90">
                  {consumption.date.toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </p>

                {/* Valor */}
                <p className="whitespace-nowrap text-sm font-medium text-white/90">
                  {consumption.price.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </p>

                {/* Avaliação */}
                <div className="flex min-w-0 items-center">
                  <RatingStars
                    value={consumption.rating}
                    size="xsm"
                    align="start"
                  />
                </div>

                {/* Recompraria */}
                <div>
                  {consumption.wouldBuyAgain ? (
                    <span className="inline-flex rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-700">
                      Sim
                    </span>
                  ) : (
                    <span className="inline-flex rounded-full bg-red-100 px-2.5 py-1 text-xs font-medium text-red-700">
                      Não
                    </span>
                  )}
                </div>
              </div>
            ))}

          </div>
        </div>

        {/* Indicação de rolagem no mobile */}
        <p className="mt-2 text-center text-xs text-slate-500 md:hidden">
          Deslize para os lados para visualizar todas as informações →
        </p>

      </CardContent>

      {/* Link para histórico */}
      <div className="flex justify-end px-4 pb-4 sm:px-6">
        <Link
          href="/dashboard/experiences"
          className="flex items-center gap-1 text-sm font-medium text-blue-600 transition-colors hover:text-blue-700"
        >
          Ver histórico completo
          <ChevronRight className="size-4" />
        </Link>
      </div>
    </Card>
  );
}