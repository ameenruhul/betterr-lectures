import { Button } from "@/components/ui/button";
import { Brain, Clock, BookOpen } from "lucide-react";

export const Hero = () => {
  return (
    <div className="relative isolate px-6 pt-14 lg:px-8">
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
      </div>
      
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div className="text-center">
          <h1 className="animate-fade-up text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Empower Your Teaching with AI
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Better Classes helps professors focus on what truly matters—teaching and research. Let AI handle the routine tasks while you inspire minds.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6 animate-fade-up" style={{ animationDelay: "0.4s" }}>
            <Button size="lg" className="rounded-md">
              Get Started
              <Brain className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="rounded-md">
              Learn More
              <BookOpen className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
        <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-primary to-[#9089fc] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" />
      </div>
    </div>
  );
};