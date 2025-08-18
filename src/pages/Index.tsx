import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { CalorieCalculator } from '@/components/CalorieCalculator';

const Index = () => {
  const [showCalculator, setShowCalculator] = useState(false);

  const handleStartTracking = () => {
    setShowCalculator(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {!showCalculator ? (
          <HeroSection onStartTracking={handleStartTracking} />
        ) : (
          <CalorieCalculator />
        )}
      </main>
    </div>
  );
};

export default Index;
