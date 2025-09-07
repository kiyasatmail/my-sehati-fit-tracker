import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface SEOConfig {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  noindex?: boolean;
  image?: string;
  type?: 'website' | 'article' | 'product';
}

export const useSEO = (config: SEOConfig) => {
  const { isRTL } = useLanguage();

  useEffect(() => {
    // Set default values
    const {
      title = isRTL ? 'QiyasaT | تطبيق الصحة الشامل' : 'QiyasaT | Comprehensive Health App',
      description = isRTL 
        ? 'تطبيق قياساتي الشامل لحساب السعرات الحرارية، تتبع قياسات الجسم، تحويل السعرات لدقائق التمارين، وحساب احتياجات الماء اليومية'
        : 'QiyasaT comprehensive health app for calorie calculation, body measurements tracking, cardio conversion, and daily water needs calculation',
      keywords = isRTL
        ? 'حاسبة السعرات الحرارية، قياسات الجسم، تمارين رياضية، حاسبة الماء، صحة ولياقة، قياساتي، تطبيق صحة عربي'
        : 'calorie calculator, body measurements, fitness exercises, water calculator, health fitness, QiyasaT, Arabic health app',
      canonical = window.location.href,
      noindex = false,
      image = '/lovable-uploads/a6dfe1c6-1bfc-44c5-9886-ffe941b7c0a5.png',
      type = 'website'
    } = config;

    // Update document title
    document.title = title;

    // Update or create meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('robots', noindex ? 'noindex, nofollow' : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');

    // Update Open Graph tags
    updateMetaProperty('og:title', title);
    updateMetaProperty('og:description', description);
    updateMetaProperty('og:type', type);
    updateMetaProperty('og:url', canonical);
    updateMetaProperty('og:image', `https://qiyasat.com${image}`);
    updateMetaProperty('og:site_name', 'QiyasaT');
    updateMetaProperty('og:locale', isRTL ? 'ar_SA' : 'en_US');

    // Update Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', `https://qiyasat.com${image}`);
    updateMetaTag('twitter:url', canonical);

    // Update canonical link
    updateCanonicalLink(canonical);

    // Update language and direction
    document.documentElement.lang = isRTL ? 'ar' : 'en';
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';

    // Update hreflang links
    updateHreflangLinks(canonical);

    // Add page-specific structured data
    addPageStructuredData(title, description, canonical, type);

  }, [config, isRTL]);
};

function updateMetaTag(name: string, content: string) {
  let meta = document.querySelector(`meta[name="${name}"]`);
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('name', name);
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', content);
}

function updateMetaProperty(property: string, content: string) {
  let meta = document.querySelector(`meta[property="${property}"]`);
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('property', property);
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', content);
}

function updateCanonicalLink(href: string) {
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', href);
}

function updateHreflangLinks(currentUrl: string) {
  // Remove existing hreflang links
  const existingHreflang = document.querySelectorAll('link[rel="alternate"][hreflang]');
  existingHreflang.forEach(link => link.remove());

  // Add new hreflang links
  const baseUrl = currentUrl.replace(/\/(en|ar)\//, '/');
  
  // Arabic version
  const arLink = document.createElement('link');
  arLink.setAttribute('rel', 'alternate');
  arLink.setAttribute('hreflang', 'ar');
  arLink.setAttribute('href', baseUrl);
  document.head.appendChild(arLink);

  // English version
  const enLink = document.createElement('link');
  enLink.setAttribute('rel', 'alternate');
  enLink.setAttribute('hreflang', 'en');
  enLink.setAttribute('href', baseUrl.replace('qiyasat.com/', 'qiyasat.com/en/'));
  document.head.appendChild(enLink);

  // Default version
  const defaultLink = document.createElement('link');
  defaultLink.setAttribute('rel', 'alternate');
  defaultLink.setAttribute('hreflang', 'x-default');
  defaultLink.setAttribute('href', baseUrl);
  document.head.appendChild(defaultLink);
}

function addPageStructuredData(title: string, description: string, url: string, type: string) {
  // Remove existing page schema
  const existingSchema = document.querySelector('script[data-page-schema]');
  if (existingSchema) {
    existingSchema.remove();
  }

  // Create new page schema
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.setAttribute('data-page-schema', 'true');

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": url,
    "name": title,
    "description": description,
    "url": url,
    "isPartOf": {
      "@id": "https://qiyasat.com/#website"
    },
    "about": {
      "@type": "HealthAndFitnessApplication",
      "name": "QiyasaT",
      "alternateName": "قياساتي"
    },
    "potentialAction": {
      "@type": "UseAction",
      "target": url
    }
  };

  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}

