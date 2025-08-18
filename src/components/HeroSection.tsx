import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calculator, Ruler, Heart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface HeroSectionProps {
  onStartTracking: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onStartTracking }) => {
  const { t, isRTL } = useLanguage();

  const features = [
    {
      icon: Calculator,
      title: t('calorieCalculator'),
      color: 'bg-primary'
    },
    {
      icon: Ruler,
      title: t('bodyMeasurements'),
      color: 'bg-info'
    },
    {
      icon: Heart,
      title: t('cardioConverter'),
      color: 'bg-success'
    }
  ];

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <Card className="gradient-card shadow-hero border-0 overflow-hidden">
          <CardContent className="p-8 md:p-12">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold gradient-primary bg-clip-text text-transparent">
                {t('appName')}
              </h1>
              
              <h2 className="text-xl md:text-3xl font-semibold text-foreground">
                {t('yourHealthGuide')}
              </h2>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                {t('trackCalories')}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-white/20 transition-smooth hover:bg-white/70 hover:transform hover:scale-105"
                  >
                    <div className={`p-2 rounded-lg ${feature.color}`}>
                      <feature.icon className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-medium text-foreground">{feature.title}</span>
                  </div>
                ))}
              </div>

              <Button 
                variant="hero" 
                size="hero" 
                onClick={onStartTracking}
                className="transform transition-bounce hover:scale-105"
              >
                <Calculator className="h-6 w-6" />
                {t('startTracking')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};