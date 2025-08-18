import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { NewHeroSection } from '@/components/NewHeroSection';
import { CalorieCalculator } from '@/components/CalorieCalculator';
import { BodyMeasurements } from '@/components/BodyMeasurements';
import { CardioConverter } from '@/components/CardioConverter';
import { Navigation } from '@/components/Navigation';

type ViewType = 'home' | 'calories' | 'measurements' | 'cardio';

const Index = () => {
  const [currentView, setCurrentView] = useState<ViewType>('home');

  const handleViewChange = (view: ViewType) => {
    setCurrentView(view);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'calories':
        return (
          <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4">
              <CalorieCalculator />
            </div>
          </div>
        );
      case 'measurements':
        return (
          <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4">
              <BodyMeasurements />
            </div>
          </div>
        );
      case 'cardio':
        return (
          <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4">
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
      <Header currentView={currentView} onViewChange={handleViewChange} />
      
      <main>
        {renderCurrentView()}
      </main>

      {/* Mobile Navigation - only show when not on home */}
      {currentView !== 'home' && (
        <Navigation currentView={currentView} onViewChange={handleViewChange} />
      )}
    </div>
  );
};

export default Index;