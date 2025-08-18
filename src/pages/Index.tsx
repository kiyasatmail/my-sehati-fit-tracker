import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { NewHeroSection } from '@/components/NewHeroSection';
import { CalorieCalculator } from '@/components/CalorieCalculator';
import { BodyMeasurements } from '@/components/BodyMeasurements';
import { CardioConverter } from '@/components/CardioConverter';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft, Home } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

type ViewType = 'home' | 'calories' | 'measurements' | 'cardio';

const Index = () => {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const { isRTL } = useLanguage();

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
                العودة للرئيسية
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
                العودة للرئيسية
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
                العودة للرئيسية
              </Button>
            </div>
            <div className="container mx-auto px-4 pb-8">
              <CardioConverter />
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
    </div>
  );
};

export default Index;