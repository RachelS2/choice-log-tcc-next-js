import { cn, getAvatarColor, getInitials } from "@/lib/utils";
import { BasicItemModel } from "@/models/dashboard/items";
import { Badge } from "./badge";
import { Wrench, Package } from "lucide-react";

interface ItemHeroProps {
    item: BasicItemModel;
    friendlyNameClassName?: string;
    brandClassName?: string;
    titleContent?: React.ReactNode;
    topRight?: React.ReactNode;
    middleRight?: React.ReactNode;
    bottomRight?: React.ReactNode;
    avatarClassName?: string;
}

export function ItemHero({
    item,
    friendlyNameClassName,
    brandClassName,
    titleContent,
    topRight,
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
            <div className="flex min-w-0 flex-1 gap-9">

                {/* Lado esquerdo */}
                <div className="min-w-0 flex-1">

                    {/* Nome + estrelas */}
                    <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1">
                        <h3
                            className={cn(
                                "text-base font-semibold leading-tight text-neutral-800",
                                friendlyNameClassName
                            )}
                        >
                            {item.friendlyName}
                        </h3>

                        {titleContent && (
                            <div className="shrink-0">
                                {titleContent}
                            </div>
                        )}
                    </div>

                    {/* Marca */}
                    {item.brand && (
                        <p
                            className={cn(
                                "mt-1 text-sm leading-tight text-neutral-500",
                                brandClassName
                            )}
                        >
                            {item.brand}
                        </p>
                    )}

                    {/* Badges */}
                    <div className="mt-2 flex min-w-0 flex-1 items-center gap-2">
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
                </div>

                {/* Lado direito */}
                <div className="flex w-48 shrink-0 flex-col items-end gap-2">
                    <div className="">
                        {topRight && <div>{topRight}</div>}

                        {middleRight && <div>{middleRight}</div>}
                        {bottomRight && <div>{bottomRight}</div>}
                    </div>

                </div>
            </div>
        </div>
    );
}