import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface SellerSubmission {
  id: string;
  companyNameCn: string;
  companyNameEn: string;
  unifiedCode: string;
  contactName: string;
  phone: string;
  email: string;
  wechat: string;
  currentPlatforms: string[];
  targetPlatforms: string[];
  usStoreCount: string;
  mxStoreCount: string;
  needPartner: string;
  needUsBank: string;
  needMxBank: string;
  monthlySales: string;
  productCategories: string[];
  overseasWarehouse: string;
  warehouseFunds: string;
  needSupplyChain: string;
  needMcn: string;
  needLogistics: string;
  needPayment: string;
  servicePlan: string;
  budget: string;
  otherNeeds: string;
  submittedAt: string;
}

export interface FactorySubmission {
  id: string;
  factoryNameEn: string;
  factoryNameCn: string;
  registerCountry: string;
  registerAddress: string;
  taxId: string;
  contactName: string;
  phone: string;
  email: string;
  website: string;
  productCategories: string[];
  productDesc: string;
  hasCert: string;
  certificates: { type: string; number: string }[];
  moq: string;
  leadTime: string;
  capacity: string;
  hasLocalStock: string;
  shippingMethods: string[];
  sampleOrder: string;
  brandService: string;
  otherInfo: string;
  submittedAt: string;
}

interface AdminContextType {
  sellerSubmissions: SellerSubmission[];
  factorySubmissions: FactorySubmission[];
  addSellerSubmission: (data: Omit<SellerSubmission, 'id' | 'submittedAt'>) => void;
  addFactorySubmission: (data: Omit<FactorySubmission, 'id' | 'submittedAt'>) => void;
  deleteSellerSubmission: (id: string) => void;
  deleteFactorySubmission: (id: string) => void;
  isAdmin: boolean;
  adminLogin: (username: string, password: string) => boolean;
  adminLogout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'fsc2024';

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sellerSubmissions, setSellerSubmissions] = useState<SellerSubmission[]>([]);
  const [factorySubmissions, setFactorySubmissions] = useState<FactorySubmission[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const savedSeller = localStorage.getItem('sellerSubmissions');
    const savedFactory = localStorage.getItem('factorySubmissions');
    const savedAdmin = localStorage.getItem('isAdmin');

    if (savedSeller) {
      setSellerSubmissions(JSON.parse(savedSeller));
    }
    if (savedFactory) {
      setFactorySubmissions(JSON.parse(savedFactory));
    }
    if (savedAdmin === 'true') {
      setIsAdmin(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('sellerSubmissions', JSON.stringify(sellerSubmissions));
  }, [sellerSubmissions]);

  useEffect(() => {
    localStorage.setItem('factorySubmissions', JSON.stringify(factorySubmissions));
  }, [factorySubmissions]);

  useEffect(() => {
    localStorage.setItem('isAdmin', String(isAdmin));
  }, [isAdmin]);

  const addSellerSubmission = (data: Omit<SellerSubmission, 'id' | 'submittedAt'>) => {
    const newSubmission: SellerSubmission = {
      ...data,
      id: Date.now().toString(),
      submittedAt: new Date().toISOString(),
    };
    setSellerSubmissions(prev => [newSubmission, ...prev]);
  };

  const addFactorySubmission = (data: Omit<FactorySubmission, 'id' | 'submittedAt'>) => {
    const newSubmission: FactorySubmission = {
      ...data,
      id: Date.now().toString(),
      submittedAt: new Date().toISOString(),
    };
    setFactorySubmissions(prev => [newSubmission, ...prev]);
  };

  const deleteSellerSubmission = (id: string) => {
    setSellerSubmissions(prev => prev.filter(s => s.id !== id));
  };

  const deleteFactorySubmission = (id: string) => {
    setFactorySubmissions(prev => prev.filter(f => f.id !== id));
  };

  const adminLogin = (username: string, password: string): boolean => {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setIsAdmin(false);
  };

  return (
    <AdminContext.Provider value={{
      sellerSubmissions,
      factorySubmissions,
      addSellerSubmission,
      addFactorySubmission,
      deleteSellerSubmission,
      deleteFactorySubmission,
      isAdmin,
      adminLogin,
      adminLogout,
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
