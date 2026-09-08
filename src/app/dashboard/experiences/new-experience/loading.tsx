"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div
            className="min-h-screen px-4 py-10 sm:py-14"
            style={{ background: "var(--gradient-subtle)" }}
        >
            <div className="mx-auto w-full max-w-3xl">

                {/* Header */}
                <header className="mb-5 flex flex-col items-center text-center">
                    <div className="flex items-center gap-3">
                        <Skeleton className="h-px w-8" />
                        <Skeleton className="h-3 w-36" />
                        <Skeleton className="h-px w-8" />
                    </div>

                    <Skeleton className="mt-3 h-10 w-72 max-w-full" />

                    <Skeleton className="mt-3 h-5 w-[460px] max-w-full" />
                    <Skeleton className="mt-2 h-5 w-64" />
                </header>

                <div className="space-y-6">

                    {/* ITEM SECTION */}
                    <SkeletonFormSection>
                        <div className="grid gap-6 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)]">

                            {/* Left description */}
                            <SkeletonSectionDescription />

                            {/* Right content */}
                            <div className="min-w-0 space-y-4">

                                {/* Search + buttons */}
                                <div className="flex items-center gap-2">
                                    <Skeleton className="h-10 min-w-0 flex-1 rounded-lg" />

                                    <Skeleton className="size-10 shrink-0 rounded-lg" />
                                    <Skeleton className="size-10 shrink-0 rounded-lg" />

                                    <Skeleton className="h-10 w-36 shrink-0 rounded-lg" />
                                </div>

                                {/* Items */}
                                <div className="h-64 overflow-hidden pt-2">
                                    <div className="grid gap-3 sm:grid-cols-2">
                                        {Array.from({ length: 6 }).map((_, index) => (
                                            <SkeletonItemCard key={index} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SkeletonFormSection>

                    {/* PURCHASE INFO */}
                    <SkeletonFormSection>
                        <div className="grid gap-6 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)]">

                            <SkeletonSectionDescription />

                            <div className="grid gap-6 sm:grid-cols-2">

                                {/* Price */}
                                <SkeletonField />

                                {/* Date */}
                                <SkeletonField />

                                {/* Address */}
                                <SkeletonField />

                                {/* Details */}
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-20" />
                                    <Skeleton className="h-24 w-full rounded-xl" />
                                </div>

                            </div>
                        </div>
                    </SkeletonFormSection>

                    {/* Optional third section */}
                    <SkeletonFormSection>
                        <div className="grid gap-6 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)]">

                            <SkeletonSectionDescription />

                            <div className="space-y-6">
                                <div>
                                    <Skeleton className="mb-3 h-4 w-36" />

                                    <div className="flex flex-wrap gap-2">
                                        <Skeleton className="h-9 w-24 rounded-full" />
                                        <Skeleton className="h-9 w-32 rounded-full" />
                                        <Skeleton className="h-9 w-28 rounded-full" />
                                    </div>
                                </div>

                                <div>
                                    <Skeleton className="mb-3 h-4 w-40" />

                                    <div className="flex flex-wrap gap-2">
                                        <Skeleton className="h-9 w-24 rounded-full" />
                                        <Skeleton className="h-9 w-28 rounded-full" />
                                        <Skeleton className="h-9 w-32 rounded-full" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SkeletonFormSection>

                </div>
            </div>
        </div>
    );
}


function SkeletonFormSection({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div
            className="
        rounded-2xl
        border border-blue-100
        bg-white
        p-6
        shadow-sm
      "
        >
            {children}
        </div>
    );
}

function SkeletonSectionDescription() {
    return (
        <div
            className="
        flex min-h-[250px] flex-col
        rounded-2xl
        border border-blue-100
        bg-blue-50/50
        p-6
      "
        >
            <Skeleton className="mb-6 size-11 rounded-xl" />

            <Skeleton className="h-6 w-52" />

            <div className="mt-3 space-y-2">
                <Skeleton className="h-4 w-56 max-w-full" />
                <Skeleton className="h-4 w-44 max-w-full" />
            </div>
        </div>
    );
}

function SkeletonItemCard() {
    return (
        <div
            className="
        flex items-center gap-3
        rounded-xl
        border border-border
        p-4
      "
        >
            <Skeleton className="size-11 shrink-0 rounded-xl" />

            <div className="min-w-0 flex-1 space-y-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-3 w-36 max-w-full" />
            </div>
        </div>
    );
}

function SkeletonField() {
    return (
        <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-11 w-full rounded-lg" />
        </div>
    );
}