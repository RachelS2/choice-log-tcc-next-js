import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { RatingStars } from "../ui/rating-starts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const data = [
  {
    id: 1,
    title: "Marketing Course",
    category: "Educação",
    rating: 4,
    price: 120,
    wouldBuyAgain: true,
    date: "20/04/2026",
  },
  {
    id: 2,
    title: "Netflix Annual Subscription",
    category: "Streaming",
    rating: 5,
    price: 239.9,
    wouldBuyAgain: true,
    date: "18/05/2026",
  },
  {
    id: 3,
    title: "Tênis esportivo",
    category: "Vestuário",
    rating: 2,
    price: 349.9,
    wouldBuyAgain: false,
    date: "10/06/2026",
  },
];

export default function RecentExperiences() {
  return (
    <Card className="rounded-2xl py-0">
      {/* Header */}
      <CardHeader className="flex flex-row items-center justify-between px-6 pt-6 pb-4">
        <div>
          <CardTitle className="text-base font-semibold text-slate-900">
            Experiências recentes
          </CardTitle>

          <p className="mt-1 text-sm font-normal text-muted-foreground">
            Seus últimos registros de consumo.
          </p>
        </div>

        <Link
          href="/dashboard/experiences"
          className="flex items-center gap-1 text-sm font-medium text-blue-600 transition-colors hover:text-blue-700"
        >
          Ver histórico
          <ChevronRight className="size-4" />
        </Link>
      </CardHeader>

      <CardContent className="px-6 pb-6">
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white/60">
          {/* Table header */}
          <div className="grid grid-cols-[minmax(220px,2fr)_1fr_110px_120px_140px_110px] items-center gap-4 border-b border-slate-200 bg-white/50 px-4 py-3">
            <span className="text-xs font-medium text-muted-foreground">
              Item
            </span>

            <span className="text-xs font-medium text-muted-foreground">
              Categoria
            </span>

            <span className="text-xs font-medium text-muted-foreground">
              Data
            </span>

            <span className="text-xs font-medium text-muted-foreground">
              Valor
            </span>

            <span className="text-xs font-medium text-muted-foreground">
              Avaliação
            </span>

            <span className="text-xs font-medium text-muted-foreground">
              Recompraria
            </span>
          </div>

          {/* Rows */}
          {data.map((item) => (
            <Link
              key={item.id}
              href={`/dashboard/experiences/${item.id}`}
              className="
                grid
                grid-cols-[minmax(220px,2fr)_1fr_110px_120px_140px_110px]
                items-center gap-4
                border-b border-slate-200
                px-4 py-3
                transition-colors
                last:border-b-0
                hover:bg-blue-50
              "
            >
              {/* Item */}
              <p className="truncate text-sm font-medium text-slate-900">
                {item.title}
              </p>

              {/* Category */}
              <p className="truncate text-sm text-slate-600">
                {item.category}
              </p>

              {/* Date */}
              <p className="text-sm text-slate-600">
                {item.date}
              </p>

              {/* Price */}
              <p className="text-sm font-medium text-slate-700">
                {item.price.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>

              {/* Rating */}
              <RatingStars value={item.rating} size="sm" />

              {/* Would buy again */}
              <div>
                {item.wouldBuyAgain ? (
                  <span className="inline-flex rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-700">
                    Sim
                  </span>
                ) : (
                  <span className="inline-flex rounded-full bg-red-100 px-2.5 py-1 text-xs font-medium text-red-700">
                    Não
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}