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
import AirflowDivider from "@/components/AirflowDivider";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="pb-20 md:pb-0">
        <Hero />
        <AirflowDivider />
        <Services />
        <AirflowDivider />
        <BeforeAfterGallery />
        <AirflowDivider />
        <WhyChooseUs />
        <AirflowDivider />
        <Process />
        <AirflowDivider />
        <ServiceArea />
        <AirflowDivider />
        <Testimonials />
        <AirflowDivider />
        <QuoteForm />
      </main>
      <Footer />
      <StickyCallButton />
    </>
  );
}
