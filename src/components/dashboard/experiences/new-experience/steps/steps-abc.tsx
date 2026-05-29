type StepProps = {
    title: string
    description: string
    isActive: boolean
    children: React.ReactNode
}

export function Step({
    title,
    description,
    isActive,
    children,
}: StepProps) {
    if (!isActive) return null

    return (
        <div className="px-6 pb-6">
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="space-y-5">
                    <div className="space-y-1">
                        <h3 className="text-lg font-semibold text-gray-900">
                            {title}
                        </h3>

                        <p className="text-sm text-muted-foreground">
                            {description}
                        </p>
                    </div>

                    {children}
                </div>
            </div>
        </div>
    )
}