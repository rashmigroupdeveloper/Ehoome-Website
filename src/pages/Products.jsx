import CinematicHero from '../components/CinematicHero';
import ProductIndex from '../components/ProductIndex';
import FamilyChapter from '../components/FamilyChapter';
import ProofMarquee from '../components/ProofMarquee';
import CTABand from '../components/CTABand';
import { CATALOG_CHAPTERS, CATALOG_INDEX, CATALOG_SKU_COUNT } from '../data/productCatalog';
import './Products.css';

export default function Products() {
  return (
    <div className="products-page">
      <CinematicHero
        layout="hud"
        breadcrumb="Home / Products"
        title="Hardware the OEM puts its name on."
        support="Networking and device lines manufactured in Noida — chassis, firmware and QC under one roof, branded for the OEM."
        media={{
          video: '/assets/stock/products/hero-ports.mp4',
          poster: '/assets/stock/products/hero-poster.jpg',
        }}
        hud={[
          { label: 'Lines', value: String(CATALOG_SKU_COUNT) },
          { label: 'Floor', value: 'Noida' },
          { label: 'Capacity', value: '450K / mo' },
          { label: 'Chapters', value: String(CATALOG_CHAPTERS.length) },
        ]}
        ctaButtons={[
          { label: 'Browse the floor', href: '#switching', variant: 'highlight' },
          { label: 'Configure a SKU', href: '/configure', variant: 'ghost' },
        ]}
      />

      <ProductIndex items={CATALOG_INDEX} />

      <div className="products-chapters">
        {CATALOG_CHAPTERS.map((chapter, i) => (
          <FamilyChapter key={chapter.id} chapter={chapter} index={i} />
        ))}
      </div>

      <ProofMarquee />

      <CTABand
        heading="Specify a branded SKU on this floor"
        subheading="Pick a family, set ports and volume, and a manufacturing engineer replies within two working days."
        buttonText="Open the configurator"
        buttonLink="/configure"
      />
    </div>
  );
}
