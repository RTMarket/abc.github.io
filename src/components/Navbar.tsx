import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [applyOpen, setApplyOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg md:text-xl">FSC</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <Link to="/" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">
              {t.nav.home}
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">
              {t.nav.about}
            </Link>

            {/* Services Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 text-gray-700 hover:text-orange-600 font-medium transition-colors">
                {t.nav.services}
                <ChevronDown size={16} className="group-hover:rotate-180 transition-transform" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform translate-y-2 group-hover:translate-y-0">
                <div className="py-2">
                  <Link
                    to="/services#company"
                    className="block px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                    onClick={() => setServicesOpen(false)}
                  >
                    {language === 'zh' ? '本土企业服务' : 'Local Company Services'}
                  </Link>
                  <Link
                    to="/services#store"
                    className="block px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                    onClick={() => setServicesOpen(false)}
                  >
                    {language === 'zh' ? '合规店铺方案' : 'Compliant Store Solutions'}
                  </Link>
                  <Link
                    to="/services#supply"
                    className="block px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                    onClick={() => setServicesOpen(false)}
                  >
                    {language === 'zh' ? '本土供应链' : 'Local Supply Chain'}
                  </Link>
                  <Link
                    to="/services#ecosystem"
                    className="block px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                    onClick={() => setServicesOpen(false)}
                  >
                    {language === 'zh' ? '生态资源对接' : 'Ecosystem Resources'}
                  </Link>
                </div>
              </div>
            </div>

            <Link to="/careers" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">
              {t.nav.careers}
            </Link>

            <Link to="/contact" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">
              {t.nav.contact}
            </Link>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 hover:border-orange-300 hover:bg-orange-50 transition-colors"
            >
              <Globe size={18} className="text-gray-600" />
              <span className="text-sm font-medium text-gray-700">
                {language === 'zh' ? 'EN' : '中'}
              </span>
            </button>

            {/* Apply Now Dropdown - Desktop */}
            <div className="relative group">
              <button className="flex items-center gap-1 px-4 py-2 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-colors text-sm">
                {t.nav.applyNow}
                <ChevronDown size={16} className="group-hover:rotate-180 transition-transform" />
              </button>
              <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform translate-y-2 group-hover:translate-y-0">
                <div className="py-2">
                  <Link
                    to="/seller-register"
                    className="block px-4 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-600 font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t.nav.sellerRegister}
                  </Link>
                  <Link
                    to="/factory-register"
                    className="block px-4 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-600 font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t.nav.factoryRegister}
                  </Link>
                  <Link
                    to="/partner-register"
                    className="block px-4 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-600 font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t.nav.partnerRegister}
                  </Link>
                </div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t">
          <div className="px-4 py-4 space-y-3">
            <Link
              to="/"
              className="block py-2 text-gray-700 font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t.nav.home}
            </Link>
            <Link
              to="/about"
              className="block py-2 text-gray-700 font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t.nav.about}
            </Link>

            {/* Services Accordion */}
            <div>
              <button
                className="flex items-center justify-between w-full py-2 text-gray-700 font-medium"
                onClick={() => setServicesOpen(!servicesOpen)}
              >
                {t.nav.services}
                <ChevronDown size={16} className={`transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
              </button>
              {servicesOpen && (
                <div className="pl-4 mt-2 space-y-2">
                  <Link to="/services#company" className="block py-2 text-gray-600" onClick={() => setMobileMenuOpen(false)}>
                    {language === 'zh' ? '本土企业服务' : 'Local Company Services'}
                  </Link>
                  <Link to="/services#store" className="block py-2 text-gray-600" onClick={() => setMobileMenuOpen(false)}>
                    {language === 'zh' ? '合规店铺方案' : 'Compliant Store Solutions'}
                  </Link>
                  <Link to="/services#supply" className="block py-2 text-gray-600" onClick={() => setMobileMenuOpen(false)}>
                    {language === 'zh' ? '本土供应链' : 'Local Supply Chain'}
                  </Link>
                  <Link to="/services#ecosystem" className="block py-2 text-gray-600" onClick={() => setMobileMenuOpen(false)}>
                    {language === 'zh' ? '生态资源对接' : 'Ecosystem Resources'}
                  </Link>
                </div>
              )}
            </div>

            <Link
              to="/careers"
              className="block py-2 text-gray-700 font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t.nav.careers}
            </Link>

            <Link
              to="/contact"
              className="block py-2 text-gray-700 font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t.nav.contact}
            </Link>

            {/* Apply Now Accordion - Mobile */}
            <div>
              <button
                className="flex items-center justify-between w-full py-2 text-orange-600 font-medium"
                onClick={() => setApplyOpen(!applyOpen)}
              >
                {t.nav.applyNow}
                <ChevronDown size={16} className={`transition-transform ${applyOpen ? 'rotate-180' : ''}`} />
              </button>
              {applyOpen && (
                <div className="pl-4 mt-2 space-y-2">
                  <Link
                    to="/seller-register"
                    className="block py-3 text-gray-700 font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t.nav.sellerRegister}
                  </Link>
                  <Link
                    to="/factory-register"
                    className="block py-3 text-gray-700 font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t.nav.factoryRegister}
                  </Link>
                  <Link
                    to="/partner-register"
                    className="block py-3 text-gray-700 font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t.nav.partnerRegister}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
