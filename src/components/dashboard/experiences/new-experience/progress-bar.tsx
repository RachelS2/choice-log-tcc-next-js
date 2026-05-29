import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Check } from "lucide-react";

type ProgressHeaderProps = {
    steps: { title: string, icon: React.ElementType }[];
    currentStep: number;
    progress: number;
    children: React.ReactNode;
};

export default function ProgressHeader({ steps, currentStep, progress, children }: ProgressHeaderProps) {
    return (
        <>
            <div className="absolute top-[-100px] left-[-100px] h-80 w-80 rounded-full bg-blue-300/20 blur-3xl" />

            <div className="absolute bottom-[-120px] right-[-120px] h-96 w-96 rounded-full bg-indigo-300/20 blur-3xl" />

            <div className="relative z-10 flex items-center justify-center min-h-screen">
                <Card className="w-full max-w-lg mx-auto shadow-2xl border-0 p-0 min-h-[510px]  bg-white backdrop-blur-sm">
                    <CardContent className="p-0 flex flex-col h-full min-h-[500px]">
                        {/* Progress Header */}
                        <div className="px-6 pt-6 pb-4 space-y-4 ">
                            <div className="flex items-center  justify-between">
                                {steps.map((step, index) => {
                                    const Icon = step.icon;
                                    return (
                                        <div
                                            key={step.title}
                                            className={`flex flex-col items-center gap-1 transition-all ${index === currentStep
                                                ? "text-blue-600 scale-110"
                                                : index < currentStep
                                                    ? "text-green-500"
                                                    : "text-gray-300"
                                                }`}
                                        >
                                            <div
                                                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${index === currentStep
                                                    ? "bg-blue-100 ring-2 ring-blue-400"
                                                    : index < currentStep
                                                        ? "bg-green-100"
                                                        : "bg-gray-100"
                                                    }`}
                                            >
                                                {index < currentStep ? (
                                                    <Check className="h-4 w-4" />
                                                ) : (
                                                    <Icon className="h-4 w-4" />
                                                )}
                                            </div>
                                            <span className="text-[10px] font-medium hidden sm:block">
                                                {step.title}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                            <Progress value={progress} className="h-2 rounded-full  bg-slate-100" />
                        </div>
                        {children}
                    </CardContent>
                </Card>
            </div>
        </>
    );
}