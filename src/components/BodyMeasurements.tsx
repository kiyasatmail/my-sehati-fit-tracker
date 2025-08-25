import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Ruler, Plus, TrendingUp, Calendar, User } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface BodyMeasurement {
  id: string;
  date: string;
  weight: number;
  height: number;
  neck?: number;
  shoulders?: number;
  chest?: number;
  arms?: number;
  abdomen?: number;
  waist?: number;
  thighs?: number;
  calves?: number;
  back?: number;
}

const MEASUREMENT_FIELDS = [
  'weight', 'height', 'neck', 'shoulders', 'chest', 'arms', 
  'abdomen', 'waist', 'thighs', 'calves', 'back'
] as const;

export const BodyMeasurements: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const { toast } = useToast();
  const [measurements, setMeasurements] = useState<BodyMeasurement[]>([]);
  const [currentMeasurement, setCurrentMeasurement] = useState<Partial<BodyMeasurement>>({});
  const [selectedField, setSelectedField] = useState<string>('waist');

  useEffect(() => {
    const savedMeasurements = localStorage.getItem('sehati-measurements');
    if (savedMeasurements) {
      setMeasurements(JSON.parse(savedMeasurements));
    }
  }, []);

  const saveMeasurements = (newMeasurements: BodyMeasurement[]) => {
    localStorage.setItem('sehati-measurements', JSON.stringify(newMeasurements));
    setMeasurements(newMeasurements);
  };

  const handleSaveMeasurement = () => {
    const newMeasurement: BodyMeasurement = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('en-CA'),
      weight: 0,
      height: 0,
      ...currentMeasurement,
    };

    const updatedMeasurements = [...measurements, newMeasurement];
    saveMeasurements(updatedMeasurements);
    setCurrentMeasurement({});
    
    toast({
      title: t('measurementSaved'),
      variant: 'default',
    });
  };

  const getChartData = (field: string) => {
    const data = measurements
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(-10);

    return {
      labels: data.map(m => new Date(m.date).toLocaleDateString()),
      datasets: [
        {
          label: t(field),
          data: data.map(m => m[field as keyof BodyMeasurement]),
          borderColor: 'rgb(59, 130, 246)',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          borderWidth: 3,
          pointBackgroundColor: 'rgb(59, 130, 246)',
          pointBorderColor: 'white',
          pointBorderWidth: 2,
          pointRadius: 6,
          tension: 0.4,
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          font: {
            family: isRTL ? 'Cairo' : 'Inter',
          },
        },
      },
      title: {
        display: true,
        text: `${t('progress')} - ${t(selectedField)}`,
        font: {
          family: isRTL ? 'Cairo' : 'Inter',
          size: 16,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: t('cm'),
          font: {
            family: isRTL ? 'Cairo' : 'Inter',
          },
        },
      },
      x: {
        title: {
          display: true,
          text: t('date'),
          font: {
            family: isRTL ? 'Cairo' : 'Inter',
          },
        },
      },
    },
  };

  const getAllFields = () => {
    return MEASUREMENT_FIELDS;
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">{t('trackBodyMeasurements')}</h1>
        <p className="text-gray-600 text-lg">{t('trackBodyMeasurementsDesc')}</p>
      </div>

      <Card className="shadow-xl border-0 bg-white max-w-6xl mx-auto">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-white/20 rounded-full">
              <Ruler className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center">{t('bodyMeasurements')}</CardTitle>
          <CardDescription className="text-center text-white/90 text-lg">
            {t('trackCalories')}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs defaultValue="add" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="add" className="gap-2">
                <Plus className="h-4 w-4" />
                {t('addMeasurement')}
              </TabsTrigger>
              <TabsTrigger value="history" className="gap-2">
                <TrendingUp className="h-4 w-4" />
                {t('viewProgress')}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="add">
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {t('addMeasurement')}
                  </h3>
                  <p className="text-gray-600">
                    {isRTL ? 'أدخل قياساتك الحالية' : 'Enter your current measurements'}
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {MEASUREMENT_FIELDS.map((field) => (
                      <div key={field} className="space-y-2">
                        <Label htmlFor={field} className="text-sm font-medium text-gray-700">
                          {field === 'weight' ? (isRTL ? 'الوزن (كغ)' : 'Weight (kg)') :
                           field === 'height' ? (isRTL ? 'الطول (سم)' : 'Height (cm)') :
                           field === 'arms' ? (isRTL ? 'الذراعين (سم)' : 'Arms (cm)') :
                           field === 'calves' ? (isRTL ? 'السمانة (سم)' : 'Calves (cm)') :
                           field === 'thighs' ? (isRTL ? 'الفخذين (سم)' : 'Thighs (cm)') :
                           field === 'back' ? (isRTL ? 'الظهر (سم)' : 'Back (cm)') :
                           field === 'abdomen' ? (isRTL ? 'البطن (سم)' : 'Abdomen (cm)') :
                           t(field)}
                        </Label>
                        <Input
                          id={field}
                          type="number"
                          step="0.1"
                          value={currentMeasurement[field] || ''}
                          onChange={(e) => 
                            setCurrentMeasurement({ 
                              ...currentMeasurement, 
                              [field]: parseFloat(e.target.value) || 0 
                            })
                          }
                          className="h-12 text-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                          placeholder={field === 'weight' ? '70.0' : field === 'height' ? '170.0' : '0.0'}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <Button 
                  onClick={handleSaveMeasurement} 
                  variant="default" 
                  size="lg" 
                  className="w-full bg-primary hover:bg-primary-light text-white font-semibold h-14 text-lg"
                >
                  <Plus className="h-6 w-6 mr-2" />
                  {t('saveMeasurement')}
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="history">
              <div className="space-y-6">
                {measurements.length === 0 ? (
                  <div className="bg-gray-50 p-12 rounded-lg text-center">
                    <Ruler className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2 text-gray-800">{t('noMeasurements')}</h3>
                    <p className="text-gray-600">{t('addMeasurement')}</p>
                  </div>
                ) : (
                  <>
                    {/* Progress Chart */}
                    <Card className="shadow-lg border-0 bg-white">
                      <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg">
                        <CardTitle className="flex items-center gap-2 text-white">
                          <TrendingUp className="h-5 w-5" />
                          {t('progress')}
                        </CardTitle>
                        <div className="flex flex-wrap gap-2 mt-4">
                          {MEASUREMENT_FIELDS.map((field) => (
                            <Badge
                              key={field}
                              variant={selectedField === field ? "secondary" : "outline"}
                              className={`cursor-pointer transition-all ${
                                selectedField === field 
                                  ? 'bg-white text-blue-600 hover:bg-gray-100' 
                                  : 'text-white border-white/50 hover:bg-white/20'
                              }`}
                              onClick={() => setSelectedField(field)}
                            >
                              {field === 'weight' ? (isRTL ? 'الوزن' : 'Weight') :
                               field === 'height' ? (isRTL ? 'الطول' : 'Height') :
                               field === 'arms' ? (isRTL ? 'الذراعين' : 'Arms') :
                               field === 'calves' ? (isRTL ? 'السمانة' : 'Calves') :
                               field === 'thighs' ? (isRTL ? 'الفخذين' : 'Thighs') :
                               field === 'back' ? (isRTL ? 'الظهر' : 'Back') :
                               field === 'abdomen' ? (isRTL ? 'البطن' : 'Abdomen') :
                               t(field)}
                            </Badge>
                          ))}
                        </div>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="h-[400px]">
                          <Line data={getChartData(selectedField)} options={chartOptions} />
                        </div>
                      </CardContent>
                    </Card>

                    {/* Measurement History */}
                    <Card className="shadow-lg border-0 bg-white">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Calendar className="h-5 w-5" />
                          {t('measurementHistory')}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {measurements
                            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                            .slice(0, 5)
                            .map((measurement) => (
                              <div 
                                key={measurement.id}
                                className="p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200 hover:shadow-md transition-shadow"
                              >
                                <div className="flex justify-between items-center mb-4">
                                  <span className="font-bold text-lg text-gray-800">
                                    {new Date(measurement.date).toLocaleDateString()}
                                  </span>
                                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                    {Object.keys(measurement).filter(key => {
                                      if (key === 'id' || key === 'date') return false;
                                      const value = measurement[key as keyof BodyMeasurement];
                                      return typeof value === 'number' && value > 0;
                                     }).length} {isRTL ? 'قياسات' : 'measurements'}
                                  </Badge>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-sm">
                                  {MEASUREMENT_FIELDS.map((field) => {
                                    const value = measurement[field as keyof BodyMeasurement];
                                    return (
                                      value && typeof value === 'number' && value > 0 && (
                                        <div key={field} className="bg-white p-3 rounded-lg shadow-sm">
                                          <div className="text-gray-600 text-xs mb-1">
                                            {field === 'weight' ? (isRTL ? 'الوزن' : 'Weight') :
                                             field === 'height' ? (isRTL ? 'الطول' : 'Height') :
                                             field === 'arms' ? (isRTL ? 'الذراعين' : 'Arms') :
                                             field === 'calves' ? (isRTL ? 'السمانة' : 'Calves') :
                                             field === 'thighs' ? (isRTL ? 'الفخذين' : 'Thighs') :
                                             field === 'back' ? (isRTL ? 'الظهر' : 'Back') :
                                             field === 'abdomen' ? (isRTL ? 'البطن' : 'Abdomen') :
                                             t(field)}
                                          </div>
                                          <div className="font-bold text-gray-800">
                                            {value} {field === 'weight' ? 'kg' : 'cm'}
                                          </div>
                                        </div>
                                      )
                                    );
                                  })}
                                </div>
                              </div>
                            ))}
                        </div>
                      </CardContent>
                    </Card>
                  </>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};