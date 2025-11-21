import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import spartanArmyImage from "@/assets/spartan-obsidian-army.jpg";
import Image from "next/image";

const Methodology = () => {
  const nassDomains = [
    {
      title: "The Technology",
      description: "Assessing technical maturity, reliability, and integration capabilities"
    },
    {
      title: "The Value Proposition",
      description: "Evaluating clear benefits for all stakeholders in the healthcare ecosystem"
    },
    {
      title: "The Adopter System",
      description: "Understanding clinicians, patients, and their willingness to adopt"
    },
    {
      title: "The Organization",
      description: "Analyzing organizational readiness, capacity, and change management"
    },
    {
      title: "The Wider Context",
      description: "Political, economic, social, and regulatory environment factors"
    },
    {
      title: "The Embedding Process",
      description: "Integration into routine workflows and sustained adoption"
    },
    {
      title: "Adaptation Over Time",
      description: "Flexibility to evolve with changing healthcare landscapes"
    }
  ];

  const playToWinChoices = [
    {
      title: "Where to Play",
      description: "Which markets, segments, and geographies to compete in"
    },
    {
      title: "How to Win",
      description: "How to create sustainable competitive advantage in chosen markets"
    },
    {
      title: "Core Capabilities",
      description: "What unique abilities you need to build and maintain"
    },
    {
      title: "Management Systems",
      description: "Infrastructure to support strategy execution and measurement"
    },
    {
      title: "Must-Have Capabilities",
      description: "Critical capabilities required to deliver your value proposition"
    }
  ];

  return (
    <div className="min-h-screen relative text-foreground">
      <Navigation />
      
      {/* Spartan marble statues background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-white/30" />
        <Image
          src={spartanArmyImage}
          alt="Spartan Warriors"
          className="w-full h-full object-cover opacity-70"
        />
        {/* <img
          src={spartanArmyImage}
          alt="Spartan Warriors"
          className="w-full h-full object-cover opacity-70"
        /> */}
      </div>
      
      <div className="relative z-10 container mx-auto px-6 pt-32 pb-20">
        <div className="rounded-3xl bg-light-cream/90 backdrop-blur-xl shadow-2xl px-6 py-10 md:px-10 md:py-12">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-gray-900 font-cinzel drop-shadow-lg">
              Our Methodology
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto drop-shadow-sm">
              We combine two powerful strategic frameworks to assess your digital health innovation
            </p>
          </div>

          <div className="max-w-6xl mx-auto space-y-20">
          <section className="animate-fade-in">
            <div className="mb-12">
              <h2 className="text-4xl font-bold mb-4 text-primary font-cinzel drop-shadow-md">NASSS Framework</h2>
              <p className="text-xl text-gray-700">
                The Non-adoption, Abandonment, Scale-up, Spread, and Sustainability framework 
                helps predict and address implementation challenges.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {nassDomains.map((domain, index) => (
                <Card 
                  key={index}
                  className="p-6 bg-white/90 border-primary/20 shadow-lg hover:border-primary hover:shadow-xl transition-all duration-300 hover:scale-105"
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-charcoal">{domain.title}</h3>
                      <p className="text-charcoal/80">{domain.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          <section className="animate-fade-in">
            <div className="mb-12">
              <h2 className="text-4xl font-bold mb-4 text-secondary font-cinzel drop-shadow-md">Play-to-Win Framework</h2>
              <p className="text-xl text-gray-700">
                Roger Martin's strategic framework for making clear, cascading strategic choices.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {playToWinChoices.map((choice, index) => (
                <Card 
                  key={index}
                  className="p-6 bg-white/90 border-secondary/20 shadow-lg hover:border-secondary hover:shadow-xl transition-all duration-300 hover:scale-105"
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="h-6 w-6 text-secondary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-charcoal">{choice.title}</h3>
                      <p className="text-charcoal/80">{choice.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          <section className="text-center py-12">
            <Card className="p-12 bg-gradient-to-br from-warm-cream to-light-cream border-primary shadow-xl">
              <h3 className="text-3xl font-bold mb-4 text-charcoal">The Leo Advantage</h3>
              <p className="text-xl text-charcoal/80 max-w-2xl mx-auto">
                By synthesizing insights from both frameworks, Leo provides a comprehensive 
                assessment that identifies critical risks and strategic opportunities before you commit resources.
              </p>
            </Card>
          </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Methodology;
