import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { Clock, Calendar, CheckCircle, TrendingUp, Award, Target } from 'lucide-react';

interface WakeUpRecord {
  date: string;
  targetTime: string;
  actualTime: string | null;
  success: boolean;
}

interface Challenge {
  id: string;
  wakeUpTime: string;
  duration: number; // days
  startDate: string;
  isActive: boolean;
  records: WakeUpRecord[];
}

export const WakeUpChallenge: React.FC = () => {
  const { toast } = useToast();
  const { t, isRTL } = useLanguage();
  
  const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(null);
  const [wakeUpTime, setWakeUpTime] = useState('06:00');
  const [duration, setDuration] = useState(7);
  const [activeTab, setActiveTab] = useState('setup');

  useEffect(() => {
    loadChallenge();
  }, []);

  const loadChallenge = () => {
    const saved = localStorage.getItem('wakeup-challenge');
    if (saved) {
      const challenge = JSON.parse(saved);
      setCurrentChallenge(challenge);
      if (challenge.isActive) {
        setActiveTab('tracking');
      }
    }
  };

  const saveChallenge = (challenge: Challenge) => {
    localStorage.setItem('wakeup-challenge', JSON.stringify(challenge));
    setCurrentChallenge(challenge);
  };

  const startChallenge = () => {
    const startDate = new Date().toISOString().split('T')[0];
    const records: WakeUpRecord[] = [];
    
    // Generate records for all days
    for (let i = 0; i < duration; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      records.push({
        date: date.toISOString().split('T')[0],
        targetTime: wakeUpTime,
        actualTime: null,
        success: false
      });
    }

    const newChallenge: Challenge = {
      id: Date.now().toString(),
      wakeUpTime,
      duration,
      startDate,
      isActive: true,
      records
    };

    saveChallenge(newChallenge);
    setActiveTab('tracking');
    toast({
      title: isRTL ? 'بدأ التحدي!' : 'Challenge Started!',
      description: isRTL ? 'تم بدء تحدي الاستيقاظ بنجاح' : 'Wake-up challenge started successfully',
    });
  };

  const markAsAwake = () => {
    if (!currentChallenge) return;

    const today = new Date().toISOString().split('T')[0];
    const now = new Date();
    const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    const updatedRecords = currentChallenge.records.map(record => {
      if (record.date === today && !record.actualTime) {
        return {
          ...record,
          actualTime: currentTime,
          success: true
        };
      }
      return record;
    });

    const updatedChallenge = {
      ...currentChallenge,
      records: updatedRecords
    };

    saveChallenge(updatedChallenge);
    toast({
      title: isRTL ? 'تم التسجيل!' : 'Recorded!',
      description: isRTL ? 'تم تسجيل استيقاظك بنجاح' : 'Your wake-up time has been recorded successfully',
    });
  };

  const endChallenge = () => {
    if (!currentChallenge) return;

    const updatedChallenge = {
      ...currentChallenge,
      isActive: false
    };

    saveChallenge(updatedChallenge);
    setActiveTab('statistics');
    toast({
      title: isRTL ? 'انتهى التحدي!' : 'Challenge Ended!',
      description: isRTL ? 'تم إنهاء التحدي، تحقق من إحصائياتك' : 'Challenge ended, check your statistics',
    });
  };

  const getStatistics = () => {
    if (!currentChallenge) return null;

    const totalDays = currentChallenge.records.length;
    const completedDays = currentChallenge.records.filter(r => r.actualTime).length;
    const successfulDays = currentChallenge.records.filter(r => r.success).length;
    const completionRate = totalDays > 0 ? Math.round((successfulDays / totalDays) * 100) : 0;

    return {
      totalDays,
      completedDays,
      successfulDays,
      completionRate
    };
  };

  const getTodayRecord = () => {
    if (!currentChallenge) return null;
    const today = new Date().toISOString().split('T')[0];
    return currentChallenge.records.find(r => r.date === today);
  };

  const canMarkToday = () => {
    const todayRecord = getTodayRecord();
    return todayRecord && !todayRecord.actualTime && currentChallenge?.isActive;
  };

  const statistics = getStatistics();
  const todayRecord = getTodayRecord();

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">
          {isRTL ? 'تحدي الاستيقاظ' : 'Wake-up Challenge'}
        </h1>
        <p className="text-muted-foreground">
          {isRTL ? 'حدد هدفك والتزم بوقت استيقاظك' : 'Set your goal and stick to your wake-up time'}
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="setup" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            {isRTL ? 'إعداد التحدي' : 'Setup'}
          </TabsTrigger>
          <TabsTrigger value="tracking" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            {isRTL ? 'التتبع' : 'Tracking'}
          </TabsTrigger>
          <TabsTrigger value="statistics" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            {isRTL ? 'الإحصائيات' : 'Statistics'}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="setup" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                {isRTL ? 'إعداد تحدي جديد' : 'Setup New Challenge'}
              </CardTitle>
              <CardDescription>
                {isRTL ? 'حدد وقت الاستيقاظ ومدة التحدي' : 'Set your wake-up time and challenge duration'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="wake-time">
                    {isRTL ? 'وقت الاستيقاظ' : 'Wake-up Time'}
                  </Label>
                  <Input
                    id="wake-time"
                    type="time"
                    value={wakeUpTime}
                    onChange={(e) => setWakeUpTime(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">
                    {isRTL ? 'مدة التحدي (أيام)' : 'Challenge Duration (days)'}
                  </Label>
                  <Input
                    id="duration"
                    type="number"
                    min="1"
                    max="365"
                    value={duration}
                    onChange={(e) => setDuration(parseInt(e.target.value))}
                  />
                </div>
              </div>
              <Button 
                onClick={startChallenge} 
                className="w-full"
                disabled={currentChallenge?.isActive}
              >
                <Calendar className="h-4 w-4 mr-2" />
                {isRTL ? 'ابدأ التحدي' : 'Start Challenge'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tracking" className="space-y-6">
          {currentChallenge?.isActive && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    {isRTL ? 'التحدي النشط' : 'Active Challenge'}
                  </CardTitle>
                  <CardDescription>
                    {isRTL ? `وقت الاستيقاظ المحدد: ${currentChallenge.wakeUpTime}` : `Target wake-up time: ${currentChallenge.wakeUpTime}`}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {statistics && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{isRTL ? 'التقدم' : 'Progress'}</span>
                        <span>{statistics.completedDays}/{statistics.totalDays}</span>
                      </div>
                      <Progress value={(statistics.completedDays / statistics.totalDays) * 100} />
                    </div>
                  )}
                  
                  {todayRecord && (
                    <Card className="bg-muted/50">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold">
                              {isRTL ? 'اليوم' : 'Today'}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {isRTL ? `الهدف: ${todayRecord.targetTime}` : `Target: ${todayRecord.targetTime}`}
                            </p>
                            {todayRecord.actualTime && (
                              <p className="text-sm text-success">
                                {isRTL ? `الاستيقاظ: ${todayRecord.actualTime}` : `Woke up: ${todayRecord.actualTime}`}
                              </p>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            {todayRecord.success ? (
                              <Badge variant="default" className="bg-success">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                {isRTL ? 'تم' : 'Done'}
                              </Badge>
                            ) : canMarkToday() ? (
                              <Button onClick={markAsAwake} size="sm">
                                {isRTL ? 'أنا استيقظت' : 'I\'m Awake'}
                              </Button>
                            ) : (
                              <Badge variant="secondary">
                                {isRTL ? 'في الانتظار' : 'Pending'}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  <div className="flex gap-2">
                    <Button onClick={endChallenge} variant="destructive" size="sm">
                      {isRTL ? 'إنهاء التحدي' : 'End Challenge'}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{isRTL ? 'سجل الأيام' : 'Daily Records'}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {currentChallenge.records.map((record, index) => (
                      <div key={index} className="flex items-center justify-between p-2 rounded border">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span className="text-sm">{record.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">
                            {record.targetTime}
                          </span>
                          {record.actualTime ? (
                            <Badge variant="default" className="bg-success">
                              {record.actualTime}
                            </Badge>
                          ) : (
                            <Badge variant="secondary">
                              {isRTL ? 'لم يتم' : 'Pending'}
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {!currentChallenge?.isActive && (
            <Card>
              <CardContent className="text-center py-12">
                <Clock className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">
                  {isRTL ? 'لا يوجد تحدي نشط' : 'No Active Challenge'}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {isRTL ? 'ابدأ تحدي جديد لتتبع استيقاظك' : 'Start a new challenge to track your wake-up times'}
                </p>
                <Button onClick={() => setActiveTab('setup')}>
                  {isRTL ? 'إعداد تحدي جديد' : 'Setup New Challenge'}
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="statistics" className="space-y-6">
          {statistics && currentChallenge ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {isRTL ? 'إجمالي الأيام' : 'Total Days'}
                        </p>
                        <p className="text-2xl font-bold">{statistics.totalDays}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-success" />
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {isRTL ? 'أيام ناجحة' : 'Successful Days'}
                        </p>
                        <p className="text-2xl font-bold text-success">{statistics.successfulDays}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {isRTL ? 'معدل النجاح' : 'Success Rate'}
                        </p>
                        <p className="text-2xl font-bold">{statistics.completionRate}%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-warning" />
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {isRTL ? 'مستوى الإنجاز' : 'Achievement Level'}
                        </p>
                        <p className="text-lg font-bold">
                          {statistics.completionRate >= 90 ? (isRTL ? 'ممتاز' : 'Excellent') :
                           statistics.completionRate >= 70 ? (isRTL ? 'جيد' : 'Good') :
                           statistics.completionRate >= 50 ? (isRTL ? 'متوسط' : 'Average') :
                           (isRTL ? 'يحتاج تحسين' : 'Needs Improvement')}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>{isRTL ? 'ملخص التحدي' : 'Challenge Summary'}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>{isRTL ? 'فترة التحدي:' : 'Challenge Period:'}</span>
                      <span>{currentChallenge.startDate} - {currentChallenge.duration} {isRTL ? 'أيام' : 'days'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{isRTL ? 'وقت الاستيقاظ المحدد:' : 'Target Wake-up Time:'}</span>
                      <span>{currentChallenge.wakeUpTime}</span>
                    </div>
                    <div className="space-y-2">
                      <span>{isRTL ? 'التقدم الإجمالي:' : 'Overall Progress:'}</span>
                      <Progress value={statistics.completionRate} className="h-3" />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>{statistics.successfulDays} {isRTL ? 'من' : 'of'} {statistics.totalDays}</span>
                        <span>{statistics.completionRate}%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <TrendingUp className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">
                  {isRTL ? 'لا توجد إحصائيات' : 'No Statistics Available'}
                </h3>
                <p className="text-muted-foreground">
                  {isRTL ? 'أكمل تحدي للحصول على الإحصائيات' : 'Complete a challenge to see statistics'}
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};