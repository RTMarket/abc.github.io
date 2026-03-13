import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from '@/i18n/LanguageContext';
import { AdminProvider } from '@/store/AdminContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Home } from '@/pages/Home';
import { About } from '@/pages/About';
import { Services } from '@/pages/Services';
import { Contact } from '@/pages/Contact';
import { Privacy } from '@/pages/Privacy';
import { SellerRegister } from '@/pages/SellerRegister';
import { FactoryRegister } from '@/pages/FactoryRegister';
import { Admin } from '@/pages/Admin';

function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <AdminProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/seller-register" element={<SellerRegister />} />
                <Route path="/factory-register" element={<FactoryRegister />} />
                <Route path="/admin" element={<Admin />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </AdminProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;
