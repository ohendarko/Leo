'use client'
import { useState, useEffect, useRef } from "react";
import heroStatue from "@/assets/hero-statue.jpg";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    size: number;
    color: string;
  }>>([]);
  const particleIdRef = useRef(0);
  const lastParticleTime = useRef(0);
  const location = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    if (isOpen) {
      const handleMouseMove = (e: MouseEvent) => {
        setMousePosition({
          x: (e.clientX / window.innerWidth - 0.5),
          y: (e.clientY / window.innerHeight - 0.5),
        });
      };
      
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      handleClose();
    }
  }, [location]);

  const handleClose = () => {
    setIsAnimatingOut(true);
    // Wait for exit animation to complete before actually closing
    setTimeout(() => {
      setIsOpen(false);
      setIsAnimatingOut(false);
    }, 200); // 200ms matches our exit animation duration
  };

  // Particle generation effect
  useEffect(() => {
    if (!isOpen) {
      setParticles([]);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      // Throttle particle generation to every 50ms
      if (now - lastParticleTime.current < 50) return;
      lastParticleTime.current = now;

      // Generate 2-3 particles
      const numParticles = Math.floor(Math.random() * 2) + 2;
      const newParticles = Array.from({ length: numParticles }, () => ({
        id: particleIdRef.current++,
        x: e.clientX,
        y: e.clientY,
        vx: (Math.random() - 0.5) * 4,
        vy: -Math.random() * 2 - 1,
        life: 1.0,
        size: Math.random() * 4 + 2,
        color: Math.random() > 0.5 ? 'rgba(218, 165, 32, ' : 'rgba(184, 105, 61, ',
      }));

      setParticles(prev => {
        // Limit max particles to 100 for performance
        if (prev.length > 100) return prev.slice(-50).concat(newParticles);
        return [...prev, ...newParticles];
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isOpen]);

  // Particle animation loop
  useEffect(() => {
    if (!isOpen || particles.length === 0) return;

    let animationFrameId: number;

    const animate = () => {
      setParticles(prev => {
        const updated = prev
          .map(p => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vy: p.vy + 0.2, // Gravity
            life: p.life - 0.02,
          }))
          .filter(p => p.life > 0);

        if (updated.length > 0) {
          animationFrameId = requestAnimationFrame(animate);
        }
        
        return updated;
      });
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isOpen, particles.length]);

  const navLinks = [
    { to: "/", label: "HOME" },
    { to: "/audit", label: "AUDIT MY IDEA" },
    { to: "/methodology", label: "METHODOLOGY" },
    { to: "/about", label: "ABOUT" },
  ];

  return (
    <>
      {!isOpen && (
        <nav
          className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
            isVisible ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <div className="container mx-auto px-6 py-6 flex justify-between items-center">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                <Image src="/logo.PNG" width={45} height={45} alt="leo-logo" />

              </div>
              <span className="text-xl font-bold text-white">Leo</span>
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative z-50 text-sm font-bold tracking-widest text-white hover:text-primary transition-colors"
            >
              {isOpen ? "CLOSE" : "MENU"}
            </button>
          </div>
        </nav>
      )}

      {isOpen && (
        <div className={`fixed inset-0 z-40 bg-charcoal ${isAnimatingOut ? 'animate-slide-out-to-top' : 'animate-slide-in-from-top'}`}>
          {/* Cursor Particles */}
          {particles.map(particle => (
            <div
              key={particle.id}
              className="absolute pointer-events-none rounded-full"
              style={{
                left: particle.x,
                top: particle.y,
                width: particle.size,
                height: particle.size,
                backgroundColor: `${particle.color}${particle.life})`,
                boxShadow: `0 0 ${particle.size * 2}px ${particle.color}${particle.life * 0.5})`,
                transform: 'translate(-50%, -50%)',
                transition: 'none',
              }}
            />
          ))}

          {/* Menu Header */}
          <div className={`absolute top-0 left-0 right-0 px-6 py-6 md:px-12 md:py-8 flex justify-between items-center ${isAnimatingOut ? 'animate-fade-out' : 'animate-fade-in'}`} style={{ animationDelay: isAnimatingOut ? '0ms' : '29ms' }}>
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <span className="text-2xl">🦁</span>
              </div>
              <span className="text-xl font-bold text-white">Leo</span>
            </Link>
            
            <div className="flex items-center gap-8">
              <a 
                href="mailto:contact@leo.com" 
                className="text-xs font-bold tracking-widest text-sage hover:text-gold transition-colors hidden md:block"
              >
                CONTACT US
              </a>
              <button
                onClick={handleClose}
                className="text-sm font-bold tracking-widest text-white hover:text-gold transition-colors"
              >
                CLOSE
              </button>
            </div>
          </div>

          {/* Main Menu Content */}
          <div className="h-full flex flex-col md:flex-row">
            {/* Left Side - Classical Statue with Enhanced Parallax & Spotlight */}
            <div className={`relative w-full md:w-[40%] h-[35vh] md:h-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-charcoal to-vanta-black ${isAnimatingOut ? 'animate-slide-out-to-left-fast' : 'animate-slide-in-from-left-fast'}`} style={{ animationDelay: isAnimatingOut ? '0ms' : '57ms' }}>
              {/* Primary Spotlight Effect */}
              <div
                className="absolute inset-0 pointer-events-none opacity-60 transition-all duration-300"
                style={{
                  background: `radial-gradient(
                    circle at ${mousePosition.x * 50 + 50}% ${mousePosition.y * 50 + 50}%,
                    rgba(255, 255, 255, 0.3) 0%,
                    rgba(184, 105, 61, 0.2) 20%,
                    transparent 40%
                  )`,
                }}
              />
              
              {/* Secondary Spotlight with Color Variation */}
              <div
                className="absolute inset-0 pointer-events-none opacity-50 mix-blend-screen transition-all duration-500"
                style={{
                  background: `radial-gradient(
                    circle at ${mousePosition.x * 50 + 50}% ${mousePosition.y * 50 + 50}%,
                    rgba(122, 155, 118, 0.4) 0%,
                    rgba(184, 105, 61, 0.2) 30%,
                    transparent 60%
                  )`,
                }}
              />
              
              {/* Third Spotlight - Warm Accent */}
              <div
                className="absolute inset-0 pointer-events-none opacity-30 transition-all duration-700"
                style={{
                  background: `radial-gradient(
                    circle at ${mousePosition.x * 50 + 50}% ${mousePosition.y * 50 + 50}%,
                    rgba(218, 165, 32, 0.5) 0%,
                    rgba(184, 105, 61, 0.3) 25%,
                    transparent 50%
                  )`,
                }}
              />
              
              {/* Hero Statue with Enhanced Parallax */}
              <div
                className="w-full h-full transition-transform duration-300 ease-out will-change-transform"
                style={{
                  backgroundImage: `url(${heroStatue.src})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px) rotateY(${mousePosition.x * 3}deg) rotateX(${mousePosition.y * -2}deg) scale(1.1)`,
                }}
              />
              
              {/* Enhanced Vignette overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-transparent to-charcoal opacity-60" />
              <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-vanta-black opacity-50" />
            </div>

            {/* Right Side - Menu Items */}
            <div className="flex-1 flex items-center justify-center md:justify-start md:pl-16 lg:pl-24">
              <nav className="flex flex-col gap-6 md:gap-8 lg:gap-10">
                {navLinks.map((link, index) => (
                  <Link
                    key={link.to}
                    href={link.to}
                  className={`text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gold spotlight-glow-dark transition-all duration-300 tracking-wide ${isAnimatingOut ? 'animate-slide-out-to-right-fast' : 'animate-slide-in-from-right-fast'}`}
                  style={{ animationDelay: isAnimatingOut ? '0ms' : `${84 + index * 42}ms` }}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
