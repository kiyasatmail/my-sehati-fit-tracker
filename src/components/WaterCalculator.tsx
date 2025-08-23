import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Droplets, Calculator, Info, AlertCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export const WaterCalculator = () => {
  const { t, isRTL } = useLanguage();
  const [weight, setWeight] = useState<string>('');
  const [exerciseHours, setExerciseHours] = useState<string>('');
  const [waterNeeded, setWaterNeeded] = useState<number | null>(null);

  const calculateWater = () => {
    const weightNum = parseFloat(weight);
    const exerciseNum = parseFloat(exerciseHours);
    
    // Input validation for security and reliability
    if (!weightNum || weightNum <= 0 || weightNum > 500) {
      alert(isRTL ? 'يرجى إدخال وزن صحيح (1-500 كغ)' : 'Please enter a valid weight (1-500 kg)');
      return;
    }
    
    if (exerciseNum < 0 || exerciseNum > 24) {
      alert(isRTL ? 'يرجى إدخال ساعات تمرين صحيحة (0-24 ساعة)' : 'Please enter valid exercise hours (0-24 hours)');
      return;
    }
    
    // Base water: 35ml per kg of body weight
    const baseWater = weightNum * 35;
    // Additional water for exercise: 500ml per hour of exercise
    const exerciseWater = exerciseNum > 0 ? exerciseNum * 500 : 0;
    const totalWater = baseWater + exerciseWater;
    setWaterNeeded(Math.round(totalWater));
  };

  const resetCalculator = () => {
    setWeight('');
    setExerciseHours('');
    setWaterNeeded(null);
  };

  const urineInfo = [
    {
      color: isRTL ? 'شفاف/أصفر فاتح جداً' : 'Clear/Very Light Yellow',
      status: isRTL ? 'ممتاز - ترطيب مثالي' : 'Excellent - Optimal Hydration',
      icon: '💧',
      bgColor: 'bg-green-50 border-green-200'
    },
    {
      color: isRTL ? 'أصفر فاتح' : 'Light Yellow',
      status: isRTL ? 'جيد - ترطيب كافي' : 'Good - Adequate Hydration',
      icon: '✅',
      bgColor: 'bg-green-50 border-green-200'
    },
    {
      color: isRTL ? 'أصفر متوسط' : 'Medium Yellow',
      status: isRTL ? 'اشرب المزيد من الماء' : 'Drink More Water',
      icon: '⚠️',
      bgColor: 'bg-yellow-50 border-yellow-200'
    },
    {
      color: isRTL ? 'أصفر داكن' : 'Dark Yellow',
      status: isRTL ? 'جفاف خفيف - اشرب الماء فوراً' : 'Mild Dehydration - Drink Water Now',
      icon: '🚨',
      bgColor: 'bg-orange-50 border-orange-200'
    },
    {
      color: isRTL ? 'بني/برتقالي' : 'Brown/Orange',
      status: isRTL ? 'جفاف شديد - استشر طبيب' : 'Severe Dehydration - Consult Doctor',
      icon: '🏥',
      bgColor: 'bg-red-50 border-red-200'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Droplets className="h-8 w-8 text-blue-500" />
            <h1 className="text-3xl font-bold text-gray-900">
              {isRTL ? 'حاسبة الماء' : 'Water Calculator'}
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            {isRTL 
              ? 'احسب كمية الماء التي تحتاجها يومياً حسب وزنك ونشاطك البدني'
              : 'Calculate your daily water intake based on your weight and physical activity'
            }
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Water Calculator */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-blue-500" />
                {isRTL ? 'حاسبة احتياجك من الماء' : 'Your Water Needs Calculator'}
              </CardTitle>
              <CardDescription>
                {isRTL 
                  ? 'أدخل وزنك وساعات التمرين لحساب احتياجك اليومي من الماء'
                  : 'Enter your weight and exercise hours to calculate your daily water needs'
                }
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="weight">
                  {isRTL ? 'الوزن (كيلوغرام)' : 'Weight (kg)'}
                </Label>
                <Input
                  id="weight"
                  type="number"
                  min="1"
                  max="500"
                  placeholder={isRTL ? 'أدخل وزنك' : 'Enter your weight'}
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="text-lg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="exercise">
                  {isRTL ? 'ساعات التمرين اليومية' : 'Daily Exercise Hours'}
                </Label>
                <Input
                  id="exercise"
                  type="number"
                  min="0"
                  max="24"
                  step="0.5"
                  placeholder={isRTL ? 'أدخل ساعات التمرين' : 'Enter exercise hours'}
                  value={exerciseHours}
                  onChange={(e) => setExerciseHours(e.target.value)}
                  className="text-lg"
                />
              </div>

              <div className="flex gap-3">
                <Button 
                  onClick={calculateWater} 
                  className="flex-1"
                  disabled={!weight}
                >
                  <Droplets className="h-4 w-4 mr-2" />
                  {isRTL ? 'احسب' : 'Calculate'}
                </Button>
                <Button 
                  onClick={resetCalculator} 
                  variant="outline"
                  className="px-6"
                >
                  {isRTL ? 'إعادة تعيين' : 'Reset'}
                </Button>
              </div>

              {waterNeeded && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {waterNeeded.toLocaleString()} {isRTL ? 'مل' : 'ml'}
                  </div>
                  <div className="text-lg text-gray-700 mb-2">
                    {isRTL ? 'احتياجك اليومي من الماء' : 'Your Daily Water Intake'}
                  </div>
                  <div className="text-sm text-gray-600">
                    {isRTL 
                      ? `${Math.round(waterNeeded / 250)} كوب تقريباً (250 مل لكل كوب)`
                      : `Approximately ${Math.round(waterNeeded / 250)} glasses (250ml each)`
                    }
                  </div>
                </div>
              )}

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <Info className="h-5 w-5 text-amber-600 mt-0.5" />
                  <div className="text-sm text-amber-800">
                    <div className="font-semibold mb-1">
                      {isRTL ? 'ملاحظة:' : 'Note:'}
                    </div>
                    {isRTL 
                      ? 'هذه حاسبة تقديرية. قد تحتاج المزيد من الماء في الطقس الحار أو عند المرض.'
                      : 'This is an estimate. You may need more water in hot weather or when sick.'
                    }
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Urine Color Guide */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-yellow-500" />
                {isRTL ? 'دليل لون البول' : 'Urine Color Guide'}
              </CardTitle>
              <CardDescription>
                {isRTL 
                  ? 'تحقق من حالة الترطيب من خلال لون البول'
                  : 'Check your hydration status through urine color'
                }
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {urineInfo.map((info, index) => (
                <div 
                  key={index}
                  className={`border rounded-lg p-4 ${info.bgColor}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{info.icon}</span>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800">
                        {info.color}
                      </div>
                      <div className="text-sm text-gray-600">
                        {info.status}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <Droplets className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div className="text-sm text-blue-800">
                    <div className="font-semibold mb-1">
                      {isRTL ? 'نصائح للترطيب الأمثل:' : 'Tips for Optimal Hydration:'}
                    </div>
                    <ul className="space-y-1 text-xs">
                      <li>• {isRTL ? 'اشرب الماء على مدار اليوم' : 'Drink water throughout the day'}</li>
                      <li>• {isRTL ? 'اشرب المزيد قبل وأثناء وبعد التمرين' : 'Drink more before, during, and after exercise'}</li>
                      <li>• {isRTL ? 'اشرب المزيد في الطقس الحار' : 'Increase intake in hot weather'}</li>
                      <li>• {isRTL ? 'قلل من الكافيين والكحول' : 'Limit caffeine and alcohol'}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};