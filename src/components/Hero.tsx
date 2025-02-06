import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <div className="relative isolate px-6 pt-14 lg:px-8">
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div className="text-center">
          <h1 className="animate-fade-up text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Empower Your Teaching with AI
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Better Classes helps professors focus on what truly matters—teaching and research. Let AI handle the routine tasks while you inspire minds.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6 animate-fade-up" style={{ animationDelay: "0.4s" }}>
            <Button className="rounded-md px-6 py-5 text-lg">
              Get Started
            </Button>
            <Button variant="outline" className="rounded-md px-6 py-5 text-lg">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};