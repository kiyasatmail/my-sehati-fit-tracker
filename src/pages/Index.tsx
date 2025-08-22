import React, { useState } from 'react';
import { MobileHeader } from '@/components/MobileHeader';
import { MobileDashboard } from '@/components/MobileDashboard';
import { BottomNavigation } from '@/components/BottomNavigation';
import { QuickAddDialog } from '@/components/QuickAddDialog';
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
import { ArrowRight, ArrowLeft, Home } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

type ViewType = 'home' | 'calories' | 'measurements' | 'cardio' | 'program' | 'items' | 'wakeup' | 'water' | 'terms' | 'tracking' | 'workouts' | 'settings';

const Index = () => {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [quickAddOpen, setQuickAddOpen] = useState(false);
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
      case 'tracking':
        return (
          <div className="min-h-screen bg-gray-50 pb-20">
            <div className="px-4 pt-6">
              <h1 className="text-2xl font-bold mb-4">{isRTL ? 'التتبع' : 'Tracking'}</h1>
              <p className="text-gray-600">{isRTL ? 'قريباً...' : 'Coming soon...'}</p>
            </div>
          </div>
        );
      case 'workouts':
        return (
          <div className="min-h-screen bg-gray-50 pb-20">
            <div className="px-4 pt-6">
              <h1 className="text-2xl font-bold mb-4">{isRTL ? 'التمارين' : 'Workouts'}</h1>
              <p className="text-gray-600">{isRTL ? 'قريباً...' : 'Coming soon...'}</p>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="min-h-screen bg-gray-50 pb-20">
            <div className="px-4 pt-6">
              <h1 className="text-2xl font-bold mb-4">{isRTL ? 'الإعدادات' : 'Settings'}</h1>
              <p className="text-gray-600">{isRTL ? 'قريباً...' : 'Coming soon...'}</p>
            </div>
          </div>
        );
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
      
      {/* Bottom Navigation - only show on main views */}
      {!['terms'].includes(currentView) && (
        <BottomNavigation
          currentView={currentView}
          onViewChange={handleViewChange}
          onQuickAdd={() => setQuickAddOpen(true)}
        />
      )}
      
      {/* Quick Add Dialog */}
      <QuickAddDialog
        open={quickAddOpen}
        onOpenChange={setQuickAddOpen}
        onViewChange={handleViewChange}
      />
      
      {/* PWA Install Prompt - shown on all pages */}
      <PWAInstallPrompt />
    </div>
  );
};

export default Index;