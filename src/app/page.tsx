import LandingHeaderClient from "../components/landing/landing-header-client"
import HeroDashboardSection from "@/components/landing/hero-dashboard"
import BenefitsSection from "@/components/landing/benefits-section"
import HowItWorksSection from "@/components/landing/how-it-works"
import FinalCTASection from "@/components/landing/final-cta"
import Footer from "@/components/landing/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Ambient blur orb */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -center-10 top-1/3 h-[420px] w-[420px] rounded-full bg-blue-400/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 bottom-0 h-[320px] w-[320px] rounded-full bg-blue-400/15 blur-3xl"
      />
      <LandingHeaderClient userIsLoggedIn={false} />

      <HeroDashboardSection />

      <BenefitsSection />

      <HowItWorksSection />

      <FinalCTASection />

      <Footer />
    </main>
  )
}