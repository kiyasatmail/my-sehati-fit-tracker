import React from 'react';
import { Button } from '@/components/ui/button';
import { Home, BarChart3, Dumbbell, Settings, Plus } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface BottomNavigationProps {
  currentView: string;
  onViewChange: (view: 'home' | 'tracking' | 'workouts' | 'settings') => void;
  onQuickAdd: () => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  currentView,
  onViewChange,
  onQuickAdd
}) => {
  const { isRTL } = useLanguage();

  const navItems = [
    {
      key: 'home',
      icon: Home,
      label: isRTL ? 'الرئيسية' : 'Home'
    },
    {
      key: 'tracking',
      icon: BarChart3,
      label: isRTL ? 'التتبع' : 'Tracking'
    },
    {
      key: 'workouts',
      icon: Dumbbell,
      label: isRTL ? 'التمارين' : 'Workouts'
    },
    {
      key: 'settings',
      icon: Settings,
      label: isRTL ? 'الإعدادات' : 'Settings'
    }
  ];

  return (
    <>
      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 z-40">
        <div className="grid grid-cols-4 gap-1 px-2 py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.key;
            
            return (
              <Button
                key={item.key}
                variant="ghost"
                size="sm"
                onClick={() => onViewChange(item.key as any)}
                className={`flex flex-col items-center gap-1 h-auto py-3 px-2 ${
                  isActive 
                    ? 'text-primary bg-primary/10' 
                    : 'text-gray-600 dark:text-gray-400 hover:text-primary'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs font-medium">{item.label}</span>
              </Button>
            );
          })}
        </div>
      </div>

      {/* Floating Action Button */}
      <Button
        onClick={onQuickAdd}
        className="fixed bottom-20 right-4 w-14 h-14 rounded-full bg-primary hover:bg-primary-dark shadow-lg hover:shadow-xl transition-all duration-300 z-50"
        size="icon"
      >
        <Plus className="h-6 w-6 text-white" />
      </Button>
    </>
  );
};