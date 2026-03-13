import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import { ArrowRight, Building2, Store, Truck, Users, Shield, Globe, TrendingUp } from 'lucide-react';

export const Home: React.FC = () => {
  const { t, language } = useLanguage();

  const services = [
    {
      icon: Building2,
      title: t.services.card1.title,
      description: t.services.card1.description,
      link: '/services#company',
    },
    {
      icon: Store,
      title: t.services.card2.title,
      description: t.services.card2.description,
      link: '/services#store',
    },
    {
      icon: Truck,
      title: t.services.card3.title,
      description: t.services.card3.description,
      link: '/services#supply',
    },
    {
      icon: Users,
      title: t.services.card4.title,
      description: t.services.card4.description,
      link: '/services#ecosystem',
    },
  ];

  const advantages = [
    {
      icon: TrendingUp,
      title: t.advantages.card1.title,
      description: t.advantages.card1.description,
    },
    {
      icon: Shield,
      title: t.advantages.card2.title,
      description: t.advantages.card2.description,
    },
    {
      icon: Globe,
      title: t.advantages.card3.title,
      description: t.advantages.card3.description,
    },
    {
      icon: Users,
      title: t.advantages.card4.title,
      description: t.advantages.card4.description,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-900 via-orange-800 to-orange-900 text-white pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              {t.hero.title}
            </h1>
            <p className="text-lg text-orange-200 mb-4">
              {t.hero.teamDescription}
            </p>
            <p className="text-base text-orange-100/80 mb-8 max-w-2xl mx-auto">
              {t.hero.coreValue}
            </p>
            <p className="text-sm text-orange-200 mb-10">
              {t.hero.usMexicoCoverage}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/seller-register"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-orange-900 font-semibold rounded-lg hover:bg-orange-50 transition-colors"
              >
                {t.hero.ctaSeller}
                <ArrowRight size={20} />
              </Link>
              <Link
                to="/factory-register"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
              >
                {t.hero.ctaFactory}
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>

        {/* Background Pattern */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-orange-400/20 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t.services.title}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t.services.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Link
                key={index}
                to={service.link}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow group"
              >
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-600 transition-colors">
                  <service.icon className="w-6 h-6 text-orange-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {service.description}
                </p>
                <div className="flex items-center text-orange-600 font-medium text-sm group-hover:text-orange-700">
                  {t.services.learnMore}
                  <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t.advantages.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {advantages.map((advantage, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6"
              >
                <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mb-4">
                  <advantage.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {advantage.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {advantage.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-orange-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {language === 'zh' ? '准备好开启您的跨境之旅了吗？' : 'Ready to Start Your Cross-Border Journey?'}
          </h2>
          <p className="text-lg text-orange-100 mb-8 max-w-2xl mx-auto">
            {language === 'zh'
              ? '立即注册，享受专业的一站式跨境服务'
              : 'Register now and enjoy professional one-stop cross-border services'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/seller-register"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-orange-900 font-semibold rounded-lg hover:bg-orange-50 transition-colors"
            >
              {t.hero.ctaSeller}
            </Link>
            <Link
              to="/factory-register"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
            >
              {t.hero.ctaFactory}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
