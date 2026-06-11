import ProfileSettingsHeader from "./header";

export default function PersonalProfileSectionSkeleton() {
    return (
        <div className="space-y-6 animate-pulse">
            {/* Header */}
            <div className="flex items-center justify-between">
                <ProfileSettingsHeader/>
            </div>

            {/* Main cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Profile card */}
                <div className="rounded-xl border border-blue-100 bg-white/80 p-6 shadow-sm">
                    <div className="space-y-5">
                        <div className="h-6 w-40 rounded bg-neutral-200" />
                        <div className="h-4 w-64 rounded bg-neutral-100" />

                        <div className="space-y-3 pt-4">
                            <div className="h-10 w-full rounded-md bg-neutral-100" />
                            <div className="h-10 w-full rounded-md bg-neutral-100" />
                            <div className="h-10 w-full rounded-md bg-neutral-100" />
                        </div>
                    </div>
                </div>

                {/* Personal context card */}
                <div className="rounded-xl border border-blue-100 bg-white/80 p-6 shadow-sm">
                    <div className="space-y-5">
                        <div className="h-6 w-44 rounded bg-neutral-200" />
                        <div className="h-4 w-72 rounded bg-neutral-100" />

                        <div className="pt-4">
                            <div className="h-10 w-full rounded-md bg-neutral-100" />
                        </div>

                        <div className="rounded-xl bg-blue-50 p-4 space-y-2">
                            <div className="h-3 w-40 rounded bg-blue-200" />
                            <div className="h-3 w-full rounded bg-blue-100" />
                            <div className="h-3 w-5/6 rounded bg-blue-100" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}