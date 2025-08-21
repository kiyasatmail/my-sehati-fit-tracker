import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Globe, Menu, Home, Calculator, Ruler, Heart, Calendar, Package, AlarmClock, Droplets, Dumbbell, Sun, Moon, FileText } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
interface HeaderProps {
  currentView: 'home' | 'calories' | 'measurements' | 'cardio' | 'program' | 'workout-plans' | 'items' | 'wakeup' | 'water' | 'terms';
  onViewChange: (view: 'home' | 'calories' | 'measurements' | 'cardio' | 'program' | 'workout-plans' | 'items' | 'wakeup' | 'water' | 'terms') => void;
}
export const Header: React.FC<HeaderProps> = ({
  currentView,
  onViewChange
}) => {
  const {
    language,
    setLanguage,
    t,
    isRTL
  } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };
  const navItems = [{
    key: 'home',
    icon: Home,
    label: isRTL ? 'الرئيسية' : 'Home'
  }, {
    key: 'calories',
    icon: Calculator,
    label: t('calorieCalculator')
  }, {
    key: 'measurements',
    icon: Ruler,
    label: t('bodyMeasurements')
  }, {
    key: 'cardio',
    icon: Heart,
    label: t('cardioConverter')
  }, {
    key: 'program',
    icon: Calendar,
    label: t('weeklyProgram')
  }, {
    key: 'workout-plans',
    icon: Dumbbell,
    label: isRTL ? 'خطط التمرين' : 'Workout Plans'
  }, {
    key: 'items',
    icon: Package,
    label: t('myItems')
  }, {
    key: 'wakeup',
    icon: AlarmClock,
    label: t('wakeUpChallenge')
  }, {
    key: 'water',
    icon: Droplets,
    label: isRTL ? 'حاسبة الماء' : 'Water Calculator'
  }, {
    key: 'terms',
    icon: FileText,
    label: t('termsAndPrivacy')
  }] as const;
  return <header className="bg-primary text-primary-foreground shadow-lg">
      <div className="container mx-auto px-4 gradient-hero">
        {/* Top bar with logo and language switcher */}
        <div className="flex items-center justify-between py-4 border-b border-white/20">
          <div className="flex items-center gap-3">
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/10 md:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side={isRTL ? "right" : "left"} className="w-80">
                <SheetHeader>
                  <SheetTitle className="text-right text-xl font-bold mb-6">
                    {t('appName')}
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4 mt-6">
                  {navItems.map(item => {
                  const Icon = item.icon;
                  const isActive = currentView === item.key;
                  return <Button key={item.key} variant="ghost" size="lg" onClick={() => {
                    onViewChange(item.key);
                    setIsMenuOpen(false);
                  }} className={`justify-start gap-3 h-12 text-base ${isActive ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-100'}`}>
                        <Icon className="h-5 w-5" />
                        {item.label}
                      </Button>;
                })}
                </div>
              </SheetContent>
            </Sheet>
            <h1 className="text-2xl font-bold">{t('appName')}</h1>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={toggleTheme} className="text-primary-foreground hover:bg-white/10">
              {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="sm" onClick={toggleLanguage} className="text-primary-foreground hover:bg-white/10 gap-2">
              <Globe className="h-4 w-4" />
              {language === 'ar' ? 'English' : 'العربية'}
            </Button>
          </div>
        </div>

        {/* Navigation bar */}
        <div className="hidden md:flex items-center justify-center py-3">
          <div className="flex items-center gap-1">
            {navItems.map(item => {
            const Icon = item.icon;
            const isActive = currentView === item.key;
            return <Button key={item.key} variant="ghost" size="sm" onClick={() => onViewChange(item.key)} className={`text-primary-foreground hover:bg-white/10 gap-2 px-4 py-2 ${isActive ? 'bg-white/20' : ''}`}>
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Button>;
          })}
          </div>
        </div>
      </div>
    </header>;
};