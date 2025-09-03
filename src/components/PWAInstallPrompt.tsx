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
    console.log('PWA Install Prompt: Component mounted');
    
    // Clear any previous dismissal for testing
    localStorage.removeItem('pwa-install-dismissed');
    
    // Check if running in standalone mode (already installed)
    const standalone = window.matchMedia('(display-mode: standalone)').matches;
    console.log('PWA Install Prompt: Is standalone?', standalone);
    setIsStandalone(standalone);
    
    // Check if it's iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    console.log('PWA Install Prompt: Is iOS?', iOS);
    setIsIOS(iOS);

    // Don't show prompt if already installed
    if (standalone) {
      console.log('PWA Install Prompt: Not showing - already in standalone mode');
      return;
    }

    // Listen for the beforeinstallprompt event (Android/Chrome)
    const handleBeforeInstallPrompt = (e: Event) => {
      console.log('PWA Install Prompt: beforeinstallprompt event fired');
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      
      // Show prompt after 3 seconds delay
      setTimeout(() => {
        console.log('PWA Install Prompt: Showing prompt after delay');
        setShowInstallPrompt(true);
      }, 3000);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    console.log('PWA Install Prompt: Added beforeinstallprompt listener');

    // For all devices, show install prompt after delay
    // This will work for iOS and any other browser that doesn't support beforeinstallprompt
    const timer = setTimeout(() => {
      console.log('PWA Install Prompt: Timer fired, showing prompt');
      setShowInstallPrompt(true);
    }, 3000);

    return () => {
      console.log('PWA Install Prompt: Cleaning up');
      clearTimeout(timer);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    console.log('PWA Install Prompt: Install button clicked');
    if (deferredPrompt) {
      console.log('PWA Install Prompt: Using deferred prompt');
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
    } else {
      console.log('PWA Install Prompt: No deferred prompt available');
    }
  };

  const handleDismiss = () => {
    console.log('PWA Install Prompt: Dismissed');
    setShowInstallPrompt(false);
    // Remember user's choice for this session
    localStorage.setItem('pwa-install-dismissed', 'true');
  };

  console.log('PWA Install Prompt render:', {
    isStandalone,
    showInstallPrompt,
    dismissed: localStorage.getItem('pwa-install-dismissed'),
    isIOS,
    deferredPrompt: !!deferredPrompt
  });

  // Don't show if already installed
  if (isStandalone) {
    console.log('PWA Install Prompt: Returning null - standalone');
    return null;
  }

  // Don't show if user previously dismissed
  if (localStorage.getItem('pwa-install-dismissed') === 'true') {
    console.log('PWA Install Prompt: Returning null - dismissed');
    return null;
  }

  // Don't show if prompt is not ready
  if (!showInstallPrompt) {
    console.log('PWA Install Prompt: Returning null - not showing');
    return null;
  }

  console.log('PWA Install Prompt: Rendering prompt!');

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