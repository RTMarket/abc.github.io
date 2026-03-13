import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { zh } from './zh';
import { en } from './en';
import type { Translation } from './zh';

type Language = 'zh' | 'en';

interface LanguageContextType {
  language: Language;
  t: Translation;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

const translations: Record<Language, Translation> = {
  zh,
  en,
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    if (saved === 'zh' || saved === 'en') {
      return saved;
    }
    // 检测浏览器语言
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('zh')) {
      return 'zh';
    }
    return 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'zh' ? 'en' : 'zh');
  };

  const value: LanguageContextType = {
    language,
    t: translations[language],
    setLanguage,
    toggleLanguage,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
