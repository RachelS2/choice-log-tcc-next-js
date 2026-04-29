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
import LandingHeader from "../components/landing/header"
import HeroDashboardSection from "@/components/landing/hero-dashboard"
import BenefitsSection from "@/components/landing/benefits-section"
import HowItWorksSection from "@/components/landing/how-it-works"
import FinalCTASection from "@/components/landing/final-cta"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-white">
      <LandingHeader />

      <HeroDashboardSection />

      <BenefitsSection/>

      <HowItWorksSection/>

      <FinalCTASection />
    </main>
  )
}