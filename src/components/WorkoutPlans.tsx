import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Dumbbell, Heart, Zap, Trophy, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface WorkoutPlansProps {
  onBack: () => void;
}

const WorkoutPlans = ({ onBack }: WorkoutPlansProps) => {
  const { t, isRTL } = useLanguage();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const workoutPlans = [
    {
      id: 'hypertrophy',
      title: 'بناء العضلات (Hypertrophy)',
      icon: <Dumbbell className="h-8 w-8" />,
      color: 'bg-blue-500',
      goal: 'زيادة حجم الكتلة العضلية مع تحفيز النمو',
      days: '4 – 5 أيام في الأسبوع',
      reps: '8 – 12 تكرار × 3–4 مجموعات',
      rest: '60–90 ثانية بين المجموعات',
      schedule: [
        'يوم 1: صدر + بايسبس',
        'يوم 2: ظهر + ترايسبس',
        'يوم 3: راحة',
        'يوم 4: أكتاف + رجلين',
        'يوم 5: Full Body أو تمارين مركبة (Squat, Deadlift, Bench Press)'
      ]
    },
    {
      id: 'cutting',
      title: 'التنشيف (Fat Loss / Cutting)',
      icon: <Zap className="h-8 w-8" />,
      color: 'bg-red-500',
      goal: 'خسارة الدهون مع الحفاظ على العضلات',
      days: '4 – 6 أيام',
      reps: '12 – 15 تكرار × 3–4 مجموعات',
      rest: '30–60 ثانية (حرق سعرات أكثر)',
      schedule: [
        '3–4 أيام تمارين مقاومة (وزن حر + أجهزة)',
        '2–3 أيام كارديو (HIIT أو جري سريع/مشاية)',
        'التركيز على التمارين المركبة (Squat, Push-ups, Pull-ups)'
      ]
    },
    {
      id: 'endurance',
      title: 'زيادة اللياقة (Endurance & Cardio)',
      icon: <Heart className="h-8 w-8" />,
      color: 'bg-green-500',
      goal: 'تحسين قوة التحمل والتنفس',
      days: '3 – 6 أيام',
      reps: '30 – 60 دقيقة',
      rest: 'حسب النشاط',
      schedule: [
        '2–3 أيام كارديو متوسط (جري، سباحة، دراجة)',
        '2 أيام HIIT (تمارين عالية الشدة متقطعة)',
        '1–2 يوم مقاومة كاملة للجسم (وزن الجسم: Plank, Push-ups, Squats)'
      ]
    },
    {
      id: 'strength',
      title: 'زيادة القوة (Strength Training)',
      icon: <Trophy className="h-8 w-8" />,
      color: 'bg-purple-500',
      goal: 'رفع أوزان ثقيلة وتطوير القوة العصبية العضلية',
      days: '3 – 4 أيام',
      reps: '3 – 6 تكرارات × 4–6 مجموعات',
      rest: '2 – 4 دقائق (للتعافي الكامل)',
      schedule: [
        'يوم 1: Bench Press + ملحقاته (Dips, Shoulder Press)',
        'يوم 2: Squat + Deadlift خفيف',
        'يوم 3: راحة',
        'يوم 4: Deadlift + ملحقاته (Rows, Pull-ups)',
        'يوم 5: Accessory Work (Core, Mobility)'
      ]
    }
  ];

  const importantNotes = [
    'كل خطة تحتاج تغذية مناسبة (سعرات + بروتين كافي)',
    'النوم 7–8 ساعات أساسي',
    'يفضل إضافة إطالات (Stretching) + إحماء (Warm-up) قبل أي تمرين',
    'المبتدئ يبدأ بأوزان خفيفة ويركز على الأسلوب الصحيح قبل زيادة الحمل'
  ];

  if (selectedPlan) {
    const plan = workoutPlans.find(p => p.id === selectedPlan);
    if (!plan) return null;

    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="ghost" 
            onClick={() => setSelectedPlan(null)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className={`h-4 w-4 ${isRTL ? 'rotate-180' : ''}`} />
            العودة للخطط
          </Button>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-full ${plan.color} text-white`}>
                {plan.icon}
              </div>
              <div>
                <CardTitle className="text-2xl">{plan.title}</CardTitle>
                <CardDescription className="text-lg mt-2">{plan.goal}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-secondary rounded-lg">
                <h4 className="font-semibold text-sm text-muted-foreground mb-1">عدد الأيام</h4>
                <p className="font-bold">{plan.days}</p>
              </div>
              <div className="text-center p-4 bg-secondary rounded-lg">
                <h4 className="font-semibold text-sm text-muted-foreground mb-1">التكرارات</h4>
                <p className="font-bold">{plan.reps}</p>
              </div>
              <div className="text-center p-4 bg-secondary rounded-lg">
                <h4 className="font-semibold text-sm text-muted-foreground mb-1">الراحة</h4>
                <p className="font-bold">{plan.rest}</p>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-xl font-bold mb-4">النظام المقترح:</h3>
              <div className="space-y-3">
                {plan.schedule.map((day, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-accent rounded-lg">
                    <Badge variant="outline" className="mt-0.5">{index + 1}</Badge>
                    <p className="flex-1">{day}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="flex items-center gap-4 mb-6">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="flex items-center gap-2"
        >
          <ArrowLeft className={`h-4 w-4 ${isRTL ? 'rotate-180' : ''}`} />
          العودة للرئيسية
        </Button>
      </div>

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">خطط التمرين الأساسية</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          خطط تمرين مبدئية حسب هدفك الشخصي. هذه الخطط مناسبة كنقطة انطلاق وليست بديلة عن المدرب المختص.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {workoutPlans.map((plan) => (
          <Card 
            key={plan.id} 
            className="cursor-pointer hover:shadow-lg transition-shadow duration-300"
            onClick={() => setSelectedPlan(plan.id)}
          >
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-full ${plan.color} text-white`}>
                  {plan.icon}
                </div>
                <div className="flex-1">
                  <CardTitle className="text-xl">{plan.title}</CardTitle>
                  <CardDescription className="mt-2">{plan.goal}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">عدد الأيام:</span>
                  <span className="font-medium">{plan.days}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">التكرارات:</span>
                  <span className="font-medium">{plan.reps}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">الراحة:</span>
                  <span className="font-medium">{plan.rest}</span>
                </div>
              </div>
              <Button 
                className="w-full mt-4" 
                variant="outline"
                onClick={() => setSelectedPlan(plan.id)}
              >
                عرض التفاصيل
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-accent/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            ملاحظات مهمة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {importantNotes.map((note, index) => (
              <div key={index} className="flex items-start gap-3">
                <Badge variant="secondary" className="mt-1 text-xs">{index + 1}</Badge>
                <p className="flex-1">{note}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkoutPlans;