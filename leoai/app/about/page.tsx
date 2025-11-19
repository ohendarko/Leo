import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Linkedin, Mail, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import olympusPalaceImage from "@/assets/olympus-palace-interior.jpg";
import Image from "next/image";

const About = () => {
  return (
    <div className="min-h-screen relative bg-background text-foreground">
      <Navigation />
      
      {/* Olympus palace interior background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-black/65" />
        <Image
          src={olympusPalaceImage}
          alt="Olympus Palace Interior"
          className="w-full h-full object-cover opacity-45"
        />
        {/* <img
          src={olympusPalaceImage}
          alt="Olympus Palace Interior"
          className="w-full h-full object-cover opacity-45"
        /> */}
      </div>
      
      <div className="relative z-10 container mx-auto px-6 pt-32 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-gold font-cinzel">
              About Leo
            </h1>
            <p className="text-xl text-warm-beige">
              Strategic validation for digital health innovators
            </p>
          </div>

          <Card className="p-12 bg-card/95 backdrop-blur-sm border-gold/30 mb-12 animate-fade-in">
            <div className="flex flex-col items-center text-center mb-8">
              <div className="w-32 h-32 rounded-full bg-primary/20 flex items-center justify-center mb-6 border-2 border-gold/50">
                <span className="text-6xl">🦁</span>
              </div>
              <h2 className="text-3xl font-bold mb-4 text-gold font-cinzel">The Vision</h2>
            </div>

            <div className="prose prose-invert max-w-none space-y-6 text-lg">
              <p className="text-foreground">
                Leo was born from a simple observation: most digital health startups fail not because 
                their technology is inadequate, but because they haven't rigorously tested their strategy 
                against the complex realities of healthcare systems.
              </p>

              <p className="text-foreground">
                Named after the lion—a symbol of courage and strategic thinking—Leo combines battle-tested 
                frameworks from implementation science (NASSS) and business strategy (Play-to-Win) to help 
                founders validate their ideas before committing millions in resources.
              </p>

              <p className="text-foreground">
                Healthcare innovation requires more than good intentions. It demands strategic clarity, 
                stakeholder alignment, and a deep understanding of organizational dynamics. Leo provides 
                that critical reality check.
              </p>
            </div>
          </Card>

          <Card className="p-12 bg-card/95 backdrop-blur-sm border-gold/30 animate-fade-in">
            <h2 className="text-3xl font-bold mb-8 text-center text-gold font-cinzel">Our Commitment</h2>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center border border-primary/50">
                  <span className="text-3xl">🎯</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-primary font-cinzel">Strategic Rigor</h3>
                <p className="text-warm-beige">
                  Evidence-based frameworks, not guesswork
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary/20 flex items-center justify-center border border-secondary/50">
                  <span className="text-3xl">🏥</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-secondary font-cinzel">Healthcare Focus</h3>
                <p className="text-warm-beige">
                  Deep understanding of health system complexity
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/20 flex items-center justify-center border border-accent/50">
                  <span className="text-3xl">💡</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-accent font-cinzel">Actionable Insights</h3>
                <p className="text-warm-beige">
                  Clear recommendations, not vague platitudes
                </p>
              </div>
            </div>

            <div className="border-t border-border pt-8">
              <h3 className="text-2xl font-bold mb-6 text-center text-gold font-cinzel">Get in Touch</h3>
              <div className="flex justify-center gap-4">
                <Button className="bg-primary hover:bg-primary/80 border border-gold/50">
                  <Mail className="mr-2 h-5 w-5" />
                  Email
                </Button>
                <Button className="bg-primary hover:bg-primary/80 border border-gold/50">
                  <Linkedin className="mr-2 h-5 w-5" />
                  LinkedIn
                </Button>
                <Button className="bg-primary hover:bg-primary/80 border border-gold/50">
                  <Globe className="mr-2 h-5 w-5" />
                  Website
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;
