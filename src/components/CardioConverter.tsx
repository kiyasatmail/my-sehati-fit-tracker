import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Heart, Clock, Flame } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface Exercise {
  key: string;
  caloriesPerMinute: number; // متوسط السعرات المحروقة في الدقيقة لشخص 70 كيلو
}

const exercises: Exercise[] = [
  { key: 'running', caloriesPerMinute: 12 },
  { key: 'cycling', caloriesPerMinute: 8 },
  { key: 'swimming', caloriesPerMinute: 11 },
  { key: 'walking', caloriesPerMinute: 4 },
  { key: 'jumpingRope', caloriesPerMinute: 13 },
  { key: 'rowing', caloriesPerMinute: 9 },
];

export const CardioConverter: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const [calories, setCalories] = useState<number>(0);
  const [weight, setWeight] = useState<number>(70);
  const [selectedExercise, setSelectedExercise] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);

  const handleConvert = () => {
    if (calories > 0 && selectedExercise && weight > 0) {
      const exercise = exercises.find(ex => ex.key === selectedExercise);
      if (exercise) {
        // حساب السعرات الحرارية الفعلية حسب الوزن
        const actualCaloriesPerMinute = (exercise.caloriesPerMinute * weight) / 70;
        const timeInMinutes = Math.round(calories / actualCaloriesPerMinute);
        setResult(timeInMinutes);
      }
    }
  };

  const formatTime = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} ${t('minutes')}`;
    } else {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return remainingMinutes > 0 
        ? `${hours} ساعة و ${remainingMinutes} ${t('minutes')}`
        : `${hours} ساعة`;
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">محول الكارديو</h1>
        <p className="text-gray-600 text-lg">تحويل السعرات الحرارية إلى دقائق التمارين الرياضية</p>
      </div>

      <Card className="shadow-xl border-0 bg-white max-w-4xl mx-auto">
        <CardHeader className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-t-lg">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-white/20 rounded-full">
              <Heart className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center">{t('cardioConverter')}</CardTitle>
          <CardDescription className="text-center text-white/90 text-lg">
            تحويل السعرات الحرارية إلى دقائق التمارين الرياضية
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="calories">{t('caloriesInput')}</Label>
              <Input
                id="calories"
                type="number"
                value={calories || ''}
                onChange={(e) => setCalories(parseInt(e.target.value) || 0)}
                className="h-12 text-lg"
                placeholder={t('enterCalories')}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="weight">الوزن (كيلو)</Label>
              <Input
                id="weight"
                type="number"
                value={weight || ''}
                onChange={(e) => setWeight(parseInt(e.target.value) || 0)}
                className="h-12 text-lg"
                placeholder="أدخل وزنك"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="exercise">{t('exerciseType')}</Label>
              <Select value={selectedExercise} onValueChange={setSelectedExercise}>
                <SelectTrigger className="h-12 text-lg">
                  <SelectValue placeholder={t('selectExercise')} />
                </SelectTrigger>
                <SelectContent>
                  {exercises.map((exercise) => (
                    <SelectItem key={exercise.key} value={exercise.key}>
                      <div className="flex items-center gap-3">
                        <span>{t(exercise.key)}</span>
                        <span className="text-sm text-muted-foreground">
                          ({exercise.caloriesPerMinute} {t('calories')}/دقيقة)
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            onClick={handleConvert} 
            variant="default" 
            size="lg" 
            className="w-full bg-primary hover:bg-primary-light text-white font-semibold"
            disabled={!calories || !selectedExercise || !weight}
          >
            <Flame className="h-5 w-5" />
            {t('convert')}
          </Button>
        </CardContent>
      </Card>

      {result !== null && (
        <Card className="shadow-lg border-0 bg-white max-w-4xl mx-auto">
          <CardContent className="p-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full">
                <Clock className="h-8 w-8 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-800">{t('timeNeeded')}</h3>
            <div className="space-y-4">
              <p className="text-4xl font-bold text-purple-600">
                {formatTime(result)}
              </p>
              <p className="text-lg text-gray-600">
                من {t(selectedExercise)} لحرق {calories.toLocaleString()} {t('calories')}
              </p>
              <p className="text-md text-gray-500">
                لشخص بوزن {weight} كيلو
              </p>
            </div>
            
            <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-600">
                * الحسابات تقريبية ومحسوبة حسب الوزن المدخل
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* معلومات إضافية عن التمارين */}
      <Card className="shadow-lg border-0 bg-white max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-800">
            <Heart className="h-5 w-5" />
            نصائح التمارين الرياضية
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {exercises.map((exercise) => (
              <div 
                key={exercise.key}
                className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-smooth"
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-800">{t(exercise.key)}</span>
                  <span className="text-sm text-purple-600 font-semibold">
                    {exercise.caloriesPerMinute} سعرة/دقيقة
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};