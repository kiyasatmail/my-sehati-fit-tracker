import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowRight, Shield, FileText, Lock, Users } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface TermsAndPrivacyProps {
  onBack: () => void;
}

export const TermsAndPrivacy: React.FC<TermsAndPrivacyProps> = ({ onBack }) => {
  const { t, isRTL } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-card p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onBack}
              className="gap-2"
            >
              <ArrowRight className={`h-4 w-4 ${isRTL ? 'rotate-180' : ''}`} />
              {t('backToHome')}
            </Button>
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {t('termsAndPrivacy')}
          </h1>
          <p className="text-muted-foreground">
            {t('termsAndPrivacyDesc')}
          </p>
        </div>

        <Tabs defaultValue="terms" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="terms" className="gap-2">
              <FileText className="h-4 w-4" />
              {t('termsOfService')}
            </TabsTrigger>
            <TabsTrigger value="privacy" className="gap-2">
              <Shield className="h-4 w-4" />
              {t('privacyPolicy')}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="terms" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  {t('termsOfService')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px] w-full pr-4">
                  <div className="space-y-6">
                    <section>
                      <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                        <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">1</span>
                        {t('acceptanceOfTerms')}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {t('acceptanceOfTermsText')}
                      </p>
                    </section>

                    <section>
                      <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                        <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">2</span>
                        {t('serviceDescription')}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {t('serviceDescriptionText')}
                      </p>
                    </section>

                    <section>
                      <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                        <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">3</span>
                        {t('userResponsibilities')}
                      </h3>
                      <div className="text-muted-foreground leading-relaxed space-y-2">
                        <p>{t('userResponsibilitiesText')}</p>
                        <ul className="list-disc mr-6 space-y-1">
                          <li>{t('userResp1')}</li>
                          <li>{t('userResp2')}</li>
                          <li>{t('userResp3')}</li>
                          <li>{t('userResp4')}</li>
                        </ul>
                      </div>
                    </section>

                    <section>
                      <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                        <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">4</span>
                        {t('limitations')}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {t('limitationsText')}
                      </p>
                    </section>

                    <section>
                      <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                        <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">5</span>
                        {t('medicalDisclaimer')}
                      </h3>
                      <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                        <p className="text-destructive font-medium mb-2">{t('important')}</p>
                        <p className="text-muted-foreground leading-relaxed">
                          {t('medicalDisclaimerText')}
                        </p>
                      </div>
                    </section>

                    <section>
                      <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                        <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">6</span>
                        {t('modifications')}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {t('modificationsText')}
                      </p>
                    </section>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  {t('privacyPolicy')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px] w-full pr-4">
                  <div className="space-y-6">
                    <section>
                      <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                        <Lock className="h-5 w-5 text-green-600" />
                        {t('dataCollection')}
                      </h3>
                      <div className="text-muted-foreground leading-relaxed space-y-2">
                        <p>{t('dataCollectionText')}</p>
                        <ul className="list-disc mr-6 space-y-1">
                          <li>{t('dataType1')}</li>
                          <li>{t('dataType2')}</li>
                          <li>{t('dataType3')}</li>
                          <li>{t('dataType4')}</li>
                        </ul>
                      </div>
                    </section>

                    <section>
                      <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                        <Users className="h-5 w-5 text-blue-600" />
                        {t('dataUsage')}
                      </h3>
                      <div className="text-muted-foreground leading-relaxed space-y-2">
                        <p>{t('dataUsageText')}</p>
                        <ul className="list-disc mr-6 space-y-1">
                          <li>{t('dataUsage1')}</li>
                          <li>{t('dataUsage2')}</li>
                          <li>{t('dataUsage3')}</li>
                          <li>{t('dataUsage4')}</li>
                        </ul>
                      </div>
                    </section>

                    <section>
                      <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                        <Shield className="h-5 w-5 text-purple-600" />
                        {t('dataSecurity')}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {t('dataSecurityText')}
                      </p>
                    </section>

                    <section>
                      <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                        <Lock className="h-5 w-5 text-orange-600" />
                        {t('localStorage')}
                      </h3>
                      <div className="bg-info/10 border border-info/20 rounded-lg p-4">
                        <p className="text-info font-medium mb-2">{t('importantNote')}</p>
                        <p className="text-muted-foreground leading-relaxed">
                          {t('localStorageText')}
                        </p>
                      </div>
                    </section>

                    <section>
                      <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                        <Users className="h-5 w-5 text-red-600" />
                        {t('thirdParties')}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {t('thirdPartiesText')}
                      </p>
                    </section>

                    <section>
                      <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                        <Shield className="h-5 w-5 text-green-600" />
                        {t('userRights')}
                      </h3>
                      <div className="text-muted-foreground leading-relaxed space-y-2">
                        <p>{t('userRightsText')}</p>
                        <ul className="list-disc mr-6 space-y-1">
                          <li>{t('userRight1')}</li>
                          <li>{t('userRight2')}</li>
                          <li>{t('userRight3')}</li>
                          <li>{t('userRight4')}</li>
                        </ul>
                      </div>
                    </section>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            {t('lastUpdated')}: {t('lastUpdatedDate')}
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            {t('contactInfo')}
          </p>
        </div>
      </div>
    </div>
  );
};