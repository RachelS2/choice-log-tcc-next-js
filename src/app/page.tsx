import Link from "next/link"
import {
  ArrowRight,
  BarChart3,
  BadgeCheck,
  ShoppingBag,
  Sparkles,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import MainHeader from "./main-header"
import HeroDashboardSection from "@/components/landing/hero-dashboard"
import BenefitsSection from "@/components/landing/benefits-section"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <MainHeader />

      {/* Fake dashboard and Hero */}
      <HeroDashboardSection />

      <Separator className="mx-auto max-w-7xl" />

      <BenefitsSection/>

      {/* Final CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <Card className="rounded-3xl border-none bg-primary text-primary-foreground">
          <CardContent className="flex flex-col gap-6 p-10 text-center md:p-14">
            <h3 className="text-3xl font-semibold">
              Comece a comprar com mais consciência.
            </h3>

            <p className="mx-auto max-w-2xl text-primary-foreground/80">
              Transforme decisões comuns em aprendizados valiosos.
            </p>

            <div>
              <Button
                size="lg"
                variant="secondary"
                asChild
              >
                <Link href="/sign-up">
                  Criar Conta Grátis
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}