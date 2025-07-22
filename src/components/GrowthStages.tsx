import { useState } from "react";
import { Sprout, TreePine, Flower2, Crown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface StageType {
  id: string;
  title: string;
  description: string;
  details: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
}

const stages: StageType[] = [
  {
    id: "germination",
    title: "Germination",
    description: "Life awakens from dormancy.",
    details: "The seed breaks its shell, revealing the first tender roots and shoots. This magical moment marks the beginning of our journey from potential to reality.",
    icon: Sprout,
    color: "text-secondary",
    bgColor: "bg-secondary/20",
  },
  {
    id: "vegetative",
    title: "Vegetative",
    description: "Building strength, reaching for light.",
    details: "Rapid growth and development as the plant establishes its foundation. Strong stems and lush leaves prepare for the flowering stage ahead.",
    icon: TreePine,
    color: "text-secondary-light",
    bgColor: "bg-secondary-light/20",
  },
  {
    id: "flowering",
    title: "Flowering",
    description: "The plant reveals its true character.",
    details: "The most critical phase where the plant's unique traits emerge. Delicate flowers form, carrying the essence that will define our final product.",
    icon: Flower2,
    color: "text-primary",
    bgColor: "bg-primary/20",
  },
  {
    id: "harvest",
    title: "Harvest",
    description: "The culmination of patience and care.",
    details: "The perfect moment when months of dedication are rewarded. Each plant is carefully harvested at peak potency and flavor development.",
    icon: Crown,
    color: "text-accent",
    bgColor: "bg-accent/20",
  },
];

const GrowthStages = () => {
  const [activeStage, setActiveStage] = useState(0);
  const currentStage = stages[activeStage];
  const StageIcon = currentStage.icon;

  return (
    <div className="min-h-screen flex flex-col justify-center px-8 py-16">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-display font-bold mb-6">
            <span className="hero-text">Growth</span> Journey
          </h2>
          <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
            Follow the natural progression from seed to harvest, each stage carefully nurtured to perfection.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative mb-16">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-border -translate-y-1/2" />
          <div className="flex justify-between relative">
            {stages.map((stage, index) => {
              const StageIconComponent = stage.icon;
              return (
                <button
                  key={stage.id}
                  onClick={() => setActiveStage(index)}
                  className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                    activeStage === index
                      ? 'bg-primary scale-110 shadow-xl'
                      : 'bg-card hover:bg-muted border-2 border-border'
                  }`}
                >
                  <StageIconComponent className={`w-8 h-8 ${activeStage === index ? 'text-primary-foreground' : stage.color}`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Stage Details */}
        <div className="section-card p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-full ${currentStage.bgColor} mb-6`}>
                <StageIcon className={`w-5 h-5 ${currentStage.color}`} />
                <span className="font-medium text-sm uppercase tracking-wider">
                  Stage {activeStage + 1}
                </span>
              </div>
              
              <h3 className="text-4xl font-display font-bold mb-4">
                {currentStage.title}
              </h3>
              
              <p className="text-lg text-muted-foreground mb-6">
                {currentStage.description}
              </p>
              
              <p className="text-foreground leading-relaxed mb-8">
                {currentStage.details}
              </p>
              
              <div className="flex gap-4">
                <Button 
                  variant="outline" 
                  onClick={() => setActiveStage((prev) => Math.max(0, prev - 1))}
                  disabled={activeStage === 0}
                  className="bg-card/50 backdrop-blur-md"
                >
                  Previous
                </Button>
                <Button 
                  onClick={() => setActiveStage((prev) => Math.min(stages.length - 1, prev + 1))}
                  disabled={activeStage === stages.length - 1}
                  variant="interactive"
                >
                  Next Stage
                </Button>
              </div>
            </div>
            
            {/* Visual Representation */}
            <div className="relative">
              <div className="aspect-square relative">
                <div className={`absolute inset-0 rounded-full ${currentStage.bgColor} pulse-glow`}>
                  <div className="absolute inset-4 rounded-full bg-card/50 backdrop-blur-md flex items-center justify-center">
                    <StageIcon className={`w-24 h-24 ${currentStage.color}`} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stage Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {stages.map((stage, index) => {
            const GridIcon = stage.icon;
            return (
              <div
                key={stage.id}
                onClick={() => setActiveStage(index)}
                className={`growth-stage cursor-pointer ${
                  activeStage === index ? 'ring-2 ring-primary' : ''
                }`}
              >
                <GridIcon className={`w-8 h-8 mb-3 ${stage.color}`} />
                <h4 className="font-medium mb-1">{stage.title}</h4>
                <p className="text-xs text-muted-foreground">{stage.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GrowthStages;