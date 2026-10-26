import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import BeforeAfterGallery from "@/components/BeforeAfterGallery";
import WhyChooseUs from "@/components/WhyChooseUs";
import Process from "@/components/Process";
import ServiceArea from "@/components/ServiceArea";
import Testimonials from "@/components/Testimonials";
import QuoteForm from "@/components/QuoteForm";
import Footer from "@/components/Footer";
import StickyCallButton from "@/components/StickyCallButton";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <BeforeAfterGallery />
        <WhyChooseUs />
        <Process />
        <ServiceArea />
        <Testimonials />
        <QuoteForm />
      </main>
      <Footer />
      <StickyCallButton />
    </>
  );
}
