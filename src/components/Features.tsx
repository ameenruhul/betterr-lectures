import { BookOpen, Brain, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    title: "AI-Powered Content Creation",
    description: "Generate professional lecture slides and materials in minutes with advanced AI assistance.",
    icon: Brain,
  },
  {
    title: "Save Precious Time",
    description: "Automate routine tasks and focus more on teaching and research that matters.",
    icon: Clock,
  },
  {
    title: "Stay Current",
    description: "Automatically incorporate the latest research and developments into your course materials.",
    icon: BookOpen,
  },
];

export const Features = () => {
  return (
    <div className="py-24 sm:py-32 bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything You Need to Excel
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Streamline your workflow and enhance your teaching with our comprehensive suite of tools.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-7xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16">
            {features.map((feature) => (
              <Card key={feature.title} className="relative animate-fade-up hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                    <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  <CardTitle className="mt-4 font-semibold leading-7 text-gray-900">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mt-2 leading-7 text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};