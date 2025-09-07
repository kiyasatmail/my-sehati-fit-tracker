import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface SEOHeadProps {
  title?: string;
  description?: string;
  canonical?: string;
  noindex?: boolean;
  image?: string;
  type?: 'website' | 'article';
  keywords?: string;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  canonical,
  noindex = false,
  image = '/lovable-uploads/a6dfe1c6-1bfc-44c5-9886-ffe941b7c0a5.png',
  type = 'website',
  keywords
}) => {
  const { isRTL } = useLanguage();

  useEffect(() => {
    // Update document title
    if (title) {
      document.title = title;
    }

    // Update meta description
    if (description) {
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', description);
      }
    }

    // Update keywords
    if (keywords) {
      const metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute('content', keywords);
      }
    }

    // Update robots
    const metaRobots = document.querySelector('meta[name="robots"]');
    if (metaRobots) {
      const robotsContent = noindex 
        ? 'noindex, nofollow' 
        : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1';
      metaRobots.setAttribute('content', robotsContent);
    }

    // Update canonical URL
    if (canonical) {
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', canonical);
    }

    // Update Open Graph tags
    if (title) {
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) {
        ogTitle.setAttribute('content', title);
      }
    }

    if (description) {
      const ogDescription = document.querySelector('meta[property="og:description"]');
      if (ogDescription) {
        ogDescription.setAttribute('content', description);
      }
    }

    if (image) {
      const ogImage = document.querySelector('meta[property="og:image"]');
      if (ogImage) {
        ogImage.setAttribute('content', `https://qiyasat.com${image}`);
      }
    }

    // Update Twitter Card tags
    if (title) {
      const twitterTitle = document.querySelector('meta[name="twitter:title"]');
      if (twitterTitle) {
        twitterTitle.setAttribute('content', title);
      }
    }

    if (description) {
      const twitterDescription = document.querySelector('meta[name="twitter:description"]');
      if (twitterDescription) {
        twitterDescription.setAttribute('content', description);
      }
    }

    // Update language and direction
    document.documentElement.lang = isRTL ? 'ar' : 'en';
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';

    // Update JSON-LD structured data for current page
    updateStructuredData(title, description, canonical, type);

  }, [title, description, canonical, noindex, image, type, keywords, isRTL]);

  return null;
};

function updateStructuredData(title?: string, description?: string, canonical?: string, type?: string) {
  // Remove existing page-specific structured data
  const existingScript = document.querySelector('script[data-page-schema]');
  if (existingScript) {
    existingScript.remove();
  }

  // Add new page-specific structured data
  if (title && description && canonical) {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-page-schema', 'true');
    
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": canonical,
      "name": title,
      "description": description,
      "url": canonical,
      "isPartOf": {
        "@id": "https://qiyasat.com/#website"
      },
      "about": {
        "@type": "HealthAndFitnessApplication",
        "name": "QiyasaT",
        "description": "تطبيق قياساتي الشامل للصحة واللياقة"
      },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "الرئيسية",
            "item": "https://qiyasat.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": title,
            "item": canonical
          }
        ]
      }
    };

    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
  }
}