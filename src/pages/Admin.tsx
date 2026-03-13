import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import { useAdmin } from '@/store/AdminContext';
import { Download, Trash2, LogOut, Package, Store } from 'lucide-react';

export const Admin: React.FC = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const { isAdmin, adminLogin, adminLogout, sellerSubmissions, factorySubmissions, deleteSellerSubmission, deleteFactorySubmission } = useAdmin();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = adminLogin(username, password);
    if (!success) {
      setLoginError(true);
    }
  };

  const handleLogout = () => {
    adminLogout();
    navigate('/');
  };

  const exportToExcel = (type: 'seller' | 'factory') => {
    const data = type === 'seller' ? sellerSubmissions : factorySubmissions;
    const headers = type === 'seller'
      ? ['企业名称(中文)', '企业名称(英文)', '统一社会信用代码', '联系人', '电话', '邮箱', '微信', '当前平台', '目标平台', '美国店铺数', '墨西哥店铺数', '需要合伙人', '需要美国银行', '需要墨西哥银行', '月销售额', '产品类目', '海外仓', '备货资金', '需要供应链', '需要MCN', '需要物流', '需要支付', '服务方案', '预算', '其他需求', '提交时间']
      : ['工厂名称(英文)', '工厂名称(中文)', '注册国家', '注册地址', '税号', '联系人', '电话', '邮箱', '网站', '产品类目', '产品描述', '有认证', '资质证书', 'MOQ', '交货时间', '月产能', '本土库存', '发货方式', '样品订单', '品牌服务', '其他信息', '提交时间'];

    const rows = data.map((item: any) => {
      if (type === 'seller') {
        return [
          item.company_name_cn || '',
          item.company_name_en || '',
          item.unified_code || '',
          item.contact_name || '',
          item.phone || '',
          item.email || '',
          item.wechat || '',
          (item.current_platforms || []).join(', '),
          (item.target_platforms || []).join(', '),
          item.us_store_count || '',
          item.mx_store_count || '',
          item.need_partner || '',
          item.need_us_bank || '',
          item.need_mx_bank || '',
          item.monthly_sales || '',
          (item.product_categories || []).join(', '),
          item.overseas_warehouse || '',
          item.warehouse_funds || '',
          item.need_supply_chain || '',
          item.need_mcn || '',
          item.need_logistics || '',
          item.need_payment || '',
          item.service_plan || '',
          item.budget || '',
          item.other_needs || '',
          item.created_at ? new Date(item.created_at).toLocaleString() : ''
        ];
      } else {
        return [
          item.factory_name_en || '',
          item.factory_name_cn || '',
          item.register_country || '',
          item.register_address || '',
          item.tax_id || '',
          item.contact_name || '',
          item.phone || '',
          item.email || '',
          item.website || '',
          (item.product_categories || []).join(', '),
          item.product_desc || '',
          item.has_cert || '',
          (item.certificates || []).map((c: any) => `${c.type}: ${c.number}`).join('; '),
          item.moq || '',
          item.lead_time || '',
          item.capacity || '',
          item.has_local_stock || '',
          (item.shipping_methods || []).join(', '),
          item.sample_order || '',
          item.brand_service || '',
          item.other_info || '',
          item.created_at ? new Date(item.created_at).toLocaleString() : ''
        ];
      }
    });

    const csvContent = '\uFEFF' + [headers.join('\t'), ...rows.map(row => row.join('\t'))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${type}_submissions_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen pt-20 bg-gray-50">
        <div className="max-w-md mx-auto px-4 py-24">
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              {t.admin.login}
            </h2>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.admin.username}
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => { setUsername(e.target.value); setLoginError(false); }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.admin.password}
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setLoginError(false); }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              {loginError && (
                <p className="text-red-500 text-sm">
                  {language === 'zh' ? '用户名或密码错误' : 'Invalid username or password'}
                </p>
              )}
              <button
                type="submit"
                className="w-full py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors"
              >
                {t.admin.loginBtn}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-orange-900 via-orange-800 to-orange-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">{t.admin.title}</h1>
              <p className="text-orange-200 mt-1">
                {t.admin.total}: {sellerSubmissions.length + factorySubmissions.length}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
            >
              <LogOut size={18} />
              {t.admin.logout}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Seller Applications */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Store className="w-5 h-5 text-orange-600" />
              {t.admin.sellerApplications} ({sellerSubmissions.length})
            </h2>
            {sellerSubmissions.length > 0 && (
              <button
                onClick={() => exportToExcel('seller')}
                className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
              >
                <Download size={18} />
                {t.admin.exportExcel}
              </button>
            )}
          </div>

          {sellerSubmissions.length === 0 ? (
            <p className="text-gray-500 text-center py-8">{t.admin.noData}</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">{language === 'zh' ? '企业名称' : 'Company'}</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">{t.admin.contact}</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">{t.admin.submittedAt}</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">{t.admin.action}</th>
                  </tr>
                </thead>
                <tbody>
                  {sellerSubmissions.map(sub => (
                    <tr key={sub.id} className="border-t hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">{sub.company_name_cn}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        <div>{sub.contact_name}</div>
                        <div className="text-xs">{sub.email}</div>
                        <div className="text-xs">{sub.phone}</div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">
                        {sub.created_at ? new Date(sub.created_at).toLocaleString() : ''}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => deleteSellerSubmission(sub.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Factory Applications */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Package className="w-5 h-5 text-orange-600" />
              {t.admin.factoryApplications} ({factorySubmissions.length})
            </h2>
            {factorySubmissions.length > 0 && (
              <button
                onClick={() => exportToExcel('factory')}
                className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
              >
                <Download size={18} />
                {t.admin.exportExcel}
              </button>
            )}
          </div>

          {factorySubmissions.length === 0 ? (
            <p className="text-gray-500 text-center py-8">{t.admin.noData}</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">{language === 'zh' ? '工厂名称' : 'Factory'}</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">{t.admin.contact}</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">{t.admin.submittedAt}</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">{t.admin.action}</th>
                  </tr>
                </thead>
                <tbody>
                  {factorySubmissions.map(sub => (
                    <tr key={sub.id} className="border-t hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">{sub.factory_name_en}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        <div>{sub.contact_name}</div>
                        <div className="text-xs">{sub.email}</div>
                        <div className="text-xs">{sub.phone}</div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">
                        {sub.created_at ? new Date(sub.created_at).toLocaleString() : ''}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => deleteFactorySubmission(sub.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
