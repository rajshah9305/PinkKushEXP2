import { useState, useEffect } from "react";
import { Sparkles, Beaker, Heart, Share2, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ServiceType {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
  bgColor: string;
}

interface ResultType {
  title: string;
  content: string;
}

const LegacySection = () => {
  const [currentService, setCurrentService] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const services: ServiceType[] = [
    {
      icon: Beaker,
      title: "Discover its Terpene Profile",
      description: "AI-powered analysis of aromatic compounds and their effects",
      color: "text-blue-400",
      bgColor: "bg-blue-400/10",
    },
    {
      icon: Heart,
      title: "Suggest a Pairing",
      description: "Personalized recommendations for activities and occasions",
      color: "text-pink-400", 
      bgColor: "bg-pink-400/10",
    },
    {
      icon: BookOpen,
      title: "Craft Your Story",
      description: "Generate a unique narrative about your experience",
      color: "text-purple-400",
      bgColor: "bg-purple-400/10",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentService((prev) => (prev + 1) % services.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [services.length]);

  const handleServiceRequest = (index: number) => {
    setCurrentService(index);
    setIsGenerating(true);
    setShowResult(false);
    
    setTimeout(() => {
      setIsGenerating(false);
      setShowResult(true);
    }, 3500);
  };

  const sampleResults: Record<number, ResultType> = {
    0: {
      title: "Terpene Profile Analysis",
      content: "Dominant: Myrcene (40%) - Deeply relaxing, sedative effects. Limonene (25%) - Mood elevation, stress relief. Caryophyllene (20%) - Anti-inflammatory, pain management. This profile creates the signature Pink Kush experience of profound relaxation with gentle euphoria.",
    },
    1: {
      title: "Perfect Pairing Suggestions", 
      content: "Evening unwind ritual with herbal tea and soft ambient music. Ideal for meditation, gentle yoga, or creative journaling. Pairs beautifully with lavender aromatherapy and cozy blankets. Best enjoyed during golden hour or under starlit skies.",
    },
    2: {
      title: "Your Pink Kush Story",
      content: "Like finding a hidden coastal trail that leads to perfect solitude, Pink Kush guides you to your own secret sanctuary. Each draw is a step deeper into tranquility, where time moves like ocean waves—rhythmic, peaceful, inevitable. This is not just relaxation; it's a homecoming to yourself.",
    },
  };

  const currentServiceData = services[currentService];
  const CurrentServiceIcon = currentServiceData.icon;

  return (
    <div className="min-h-screen flex flex-col justify-center px-8 py-16">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-display font-bold mb-6">
            <span className="hero-text">The</span> Legacy
          </h2>
          <p className="text-xl text-muted-foreground text-balance max-w-3xl mx-auto">
            Our digital sommelier combines decades of cannabis expertise with AI precision to craft 
            personalized experiences and insights for every Pink Kush journey.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Services */}
          <div className="space-y-6">
            <h3 className="text-3xl font-display font-semibold mb-8">Digital Sommelier Services</h3>
            
            {services.map((service, index) => {
              const ServiceIcon = service.icon;
              return (
                <Card
                  key={index}
                  className={`p-6 cursor-pointer transition-all duration-300 ${
                    currentService === index 
                      ? 'ring-2 ring-primary scale-105' 
                      : 'hover:scale-102'
                  }`}
                  onClick={() => handleServiceRequest(index)}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl ${service.bgColor}`}>
                      <ServiceIcon className={`w-6 h-6 ${service.color}`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-accent" />
                        {service.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}

            {/* Service Indicators */}
            <div className="flex gap-2 justify-center pt-4">
              {services.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentService(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentService === index ? 'bg-primary w-8' : 'bg-muted'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right Column - AI Interface */}
          <div className="space-y-6">
            <Card className="section-card p-8">
              {!showResult ? (
                <div className="text-center space-y-6">
                  <div className="relative">
                    <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center ${currentServiceData.bgColor} relative`}>
                      <CurrentServiceIcon className={`w-12 h-12 ${currentServiceData.color}`} />
                      {isGenerating && (
                        <div className="absolute inset-0 shimmer rounded-full" />
                      )}
                    </div>
                  </div>

                  <div>
                    <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
                      <Sparkles className="w-3 h-3 mr-1" />
                      AI Sommelier
                    </Badge>
                    <h4 className="text-2xl font-display font-bold mb-4">
                      {isGenerating 
                        ? "Our digital sommelier is crafting your description..." 
                        : currentServiceData.title
                      }
                    </h4>
                    {!isGenerating && (
                      <p className="text-muted-foreground mb-6">
                        {currentServiceData.description}
                      </p>
                    )}
                  </div>

                  {!isGenerating && (
                    <Button
                      onClick={() => handleServiceRequest(currentService)}
                      variant="interactive"
                    >
                      <Sparkles className="w-5 h-5 mr-2" />
                      Generate Insight
                    </Button>
                  )}

                  {isGenerating && (
                    <div className="space-y-3">
                      <div className="flex justify-center">
                        <div className="flex space-x-1">
                          {[...Array(3)].map((_, i) => (
                            <div
                              key={i}
                              className="w-2 h-2 bg-primary rounded-full animate-pulse"
                              style={{ animationDelay: `${i * 0.2}s` }}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Analyzing strain characteristics...
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-6 animate-fade-in">
                  <div className="flex items-center justify-between">
                    <Badge className="bg-primary/10 text-primary border-primary/20">
                      <CurrentServiceIcon className="w-3 h-3 mr-1" />
                      Generated
                    </Badge>
                    <Button variant="ghost" size="sm">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold mb-4">
                      {sampleResults[currentService].title}
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {sampleResults[currentService].content}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={() => setShowResult(false)}
                      variant="outline"
                      className="bg-card/50 backdrop-blur-md"
                    >
                      ← Ask Again
                    </Button>
                    <Button variant="interactive" className="flex-1">
                      <Heart className="w-4 h-4 mr-2" />
                      Save to Profile
                    </Button>
                  </div>
                </div>
              )}
            </Card>

            {/* Footer Quote */}
            <div className="text-center pt-8">
              <blockquote className="text-lg font-display italic text-muted-foreground">
                "Every strain tells a story. 
                <br />
                <span className="text-primary font-medium">Let us help you discover yours.</span>"
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegacySection;