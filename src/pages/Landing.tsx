
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, BarChart, Book, Users, MessageSquare, Calendar, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/ui/Logo";
import { Card, CardContent } from "@/components/ui/card";

const Landing = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Logo variant="large" />
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-medium text-gray-600 hover:text-primary">
              Login
            </Link>
            <Button asChild>
              <Link to="/login">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-blue-50 to-indigo-50 py-20 overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 max-w-xl">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Empower Your Teaching with <span className="text-primary">AI</span>
                </h1>
                <p className="text-lg text-gray-700">
                  Better Lectures helps professors focus on what truly matters—teaching and research. 
                  Let AI handle the routine tasks while you inspire minds.
                </p>
                <div className="flex gap-4 pt-4">
                  <Button size="lg" asChild>
                    <Link to="/login">Start Now</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <a href="#features">Learn More</a>
                  </Button>
                </div>
              </div>
              <div className="relative hidden md:block">
                <div className="relative rounded-lg shadow-xl overflow-hidden">
                  <img 
                    src="/placeholder.svg" 
                    alt="Better Lectures Dashboard" 
                    className="w-full h-auto" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section id="features" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-4">Transforming Education with AI</h2>
              <p className="text-gray-600">
                Our suite of AI-powered tools helps professors create exceptional learning experiences with less effort.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard 
                icon={<Book className="h-10 w-10 text-blue-500" />}
                title="Lecture Preparation"
                description="Generate comprehensive lecture plans, notes, and presentation materials in minutes instead of hours."
              />
              <FeatureCard 
                icon={<MessageSquare className="h-10 w-10 text-purple-500" />}
                title="AI Assistant"
                description="Your personal teaching assistant that helps with content creation, research, and answering student questions."
              />
              <FeatureCard 
                icon={<BarChart className="h-10 w-10 text-green-500" />}
                title="Assessment Generation"
                description="Easily create quizzes, assignments, and study guides that align with your teaching objectives."
              />
              <FeatureCard 
                icon={<Calendar className="h-10 w-10 text-amber-500" />}
                title="Lesson Planning"
                description="Craft detailed lesson plans that engage students and meet educational standards."
              />
              <FeatureCard 
                icon={<Brain className="h-10 w-10 text-red-500" />}
                title="Research Assistance"
                description="Access AI-powered research tools to stay current with the latest developments in your field."
              />
              <FeatureCard 
                icon={<Users className="h-10 w-10 text-indigo-500" />}
                title="Teaching Community"
                description="Connect with other educators to share insights, resources, and teaching strategies."
              />
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-4">How Better Lectures Works</h2>
              <p className="text-gray-600">
                Save time and enhance your teaching effectiveness with our simple workflow.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <WorkflowStep 
                number="1"
                title="Upload Course Materials"
                description="Add your existing course materials or start from scratch."
              />
              <WorkflowStep 
                number="2"
                title="Generate Content"
                description="Use our AI tools to create lectures, quizzes, assignments, and more."
              />
              <WorkflowStep 
                number="3"
                title="Teach Confidently"
                description="Deliver engaging lectures with perfectly prepared materials."
              />
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-4">Trusted by Educators</h2>
              <p className="text-gray-600">
                Here's what professors and teaching assistants are saying about Better Lectures.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <TestimonialCard 
                quote="Better Lectures has revolutionized how I prepare for my classes. What used to take days now takes minutes."
                name="Dr. Sarah Johnson"
                title="Professor of Economics, Stanford University"
              />
              <TestimonialCard 
                quote="As a new TA, Better Lectures helped me create engaging materials that impressed both students and faculty."
                name="Michael Chen"
                title="Teaching Assistant, MIT"
              />
              <TestimonialCard 
                quote="The quiz generation feature alone has saved me countless hours. My students appreciate the quality and consistency."
                name="Dr. David Martinez"
                title="Associate Professor, UCLA"
              />
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
              <p className="text-gray-600">
                Choose the plan that best suits your teaching needs.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <PricingCard 
                title="Starter"
                price="$19"
                description="Perfect for individual professors"
                features={[
                  "50 AI generations per month",
                  "Basic lecture planning",
                  "Quiz generation",
                  "Email support"
                ]}
                buttonText="Get Started"
                buttonVariant="outline"
              />
              <PricingCard 
                title="Professional"
                price="$49"
                description="Ideal for active educators"
                features={[
                  "200 AI generations per month",
                  "Advanced lecture planning",
                  "Assignment & quiz generation",
                  "Research assistance",
                  "Priority support"
                ]}
                buttonText="Most Popular"
                buttonVariant="default"
                highlighted={true}
              />
              <PricingCard 
                title="Department"
                price="$199"
                description="For teaching teams"
                features={[
                  "Unlimited AI generations",
                  "Full feature access",
                  "Team collaboration",
                  "Custom integrations",
                  "Dedicated support"
                ]}
                buttonText="Contact Sales"
                buttonVariant="outline"
              />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-6">
                Ready to Transform Your Teaching?
              </h2>
              <p className="text-white/90 mb-8 text-lg">
                Join thousands of educators who are saving time and improving their teaching with Better Lectures.
              </p>
              <Button size="lg" variant="secondary" asChild>
                <Link to="/login" className="text-primary font-medium">
                  Get Started Today <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
              <p className="text-gray-600">
                Have questions or need help? Our team is here for you.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              <div>
                <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <p className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>support@betterlectures.edu</span>
                  </p>
                  <p className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>(800) 555-0123</span>
                  </p>
                </div>

                <h3 className="text-xl font-semibold mt-8 mb-4">Join Our Community</h3>
                <div className="flex gap-4">
                  <a href="#" className="text-gray-600 hover:text-primary transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-600 hover:text-primary transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-600 hover:text-primary transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-2 16.5h-2v-6h2v6zm-1-6.75c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25zM17 16.5h-2v-3c0-.55-.45-1-1-1s-1 .45-1 1v3h-2v-6h2v1.24c.67-.85 1.79-1.1 2.81-.87.77.17 1.39.78 1.63 1.54.12.38.18.79.18 1.19v2.9z" />
                    </svg>
                  </a>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">Send Us a Message</h3>
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                        placeholder="Your name" 
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input 
                        type="email" 
                        id="email" 
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                        placeholder="Your email" 
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                    <input 
                      type="text" 
                      id="subject" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                      placeholder="Message subject" 
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea 
                      id="message" 
                      rows={4} 
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                      placeholder="Your message" 
                    ></textarea>
                  </div>
                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <Logo variant="default" className="text-white mb-4" />
              <p className="text-gray-400">
                Empowering professors with AI-powered tools to create exceptional learning experiences.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Features</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Lecture Preparation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Assessment Creation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Research Assistant</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Study Guide Generation</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Community</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Better Lectures. All rights reserved.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-2 16.5h-2v-6h2v6zm-1-6.75c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25zM17 16.5h-2v-3c0-.55-.45-1-1-1s-1 .45-1 1v3h-2v-6h2v1.24c.67-.85 1.79-1.1 2.81-.87.77.17 1.39.78 1.63 1.54.12.38.18.79.18 1.19v2.9z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Helper Components
