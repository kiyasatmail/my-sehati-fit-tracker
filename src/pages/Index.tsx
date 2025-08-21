import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { NewHeroSection } from '@/components/NewHeroSection';
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

type ViewType = 'home' | 'calories' | 'measurements' | 'cardio' | 'program' | 'items' | 'wakeup' | 'water' | 'terms';

const Index = () => {
  const [currentView, setCurrentView] = useState<ViewType>('home');
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
          <div className="min-h-screen bg-gray-50">
            {/* Back Button */}
            <div className="responsive-container pt-8">
              <Button
                variant="ghost"
                onClick={handleBackToHome}
                className={`mb-4 text-gray-600 hover:text-gray-800 btn-with-icon ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {isRTL ? <ArrowRight className="h-4 w-4" /> : <ArrowLeft className="h-4 w-4" />}
                <Home className="h-4 w-4 mx-2" />
                <span>{t('backToHome')}</span>
              </Button>
            </div>
            <div className="responsive-container pb-8">
              <CalorieCalculator />
            </div>
          </div>
        );
      case 'measurements':
        return (
          <div className="min-h-screen bg-gray-50">
            {/* Back Button */}
            <div className="responsive-container pt-8">
              <Button
                variant="ghost"
                onClick={handleBackToHome}
                className={`mb-4 text-gray-600 hover:text-gray-800 btn-with-icon ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {isRTL ? <ArrowRight className="h-4 w-4" /> : <ArrowLeft className="h-4 w-4" />}
                <Home className="h-4 w-4 mx-2" />
                <span>{t('backToHome')}</span>
              </Button>
            </div>
            <div className="responsive-container pb-8">
              <BodyMeasurements />
            </div>
          </div>
        );
      case 'cardio':
        return (
          <div className="min-h-screen bg-gray-50">
            {/* Back Button */}
            <div className="responsive-container pt-8">
              <Button
                variant="ghost"
                onClick={handleBackToHome}
                className={`mb-4 text-gray-600 hover:text-gray-800 btn-with-icon ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {isRTL ? <ArrowRight className="h-4 w-4" /> : <ArrowLeft className="h-4 w-4" />}
                <Home className="h-4 w-4 mx-2" />
                <span>{t('backToHome')}</span>
              </Button>
            </div>
            <div className="responsive-container pb-8">
              <CardioConverter />
            </div>
          </div>
        );
      case 'program':
        return (
          <div className="min-h-screen bg-gray-50">
            {/* Back Button */}
            <div className="responsive-container pt-8">
              <Button
                variant="ghost"
                onClick={handleBackToHome}
                className={`mb-4 text-gray-600 hover:text-gray-800 btn-with-icon ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {isRTL ? <ArrowRight className="h-4 w-4" /> : <ArrowLeft className="h-4 w-4" />}
                <Home className="h-4 w-4 mx-2" />
                <span>{t('backToHome')}</span>
              </Button>
            </div>
            <div className="responsive-container pb-8">
              <WeeklyProgram />
            </div>
          </div>
        );
      case 'items':
        return (
          <div className="min-h-screen bg-gray-50">
            {/* Back Button */}
            <div className="responsive-container pt-8">
              <Button
                variant="ghost"
                onClick={handleBackToHome}
                className={`mb-4 text-gray-600 hover:text-gray-800 btn-with-icon ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {isRTL ? <ArrowRight className="h-4 w-4" /> : <ArrowLeft className="h-4 w-4" />}
                <Home className="h-4 w-4 mx-2" />
                <span>{t('backToHome')}</span>
              </Button>
            </div>
            <div className="responsive-container pb-8">
              <MyItems />
            </div>
          </div>
        );
      case 'wakeup':
        return (
          <div className="min-h-screen bg-gray-50">
            {/* Back Button */}
            <div className="responsive-container pt-8">
              <Button
                variant="ghost"
                onClick={handleBackToHome}
                className={`mb-4 text-gray-600 hover:text-gray-800 btn-with-icon ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {isRTL ? <ArrowRight className="h-4 w-4" /> : <ArrowLeft className="h-4 w-4" />}
                <Home className="h-4 w-4 mx-2" />
                <span>{t('backToHome')}</span>
              </Button>
            </div>
            <div className="responsive-container pb-8">
              <WakeUpChallenge />
            </div>
          </div>
        );
      case 'water':
        return (
          <div className="min-h-screen bg-gray-50">
            {/* Back Button */}
            <div className="responsive-container pt-8">
              <Button
                variant="ghost"
                onClick={handleBackToHome}
                className={`mb-4 text-gray-600 hover:text-gray-800 btn-with-icon ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {isRTL ? <ArrowRight className="h-4 w-4" /> : <ArrowLeft className="h-4 w-4" />}
                <Home className="h-4 w-4 mx-2" />
                <span>{t('backToHome')}</span>
              </Button>
            </div>
            <div className="responsive-container pb-8">
              <WaterCalculator />
            </div>
          </div>
        );
      case 'terms':
        return <TermsAndPrivacy onBack={handleBackToHome} />;
      default:
        return <NewHeroSection onViewChange={handleViewChange} />;
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-300 ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header on all pages */}
      <Header currentView={currentView} onViewChange={handleViewChange} />
      
      <main className="responsive-container">
        {renderCurrentView()}
      </main>
      
      {/* PWA Install Prompt - shown on all pages */}
      <PWAInstallPrompt />
    </div>
  );
};

export default Index;