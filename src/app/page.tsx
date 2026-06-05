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
      {/* Top left */}
      <div className="absolute -top-24 left-1/4 h-[280px] w-[300px] rounded-full bg-blue-300/20 blur-3xl" />
      {/* Top right */}
      <div className="absolute top-10 right-[-80px] h-[320px] w-[320px] rounded-full bg-blue-300/15 blur-3xl" />
      {/* Center */}
      <div className="absolute top-1/2 left-1/3 h-[200px] w-[200px] rounded-full bg-blue-200/10 blur-2xl" />
      {/* Bottom left */}
      <div className="absolute bottom-0 left-10 h-[280px] w-[260px] rounded-full bg-blue-400/20 blur-3xl" />
      {/* Bottom right */}
      <div className="absolute bottom-[-40px] right-10 h-[220px] w-[220px] rounded-full bg-blue-400/20 blur-3xl" />
      <LandingHeaderClient userIsLoggedIn={false} />

      <HeroDashboardSection />

      <BenefitsSection />

      <HowItWorksSection />

      <FinalCTASection />

      <Footer />
    </main>
  )
}