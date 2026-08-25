import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import WhatWeDo from './pages/WhatWeDo';
import PCBAssembly from './pages/PCBAssembly';
import Capabilities from './pages/Capabilities';
import Products from './pages/Products';
import ManagedSwitches from './pages/ManagedSwitches';
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
            <Route path="/capabilities" element={<Capabilities />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/managed-switches" element={<ManagedSwitches />} />
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
