import React from 'react';
import { Button } from '@/components/ui/button';
import { Calculator, Ruler, Heart, Home } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface NavigationProps {
  currentView: 'home' | 'calories' | 'measurements' | 'cardio';
  onViewChange: (view: 'home' | 'calories' | 'measurements' | 'cardio') => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentView, onViewChange }) => {
  const { t } = useLanguage();

  const navItems = [
    { key: 'home', icon: Home, label: 'الرئيسية' },
    { key: 'calories', icon: Calculator, label: t('calorieCalculator') },
    { key: 'measurements', icon: Ruler, label: t('bodyMeasurements') },
    { key: 'cardio', icon: Heart, label: t('cardioConverter') },
  ] as const;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t shadow-lg z-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-4 gap-2 py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.key;
            
            return (
              <Button
                key={item.key}
                variant={isActive ? "default" : "ghost"}
                size="sm"
                onClick={() => onViewChange(item.key)}
                className={`flex flex-col items-center gap-1 h-auto py-3 ${
                  isActive ? 'text-primary-foreground' : 'text-muted-foreground'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs font-medium">{item.label}</span>
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};