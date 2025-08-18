import React from 'react';
import { Button } from '@/components/ui/button';
import { Globe, Menu } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export const Header: React.FC = () => {
  const { language, setLanguage, t, isRTL } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  return (
    <header className="gradient-primary text-primary-foreground shadow-hero sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/10">
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
      </div>
    </header>
  );
};