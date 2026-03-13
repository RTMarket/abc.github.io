import React, { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { useAdmin } from '@/store/AdminContext';
import { Send, CheckCircle } from 'lucide-react';

// 数据转换函数 - 将表单数据转换为数据库格式
const convertToDbFormat = (formData: any) => {
  return {
    company_name_cn: formData.companyNameCn || '',
    company_name_en: formData.companyNameEn || '',
    unified_code: formData.unifiedCode || '',
    contact_name: formData.contactName || '',
    phone: formData.phone || '',
    email: formData.email || '',
    wechat: formData.wechat || '',
    current_platforms: formData.currentPlatforms || [],
    target_platforms: formData.targetPlatforms || [],
    us_store_count: formData.usStoreCount || '',
    mx_store_count: formData.mxStoreCount || '',
    need_partner: formData.needPartner || '',
    need_us_bank: formData.needUsBank || '',
    need_mx_bank: formData.needMxBank || '',
    monthly_sales: formData.monthlySales || '',
    product_categories: formData.productCategories || [],
    overseas_warehouse: formData.overseasWarehouse || '',
    warehouse_funds: formData.warehouseFunds || '',
    need_supply_chain: formData.needSupplyChain || '',
    need_mcn: formData.needMcn || '',
    need_logistics: formData.needLogistics || '',
    need_payment: formData.needPayment || '',
    service_plan: formData.servicePlan || '',
    budget: formData.budget || '',
    other_needs: formData.otherNeeds || '',
  };
};

export const SellerRegister: React.FC = () => {
  const { t, language } = useLanguage();
  const { addSellerSubmission } = useAdmin();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    companyNameCn: '',
    companyNameEn: '',
    unifiedCode: '',
    contactName: '',
    phone: '',
    email: '',
    wechat: '',
    currentPlatforms: [] as string[],
    targetPlatforms: [] as string[],
    usStoreCount: '',
    mxStoreCount: '',
    needPartner: '',
    needUsBank: '',
    needMxBank: '',
    monthlySales: '',
    productCategories: [] as string[],
    overseasWarehouse: '',
    warehouseFunds: '',
    needSupplyChain: '',
    needMcn: '',
    needLogistics: '',
    needPayment: '',
    servicePlan: '',
    budget: '',
    otherNeeds: '',
    agreePrivacy: false,
  });

  const platforms = ['TikTok Shop', 'TEMU', 'SHEIN', 'Amazon', language === 'zh' ? '其他' : 'Other'];
  const productCategories = language === 'zh'
    ? ['汽摩配件', '宠物智能用品', '家居智能', '医疗保健', '五金工具', '户外运动', '实验室耗材', '工业与科学用品', '母婴用品', '儿童玩具', '日用家居', '其他']
    : ['Auto Parts', 'Smart Pet Products', 'Smart Home', 'Healthcare', 'Hardware Tools', 'Outdoor Sports', 'Lab Supplies', 'Industrial & Scientific', 'Maternal & Baby', 'Toys', 'Household', 'Other'];

  const handleCheckboxChange = (field: 'currentPlatforms' | 'targetPlatforms' | 'productCategories', value: string) => {
    setFormData(prev => {
      const current = prev[field] as string[];
      if (current.includes(value)) {
        return { ...prev, [field]: current.filter(item => item !== value) };
      } else {
        return { ...prev, [field]: [...current, value] };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { agreePrivacy, ...submissionData } = formData;
      // 转换为数据库格式
      const dbData = convertToDbFormat(submissionData);
      await addSellerSubmission(dbData);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Form submission error:', error);
      alert(language === 'zh' ? '提交失败，请稍后重试' : 'Submission failed, please try again');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen pt-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 py-24 text-center">
          <div className="bg-white rounded-xl p-12 shadow-sm">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t.common.success}
            </h2>
            <p className="text-gray-600 mb-8">
              {language === 'zh'
                ? '感谢您的提交，我们的顾问将尽快与您联系。'
                : 'Thank you for your submission. Our consultant will contact you soon.'}
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors"
            >
              {language === 'zh' ? '提交另一份' : 'Submit Another'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-orange-900 via-orange-800 to-orange-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {t.forms.seller.title}
          </h1>
          <p className="text-lg text-orange-100 max-w-2xl mx-auto">
            {t.forms.seller.description}
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit} className="bg-white rounded-xl p-8 shadow-sm space-y-8">

            {/* Company Info */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">
                {language === 'zh' ? '企业信息' : 'Company Information'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.forms.seller.companyNameCn} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.companyNameCn}
                    onChange={(e) => setFormData({ ...formData, companyNameCn: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.forms.seller.companyNameEn}
                  </label>
                  <input
                    type="text"
                    value={formData.companyNameEn}
                    onChange={(e) => setFormData({ ...formData, companyNameEn: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.forms.seller.unifiedCode} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.unifiedCode}
                    onChange={(e) => setFormData({ ...formData, unifiedCode: e.target.value })}
                    placeholder={language === 'zh' ? '统一社会信用代码' : 'Unified Social Credit Code'}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">
                {language === 'zh' ? '联系方式' : 'Contact Information'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.forms.seller.contactName} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.forms.seller.phone} *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.forms.seller.email} *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.forms.seller.wechat} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.wechat}
                    onChange={(e) => setFormData({ ...formData, wechat: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
              </div>
            </div>

            {/* Platform Info */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">
                {language === 'zh' ? '平台信息' : 'Platform Information'}
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.forms.seller.currentPlatforms}
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {platforms.map((platform) => (
                      <label key={platform} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.currentPlatforms.includes(platform)}
                          onChange={() => handleCheckboxChange('currentPlatforms', platform)}
                          className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                        />
                        <span className="text-sm text-gray-700">{platform}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.forms.seller.targetPlatforms}
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {platforms.map((platform) => (
                      <label key={platform} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.targetPlatforms.includes(platform)}
                          onChange={() => handleCheckboxChange('targetPlatforms', platform)}
                          className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                        />
                        <span className="text-sm text-gray-700">{platform}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t.forms.seller.usStoreCount} *
                    </label>
                    <select
                      required
                      value={formData.usStoreCount}
                      onChange={(e) => setFormData({ ...formData, usStoreCount: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    >
                      <option value="">{language === 'zh' ? '请选择' : 'Please select'}</option>
                      <option value="0">0</option>
                      <option value="1-3">1-3</option>
                      <option value="4-10">4-10</option>
                      <option value="10+">10+</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t.forms.seller.mxStoreCount} *
                    </label>
                    <select
                      required
                      value={formData.mxStoreCount}
                      onChange={(e) => setFormData({ ...formData, mxStoreCount: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    >
                      <option value="">{language === 'zh' ? '请选择' : 'Please select'}</option>
                      <option value="0">0</option>
                      <option value="1-3">1-3</option>
                      <option value="4-10">4-10</option>
                      <option value="10+">10+</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Needs */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">
                {language === 'zh' ? '需求选择' : 'Service Needs'}
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t.forms.seller.needPartner} *
                    </label>
                    <select
                      required
                      value={formData.needPartner}
                      onChange={(e) => setFormData({ ...formData, needPartner: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    >
                      <option value="">{language === 'zh' ? '请选择' : 'Please select'}</option>
                      <option value="yes">{language === 'zh' ? '是' : 'Yes'}</option>
                      <option value="no">{language === 'zh' ? '否' : 'No'}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t.forms.seller.needUsBank} *
                    </label>
                    <select
                      required
                      value={formData.needUsBank}
                      onChange={(e) => setFormData({ ...formData, needUsBank: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    >
                      <option value="">{language === 'zh' ? '请选择' : 'Please select'}</option>
                      <option value="yes">{language === 'zh' ? '是' : 'Yes'}</option>
                      <option value="no">{language === 'zh' ? '否' : 'No'}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t.forms.seller.needMxBank} *
                    </label>
                    <select
                      required
                      value={formData.needMxBank}
                      onChange={(e) => setFormData({ ...formData, needMxBank: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    >
                      <option value="">{language === 'zh' ? '请选择' : 'Please select'}</option>
                      <option value="yes">{language === 'zh' ? '是' : 'Yes'}</option>
                      <option value="no">{language === 'zh' ? '否' : 'No'}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t.forms.seller.monthlySales}
                    </label>
                    <select
                      value={formData.monthlySales}
                      onChange={(e) => setFormData({ ...formData, monthlySales: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    >
                      <option value="">{language === 'zh' ? '请选择' : 'Please select'}</option>
                      <option value="less1w">{language === 'zh' ? '小于1万' : 'Less than 10K'}</option>
                      <option value="1w_5w">{language === 'zh' ? '1-5万' : '10K-50K'}</option>
                      <option value="5w_10w">{language === 'zh' ? '5-10万' : '50K-100K'}</option>
                      <option value="10w_30w">{language === 'zh' ? '10-30万' : '100K-300K'}</option>
                      <option value="more30w">{language === 'zh' ? '30万以上' : 'More than 300K'}</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Categories */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">
                {language === 'zh' ? '产品品类' : 'Product Categories'}
              </h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.forms.seller.productCategories} *
                </label>
                <div className="flex flex-wrap gap-3">
                  {productCategories.map((category) => (
                    <label key={category} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.productCategories.includes(category)}
                        onChange={() => handleCheckboxChange('productCategories', category)}
                        className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                      />
                      <span className="text-sm text-gray-700">{category}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Warehouse */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">
                {language === 'zh' ? '海外仓信息' : 'Overseas Warehouse'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.forms.seller.overseasWarehouse} *
                  </label>
                  <select
                    required
                    value={formData.overseasWarehouse}
                    onChange={(e) => setFormData({ ...formData, overseasWarehouse: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="">{language === 'zh' ? '请选择' : 'Please select'}</option>
                    <option value="have">{language === 'zh' ? '已有海外仓' : 'Have Warehouse'}</option>
                    <option value="plan">{language === 'zh' ? '计划备货' : 'Planning'}</option>
                    <option value="none">{language === 'zh' ? '暂无备货' : 'No Plan'}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.forms.seller.warehouseFunds}
                  </label>
                  <select
                    value={formData.warehouseFunds}
                    onChange={(e) => setFormData({ ...formData, warehouseFunds: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="">{language === 'zh' ? '请选择' : 'Please select'}</option>
                    <option value="less1w">{language === 'zh' ? '小于1万' : 'Less than 10K'}</option>
                    <option value="1w_10w">{language === 'zh' ? '1-10万' : '10K-100K'}</option>
                    <option value="10w_50w">{language === 'zh' ? '10-50万' : '100K-500K'}</option>
                    <option value="more50w">{language === 'zh' ? '50万以上' : 'More than 500K'}</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Additional Services */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">
                {language === 'zh' ? '附加服务需求' : 'Additional Services'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.forms.seller.needSupplyChain}
                  </label>
                  <select
                    value={formData.needSupplyChain}
                    onChange={(e) => setFormData({ ...formData, needSupplyChain: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="">{language === 'zh' ? '请选择' : 'Please select'}</option>
                    <option value="yes">{language === 'zh' ? '需要' : 'Need'}</option>
                    <option value="no">{language === 'zh' ? '不需要' : 'No Need'}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.forms.seller.needMcn}
                  </label>
                  <select
                    value={formData.needMcn}
                    onChange={(e) => setFormData({ ...formData, needMcn: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="">{language === 'zh' ? '请选择' : 'Please select'}</option>
                    <option value="yes">{language === 'zh' ? '需要' : 'Need'}</option>
                    <option value="no">{language === 'zh' ? '不需要' : 'No Need'}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.forms.seller.needLogistics}
                  </label>
                  <select
                    value={formData.needLogistics}
                    onChange={(e) => setFormData({ ...formData, needLogistics: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="">{language === 'zh' ? '请选择' : 'Please select'}</option>
                    <option value="yes">{language === 'zh' ? '需要' : 'Need'}</option>
                    <option value="no">{language === 'zh' ? '不需要' : 'No Need'}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.forms.seller.needPayment}
                  </label>
                  <select
                    value={formData.needPayment}
                    onChange={(e) => setFormData({ ...formData, needPayment: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="">{language === 'zh' ? '请选择' : 'Please select'}</option>
                    <option value="yes">{language === 'zh' ? '需要' : 'Need'}</option>
                    <option value="no">{language === 'zh' ? '不需要' : 'No Need'}</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Service Plan & Budget */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">
                {language === 'zh' ? '服务方案' : 'Service Plan'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.forms.seller.servicePlan}
                  </label>
                  <select
                    value={formData.servicePlan}
                    onChange={(e) => setFormData({ ...formData, servicePlan: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="">{language === 'zh' ? '请选择' : 'Please select'}</option>
                    <option value="planA">{language === 'zh' ? '方案A（基础版）' : 'Plan A (Basic)'}</option>
                    <option value="planB">{language === 'zh' ? '方案B（进阶版）' : 'Plan B (Advanced)'}</option>
                    <option value="planC">{language === 'zh' ? '方案C（终极版）' : 'Plan C (Ultimate)'}</option>
                    <option value="notSure">{language === 'zh' ? '还不确定' : 'Not Sure'}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.forms.seller.budget}
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="">{language === 'zh' ? '请选择' : 'Please select'}</option>
                    <option value="less1w">{language === 'zh' ? '小于1万' : 'Less than 10K'}</option>
                    <option value="1w_5w">{language === 'zh' ? '1-5万' : '10K-50K'}</option>
                    <option value="5w_10w">{language === 'zh' ? '5-10万' : '50K-100K'}</option>
                    <option value="10w_30w">{language === 'zh' ? '10-30万' : '100K-300K'}</option>
                    <option value="more30w">{language === 'zh' ? '30万以上' : 'More than 300K'}</option>
                  </select>
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.forms.seller.otherNeeds}
                </label>
                <textarea
                  rows={3}
                  value={formData.otherNeeds}
                  onChange={(e) => setFormData({ ...formData, otherNeeds: e.target.value })}
                  placeholder={language === 'zh' ? '请补充其他需求...' : 'Please add any other requirements...'}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
            </div>

            {/* Agreement */}
            <div className="pt-4 border-t">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={formData.agreePrivacy}
                  onChange={(e) => setFormData({ ...formData, agreePrivacy: e.target.checked })}
                  className="w-5 h-5 text-orange-600 border-gray-300 rounded focus:ring-orange-500 mt-0.5"
                />
                <span className="text-sm text-gray-700">
                  {t.forms.seller.agreePrivacy}
                </span>
              </label>
            </div>

            {/* Submit */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50"
              >
                <Send size={20} />
                {isSubmitting ? (language === 'zh' ? '提交中...' : 'Submitting...') : t.forms.seller.submit}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};
