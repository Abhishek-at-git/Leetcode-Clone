import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code2, Target, Users, Zap, Globe, Shield } from "lucide-react";

export const metadata = {
  title: "About Us - LeetCode Clone",
  description: "Learn more about our mission to help developers master algorithms and data structures.",
};

export default function AboutPage() {
  const features = [
    {
      icon: Code2,
      title: "Interactive Coding Environment",
      description: "Write, test, and debug your code in our state-of-the-art browser IDE with real-time feedback.",
    },
    {
      icon: Target,
      title: "Curated Problem Sets",
      description: "From beginner to advanced, our carefully structured problems help you master key concepts.",
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Join thousands of developers, share solutions, and learn from peer code reviews.",
    },
    {
      icon: Zap,
      title: "Performance Metrics",
      description: "Analyze your runtime and memory usage against global benchmarks to write optimized code.",
    },
    {
      icon: Globe,
      title: "Multi-Language Support",
      description: "Code in Python, JavaScript, Java, C++, and more. Choose the tool that fits the job.",
    },
    {
      icon: Shield,
      title: "Interview Ready",
      description: "Prepare for top tech company interviews with curated lists of frequently asked questions.",
    },
  ];

  return (
    <div className="min-h-screen py-24 bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-4 max-w-5xl mb-24 text-center">
        <Badge variant="secondary" className="mb-6">Our Mission</Badge>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
          Empowering Developers to <span className="text-primary">Master Code</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          We believe that algorithmic thinking and problem-solving are the core of great software engineering. 
          Our platform provides the tools, challenges, and community you need to land your dream job and level up your skills.
        </p>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 max-w-6xl mb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose Us?</h2>
          <p className="text-muted-foreground">Everything you need to succeed in technical interviews.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <Card key={idx} className="border bg-card/50 backdrop-blur hover:bg-card/80 transition-colors">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Stats or Call to Action */}
      <section className="container mx-auto px-4 max-w-4xl text-center">
        <div className="bg-primary/5 rounded-3xl p-12 border">
          <h2 className="text-3xl font-bold mb-6">Ready to start coding?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join our community today and take the first step towards mastering algorithms and data structures.
          </p>
          <a 
            href="/problems" 
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-12 px-8 py-3"
          >
            Explore Problems
          </a>
        </div>
      </section>
    </div>
  );
}
