import { lazy } from 'react';
import { matchRoutes } from 'react-router-dom';
// Home is the landing route — kept eager so first paint never waits on a chunk.
import Home from './pages/Home';

// Every lazy route keeps a reference to its own import() so the transition can
// warm the chunk while the curtain is closing. import() is memoised by the
// module registry, so calling load() on hover and again on click costs nothing
// the second time.
const chunk = {
  whatWeDo: () => import('./pages/WhatWeDo'),
  pcbAssembly: () => import('./pages/PCBAssembly'),
  crm: () => import('./pages/CRM'),
  ems: () => import('./pages/EMSApp'),
  vbms: () => import('./pages/VBMS'),
  web: () => import('./pages/WebDevelopment'),
  capabilities: () => import('./pages/Capabilities'),
  products: () => import('./pages/Products'),
  configure: () => import('./pages/Configure'),
  productDetail: () => import('./pages/ProductDetail'),
  quality: () => import('./pages/Quality'),
  about: () => import('./pages/About'),
  contact: () => import('./pages/Contact'),
  notFound: () => import('./pages/NotFound'),
};

const WhatWeDo = lazy(chunk.whatWeDo);
const PCBAssembly = lazy(chunk.pcbAssembly);
const CRM = lazy(chunk.crm);
const EMSApp = lazy(chunk.ems);
const VBMS = lazy(chunk.vbms);
const WebDevelopment = lazy(chunk.web);
const Capabilities = lazy(chunk.capabilities);
const Products = lazy(chunk.products);
const Configure = lazy(chunk.configure);
const ProductDetail = lazy(chunk.productDetail);
const Quality = lazy(chunk.quality);
const About = lazy(chunk.about);
const Contact = lazy(chunk.contact);
const NotFound = lazy(chunk.notFound);

// `label` is what the transition readout prints while the page is covered.
export const routes = [
  { path: '/', element: <Home />, label: 'Index' },
  { path: '/what-we-do', element: <WhatWeDo />, load: chunk.whatWeDo, label: 'What We Do' },
  {
    path: '/what-we-do/pcb-assembly',
    element: <PCBAssembly />,
    load: chunk.pcbAssembly,
    label: 'PCB Assembly',
  },
  { path: '/what-we-do/crm', element: <CRM />, load: chunk.crm, label: 'CRM' },
  { path: '/what-we-do/ems', element: <EMSApp />, load: chunk.ems, label: 'EMS' },
  { path: '/what-we-do/vbms', element: <VBMS />, load: chunk.vbms, label: 'VBMS' },
  {
    path: '/what-we-do/web-development',
    element: <WebDevelopment />,
    load: chunk.web,
    label: 'Web Development',
  },
  { path: '/capabilities', element: <Capabilities />, load: chunk.capabilities, label: 'Capabilities' },
  { path: '/products', element: <Products />, load: chunk.products, label: 'Products' },
  { path: '/products/:slug', element: <ProductDetail />, load: chunk.productDetail, label: 'Product' },
  { path: '/configure', element: <Configure />, load: chunk.configure, label: 'Configure' },
  { path: '/quality', element: <Quality />, load: chunk.quality, label: 'Quality' },
  { path: '/about', element: <About />, load: chunk.about, label: 'About' },
  { path: '/contact', element: <Contact />, load: chunk.contact, label: 'Enquiry' },
  { path: '*', element: <NotFound />, load: chunk.notFound, label: 'Not Found' },
];

function matchFor(pathname) {
  try {
    return matchRoutes(routes, pathname);
  } catch {
    return null;
  }
}

// Resolves once the chunk behind `pathname` is in memory. Failures resolve
// rather than reject: a chunk that will not load is React's Suspense problem,
// and the curtain must never hang waiting on it.
export function preloadRoute(pathname) {
  const matches = matchFor(pathname);
  if (!matches) return Promise.resolve();
  const loads = matches.map((m) => m.route.load).filter(Boolean);
  return Promise.all(loads.map((load) => load().catch(() => {})));
}

export function routeLabel(pathname) {
  const matches = matchFor(pathname);
  return matches?.[matches.length - 1]?.route.label ?? '';
}
