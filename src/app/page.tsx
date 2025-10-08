import Header from '@/components/layout/Header'
import HeroSection from '@/components/HeroSection'
import ServicesSection from '@/components/ServicesSection'
import TrustSection from '@/components/TrustSection'
import TeamSection from '@/components/TeamSection'
import SustainabilitySection from '@/components/SustainabilitySection'

export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <ServicesSection />
      <TrustSection />
      <TeamSection />
      <SustainabilitySection />
    </>
  )
}