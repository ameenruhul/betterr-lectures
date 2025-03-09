
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  CheckCircle, 
  BarChart, 
  Book, 
  Users, 
  MessageSquare, 
  Calendar, 
  Brain, 
  Sparkles, 
  FileText, 
  Zap, 
  Star, 
  ShieldCheck,
  ClipboardCheck,
  Lightbulb,
  GraduationCap,
  Clock,
  UserPlus,
  Building,
  Bookmark,
  Award,
  Sliders,
  Share2,
  PenTool,
  Eye,
  Send,
  Linkedin
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/ui/Logo";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Landing = () => {
  const [annualBilling, setAnnualBilling] = useState(true);
  
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/* Navbar */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Logo variant="large" />
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-medium text-gray-600 hover:text-ai-purple transition-colors">
              Login
            </Link>
            <Button asChild variant="gradient">
              <Link to="/login">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative py-24 md:py-32 overflow-hidden bg-hero-gradient">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-ai-purple/10 rounded-full blur-3xl"></div>
            <div className="absolute top-60 -left-20 w-60 h-60 bg-ai-red/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-20 w-40 h-40 bg-ai-magenta/10 rounded-full blur-3xl"></div>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8 max-w-xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 border border-gray-200 shadow-sm text-sm text-gray-600">
                  <Sparkles className="h-4 w-4 text-ai-magenta" />
                  <span>Built for Academic Excellence</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  Elevate Your Teaching with <span className="text-gradient-red-violet">AI-Powered</span> Academic Tools
                </h1>
                <p className="text-lg text-gray-700">
                  Designed specifically for university professors and educators, Better Lectures combines cutting-edge AI 
                  with pedagogical expertise to help you create exceptional learning experiences in less time.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <Button size="lg" variant="gradient" className="shadow-lg">
                    <Link to="/login" className="flex items-center">Start Free Trial <ArrowRight className="ml-2 h-5 w-5" /></Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild className="border-2 gradient-border">
                    <a href="#features">Explore Academic Tools</a>
                  </Button>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gradient-to-br from-ai-purple to-ai-red flex items-center justify-center text-white text-xs">
                        {String.fromCharCode(64 + i)}
                      </div>
                    ))}
                  </div>
                  <span>Trusted by 500+ universities worldwide</span>
                </div>
              </div>
              <div className="relative hidden md:block">
                <div className="absolute -z-10 -inset-0.5 bg-red-violet-gradient rounded-2xl blur-xl opacity-50"></div>
                <div className="relative animate-float p-2">
                  <div className="relative overflow-hidden rounded-2xl border border-white/20 backdrop-blur-sm glass-card shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-tr from-ai-red/5 to-ai-purple/10"></div>
                    <img 
                      src="/placeholder.svg" 
                      alt="Better Lectures Dashboard" 
                      className="w-full h-auto relative z-10" 
                    />
                    <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/90 backdrop-blur-sm shadow-lg border border-white/50">
                      <div className="flex gap-3 items-center">
                        <Brain className="h-8 w-8 text-ai-purple" />
                        <div className="text-left">
                          <h3 className="font-semibold text-gradient-red-violet">Academic AI Assistant</h3>
                          <p className="text-xs text-gray-600">Generating research-backed lecture content for your course...</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-10 -right-10 w-28 h-28 bg-violet-purple-gradient rounded-full blur-xl opacity-30 animate-pulse-slow"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-white border-y">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="space-y-2">
                <p className="text-3xl font-bold text-gradient-red-purple">95%</p>
                <p className="text-gray-600 text-sm">Time Saved on Course Preparation</p>
              </div>
              <div className="space-y-2">
                <p className="text-3xl font-bold text-gradient-red-purple">10,000+</p>
                <p className="text-gray-600 text-sm">Educators Using Platform</p>
              </div>
              <div className="space-y-2">
                <p className="text-3xl font-bold text-gradient-red-purple">500+</p>
                <p className="text-gray-600 text-sm">Universities Worldwide</p>
              </div>
              <div className="space-y-2">
                <p className="text-3xl font-bold text-gradient-red-purple">1M+</p>
                <p className="text-gray-600 text-sm">Academic Materials Generated</p>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section id="features" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center justify-center p-1 bg-gray-100 rounded-full mb-4">
                <span className="text-xs font-medium text-gray-800 px-3 py-1">PEDAGOGICAL AI TOOLS</span>
              </div>
              <h2 className="text-3xl font-bold mb-4 text-gradient-red-violet">Academic Tools That Transform Teaching</h2>
              <p className="text-gray-600">
                Our suite of AI tools is designed specifically for higher education, combining the latest in AI technology with proven pedagogical approaches.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard 
                icon={<Book className="h-10 w-10 text-ai-red" />}
                title="Research-Backed Lecture Planning"
                description="Generate comprehensive lecture plans based on your syllabus and the latest academic research in your field. Integrate recent publications and scholarly sources automatically."
                gradient="from-ai-red/10 to-ai-magenta/10"
              />
              <FeatureCard 
                icon={<Brain className="h-10 w-10 text-ai-magenta" />}
                title="Academic Content Creation"
                description="Transform curriculum outlines into fully-formed lectures with customized slides, notes, and discussion questions aligned with your teaching philosophy and course objectives."
                gradient="from-ai-magenta/10 to-ai-purple/10"
                highlighted={true}
              />
              <FeatureCard 
                icon={<ClipboardCheck className="h-10 w-10 text-ai-purple" />}
                title="Bloom's Taxonomy Assessment Tools"
                description="Create balanced assessments across all levels of Bloom's Taxonomy, ensuring you're testing critical thinking and not just memorization. Generate rubrics automatically."
                gradient="from-ai-purple/10 to-ai-violet/10"
              />
              <FeatureCard 
                icon={<Lightbulb className="h-10 w-10 text-ai-red" />}
                title="Adaptive Learning Pathways"
                description="Identify knowledge gaps in student understanding and automatically generate personalized learning resources to address those specific areas."
                gradient="from-ai-purple/10 to-ai-red/10"
              />
              <FeatureCard 
                icon={<FileText className="h-10 w-10 text-ai-magenta" />}
                title="Academic Study Materials"
                description="Generate comprehensive study guides, concept maps, flashcards, and practice exercises tailored to your specific course content and learning objectives."
                gradient="from-ai-magenta/10 to-ai-red/10"
              />
              <FeatureCard 
                icon={<Zap className="h-10 w-10 text-ai-purple" />}
                title="Scholarly Research Assistant"
                description="Stay current with AI-powered research tools that summarize academic papers, suggest relevant sources, and help integrate cutting-edge research into your teaching."
                gradient="from-ai-red/10 to-ai-purple/10"
              />
            </div>

            <div className="mt-16 grid md:grid-cols-2 gap-12">
              <div className="glass-card p-8 rounded-2xl relative">
                <div className="absolute -inset-0.5 bg-red-violet-gradient rounded-2xl opacity-20 blur-sm -z-10"></div>
                <h3 className="text-xl font-bold mb-6 text-gradient-red-magenta flex items-center gap-2">
                  <GraduationCap className="h-6 w-6" />
                  For Educators
                </h3>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <div className="mt-1 w-6 h-6 rounded-full bg-ai-red/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="h-3.5 w-3.5 text-ai-red" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Reduce Preparation Time by 95%</h4>
                      <p className="text-gray-600 text-sm">Focus more on student interaction and less on administrative tasks. Create a semester's worth of materials in days, not weeks.</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="mt-1 w-6 h-6 rounded-full bg-ai-purple/10 flex items-center justify-center flex-shrink-0">
                      <BookOpenCheck className="h-3.5 w-3.5 text-ai-purple" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Research-Aligned Teaching</h4>
                      <p className="text-gray-600 text-sm">Automatically incorporate the latest scholarly research into your lectures, keeping content current without hours of literature review.</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="mt-1 w-6 h-6 rounded-full bg-ai-magenta/10 flex items-center justify-center flex-shrink-0">
                      <Sliders className="h-3.5 w-3.5 text-ai-magenta" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Personalized Teaching Style</h4>
                      <p className="text-gray-600 text-sm">Our AI adapts to your teaching philosophy, whether you prefer Socratic method, case-based learning, or traditional lectures.</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="glass-card p-8 rounded-2xl relative">
                <div className="absolute -inset-0.5 bg-red-violet-gradient rounded-2xl opacity-20 blur-sm -z-10"></div>
                <h3 className="text-xl font-bold mb-6 text-gradient-red-magenta flex items-center gap-2">
                  <Users className="h-6 w-6" />
                  For Students
                </h3>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <div className="mt-1 w-6 h-6 rounded-full bg-ai-red/10 flex items-center justify-center flex-shrink-0">
                      <Award className="h-3.5 w-3.5 text-ai-red" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Higher Engagement & Retention</h4>
                      <p className="text-gray-600 text-sm">Our analytics show a 40% increase in student engagement with content created through Better Lectures.</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="mt-1 w-6 h-6 rounded-full bg-ai-purple/10 flex items-center justify-center flex-shrink-0">
                      <Eye className="h-3.5 w-3.5 text-ai-purple" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Clearer Learning Pathways</h4>
                      <p className="text-gray-600 text-sm">Students benefit from better-organized course materials with clear learning objectives and targeted resources.</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="mt-1 w-6 h-6 rounded-full bg-ai-magenta/10 flex items-center justify-center flex-shrink-0">
                      <Bookmark className="h-3.5 w-3.5 text-ai-magenta" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Comprehensive Study Resources</h4>
                      <p className="text-gray-600 text-sm">Give students access to AI-generated study guides, practice questions, and concept maps aligned with your course.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Dedicated Department & Teams Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center justify-center p-1 bg-gray-100 rounded-full mb-4">
                <span className="text-xs font-medium text-gray-800 px-3 py-1">INSTITUTIONAL SOLUTIONS</span>
              </div>
              <h2 className="text-3xl font-bold mb-4 text-gradient-red-violet">Empower Your Entire Department</h2>
              <p className="text-gray-600">
                Scale Better Lectures across your department, faculty, or institution with our comprehensive team solutions
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-0 overflow-hidden shadow-xl hover:shadow-2xl transition-shadow">
                <div className="absolute inset-0 bg-gradient-to-br from-ai-red/10 to-ai-purple/10 opacity-50"></div>
                <CardContent className="p-8 relative">
                  <div className="mb-6 w-14 h-14 rounded-2xl bg-red-violet-gradient flex items-center justify-center text-white shadow-lg">
                    <Building className="h-7 w-7" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gradient-red-violet">Department Solutions</h3>
                  <p className="text-gray-700 mb-6">
                    Streamline teaching across your entire department with coordinated course development, 
                    shared resources, and consistent quality standards.
                  </p>
                  
                  <div className="space-y-6 mb-8">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-ai-purple mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-800">Curriculum Alignment</h4>
                        <p className="text-gray-600 text-sm">Ensure consistent learning outcomes across all courses in your program with AI-assisted curriculum mapping.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-ai-purple mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-800">Shared Resource Library</h4>
                        <p className="text-gray-600 text-sm">Build a departmental knowledge base of teaching materials, assessment tools, and best practices.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-ai-purple mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-800">Assessment Standardization</h4>
                        <p className="text-gray-600 text-sm">Create consistent grading rubrics and assessment strategies across multiple course sections.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-ai-purple mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-800">Analytics Dashboard</h4>
                        <p className="text-gray-600 text-sm">Track department-wide teaching effectiveness and student engagement metrics in one place.</p>
                      </div>
                    </div>
                  </div>
                  
                  <Button variant="gradient" size="lg" className="w-full">
                    Schedule Department Demo
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="border-0 overflow-hidden shadow-xl hover:shadow-2xl transition-shadow">
                <div className="absolute inset-0 bg-gradient-to-br from-ai-magenta/10 to-ai-violet/10 opacity-50"></div>
                <CardContent className="p-8 relative">
                  <div className="mb-6 w-14 h-14 rounded-2xl bg-magenta-violet-gradient flex items-center justify-center text-white shadow-lg">
                    <UserPlus className="h-7 w-7" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gradient-red-magenta">Enterprise & Institution</h3>
                  <p className="text-gray-700 mb-6">
                    Full-scale implementation across your institution with custom integrations, 
                    dedicated support, and tailored training programs.
                  </p>
                  
                  <div className="space-y-6 mb-8">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-ai-magenta mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-800">LMS Integration</h4>
                        <p className="text-gray-600 text-sm">Seamlessly connect with Canvas, Blackboard, Moodle, and other learning management systems.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-ai-magenta mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-800">Custom AI Training</h4>
                        <p className="text-gray-600 text-sm">Train our AI on your institution's specific academic standards, outcomes, and teaching guidelines.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-ai-magenta mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-800">On-Campus Implementation</h4>
                        <p className="text-gray-600 text-sm">On-site training and implementation support from our academic technology specialists.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-ai-magenta mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-800">Institutional Analytics</h4>
                        <p className="text-gray-600 text-sm">Comprehensive data on teaching effectiveness across departments for accreditation and improvement.</p>
                      </div>
                    </div>
                  </div>
                  
                  <Button variant="gradient" size="lg" className="w-full">
                    Request Enterprise Quote
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center justify-center p-1 bg-gray-100 rounded-full mb-4">
                <span className="text-xs font-medium text-gray-800 px-3 py-1">INTUITIVE PROCESS</span>
              </div>
              <h2 className="text-3xl font-bold mb-4 text-gradient-red-magenta">How Better Lectures Works</h2>
              <p className="text-gray-600">
                Transform your teaching workflow with our simple three-step process
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <WorkflowStep 
                number="1"
                title="Upload Your Materials"
                description="Import your existing syllabus, course objectives, reading lists, or start from scratch with just a course title and description."
                icon={<ArrowRight className="h-5 w-5" />}
              />
              <WorkflowStep 
                number="2"
                title="Customize & Generate"
                description="Use our AI tools to create research-backed lectures, assessments, and study materials aligned with your teaching style and learning outcomes."
                icon={<ArrowRight className="h-5 w-5" />}
              />
              <WorkflowStep 
                number="3"
                title="Teach & Analyze"
                description="Deliver engaging lectures and use our analytics to measure student engagement, identify knowledge gaps, and continuously improve your teaching."
              />
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center justify-center p-1 bg-gray-100 rounded-full mb-4">
                <span className="text-xs font-medium text-gray-800 px-3 py-1">EDUCATOR EXPERIENCES</span>
              </div>
              <h2 className="text-3xl font-bold mb-4 text-gradient-red-violet">Trusted by Academic Leaders</h2>
              <p className="text-gray-600">
                Join thousands of professors and teaching assistants who have transformed their teaching experience
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <TestimonialCard 
                quote="As department chair, I've seen Better Lectures transform how our faculty prepare courses. The time saved on administrative tasks has allowed us to focus more on student mentorship and research."
                name="Dr. Sarah Johnson"
                title="Department Chair, Economics, Stanford University"
                image="/placeholder.svg"
              />
              <TestimonialCard 
                quote="The AI assistant understands pedagogical best practices and helps me design assessments that truly measure critical thinking rather than just memorization. My student evaluations have improved significantly."
                name="Michael Chen, Ph.D."
                title="Assistant Professor, Computer Science, MIT"
                image="/placeholder.svg"
              />
              <TestimonialCard 
                quote="As a new faculty member, Better Lectures helped me quickly develop a comprehensive course curriculum that met our department's standards. The research integration feature is particularly valuable."
                name="Dr. Maya Patel"
                title="Associate Professor, Psychology, UCLA"
                image="/placeholder.svg"
              />
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="py-20 bg-hero-gradient">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="inline-flex items-center justify-center p-1 bg-white/80 backdrop-blur-sm rounded-full mb-4">
                <span className="text-xs font-medium text-gray-800 px-3 py-1">FLEXIBLE PRICING</span>
              </div>
              <h2 className="text-3xl font-bold mb-4 text-gradient-red-magenta">Plans for Every Academic Need</h2>
              <p className="text-gray-600 mb-8">
                Choose the plan that fits your teaching requirements and institutional setting
              </p>
              
              <div className="flex items-center justify-center gap-3">
                <span className={!annualBilling ? "font-semibold" : "text-gray-500"}>Monthly</span>
                <Switch 
                  checked={annualBilling} 
                  onCheckedChange={setAnnualBilling} 
                  className="data-[state=checked]:bg-red-violet-gradient"
                />
                <span className={annualBilling ? "font-semibold" : "text-gray-500"}>Annual</span>
                <span className="ml-2 text-xs text-white bg-ai-red px-2 py-0.5 rounded-full">Save 20%</span>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <PricingCard 
                title="Educator"
                price={annualBilling ? "$180" : "$19"}
                period={annualBilling ? "year" : "month"}
                description="Perfect for individual educators"
                features={[
                  "50 AI generations per month",
                  "Basic lecture planning",
                  "Quiz & assignment generation",
                  "Research assistance",
                  "Email support"
                ]}
                buttonText="Start Free Trial"
                buttonVariant="outline"
              />
              <PricingCard 
                title="Department"
                price={annualBilling ? "$470" : "$49"}
                period={annualBilling ? "year" : "month"}
                description="Ideal for teaching teams"
                features={[
                  "Unlimited AI generations",
                  "Advanced lecture planning",
                  "Full assessment suite",
                  "Curriculum alignment tools",
                  "Shared department resources",
                  "Priority support"
                ]}
                buttonText="Most Popular"
                buttonVariant="gradient"
                highlighted={true}
              />
              <PricingCard 
                title="Institution"
                price={annualBilling ? "$1,900" : "$199"}
                period={annualBilling ? "year" : "month"}
                description="For entire faculties or schools"
                features={[
                  "Everything in Department",
                  "Custom LMS integration",
                  "Institutional analytics",
                  "On-campus implementation",
                  "Custom AI training",
                  "Dedicated account manager"
                ]}
                buttonText="Contact Sales"
                buttonVariant="outline"
              />
            </div>
            
            <div className="mt-12 text-center">
              <p className="text-sm text-gray-600">
                Need a custom solution? <a href="#contact" className="text-ai-red underline hover:text-ai-purple transition-colors">Contact our education specialists</a>
              </p>
            </div>
          </div>
        </section>

        {/* Community Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center justify-center p-1 bg-gray-100 rounded-full mb-4">
                <span className="text-xs font-medium text-gray-800 px-3 py-1">JOIN OUR COMMUNITY</span>
              </div>
              <h2 className="text-3xl font-bold mb-4 text-gradient-red-violet">Connect with Fellow Educators</h2>
              <p className="text-gray-600">
                Become part of our growing community of innovative educators sharing ideas and best practices
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all">
                <CardContent className="p-8">
                  <div className="mb-6 w-14 h-14 rounded-full bg-gradient-to-br from-ai-red to-ai-magenta flex items-center justify-center text-white">
                    <Linkedin className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gradient-red-violet">LinkedIn Community</h3>
                  <p className="text-gray-600 mb-6">
                    Join our exclusive LinkedIn group to connect with educators, share success stories, and discuss innovative teaching approaches.
                  </p>
                  <Button variant="outline" className="w-full border-2 gradient-border">
                    <a href="#" className="flex items-center justify-center gap-2">
                      Join LinkedIn Group
                      <Share2 className="h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all">
                <CardContent className="p-8">
                  <div className="mb-6 w-14 h-14 rounded-full bg-gradient-to-br from-ai-magenta to-ai-purple flex items-center justify-center text-white">
                    <MessageSquare className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gradient-red-magenta">Feature Requests</h3>
                  <p className="text-gray-600 mb-6">
                    Tell us what features would improve your teaching experience. We actively incorporate educator feedback into our development roadmap.
                  </p>
                  <Button variant="outline" className="w-full border-2 gradient-border">
                    <a href="#" className="flex items-center justify-center gap-2">
                      Submit Feature Request
                      <PenTool className="h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all">
                <CardContent className="p-8">
                  <div className="mb-6 w-14 h-14 rounded-full bg-gradient-to-br from-ai-purple to-ai-violet flex items-center justify-center text-white">
                    <Calendar className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gradient-red-purple">Webinars & Training</h3>
                  <p className="text-gray-600 mb-6">
                    Attend our regular webinars on AI in education, educational technology trends, and best practices for course design.
                  </p>
                  <Button variant="outline" className="w-full border-2 gradient-border">
                    <a href="#" className="flex items-center justify-center gap-2">
                      View Upcoming Events
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-red-violet-gradient">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <div className="mb-6 mx-auto w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                <Brain className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-6">
                Ready to Transform Your Academic Teaching?
              </h2>
              <p className="text-white/90 mb-8 text-lg">
                Join thousands of educators who are saving time, improving student outcomes, and reinvigorating their teaching with Better Lectures.
              </p>
              <Button size="lg" className="bg-white text-ai-purple hover:bg-white/90 shadow-xl">
                <Link to="/login" className="font-medium flex items-center">
                  Start Your Free Trial <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <div className="mt-8 pt-8 border-t border-white/20 grid grid-cols-2 md:grid-cols-4 gap-6 text-white text-center">
                <div>
                  <ShieldCheck className="h-6 w-6 mx-auto mb-2" />
                  <p className="text-sm">FERPA Compliant</p>
                </div>
                <div>
                  <Zap className="h-6 w-6 mx-auto mb-2" />
                  <p className="text-sm">Research-Backed</p>
                </div>
                <div>
                  <Star className="h-6 w-6 mx-auto mb-2" />
                  <p className="text-sm">5-Star Support</p>
                </div>
                <div>
                  <Users className="h-6 w-6 mx-auto mb-2" />
                  <p className="text-sm">Educator Community</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center justify-center p-1 bg-gray-100 rounded-full mb-4">
                <span className="text-xs font-medium text-gray-800 px-3 py-1">CONNECT WITH US</span>
              </div>
              <h2 className="text-3xl font-bold mb-4 text-gradient-red-violet">We're Here To Support You</h2>
              <p className="text-gray-600">
                Have questions about how Better Lectures can help your specific teaching needs? Our education specialists are ready to assist.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              <div className="glass-card p-8 rounded-2xl relative">
                <div className="absolute -inset-0.5 bg-red-violet-gradient rounded-2xl opacity-20 blur-sm -z-10"></div>
                <h3 className="text-xl font-semibold mb-6 text-gradient-red-magenta">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-ai-purple">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Educational Support</p>
                      <p className="font-medium">academic@betterlectures.edu</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-ai-purple">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Implementation Support</p>
                      <p className="font-medium">(800) 555-0123</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-ai-purple">
                      <Building className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Department Solutions</p>
                      <p className="font-medium">departments@betterlectures.edu</p>
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-semibold mt-10 mb-6 text-gradient-red-magenta">Connect With Us</h3>
                <div className="flex gap-3">
                  <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-ai-purple hover:bg-ai-purple hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-ai-purple hover:bg-ai-purple hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-ai-purple hover:bg-ai-purple hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z" />
                    </svg>
                  </a>
                </div>
              </div>
              
              <div className="glass-card p-8 rounded-2xl relative">
                <div className="absolute -inset-0.5 bg-red-violet-gradient rounded-2xl opacity-20 blur-sm -z-10"></div>
                <h3 className="text-xl font-semibold mb-6 text-gradient-red-magenta">Request Information</h3>
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        className="w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-ai-purple focus:border-ai-purple bg-white/70"
                        placeholder="Your name" 
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input 
                        type="email" 
                        id="email" 
                        className="w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-ai-purple focus:border-ai-purple bg-white/70"
                        placeholder="Your email" 
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="institution" className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
                    <input 
                      type="text" 
                      id="institution" 
                      className="w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-ai-purple focus:border-ai-purple bg-white/70"
                      placeholder="University or institution name" 
                    />
                  </div>
                  <div>
                    <label htmlFor="inquiry" className="block text-sm font-medium text-gray-700 mb-1">I'm interested in</label>
                    <select 
                      id="inquiry" 
                      className="w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-ai-purple focus:border-ai-purple bg-white/70"
                    >
                      <option value="individual">Individual Educator Plan</option>
                      <option value="department">Department Solution</option>
                      <option value="institution">Institution-wide Implementation</option>
                      <option value="demo">Product Demo</option>
                      <option value="other">Other Inquiry</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea 
                      id="message" 
                      rows={4} 
                      className="w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-ai-purple focus:border-ai-purple bg-white/70"
                      placeholder="Tell us about your specific needs" 
                    ></textarea>
                  </div>
                  <Button type="submit" variant="gradient" className="w-full shadow-md">
                    <Send className="mr-2 h-4 w-4" />
                    Send Request
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <Logo variant="default" className="text-white mb-4" />
              <p className="text-gray-400">
                Empowering higher education with AI-powered tools designed specifically for university teaching and learning.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Academic Tools</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Lecture Creation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Assessment Design</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Research Assistant</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Study Guide Generation</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Academic Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Teaching Resources</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Educator Community</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Implementation Guide</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy & FERPA</a></li>
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
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-2 16h-2v-6h2v6zm-1-6.75c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25zM17 16h-2v-3c0-.55-.45-1-1-1s-1 .45-1 1v3h-2v-6h2v1.24c.67-.85 1.79-1.1 2.81-.87.77.17 1.39.78 1.63 1.54.12.38.18.79.18 1.19v2.9z" />
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

// Helper Components for Landing Page
const FeatureCard = ({ icon, title, description, gradient, highlighted = false }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
  gradient: string;
  highlighted?: boolean;
}) => {
  return (
    <Card className={`border-0 shadow-lg hover:shadow-xl transition-shadow overflow-hidden ${highlighted ? 'ring-2 ring-ai-purple/20' : ''}`}>
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-50`}></div>
      <CardContent className="p-6 bg-white/80 backdrop-blur-sm relative z-10">
        <div className="feature-icon-bg w-fit mb-4">{icon}</div>
        <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );
};

const WorkflowStep = ({ number, title, description, icon }: {
  number: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
}) => {
  return (
    <div className="text-center p-6 glass-card rounded-2xl relative group">
      <div className="absolute -inset-0.5 bg-red-violet-gradient rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity blur-sm -z-10"></div>
      <div className="w-12 h-12 rounded-full bg-red-violet-gradient text-white flex items-center justify-center text-xl font-bold mx-auto mb-4 shadow-lg">
        {number}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gradient-red-violet">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      {icon && (
        <div className="hidden md:flex justify-center text-ai-purple opacity-60">
          {icon}
        </div>
      )}
    </div>
  );
};

const TestimonialCard = ({ quote, name, title, image }: {
  quote: string;
  name: string;
  title: string;
  image: string;
}) => {
  return (
    <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
      <CardContent className="p-6 relative">
        <div className="absolute top-6 right-6 text-ai-purple opacity-20">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
        </div>
        <div className="flex flex-col h-full">
          <p className="text-gray-700 mb-6 z-10 relative">{quote}</p>
          <div className="mt-auto pt-4 border-t flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-ai-purple to-ai-red flex items-center justify-center text-white text-sm font-bold">
              {name.charAt(0)}
            </div>
            <div>
              <p className="font-semibold text-gradient-red-violet">{name}</p>
              <p className="text-sm text-gray-500">{title}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const PricingCard = ({ 
  title, 
  price, 
  period = "month",
  description, 
  features, 
  buttonText, 
  buttonVariant = "outline",
  highlighted = false 
}: {
  title: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  buttonText: string;
  buttonVariant?: "default" | "outline" | "gradient";
  highlighted?: boolean;
}) => {
  return (
    <Card className={`border-0 ${highlighted ? 'shadow-2xl scale-105 z-10' : 'shadow-lg'} transition-all relative overflow-hidden`}>
      {highlighted && (
        <div className="absolute -top-4 left-0 right-0 mx-auto w-max bg-red-violet-gradient text-white text-xs font-semibold py-1 px-3 rounded-full shadow-md">
          MOST POPULAR
        </div>
      )}
      <div className={`absolute bottom-0 left-0 right-0 h-1 ${highlighted ? 'bg-red-violet-gradient' : 'bg-gradient-to-r from-gray-200 to-gray-300'}`}></div>
      <CardContent className={`p-8 ${highlighted ? 'bg-white' : 'bg-white/90'}`}>
        <h3 className="text-xl font-bold mb-2 text-gradient-red-violet">{title}</h3>
        <div className="flex items-baseline mb-4">
          <span className="text-3xl font-bold">{price}</span>
          <span className="text-gray-500 ml-1">/{period}</span>
        </div>
        <p className="text-gray-600 mb-6">{description}</p>
        <ul className="space-y-3 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <CheckCircle className="h-5 w-5 text-ai-purple mr-2 flex-shrink-0" />
              <span className="text-gray-600">{feature}</span>
            </li>
          ))}
        </ul>
        <Button 
          variant={buttonVariant} 
          className={`w-full shadow-md ${buttonVariant === "gradient" ? "" : "border-2 gradient-border"}`}
        >
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
};

// Add missing components
const BookOpenCheck = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 3H2v15h7c1.7 0 3 1.3 3 3V7c0-2.2-1.8-4-4-4Z" />
      <path d="m16 12 2 2 4-4" />
      <path d="M22 6V3h-6c-2.2 0-4 1.8-4 4v14c0-1.7 1.3-3 3-3h7V6Z" />
    </svg>
  );
};

export default Landing;

