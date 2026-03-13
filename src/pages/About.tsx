import React from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Shield, Users, Globe, Award } from 'lucide-react';

export const About: React.FC = () => {
  const { t, language } = useLanguage();

  const features = [
    {
      icon: Shield,
      title: language === 'zh' ? '合规保障' : 'Compliance Guarantee',
      description: language === 'zh'
        ? '所有流程合法合规，文件齐全，支持律师和会计师背书'
        : 'All processes are legally compliant, documents complete, supported by lawyers and accountants',
    },
    {
      icon: Users,
      title: language === 'zh' ? '专业团队' : 'Professional Team',
      description: language === 'zh'
        ? '中美墨三国专业人士组成，深耕跨境电商行业超3年'
        : 'Professionals from China, US, and Mexico with over 3 years of cross-border e-commerce experience',
    },
    {
      icon: Globe,
      title: language === 'zh' ? '全球网络' : 'Global Network',
      description: language === 'zh'
        ? '美墨两地一站式覆盖，两国联动，无缝衔接业务'
        : 'US-Mexico one-stop coverage, cross-border integration, seamless business connection',
    },
    {
      icon: Award,
      title: language === 'zh' ? '丰富经验' : 'Rich Experience',
      description: language === 'zh'
        ? '深度服务数百家跨境卖家，积累庞大资源库'
        : 'Served hundreds of cross-border sellers, accumulated extensive resource library',
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t.about.title}
            </h1>
            <p className="text-xl text-blue-100">
              {t.about.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Company Introduction */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {t.about.companyName}
              </h2>
              <p className="text-lg text-gray-600">
                {t.about.companyNameEn}
              </p>
            </div>

            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p>{t.about.description}</p>
              <p>{t.about.description2}</p>
              <p>{t.about.description3}</p>
              <p>{t.about.description4}</p>
            </div>

            <div className="mt-8 p-6 bg-blue-50 rounded-xl">
              <p className="text-lg text-blue-900 font-medium">
                {t.about.promise}
              </p>
            </div>

            <p className="mt-8 text-gray-700 leading-relaxed">
              {t.about.closing}
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-6 text-center"
              >
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Closing Statement */}
          <div className="text-center">
            <p className="text-2xl md:text-3xl font-bold text-blue-900">
              {t.about.tagline}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
