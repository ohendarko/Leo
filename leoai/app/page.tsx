'use client'
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { useParallax } from "@/hooks/useParallax";
import asclepiusMarble from "@/assets/asclepius-marble.jpg";
import { useRouter } from "next/navigation";

const Landing = () => {
  const navigate = useRouter();
  const { x, y } = useParallax();

  return (
    <div className="min-h-screen bg-[#1a1d23] overflow-hidden">
      <Navigation />

      <section className="relative min-h-screen">
        <div className="container mx-auto h-screen flex items-center justify-center relative">
          
          {/* Content - Full Width Centered */}
          <div className="flex flex-col justify-center items-center text-center px-6 py-20 z-10 max-w-7xl mx-auto w-full">
            
            {/* Badge */}
            <div className="mb-8">
              <span className="inline-block px-4 py-2 rounded-full border border-slate-600 text-sm text-slate-300 bg-slate-800/30 font-cinzel uppercase tracking-wider">
                Strategic Validation | Healthcare Innovation
              </span>
            </div>
            
            {/* Headline */}
            <h1 className="font-cinzel font-bold leading-[1.1] mb-8 uppercase" style={{ fontSize: 'clamp(34px, 5vw, 94px)' }}>
              <span className="text-white">95% of digital health solutions </span>
              <span className="text-primary">fail</span>
              <span className="text-white">.</span>
              <br />
              <span className="text-white">Will yours survive?</span>
            </h1>
            
            {/* Subheading */}
            <p 
              className="text-lg md:text-xl lg:text-2xl text-slate-300 mb-10 max-w-3xl leading-relaxed font-playfair"
              style={{
                textTransform: 'none',
                fontVariant: 'normal',
                fontFeatureSettings: 'normal'
              }}
            >
              Subject your strategy to rigorous analysis using proven frameworks. 
              Discover weaknesses before they become failures.
            </p>
            
            {/* Single Button */}
            <div className="mb-8">
              <Button
                size="lg"
                onClick={() => navigate.push("/audit")}
                className="text-lg px-10 py-7 shadow-2xl hover:shadow-3xl transition-all bg-primary hover:bg-primary/90 font-cinzel font-bold uppercase tracking-wider"
              >
                Audit My Idea →
              </Button>
            </div>
            
            {/* Bottom Text */}
            <p className="text-sm text-slate-400 flex items-center gap-2">
              <span>✨</span>
              <span>Evidence-based frameworks • No fluff, just results</span>
            </p>
            
          </div>
          
          {/* Statue as Background - Parallax Effect */}
          <div className="absolute inset-0 overflow-hidden opacity-20 md:opacity-30">
            
            {/* Dark gradient overlay for blending */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#1a1d23] via-transparent to-[#1a1d23] z-10 pointer-events-none" />
            
            {/* Statue Image with Parallax */}
            <div
              className="absolute inset-0 transition-transform duration-300 ease-out will-change-transform"
              style={{
                backgroundImage: `url(${asclepiusMarble.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                transform: `translate(${x * 15}px, ${y * 15}px) scale(1.05)`,
              }}
            />
            
            {/* Subtle spotlight effect on statue */}
            <div
              className="absolute inset-0 opacity-30 pointer-events-none z-20 transition-all duration-500"
              style={{
                background: `radial-gradient(
                  circle at ${x * 50 + 50}% ${y * 50 + 50}%,
                  rgba(184, 105, 61, 0.3) 0%,
                  transparent 50%
                )`,
              }}
            />
            
            {/* Vignette for edges */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#1a1d23]/60 z-30 pointer-events-none" />
            
          </div>
          
        </div>
      </section>
    </div>
  );
};

export default Landing;
