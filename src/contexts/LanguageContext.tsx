import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'ar' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  isRTL: boolean;
  t: (key: string) => string;
}

const translations = {
  ar: {
    appName: 'صحتي',
    calorieCalculator: 'حاسبة السعرات الحرارية',
    bodyMeasurements: 'قياسات الجسم',
    cardioConverter: 'محول الكارديو',
    age: 'العمر',
    gender: 'الجنس',
    male: 'ذكر',
    female: 'أنثى',
    weight: 'الوزن (كيلو)',
    height: 'الطول (سم)',
    activityLevel: 'مستوى النشاط',
    sedentary: 'قليل الحركة',
    lightlyActive: 'نشاط خفيف',
    moderatelyActive: 'نشاط متوسط',
    veryActive: 'نشاط عالي',
    extraActive: 'نشاط عالي جداً',
    calculate: 'احسب',
    bmr: 'معدل الأيض الأساسي',
    tdee: 'إجمالي استهلاك الطاقة اليومي',
    calories: 'سعرة حرارية',
    startTracking: 'ابدأ التتبع',
    yourHealthGuide: 'دليلك الصحي الشامل',
    trackCalories: 'لحساب السعرات الحرارية وتتبع قياسات الجسم وتحويل السعرات لدقائق التمارين',
    
    // My Items
    myItems: 'أغراضي',
    myItemsDesc: 'تحقق من أغراض التمرين قبل الذهاب وبعد العودة',
    exploreItems: 'استكشف أغراضي',
    beforeWorkout: 'قبل التمرين',
    afterWorkout: 'بعد التمرين',
    addNewItem: 'إضافة غرض جديد',
    itemName: 'اسم الغرض',
    selectIcon: 'اختر أيقونة',
    add: 'إضافة',
    cancel: 'إلغاء',
    delete: 'حذف',
    checkAll: 'تحقق من الكل',
    uncheckAll: 'إلغاء تحديد الكل',
    noItemsYet: 'لا توجد أغراض بعد',
    addFirstItem: 'أضف أول غرض لك',
    workoutReminder: 'تذكير التمرين',
    enableNotifications: 'تفعيل الإشعارات',
    setWorkoutTime: 'حدد وقت التمرين',
    reminderBefore: 'تذكير قبل التمرين (دقيقة)',
    reminderAfter: 'تذكير بعد التمرين (دقيقة)',
    save: 'حفظ',
    
    // Body Measurements
    neck: 'الرقبة (سم)',
    shoulders: 'الأكتاف (سم)',
    chest: 'الصدر (سم)',
    rightArm: 'الذراع الأيمن (سم)',
    leftArm: 'الذراع الأيسر (سم)',
    abdomen: 'البطن (سم)',
    waist: 'الخصر (سم)',
    rightThigh: 'الفخذ الأيمن (سم)',
    leftThigh: 'الفخذ الأيسر (سم)',
    rightLeg: 'الساق الأيمن (سم)',
    leftLeg: 'الساق الأيسر (سم)',
    addMeasurement: 'أضف قياس جديد',
    saveMeasurement: 'احفظ القياس',
    measurementSaved: 'تم حفظ القياس بنجاح!',
    noMeasurements: 'لا توجد قياسات محفوظة',
    measurementHistory: 'تاريخ القياسات',
    viewProgress: 'عرض التقدم',
    date: 'التاريخ',
    measurement: 'القياس',
    progress: 'التقدم',
    cm: 'سم',
    
    // Cardio Converter
    caloriesInput: 'عدد السعرات المراد حرقها',
    exerciseType: 'نوع التمرين',
    running: 'الجري',
    cycling: 'ركوب الدراجة',
    swimming: 'السباحة',
    walking: 'المشي',
    jumpingRope: 'نط الحبل',
    rowing: 'التجديف',
    convert: 'تحويل',
    timeNeeded: 'الوقت المطلوب',
    minutes: 'دقيقة',
    selectExercise: 'اختر نوع التمرين',
    enterCalories: 'أدخل عدد السعرات',
    backToHome: 'العودة للرئيسية',
    explore: 'استكشف',
    getStarted: 'ابدأ الآن',
    trackMyHealth: 'تتبع صحتي',
    
    // Weekly Program
    weeklyProgram: 'البرنامج الأسبوعي',
    createProgram: 'إنشاء برنامج',
    myPrograms: 'برامجي',
    programName: 'اسم البرنامج',
    dayOfWeek: 'يوم الأسبوع',
    exerciseName: 'اسم التمرين',
    sets: 'المجموعات',
    reps: 'التكرارات',
    exerciseWeight: 'الوزن',
    notes: 'ملاحظات',
    addExercise: 'إضافة تمرين',
    saveProgram: 'حفظ البرنامج',
    programSaved: 'تم حفظ البرنامج بنجاح!',
    noPrograms: 'لا توجد برامج محفوظة',
    editProgram: 'تعديل البرنامج',
    deleteProgram: 'حذف البرنامج',
    confirmDelete: 'هل أنت متأكد من حذف هذا البرنامج؟',
    sunday: 'الأحد',
    monday: 'الاثنين',
    tuesday: 'الثلاثاء',
    wednesday: 'الأربعاء',
    thursday: 'الخميس',
    friday: 'الجمعة',
    saturday: 'السبت',
    rest: 'راحة',
  },
  en: {
    appName: 'Sehati',
    calorieCalculator: 'Calorie Calculator',
    bodyMeasurements: 'Body Measurements',
    cardioConverter: 'Cardio Converter',
    age: 'Age',
    gender: 'Gender',
    male: 'Male',
    female: 'Female',
    weight: 'Weight (kg)',
    height: 'Height (cm)',
    activityLevel: 'Activity Level',
    sedentary: 'Sedentary (little/no exercise)',
    lightlyActive: 'Lightly active (light exercise)',
    moderatelyActive: 'Moderately active (moderate exercise)',
    veryActive: 'Very active (hard exercise)',
    extraActive: 'Extra active (very hard exercise)',
    calculate: 'Calculate',
    bmr: 'Basal Metabolic Rate',
    tdee: 'Total Daily Energy Expenditure',
    calories: 'calories',
    startTracking: 'Start Tracking',
    yourHealthGuide: 'Your Complete Health Guide',
    trackCalories: 'Calculate calories, track body measurements, and convert calories to exercise minutes',
    
    // My Items
    myItems: 'My Items',
    myItemsDesc: 'Check workout items before going and after returning',
    exploreItems: 'Explore My Items',
    beforeWorkout: 'Before Workout',
    afterWorkout: 'After Workout',
    addNewItem: 'Add New Item',
    itemName: 'Item Name',
    selectIcon: 'Select Icon',
    add: 'Add',
    cancel: 'Cancel',
    delete: 'Delete',
    checkAll: 'Check All',
    uncheckAll: 'Uncheck All',
    noItemsYet: 'No items yet',
    addFirstItem: 'Add your first item',
    workoutReminder: 'Workout Reminder',
    enableNotifications: 'Enable Notifications',
    setWorkoutTime: 'Set Workout Time',
    reminderBefore: 'Reminder before workout (minutes)',
    reminderAfter: 'Reminder after workout (minutes)',
    save: 'Save',
    
    // Body Measurements
    neck: 'Neck (cm)',
    shoulders: 'Shoulders (cm)',
    chest: 'Chest (cm)',
    rightArm: 'Right Arm (cm)',
    leftArm: 'Left Arm (cm)',
    abdomen: 'Abdomen (cm)',
    waist: 'Waist (cm)',
    rightThigh: 'Right Thigh (cm)',
    leftThigh: 'Left Thigh (cm)',
    rightLeg: 'Right Leg (cm)',
    leftLeg: 'Left Leg (cm)',
    addMeasurement: 'Add New Measurement',
    saveMeasurement: 'Save Measurement',
    measurementSaved: 'Measurement saved successfully!',
    noMeasurements: 'No measurements saved',
    measurementHistory: 'Measurement History',
    viewProgress: 'View Progress',
    date: 'Date',
    measurement: 'Measurement',
    progress: 'Progress',
    cm: 'cm',
    
    // Cardio Converter
    caloriesInput: 'Calories to burn',
    exerciseType: 'Exercise type',
    running: 'Running',
    cycling: 'Cycling',
    swimming: 'Swimming',
    walking: 'Walking',
    jumpingRope: 'Jumping rope',
    rowing: 'Rowing',
    convert: 'Convert',
    timeNeeded: 'Time needed',
    minutes: 'minutes',
    selectExercise: 'Select exercise type',
    enterCalories: 'Enter calories',
    backToHome: 'Back to Home',
    explore: 'Explore',
    getStarted: 'Get Started',
    trackMyHealth: 'Track My Health',
    
    // Weekly Program
    weeklyProgram: 'Weekly Program',
    createProgram: 'Create Program',
    myPrograms: 'My Programs',
    programName: 'Program Name',
    dayOfWeek: 'Day of Week',
    exerciseName: 'Exercise Name',
    sets: 'Sets',
    reps: 'Reps',
    exerciseWeight: 'Weight',
    notes: 'Notes',
    addExercise: 'Add Exercise',
    saveProgram: 'Save Program',
    programSaved: 'Program saved successfully!',
    noPrograms: 'No programs saved',
    editProgram: 'Edit Program',
    deleteProgram: 'Delete Program',
    confirmDelete: 'Are you sure you want to delete this program?',
    sunday: 'Sunday',
    monday: 'Monday',
    tuesday: 'Tuesday',
    wednesday: 'Wednesday',
    thursday: 'Thursday',
    friday: 'Friday',
    saturday: 'Saturday',
    rest: 'Rest',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ar');
  const isRTL = language === 'ar';

  useEffect(() => {
    const savedLanguage = localStorage.getItem('sehati-language') as Language;
    if (savedLanguage && ['ar', 'en'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('sehati-language', language);
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language, isRTL]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['ar']] || key;
  };

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleLanguageChange, isRTL, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};