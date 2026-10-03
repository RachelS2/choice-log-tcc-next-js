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

export default function RecentExperiences({ consumptions }: { consumptions: ReadConsumptionModel[] }) {
  return (
    <Card className="w-full rounded-2xl">
      {/* Header */}
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-base font-semibold text-slate-900">
            <PageHeader lineBefore header="Experiências recentes" textClassName="text-sm" />
          </CardTitle>

          {/* <p className="mt-1 text-sm font-normal text-muted-foreground">
            Seus últimos registros de consumo.
          </p> */}
        </div>


      </CardHeader>

      <CardContent className="w-full">
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-blue-600">
          {/* Table header */}
          <div className="grid grid-cols-[minmax(220px,2fr)_1fr_110px_120px_140px_110px] items-center gap-4 border-b border-slate-200 px-4 py-3">
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

          {/* Rows */}
          {consumptions.map((consumption) => (
            <div
              key={consumption.id}
              // href={`/dashboard/experiences/${consumption.id}`}
              className="
                grid
                grid-cols-[minmax(220px,2fr)_1fr_110px_120px_140px_110px]
                items-center gap-4
                border-b border-slate-200
                px-4 py-3
                bg-blue-500
                transition-colors
                last:border-b-0
              "
            >
              {/* Item */}
              <p className="truncate text-sm font-medium text-white">
                {consumption.item.friendlyName}
              </p>

              {/* Category */}
              <p className="truncate text-sm text-white/90">
                {consumption.item.categoryName}
              </p>

              {/* Date */}
              <p className="text-sm text-white/90">
                {consumption.date.toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "2-digit",
                })}
              </p>

              {/* Price */}
              <p className="text-sm font-medium text-white/90">
                {consumption.price.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>

              {/* Rating */}
              <RatingStars value={consumption.rating} size="xsm" />

              {/* Would buy again */}
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
      </CardContent>
      <div className="flex justify-end">
        <Link
          href="/dashboard/experiences"
          className="flex items-center text-sm font-medium text-blue-600 transition-colors hover:text-blue-700"
        >
          Ver histórico
          <ChevronRight className="size-4" />
        </Link>
      </div>
    </Card>
  );
}