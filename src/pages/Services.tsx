import React from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Building2, Store, Truck, Users, Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Services: React.FC = () => {
  const { t, language } = useLanguage();

  const service1Table = [
    { service: t.servicesPage.service1.table.companyReg, usa: t.servicesPage.service1.table.usaReg, mx: t.servicesPage.service1.table.mxReg },
    { service: t.servicesPage.service1.table.bankAccount, usa: t.servicesPage.service1.table.usaBank, mx: t.servicesPage.service1.table.mxBank },
    { service: t.servicesPage.service1.table.taxFiling, usa: t.servicesPage.service1.table.usaTax, mx: t.servicesPage.service1.table.mxTax },
    { service: t.servicesPage.service1.table.annualReview, usa: t.servicesPage.service1.table.usaAnnual, mx: t.servicesPage.service1.table.mxAnnual },
    { service: t.servicesPage.service1.table.companyClose, usa: t.servicesPage.service1.table.usaClose, mx: t.servicesPage.service1.table.mxClose },
  ];

  const categories = language === 'zh'
    ? ['汽摩配件', '宠物智能用品', '家居智能', '医疗保健', '五金工具', '户外运动', '实验室耗材', '工业与科学用品']
    : ['Auto Parts', 'Smart Pet Products', 'Smart Home', 'Healthcare', 'Hardware Tools', 'Outdoor Sports', 'Lab Supplies', 'Industrial & Scientific'];

  const fulfillment = language === 'zh'
    ? ['一件代发', '本土仓一件代发', '批量采购']
    : ['Dropshipping', 'Local Warehouse Dropshipping', 'Bulk Procurement'];

  const supplyAdvantage = language === 'zh'
    ? ['物流协同、灵活交付', '价格优势、售后保障']
    : ['Logistics coordination, flexible delivery', 'Price advantages, after-sales guarantee'];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t.nav.services}
            </h1>
            <p className="text-xl text-blue-100">
              {language === 'zh' ? '全方位跨境服务，助力您的业务腾飞' : 'Full-range cross-border services to accelerate your business'}
            </p>
          </div>
        </div>
      </section>

      {/* Service 1: Company Services */}
      <section id="company" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t.servicesPage.service1.title}
            </h2>
            <p className="text-lg text-gray-600">
              {t.servicesPage.service1.subtitle}
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-b">{t.servicesPage.service1.table.service}</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-b">{t.servicesPage.service1.table.usa}</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-b">{t.servicesPage.service1.table.mexico}</th>
                </tr>
              </thead>
              <tbody>
                {service1Table.map((row, index) => (
                  <tr key={index} className="border-b">
                    <td className="px-6 py-4 text-sm text-gray-900">{row.service}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{row.usa}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{row.mx}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-6 text-center text-sm text-gray-500">
            {t.servicesPage.service1.note}
          </p>
        </div>
      </section>

      {/* Service 2: Store Solutions */}
      <section id="store" className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Store className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t.servicesPage.service2.title}
            </h2>
            <p className="text-lg text-gray-600">
              {t.servicesPage.service2.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {t.servicesPage.service2.features.talent.title}
              </h3>
              <p className="text-gray-600">
                {t.servicesPage.service2.features.talent.desc}
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {t.servicesPage.service2.features.structure.title}
              </h3>
              <p className="text-gray-600">
                {t.servicesPage.service2.features.structure.desc}
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {t.servicesPage.service2.features.mechanism.title}
              </h3>
              <p className="text-gray-600">
                {t.servicesPage.service2.features.mechanism.desc}
              </p>
            </div>
          </div>

          <p className="mt-8 text-center text-lg text-blue-900 font-medium">
            {t.servicesPage.service2.result}
          </p>
        </div>
      </section>

      {/* Service 3: Supply Chain */}
      <section id="supply" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t.servicesPage.service3.title}
            </h2>
            <p className="text-lg text-gray-600">
              {t.servicesPage.service3.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {t.servicesPage.service3.categories.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                    {cat}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {t.servicesPage.service3.fulfillment.title}
              </h3>
              <ul className="space-y-2">
                {fulfillment.map((item, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-700">
                    <Check className="w-5 h-5 text-green-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {t.servicesPage.service3.quality.title}
              </h3>
              <p className="text-gray-700">
                {t.servicesPage.service3.quality.desc}
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {t.servicesPage.service3.advantage.title}
              </h3>
              <ul className="space-y-2">
                {supplyAdvantage.map((item, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-700">
                    <Check className="w-5 h-5 text-green-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Service 4: Ecosystem */}
      <section id="ecosystem" className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t.servicesPage.service4.title}
            </h2>
            <p className="text-lg text-gray-600">
              {t.servicesPage.service4.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t.servicesPage.service4.mcn.title}
              </h3>
              <p className="text-gray-600">
                {t.servicesPage.service4.mcn.desc}
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t.servicesPage.service4.influencer.title}
              </h3>
              <p className="text-gray-600">
                {t.servicesPage.service4.influencer.desc}
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t.servicesPage.service4.logistics.title}
              </h3>
              <p className="text-gray-600">
                {t.servicesPage.service4.logistics.desc}
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t.servicesPage.service4.payment.title}
              </h3>
              <p className="text-gray-600">
                {t.servicesPage.service4.payment.desc}
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t.servicesPage.service4.legal.title}
              </h3>
              <p className="text-gray-600">
                {t.servicesPage.service4.legal.desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {language === 'zh' ? '准备好开始了吗？' : 'Ready to Get Started?'}
          </h2>
          <p className="text-lg text-blue-100 mb-8">
            {language === 'zh' ? '立即提交入驻申请，开启您的跨境之旅' : 'Submit your application now and start your cross-border journey'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/seller-register"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-900 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
            >
              {language === 'zh' ? '中国卖家入驻' : 'China Seller Registration'}
              <ArrowRight size={20} />
            </Link>
            <Link
              to="/factory-register"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
            >
              {language === 'zh' ? '工厂入驻' : 'Factory Registration'}
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
