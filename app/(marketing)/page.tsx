import Nav from "@/components/site/Nav";
import Hero from "@/components/landing/Hero";
import SpecStrip from "@/components/landing/SpecStrip";
import TemplateVsPlan from "@/components/landing/TemplateVsPlan";
import Ticker from "@/components/landing/Ticker";
import FeatureBento from "@/components/landing/FeatureBento";
import HowItWorks from "@/components/landing/HowItWorks";
import AppTeaser from "@/components/landing/AppTeaser";
import Personas from "@/components/landing/Personas";
import Faq from "@/components/landing/Faq";
import FinalCta from "@/components/landing/FinalCta";
import Footer from "@/components/site/Footer";
import DeletedNotice from "@/components/landing/DeletedNotice";
import { Suspense } from "react";

export default function HomePage() {
  return (
    // overflow-x-clip (not hidden) keeps the tilted phones from widening the page
    // without turning this wrapper into a scroll container, so the sticky nav still sticks.
    <div className="overflow-x-clip">
      <Nav />
      <Suspense>
        <DeletedNotice />
      </Suspense>
      <main>
        <Hero />
        <SpecStrip />
        <TemplateVsPlan />
        <Ticker />
        <FeatureBento />
        <HowItWorks />
        <AppTeaser />
        <Personas />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
