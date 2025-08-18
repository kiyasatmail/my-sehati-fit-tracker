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