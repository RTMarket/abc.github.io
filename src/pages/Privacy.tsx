import React from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Shield, FileText, Lock, Mail } from 'lucide-react';

export const Privacy: React.FC = () => {
  const { t, language } = useLanguage();

  const collectionItems = language === 'zh'
    ? t.privacy.collection.items
    : t.privacy.collection.items;

  const usageItems = language === 'zh'
    ? t.privacy.usage.items
    : t.privacy.usage.items;

  const protectionItems = language === 'zh'
    ? t.privacy.protection.items
    : t.privacy.protection.items;

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t.privacy.title}
          </h1>
          <p className="text-xl text-blue-100">
            {t.privacy.lastUpdate}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Introduction */}
          <div className="mb-12">
            <p className="text-lg text-gray-700 leading-relaxed">
              {t.privacy.intro}
            </p>
          </div>

          {/* Information Collection */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                {t.privacy.collection.title}
              </h2>
            </div>
            <ul className="space-y-2 ml-13">
              {collectionItems.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-gray-700">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Information Usage */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                {t.privacy.usage.title}
              </h2>
            </div>
            <ul className="space-y-2 ml-13">
              {usageItems.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-gray-700">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Information Protection */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Lock className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                {t.privacy.protection.title}
              </h2>
            </div>
            <ul className="space-y-2 ml-13">
              {protectionItems.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-gray-700">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">
                {language === 'zh' ? '联系我们' : 'Contact Us'}
              </h2>
            </div>
            <p className="text-gray-700">
              {t.privacy.contact}
            </p>
            <p className="text-gray-600 mt-2">
              Email: market@usfactorybridge.com
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
