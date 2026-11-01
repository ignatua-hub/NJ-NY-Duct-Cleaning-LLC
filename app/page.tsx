import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import BeforeAfterGallery from "@/components/BeforeAfterGallery";
import HomeLuxExperience from "@/components/HomeLuxExperience";
import WhyChooseUs from "@/components/WhyChooseUs";
import Process from "@/components/Process";
import ServiceArea from "@/components/ServiceArea";
import QuoteForm from "@/components/QuoteForm";
import Footer from "@/components/Footer";
import StickyCallButton from "@/components/StickyCallButton";
import AirflowDivider from "@/components/AirflowDivider";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <AirflowDivider />
        <Services />
        <AirflowDivider />
        <BeforeAfterGallery />
        <AirflowDivider />
        <HomeLuxExperience />
        <AirflowDivider />
        <WhyChooseUs />
        <AirflowDivider />
        <Process />
        <AirflowDivider />
        <ServiceArea />
        <AirflowDivider />
        <QuoteForm />
      </main>
      <Footer />
      <StickyCallButton />
    </>
  );
}