const FeatureCard = ({ icon, title, description }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string 
}) => {
  return (
    <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="mb-4">{icon}</div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );
};

const WorkflowStep = ({ number, title, description }: {
  number: string;
  title: string;
  description: string;
}) => {
  return (
    <div className="text-center p-6">
      <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold mx-auto mb-4">
        {number}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const TestimonialCard = ({ quote, name, title }: {
  quote: string;
  name: string;
  title: string;
}) => {
  return (
    <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="mb-4 text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
        </div>
        <p className="text-gray-700 mb-6">{quote}</p>
        <div className="mt-auto">
          <p className="font-semibold">{name}</p>
          <p className="text-sm text-gray-500">{title}</p>
        </div>
      </CardContent>
    </Card>
  );
};

const PricingCard = ({ 
  title, 
  price, 
  description, 
  features, 
  buttonText, 
  buttonVariant = "outline",
  highlighted = false 
}: {
  title: string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
  buttonVariant?: "default" | "outline";
  highlighted?: boolean;
}) => {
  return (
    <Card className={`border ${highlighted ? 'border-primary shadow-lg ring-1 ring-primary/20' : 'border-gray-200 shadow-sm'} relative`}>
      {highlighted && (
        <div className="absolute -top-4 left-0 right-0 mx-auto w-max bg-primary text-white text-xs font-semibold py-1 px-3 rounded-full">
          MOST POPULAR
        </div>
      )}
      <CardContent className={`p-6 ${highlighted ? 'pt-8' : ''}`}>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <div className="flex items-baseline mb-4">
          <span className="text-3xl font-bold">{price}</span>
          <span className="text-gray-500 ml-1">/month</span>
        </div>
        <p className="text-gray-600 mb-6">{description}</p>
        <ul className="space-y-3 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
              <span className="text-gray-600">{feature}</span>
            </li>
          ))}
        </ul>
        <Button variant={buttonVariant} className="w-full">
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
};

export default Landing;
