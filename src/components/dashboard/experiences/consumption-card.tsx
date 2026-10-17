
"use client";

import {
    ChevronRight,
    CalendarDays,
    Package,
    ThumbsDown,
    ThumbsUp,
    Wrench,
} from "lucide-react";

import { formatDate, getInitials } from "@/lib/utils";
import { ReadConsumptionModel } from "@/models/dashboard/consumption";
import { RatingStars } from "@/components/ui/rating-starts";

export interface ConsumptionListProps {
    consumptionAndItem: ReadConsumptionModel;
    onOpen: (c: ReadConsumptionModel) => void;
}

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
});


export function ConsumptionCard({
    consumptionAndItem: consumption,
    onOpen,
}: ConsumptionListProps) {
    const { item } = consumption;

    const isService = item.type === "SERVICE";

    return (
        <article className="group h-full min-w-0">
            <button
                type="button"
                onClick={() => onOpen(consumption)}
                aria-label={`Ver detalhes de ${item.friendlyName}`}
                className="
        flex h-full min-w-0 w-full cursor-pointer
        flex-col rounded-2xl
        p-4 text-left 
        overflow-hidden rounded-2xl shadow-b shadow-l
        border-l border-b border-blue-200
        shadow-sm shadow-blue-200
        bg-white
        transition-all duration-300 ease-out
        hover:-translate-y-1
        hover:bg-blue-50
        hover:bg-gradient-to-br from-blue-50 to-sky-50/50
        hover:shadow-blue-500
        hover:shadow-lg
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-blue-500
        sm:p-5
        "
            >
                {/* Header */}
                <div className="flex w-full min-w-0 items-start gap-3">
                    {/* Avatar */}
                    <div
                        className="
              flex size-14 shrink-0 items-center
              justify-center overflow-hidden
              rounded-xl bg-gradient-to-br
              from-blue-500 to-indigo-500
              text-sm font-bold text-white
              shadow-sm sm:size-16
            "
                    >
                        {item.imageUrl ? (
                            <img
                                src={item.imageUrl}
                                alt=""
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            getInitials(item.friendlyName)
                        )}
                    </div>

                    {/* Item e preço */}
                    <div className="flex min-w-0 flex-1 flex-col gap-2">
                        <div className="flex min-w-0 flex-wrap items-start justify-between gap-x-3 gap-y-2">
                            <div className="min-w-0 flex-1">
                                <h3 className="break-words text-base font-semibold leading-snug text-slate-900">
                                    {item.friendlyName}
                                </h3>

                                {item.brand && (
                                    <p className="mt-0.5 break-words text-xs text-slate-500">
                                        {item.brand}
                                    </p>
                                )}
                            </div>

                            <div className="shrink-0 sm:text-right">
                                <p className="text-[11px] text-slate-400">
                                    Valor gasto
                                </p>
                                <p className="text-base font-bold tabular-nums text-slate-900">
                                    {currencyFormatter.format(consumption.price)}
                                </p>
                            </div>
                        </div>

                        {/* Tipo e categoria */}
                        <div className="flex flex-wrap items-center gap-2">
                            <span
                                className="
                  inline-flex items-center gap-1
                  rounded-full bg-blue-50
                  px-2.5 py-1 text-[11px]
                  font-semibold text-blue-700
                "
                            >
                                {isService ? (
                                    <Wrench className="size-3" />
                                ) : (
                                    <Package className="size-3" />
                                )}

                                {isService ? "Serviço" : "Produto"}
                            </span>

                            <span className="text-xs text-slate-500">
                                {item.categoryName}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Avaliação e recompra */}
                <div
                    className="
            mt-4 flex w-full flex-wrap
            items-center justify-between
            gap-x-4 gap-y-3
            border-t border-slate-100 pt-4
          "
                >
                    <div className="flex items-center gap-2">
                        <RatingStars
                            value={consumption.rating}
                            size="xsm"
                        />

                        <span className="text-xs font-medium text-slate-500">
                            {consumption.rating}/5
                        </span>
                    </div>

                    <div
                        className={`inline-flex items-center gap-1.5 text-xs font-medium ${consumption.wouldBuyAgain
                            ? "text-emerald-700"
                            : "text-rose-600"
                            }`}
                    >
                        {consumption.wouldBuyAgain ? (
                            <ThumbsUp className="size-3.5" />
                        ) : (
                            <ThumbsDown className="size-3.5" />
                        )}

                        <span>
                            {consumption.wouldBuyAgain
                                ? "Compraria novamente"
                                : "Não compraria novamente"}
                        </span>
                    </div>
                </div>

                {/* Motivo e influência */}
                <div
                    className="
            mt-4 grid w-full min-w-0
            grid-cols-1 gap-3
            rounded-xl bg-blue-50
            p-3 sm:grid-cols-2 group-hover:bg-blue-100
          "
                >
                    <div className="min-w-0">
                        <p className="mb-1 text-[11px] text-slate-500">
                            Motivo
                        </p>
                        <p className="break-words text-sm font-medium leading-snug text-blue-900">
                            {consumption.reason.friendlyName}
                        </p>
                    </div>

                    <div className="min-w-0">
                        <p className="mb-1 text-[11px] text-slate-500">
                            Influência
                        </p>
                        <p className="break-words text-sm font-medium leading-snug text-blue-900">
                            {consumption.influence.friendlyName}
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div
                    className="
            mt-auto flex w-full flex-wrap
            items-center justify-between
            gap-2 pt-4
          "
                >
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <CalendarDays className="size-3.5" />
                        <span>{formatDate(consumption.date.toString())}</span>
                    </div>

                    <div
                        className="
              inline-flex items-center gap-1
              text-xs font-semibold text-blue-600
              transition-colors
              group-hover:text-blue-700
            "
                    >
                        Ver detalhes
                        <ChevronRight className="size-3.5" />
                    </div>
                </div>
            </button>
        </article>
    );
}


export function ConsumptionCardSkeleton() {
    return (
        <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            <div className="flex animate-pulse gap-3">
                <div className="size-14 shrink-0 rounded-xl bg-slate-200 sm:size-16" />

                <div className="flex-1 space-y-2">
                    <div className="flex justify-between gap-3">
                        <div className="h-4 w-2/5 rounded bg-slate-200" />
                        <div className="h-5 w-1/4 rounded bg-slate-200" />
                    </div>
                    <div className="h-3 w-1/3 rounded bg-slate-100" />
                    <div className="h-5 w-1/2 rounded-full bg-slate-100" />
                </div>
            </div>

            <div className="mt-4 flex justify-between border-t border-slate-100 pt-4">
                <div className="h-4 w-28 animate-pulse rounded bg-slate-200" />
                <div className="h-4 w-32 animate-pulse rounded bg-slate-200" />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 rounded-xl bg-slate-50 p-3">
                <div className="space-y-2">
                    <div className="h-3 w-12 animate-pulse rounded bg-slate-200" />
                    <div className="h-4 w-full animate-pulse rounded bg-slate-200" />
                </div>
                <div className="space-y-2">
                    <div className="h-3 w-12 animate-pulse rounded bg-slate-200" />
                    <div className="h-4 w-full animate-pulse rounded bg-slate-200" />
                </div>
            </div>

            <div className="mt-auto flex justify-between pt-4">
                <div className="h-3 w-24 animate-pulse rounded bg-slate-100" />
                <div className="h-3 w-20 animate-pulse rounded bg-slate-100" />
            </div>
        </div>
    );
}
