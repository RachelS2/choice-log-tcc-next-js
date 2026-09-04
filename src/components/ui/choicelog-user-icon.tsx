import { cn, getInitials } from "@/lib/utils";

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
            {getInitials(name)}
        </div>
    );
}