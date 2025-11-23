import React from 'react';
import farmHero from '../assets/images/farm-hero.jpg';
import { useLanguage } from '../context/LanguageContext';

const About = () => {
  const { t } = useLanguage();

  return (
    <div>
      <section className="relative h-[400px] flex items-center justify-center text-white text-center">
        <img
          src={farmHero}
          alt="Moslimani Farm"
          className="absolute top-0 left-0 w-full h-full object-cover -z-10 brightness-[0.6]"
        />
        <div>
          <h1 className="text-5xl md:text-6xl text-white mb-sm font-heading font-bold">{t('about.title')}</h1>
          <p className="text-xl md:text-2xl font-light">{t('about.subtitle')}</p>
        </div>
      </section>

      <div className="container max-w-[800px] py-2xl px-md">
        <section className="mb-2xl">
          <h2 className="mb-md text-brand-green-dark font-heading font-bold text-3xl">{t('about.whoWeAre')}</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            {t('about.whoWeAreText')}
          </p>
        </section>

        <section className="mb-2xl">
          <h2 className="mb-md text-brand-green-dark font-heading font-bold text-3xl">{t('about.ourMission')}</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            {t('about.ourMissionText')}
          </p>
        </section>

        <section className="mb-2xl">
          <h2 className="mb-md text-brand-green-dark font-heading font-bold text-3xl">{t('about.whyFarmToHome')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-lg">
            <div className="bg-white p-6 rounded-md shadow-sm text-center">
              <h3 className="text-brand-orange mb-sm font-heading font-bold text-xl">{t('about.peakFreshness')}</h3>
              <p className="text-sm">{t('about.peakFreshnessText')}</p>
            </div>
            <div className="bg-white p-6 rounded-md shadow-sm text-center">
              <h3 className="text-brand-orange mb-sm font-heading font-bold text-xl">{t('about.sustainable')}</h3>
              <p className="text-sm">{t('about.sustainableText')}</p>
            </div>
            <div className="bg-white p-6 rounded-md shadow-sm text-center">
              <h3 className="text-brand-orange mb-sm font-heading font-bold text-xl">{t('about.community')}</h3>
              <p className="text-sm">{t('about.communityText')}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
