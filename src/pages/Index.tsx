import Header from "@/components/Header";
import Hero from "@/components/Hero";
import UserRoles from "@/components/UserRoles";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import About from "@/components/About";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <UserRoles />
        <Features />
        <HowItWorks />
        <Pricing />
        <About />
      </main>
      <Footer />
    </div>
  );
};

export default Index;