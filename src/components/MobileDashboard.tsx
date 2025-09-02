import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Calculator, Ruler, Heart, Calendar, Package, AlarmClock, Droplets } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface MobileDashboardProps {
  onViewChange: (view: 'calories' | 'measurements' | 'cardio' | 'program' | 'items' | 'wakeup' | 'water') => void;
}

export const MobileDashboard: React.FC<MobileDashboardProps> = ({ onViewChange }) => {
  const { t, isRTL } = useLanguage();

  const services = [
    {
      key: 'calories',
      icon: Calculator,
      title: isRTL ? 'حاسبة السعرات' : 'Calorie Calculator',
      subtitle: isRTL ? 'احسب احتياجك اليومي' : 'Calculate daily needs',
      color: 'gradient-primary',
      iconBg: 'bg-white/20',
      iconColor: 'text-white'
    },
    {
      key: 'measurements',
      icon: Ruler,
      title: isRTL ? 'قياسات الجسم' : 'Body Measurements',
      subtitle: isRTL ? 'تتبع تقدمك' : 'Track your progress',
      color: 'gradient-secondary',
      iconBg: 'bg-white/20',
      iconColor: 'text-white'
    },
    {
      key: 'cardio',
      icon: Heart,
      title: isRTL ? 'محول الكارديو' : 'Cardio Converter',
      subtitle: isRTL ? 'حول السعرات لدقائق' : 'Convert calories to minutes',
      color: 'gradient-focus',
      iconBg: 'bg-white/20',
      iconColor: 'text-white'
    },
    {
      key: 'program',
      icon: Calendar,
      title: isRTL ? 'البرنامج الأسبوعي' : 'Weekly Program',
      subtitle: isRTL ? 'خطط تمارينك' : 'Plan your workouts',
      color: 'gradient-hero',
      iconBg: 'bg-white/20',
      iconColor: 'text-white'
    },
    {
      key: 'items',
      icon: Package,
      title: isRTL ? 'أغراضي' : 'My Items',
      subtitle: isRTL ? 'تحقق من أغراضك' : 'Check your items',
      color: 'gradient-success',
      iconBg: 'bg-white/20',
      iconColor: 'text-white'
    },
    {
      key: 'wakeup',
      icon: AlarmClock,
      title: isRTL ? 'تحدي الاستيقاظ' : 'Wake-up Challenge',
      subtitle: isRTL ? 'تحدى نفسك' : 'Challenge yourself',
      color: 'gradient-primary',
      iconBg: 'bg-white/20',
      iconColor: 'text-white'
    },
    {
      key: 'water',
      icon: Droplets,
      title: isRTL ? 'حاسبة الماء' : 'Water Calculator',
      subtitle: isRTL ? 'احسب احتياجك من الماء' : 'Calculate water needs',
      color: 'gradient-secondary',
      iconBg: 'bg-white/20',
      iconColor: 'text-white'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Welcome Section */}
      <div className="px-4 py-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {isRTL ? 'مرحباً بك' : 'Welcome'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {isRTL ? 'اختر الخدمة التي تريدها' : 'Choose the service you need'}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-2 gap-4">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Card
                key={service.key}
                className="border-0 shadow-hero hover:shadow-xl transition-smooth hover:-translate-y-1 cursor-pointer overflow-hidden h-32 w-full"
                onClick={() => onViewChange(service.key as any)}
              >
                <CardContent className="p-0 h-full">
                  <div className={`${service.color} p-4 text-white h-full flex flex-col justify-between`}>
                    <div className="flex justify-between items-start">
                      <div className={`p-2 rounded-lg ${service.iconBg} flex-shrink-0`}>
                        <Icon className={`h-5 w-5 ${service.iconColor}`} />
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col justify-end">
                      <h3 className="font-bold text-base mb-1 leading-tight line-clamp-2">
                        {service.title}
                      </h3>
                      <p className="text-white/80 text-xs line-clamp-2">
                        {service.subtitle}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};