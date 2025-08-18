import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { NewHeroSection } from '@/components/NewHeroSection';
import { CalorieCalculator } from '@/components/CalorieCalculator';
import { BodyMeasurements } from '@/components/BodyMeasurements';
import { CardioConverter } from '@/components/CardioConverter';
import { WeeklyProgram } from '@/components/WeeklyProgram';
import { MyItems } from '@/components/MyItems';
import PWAInstallPrompt from '@/components/PWAInstallPrompt';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft, Home } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

type ViewType = 'home' | 'calories' | 'measurements' | 'cardio' | 'program' | 'items';

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
            <div className="container mx-auto px-4 pt-8">
              <Button
                variant="ghost"
                onClick={handleBackToHome}
                className="mb-4 text-gray-600 hover:text-gray-800"
              >
                {isRTL ? <ArrowRight className="h-4 w-4 ml-2" /> : <ArrowLeft className="h-4 w-4 mr-2" />}
                <Home className="h-4 w-4 mx-2" />
                {t('backToHome')}
              </Button>
            </div>
            <div className="container mx-auto px-4 pb-8">
              <CalorieCalculator />
            </div>
          </div>
        );
      case 'measurements':
        return (
          <div className="min-h-screen bg-gray-50">
            {/* Back Button */}
            <div className="container mx-auto px-4 pt-8">
              <Button
                variant="ghost"
                onClick={handleBackToHome}
                className="mb-4 text-gray-600 hover:text-gray-800"
              >
                {isRTL ? <ArrowRight className="h-4 w-4 ml-2" /> : <ArrowLeft className="h-4 w-4 mr-2" />}
                <Home className="h-4 w-4 mx-2" />
                {t('backToHome')}
              </Button>
            </div>
            <div className="container mx-auto px-4 pb-8">
              <BodyMeasurements />
            </div>
          </div>
        );
      case 'cardio':
        return (
          <div className="min-h-screen bg-gray-50">
            {/* Back Button */}
            <div className="container mx-auto px-4 pt-8">
              <Button
                variant="ghost"
                onClick={handleBackToHome}
                className="mb-4 text-gray-600 hover:text-gray-800"
              >
                {isRTL ? <ArrowRight className="h-4 w-4 ml-2" /> : <ArrowLeft className="h-4 w-4 mr-2" />}
                <Home className="h-4 w-4 mx-2" />
                {t('backToHome')}
              </Button>
            </div>
            <div className="container mx-auto px-4 pb-8">
              <CardioConverter />
            </div>
          </div>
        );
      case 'program':
        return (
          <div className="min-h-screen bg-gray-50">
            {/* Back Button */}
            <div className="container mx-auto px-4 pt-8">
              <Button
                variant="ghost"
                onClick={handleBackToHome}
                className="mb-4 text-gray-600 hover:text-gray-800"
              >
                {isRTL ? <ArrowRight className="h-4 w-4 ml-2" /> : <ArrowLeft className="h-4 w-4 mr-2" />}
                <Home className="h-4 w-4 mx-2" />
                {t('backToHome')}
              </Button>
            </div>
            <div className="container mx-auto px-4 pb-8">
              <WeeklyProgram />
            </div>
          </div>
        );
      case 'items':
        return (
          <div className="min-h-screen bg-gray-50">
            {/* Back Button */}
            <div className="container mx-auto px-4 pt-8">
              <Button
                variant="ghost"
                onClick={handleBackToHome}
                className="mb-4 text-gray-600 hover:text-gray-800"
              >
                {isRTL ? <ArrowRight className="h-4 w-4 ml-2" /> : <ArrowLeft className="h-4 w-4 mr-2" />}
                <Home className="h-4 w-4 mx-2" />
                {t('backToHome')}
              </Button>
            </div>
            <div className="container mx-auto px-4 pb-8">
              <MyItems />
            </div>
          </div>
        );
      default:
        return <NewHeroSection onViewChange={handleViewChange} />;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header only on home page */}
      {currentView === 'home' && (
        <Header currentView={currentView} onViewChange={handleViewChange} />
      )}
      
      <main>
        {renderCurrentView()}
      </main>
      
      {/* PWA Install Prompt - shown on all pages */}
      <PWAInstallPrompt />
    </div>
  );
};

export default Index;