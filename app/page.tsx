import { Suspense } from "react";
import Navbar from "./components/homepage/navbar";
import Hero from "./components/homepage/hero";
import CarsShowcase from "./components/homepage/carsshowcase";
import BrandsBanner from "./components/homepage/brandsbanner";
import ServicesSection from "./components/homepage/servicessection";
import ContactSection from "./components/homepage/contactsection";
import Footer from "./components/homepage/footer";
export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Suspense fallback={<div>Loading...</div>}>
        <CarsShowcase />
      </Suspense>
      <BrandsBanner />
      <ServicesSection />
      <ContactSection />
      <Footer />
    </>
  );
}
