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
  const {
    isRTL,
    t
  } = useLanguage();
  const handleViewChange = (view: ViewType) => {
    setCurrentView(view);
  };
  const handleBackToHome = () => {
    setCurrentView('home');
  };
  const renderCurrentView = () => {
    switch (currentView) {
      case 'calories':
        return <div className="min-h-screen bg-gray-50 pb-20">
            <div className="px-4 pt-6">
              <Button variant="ghost" onClick={handleBackToHome} className={`mb-4 text-gray-600 hover:text-gray-800 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                {isRTL ? <ArrowRight className="h-4 w-4" /> : <ArrowLeft className="h-4 w-4" />}
                <Home className="h-4 w-4 mr-2" />
                <span>{t('backToHome')}</span>
              </Button>
            </div>
            <div className="px-4">
              <CalorieCalculator />
            </div>
          </div>;
      case 'measurements':
        return <div className="min-h-screen bg-gray-50 pb-20">
            <div className="px-4 pt-6">
              <Button variant="ghost" onClick={handleBackToHome} className={`mb-4 text-gray-600 hover:text-gray-800 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                {isRTL ? <ArrowRight className="h-4 w-4" /> : <ArrowLeft className="h-4 w-4" />}
                <Home className="h-4 w-4 mr-2" />
                <span>{t('backToHome')}</span>
              </Button>
            </div>
            <div className="px-4">
              <BodyMeasurements />
            </div>
          </div>;
      case 'cardio':
        return <div className="min-h-screen bg-gray-50 pb-20">
            <div className="px-4 pt-6">
              <Button variant="ghost" onClick={handleBackToHome} className={`mb-4 text-gray-600 hover:text-gray-800 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                {isRTL ? <ArrowRight className="h-4 w-4" /> : <ArrowLeft className="h-4 w-4" />}
                <Home className="h-4 w-4 mr-2" />
                <span>{t('backToHome')}</span>
              </Button>
            </div>
            <div className="px-4">
              <CardioConverter />
            </div>
          </div>;
      case 'program':
        return <div className="min-h-screen bg-gray-50 pb-20">
            <div className="px-4 pt-6">
              <Button variant="ghost" onClick={handleBackToHome} className={`mb-4 text-gray-600 hover:text-gray-800 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                {isRTL ? <ArrowRight className="h-4 w-4" /> : <ArrowLeft className="h-4 w-4" />}
                <Home className="h-4 w-4 mr-2" />
                <span>{t('backToHome')}</span>
              </Button>
            </div>
            <div className="px-4">
              <WeeklyProgram />
            </div>
          </div>;
      case 'items':
        return <div className="min-h-screen bg-gray-50 pb-20">
            <div className="px-4 pt-6">
              <Button variant="ghost" onClick={handleBackToHome} className={`mb-4 text-gray-600 hover:text-gray-800 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                {isRTL ? <ArrowRight className="h-4 w-4" /> : <ArrowLeft className="h-4 w-4" />}
                <Home className="h-4 w-4 mr-2" />
                <span>{t('backToHome')}</span>
              </Button>
            </div>
            <div className="px-4">
              <MyItems />
            </div>
          </div>;
      case 'wakeup':
        return <div className="min-h-screen bg-gray-50 pb-20">
            <div className="px-4 pt-6">
              <Button variant="ghost" onClick={handleBackToHome} className={`mb-4 text-gray-600 hover:text-gray-800 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                {isRTL ? <ArrowRight className="h-4 w-4" /> : <ArrowLeft className="h-4 w-4" />}
                <Home className="h-4 w-4 mr-2" />
                <span>{t('backToHome')}</span>
              </Button>
            </div>
            <div className="px-4">
              <WakeUpChallenge />
            </div>
          </div>;
      case 'water':
        return <div className="min-h-screen bg-gray-50 pb-20">
            <div className="px-4 pt-6">
              <Button variant="ghost" onClick={handleBackToHome} className={`mb-4 text-gray-600 hover:text-gray-800 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                {isRTL ? <ArrowRight className="h-4 w-4" /> : <ArrowLeft className="h-4 w-4" />}
                <Home className="h-4 w-4 mr-2" />
                <span>{t('backToHome')}</span>
              </Button>
            </div>
            <div className="px-4">
              <WaterCalculator />
            </div>
          </div>;
      case 'terms':
        return <TermsAndPrivacy onBack={handleBackToHome} />;
      default:
        return <MobileDashboard onViewChange={handleViewChange} />;
    }
  };
  return <div className={`min-h-screen transition-all duration-300 ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Mobile Header */}
      <MobileHeader onViewChange={handleViewChange} />
      
      <main>
        {renderCurrentView()}
      </main>
      
      {/* Floating Services Button - show on all pages except terms */}
      {!['terms'].includes(currentView) && <Button onClick={() => setQuickServicesOpen(true)} className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-primary hover:bg-primary-dark shadow-2xl hover:shadow-3xl transition-all duration-300 z-50 hover:scale-110" size="icon">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <span className="text-primary font-bold text-lg">Q</span>
          </div>
        </Button>}
      
      {/* Quick Services Dialog */}
      <QuickServicesDialog open={quickServicesOpen} onOpenChange={setQuickServicesOpen} onViewChange={handleViewChange} />
      
      {/* PWA Install Prompt - shown on all pages */}
      <PWAInstallPrompt />
    </div>;
};
export default Index;