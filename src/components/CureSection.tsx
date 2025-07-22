import { useState, useEffect } from "react";
import { Clock, Thermometer, Droplet, Wind, Award } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface MetricType {
  icon: React.ElementType;
  label: string;
  value: string;
  description: string;
  color: string;
}

const CureSection = () => {
  const [cureProgress, setCureProgress] = useState(0);
  const [activeMetric, setActiveMetric] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCureProgress((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const metrics: MetricType[] = [
    {
      icon: Thermometer,
      label: "Temperature",
      value: "18-21°C",
      description: "Optimal temperature range for preserving terpenes and preventing mold",
      color: "text-red-400",
    },
    {
      icon: Droplet,
      label: "Humidity",
      value: "55-62%",
      description: "Perfect moisture level for gradual drying without overdrying",
      color: "text-blue-400",
    },
    {
      icon: Wind,
      label: "Airflow",
      value: "Gentle",
      description: "Controlled circulation to ensure even drying throughout",
      color: "text-cyan-400",
    },
    {
      icon: Clock,
      label: "Duration",
      value: "14-21 days",
      description: "Patient curing process for maximum potency and flavor development",
      color: "text-amber-400",
    },
  ];

  const cureSteps = [
    "Harvest at peak trichome development",
    "Trim and prepare for hanging",
    "Hang dry in controlled environment",
    "Monitor temperature and humidity",
    "Jar cure for final development",
    "Quality test and approval",
  ];

  const currentMetric = metrics[activeMetric];
  const CurrentMetricIcon = currentMetric.icon;

  return (
    <div className="min-h-screen flex flex-col justify-center px-8 py-16">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-display font-bold mb-6">
            <span className="hero-text">The</span> Cure
          </h2>
          <p className="text-xl text-muted-foreground text-balance max-w-3xl mx-auto">
            The Art of the Cure. We hang-dry and expertly cure each batch to enhance the complex aromas and flavours. 
            This is where <span className="text-primary font-medium">character is perfected</span>.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Process Visual */}
          <div className="space-y-8">
            {/* Cure Progress */}
            <Card className="section-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-display font-semibold">Cure Progress</h3>
                <Award className="w-6 h-6 text-accent" />
              </div>
              <Progress value={cureProgress} className="mb-4" />
              <p className="text-sm text-muted-foreground">
                Current batch: Day {Math.floor(cureProgress / 5)} of 21
              </p>
            </Card>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-4">
              {metrics.map((metric, index) => {
                const MetricIcon = metric.icon;
                return (
                  <Card
                    key={metric.label}
                    className={`p-4 cursor-pointer transition-all duration-300 ${
                      activeMetric === index 
                        ? 'ring-2 ring-primary scale-105' 
                        : 'hover:scale-102'
                    }`}
                    onClick={() => setActiveMetric(index)}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <MetricIcon className={`w-5 h-5 ${metric.color}`} />
                      <span className="font-medium text-sm">{metric.label}</span>
                    </div>
                    <p className="text-2xl font-bold mb-1">{metric.value}</p>
                  </Card>
                );
              })}
            </div>

            {/* Active Metric Detail */}
            <Card className="section-card p-6">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl ${currentMetric.color} bg-current/10`}>
                  <CurrentMetricIcon className={`w-6 h-6 ${currentMetric.color}`} />
                </div>
                <div>
                  <h4 className="font-semibold mb-2">{currentMetric.label}</h4>
                  <p className="text-sm text-muted-foreground">
                    {currentMetric.description}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column - Process Steps */}
          <div className="space-y-6">
            <h3 className="text-3xl font-display font-semibold mb-8">Curing Process</h3>
            
            {cureSteps.map((step, index) => {
              const isCompleted = index <= Math.floor(cureProgress / 16);
              return (
                <div
                  key={index}
                  className={`flex items-start gap-4 p-4 rounded-xl transition-all duration-300 ${
                    isCompleted 
                      ? 'bg-primary/10 border border-primary/20' 
                      : 'bg-muted/20 border border-border/30'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    isCompleted
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className={`font-medium ${
                      isCompleted 
                        ? 'text-foreground' 
                        : 'text-muted-foreground'
                    }`}>
                      {step}
                    </p>
                  </div>
                  {isCompleted && (
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Quote */}
        <div className="text-center mt-16">
          <blockquote className="text-2xl font-display italic text-muted-foreground">
            "Patience in curing is the difference between good and 
            <span className="text-primary font-medium"> extraordinary</span>."
          </blockquote>
        </div>
      </div>
    </div>
  );
};

export default CureSection;