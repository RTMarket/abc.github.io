import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase, TABLE_NAMES } from '@/lib/supabase';

export interface SellerSubmission {
  id: string;
  company_name_cn: string;
  company_name_en: string;
  unified_code: string;
  contact_name: string;
  phone: string;
  email: string;
  wechat: string;
  current_platforms: string[];
  target_platforms: string[];
  us_store_count: string;
  mx_store_count: string;
  need_partner: string;
  need_us_bank: string;
  need_mx_bank: string;
  monthly_sales: string;
  product_categories: string[];
  overseas_warehouse: string;
  warehouse_funds: string;
  need_supply_chain: string;
  need_mcn: string;
  need_logistics: string;
  need_payment: string;
  service_plan: string;
  budget: string;
  other_needs: string;
  created_at: string;
}

export interface FactorySubmission {
  id: string;
  factory_name_en: string;
  factory_name_cn: string;
  register_country: string;
  register_address: string;
  tax_id: string;
  contact_name: string;
  phone: string;
  email: string;
  website: string;
  product_categories: string[];
  product_desc: string;
  has_cert: string;
  certificates: { type: string; number: string }[];
  moq: string;
  lead_time: string;
  capacity: string;
  has_local_stock: string;
  shipping_methods: string[];
  sample_order: string;
  brand_service: string;
  other_info: string;
  created_at: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  created_at: string;
}

export interface PartnerSubmission {
  id: string;
  created_at: string;
  // Section 1
  title: string;
  full_name_en: string;
  full_name_cn: string;
  dob: string;
  nationality: string;
  identity_type: string;
  residence_state: string;
  residence_city: string;
  address: string;
  phone: string;
  email: string;
  telegram: string;
  whatsapp: string;
  emergency_contact_name: string;
  emergency_contact_relation: string;
  emergency_contact_phone: string;
  // Section 2
  has_us_mx_company: string;
  company_name: string;
  company_type: string;
  company_reg_date: string;
  company_reg_state: string;
  company_business: string;
  has_physical_business: string;
  annual_revenue: string;
  has_bank_account: string;
  has_ecommerce_exp: string;
  ecommerce_exp_detail: string;
  has_warehouse_logistics: string;
  warehouse_logistics_detail: string;
  has_accounting_legal: string;
  accounting_legal_detail: string;
  // Section 3
  target_seller_type: string[];
  expected_store_count: string;
  expected_coop_model: string[];
  expected_profit_share: string;
  accept_monthly_subsidy: string;
  weekly_available_time: string;
  coop_duration: string;
  // Section 4
  how_found_us: string;
  additional_questions: string;
  cv_sent: string;
  // Section 5
  confirm_info: boolean;
  agree_privacy: boolean;
}

