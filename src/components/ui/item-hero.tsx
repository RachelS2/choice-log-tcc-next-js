import { cn, getAvatarColor, getInitials } from "@/lib/utils";
import { BasicItemModel } from "@/models/dashboard/items";
import { Badge } from "./badge";
import { Wrench, Package } from "lucide-react";

export function ItemHero({ item }: { item: BasicItemModel }) {

    return (
        <div className="flex min-w-0 items-center gap-3">
            {/* Avatar */}
            <div
                className={cn(
                    "flex h-14 w-14 shrink-0 items-center justify-center",
                    "overflow-hidden rounded-xl",
                    "border-2 border-white shadow-md",
                    " bg-gradient-to-br from-blue-50 to-sky-50/50",
                    getAvatarColor(item.friendlyName),
                    "text-sm font-semibold text-white"
                )}
            >
                {item.imageUrl ? (
                    <img
                        src={item.imageUrl}
                        alt={item.friendlyName}
                        className="h-full w-full object-cover"
                    />
                ) : (
                    getInitials(item.friendlyName)

                )}
            </div>

            {/* Name + Brand + Badges */}
            <div className="min-w-0 flex-1">
                {/* Friendly Name + Brand */}
                <div className="min-w-0 flex-1">
                    <h3 className="line-clamp-2 text-base font-semibold leading-tight text-neutral-800">
                        {item.friendlyName}
                    </h3>

                    {item.brand && (
                        <p className="mt-1 truncate text-sm leading-tight text-neutral-500">
                            {item.brand}
                        </p>
                    )}
                </div>

                {/* Type + Category */}
                <div className="mt-1 flex min-w-0 items-center gap-2">
                    {/* Type */}
                    <Badge
                        variant="secondary"
                        className={cn(
                            "inline-flex shrink-0 items-center gap-1.5",
                            "rounded-full border px-2.5 py-1",
                            "border-blue-900 bg-blue-900/90",
                            "text-xs font-semibold text-white shadow-none"
                        )}
                    >
                        {item.type === "SERVICE" ? (
                            <Wrench className="size-3.5" />
                        ) : (
                            <Package className="size-3.5" />
                        )}

                        {item.type === "PRODUCT" ? "Produto" : "Serviço"}
                    </Badge>

                    {/* Category */}
                    <Badge
                        variant="secondary"
                        className={cn(
                            "inline-flex shrink-0 items-center mr-3",
                            "rounded-full border px-2.5 py-1",
                            "border-blue-900 bg-white",
                            "text-xs font-medium text-blue-900 shadow-none"
                        )}
                    >
                        {item.categoryName}
                    </Badge>
                </div>
            </div>
        </div>
    )
}