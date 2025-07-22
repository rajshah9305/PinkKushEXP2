import { useState, useEffect } from "react";
import { Leaf, Sparkles, ChevronDown, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import HeroSection from "@/components/HeroSection";
import GrowthStages from "@/components/GrowthStages";
import CureSection from "@/components/CureSection";
import PinkKushSection from "@/components/PinkKushSection";
import LegacySection from "@/components/LegacySection";

const Index = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(false);

  const sections = ['hero', 'growth', 'cure', 'pinkkush', 'legacy'];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoPlay) {
      interval = setInterval(() => {
        setCurrentSection((prev) => (prev + 1) % sections.length);
      }, 8000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlay, sections.length]);

  const scrollToSection = (index: number) => {
    setCurrentSection(index);
    const element = document.getElementById(sections[index]);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M30 0c16.569 0 30 13.431 30 30 0 16.569-13.431 30-30 30C13.431 60 0 46.569 0 30 0 13.431 13.431 0 30 0zm0 6c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24S43.255 6 30 6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      {/* Navigation Controls */}
      <div className="fixed top-8 right-8 z-50 flex flex-col gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsAutoPlay(!isAutoPlay)}
          className="bg-card/80 backdrop-blur-md border-border/50"
        >
          {isAutoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          <span className="ml-2">Auto</span>
        </Button>
      </div>

      {/* Section Navigation */}
      <div className="fixed left-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
        {sections.map((section, index) => (
          <Button
            key={section}
            variant="ghost"
            size="sm"
            onClick={() => scrollToSection(index)}
            className={`w-3 h-12 p-0 rounded-full transition-all duration-300 ${
              currentSection === index 
                ? 'bg-primary shadow-lg scale-110' 
                : 'bg-muted/50 hover:bg-muted'
            }`}
          />
        ))}
      </div>

      {/* Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-1 bg-muted/20 z-50">
        <div 
          className="h-full bg-gradient-to-r from-primary to-primary-glow transition-all duration-1000 ease-out"
          style={{ width: `${((currentSection + 1) / sections.length) * 100}%` }}
        />
      </div>

      {/* Sections */}
      <section id="hero" className="min-h-screen">
        <HeroSection />
      </section>

      <section id="growth" className="min-h-screen">
        <GrowthStages />
      </section>

      <section id="cure" className="min-h-screen">
        <CureSection />
      </section>

      <section id="pinkkush" className="min-h-screen">
        <PinkKushSection />
      </section>

      <section id="legacy" className="min-h-screen">
        <LegacySection />
      </section>

      {/* Scroll Indicator */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 animate-bounce">
        <ChevronDown className="w-6 h-6 text-muted-foreground" />
      </div>
    </div>
  );
};

export default Index;