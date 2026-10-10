import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import SpecStrip from "@/components/SpecStrip";
import TemplateVsPlan from "@/components/TemplateVsPlan";
import Ticker from "@/components/Ticker";
import FeatureBento from "@/components/FeatureBento";
import HowItWorks from "@/components/HowItWorks";
import AppTeaser from "@/components/AppTeaser";
import Personas from "@/components/Personas";
import Faq from "@/components/Faq";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";
import DeletedNotice from "@/components/DeletedNotice";
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
