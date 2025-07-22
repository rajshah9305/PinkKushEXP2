import { useState } from "react";
import { Sparkles, Search, Star, Leaf, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CharacteristicType {
  icon: React.ElementType;
  title: string;
  description: string;
  value: string;
}

const PinkKushSection = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [showLegend, setShowLegend] = useState(false);

  const handleUncover = () => {
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setShowLegend(true);
    }, 3000);
  };

  const characteristics: CharacteristicType[] = [
    {
      icon: Leaf,
      title: "Indica Dominant",
      description: "80% Indica, 20% Sativa hybrid for deep relaxation",
      value: "80/20",
    },
    {
      icon: Star,
      title: "THC Content",
      description: "High potency with balanced cannabinoid profile",
      value: "20-25%",
    },
    {
      icon: Crown,
      title: "Terpenes",
      description: "Rich in myrcene, limonene, and caryophyllene",
      value: "Premium",
    },
  ];

  const effects = [
    "Deep Physical Relaxation",
    "Stress Relief",
    "Sleep Enhancement", 
    "Pain Management",
    "Mood Elevation",
  ];

  return (
    <div className="min-h-screen flex flex-col justify-center px-8 py-16">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-display font-bold mb-6">
            <span className="hero-text">Pink</span>Kush
          </h2>
          <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
            A legendary strain with a story waiting to be told. Each nug carries the essence of 
            coastal cultivation and generational expertise.
          </p>
        </div>

        {/* Main Interactive Area */}
        <div className="section-card p-8 md:p-12 mb-12">
          {!showLegend ? (
            <div className="text-center space-y-8">
              <div className="relative inline-block">
                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center relative overflow-hidden">
                  <Sparkles className="w-16 h-16 text-primary" />
                  {isSearching && (
                    <div className="absolute inset-0 shimmer rounded-full" />
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-3xl font-display font-bold mb-4">
                  {isSearching ? "Searching the archives..." : "Uncover the Legend"}
                </h3>
                <p className="text-muted-foreground mb-8">
                  {isSearching 
                    ? "Diving deep into our strain database..." 
                    : "Discover the story, characteristics, and legacy of Pink Kush"
                  }
                </p>
              </div>

              <Button
                onClick={handleUncover}
                disabled={isSearching}
                variant="interactive"
                className="text-lg px-8 py-6"
              >
                <Search className="w-5 h-5 mr-3" />
                {isSearching ? "Searching..." : "Uncover Legend"}
              </Button>
            </div>
          ) : (
            <div className="space-y-8 animate-fade-in">
              {/* Legend Revealed */}
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                  <Crown className="w-4 h-4 mr-2" />
                  Legend Revealed
                </Badge>
                <h3 className="text-4xl font-display font-bold mb-6">Pink Kush Coastal Legacy</h3>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  Born from the misty coastlines of British Columbia, Pink Kush represents decades of careful 
                  cultivation and genetic refinement. This indica-dominant hybrid has earned its reputation through 
                  consistent quality, potent effects, and the distinctive pink hairs that crown each mature bud.
                </p>
              </div>

              {/* Characteristics Grid */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {characteristics.map((char, index) => {
                  const CharIcon = char.icon;
                  return (
                    <Card key={index} className="p-6 text-center hover:scale-105 transition-transform duration-300">
                      <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CharIcon className="w-8 h-8 text-primary" />
                      </div>
                      <h4 className="font-semibold mb-2">{char.title}</h4>
                      <p className="text-3xl font-bold text-primary mb-2">{char.value}</p>
                      <p className="text-sm text-muted-foreground">{char.description}</p>
                    </Card>
                  );
                })}
              </div>

              {/* Effects */}
              <div className="bg-card/30 rounded-2xl p-6">
                <h4 className="text-xl font-semibold mb-4 text-center">Signature Effects</h4>
                <div className="flex flex-wrap gap-3 justify-center">
                  {effects.map((effect, index) => (
                    <Badge 
                      key={index}
                      variant="outline" 
                      className="bg-secondary/10 text-secondary border-secondary/20 hover:bg-secondary/20 transition-colors"
                    >
                      {effect}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                <Button 
                  onClick={() => setShowLegend(false)}
                  variant="outline"
                  className="bg-card/50 backdrop-blur-md"
                >
                  ← Ask Again
                </Button>
                <Button variant="interactive">
                  <Leaf className="w-5 h-5 mr-2" />
                  Explore Terpenes
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Quick Stats */}
        {showLegend && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in">
            <Card className="p-4 text-center">
              <p className="text-2xl font-bold text-primary">BC</p>
              <p className="text-sm text-muted-foreground">Origin</p>
            </Card>
            <Card className="p-4 text-center">
              <p className="text-2xl font-bold text-secondary">Indica</p>
              <p className="text-sm text-muted-foreground">Type</p>
            </Card>
            <Card className="p-4 text-center">
              <p className="text-2xl font-bold text-accent">Evening</p>
              <p className="text-sm text-muted-foreground">Best Time</p>
            </Card>
            <Card className="p-4 text-center">
              <p className="text-2xl font-bold text-primary">★★★★★</p>
              <p className="text-sm text-muted-foreground">Rating</p>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default PinkKushSection;