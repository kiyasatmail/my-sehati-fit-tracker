import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { X, Download, Smartphone, Share } from 'lucide-react';
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
    const standalone = window.matchMedia('(display-mode: standalone)').matches || 
                      (window.navigator as any).standalone ||
                      document.referrer.includes('android-app://');
    setIsStandalone(standalone);
    
    // Check if it's iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(iOS);

    // Don't show prompt if already installed
    if (standalone) {
      return;
    }

    // Check if user dismissed recently
    const dismissedTime = localStorage.getItem('pwa-install-dismissed-time');
    const now = Date.now();
    const oneDayAgo = now - (24 * 60 * 60 * 1000); // 24 hours
    
    if (dismissedTime && parseInt(dismissedTime) > oneDayAgo) {
      return;
    }

    // Listen for the beforeinstallprompt event (Android/Chrome)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      
      // Show prompt after 2 seconds delay
      setTimeout(() => {
        setShowInstallPrompt(true);
      }, 2000);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // For iOS, show install prompt after delay
    if (iOS && !standalone) {
      const timer = setTimeout(() => {
        setShowInstallPrompt(true);
      }, 2000);
      return () => clearTimeout(timer);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      try {
        // Show the install prompt
        await deferredPrompt.prompt();
        
        // Wait for the user to respond to the prompt
        const { outcome } = await deferredPrompt.userChoice;
        
        if (outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
        
        setDeferredPrompt(null);
        setShowInstallPrompt(false);
      } catch (error) {
        console.error('Error showing install prompt:', error);
      }
    }
  };

  const handleDismiss = () => {
    setShowInstallPrompt(false);
    // Remember user's choice with timestamp
    localStorage.setItem('pwa-install-dismissed-time', Date.now().toString());
  };

  // Don't show if already installed
  if (isStandalone) {
    return null;
  }

  // Don't show if prompt is not ready
  if (!showInstallPrompt) {
    return null;
  }

  return (
    <Card className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-sm shadow-lg border-primary/20 bg-background animate-in slide-in-from-bottom-4">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-sm">
              تثبيت QiyasaT
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
            ? 'أضف QiyasaT إلى الشاشة الرئيسية للوصول السريع'
            : 'أضف QiyasaT إلى شاشتك الرئيسية للوصول السريع وتجربة أفضل'
          }
        </p>

        {isIOS ? (
          <div className="text-xs text-muted-foreground space-y-2">
            <div className="flex items-center gap-2">
              <span>1. اضغط على زر المشاركة</span>
              <Share className="w-4 h-4" />
            </div>
            <div>2. اختر "إضافة إلى الشاشة الرئيسية"</div>
            <div>3. اضغط "إضافة"</div>
          </div>
        ) : (
          <Button 
            onClick={handleInstallClick}
            className="w-full"
            size="sm"
            disabled={!deferredPrompt}
          >
            <Download className="w-4 h-4 mr-2" />
            تثبيت QiyasaT
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default PWAInstallPrompt;