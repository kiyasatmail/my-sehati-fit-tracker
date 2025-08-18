import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { CalorieCalculator } from '@/components/CalorieCalculator';
import { BodyMeasurements } from '@/components/BodyMeasurements';
import { CardioConverter } from '@/components/CardioConverter';
import { Navigation } from '@/components/Navigation';

type ViewType = 'home' | 'calories' | 'measurements' | 'cardio';

const Index = () => {
  const [currentView, setCurrentView] = useState<ViewType>('home');

  const handleStartTracking = () => {
    setCurrentView('calories');
  };

  const handleViewChange = (view: ViewType) => {
    setCurrentView(view);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'calories':
        return <CalorieCalculator />;
      case 'measurements':
        return <BodyMeasurements />;
      case 'cardio':
        return <CardioConverter />;
      default:
        return <HeroSection onStartTracking={handleStartTracking} />;
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {renderCurrentView()}
      </main>

      <Navigation currentView={currentView} onViewChange={handleViewChange} />
    </div>
  );
};

export default Index;
