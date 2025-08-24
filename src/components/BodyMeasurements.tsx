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
  type: 'general' | 'bodybuilding';
  // General measurements
  neck?: number;
  shoulders?: number;
  chest?: number;
  rightArm?: number;
  leftArm?: number;
  abdomen?: number;
  waist?: number;
  rightThigh?: number;
  leftThigh?: number;
  rightLeg?: number;
  leftLeg?: number;
  // Bodybuilding specific measurements
  arms?: number;
  back?: number;
  calves?: number;
  thighs?: number;
}

const GENERAL_FIELDS = [
  'neck', 'shoulders', 'chest', 'rightArm', 'leftArm', 
  'abdomen', 'waist', 'rightThigh', 'leftThigh', 'rightLeg', 'leftLeg'
] as const;

const BODYBUILDING_FIELDS = [
  'chest', 'arms', 'shoulders', 'waist', 'thighs', 'calves', 'back'
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
      type: 'general',
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
    // Combine all unique fields
    const allFields = [...GENERAL_FIELDS, ...BODYBUILDING_FIELDS];
    return allFields.filter((field, index, arr) => arr.indexOf(field) === index);
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
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="text-lg font-semibold mb-4 text-center">
                  {t('bodyMeasurements')}
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {getAllFields().map((field) => (
                    <div key={field} className="space-y-2">
                      <Label htmlFor={field} className="text-sm font-medium">
                        {field === 'arms' ? t('arms') :
                         field === 'calves' ? t('calves') :
                         field === 'thighs' ? t('thighs') :
                         field === 'back' ? t('back') :
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
                        className="h-12 text-lg"
                        placeholder={`0.0 ${t('measurementPlaceholder')}`}
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
                          {[...GENERAL_FIELDS, ...BODYBUILDING_FIELDS].filter((field, index, arr) => arr.indexOf(field) === index).map((field) => (
                            <Badge
                              key={field}
                              variant={selectedField === field ? "default" : "secondary"}
                              className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-smooth"
                              onClick={() => setSelectedField(field)}
                            >
                              {field === 'arms' ? t('arms') :
                               field === 'calves' ? t('calves') :
                               field === 'thighs' ? t('thighs') :
                               field === 'back' ? t('back') :
                               t(field)}
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
                                      if (key === 'id' || key === 'date' || key === 'type') return false;
                                      const value = measurement[key as keyof BodyMeasurement];
                                      return typeof value === 'number' && value > 0;
                                     }).length} {t('measurementCount')}
                                  </Badge>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                                  {Object.keys(measurement).map((field) => {
                                    if (field === 'id' || field === 'date' || field === 'type') return null;
                                    const value = measurement[field as keyof BodyMeasurement];
                                    return (
                                      value && typeof value === 'number' && value > 0 && (
                                        <div key={field} className="flex justify-between">
                                          <span className="text-gray-600">
                                            {field === 'arms' ? t('arms') :
                                             field === 'calves' ? t('calves') :
                                             field === 'thighs' ? t('thighs') :
                                             field === 'back' ? t('back') :
                                             t(field)}:
                                          </span>
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