// Predefined SEO configurations for each page
export const SEO_CONFIGS = {
  home: {
    title: 'QiyasaT | تطبيق الصحة الشامل - حاسبة السعرات وقياسات الجسم',
    description: 'تطبيق قياساتي الشامل لحساب السعرات الحرارية، تتبع قياسات الجسم، تحويل السعرات لدقائق التمارين، وحساب احتياجات الماء اليومية. أفضل تطبيق صحة عربي مجاني.',
    keywords: 'حاسبة السعرات الحرارية، قياسات الجسم، تمارين رياضية، حاسبة الماء، صحة ولياقة، قياساتي، تطبيق صحة عربي، حرق السعرات، تتبع الوزن، برنامج تمارين',
    canonical: 'https://qiyasat.com/'
  },
  calories: {
    title: 'حاسبة السعرات الحرارية | احسب احتياجك اليومي - قياساتي',
    description: 'احسب احتياجك اليومي من السعرات الحرارية بدقة باستخدام حاسبة السعرات المتقدمة. معادلات علمية دقيقة لحساب السعرات حسب العمر والوزن والطول ومستوى النشاط.',
    keywords: 'حاسبة السعرات الحرارية، احتياج السعرات اليومي، معادلة هاريس بنديكت، BMR، TDEE، حرق السعرات، إنقاص الوزن، زيادة الوزن',
    canonical: 'https://qiyasat.com/calories'
  },
  measurements: {
    title: 'تتبع قياسات الجسم | قياس التقدم والنتائج - قياساتي',
    description: 'تتبع قياسات جسمك ومراقبة تقدمك في الوزن والطول ومحيط الخصر والصدر والذراعين. سجل قياساتك وشاهد النتائج على شكل رسوم بيانية.',
    keywords: 'قياسات الجسم، تتبع الوزن، محيط الخصر، محيط الصدر، تتبع التقدم، قياس النتائج، مؤشر كتلة الجسم BMI',
    canonical: 'https://qiyasat.com/measurements'
  },
  cardio: {
    title: 'محول الكارديو | حول السعرات لدقائق تمارين - قياساتي',
    description: 'حول السعرات الحرارية إلى دقائق تمارين الكارديو المختلفة. اعرف كم دقيقة تحتاج من المشي أو الجري أو السباحة لحرق عدد معين من السعرات.',
    keywords: 'محول الكارديو، تحويل السعرات لدقائق، تمارين الكارديو، حرق السعرات، المشي، الجري، السباحة، ركوب الدراجة',
    canonical: 'https://qiyasat.com/cardio'
  },
  water: {
    title: 'حاسبة الماء | احسب احتياجك اليومي من الماء - قياساتي',
    description: 'احسب احتياجك اليومي من الماء حسب وزنك ومستوى نشاطك والطقس. معرفة الكمية المناسبة من الماء لجسمك للحفاظ على الترطيب الصحي.',
    keywords: 'حاسبة الماء، احتياج الماء اليومي، شرب الماء، ترطيب الجسم، كمية الماء المناسبة، الجفاف، الترطيب الصحي',
    canonical: 'https://qiyasat.com/water'
  },
  program: {
    title: 'البرنامج الأسبوعي للتمارين | خطط تمارينك - قياساتي',
    description: 'خطط برنامجك الأسبوعي للتمارين الرياضية. نظم جدولك التدريبي وتتبع تقدمك في اللياقة البدنية مع خطط تدريبية متنوعة.',
    keywords: 'البرنامج الأسبوعي، تمارين رياضية، جدول تدريبي، خطة تمارين، لياقة بدنية، تنظيم التمارين، برنامج اللياقة',
    canonical: 'https://qiyasat.com/program'
  },
  wakeup: {
    title: 'تحدي الاستيقاظ المبكر | طور عادات صحية - قياساتي',
    description: 'انضم لتحدي الاستيقاظ المبكر وطور عادات نوم صحية. تتبع تقدمك في الاستيقاظ المبكر وحافظ على نمط حياة صحي ومنتج.',
    keywords: 'تحدي الاستيقاظ المبكر، عادات صحية، نمط النوم، الاستيقاظ المبكر، عادات إيجابية، تطوير الذات، نمط حياة صحي',
    canonical: 'https://qiyasat.com/wakeup'
  },
  items: {
    title: 'أغراضي | تنظيم متعلقاتك الصحية - قياساتي',
    description: 'نظم وتتبع أغراضك ومعداتك الرياضية والصحية. سجل أدواتك المختلفة وتأكد من جاهزيتها لتمارينك وأنشطتك الصحية.',
    keywords: 'تنظيم الأغراض، معدات رياضية، أدوات صحية، تتبع المتعلقات، إدارة الأغراض، معدات التمارين',
    canonical: 'https://qiyasat.com/items'
  },
  terms: {
    title: 'الشروط والخصوصية | سياسة الاستخدام - قياساتي',
    description: 'اطلع على شروط الاستخدام وسياسة الخصوصية لتطبيق قياساتي. معلومات مفصلة حول حماية بياناتك وحقوقك عند استخدام التطبيق.',
    keywords: 'شروط الاستخدام، سياسة الخصوصية، حماية البيانات، حقوق المستخدم، أمان المعلومات، قوانين الاستخدام',
    canonical: 'https://qiyasat.com/terms',
    noindex: true
  }
};