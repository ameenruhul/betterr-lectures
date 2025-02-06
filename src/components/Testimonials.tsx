import { Card, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Dr. Sarah Chen",
    role: "Professor of Computer Science",
    content: "Better Classes has revolutionized how I prepare my lectures. The AI-powered content generation saves me hours each week.",
    image: "/placeholder.svg"
  },
  {
    name: "Prof. Michael Roberts",
    role: "Department Chair, Physics",
    content: "The automated research updates ensure our course material stays current with the latest developments in the field.",
    image: "/placeholder.svg"
  },
  {
    name: "Dr. Emily Thompson",
    role: "Associate Professor, Biology",
    content: "The quiz generation feature is a game-changer. I can focus more on research while maintaining high-quality assessments.",
    image: "/placeholder.svg"
  }
];

export const Testimonials = () => {
  return (
    <section className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Trusted by Leading Educators
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Hear from professors who have transformed their teaching experience with Better Classes.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="animate-fade-up hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-x-4">
                  <Avatar className="h-12 w-12">
                    <img
                      className="h-full w-full rounded-full object-cover"
                      src={testimonial.image}
                      alt={testimonial.name}
                    />
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="mt-6 text-base leading-7 text-gray-600">{testimonial.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};