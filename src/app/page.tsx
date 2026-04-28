import Link from "next/link"
import {
  BarChart3,
  Clipboard,
  BadgeCheck
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent
} from "@/components/ui/card"

import { MainHeader } from "@/app/main-header"

export default function Home() {
  const features = [
    {
      icon: Clipboard,
      title: "Log Decisions",
    },
    {
      icon: BadgeCheck,
      title: "Evaluate Experiences",
    },
    {
      icon: BarChart3,
      title: "Analyze Your History",
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      <MainHeader />

      <section className="container mx-auto px-6 py-3 pt-32 pb-16 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-blue to-blue-600 text-transparent bg-clip-text">
            Track your shopping choices with clarity.
          </h1>

          <p className="text-lg md:text-xl  text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A platform to record and evaluate your everyday shopping decisions, helping you make better choices over time.
          </p>

          <Button asChild size="lg" className="bg-blue rounded-full px-8">
            <Link href="/sign-up">
              Start Now
            </Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-12 max-w-5xl mx-auto">
          {features.map((item, index) => {
            const Icon = item.icon

            return (
              <Card
                key={index}
                className="border-muted hover:shadow-md transition"
              >
                <CardContent className="pt-8 pb-8 flex flex-col items-center text-center space-y-4">
                  <div className="p-4 rounded-xl bg-primary/10">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>

                  <h2 className="font-semibold text-lg">
                    {item.title}
                  </h2>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>
    </main>
  )
}