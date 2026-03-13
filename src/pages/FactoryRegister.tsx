import React, { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { useAdmin } from '@/store/AdminContext';
import { Send, CheckCircle, Plus, Trash2 } from 'lucide-react';

interface Certificate {
  type: string;
  number: string;
}

// 数据转换函数 - 将表单数据转换为数据库格式
const convertToDbFormat = (formData: any, certificates: Certificate[]) => {
  return {
    factory_name_en: formData.factoryNameEn || '',
    factory_name_cn: formData.factoryNameCn || '',
    register_country: formData.registerCountry || '',
    register_address: formData.registerAddress || '',
    tax_id: formData.taxId || '',
    contact_name: formData.contactName || '',
    phone: formData.phone || '',
    email: formData.email || '',
    website: formData.website || '',
    product_categories: formData.productCategories || [],
    product_desc: formData.productDesc || '',
    has_cert: formData.hasCert || '',
    certificates: certificates.filter(cert => cert.type && cert.number),
    moq: formData.moq || '',
    lead_time: formData.leadTime || '',
    capacity: formData.capacity || '',
    has_local_stock: formData.hasLocalStock || '',
    shipping_methods: formData.shippingMethods || [],
    sample_order: formData.sampleOrder || '',
    brand_service: formData.brandService || '',
    other_info: formData.otherInfo || '',
  };
};

export const FactoryRegister: React.FC = () => {
  const { t, language } = useLanguage();
  const { addFactorySubmission } = useAdmin();
  const [submitted, setSubmitted] = useState(false);
  const [certificates, setCertificates] = useState<Certificate[]>([
    { type: '', number: '' }
  ]);
  const [formData, setFormData] = useState({
    factoryNameEn: '',
    factoryNameCn: '',
    registerCountry: '',
    registerAddress: '',
    taxId: '',
    contactName: '',
    phone: '',
    email: '',
    website: '',
    productCategories: [] as string[],
    productDesc: '',
    hasCert: '',
    moq: '',
    leadTime: '',
    capacity: '',
    hasLocalStock: '',
    shippingMethods: [] as string[],
    sampleOrder: '',
    brandService: '',
    otherInfo: '',
    agreeTerms: false,
  });

  const productCategories = language === 'zh'
    ? ['汽摩配件', '宠物智能用品', '家居智能', '医疗保健', '五金工具', '户外运动', '实验室耗材', '工业与科学用品', '母婴用品', '儿童玩具', '日用家居', '其他']
    : ['Auto Parts', 'Smart Pet Products', 'Smart Home', 'Healthcare', 'Hardware Tools', 'Outdoor Sports', 'Lab Supplies', 'Industrial & Scientific', 'Maternal & Baby', 'Toys', 'Household', 'Other'];

  const certTypes = language === 'zh'
    ? ['FCC', 'CE', 'UL', 'FDA', 'RoHS', 'ISO', 'BSCI', '其他']
    : ['FCC', 'CE', 'UL', 'FDA', 'RoHS', 'ISO', 'BSCI', 'Other'];

  const addCertificate = () => {
    setCertificates([...certificates, { type: '', number: '' }]);
  };

  const removeCertificate = (index: number) => {
    setCertificates(certificates.filter((_, i) => i !== index));
  };

  const updateCertificate = (index: number, field: 'type' | 'number', value: string) => {
    const updated = [...certificates];
    updated[index][field] = value;
    setCertificates(updated);
  };

  const shippingMethods = language === 'zh'
    ? ['一件代发', '本土仓发货', 'FBA补货', '大宗贸易']
    : ['Dropshipping', 'Local Warehouse Shipping', 'FBA Restocking', 'Bulk Trade'];

  const handleCheckboxChange = (field: 'productCategories' | 'shippingMethods', value: string) => {
    setFormData(prev => {
      const current = prev[field] as string[];
      if (current.includes(value)) {
        return { ...prev, [field]: current.filter(item => item !== value) };
      } else {
        return { ...prev, [field]: [...current, value] };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 转换为数据库格式
    const dbData = convertToDbFormat(formData, certificates);
    addFactorySubmission(dbData);
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
                ? '感谢您的提交，我们将在审核后与您联系。'
                : 'Thank you for your submission. We will contact you after review.'}
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
            {t.forms.factory.title}
          </h1>
          <p className="text-lg text-orange-100 max-w-2xl mx-auto">
            {t.forms.factory.description}
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
                {language === 'zh' ? '公司信息' : 'Company Information'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.forms.factory.factoryNameEn} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.factoryNameEn}
                    onChange={(e) => setFormData({ ...formData, factoryNameEn: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.forms.factory.factoryNameCn}
                  </label>
                  <input
                    type="text"
                    value={formData.factoryNameCn}
                    onChange={(e) => setFormData({ ...formData, factoryNameCn: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.forms.factory.registerCountry} *
                  </label>
                  <select
                    required
                    value={formData.registerCountry}
                    onChange={(e) => setFormData({ ...formData, registerCountry: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="">{language === 'zh' ? '请选择' : 'Please select'}</option>
                    <option value="USA">{language === 'zh' ? '美国' : 'USA'}</option>
                    <option value="Mexico">{language === 'zh' ? '墨西哥' : 'Mexico'}</option>
                    <option value="Other">{language === 'zh' ? '其他' : 'Other'}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.forms.factory.taxId} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.taxId}
                    onChange={(e) => setFormData({ ...formData, taxId: e.target.value })}
                    placeholder={language === 'zh' ? '如：美国EIN、墨西哥RFC' : 'e.g., US EIN, Mexico RFC'}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.forms.factory.registerAddress} *
                </label>
                <input
                  type="text"
                  required
                  value={formData.registerAddress}
                  onChange={(e) => setFormData({ ...formData, registerAddress: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
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
                    {t.forms.factory.contactName} *
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
                    {t.forms.factory.phone} *
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
                    {t.forms.factory.email} *
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
                    {t.forms.factory.website}
                  </label>
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    placeholder="https://"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">
                {language === 'zh' ? '产品信息' : 'Product Information'}
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.forms.factory.productCategory} *
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.forms.factory.productDesc} *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={formData.productDesc}
                    onChange={(e) => setFormData({ ...formData, productDesc: e.target.value })}
                    placeholder={language === 'zh' ? '请简要列出主要产品' : 'Please list main products'}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t.forms.factory.moq}
                    </label>
                    <input
                      type="text"
                      value={formData.moq}
                      onChange={(e) => setFormData({ ...formData, moq: e.target.value })}
                      placeholder={language === 'zh' ? '例如：100件' : 'e.g., 100 pcs'}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t.forms.factory.leadTime}
                    </label>
                    <input
                      type="text"
                      value={formData.leadTime}
                      onChange={(e) => setFormData({ ...formData, leadTime: e.target.value })}
                      placeholder={language === 'zh' ? '例如：7-15天' : 'e.g., 7-15 days'}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t.forms.factory.capacity}
                    </label>
                    <input
                      type="text"
                      value={formData.capacity}
                      onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                      placeholder={language === 'zh' ? '例如：10000件' : 'e.g., 10000 pcs'}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Certification */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">
                {language === 'zh' ? '认证信息' : 'Certification Information'}
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.forms.factory.hasCert} *
                  </label>
                  <select
                    required
                    value={formData.hasCert}
                    onChange={(e) => setFormData({ ...formData, hasCert: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="">{language === 'zh' ? '请选择' : 'Please select'}</option>
                    <option value="yes">{language === 'zh' ? '是' : 'Yes'}</option>
                    <option value="no">{language === 'zh' ? '否' : 'No'}</option>
                  </select>
                </div>
                {formData.hasCert === 'yes' && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <label className="block text-sm font-medium text-gray-700">
                        {language === 'zh' ? '资质证书' : 'Certificates'}
                      </label>
                      <button
                        type="button"
                        onClick={addCertificate}
                        className="flex items-center gap-1 text-sm text-orange-600 hover:text-orange-700"
                      >
                        <Plus size={16} />
                        {language === 'zh' ? '添加证书' : 'Add Certificate'}
                      </button>
                    </div>
                    {certificates.map((cert, index) => (
                      <div key={index} className="flex gap-4 items-start">
                        <div className="flex-1">
                          <select
                            value={cert.type}
                            onChange={(e) => updateCertificate(index, 'type', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          >
                            <option value="">{language === 'zh' ? '选择证书类型' : 'Select Certificate Type'}</option>
                            {certTypes.map((type) => (
                              <option key={type} value={type}>{type}</option>
                            ))}
                          </select>
                        </div>
                        <div className="flex-1">
                          <input
                            type="text"
                            value={cert.number}
                            onChange={(e) => updateCertificate(index, 'number', e.target.value)}
                            placeholder={language === 'zh' ? '证书编号/认证号' : 'Certificate Number'}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          />
                        </div>
                        {certificates.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeCertificate(index)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                          >
                            <Trash2 size={18} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Logistics */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">
                {language === 'zh' ? '物流信息' : 'Logistics Information'}
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.forms.factory.hasLocalStock} *
                  </label>
                  <select
                    required
                    value={formData.hasLocalStock}
                    onChange={(e) => setFormData({ ...formData, hasLocalStock: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="">{language === 'zh' ? '请选择' : 'Please select'}</option>
                    <option value="usa">{language === 'zh' ? '是，美国本土仓' : 'Yes, US Warehouse'}</option>
                    <option value="mexico">{language === 'zh' ? '是，墨西哥本土仓' : 'Yes, Mexico Warehouse'}</option>
                    <option value="both">{language === 'zh' ? '是，两国均有' : 'Yes, Both'}</option>
                    <option value="none">{language === 'zh' ? '暂无本土库存' : 'No Local Stock'}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.forms.factory.shippingMethods} *
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {shippingMethods.map((method) => (
                      <label key={method} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.shippingMethods.includes(method)}
                          onChange={() => handleCheckboxChange('shippingMethods', method)}
                          className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                        />
                        <span className="text-sm text-gray-700">{method}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t.forms.factory.sampleOrder}
                    </label>
                    <select
                      value={formData.sampleOrder}
                      onChange={(e) => setFormData({ ...formData, sampleOrder: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    >
                      <option value="">{language === 'zh' ? '请选择' : 'Please select'}</option>
                      <option value="accept">{language === 'zh' ? '接受' : 'Accept'}</option>
                      <option value="notAccept">{language === 'zh' ? '不接受' : 'Not Accept'}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t.forms.factory.brandService}
                    </label>
                    <select
                      value={formData.brandService}
                      onChange={(e) => setFormData({ ...formData, brandService: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    >
                      <option value="">{language === 'zh' ? '请选择' : 'Please select'}</option>
                      <option value="have">{language === 'zh' ? '有' : 'Have'}</option>
                      <option value="none">{language === 'zh' ? '无' : 'None'}</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.forms.factory.otherInfo}
                  </label>
                  <textarea
                    rows={3}
                    value={formData.otherInfo}
                    onChange={(e) => setFormData({ ...formData, otherInfo: e.target.value })}
                    placeholder={language === 'zh' ? '如工厂优势、合作过的客户等' : 'e.g., Factory advantages, past clients'}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
              </div>
            </div>

            {/* Agreement */}
            <div className="pt-4 border-t">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={formData.agreeTerms}
                  onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                  className="w-5 h-5 text-orange-600 border-gray-300 rounded focus:ring-orange-500 mt-0.5"
                />
                <span className="text-sm text-gray-700">
                  {t.forms.factory.agreeTerms}
                </span>
              </label>
            </div>

            {/* Submit */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors"
              >
                <Send size={20} />
                {t.forms.factory.submit}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};
