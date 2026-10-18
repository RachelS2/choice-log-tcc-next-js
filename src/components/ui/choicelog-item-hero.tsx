import { cn, getAvatarColor, getInitials } from "@/lib/utils";
import { BasicItemModel } from "@/models/dashboard/items";
import { Wrench, Package } from "lucide-react";

interface BadgeStyleProps {
    badgeClassName?: string;
    textClassName?: string;
}

interface BadgeProps {
    typeClassName?: BadgeStyleProps;
    categoryClassName?: BadgeStyleProps;
}
interface ItemHeroProps extends BadgeProps {
    item: BasicItemModel;
    className?: string;
}

export function ItemHero({
    item,
    className, typeClassName, categoryClassName
}: ItemHeroProps) {
    return (
        <div
            className={cn(
                "flex min-w-0 items-start gap-3 sm:gap-4",
                className
            )}
        >
            <ItemAvatar
                item={item}
                className="size-14 sm:size-16"
            />

            <div className="min-w-0 flex-1">
                <ItemIdentity item={item} />

                <ItemTypeBadge
                    item={item}
                    className="mt-2"
                    typeClassName={typeClassName}
                    categoryClassName={categoryClassName}
                />
            </div>
        </div>
    );
}

interface ItemAvatarProps {
    item: BasicItemModel;
    className?: string;
}

export function ItemAvatar({
    item,
    className,
}: ItemAvatarProps) {
    return (
        <div
            className={cn(
                "flex size-14 shrink-0 items-center justify-center",
                "overflow-hidden rounded-xl",
                "shadow-md",
                "text-sm font-semibold text-white",
                "transition-shadow bg-gradient-to-br",
                getAvatarColor(item.friendlyName),
                className
            )}
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
    );
}


interface ItemIdentityProps {
    item: BasicItemModel;
    className?: string;
    nameClassName?: string;
    brandClassName?: string;
}

export function ItemIdentity({
    item,
    className,
    nameClassName,
    brandClassName,
}: ItemIdentityProps) {
    return (
        <div className={cn("min-w-0", className)}>
            <h3
                className={cn(
                    "break-words text-base font-semibold leading-tight text-neutral-800",
                    nameClassName
                )}
            >
                {item.friendlyName}
            </h3>

            {item.brand && (
                <p
                    className={cn(
                        "mt-1 break-words text-sm leading-tight text-neutral-500",
                        brandClassName
                    )}
                >
                    {item.brand}
                </p>
            )}
        </div>
    );
}

interface ItemTypeBadgeProps extends BadgeProps {
    item: BasicItemModel;
    showCategory?: boolean;
    className?: string;

}

export function ItemTypeBadge({
    item,
    showCategory = true,
    className,
    typeClassName,
    categoryClassName,
}: ItemTypeBadgeProps) {
    const isService = item.type === "SERVICE";

    return (
        <div
            className={cn(
                "flex w-max max-w-none flex-nowrap items-center gap-2",
                className
            )}
        >
            {/* Tipo */}
            <span
                className={cn(
                    "inline-flex shrink-0 items-center gap-1.5",
                    "whitespace-nowrap rounded-full border",
                    "border-blue-700 bg-blue-700 px-2.5 py-1",
                    "text-xs font-semibold text-white",
                    typeClassName?.badgeClassName
                )}
            >
                {isService ? (
                    <Wrench className="size-3.5 shrink-0" />
                ) : (
                    <Package className="size-3.5 shrink-0" />
                )}

                <span className={typeClassName?.textClassName}>
                    {isService ? "Serviço" : "Produto"}
                </span>
            </span>

            {/* Categoria */}
            {showCategory && (
                <span
                    className={cn(
                        "inline-flex shrink-0 items-center",
                        "whitespace-nowrap rounded-full border",
                        "border-blue-800 bg-white px-2.5 py-1",
                        "text-xs font-medium text-blue-800",
                        categoryClassName?.badgeClassName
                    )}
                >
                    <span className={categoryClassName?.textClassName}>
                        {item.categoryName}
                    </span>
                </span>
            )}
        </div>
    );
}
