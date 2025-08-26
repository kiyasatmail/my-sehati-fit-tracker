import React, { useState } from 'react';
import { MobileHeader } from '@/components/MobileHeader';
import { MobileDashboard } from '@/components/MobileDashboard';
import { QuickServicesDialog } from '@/components/QuickAddDialog';
import { CalorieCalculator } from '@/components/CalorieCalculator';
import { BodyMeasurements } from '@/components/BodyMeasurements';
import { CardioConverter } from '@/components/CardioConverter';
import { WeeklyProgram } from '@/components/WeeklyProgram';
import { MyItems } from '@/components/MyItems';
import { WakeUpChallenge } from '@/components/WakeUpChallenge';
import { WaterCalculator } from '@/components/WaterCalculator';
import { TermsAndPrivacy } from '@/components/TermsAndPrivacy';
import PWAInstallPrompt from '@/components/PWAInstallPrompt';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft, Home, Activity } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

type ViewType = 'home' | 'calories' | 'measurements' | 'cardio' | 'program' | 'items' | 'wakeup' | 'water' | 'terms';

const Index = () => {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [quickServicesOpen, setQuickServicesOpen] = useState(false);
  const { isRTL, t } = useLanguage();

  const handleViewChange = (view: ViewType) => {
    setCurrentView(view);
  };

  const handleBackToHome = () => {
    setCurrentView('home');
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'calories':
        return (
          <div className="min-h-screen bg-gray-50 pb-20">
            <div className="px-4 pt-6">
              <Button
                variant="ghost"
                onClick={handleBackToHome}
                className={`mb-4 text-gray-600 hover:text-gray-800 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {isRTL ? <ArrowRight className="h-4 w-4" /> : <ArrowLeft className="h-4 w-4" />}
                <Home className="h-4 w-4 mr-2" />
                <span>{t('backToHome')}</span>
              </Button>
            </div>
            <div className="px-4">
              <CalorieCalculator />
            </div>
          </div>
        );
      case 'measurements':
        return (
          <div className="min-h-screen bg-gray-50 pb-20">
            <div className="px-4 pt-6">
              <Button
                variant="ghost"
                onClick={handleBackToHome}
                className={`mb-4 text-gray-600 hover:text-gray-800 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {isRTL ? <ArrowRight className="h-4 w-4" /> : <ArrowLeft className="h-4 w-4" />}
                <Home className="h-4 w-4 mr-2" />
                <span>{t('backToHome')}</span>
              </Button>
            </div>
            <div className="px-4">
              <BodyMeasurements />
            </div>
          </div>
        );
      case 'cardio':
        return (
          <div className="min-h-screen bg-gray-50 pb-20">
            <div className="px-4 pt-6">
              <Button
                variant="ghost"
                onClick={handleBackToHome}
                className={`mb-4 text-gray-600 hover:text-gray-800 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {isRTL ? <ArrowRight className="h-4 w-4" /> : <ArrowLeft className="h-4 w-4" />}
                <Home className="h-4 w-4 mr-2" />
                <span>{t('backToHome')}</span>
              </Button>
            </div>
            <div className="px-4">
              <CardioConverter />
            </div>
          </div>
        );
      case 'program':
        return (
          <div className="min-h-screen bg-gray-50 pb-20">
            <div className="px-4 pt-6">
              <Button
                variant="ghost"
                onClick={handleBackToHome}
                className={`mb-4 text-gray-600 hover:text-gray-800 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {isRTL ? <ArrowRight className="h-4 w-4" /> : <ArrowLeft className="h-4 w-4" />}
                <Home className="h-4 w-4 mr-2" />
                <span>{t('backToHome')}</span>
              </Button>
            </div>
            <div className="px-4">
              <WeeklyProgram />
            </div>
          </div>
        );
      case 'items':
        return (
          <div className="min-h-screen bg-gray-50 pb-20">
            <div className="px-4 pt-6">
              <Button
                variant="ghost"
                onClick={handleBackToHome}
                className={`mb-4 text-gray-600 hover:text-gray-800 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {isRTL ? <ArrowRight className="h-4 w-4" /> : <ArrowLeft className="h-4 w-4" />}
                <Home className="h-4 w-4 mr-2" />
                <span>{t('backToHome')}</span>
              </Button>
            </div>
            <div className="px-4">
              <MyItems />
            </div>
          </div>
        );
      case 'wakeup':
        return (
          <div className="min-h-screen bg-gray-50 pb-20">
            <div className="px-4 pt-6">
              <Button
                variant="ghost"
                onClick={handleBackToHome}
                className={`mb-4 text-gray-600 hover:text-gray-800 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {isRTL ? <ArrowRight className="h-4 w-4" /> : <ArrowLeft className="h-4 w-4" />}
                <Home className="h-4 w-4 mr-2" />
                <span>{t('backToHome')}</span>
              </Button>
            </div>
            <div className="px-4">
              <WakeUpChallenge />
            </div>
          </div>
        );
      case 'water':
        return (
          <div className="min-h-screen bg-gray-50 pb-20">
            <div className="px-4 pt-6">
              <Button
                variant="ghost"
                onClick={handleBackToHome}
                className={`mb-4 text-gray-600 hover:text-gray-800 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {isRTL ? <ArrowRight className="h-4 w-4" /> : <ArrowLeft className="h-4 w-4" />}
                <Home className="h-4 w-4 mr-2" />
                <span>{t('backToHome')}</span>
              </Button>
            </div>
            <div className="px-4">
              <WaterCalculator />
            </div>
          </div>
        );
      case 'terms':
        return <TermsAndPrivacy onBack={handleBackToHome} />;
      default:
        return <MobileDashboard onViewChange={handleViewChange} />;
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-300 ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Mobile Header */}
      <MobileHeader onViewChange={handleViewChange} />
      
      <main>
        {renderCurrentView()}
      </main>
      
      {/* Floating Services Button - show on all pages except terms */}
      {!['terms'].includes(currentView) && (
        <Button
          onClick={() => setQuickServicesOpen(true)}
          className="fixed bottom-6 right-6 w-20 h-20 rounded-full bg-gradient-to-br from-primary via-primary-light to-primary-dark hover:from-primary-dark hover:via-primary hover:to-primary-light shadow-2xl hover:shadow-3xl transition-all duration-500 z-50 hover:scale-110 group border-4 border-white/20 backdrop-blur-sm"
          size="icon"
        >
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Background glow effect */}
            <div className="absolute inset-0 bg-white/10 rounded-full blur-sm group-hover:bg-white/20 transition-all duration-300"></div>
            
            {/* Main icon container */}
            <div className="relative w-12 h-12 bg-white/95 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105 border border-white/30">
              {/* Arabic letter with enhanced styling */}
              <span className="text-primary font-black text-2xl bg-gradient-to-br from-primary to-primary-dark bg-clip-text text-transparent drop-shadow-sm">
                ص
              </span>
              
              {/* Decorative elements */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-green-400 to-green-600 rounded-full opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
            </div>
            
            {/* Pulse animation ring */}
            <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-pulse group-hover:border-white/50 transition-colors duration-300"></div>
          </div>
        </Button>
      )}
      
      {/* Quick Services Dialog */}
      <QuickServicesDialog
        open={quickServicesOpen}
        onOpenChange={setQuickServicesOpen}
        onViewChange={handleViewChange}
      />
      
      {/* PWA Install Prompt - shown on all pages */}
      <PWAInstallPrompt />
    </div>
  );
};

export default Index;