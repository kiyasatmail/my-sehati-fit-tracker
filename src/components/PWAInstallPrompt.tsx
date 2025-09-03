import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { X, Download, Smartphone } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const PWAInstallPrompt = () => {
  const { language } = useLanguage();
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if running in standalone mode (already installed)
    const standalone = window.matchMedia('(display-mode: standalone)').matches;
    setIsStandalone(standalone);
    
    // Check if it's iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(iOS);

    // Don't show prompt if already installed
    if (standalone) {
      return;
    }

    // Listen for the beforeinstallprompt event (Android/Chrome)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      
      // Show prompt after 3 seconds delay
      setTimeout(() => {
        setShowInstallPrompt(true);
      }, 3000);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // For iOS, show install prompt after delay since it doesn't support beforeinstallprompt
    if (iOS && !standalone) {
      const timer = setTimeout(() => {
        setShowInstallPrompt(true);
      }, 3000);
      return () => clearTimeout(timer);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      // Show the install prompt
      deferredPrompt.prompt();
      
      // Wait for the user to respond to the prompt
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      
      setDeferredPrompt(null);
      setShowInstallPrompt(false);
    }
  };

  const handleDismiss = () => {
    setShowInstallPrompt(false);
    // Remember user's choice for this session
    localStorage.setItem('pwa-install-dismissed', 'true');
  };

  // Don't show if already installed
  if (isStandalone) {
    return null;
  }

  // Don't show if user previously dismissed
  if (localStorage.getItem('pwa-install-dismissed') === 'true') {
    return null;
  }

  // Don't show if prompt is not ready
  if (!showInstallPrompt) {
    return null;
  }

  return (
    <Card className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-sm shadow-lg border-primary/20 bg-background">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-sm">
              تثبيت التطبيق
            </h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDismiss}
            className="h-6 w-6 p-0"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        
        <p className="text-xs text-muted-foreground mb-3" dir={language === 'ar' ? 'rtl' : 'ltr'}>
          {isIOS 
            ? 'أضف صحتي إلى الشاشة الرئيسية للوصول السريع'
            : 'أضف صحتي إلى شاشتك الرئيسية للوصول السريع وتجربة أفضل'
          }
        </p>

        {isIOS ? (
          <div className="text-xs text-muted-foreground space-y-1">
            <div>1. اضغط على زر المشاركة <span className="inline-block">⬆️</span></div>
            <div>2. اختر "إضافة إلى الشاشة الرئيسية"</div>
          </div>
        ) : (
          <Button 
            onClick={handleInstallClick}
            className="w-full"
            size="sm"
          >
            <Download className="w-4 h-4 mr-2" />
            تثبيت التطبيق
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default PWAInstallPrompt;