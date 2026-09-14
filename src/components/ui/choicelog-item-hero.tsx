import { cn, getAvatarColor, getInitials } from "@/lib/utils";
import { BasicItemModel } from "@/models/dashboard/items";
import { Badge } from "./badge";
import { Wrench, Package } from "lucide-react";

interface ItemHeroProps {
    item: BasicItemModel;
    friendlyNameClassName?: string;
    brandClassName?: string;

    titleRight?: React.ReactNode;
    middleRight?: React.ReactNode;
    bottomRight?: React.ReactNode;
    avatarClassName?: string;
}

export function ItemHero({
    item,
    friendlyNameClassName,
    brandClassName,
    titleRight,
    middleRight,
    bottomRight,
    avatarClassName,
}: ItemHeroProps) {
    return (
        <div className="flex min-w-0 items-center gap-3">
            {/* Avatar */}
            <div
                className={cn(
                    "flex h-14 w-14 shrink-0 items-center justify-center",
                    "overflow-hidden rounded-xl",
                    "border-2 border-white shadow-md",
                    "bg-gradient-to-br from-blue-50 to-sky-50/50",
                    getAvatarColor(item.friendlyName),
                    "text-sm font-semibold text-white",
                    avatarClassName
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

            {/* Conteúdo */}
            <div className="min-w-0 flex-1">
                {/* Linha 1: nome + estrelas */}
                <div className="flex min-w-0 items-center justify-between gap-4">
                    <h3
                        className={cn(
                            "min-w-0 truncate text-base font-semibold leading-tight text-neutral-800",
                            friendlyNameClassName
                        )}
                    >
                        {item.friendlyName}
                    </h3>

                    {titleRight && (
                        <div className="shrink-0">
                            {titleRight}
                        </div>
                    )}
                </div>

                {/* Linha 2: marca + data */}
                <div className="mt-1 flex min-w-0 items-center justify-between gap-4">
                    {item.brand && (
                        <p
                            className={cn(
                                "min-w-0 truncate text-sm leading-tight text-neutral-500",
                                brandClassName
                            )}
                        >
                            {item.brand}
                        </p>
                    )}

                    {middleRight && (
                        <div className="shrink-0">
                            {middleRight}
                        </div>
                    )}
                </div>

                {/* Linha 3: badges + preço */}
                <div className="mt-1 flex min-w-0 items-center justify-between gap-4">
                    <div className="flex min-w-0 items-center gap-2">
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

                        <Badge
                            variant="secondary"
                            className={cn(
                                "inline-flex shrink-0 items-center",
                                "rounded-full border px-2.5 py-1",
                                "border-blue-900 bg-white",
                                "text-xs font-medium text-blue-900 shadow-none"
                            )}
                        >
                            {item.categoryName}
                        </Badge>
                    </div>

                    {bottomRight && (
                        <div className="shrink-0">
                            {bottomRight}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}