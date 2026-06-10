import { cn } from "@/lib/utils";

type UserIconProps = {
    name: string;
    image?: string | null;
    className?: string;
};

export default function UserIcon({
    name,
    image,
    className,
}: UserIconProps) {
    const initials =
        name
            .trim()
            .split(/\s+/)
            .map((part) => part[0])
            .slice(0, 2)
            .join("")
            .toUpperCase() || "U";

    if (image) {
        return (
            <img
                src={image}
                alt={name}
                className={cn(
                    "rounded-full object-cover",
                    className
                )}
            />
        );
    }

    return (
        <div
            className={cn(
                "flex items-center justify-center ring-4 ring-white shadow-lg rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 font-semibold text-white",
                className
            )}
        >
            {initials}
        </div>
    );
}