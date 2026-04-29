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