import { ConsumptionCardSkeleton } from "@/components/dashboard/experiences/consumption-card";
import ConsumptionHeader from "@/components/dashboard/experiences/consumption-header";

export default function Loading() {
    return (
        <main
            className="min-h-screen py-10"
            style={{ background: "var(--gradient-subtle)" }}
        >
            <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
                <ConsumptionHeader />
                <div className="mt-6 space-y-5">
                    <div className="grid gap-4 xl:grid-cols-2">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <ConsumptionCardSkeleton key={i} />
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}