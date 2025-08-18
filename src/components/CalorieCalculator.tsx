import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calculator, Activity, Zap } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface CalorieData {
  age: number;
  gender: 'male' | 'female';
  weight: number;
  height: number;
  activityLevel: number;
}

interface Results {
  bmr: number;
  tdee: number;
}

export const CalorieCalculator: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const [formData, setFormData] = useState<CalorieData>({
    age: 25,
    gender: 'male',
    weight: 70,
    height: 170,
    activityLevel: 1.55
  });
  const [results, setResults] = useState<Results | null>(null);

  const calculateCalories = () => {
    const { age, gender, weight, height, activityLevel } = formData;
    
    // Mifflin-St Jeor Equation
    let bmr: number;
    if (gender === 'male') {
      bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
    } else {
      bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
    }
    
    const tdee = bmr * activityLevel;
    
    setResults({ bmr: Math.round(bmr), tdee: Math.round(tdee) });
  };

  const activityLevels = [
    { value: 1.2, label: t('sedentary') },
    { value: 1.375, label: t('lightlyActive') },
    { value: 1.55, label: t('moderatelyActive') },
    { value: 1.725, label: t('veryActive') },
    { value: 1.9, label: t('extraActive') },
  ];

  return (
    <div className="space-y-6">
      <Card className="gradient-card shadow-card border-0">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary rounded-full">
              <Calculator className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl">{t('calorieCalculator')}</CardTitle>
          <CardDescription className="text-lg">
            {t('trackCalories')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="age">{t('age')}</Label>
              <Input
                id="age"
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) || 0 })}
                className="h-12 text-lg"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="gender">{t('gender')}</Label>
              <Select value={formData.gender} onValueChange={(value: 'male' | 'female') => setFormData({ ...formData, gender: value })}>
                <SelectTrigger className="h-12 text-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">{t('male')}</SelectItem>
                  <SelectItem value="female">{t('female')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="weight">{t('weight')}</Label>
              <Input
                id="weight"
                type="number"
                value={formData.weight}
                onChange={(e) => setFormData({ ...formData, weight: parseFloat(e.target.value) || 0 })}
                className="h-12 text-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="height">{t('height')}</Label>
              <Input
                id="height"
                type="number"
                value={formData.height}
                onChange={(e) => setFormData({ ...formData, height: parseFloat(e.target.value) || 0 })}
                className="h-12 text-lg"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="activity">{t('activityLevel')}</Label>
            <Select 
              value={formData.activityLevel.toString()} 
              onValueChange={(value) => setFormData({ ...formData, activityLevel: parseFloat(value) })}
            >
              <SelectTrigger className="h-12 text-lg">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {activityLevels.map((level) => (
                  <SelectItem key={level.value} value={level.value.toString()}>
                    {level.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button 
            onClick={calculateCalories} 
            variant="hero" 
            size="lg" 
            className="w-full"
          >
            <Calculator className="h-5 w-5" />
            {t('calculate')}
          </Button>
        </CardContent>
      </Card>

      {results && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="gradient-card shadow-card border-0">
            <CardContent className="p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-info rounded-full">
                  <Zap className="h-6 w-6 text-white" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">{t('bmr')}</h3>
              <p className="text-3xl font-bold text-primary">{results.bmr.toLocaleString()}</p>
              <p className="text-muted-foreground">{t('calories')}</p>
            </CardContent>
          </Card>

          <Card className="gradient-card shadow-card border-0">
            <CardContent className="p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-success rounded-full">
                  <Activity className="h-6 w-6 text-white" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">{t('tdee')}</h3>
              <p className="text-3xl font-bold text-primary">{results.tdee.toLocaleString()}</p>
              <p className="text-muted-foreground">{t('calories')}</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};