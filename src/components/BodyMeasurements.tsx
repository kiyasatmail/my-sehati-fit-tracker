import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Ruler, Plus, TrendingUp, Calendar } from 'lucide-react';
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
  neck: number;
  shoulders: number;
  chest: number;
  rightArm: number;
  leftArm: number;
  abdomen: number;
  waist: number;
  rightThigh: number;
  leftThigh: number;
  rightLeg: number;
  leftLeg: number;
}

const MEASUREMENT_FIELDS = [
  'neck', 'shoulders', 'chest', 'rightArm', 'leftArm', 
  'abdomen', 'waist', 'rightThigh', 'leftThigh', 'rightLeg', 'leftLeg'
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
      neck: currentMeasurement.neck || 0,
      shoulders: currentMeasurement.shoulders || 0,
      chest: currentMeasurement.chest || 0,
      rightArm: currentMeasurement.rightArm || 0,
      leftArm: currentMeasurement.leftArm || 0,
      abdomen: currentMeasurement.abdomen || 0,
      waist: currentMeasurement.waist || 0,
      rightThigh: currentMeasurement.rightThigh || 0,
      leftThigh: currentMeasurement.leftThigh || 0,
      rightLeg: currentMeasurement.rightLeg || 0,
      leftLeg: currentMeasurement.leftLeg || 0,
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

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">تتبع قياسات الجسم</h1>
        <p className="text-gray-600 text-lg">سجل وتتبع قياساتك في جميع المناطق الرئيسية</p>
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
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {MEASUREMENT_FIELDS.map((field) => (
                    <div key={field} className="space-y-2">
                      <Label htmlFor={field}>{t(field)}</Label>
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
                        className="h-12 text-lg"
                        placeholder="0.0"
                      />
                    </div>
                  ))}
                </div>

                <Button 
                  onClick={handleSaveMeasurement} 
                  variant="default" 
                  size="lg" 
                  className="w-full mt-8 bg-primary hover:bg-primary-light text-white font-semibold"
                >
                  <Plus className="h-5 w-5" />
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
                    <Card className="shadow-lg border-0 bg-white">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <TrendingUp className="h-5 w-5" />
                          {t('progress')}
                        </CardTitle>
                        <div className="flex flex-wrap gap-2 mt-4">
                          {MEASUREMENT_FIELDS.map((field) => (
                            <Badge
                              key={field}
                              variant={selectedField === field ? "default" : "secondary"}
                              className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-smooth"
                              onClick={() => setSelectedField(field)}
                            >
                              {t(field)}
                            </Badge>
                          ))}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[400px]">
                          <Line data={getChartData(selectedField)} options={chartOptions} />
                        </div>
                      </CardContent>
                    </Card>

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
                                className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                              >
                                <div className="flex justify-between items-center mb-2">
                                  <span className="font-semibold text-gray-800">
                                    {new Date(measurement.date).toLocaleDateString()}
                                  </span>
                                  <Badge variant="outline">
                                    {Object.keys(measurement).filter(key => {
                                      if (key === 'id' || key === 'date') return false;
                                      const value = measurement[key as keyof BodyMeasurement];
                                      return typeof value === 'number' && value > 0;
                                    }).length} قياسات
                                  </Badge>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                                  {MEASUREMENT_FIELDS.map((field) => {
                                    const value = measurement[field];
                                    return (
                                      value && typeof value === 'number' && value > 0 && (
                                        <div key={field} className="flex justify-between">
                                          <span className="text-gray-600">{t(field)}:</span>
                                          <span className="font-medium text-gray-800">{value} {t('cm')}</span>
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