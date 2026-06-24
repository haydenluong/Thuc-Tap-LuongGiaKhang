import Hero, { type HeroProps } from './blocks/Hero/Hero'
import SponsorBar, { type SponsorBarProps } from './blocks/SponsorBar/SponsorBar'
import AboutSection, { type AboutSectionProps } from './blocks/AboutSection/AboutSection'
import TeamsSection, { type TeamsSectionProps } from './blocks/TeamsSection/TeamsSection'
import StatsSection, { type StatsSectionProps } from './blocks/StatsSection/StatsSection'
import NewsSection, { type NewsSectionProps } from './blocks/NewsSection/NewsSection'
import ValuesSection, { type ValuesSectionProps } from './blocks/ValuesSection/ValuesSection'
import ContactCta, { type ContactCtaProps } from './blocks/ContactCta/ContactCta'
import { puckConfig } from './puck.config'

function App() {
  return (
    <>
      <Hero {...(puckConfig.components.Hero.defaultProps as HeroProps)} />
      <SponsorBar {...(puckConfig.components.SponsorBar.defaultProps as SponsorBarProps)} />
      <AboutSection {...(puckConfig.components.AboutSection.defaultProps as AboutSectionProps)} />
      <TeamsSection {...(puckConfig.components.TeamsSection.defaultProps as TeamsSectionProps)} />
      <StatsSection {...(puckConfig.components.StatsSection.defaultProps as StatsSectionProps)} />
      <NewsSection {...(puckConfig.components.NewsSection.defaultProps as NewsSectionProps)} />
      <ValuesSection {...(puckConfig.components.ValuesSection.defaultProps as ValuesSectionProps)} />
      <ContactCta {...(puckConfig.components.ContactCta.defaultProps as ContactCtaProps)} />
    </>
  )
}

export default App
