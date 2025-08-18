import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, Ruler, Heart, Activity, TrendingUp, Clock } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface NewHeroSectionProps {
  onViewChange: (view: 'calories' | 'measurements' | 'cardio') => void;
}

export const NewHeroSection: React.FC<NewHeroSectionProps> = ({ onViewChange }) => {
  const { t, isRTL } = useLanguage();

  const features = [
    {
      key: 'calories',
      icon: Activity,
      title: 'حساب السعرات الحرارية',
      titleEn: 'Calorie Calculator',
      description: 'احسب احتياجاتك اليومية من السعرات الحرارية بناء على عمرك وجنسك ووزنك وطولك ومستوى نشاطك',
      descriptionEn: 'Calculate your daily calorie needs based on age, gender, weight, height, and activity level',
      buttonText: 'استكشف',
      buttonTextEn: 'Explore',
      color: 'from-green-500 to-green-600'
    },
    {
      key: 'measurements',
      icon: TrendingUp,
      title: 'تتبع قياسات الجسم',
      titleEn: 'Body Measurements Tracking',
      description: 'سجل وتتبع قياساتك في جميع المناطق الرئيسية واحصل على تقارير مفصلة عن التقدم على مر الوقت',
      descriptionEn: 'Record and track measurements in all key areas and get detailed progress reports over time',
      buttonText: 'استكشف',
      buttonTextEn: 'Explore',
      color: 'from-blue-500 to-blue-600'
    },
    {
      key: 'cardio',
      icon: Clock,
      title: 'تحويل السعرات إلى دقائق كارديو',
      titleEn: 'Convert Calories to Cardio Minutes',
      description: 'حول قيم السعرات الحرارية إلى وقت التمارين الرياضية بناء على نوع النشاط ومستوى نشاطك',
      descriptionEn: 'Convert calorie values to exercise time based on activity type and your activity level',
      buttonText: 'استكشف',
      buttonTextEn: 'Explore',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              تتبع صحتي
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
              دليلك الشامل لحساب السعرات الحرارية وتتبع قياسات الجسم وتحويل السعرات لدقائق التمارين
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="secondary" 
                size="lg"
                onClick={() => onViewChange('calories')}
                className="text-lg px-8 py-3 h-auto"
              >
                تتبع قياساتك
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="text-lg px-8 py-3 h-auto bg-transparent border-white text-white hover:bg-white hover:text-primary"
              >
                ابدأ الآن
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            
            return (
              <Card 
                key={feature.key}
                className="shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-white"
              >
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-4">
                    <div className={`p-4 rounded-full bg-gradient-to-r ${feature.color}`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <CardTitle className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
                    {isRTL ? feature.title : feature.titleEn}
                  </CardTitle>
                  <CardDescription className="text-gray-600 text-base leading-relaxed">
                    {isRTL ? feature.description : feature.descriptionEn}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button 
                    variant="default"
                    size="lg"
                    onClick={() => onViewChange(feature.key as 'calories' | 'measurements' | 'cardio')}
                    className="w-full bg-primary hover:bg-primary-light text-lg font-semibold"
                  >
                    {isRTL ? feature.buttonText : feature.buttonTextEn}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};