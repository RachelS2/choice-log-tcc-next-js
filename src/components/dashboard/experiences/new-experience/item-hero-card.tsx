import { Package, Wrench} from "lucide-react";
import { getInitials } from "@/lib/utils";
import { BasicItemModel } from "@/models/dashboard/items";
import { Card } from "@/components/ui/card";
import DecorativeBackground from "@/components/ui/choicelog-decorative-background";

export function ItemHeroCard({
    item,
    onChange,
}: {
    item: BasicItemModel;
    onChange: () => void;
}) {
    const isService = item.type === "SERVICE";

    return (
        <Card
            className="
        group relative overflow-hidden
        rounded-2xl items-center 
        border border-blue-100/80
        bg-gradient-to-br from-blue-50 to-sky-50/50
        bg-white
        shadow-sm
        transition-all duration-300
        hover:-translate-y-0.5
        hover:border-blue-200
        hover:shadow-lg hover:shadow-blue-100/50
    "
        >
            <DecorativeBackground />
            <div className="relative mx-auto flex w-fit items-center justify-center gap-5 p-5 sm:gap-6 sm:p-6">
                {/* Item image */}
                <div className="relative shrink-0">
                    {item.imageUrl ? (
                        <img
                            src={item.imageUrl}
                            alt={item.friendlyName}
                            loading="lazy"
                            className="
                        size-20 rounded-2xl
                        object-cover
                        ring-1 ring-blue-100
                        shadow-md
                        transition-transform duration-300
                        group-hover:scale-[1.03]
                        sm:size-24
                    "
                        />
                    ) : (
                        <div
                            className="
                        grid size-20 place-items-center
                        rounded-2xl
                        bg-gradient-to-br from-blue-100 to-blue-200
                        text-blue-800
                        shadow-md
                        ring-1 ring-blue-100
                        transition-transform duration-300
                        group-hover:scale-[1.03]
                        sm:size-24
                    "
                        >
                            <span className="text-2xl font-semibold tracking-tight sm:text-3xl">
                                {getInitials(item.friendlyName)}
                            </span>
                        </div>
                    )}
                </div>

                {/* Item information */}
                <div className="min-w-0 flex-1">
                    {/* Label */}
                    <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                        Você consumiu...
                    </p>

                    {/* Title */}
                    <div className="mt-0.5">
                        <button
                            type="button"
                            onClick={onChange}
                            className="
                        min-w-0 max-w-full
                        cursor-pointer truncate
                        text-left
                        text-xl font-semibold tracking-tight
                        text-blue-800
                        transition-all duration-200
                        hover:-translate-y-0.5
                        hover:text-blue-600
                        focus-visible:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-blue-500/40
                        focus-visible:ring-offset-2
                        font-[family-name:var(--font-inter)]
                        sm:text-xl
                    "
                            style={{
                                textShadow:
                                    "0 2px 0 #dbeafe, 0 5px 10px rgba(37, 99, 235, 0.15)",
                            }}
                        >
                            {item.friendlyName} 
                            
                        </button>
  
                    </div>
                    {/* Brand */}
                    {item.brand && (
                        <p className="mt-0.5 truncate text-sm font-medium text-muted-foreground">
                            {item.brand}
                        </p>
                    )}

                    {/* Metadata */}
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                        {/* Category */}
                        <span
                            className="
                        inline-flex items-center
                        rounded-full
                        border border-blue-900
                        text-white
                        px-3 py-1
                        bg-blue-900
                        text-xs font-medium
                        text-slate-600
                        shadow-sm
                        shadow-blue-200
                        backdrop-blur-sm
                    "
                        >
                            {item.categoryName}
                        </span>

                        {/* Type */}
                        <span
                            className="
                        inline-flex items-center gap-1.5
                        rounded-full
                        text-blue-800
                        px-3 py-1
                        bg-white
                        border border-blue-800
                        text-xs font-semibold
                        shadow-sm shadow-blue-200
                        transition-colors duration-200
                    "
                        >
                            {isService ? (
                                <Wrench className="size-3.5" strokeWidth={2.2} />
                            ) : (
                                <Package className="size-3.5" strokeWidth={2.2} />
                            )}

                            {isService ? "Serviço" : "Produto"}
                        </span>

                    </div>
                </div>
            </div>

        </Card>
    );
}