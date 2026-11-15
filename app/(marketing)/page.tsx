import { Suspense } from "react";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import Hero from "@/components/landing/Hero";
import FortnightRing from "@/components/landing/FortnightRing";
import HowItWorks from "@/components/landing/HowItWorks";
import ChalkBand from "@/components/landing/ChalkBand";
import OnePlan from "@/components/landing/OnePlan";
import Barbell from "@/components/landing/Barbell";
import Compare from "@/components/landing/Compare";
import Availability from "@/components/landing/Availability";
import Faq from "@/components/landing/Faq";
import DeletedNotice from "@/components/landing/DeletedNotice";

export default function HomePage() {
  return (
    // overflow-x-clip (not hidden) keeps the cropped plate and tilted phones from
    // widening the page without making this a scroll container, so sticky still works.
    <div className="overflow-x-clip">
      <Nav />
      <Suspense>
        <DeletedNotice />
      </Suspense>
      <main>
        <Hero />
        <FortnightRing />
        <HowItWorks />
        <ChalkBand />
        <OnePlan />
        <Barbell />
        <Compare />
        <Availability />
        <Faq />
      </main>
      <Footer />
    </div>
  );
}
