import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calendar, Save, TrendingUp, User } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Measurement {
  id: string;
  date: string;
  weight: number;
  height: number;
  neck: number;
  shoulders: number;
  chest: number;
  arms: number;
  abdomen: number;
  waist: number;
  thighs: number;
  calves: number;
  back: number;
}

const measurementFields = [
  { key: 'weight', labelAr: 'الوزن (كغ)', labelEn: 'Weight (kg)' },
  { key: 'height', labelAr: 'الطول (سم)', labelEn: 'Height (cm)' },
  { key: 'neck', labelAr: 'الرقبة (سم)', labelEn: 'Neck (cm)' },
  { key: 'shoulders', labelAr: 'الأكتاف (سم)', labelEn: 'Shoulders (cm)' },
  { key: 'chest', labelAr: 'الصدر (سم)', labelEn: 'Chest (cm)' },
  { key: 'arms', labelAr: 'الذراعين (سم)', labelEn: 'Arms (cm)' },
  { key: 'abdomen', labelAr: 'البطن (سم)', labelEn: 'Abdomen (cm)' },
  { key: 'waist', labelAr: 'الخصر (سم)', labelEn: 'Waist (cm)' },
  { key: 'thighs', labelAr: 'الفخذين (سم)', labelEn: 'Thighs (cm)' },
  { key: 'calves', labelAr: 'السمانة (سم)', labelEn: 'Calves (cm)' },
  { key: 'back', labelAr: 'الظهر (سم)', labelEn: 'Back (cm)' }
];

export function BodyMeasurements() {
  const { language } = useLanguage();
  const [measurements, setMeasurements] = useState<Measurement[]>([]);
  const [currentMeasurement, setCurrentMeasurement] = useState<Partial<Measurement>>({});
  const [selectedMetric, setSelectedMetric] = useState('weight');

  useEffect(() => {
    const saved = localStorage.getItem('bodyMeasurements');
    if (saved) {
      setMeasurements(JSON.parse(saved));
    }
  }, []);

  const saveMeasurement = () => {
    if (Object.keys(currentMeasurement).length === 0) return;

    const newMeasurement: Measurement = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      weight: Number(currentMeasurement.weight) || 0,
      height: Number(currentMeasurement.height) || 0,
      neck: Number(currentMeasurement.neck) || 0,
      shoulders: Number(currentMeasurement.shoulders) || 0,
      chest: Number(currentMeasurement.chest) || 0,
      arms: Number(currentMeasurement.arms) || 0,
      abdomen: Number(currentMeasurement.abdomen) || 0,
      waist: Number(currentMeasurement.waist) || 0,
      thighs: Number(currentMeasurement.thighs) || 0,
      calves: Number(currentMeasurement.calves) || 0,
      back: Number(currentMeasurement.back) || 0,
    };

    const updated = [...measurements, newMeasurement];
    setMeasurements(updated);
    localStorage.setItem('bodyMeasurements', JSON.stringify(updated));
    setCurrentMeasurement({});
  };

  const getChartData = () => {
    return measurements.map(m => ({
      date: m.date,
      value: m[selectedMetric as keyof Measurement] as number
    })).slice(-10);
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {language === 'ar' ? 'قياسات الجسم' : 'Body Measurements'}
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          {language === 'ar' ? 'تتبع تقدمك وقياساتك الجسدية' : 'Track your progress and body measurements'}
        </p>
      </div>

      <Tabs defaultValue="input" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="input" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            {language === 'ar' ? 'إدخال القياسات' : 'Input Measurements'}
          </TabsTrigger>
          <TabsTrigger value="progress" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            {language === 'ar' ? 'التقدم' : 'Progress'}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="input">
          <Card className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-green-200 dark:border-green-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-800 dark:text-green-300">
                <User className="w-5 h-5" />
                {language === 'ar' ? 'القياسات الحالية' : 'Current Measurements'}
              </CardTitle>
              <CardDescription>
                {language === 'ar' ? 'أدخل قياساتك الحالية' : 'Enter your current measurements'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {measurementFields.map((field) => (
                  <div key={field.key} className="space-y-2">
                    <Label htmlFor={field.key} className="text-sm font-medium">
                      {language === 'ar' ? field.labelAr : field.labelEn}
                    </Label>
                    <Input
                      id={field.key}
                      type="number"
                      placeholder="0"
                      value={currentMeasurement[field.key as keyof Measurement] || ''}
                      onChange={(e) => setCurrentMeasurement(prev => ({
                        ...prev,
                        [field.key]: e.target.value
                      }))}
                      className="bg-white dark:bg-gray-800"
                    />
                  </div>
                ))}
              </div>
              <Button 
                onClick={saveMeasurement}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                <Save className="w-4 h-4 mr-2" />
                {language === 'ar' ? 'حفظ القياسات' : 'Save Measurements'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="progress">
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-800 dark:text-blue-300">
                  <TrendingUp className="w-5 h-5" />
                  {language === 'ar' ? 'الرسم البياني للتقدم' : 'Progress Chart'}
                </CardTitle>
                <div className="flex flex-wrap gap-2 mt-4">
                  {measurementFields.map((field) => (
                    <Button
                      key={field.key}
                      variant={selectedMetric === field.key ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedMetric(field.key)}
                      className={selectedMetric === field.key ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50"}
                    >
                      {language === 'ar' ? field.labelAr : field.labelEn}
                    </Button>
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                {measurements.length > 0 ? (
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={getChartData()}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line 
                          type="monotone" 
                          dataKey="value" 
                          stroke="#2563eb" 
                          strokeWidth={2}
                          dot={{ fill: '#2563eb' }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    {language === 'ar' ? 'لا توجد بيانات للعرض' : 'No data to display'}
                  </div>
                )}
              </CardContent>
            </Card>

            {measurements.length > 0 && (
              <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-purple-800 dark:text-purple-300">
                    <Calendar className="w-5 h-5" />
                    {language === 'ar' ? 'تاريخ القياسات' : 'Measurement History'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {measurements.slice(-5).reverse().map((measurement) => (
                      <div key={measurement.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-gray-900 dark:text-white">
                            {new Date(measurement.date).toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US')}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 text-sm">
                          {measurementFields.map((field) => (
                            <div key={field.key} className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">
                                {language === 'ar' ? field.labelAr : field.labelEn}:
                              </span>
                              <span className="font-medium">
                                {measurement[field.key as keyof Measurement]}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}