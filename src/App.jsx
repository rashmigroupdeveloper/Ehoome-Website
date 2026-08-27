import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import WhatWeDo from './pages/WhatWeDo';
import PCBAssembly from './pages/PCBAssembly';
import CRM from './pages/CRM';
import EMSApp from './pages/EMSApp';
import VBMS from './pages/VBMS';
import WebDevelopment from './pages/WebDevelopment';
import Capabilities from './pages/Capabilities';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Quality from './pages/Quality';
import About from './pages/About';
import Contact from './pages/Contact';
import './styles/tokens.css';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/what-we-do" element={<WhatWeDo />} />
            <Route path="/what-we-do/pcb-assembly" element={<PCBAssembly />} />
            <Route path="/what-we-do/crm" element={<CRM />} />
            <Route path="/what-we-do/ems" element={<EMSApp />} />
            <Route path="/what-we-do/vbms" element={<VBMS />} />
            <Route path="/what-we-do/web-development" element={<WebDevelopment />} />
            <Route path="/capabilities" element={<Capabilities />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:slug" element={<ProductDetail />} />
            <Route path="/quality" element={<Quality />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
