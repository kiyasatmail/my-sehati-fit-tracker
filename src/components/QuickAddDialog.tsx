import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Calculator, Droplets, Dumbbell, Package } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface QuickAddDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onViewChange: (view: 'calories' | 'water' | 'program' | 'items') => void;
}

export const QuickAddDialog: React.FC<QuickAddDialogProps> = ({
  open,
  onOpenChange,
  onViewChange
}) => {
  const { isRTL } = useLanguage();

  const quickActions = [
    {
      key: 'calories',
      icon: Calculator,
      title: isRTL ? 'حساب السعرات' : 'Calculate Calories',
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      key: 'water',
      icon: Droplets,
      title: isRTL ? 'حساب الماء' : 'Calculate Water',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      key: 'program',
      icon: Dumbbell,
      title: isRTL ? 'إضافة تمرين' : 'Add Workout',
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      key: 'items',
      icon: Package,
      title: isRTL ? 'إضافة غرض' : 'Add Item',
      color: 'bg-orange-500 hover:bg-orange-600'
    }
  ];

  const handleAction = (key: string) => {
    onViewChange(key as any);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            {isRTL ? 'إضافة سريعة' : 'Quick Add'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-2 gap-4 mt-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Button
                key={action.key}
                onClick={() => handleAction(action.key)}
                className={`${action.color} text-white h-20 flex flex-col items-center gap-2 hover:scale-105 transition-transform`}
              >
                <Icon className="h-6 w-6" />
                <span className="text-sm font-medium">{action.title}</span>
              </Button>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};