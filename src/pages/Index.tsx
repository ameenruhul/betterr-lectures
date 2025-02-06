import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Testimonials } from "@/components/Testimonials";
import { Navbar } from "@/components/Navbar";

const Index = () => {
  return (
    <div className="bg-white">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Testimonials />
      </main>
    </div>
  );
};

export default Index;