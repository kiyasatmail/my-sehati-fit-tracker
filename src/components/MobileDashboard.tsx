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
      color: 'bg-gradient-to-br from-green-500 to-green-600',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600'
    },
    {
      key: 'measurements',
      icon: Ruler,
      title: isRTL ? 'قياسات الجسم' : 'Body Measurements',
      subtitle: isRTL ? 'تتبع تقدمك' : 'Track your progress',
      color: 'bg-gradient-to-br from-blue-500 to-blue-600',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    {
      key: 'cardio',
      icon: Heart,
      title: isRTL ? 'محول الكارديو' : 'Cardio Converter',
      subtitle: isRTL ? 'حول السعرات لدقائق' : 'Convert calories to minutes',
      color: 'bg-gradient-to-br from-red-500 to-red-600',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600'
    },
    {
      key: 'program',
      icon: Calendar,
      title: isRTL ? 'البرنامج الأسبوعي' : 'Weekly Program',
      subtitle: isRTL ? 'خطط تمارينك' : 'Plan your workouts',
      color: 'bg-gradient-to-br from-purple-500 to-purple-600',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600'
    },
    {
      key: 'items',
      icon: Package,
      title: isRTL ? 'أغراضي' : 'My Items',
      subtitle: isRTL ? 'تحقق من أغراضك' : 'Check your items',
      color: 'bg-gradient-to-br from-orange-500 to-orange-600',
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600'
    },
    {
      key: 'wakeup',
      icon: AlarmClock,
      title: isRTL ? 'تحدي الاستيقاظ' : 'Wake-up Challenge',
      subtitle: isRTL ? 'تحدى نفسك' : 'Challenge yourself',
      color: 'bg-gradient-to-br from-indigo-500 to-indigo-600',
      iconBg: 'bg-indigo-100',
      iconColor: 'text-indigo-600'
    },
    {
      key: 'water',
      icon: Droplets,
      title: isRTL ? 'حاسبة الماء' : 'Water Calculator',
      subtitle: isRTL ? 'احسب احتياجك من الماء' : 'Calculate water needs',
      color: 'bg-gradient-to-br from-cyan-500 to-cyan-600',
      iconBg: 'bg-cyan-100',
      iconColor: 'text-cyan-600'
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
                className="border-0 shadow-card hover:shadow-hero transition-smooth hover:-translate-y-1 cursor-pointer overflow-hidden h-32"
                onClick={() => onViewChange(service.key as any)}
              >
                <CardContent className="p-0 h-full">
                  <div className={`${service.color} p-3 text-white h-full flex flex-col`}>
                    <div className={`flex ${isRTL ? 'flex-row-reverse justify-start' : 'flex-row justify-end'} items-start mb-3`}>
                      <div className={`p-2 rounded-lg ${service.iconBg}`}>
                        <Icon className={`h-5 w-5 ${service.iconColor}`} />
                      </div>
                    </div>
                    <div className={`flex-1 flex flex-col justify-end ${isRTL ? 'text-right' : 'text-left'}`}>
                      <h3 className="font-bold text-base mb-1 leading-tight text-white drop-shadow-sm">
                        {service.title}
                      </h3>
                      <p className="text-white text-xs leading-relaxed drop-shadow-sm opacity-95">
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