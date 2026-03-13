import React from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Briefcase, MapPin, Clock, Mail, CheckCircle } from 'lucide-react';

export const Careers: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-900 via-orange-800 to-orange-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t.careers.title}
          </h1>
          <p className="text-xl text-orange-100">
            {t.careers.subtitle}
          </p>
          <p className="mt-4 text-lg text-orange-200 max-w-3xl mx-auto">
            {t.careers.intro}
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            {t.careers.benefits.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.careers.benefits.items.map((item, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <CheckCircle className="w-8 h-8 text-orange-600 mb-3" />
                <p className="text-gray-700 font-medium">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
            {t.careers.positions}
          </h2>

          <div className="grid grid-cols-1 gap-8 mt-8">
            {/* Position 1: U.S. Attorney */}
            <div className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Briefcase className="w-6 h-6 text-orange-600" />
                    <h3 className="text-xl font-bold text-gray-900">{t.careers.attorney.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{t.careers.attorney.description}</p>

                  <div className="flex flex-wrap gap-4 mb-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock size={18} />
                      <span>{t.careers.attorney.type}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin size={18} />
                      <span>{t.careers.attorney.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">
                        {t.careers.attorney.language}
                      </span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {language === 'zh' ? '岗位职责' : 'Responsibilities'}
                    </h4>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      {t.careers.attorney.responsibilities.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {language === 'zh' ? '任职要求' : 'Requirements'}
                    </h4>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      {t.careers.attorney.requirements.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="lg:ml-8">
                  <a
                    href={`mailto:hr@usfactorybridge.com?subject=Application: ${t.careers.attorney.title}`}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors"
                  >
                    <Mail size={20} />
                    {t.careers.apply}
                  </a>
                </div>
              </div>
            </div>

            {/* Position 2: U.S. CPA */}
            <div className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Briefcase className="w-6 h-6 text-orange-600" />
                    <h3 className="text-xl font-bold text-gray-900">{t.careers.cpa.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{t.careers.cpa.description}</p>

                  <div className="flex flex-wrap gap-4 mb-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock size={18} />
                      <span>{t.careers.cpa.type}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin size={18} />
                      <span>{t.careers.cpa.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">
                        {t.careers.cpa.language}
                      </span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {language === 'zh' ? '岗位职责' : 'Responsibilities'}
                    </h4>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      {t.careers.cpa.responsibilities.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {language === 'zh' ? '任职要求' : 'Requirements'}
                    </h4>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      {t.careers.cpa.requirements.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="lg:ml-8">
                  <a
                    href={`mailto:hr@usfactorybridge.com?subject=Application: ${t.careers.cpa.title}`}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors"
                  >
                    <Mail size={20} />
                    {t.careers.apply}
                  </a>
                </div>
              </div>
            </div>

            {/* Position 3: U.S. Local Partner - Full Details */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-8 text-white">
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <Briefcase className="w-6 h-6 text-orange-400" />
                  <h3 className="text-xl font-bold">{t.careers.partner.title}</h3>
                </div>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-gray-300">
                    <Clock size={18} />
                    <span>{t.careers.partner.type}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <MapPin size={18} />
                    <span>{t.careers.partner.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-orange-500/20 text-orange-400 rounded-full text-sm">
                      {t.careers.partner.language}
                    </span>
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                      {t.careers.partner.model}
                    </span>
                  </div>
                </div>
              </div>

              {/* Why We Need You */}
              <div className="mb-6">
                <h4 className="font-semibold text-orange-400 mb-2">{t.careers.partner.whyTitle}</h4>
                <p className="text-gray-300 text-sm">{t.careers.partner.whyDesc}</p>
              </div>

              {/* Responsibilities */}
              <div className="mb-6">
                <h4 className="font-semibold text-orange-400 mb-2">{t.careers.partner.responsibilities.title}</h4>
                <ul className="space-y-2">
                  {t.careers.partner.responsibilities.items.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-300 text-sm">
                      <CheckCircle size={16} className="text-orange-400 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Requirements */}
              <div className="mb-6">
                <h4 className="font-semibold text-orange-400 mb-2">{t.careers.partner.requirements.title}</h4>
                <ul className="space-y-2">
                  {t.careers.partner.requirements.items.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-300 text-sm">
                      <CheckCircle size={16} className="text-orange-400 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benefits */}
              <div className="mb-6">
                <h4 className="font-semibold text-orange-400 mb-2">{t.careers.partner.benefits.title}</h4>
                <ul className="space-y-2">
                  {t.careers.partner.benefits.items.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-300 text-sm">
                      <CheckCircle size={16} className="text-orange-400 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Process */}
              <div className="mb-6">
                <h4 className="font-semibold text-orange-400 mb-2">{t.careers.partner.process.title}</h4>
                <ol className="space-y-2">
                  {t.careers.partner.process.items.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-300 text-sm">
                      <span className="w-5 h-5 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs flex-shrink-0">
                        {index + 1}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Apply Button */}
              <a
                href="mailto:hr@usfactorybridge.com?subject=Application: U.S. Local Partner"
                className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors"
              >
                <Mail size={20} />
                {t.careers.apply}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {language === 'zh' ? '还有其他问题？' : 'Have More Questions?'}
          </h2>
          <p className="text-gray-600 mb-6">
            {t.careers.email}: hr@usfactorybridge.com
          </p>
          <a
            href="mailto:hr@usfactorybridge.com"
            className="inline-flex items-center gap-2 px-8 py-4 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors"
          >
            <Mail size={20} />
            {language === 'zh' ? '发送邮件' : 'Send Email'}
          </a>
        </div>
      </section>
    </div>
  );
};
