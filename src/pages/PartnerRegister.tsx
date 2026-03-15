import React, { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { useAdmin } from '@/store/AdminContext';
import { Send, CheckCircle } from 'lucide-react';

// Data conversion function
const convertToDbFormat = (formData: any) => {
  return {
    // Section 1: Basic Info
    title: formData.title || '',
    full_name_en: formData.fullNameEn || '',
    full_name_cn: formData.fullNameCn || '',
    dob: formData.dob || '',
    nationality: formData.nationality || '',
    identity_type: formData.identityType || '',
    residence_state: formData.residenceState || '',
    residence_city: formData.residenceCity || '',
    address: formData.address || '',
    phone: formData.phone || '',
    email: formData.email || '',
    telegram: formData.telegram || '',
    whatsapp: formData.whatsapp || '',
    emergency_contact_name: formData.emergencyContactName || '',
    emergency_contact_relation: formData.emergencyContactRelation || '',
    emergency_contact_phone: formData.emergencyContactPhone || '',

    // Section 2: Qualifications & Experience
    has_us_mx_company: formData.hasUsMxCompany || '',
    company_name: formData.companyName || '',
    company_type: formData.companyType || '',
    company_reg_date: formData.companyRegDate || '',
    company_reg_state: formData.companyRegState || '',
    company_business: formData.companyBusiness || '',
    has_physical_business: formData.hasPhysicalBusiness || '',
    annual_revenue: formData.annualRevenue || '',
    has_bank_account: formData.hasBankAccount || '',
    has_ecommerce_exp: formData.hasEcommerceExp || '',
    ecommerce_exp_detail: formData.ecommerceExpDetail || '',
    has_warehouse_logistics: formData.hasWarehouseLogistics || '',
    warehouse_logistics_detail: formData.warehouseLogisticsDetail || '',
    has_accounting_legal: formData.hasAccountingLegal || '',
    accounting_legal_detail: formData.accountingLegalDetail || '',

    // Section 3: Cooperation Intent
    target_seller_type: formData.targetSellerType || [],
    expected_store_count: formData.expectedStoreCount || '',
    expected_coop_model: formData.expectedCoopModel || [],
    expected_profit_share: formData.expectedProfitShare || '',
    accept_monthly_subsidy: formData.acceptMonthlySubsidy || '',
    weekly_available_time: formData.weeklyAvailableTime || '',
    coop_duration: formData.coopDuration || '',

    // Section 4: Other Info
    how_found_us: formData.howFoundUs || '',
    additional_questions: formData.additionalQuestions || '',
    cv_sent: formData.cvSent || '',

    // Section 5: Confirmation
    confirm_info: formData.confirmInfo || false,
    agree_privacy: formData.agreePrivacy || false,
  };
};

export const PartnerRegister: React.FC = () => {
  const { t, language } = useLanguage();
  const { addPartnerSubmission } = useAdmin();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    // Section 1
    title: '',
    fullNameEn: '',
    fullNameCn: '',
    dob: '',
    nationality: '',
    identityType: '',
    residenceState: '',
    residenceCity: '',
    address: '',
    phone: '',
    email: '',
    telegram: '',
    whatsapp: '',
    emergencyContactName: '',
    emergencyContactRelation: '',
    emergencyContactPhone: '',

    // Section 2
    hasUsMxCompany: '',
    companyName: '',
    companyType: '',
    companyRegDate: '',
    companyRegState: '',
    companyBusiness: '',
    hasPhysicalBusiness: '',
    annualRevenue: '',
    hasBankAccount: '',
    hasEcommerceExp: '',
    ecommerceExpDetail: '',
    hasWarehouseLogistics: '',
    warehouseLogisticsDetail: '',
    hasAccountingLegal: '',
    accountingLegalDetail: '',

    // Section 3
    targetSellerType: [] as string[],
    expectedStoreCount: '',
    expectedCoopModel: [] as string[],
    expectedProfitShare: '',
    acceptMonthlySubsidy: '',
    weeklyAvailableTime: '',
    coopDuration: '',

    // Section 4
    howFoundUs: '',
    additionalQuestions: '',
    cvSent: '',

    // Section 5
    confirmInfo: false,
    agreePrivacy: false,
  });

  const titles = language === 'zh'
    ? ['Mr.', 'Ms.', 'Mrs.', '其他']
    : ['Mr.', 'Ms.', 'Mrs.', 'Other'];

  const nationalities = language === 'zh'
    ? ['美国', '墨西哥', '其他']
    : ['USA', 'Mexico', 'Other'];

  const identityTypes = language === 'zh'
    ? ['公民', '永久居民', '其他']
    : ['Citizen', 'Permanent Resident', 'Other'];

  const companyTypes = ['LLC', 'INC', 'CORP', 'SAS', 'SRL', 'Other'];

  const revenueRanges = language === 'zh'
    ? ['小于10万美元', '10-50万美元', '50-100万美元', '100万美元以上', '无流水']
    : ['Under $100K', '$100K-$500K', '$500K-$1M', 'Over $1M', 'No Revenue'];

  const sellerTypes = language === 'zh'
    ? [
        '初阶卖家（试水期，月销<5万美元）',
        '中级卖家（成长期，月销5-10万美元）',
        '资深大卖（成熟期，月销>10万美元）',
        '都可以，没有特别偏好'
      ]
    : [
        'Entry-level Seller (Testing, <$50K/month)',
        'Mid-level Seller (Growing, $50K-$100K/month)',
        'Senior Seller (Mature, >$100K/month)',
        'No Preference'
      ];

  const coopModels = language === 'zh'
    ? [
        '作为注册成员（Member）配合注册',
        '提供现有公司（已存续）',
        '开立对公银行账户',
        '配合平台视频验证',
        '年度税务配合'
      ]
    : [
        'Serve as Registered Member',
        'Provide Existing Company',
        'Open Corporate Bank Account',
        'Platform Video Verification',
        'Annual Tax Cooperation'
      ];

  const timeOptions = language === 'zh'
    ? ['随时响应', '工作日白天', '工作日晚上', '周末', '需提前预约']
    : ['Always Available', 'Weekday Daytime', 'Weekday Evening', 'Weekends', 'Need Appointment'];

  const durationOptions = language === 'zh'
    ? ['短期（6个月以内）', '中期（6个月-1年）', '长期（1年以上）']
    : ['Short-term (Under 6 months)', 'Medium-term (6-12 months)', 'Long-term (Over 1 year)'];

  const foundUsOptions = language === 'zh'
    ? ['LinkedIn', 'Facebook', 'Instagram', '朋友推荐', '其他']
    : ['LinkedIn', 'Facebook', 'Instagram', 'Friend Referral', 'Other'];

  const cvSentOptions = language === 'zh'
    ? [
        '是，我已发送至 hr@usfactorybridge.com',
        '否，我将在此表单提交后发送',
        '我没有简历，但以上信息已完整'
      ]
    : [
        'Yes, I sent to hr@usfactorybridge.com',
        'No, I will send after submitting this form',
        'No resume, but information is complete'
      ];

  const handleCheckboxChange = (field: 'targetSellerType' | 'expectedCoopModel', value: string) => {
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
      const { confirmInfo, agreePrivacy, ...submissionData } = formData;
      const dbData = convertToDbFormat(submissionData);
      await addPartnerSubmission(dbData);
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
                ? '感谢您的提交，我们的合伙人招募专员将在3-5个工作日内与您联系。'
                : 'Thank you for your submission. Our partner recruitment specialist will contact you within 3-5 business days.'}
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
            {language === 'zh' ? '成为我们的本土合伙人' : 'Join Us as a Local Partner'}
          </h1>
          <p className="text-lg text-orange-100 max-w-2xl mx-auto">
            {language === 'zh'
              ? '感谢您有兴趣成为我们的本土合伙人！请填写以下信息，帮助我们更好地了解您。我们将在收到申请后3-5个工作日内与您联系。所有信息将严格保密。'
              : 'Thank you for your interest in becoming our local partner! Please fill in the information below to help us better understand you. We will contact you within 3-5 business days after receiving your application. All information will be kept strictly confidential.'}
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit} className="bg-white rounded-xl p-8 shadow-sm space-y-8">

            {/* Intro */}
            <div className="bg-orange-50 rounded-lg p-6">
              <h3 className="font-semibold text-orange-900 mb-3">
                {language === 'zh' ? '欢迎申请成为我们的本土合伙人！' : 'Welcome to Apply as Our Local Partner!'}
              </h3>
              <p className="text-sm text-orange-800 mb-4">
                {language === 'zh'
                  ? '我们正在寻找美国/墨西哥本地的合作伙伴，共同开展合规的跨境电商业务。作为合伙人，您将：'
                  : 'We are looking for local partners in the US/Mexico to jointly carry out compliant cross-border e-commerce business. As a partner, you will:'}
              </p>
              <ul className="list-disc list-inside text-sm text-orange-800 space-y-1">
                <li>{language === 'zh' ? '作为美国/墨西哥公司的注册成员，协助完成公司设立和平台验证' : 'Serve as a registered member of US/Mexico company, assist with company setup and platform verification'}</li>
                <li>{language === 'zh' ? '获得月度固定补贴 + 店铺利润分成' : 'Get monthly fixed subsidy + store profit sharing'}</li>
                <li>{language === 'zh' ? '与专业的中国运营团队合作，无需投入资金' : 'Cooperate with professional Chinese operation team, no capital investment required'}</li>
              </ul>
              <p className="text-sm text-orange-800 mt-4">
                {language === 'zh'
                  ? '填写此表单约需10分钟。提交后，我们的合伙人招募专员将在3-5个工作日内通过Telegram或邮件与您联系。'
                  : 'Filling out this form takes about 10 minutes. After submission, our partner recruitment specialist will contact you via Telegram or email within 3-5 business days.'}
              </p>
            </div>

            {/* Section 1: Basic Info */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">
                {language === 'zh' ? '第一部分：基本信息' : 'Section 1: Basic Information'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {language === 'zh' ? '称呼' : 'Title'}
                  </label>
                  <select
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="">{language === 'zh' ? '请选择' : 'Please select'}</option>
                    {titles.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {language === 'zh' ? '全名（英文）*' : 'Full Name (English) *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullNameEn}
                    onChange={(e) => setFormData({ ...formData, fullNameEn: e.target.value })}
                    placeholder={language === 'zh' ? '请填写护照/驾照上的法定姓名' : 'Legal name as on passport/driving license'}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {language === 'zh' ? '全名（中文音译，如有）' : 'Full Name (Chinese Pinyin)'}
                  </label>
                  <input
                    type="text"
                    value={formData.fullNameCn}
                    onChange={(e) => setFormData({ ...formData, fullNameCn: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {language === 'zh' ? '出生日期*' : 'Date of Birth *'}
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {language === 'zh' ? '国籍*' : 'Nationality *'}
                  </label>
                  <select
                    required
                    value={formData.nationality}
                    onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="">{language === 'zh' ? '请选择' : 'Please select'}</option>
                    {nationalities.map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {language === 'zh' ? '身份类型*' : 'Identity Type *'}
                  </label>
                  <select
                    required
                    value={formData.identityType}
                    onChange={(e) => setFormData({ ...formData, identityType: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="">{language === 'zh' ? '请选择' : 'Please select'}</option>
                    {identityTypes.map(i => <option key={i} value={i}>{i}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {language === 'zh' ? '居住州/省*' : 'State/Province *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.residenceState}
                    onChange={(e) => setFormData({ ...formData, residenceState: e.target.value })}
                    placeholder={language === 'zh' ? '如 Texas, California' : 'e.g., Texas, California'}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {language === 'zh' ? '居住城市*' : 'City *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.residenceCity}
                    onChange={(e) => setFormData({ ...formData, residenceCity: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {language === 'zh' ? '详细地址*' : 'Detailed Address *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder={language === 'zh' ? '用于接收信件（如税表）' : 'For receiving mail (e.g., tax forms)'}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {language === 'zh' ? '联系电话*' : 'Phone *'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder={language === 'zh' ? '建议填写手机号' : 'Mobile number recommended'}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {language === 'zh' ? '电子邮箱*' : 'Email *'}
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
                    Telegram *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.telegram}
                    onChange={(e) => setFormData({ ...formData, telegram: e.target.value })}
                    placeholder="Telegram"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    WhatsApp
                  </label>
                  <input
                    type="text"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {language === 'zh' ? '紧急联系人姓名*' : 'Emergency Contact Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.emergencyContactName}
                    onChange={(e) => setFormData({ ...formData, emergencyContactName: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {language === 'zh' ? '紧急联系人关系*' : 'Emergency Contact Relation *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.emergencyContactRelation}
                    onChange={(e) => setFormData({ ...formData, emergencyContactRelation: e.target.value })}
                    placeholder={language === 'zh' ? '如配偶、父母、朋友' : 'e.g., spouse, parent, friend'}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {language === 'zh' ? '紧急联系人电话*' : 'Emergency Contact Phone *'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.emergencyContactPhone}
                    onChange={(e) => setFormData({ ...formData, emergencyContactPhone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Qualifications */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">
                {language === 'zh' ? '第二部分：资质与经验' : 'Section 2: Qualifications & Experience'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {language === 'zh' ? '您是否持有美国/墨西哥企业？*' : 'Do you have a US/Mexico company? *'}
                  </label>
                  <select
                    required
                    value={formData.hasUsMxCompany}
                    onChange={(e) => setFormData({ ...formData, hasUsMxCompany: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="">{language === 'zh' ? '请选择' : 'Please select'}</option>
                    <option value="us">{language === 'zh' ? '是，美国企业' : 'Yes, US Company'}</option>
                    <option value="mx">{language === 'zh' ? '是，墨西哥企业' : 'Yes, Mexico Company'}</option>
                    <option value="both">{language === 'zh' ? '是，两国均有' : 'Yes, both'}</option>
                    <option value="no">{language === 'zh' ? '否' : 'No'}</option>
                  </select>
                </div>
                {formData.hasUsMxCompany !== 'no' && formData.hasUsMxCompany !== '' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {language === 'zh' ? '企业名称' : 'Company Name'}
                      </label>
                      <input
                        type="text"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {language === 'zh' ? '企业类型' : 'Company Type'}
                      </label>
                      <select
                        value={formData.companyType}
                        onChange={(e) => setFormData({ ...formData, companyType: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      >
                        <option value="">{language === 'zh' ? '请选择' : 'Please select'}</option>
                        {companyTypes.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {language === 'zh' ? '企业注册时间' : 'Company Registration Date'}
                      </label>
                      <input
                        type="date"
                        value={formData.companyRegDate}
                        onChange={(e) => setFormData({ ...formData, companyRegDate: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {language === 'zh' ? '企业注册州/省' : 'Company Registration State/Province'}
                      </label>
                      <input
                        type="text"
                        value={formData.companyRegState}
                        onChange={(e) => setFormData({ ...formData, companyRegState: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {language === 'zh' ? '企业主营业务' : 'Company Main Business'}
                      </label>
                      <input
                        type="text"
                        value={formData.companyBusiness}
                        onChange={(e) => setFormData({ ...formData, companyBusiness: e.target.value })}
                        placeholder={language === 'zh' ? '如电商、物流、贸易等' : 'e.g., e-commerce, logistics, trade'}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>
                  </>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {language === 'zh' ? '企业是否有实体经营' : 'Has Physical Business'}
                  </label>
                  <select
                    value={formData.hasPhysicalBusiness}
                    onChange={(e) => setFormData({ ...formData, hasPhysicalBusiness: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="">{language === 'zh' ? '请选择' : 'Please select'}</option>
                    <option value="yes">{language === 'zh' ? '有实体（办公室/仓库等）' : 'Yes (Office/Warehouse)'}</option>
                    <option value="no">{language === 'zh' ? '无实体' : 'No'}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {language === 'zh' ? '企业近12个月经营流水' : 'Annual Revenue (Last 12 Months)'}
                  </label>
                  <select
                    value={formData.annualRevenue}
                    onChange={(e) => setFormData({ ...formData, annualRevenue: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="">{language === 'zh' ? '请选择' : 'Please select'}</option>
                    {revenueRanges.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {language === 'zh' ? '企业是否有对公银行账户' : 'Has Corporate Bank Account'}
                  </label>
                  <select
                    value={formData.hasBankAccount}
                    onChange={(e) => setFormData({ ...formData, hasBankAccount: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="">{language === 'zh' ? '请选择' : 'Please select'}</option>
                    <option value="yes">{language === 'zh' ? '有' : 'Yes'}</option>
                    <option value="no">{language === 'zh' ? '无' : 'No'}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {language === 'zh' ? '您是否有电商相关经验？*' : 'Do you have e-commerce experience? *'}
                  </label>
                  <select
                    required
                    value={formData.hasEcommerceExp}
                    onChange={(e) => setFormData({ ...formData, hasEcommerceExp: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="">{language === 'zh' ? '请选择' : 'Please select'}</option>
                    <option value="amazon">{language === 'zh' ? '有，亚马逊' : 'Yes, Amazon'}</option>
                    <option value="tiktok">{language === 'zh' ? '有，TikTok Shop' : 'Yes, TikTok Shop'}</option>
                    <option value="walmart">{language === 'zh' ? '有，Walmart' : 'Yes, Walmart'}</option>
                    <option value="other">{language === 'zh' ? '有，其他平台' : 'Yes, Other Platform'}</option>
                    <option value="no">{language === 'zh' ? '无经验' : 'No'}</option>
                  </select>
                </div>
                {formData.hasEcommerceExp && formData.hasEcommerceExp !== 'no' && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {language === 'zh' ? '电商经验详情' : 'E-commerce Experience Details'}
                    </label>
                    <textarea
                      rows={3}
                      value={formData.ecommerceExpDetail}
                      onChange={(e) => setFormData({ ...formData, ecommerceExpDetail: e.target.value })}
                      placeholder={language === 'zh' ? '如运营时长、店铺数量、月销售额等' : 'e.g., operation duration, store count, monthly sales'}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {language === 'zh' ? '您是否有仓储/物流资源？' : 'Do you have warehouse/logistics resources?'}
                  </label>
                  <select
                    value={formData.hasWarehouseLogistics}
                    onChange={(e) => setFormData({ ...formData, hasWarehouseLogistics: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="">{language === 'zh' ? '请选择' : 'Please select'}</option>
                    <option value="yes">{language === 'zh' ? '有（请说明）' : 'Yes (please explain)'}</option>
                    <option value="no">{language === 'zh' ? '无' : 'No'}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {language === 'zh' ? '您是否有会计/法律资源？' : 'Do you have accounting/legal resources?'}
                  </label>
                  <select
                    value={formData.hasAccountingLegal}
                    onChange={(e) => setFormData({ ...formData, hasAccountingLegal: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="">{language === 'zh' ? '请选择' : 'Please select'}</option>
                    <option value="yes">{language === 'zh' ? '有（请说明）' : 'Yes (please explain)'}</option>
                    <option value="no">{language === 'zh' ? '无' : 'No'}</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section 3: Cooperation Intent */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">
                {language === 'zh' ? '第三部分：合作意向' : 'Section 3: Cooperation Intent'}
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'zh' ? '您希望合作的卖家类型 *' : 'What type of sellers do you want to cooperate with? *'}
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {sellerTypes.map((type) => (
                      <label key={type} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.targetSellerType.includes(type)}
                          onChange={() => handleCheckboxChange('targetSellerType', type)}
                          className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                        />
                        <span className="text-sm text-gray-700">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {language === 'zh' ? '期望的店铺数量 *' : 'Expected number of stores *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.expectedStoreCount}
                      onChange={(e) => setFormData({ ...formData, expectedStoreCount: e.target.value })}
                      placeholder={language === 'zh' ? '例如：1-3个、5-10个' : 'e.g., 1-3, 5-10'}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {language === 'zh' ? '期望的利润分成比例 *' : 'Expected profit share ratio *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.expectedProfitShare}
                      onChange={(e) => setFormData({ ...formData, expectedProfitShare: e.target.value })}
                      placeholder={language === 'zh' ? '例如：20%' : 'e.g., 20%'}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'zh' ? '期望的合作模式 *' : 'Expected cooperation model *'}
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {coopModels.map((model) => (
                      <label key={model} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.expectedCoopModel.includes(model)}
                          onChange={() => handleCheckboxChange('expectedCoopModel', model)}
                          className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                        />
                        <span className="text-sm text-gray-700">{model}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {language === 'zh' ? '接受月度固定补贴+分成模式？*' : 'Accept monthly subsidy + profit share? *'}
                    </label>
                    <select
                      required
                      value={formData.acceptMonthlySubsidy}
                      onChange={(e) => setFormData({ ...formData, acceptMonthlySubsidy: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    >
                      <option value="">{language === 'zh' ? '请选择' : 'Please select'}</option>
                      <option value="accept">{language === 'zh' ? '接受' : 'Accept'}</option>
                      <option value="negotiate">{language === 'zh' ? '需要协商' : 'Need to Negotiate'}</option>
                      <option value="no">{language === 'zh' ? '不接受，只要分成' : 'No, Only Profit Share'}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {language === 'zh' ? '每周可配合时间 *' : 'Weekly available time *'}
                    </label>
                    <select
                      required
                      value={formData.weeklyAvailableTime}
                      onChange={(e) => setFormData({ ...formData, weeklyAvailableTime: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    >
                      <option value="">{language === 'zh' ? '请选择' : 'Please select'}</option>
                      {timeOptions.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {language === 'zh' ? '期望合作时长 *' : 'Expected cooperation duration *'}
                    </label>
                    <select
                      required
                      value={formData.coopDuration}
                      onChange={(e) => setFormData({ ...formData, coopDuration: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    >
                      <option value="">{language === 'zh' ? '请选择' : 'Please select'}</option>
                      {durationOptions.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 4: Other Info */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">
                {language === 'zh' ? '第四部分：其他信息' : 'Section 4: Other Information'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {language === 'zh' ? '您是如何知道我们的？' : 'How did you find us?'}
                  </label>
                  <select
                    value={formData.howFoundUs}
                    onChange={(e) => setFormData({ ...formData, howFoundUs: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="">{language === 'zh' ? '请选择' : 'Please select'}</option>
                    {foundUsOptions.map(f => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {language === 'zh' ? 'CV/简历是否已发送？*' : 'Has CV/Resume been sent? *'}
                  </label>
                  <select
                    required
                    value={formData.cvSent}
                    onChange={(e) => setFormData({ ...formData, cvSent: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="">{language === 'zh' ? '请选择' : 'Please select'}</option>
                    {cvSentOptions.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {language === 'zh' ? '您是否有任何问题或特别说明？' : 'Do you have any questions or special notes?'}
                  </label>
                  <textarea
                    rows={3}
                    value={formData.additionalQuestions}
                    onChange={(e) => setFormData({ ...formData, additionalQuestions: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
              </div>
            </div>

            {/* Section 5: Confirmation */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">
                {language === 'zh' ? '第五部分：确认与提交' : 'Section 5: Confirmation & Submission'}
              </h3>
              <div className="space-y-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={formData.confirmInfo}
                    onChange={(e) => setFormData({ ...formData, confirmInfo: e.target.checked })}
                    className="w-5 h-5 text-orange-600 border-gray-300 rounded focus:ring-orange-500 mt-0.5"
                  />
                  <span className="text-sm text-gray-700">
                    {language === 'zh'
                      ? '本人确认以上信息真实、准确、完整。'
                      : 'I confirm that the above information is true, accurate and complete.'}
                  </span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={formData.agreePrivacy}
                    onChange={(e) => setFormData({ ...formData, agreePrivacy: e.target.checked })}
                    className="w-5 h-5 text-orange-600 border-gray-300 rounded focus:ring-orange-500 mt-0.5"
                  />
                  <span className="text-sm text-gray-700">
                    {language === 'zh'
                      ? '本人同意香港佳和供应链管理有限公司收集并使用上述信息用于合作评估及联系。'
                      : 'I agree to Hong Kong Prime Harmony Supply Chain Management Co., Ltd. collecting and using the above information for cooperation evaluation and contact.'}
                  </span>
                </label>
              </div>
            </div>

            {/* Submit */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50"
              >
                <Send size={20} />
                {isSubmitting ? (language === 'zh' ? '提交中...' : 'Submitting...') : (language === 'zh' ? '提交申请' : 'Submit Application')}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};
