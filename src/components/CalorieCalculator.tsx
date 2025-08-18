import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calculator, Activity, Zap, Target, TrendingDown, TrendingUp, Minus, Save, History, Trash2, Calendar } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from '@/hooks/use-toast';

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
  weightLoss: {
    mild: number;
    moderate: number;
    aggressive: number;
  };
  weightGain: {
    mild: number;
    moderate: number;
  };
  macros: {
    protein: { min: number; max: number };
    carbs: { min: number; max: number };
    fats: { min: number; max: number };
  };
}

interface SavedCalculation {
  id: string;
  name: string;
  date: string;
  formData: CalorieData;
  results: Results;
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
  const [savedCalculations, setSavedCalculations] = useState<SavedCalculation[]>([]);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [calculationName, setCalculationName] = useState('');

  // Load saved calculations from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('sehati-calorie-calculations');
    if (saved) {
      try {
        setSavedCalculations(JSON.parse(saved));
      } catch (error) {
        console.error('Error loading saved calculations:', error);
      }
    }
  }, []);

  // Save calculations to localStorage
  useEffect(() => {
    localStorage.setItem('sehati-calorie-calculations', JSON.stringify(savedCalculations));
  }, [savedCalculations]);

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
    
    // Weight management calculations
    const weightLoss = {
      mild: Math.round(tdee - 250),      // 0.25kg per week
      moderate: Math.round(tdee - 500),  // 0.5kg per week  
      aggressive: Math.round(tdee - 750) // 0.75kg per week
    };
    
    const weightGain = {
      mild: Math.round(tdee + 250),      // 0.25kg per week
      moderate: Math.round(tdee + 500)   // 0.5kg per week
    };
    
    // Macronutrient calculations (based on TDEE)
    const macros = {
      protein: { 
        min: Math.round((tdee * 0.15) / 4),  // 15% of calories
        max: Math.round((tdee * 0.25) / 4)   // 25% of calories
      },
      carbs: { 
        min: Math.round((tdee * 0.45) / 4),  // 45% of calories
        max: Math.round((tdee * 0.65) / 4)   // 65% of calories
      },
      fats: { 
        min: Math.round((tdee * 0.20) / 9),  // 20% of calories
        max: Math.round((tdee * 0.35) / 9)   // 35% of calories
      }
    };
    
    setResults({ 
      bmr: Math.round(bmr), 
      tdee: Math.round(tdee),
      weightLoss,
      weightGain,
      macros
    });
  };

  const saveCalculation = () => {
    if (!results || !calculationName.trim()) return;

    const newCalculation: SavedCalculation = {
      id: Date.now().toString(),
      name: calculationName.trim(),
      date: new Date().toLocaleDateString('ar-SA'),
      formData: { ...formData },
      results: { ...results }
    };

    setSavedCalculations(prev => [newCalculation, ...prev]);
    setCalculationName('');
    setSaveDialogOpen(false);
    
    toast({
      title: isRTL ? 'تم الحفظ بنجاح' : 'Saved Successfully',
      description: `${calculationName} ${isRTL ? 'تم حفظه' : 'has been saved'}`,
    });
  };

  const loadCalculation = (saved: SavedCalculation) => {
    setFormData(saved.formData);
    setResults(saved.results);
    
    toast({
      title: isRTL ? 'تم التحميل' : 'Loaded',
      description: `${saved.name} ${isRTL ? 'تم تحميله' : 'has been loaded'}`,
    });
  };

  const deleteCalculation = (id: string) => {
    setSavedCalculations(prev => prev.filter(calc => calc.id !== id));
    
    toast({
      title: isRTL ? 'تم الحذف' : 'Deleted',
      description: isRTL ? 'تم حذف الحساب' : 'Calculation has been deleted',
    });
  };

  const activityLevels = [
    { value: 1.2, label: t('sedentary') },
    { value: 1.375, label: t('lightlyActive') },
    { value: 1.55, label: t('moderatelyActive') },
    { value: 1.725, label: t('veryActive') },
    { value: 1.9, label: t('extraActive') },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">حاسبة السعرات الحرارية</h1>
        <p className="text-gray-600 text-lg">احسب احتياجاتك اليومية من السعرات الحرارية</p>
      </div>

      {/* Tabs for Calculator and Saved */}
      <Tabs defaultValue="calculator" className="max-w-6xl mx-auto">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="calculator" className="flex items-center gap-2">
            <Calculator className="h-4 w-4" />
            {isRTL ? 'الحاسبة' : 'Calculator'}
          </TabsTrigger>
          <TabsTrigger value="saved" className="flex items-center gap-2">
            <History className="h-4 w-4" />
            {isRTL ? 'المحفوظات' : 'Saved'}
            {savedCalculations.length > 0 && (
              <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full ml-1">
                {savedCalculations.length}
              </span>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="calculator" className="space-y-6">

      <Card className="shadow-xl border-0 bg-white max-w-4xl mx-auto">
        <CardHeader className="gradient-hero text-white rounded-t-lg">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-white/20 rounded-full">
              <Calculator className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center">{t('calorieCalculator')}</CardTitle>
          <CardDescription className="text-center text-white/90 text-lg">
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

          <div className="flex gap-3">
            <Button 
              onClick={calculateCalories} 
              variant="default" 
              size="lg" 
              className="flex-1 gradient-primary text-white font-semibold hover:gradient-secondary transition-smooth"
            >
              <Calculator className="h-5 w-5" />
              {t('calculate')}
            </Button>
            
            {results && (
              <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
                <DialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="px-6"
                  >
                    <Save className="h-5 w-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>{isRTL ? 'حفظ الحساب' : 'Save Calculation'}</DialogTitle>
                    <DialogDescription>
                      {isRTL ? 'اختر اسماً لحفظ هذا الحساب' : 'Choose a name to save this calculation'}
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-4">
                    <Input
                      value={calculationName}
                      onChange={(e) => setCalculationName(e.target.value)}
                      placeholder={isRTL ? 'اسم الحساب' : 'Calculation name'}
                      className="w-full"
                    />
                  </div>

                  <DialogFooter>
                    <Button variant="outline" onClick={() => setSaveDialogOpen(false)}>
                      {t('cancel')}
                    </Button>
                    <Button 
                      onClick={saveCalculation}
                      disabled={!calculationName.trim()}
                      className="gradient-primary hover:gradient-secondary"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {t('save')}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </CardContent>
      </Card>

      {results && (
        <div className="space-y-8 max-w-6xl mx-auto">
          {/* BMR and TDEE Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="shadow-lg border-0 bg-white">
              <CardContent className="p-8 text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">{t('bmr')}</h3>
                <p className="text-3xl font-bold text-blue-600">{results.bmr.toLocaleString()}</p>
                <p className="text-gray-600">{t('calories')}</p>
                <p className="text-xs text-gray-500 mt-2">
                  {isRTL ? 'معدل الأيض الأساسي' : 'Basal Metabolic Rate'}
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-white">
              <CardContent className="p-8 text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-full">
                    <Activity className="h-6 w-6 text-white" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">{t('tdee')}</h3>
                <p className="text-3xl font-bold text-green-600">{results.tdee.toLocaleString()}</p>
                <p className="text-gray-600">{t('calories')}</p>
                <p className="text-xs text-gray-500 mt-2">
                  {isRTL ? 'إجمالي الطاقة المستهلكة يومياً' : 'Total Daily Energy Expenditure'}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Weight Management Goals */}
          <div>
            <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">
              {isRTL ? 'أهداف إدارة الوزن' : 'Weight Management Goals'}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Weight Loss */}
              <Card className="shadow-lg border-0 bg-gradient-to-br from-red-50 to-red-100">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingDown className="h-5 w-5 text-red-600" />
                    <h4 className="font-semibold text-red-800">
                      {isRTL ? 'إنقاص خفيف' : 'Mild Loss'}
                    </h4>
                  </div>
                  <p className="text-2xl font-bold text-red-600">{results.weightLoss.mild.toLocaleString()}</p>
                  <p className="text-xs text-red-700 mt-1">
                    {isRTL ? '0.25 كجم أسبوعياً' : '0.25kg per week'}
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 bg-gradient-to-br from-orange-50 to-orange-100">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingDown className="h-5 w-5 text-orange-600" />
                    <h4 className="font-semibold text-orange-800">
                      {isRTL ? 'إنقاص متوسط' : 'Moderate Loss'}
                    </h4>
                  </div>
                  <p className="text-2xl font-bold text-orange-600">{results.weightLoss.moderate.toLocaleString()}</p>
                  <p className="text-xs text-orange-700 mt-1">
                    {isRTL ? '0.5 كجم أسبوعياً' : '0.5kg per week'}
                  </p>
                </CardContent>
              </Card>

              {/* Maintenance */}
              <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-blue-100">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Minus className="h-5 w-5 text-blue-600" />
                    <h4 className="font-semibold text-blue-800">
                      {isRTL ? 'المحافظة' : 'Maintenance'}
                    </h4>
                  </div>
                  <p className="text-2xl font-bold text-blue-600">{results.tdee.toLocaleString()}</p>
                  <p className="text-xs text-blue-700 mt-1">
                    {isRTL ? 'الحفاظ على الوزن' : 'Maintain weight'}
                  </p>
                </CardContent>
              </Card>

              {/* Weight Gain */}
              <Card className="shadow-lg border-0 bg-gradient-to-br from-green-50 to-green-100">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    <h4 className="font-semibold text-green-800">
                      {isRTL ? 'زيادة خفيفة' : 'Mild Gain'}
                    </h4>
                  </div>
                  <p className="text-2xl font-bold text-green-600">{results.weightGain.mild.toLocaleString()}</p>
                  <p className="text-xs text-green-700 mt-1">
                    {isRTL ? '0.25 كجم أسبوعياً' : '0.25kg per week'}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Macronutrient Breakdown */}
          <div>
            <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">
              {isRTL ? 'توزيع المغذيات الكبرى' : 'Macronutrient Breakdown'}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="shadow-lg border-0 bg-gradient-to-br from-purple-50 to-purple-100">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full">
                      <Target className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <h4 className="font-semibold text-purple-800 mb-2">
                    {isRTL ? 'البروتين' : 'Protein'}
                  </h4>
                  <p className="text-xl font-bold text-purple-600">
                    {results.macros.protein.min}-{results.macros.protein.max}g
                  </p>
                  <p className="text-xs text-purple-700 mt-1">
                    {isRTL ? '15-25% من السعرات' : '15-25% of calories'}
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 bg-gradient-to-br from-yellow-50 to-yellow-100">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full">
                      <Zap className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <h4 className="font-semibold text-yellow-800 mb-2">
                    {isRTL ? 'الكربوهيدرات' : 'Carbohydrates'}
                  </h4>
                  <p className="text-xl font-bold text-yellow-600">
                    {results.macros.carbs.min}-{results.macros.carbs.max}g
                  </p>
                  <p className="text-xs text-yellow-700 mt-1">
                    {isRTL ? '45-65% من السعرات' : '45-65% of calories'}
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 bg-gradient-to-br from-indigo-50 to-indigo-100">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full">
                      <Activity className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <h4 className="font-semibold text-indigo-800 mb-2">
                    {isRTL ? 'الدهون' : 'Fats'}
                  </h4>
                  <p className="text-xl font-bold text-indigo-600">
                    {results.macros.fats.min}-{results.macros.fats.max}g
                  </p>
                  <p className="text-xs text-indigo-700 mt-1">
                    {isRTL ? '20-35% من السعرات' : '20-35% of calories'}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Tips and Recommendations */}
          <Card className="shadow-lg border-0 bg-gradient-to-r from-gray-50 to-gray-100">
            <CardContent className="p-6">
              <h4 className="text-lg font-semibold mb-4 text-gray-800">
                {isRTL ? 'نصائح مهمة' : 'Important Tips'}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                <div>
                  <h5 className="font-medium mb-2">
                    {isRTL ? 'لإنقاص الوزن:' : 'For Weight Loss:'}
                  </h5>
                  <ul className="space-y-1 text-xs">
                    <li>• {isRTL ? 'لا تنقص أكثر من 1000 سعرة يومياً' : 'Don\'t exceed 1000 calorie deficit daily'}</li>
                    <li>• {isRTL ? 'اشرب الكثير من الماء' : 'Drink plenty of water'}</li>
                    <li>• {isRTL ? 'احرص على البروتين الكافي' : 'Ensure adequate protein intake'}</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium mb-2">
                    {isRTL ? 'لزيادة الوزن:' : 'For Weight Gain:'}
                  </h5>
                  <ul className="space-y-1 text-xs">
                    <li>• {isRTL ? 'ركز على الأطعمة المغذية عالية السعرات' : 'Focus on nutrient-dense, high-calorie foods'}</li>
                    <li>• {isRTL ? 'تناول وجبات صغيرة متكررة' : 'Eat frequent, smaller meals'}</li>
                    <li>• {isRTL ? 'اضف تمارين القوة لبناء العضلات' : 'Include strength training for muscle building'}</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
        </TabsContent>

        {/* Saved Calculations Tab */}
        <TabsContent value="saved" className="space-y-6">
          <Card className="shadow-xl border-0 bg-white">
            <CardHeader className="gradient-secondary text-white rounded-t-lg">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-white/20 rounded-full">
                  <History className="h-8 w-8 text-white" />
                </div>
              </div>
              <CardTitle className="text-2xl text-center">
                {isRTL ? 'الحسابات المحفوظة' : 'Saved Calculations'}
              </CardTitle>
              <CardDescription className="text-center text-white/90 text-lg">
                {isRTL ? 'اعرض واستخدم حساباتك السابقة' : 'View and use your previous calculations'}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              {savedCalculations.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <History className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium">
                    {isRTL ? 'لا توجد حسابات محفوظة بعد' : 'No saved calculations yet'}
                  </p>
                  <p className="text-sm">
                    {isRTL ? 'احسب أولاً ثم احفظ النتائج' : 'Calculate first then save your results'}
                  </p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {savedCalculations.map((saved) => (
                    <Card key={saved.id} className="border border-gray-200 hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className="font-semibold text-lg text-gray-800">{saved.name}</h4>
                              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                {saved.date}
                              </span>
                            </div>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                              <div>
                                <span className="text-gray-600">
                                  {isRTL ? 'العمر:' : 'Age:'}
                                </span>
                                <span className="font-medium ml-1">{saved.formData.age}</span>
                              </div>
                              <div>
                                <span className="text-gray-600">
                                  {isRTL ? 'الوزن:' : 'Weight:'}
                                </span>
                                <span className="font-medium ml-1">{saved.formData.weight}kg</span>
                              </div>
                              <div>
                                <span className="text-blue-600 font-medium">
                                  BMR: {saved.results.bmr.toLocaleString()}
                                </span>
                              </div>
                              <div>
                                <span className="text-green-600 font-medium">
                                  TDEE: {saved.results.tdee.toLocaleString()}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2 ml-4">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => loadCalculation(saved)}
                              className="text-blue-600 hover:text-blue-700"
                            >
                              <Calculator className="h-4 w-4 mr-1" />
                              {isRTL ? 'تحميل' : 'Load'}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteCalculation(saved.id)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};