interface AdminContextType {
  sellerSubmissions: SellerSubmission[];
  factorySubmissions: FactorySubmission[];
  contactSubmissions: ContactSubmission[];
  partnerSubmissions: PartnerSubmission[];
  addSellerSubmission: (data: Omit<SellerSubmission, 'id' | 'created_at'>) => Promise<void>;
  addFactorySubmission: (data: Omit<FactorySubmission, 'id' | 'created_at'>) => Promise<void>;
  addContactSubmission: (data: Omit<ContactSubmission, 'id' | 'created_at'>) => Promise<void>;
  addPartnerSubmission: (data: Omit<PartnerSubmission, 'id' | 'created_at'>) => Promise<void>;
  deleteSellerSubmission: (id: string) => Promise<void>;
  deleteFactorySubmission: (id: string) => Promise<void>;
  deleteContactSubmission: (id: string) => Promise<void>;
  deletePartnerSubmission: (id: string) => Promise<void>;
  isAdmin: boolean;
  adminLogin: (username: string, password: string) => boolean;
  adminLogout: () => void;
  isLoading: boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'fsc2024';

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sellerSubmissions, setSellerSubmissions] = useState<SellerSubmission[]>([]);
  const [factorySubmissions, setFactorySubmissions] = useState<FactorySubmission[]>([]);
  const [contactSubmissions, setContactSubmissions] = useState<ContactSubmission[]>([]);
  const [partnerSubmissions, setPartnerSubmissions] = useState<PartnerSubmission[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // 从Supabase加载数据
  useEffect(() => {
    const loadData = async () => {
      try {
        // 加载卖家提交
        const { data: sellers, error: sellerError } = await supabase
          .from(TABLE_NAMES.SELLER_SUBMISSIONS)
          .select('*')
          .order('created_at', { ascending: false });

        if (sellerError) {
          console.error('加载卖家数据失败:', sellerError);
          // 回退到localStorage
          const savedSeller = localStorage.getItem('sellerSubmissions');
          if (savedSeller) {
            setSellerSubmissions(JSON.parse(savedSeller));
          }
        } else if (sellers) {
          setSellerSubmissions(sellers);
        }

        // 加载工厂提交
        const { data: factories, error: factoryError } = await supabase
          .from(TABLE_NAMES.FACTORY_SUBMISSIONS)
          .select('*')
          .order('created_at', { ascending: false });

        if (factoryError) {
          console.error('加载工厂数据失败:', factoryError);
          // 回退到localStorage
          const savedFactory = localStorage.getItem('factorySubmissions');
          if (savedFactory) {
            setFactorySubmissions(JSON.parse(savedFactory));
          }
        } else if (factories) {
          setFactorySubmissions(factories);
        }

        // 加载联系提交
        const { data: contacts, error: contactError } = await supabase
          .from(TABLE_NAMES.CONTACT_SUBMISSIONS)
          .select('*')
          .order('created_at', { ascending: false });

        if (contactError) {
          console.error('加载联系数据失败:', contactError);
          // 回退到localStorage
          const savedContact = localStorage.getItem('contactSubmissions');
          if (savedContact) {
            setContactSubmissions(JSON.parse(savedContact));
          }
        } else if (contacts) {
          setContactSubmissions(contacts);
        }

        // 加载合伙人提交
        const { data: partners, error: partnerError } = await supabase
          .from(TABLE_NAMES.PARTNER_SUBMISSIONS)
          .select('*')
          .order('created_at', { ascending: false });

        if (partnerError) {
          console.error('加载合伙人数据失败:', partnerError);
          // 回退到localStorage
          const savedPartner = localStorage.getItem('partnerSubmissions');
          if (savedPartner) {
            setPartnerSubmissions(JSON.parse(savedPartner));
          }
        } else if (partners) {
          setPartnerSubmissions(partners);
        }

        // 检查管理员登录状态
        const savedAdmin = localStorage.getItem('isAdmin');
        if (savedAdmin === 'true') {
          setIsAdmin(true);
        }
      } catch (error) {
        console.error('加载数据出错:', error);
        // 回退到localStorage
        const savedSeller = localStorage.getItem('sellerSubmissions');
        const savedFactory = localStorage.getItem('factorySubmissions');
        const savedContact = localStorage.getItem('contactSubmissions');
        const savedPartner = localStorage.getItem('partnerSubmissions');
        if (savedSeller) setSellerSubmissions(JSON.parse(savedSeller));
        if (savedFactory) setFactorySubmissions(JSON.parse(savedFactory));
        if (savedContact) setContactSubmissions(JSON.parse(savedContact));
        if (savedPartner) setPartnerSubmissions(JSON.parse(savedPartner));
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const addSellerSubmission = async (data: Omit<SellerSubmission, 'id' | 'created_at'>) => {
    try {
      // 尝试保存到Supabase
      const { data: result, error } = await supabase
        .from(TABLE_NAMES.SELLER_SUBMISSIONS)
        .insert([data])
        .select();

      if (error) {
        console.error('Supabase保存失败，回退到localStorage:', error);
        // 回退到localStorage
        const newSubmission = {
          ...data,
          id: Date.now().toString(),
          created_at: new Date().toISOString(),
        };
        setSellerSubmissions(prev => {
          const updated = [newSubmission, ...prev];
          localStorage.setItem('sellerSubmissions', JSON.stringify(updated));
          return updated;
        });
      } else if (result) {
        // Supabase保存成功，刷新数据
        setSellerSubmissions(prev => [result[0], ...prev]);
      }
    } catch (error) {
      console.error('保存卖家数据出错:', error);
      // 回退到localStorage
      const newSubmission = {
        ...data,
        id: Date.now().toString(),
        created_at: new Date().toISOString(),
      };
      setSellerSubmissions(prev => {
        const updated = [newSubmission, ...prev];
        localStorage.setItem('sellerSubmissions', JSON.stringify(updated));
        return updated;
      });
    }
  };

  const addFactorySubmission = async (data: Omit<FactorySubmission, 'id' | 'created_at'>) => {
    try {
      // 尝试保存到Supabase
      const { data: result, error } = await supabase
        .from(TABLE_NAMES.FACTORY_SUBMISSIONS)
        .insert([data])
        .select();

      if (error) {
        console.error('Supabase保存失败，回退到localStorage:', error);
        // 回退到localStorage
        const newSubmission = {
          ...data,
          id: Date.now().toString(),
          created_at: new Date().toISOString(),
        };
        setFactorySubmissions(prev => {
          const updated = [newSubmission, ...prev];
          localStorage.setItem('factorySubmissions', JSON.stringify(updated));
          return updated;
        });
      } else if (result) {
        // Supabase保存成功，刷新数据
        setFactorySubmissions(prev => [result[0], ...prev]);
      }
    } catch (error) {
      console.error('保存工厂数据出错:', error);
      // 回退到localStorage
      const newSubmission = {
        ...data,
        id: Date.now().toString(),
        created_at: new Date().toISOString(),
      };
      setFactorySubmissions(prev => {
        const updated = [newSubmission, ...prev];
        localStorage.setItem('factorySubmissions', JSON.stringify(updated));
        return updated;
      });
    }
  };

  const deleteSellerSubmission = async (id: string) => {
    try {
      // 尝试从Supabase删除
      const { error } = await supabase
        .from(TABLE_NAMES.SELLER_SUBMISSIONS)
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Supabase删除失败:', error);
      }
      // 无论Supabase成功与否，都更新本地状态
      setSellerSubmissions(prev => {
        const updated = prev.filter(s => s.id !== id);
        localStorage.setItem('sellerSubmissions', JSON.stringify(updated));
        return updated;
      });
    } catch (error) {
      console.error('删除卖家数据出错:', error);
      setSellerSubmissions(prev => {
        const updated = prev.filter(s => s.id !== id);
        localStorage.setItem('sellerSubmissions', JSON.stringify(updated));
        return updated;
      });
    }
  };

  const deleteFactorySubmission = async (id: string) => {
    try {
      // 尝试从Supabase删除
      const { error } = await supabase
        .from(TABLE_NAMES.FACTORY_SUBMISSIONS)
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Supabase删除失败:', error);
      }
      // 无论Supabase成功与否，都更新本地状态
      setFactorySubmissions(prev => {
        const updated = prev.filter(f => f.id !== id);
        localStorage.setItem('factorySubmissions', JSON.stringify(updated));
        return updated;
      });
    } catch (error) {
      console.error('删除工厂数据出错:', error);
      setFactorySubmissions(prev => {
        const updated = prev.filter(f => f.id !== id);
        localStorage.setItem('factorySubmissions', JSON.stringify(updated));
        return updated;
      });
    }
  };

  const addContactSubmission = async (data: Omit<ContactSubmission, 'id' | 'created_at'>) => {
    try {
      // 尝试保存到Supabase
      const { data: result, error } = await supabase
        .from(TABLE_NAMES.CONTACT_SUBMISSIONS)
        .insert([data])
        .select();

      if (error) {
        console.error('Supabase保存失败，回退到localStorage:', error);
        // 回退到localStorage
        const newSubmission = {
          ...data,
          id: Date.now().toString(),
          created_at: new Date().toISOString(),
        };
        setContactSubmissions(prev => {
          const updated = [newSubmission, ...prev];
          localStorage.setItem('contactSubmissions', JSON.stringify(updated));
          return updated;
        });
      } else if (result) {
        // Supabase保存成功，刷新数据
        setContactSubmissions(prev => [result[0], ...prev]);
      }
    } catch (error) {
      console.error('保存联系数据出错:', error);
      // 回退到localStorage
      const newSubmission = {
        ...data,
        id: Date.now().toString(),
        created_at: new Date().toISOString(),
      };
      setContactSubmissions(prev => {
        const updated = [newSubmission, ...prev];
        localStorage.setItem('contactSubmissions', JSON.stringify(updated));
        return updated;
      });
    }
  };

  const deleteContactSubmission = async (id: string) => {
    try {
      // 尝试从Supabase删除
      const { error } = await supabase
        .from(TABLE_NAMES.CONTACT_SUBMISSIONS)
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Supabase删除失败:', error);
      }
      // 无论Supabase成功与否，都更新本地状态
      setContactSubmissions(prev => {
        const updated = prev.filter(f => f.id !== id);
        localStorage.setItem('contactSubmissions', JSON.stringify(updated));
        return updated;
      });
    } catch (error) {
      console.error('删除联系数据出错:', error);
      setContactSubmissions(prev => {
        const updated = prev.filter(f => f.id !== id);
        localStorage.setItem('contactSubmissions', JSON.stringify(updated));
        return updated;
      });
    }
  };

  const addPartnerSubmission = async (data: Omit<PartnerSubmission, 'id' | 'created_at'>) => {
    try {
      // 尝试保存到Supabase
      const { data: result, error } = await supabase
        .from(TABLE_NAMES.PARTNER_SUBMISSIONS)
        .insert([data])
        .select();

      if (error) {
        console.error('Supabase保存失败，回退到localStorage:', error);
        // 回退到localStorage
        const newSubmission = {
          ...data,
          id: Date.now().toString(),
          created_at: new Date().toISOString(),
        };
        setPartnerSubmissions(prev => {
          const updated = [newSubmission, ...prev];
          localStorage.setItem('partnerSubmissions', JSON.stringify(updated));
          return updated;
        });
      } else if (result) {
        // Supabase保存成功，刷新数据
        setPartnerSubmissions(prev => [result[0], ...prev]);
      }
    } catch (error) {
      console.error('保存合伙人数据出错:', error);
      // 回退到localStorage
      const newSubmission = {
        ...data,
        id: Date.now().toString(),
        created_at: new Date().toISOString(),
      };
      setPartnerSubmissions(prev => {
        const updated = [newSubmission, ...prev];
        localStorage.setItem('partnerSubmissions', JSON.stringify(updated));
        return updated;
      });
    }
  };

  const deletePartnerSubmission = async (id: string) => {
    try {
      // 尝试从Supabase删除
      const { error } = await supabase
        .from(TABLE_NAMES.PARTNER_SUBMISSIONS)
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Supabase删除失败:', error);
      }
      // 无论Supabase成功与否，都更新本地状态
      setPartnerSubmissions(prev => {
        const updated = prev.filter(f => f.id !== id);
        localStorage.setItem('partnerSubmissions', JSON.stringify(updated));
        return updated;
      });
    } catch (error) {
      console.error('删除合伙人数据出错:', error);
      setPartnerSubmissions(prev => {
        const updated = prev.filter(f => f.id !== id);
        localStorage.setItem('partnerSubmissions', JSON.stringify(updated));
        return updated;
      });
    }
  };

  const adminLogin = (username: string, password: string): boolean => {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      localStorage.setItem('isAdmin', 'true');
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setIsAdmin(false);
    localStorage.setItem('isAdmin', 'false');
  };

  return (
    <AdminContext.Provider value={{
      sellerSubmissions,
      factorySubmissions,
      contactSubmissions,
      partnerSubmissions,
      addSellerSubmission,
      addFactorySubmission,
      addContactSubmission,
      addPartnerSubmission,
      deleteSellerSubmission,
      deleteFactorySubmission,
      deleteContactSubmission,
      deletePartnerSubmission,
      isAdmin,
      adminLogin,
      adminLogout,
      isLoading,
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
