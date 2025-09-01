import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Menu, Globe, Sun, Moon, FileText } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';

interface MobileHeaderProps {
  onViewChange: (view: 'home' | 'calories' | 'measurements' | 'cardio' | 'program' | 'items' | 'wakeup' | 'water' | 'terms') => void;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({ onViewChange }) => {
  const { language, setLanguage, t, isRTL } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">Q</span>
          </div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">{t('appName')}</h1>
        </div>

        {/* Menu Button */}
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-gray-600 dark:text-gray-300">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side={isRTL ? "right" : "left"} className="w-80">
            <SheetHeader>
              <SheetTitle className="text-xl font-bold mb-6 flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">Q</span>
                </div>
                {t('appName')}
              </SheetTitle>
            </SheetHeader>
            
            <div className="flex flex-col gap-4 mt-6">
              {/* Settings */}
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-700 dark:text-gray-300 text-sm uppercase tracking-wide">
                  {isRTL ? 'الإعدادات' : 'Settings'}
                </h3>
                
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={toggleTheme}
                  className="justify-start gap-3 h-12 text-base w-full"
                >
                  {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                  {theme === 'light' ? (isRTL ? 'الوضع الليلي' : 'Dark Mode') : (isRTL ? 'الوضع النهاري' : 'Light Mode')}
                </Button>

                <Button
                  variant="ghost"
                  size="lg"
                  onClick={toggleLanguage}
                  className="justify-start gap-3 h-12 text-base w-full"
                >
                  <Globe className="h-5 w-5" />
                  {language === 'ar' ? 'English' : 'العربية'}
                </Button>

                <Button
                  variant="ghost"
                  size="lg"
                  onClick={() => {
                    onViewChange('terms');
                    setIsMenuOpen(false);
                  }}
                  className="justify-start gap-3 h-12 text-base w-full"
                >
                  <FileText className="h-5 w-5" />
                  {t('termsAndPrivacy')}
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};