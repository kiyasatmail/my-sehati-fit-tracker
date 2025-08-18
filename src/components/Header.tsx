import React from 'react';
import { Button } from '@/components/ui/button';
import { Globe, Menu, Home, Calculator, Ruler, Heart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface HeaderProps {
  currentView: 'home' | 'calories' | 'measurements' | 'cardio';
  onViewChange: (view: 'home' | 'calories' | 'measurements' | 'cardio') => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, onViewChange }) => {
  const { language, setLanguage, t, isRTL } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  const navItems = [
    { key: 'home', icon: Home, label: isRTL ? 'الرئيسية' : 'Home' },
    { key: 'calories', icon: Calculator, label: t('calorieCalculator') },
    { key: 'measurements', icon: Ruler, label: t('bodyMeasurements') },
    { key: 'cardio', icon: Heart, label: t('cardioConverter') },
  ] as const;

  return (
    <header className="bg-primary text-primary-foreground shadow-lg">
      <div className="container mx-auto px-4">
        {/* Top bar with logo and language switcher */}
        <div className="flex items-center justify-between py-4 border-b border-white/20">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/10 md:hidden">
              <Menu className="h-6 w-6" />
            </Button>
            <h1 className="text-2xl font-bold">{t('appName')}</h1>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            className="text-primary-foreground hover:bg-white/10 gap-2"
          >
            <Globe className="h-4 w-4" />
            {language === 'ar' ? 'English' : 'العربية'}
          </Button>
        </div>

        {/* Navigation bar */}
        <div className="hidden md:flex items-center justify-center py-3">
          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.key;
              
              return (
                <Button
                  key={item.key}
                  variant="ghost"
                  size="sm"
                  onClick={() => onViewChange(item.key)}
                  className={`text-primary-foreground hover:bg-white/10 gap-2 px-4 py-2 ${
                    isActive ? 'bg-white/20' : ''
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
};