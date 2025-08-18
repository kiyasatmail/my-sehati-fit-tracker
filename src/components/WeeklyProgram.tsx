import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Trash2, Edit2, Calendar } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from '@/hooks/use-toast';

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight: number;
  notes: string;
}

interface DayProgram {
  day: string;
  exercises: Exercise[];
  isRestDay: boolean;
}

interface WeeklyProgramData {
  id: string;
  name: string;
  days: DayProgram[];
  createdAt: string;
}

export const WeeklyProgram: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const [programs, setPrograms] = useState<WeeklyProgramData[]>([]);
  const [currentProgram, setCurrentProgram] = useState<WeeklyProgramData | null>(null);
  const [programName, setProgramName] = useState('');
  const [selectedDay, setSelectedDay] = useState('sunday');
  const [isCreating, setIsCreating] = useState(false);

  const daysOfWeek = [
    { key: 'sunday', label: t('sunday') },
    { key: 'monday', label: t('monday') },
    { key: 'tuesday', label: t('tuesday') },
    { key: 'wednesday', label: t('wednesday') },
    { key: 'thursday', label: t('thursday') },
    { key: 'friday', label: t('friday') },
    { key: 'saturday', label: t('saturday') },
  ];

  // Load programs from localStorage
  useEffect(() => {
    const savedPrograms = localStorage.getItem('weeklyPrograms');
    if (savedPrograms) {
      setPrograms(JSON.parse(savedPrograms));
    }
  }, []);

  // Save programs to localStorage
  const saveToStorage = (newPrograms: WeeklyProgramData[]) => {
    localStorage.setItem('weeklyPrograms', JSON.stringify(newPrograms));
    setPrograms(newPrograms);
  };

  const createNewProgram = () => {
    if (!programName.trim()) {
      toast({
        title: t('error'),
        description: t('programName') + ' ' + t('required'),
        variant: 'destructive',
      });
      return;
    }

    const newProgram: WeeklyProgramData = {
      id: Date.now().toString(),
      name: programName,
      days: daysOfWeek.map(day => ({
        day: day.key,
        exercises: [],
        isRestDay: false,
      })),
      createdAt: new Date().toISOString(),
    };

    setCurrentProgram(newProgram);
    setIsCreating(true);
    setProgramName('');
  };

  const addExercise = (dayKey: string) => {
    if (!currentProgram) return;

    const newExercise: Exercise = {
      id: Date.now().toString(),
      name: '',
      sets: 3,
      reps: 10,
      weight: 0,
      notes: '',
    };

    const updatedProgram = {
      ...currentProgram,
      days: currentProgram.days.map(day =>
        day.day === dayKey
          ? { ...day, exercises: [...day.exercises, newExercise] }
          : day
      ),
    };

    setCurrentProgram(updatedProgram);
  };

  const updateExercise = (dayKey: string, exerciseId: string, field: keyof Exercise, value: any) => {
    if (!currentProgram) return;

    const updatedProgram = {
      ...currentProgram,
      days: currentProgram.days.map(day =>
        day.day === dayKey
          ? {
              ...day,
              exercises: day.exercises.map(exercise =>
                exercise.id === exerciseId
                  ? { ...exercise, [field]: value }
                  : exercise
              ),
            }
          : day
      ),
    };

    setCurrentProgram(updatedProgram);
  };

  const removeExercise = (dayKey: string, exerciseId: string) => {
    if (!currentProgram) return;

    const updatedProgram = {
      ...currentProgram,
      days: currentProgram.days.map(day =>
        day.day === dayKey
          ? {
              ...day,
              exercises: day.exercises.filter(exercise => exercise.id !== exerciseId),
            }
          : day
      ),
    };

    setCurrentProgram(updatedProgram);
  };

  const toggleRestDay = (dayKey: string) => {
    if (!currentProgram) return;

    const updatedProgram = {
      ...currentProgram,
      days: currentProgram.days.map(day =>
        day.day === dayKey
          ? { ...day, isRestDay: !day.isRestDay, exercises: day.isRestDay ? day.exercises : [] }
          : day
      ),
    };

    setCurrentProgram(updatedProgram);
  };

  const saveProgram = () => {
    if (!currentProgram) return;

    // Check if editing existing program or creating new one
    const existingIndex = programs.findIndex(p => p.id === currentProgram.id);
    let newPrograms;
    
    if (existingIndex >= 0) {
      // Update existing program
      newPrograms = [...programs];
      newPrograms[existingIndex] = currentProgram;
    } else {
      // Add new program
      newPrograms = [...programs, currentProgram];
    }
    
    saveToStorage(newPrograms);
    setCurrentProgram(null);
    setIsCreating(false);
    
    toast({
      title: t('programSaved'),
      description: currentProgram.name,
    });
  };

  const deleteProgram = (programId: string) => {
    const newPrograms = programs.filter(p => p.id !== programId);
    saveToStorage(newPrograms);
    
    toast({
      title: t('deleteProgram'),
      description: t('programSaved'),
    });
  };

  if (isCreating && currentProgram) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">{t('createProgram')}: {currentProgram.name}</h2>
          <div className="flex gap-2">
            <Button onClick={saveProgram} className="bg-green-600 hover:bg-green-700">
              {t('saveProgram')}
            </Button>
            <Button variant="outline" onClick={() => setIsCreating(false)}>
              {t('cancel') || 'إلغاء'}
            </Button>
          </div>
        </div>

        <Tabs value={selectedDay} onValueChange={setSelectedDay} className="w-full">
          <TabsList className="grid w-full grid-cols-7 mb-6">
            {daysOfWeek.map(day => (
              <TabsTrigger
                key={day.key}
                value={day.key}
                className="text-xs md:text-sm"
              >
                {day.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {daysOfWeek.map(day => {
            const dayProgram = currentProgram.days.find(d => d.day === day.key);
            if (!dayProgram) return null;

            return (
              <TabsContent key={day.key} value={day.key} className="space-y-4">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>{day.label}</CardTitle>
                      <Button
                        variant={dayProgram.isRestDay ? "default" : "outline"}
                        onClick={() => toggleRestDay(day.key)}
                        size="sm"
                      >
                        {dayProgram.isRestDay ? t('rest') : t('rest')}
                      </Button>
                    </div>
                  </CardHeader>
                  
                  {!dayProgram.isRestDay && (
                    <CardContent className="space-y-4">
                      {dayProgram.exercises.map(exercise => (
                        <div key={exercise.id} className="p-4 border rounded-lg space-y-3">
                          <div className="flex justify-between items-center">
                            <Label className="font-semibold">{t('exerciseName')}</Label>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeExercise(day.key, exercise.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <Input
                            placeholder={t('exerciseName')}
                            value={exercise.name}
                            onChange={(e) => updateExercise(day.key, exercise.id, 'name', e.target.value)}
                          />
                          
                          <div className="grid grid-cols-3 gap-2">
                            <div>
                              <Label className="text-sm">{t('sets')}</Label>
                              <Input
                                type="number"
                                value={exercise.sets}
                                onChange={(e) => updateExercise(day.key, exercise.id, 'sets', parseInt(e.target.value) || 0)}
                                min="1"
                              />
                            </div>
                            <div>
                              <Label className="text-sm">{t('reps')}</Label>
                              <Input
                                type="number"
                                value={exercise.reps}
                                onChange={(e) => updateExercise(day.key, exercise.id, 'reps', parseInt(e.target.value) || 0)}
                                min="1"
                              />
                            </div>
                            <div>
                              <Label className="text-sm">{t('exerciseWeight')} (kg)</Label>
                              <Input
                                type="number"
                                value={exercise.weight}
                                onChange={(e) => updateExercise(day.key, exercise.id, 'weight', parseFloat(e.target.value) || 0)}
                                min="0"
                                step="0.5"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <Label className="text-sm">{t('notes')}</Label>
                            <Textarea
                              placeholder={t('notes')}
                              value={exercise.notes}
                              onChange={(e) => updateExercise(day.key, exercise.id, 'notes', e.target.value)}
                              rows={2}
                            />
                          </div>
                        </div>
                      ))}
                      
                      <Button
                        onClick={() => addExercise(day.key)}
                        variant="outline"
                        className="w-full"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        {t('addExercise')}
                      </Button>
                    </CardContent>
                  )}
                </Card>
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">{t('weeklyProgram')}</h1>
        <p className="text-muted-foreground mb-8">
          {isRTL 
            ? 'أنشئ برنامجك التدريبي الأسبوعي المخصص وابدأ رحلة اللياقة'
            : 'Create your custom weekly workout program and start your fitness journey'
          }
        </p>
      </div>

      {/* Create New Program */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            {t('createProgram')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="programName">{t('programName')}</Label>
            <Input
              id="programName"
              placeholder={t('programName')}
              value={programName}
              onChange={(e) => setProgramName(e.target.value)}
            />
          </div>
          <Button onClick={createNewProgram} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            {t('createProgram')}
          </Button>
        </CardContent>
      </Card>

      {/* My Programs */}
      <div>
        <h2 className="text-2xl font-bold mb-4">{t('myPrograms')}</h2>
        
        {programs.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">{t('noPrograms')}</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {programs.map(program => (
              <Card key={program.id}>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>{program.name}</CardTitle>
                      <CardDescription>
                        {isRTL ? 'تم الإنشاء في' : 'Created on'} {new Date(program.createdAt).toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setCurrentProgram(program);
                          setIsCreating(true);
                        }}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteProgram(program.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="grid grid-cols-7 gap-2 text-center">
                      {program.days.map((day) => {
                        const dayName = daysOfWeek.find(d => d.key === day.day)?.label || day.day;
                        return (
                          <div key={`${program.id}-${day.day}`} className="text-xs">
                            <div className="font-semibold">{dayName}</div>
                            <div className="text-muted-foreground">
                              {day.isRestDay ? t('rest') : `${day.exercises.length} ${isRTL ? 'تمارين' : 'exercises'}`}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    
                    {/* Program Summary */}
                    <div className="pt-3 border-t">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          {isRTL ? 'مجموع التمارين:' : 'Total exercises:'}
                        </span>
                        <span className="font-medium">
                          {program.days.reduce((total, day) => total + day.exercises.length, 0)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          {isRTL ? 'أيام التدريب:' : 'Training days:'}
                        </span>
                        <span className="font-medium">
                          {program.days.filter(day => !day.isRestDay).length}/7
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          {isRTL ? 'أيام الراحة:' : 'Rest days:'}
                        </span>
                        <span className="font-medium">
                          {program.days.filter(day => day.isRestDay).length}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};