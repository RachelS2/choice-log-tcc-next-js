import { LineChart, Sparkles } from "lucide-react";
import { Card, CardContent } from "../ui/card";

export default function MotivationPage() {
  return (
    <section className="relative hidden lg:flex items-center justify-center overflow-hidden px-16 text-white">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,white,transparent_30%),radial-gradient(circle_at_80%_70%,white,transparent_25%)]" />

        <div className="relative max-w-xl ">
            <div className="space-y-5">
                <h1 className="text-5xl font-semibold tracking-tight">
                    Start making smarter shopping decisions.
                </h1>

                <p className="text-lg text-blue-100">
                    Record your purchase experiences, identify patterns,
                    and build more conscious consumption habits over time.
                </p>
            </div>

            <div className="grid gap-4">
                <Card className="border-white/20 bg-white/10 text-white">
                    <CardContent className="flex items-center gap-3 p-5">
                        <LineChart className="h-5 w-5" />
                        <span>
                            Analyze your shopping history and behavior
                        </span>
                    </CardContent>
                </Card>

                <Card className="border-white/20 bg-white/10 text-white">
                    <CardContent className="flex items-center gap-3 p-5">
                        <Sparkles className="h-5 w-5" />
                        <span>
                            Learn from past purchases and improve future ones
                        </span>
                    </CardContent>
                </Card>
            </div>
        </div>
    </section>);
}