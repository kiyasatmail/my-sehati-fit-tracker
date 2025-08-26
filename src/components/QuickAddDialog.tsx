import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Calculator, Ruler, Heart, Calendar, Package, AlarmClock, Droplets, Home } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface QuickServicesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onViewChange: (view: 'home' | 'calories' | 'measurements' | 'cardio' | 'program' | 'items' | 'wakeup' | 'water') => void;
}

export const QuickServicesDialog: React.FC<QuickServicesDialogProps> = ({
  open,
  onOpenChange,
  onViewChange
}) => {
  const { isRTL } = useLanguage();

  const services = [
    {
      key: 'home',
      icon: Home,
      title: isRTL ? 'الرئيسية' : 'Home',
      color: 'bg-gray-500 hover:bg-gray-600',
      description: isRTL ? 'العودة للشاشة الرئيسية' : 'Back to home screen'
    },
    {
      key: 'calories',
      icon: Calculator,
      title: isRTL ? 'حاسبة السعرات' : 'Calorie Calculator',
      color: 'bg-green-500 hover:bg-green-600',
      description: isRTL ? 'احسب احتياجك اليومي' : 'Calculate daily needs'
    },
    {
      key: 'measurements',
      icon: Ruler,
      title: isRTL ? 'قياسات الجسم' : 'Body Measurements',
      color: 'bg-blue-500 hover:bg-blue-600',
      description: isRTL ? 'تتبع تقدمك' : 'Track your progress'
    },
    {
      key: 'cardio',
      icon: Heart,
      title: isRTL ? 'محول الكارديو' : 'Cardio Converter',
      color: 'bg-red-500 hover:bg-red-600',
      description: isRTL ? 'حول السعرات لدقائق' : 'Convert calories to minutes'
    },
    {
      key: 'program',
      icon: Calendar,
      title: isRTL ? 'البرنامج الأسبوعي' : 'Weekly Program',
      color: 'bg-purple-500 hover:bg-purple-600',
      description: isRTL ? 'خطط تمارينك' : 'Plan your workouts'
    },
    {
      key: 'items',
      icon: Package,
      title: isRTL ? 'أغراضي' : 'My Items',
      color: 'bg-orange-500 hover:bg-orange-600',
      description: isRTL ? 'تحقق من أغراضك' : 'Check your items'
    },
    {
      key: 'wakeup',
      icon: AlarmClock,
      title: isRTL ? 'تحدي الاستيقاظ' : 'Wake-up Challenge',
      color: 'bg-indigo-500 hover:bg-indigo-600',
      description: isRTL ? 'تحدى نفسك' : 'Challenge yourself'
    },
    {
      key: 'water',
      icon: Droplets,
      title: isRTL ? 'حاسبة الماء' : 'Water Calculator',
      color: 'bg-cyan-500 hover:bg-cyan-600',
      description: isRTL ? 'احسب احتياجك من الماء' : 'Calculate water needs'
    }
  ];

  const handleServiceSelect = (key: string) => {
    onViewChange(key as any);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold flex items-center justify-center gap-3">
            <div className="relative w-12 h-12 bg-gradient-to-br from-primary via-primary-light to-primary-dark rounded-xl flex items-center justify-center shadow-lg border-2 border-white/20">
              {/* Background glow */}
              <div className="absolute inset-0 bg-white/10 rounded-xl blur-sm"></div>
              
              {/* Main icon */}
              <div className="relative w-8 h-8 bg-white/95 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-md border border-white/30">
                <span className="text-primary font-black text-lg bg-gradient-to-br from-primary to-primary-dark bg-clip-text text-transparent">
                  ص
                </span>
              </div>
              
              {/* Decorative dots */}
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-gradient-to-br from-green-400 to-green-600 rounded-full opacity-80"></div>
              <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full opacity-60"></div>
            </div>
            {isRTL ? 'خدمات صحتي' : 'Sehati Services'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Button
                key={service.key}
                onClick={() => handleServiceSelect(service.key)}
                className={`${service.color} text-white h-auto p-6 flex flex-col items-center gap-3 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl`}
                variant="default"
              >
                <Icon className="h-8 w-8" />
                <div className="text-center">
                  <div className="font-bold text-lg mb-1">{service.title}</div>
                  <div className="text-sm opacity-90 font-normal">{service.description}</div>
                </div>
              </Button>
            );
          })}
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            {isRTL ? 'اختر الخدمة التي تريد استخدامها' : 'Choose the service you want to use'}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};