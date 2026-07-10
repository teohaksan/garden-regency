import { useEffect } from 'react'
import ScrollAnimation from '../components/common/ScrollAnimation'
import Navbar from '../components/common/Navbar'
import HeroSection from '../components/common/HeroSection'
import StatsGrid from '../components/common/StatsGrid'
import ContactForm from '../components/common/ContactForm'
import FloatingActions from '../components/common/FloatingActions'
import FooterSection from '../components/common/FooterSection'

// Optional components
import ClubRegencySection from '../components/optional/ClubRegencySection'
import PillarsSection from '../components/optional/PillarsSection'
import TimelineSection from '../components/optional/TimelineSection'
import FloorplanSection from '../components/optional/FloorplanSection'
import LocationMap from '../components/optional/LocationMap'
import UnitTable from '../components/optional/UnitTable'
import SectionDivider from '../components/optional/SectionDivider'
import LeafEffect from '../components/optional/LeafEffect'

export default function GardenRegencyPage({ data }) {
  const { brand, hero, overview, nav, units, floorplans, timeline, location, contact, floating, highlights, pillars } =
    data

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleCTAClick = () => scrollTo('contact')

  return (
    <>
      {/* Cursor-traced + ambient falling leaves (pauses near contact form) */}
      <LeafEffect contactSectionId="contact" stopSectionId="location" />

      <Navbar logo={brand.logo} navItems={nav.items} onCTAClick={handleCTAClick} />

      <section id="hero" className="relative">
        {/* Floral decorative overlays (behind content, above background) */}
        <div className="hero-floral-overlay" aria-hidden="true" />
        {/* Right side flower decoration - LCP element (above-the-fold, eagerly loaded) */}
        {/* Note: Using direct <img> instead of <picture> for LCP discoverability */}
        <div
          className="hidden md:block absolute right-0 top-1/3 z-[1] pointer-events-none"
          aria-hidden="true"
        >
          <img
            src="/flower-r-400.webp"
            alt=""
            width="283"
            height="423"
            className="w-auto h-[45vh] opacity-90 animate-float"
            fetchpriority="high"
            decoding="async"
          />
        </div>

        <HeroSection {...hero} onCTAClick={handleCTAClick} />
      </section>

      <StatsGrid
        tagline={overview.tagline}
        title={overview.title}
        description={overview.description}
        items={overview.items}
        columns={overview.columns}
      />

      <SectionDivider label="Garden Regency" />

      {pillars && <PillarsSection {...pillars} />}

      {highlights && <ClubRegencySection {...highlights} />}

      {/* UnitTable hidden - replaced by FloorplanSection with real floor plan images */}
      {/* {units && <UnitTable {...units} />} */}
      {floorplans && <FloorplanSection {...floorplans} />}
      {timeline && <TimelineSection {...timeline} stopSectionId="location" />}
      {location && <LocationMap {...location} />}

      <ContactForm {...contact} />
      <FloatingActions {...floating} />
      <FooterSection companyName={brand.companyName} propertyName={brand.propertyName} />
    </>
  )
}
