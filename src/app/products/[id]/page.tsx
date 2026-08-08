'use client';

import React, { use, useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Star, ShoppingBag, ShieldCheck, Truck, RefreshCw, Layers } from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import { useCart } from '@/context/CartContext';
import ProductCard from '@/components/ProductCard';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = use(params);
  const { addToCart } = useCart();
  
  // Find product
  const product = PRODUCTS.find((p) => p.id === resolvedParams.id);
  
  // State for quantity counter and active tab
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'guarantee' | 'packaging'>('specs');
  const [selectedMount, setSelectedMount] = useState('');

  // Handle case where product is not found
  if (!product) {
    notFound();
  }

  // Auto select first mount option
  const mountOptions = product.specs.mount.split(' / ');
  if (!selectedMount && mountOptions.length > 0) {
    setSelectedMount(mountOptions[0]);
  }

  // Get related products (same category or others, max 2)
  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 2);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px' }}>
      
      {/* Back button */}
      <Link href="/" style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        color: 'var(--fg-secondary)',
        fontSize: '0.9rem',
        marginBottom: '32px',
        transition: 'var(--transition-fast)'
      }}
        onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--fg-secondary)'}
      >
        <ArrowLeft size={16} />
        Zurück zur Übersicht
      </Link>

      {/* Main product showcase grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.1fr 0.9fr',
        gap: '60px',
        alignItems: 'start'
      }} className="product-grid">
        
        {/* Left Side: Giant CSS Interactive Lens Visualizer */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px'
        }}>
          <div className="glass-panel" style={{
            width: '100%',
            height: '460px',
            borderRadius: '24px',
            background: 'radial-gradient(circle at center, rgba(22, 22, 28, 0.8) 0%, rgba(8, 8, 10, 1) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Ambient coating color glow in background */}
            <div style={{
              position: 'absolute',
              width: '320px',
              height: '320px',
              borderRadius: '50%',
              background: `radial-gradient(circle, ${product.coating.color}22 0%, transparent 70%)`,
              filter: 'blur(30px)',
              pointerEvents: 'none'
            }} />

            {/* Giant Lens Body in CSS */}
            <div style={{
              width: '260px',
              height: '260px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #33333d 0%, #0a0a0c 100%)',
              border: '10px solid #1a1a22',
              boxShadow: '0 30px 60px rgba(0,0,0,0.8), inset 0 4px 8px rgba(255,255,255,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}>
              {/* Focus Ring Ridges */}
              <div style={{
                position: 'absolute',
                top: '-4px', left: '-4px', right: '-4px', bottom: '-4px',
                borderRadius: '50%',
                border: '4px dashed #4e4e5d',
                opacity: 0.5
              }} />

              {/* Signature German Flag Accent Line inside lens ring */}
              <div style={{
                position: 'absolute',
                width: '232px',
                height: '232px',
                borderRadius: '50%',
                border: '2px solid var(--de-gold)',
                opacity: 0.9
              }} />

              {/* Glass elements reflection */}
              <div style={{
                width: '210px',
                height: '210px',
                borderRadius: '50%',
                background: `radial-gradient(circle, ${product.coating.color}99 0%, rgba(0,0,0,0.95) 80%)`,
                boxShadow: `inset 0 0 40px ${product.coating.color}66`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden'
              }}>
                {/* Shiny white glass reflection highlights */}
                <div style={{
                  position: 'absolute',
                  top: '25px',
                  left: '35px',
                  width: '120px',
                  height: '60px',
                  background: 'linear-gradient(to bottom, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.0) 100%)',
                  borderRadius: '50% 50% 30% 30% / 70% 70% 30% 30%',
                  transform: 'rotate(-25deg)',
                  pointerEvents: 'none'
                }} />

                {/* Aperture blades center */}
                <div style={{
                  width: '90px',
                  height: '90px',
                  borderRadius: '50%',
                  background: '#040405',
                  border: '3px solid rgba(255, 255, 255, 0.05)',
                  boxShadow: 'inset 0 0 20px rgba(0,0,0,0.9)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {/* Central iris optics reflection */}
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${product.coating.color}ff 0%, #000000 80%)`,
                    opacity: 0.95,
                    boxShadow: `0 0 15px ${product.coating.color}aa`
                  }} />
                </div>
              </div>
            </div>

            {/* Spec overlays */}
            <span style={{
              position: 'absolute',
              bottom: '16px',
              left: '20px',
              fontFamily: 'var(--font-display)',
              fontSize: '0.85rem',
              color: 'var(--fg-secondary)',
              border: '1px solid var(--border-color)',
              background: 'rgba(0,0,0,0.6)',
              padding: '4px 12px',
              borderRadius: '6px'
            }}>
              {product.specs.focalLength} Linse
            </span>
            <span style={{
              position: 'absolute',
              bottom: '16px',
              right: '20px',
              fontFamily: 'var(--font-display)',
              fontSize: '0.85rem',
              color: 'var(--fg-secondary)',
              border: '1px solid var(--border-color)',
              background: 'rgba(0,0,0,0.6)',
              padding: '4px 12px',
              borderRadius: '6px'
            }}>
              Blende {product.specs.aperture.split(' ')[0]}
            </span>
          </div>

          {/* Quick Specifications Badges */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px',
            width: '100%'
          }}>
            {[
              { label: 'Brennweite', value: product.specs.focalLength },
              { label: 'Lichtstärke', value: product.specs.aperture.split(' ')[0] },
              { label: 'Filtergewinde', value: product.specs.filterSize.split(' ')[0] }
            ].map((spec, idx) => (
              <div key={idx} className="glass-panel" style={{ padding: '12px', textAlign: 'center', borderRadius: '12px' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--fg-secondary)', marginBottom: '4px' }}>{spec.label}</div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff' }}>{spec.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Product Meta and Purchase Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          
          {/* Engineering verification header */}
          <div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '12px' }}>
              <span className="eng-seal">{product.madeIn}</span>
              <span className="eng-seal" style={{
                color: product.coating.color,
                borderColor: `${product.coating.color}44`,
                background: `${product.coating.color}0a`
              }}>{product.coating.name}</span>
            </div>

            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: 800,
              fontFamily: 'var(--font-display)',
              lineHeight: 1.2,
              color: '#ffffff',
              marginBottom: '8px'
            }}>
              {product.name}
            </h1>

            <p style={{
              fontSize: '1.15rem',
              color: 'var(--de-gold)',
              fontWeight: 500,
              fontFamily: 'var(--font-display)',
              marginBottom: '16px'
            }}>
              {product.tagline}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              {/* Rating */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill={i < Math.floor(product.rating) ? 'var(--de-gold)' : 'transparent'}
                    stroke="var(--de-gold)"
                  />
                ))}
                <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#ffffff', marginLeft: '6px' }}>
                  {product.rating}
                </span>
              </div>
              <span style={{ color: 'var(--border-glow)' }}>|</span>
              <span style={{ fontSize: '0.85rem', color: 'var(--fg-secondary)' }}>
                {product.reviewsCount} Verifizierte Bewertungen
              </span>
            </div>
          </div>

          {/* Price Block */}
          <div style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid var(--border-color)',
            padding: '20px',
            borderRadius: '16px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
              <span style={{ color: 'var(--fg-secondary)', fontSize: '0.9rem' }}>Preis (inkl. MwSt.)</span>
              <span style={{ fontSize: '2rem', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-display)' }}>
                €{product.price.toLocaleString('de-DE')}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--de-gold)', fontSize: '0.85rem' }}>
              <Truck size={14} />
              <span>Gratis DHL Express Versand aus München (1-2 Werktage)</span>
            </div>
          </div>

          {/* Brief Info */}
          <p style={{ fontSize: '0.95rem', color: 'var(--fg-secondary)', lineHeight: 1.6 }}>
            {product.description}
          </p>

          {/* Mount Selection */}
          <div className="form-group">
            <label>Wählen Sie den Kamera-Anschluss (Mount):</label>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '6px' }}>
              {mountOptions.map((mount) => (
                <button
                  key={mount}
                  onClick={() => setSelectedMount(mount)}
                  style={{
                    padding: '10px 16px',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    background: selectedMount === mount ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.01)',
                    color: selectedMount === mount ? 'var(--de-gold)' : 'var(--fg-secondary)',
                    border: selectedMount === mount ? '1.5px solid var(--de-gold)' : '1.5px solid var(--border-color)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {mount}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity and Cart Buttons */}
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            {/* Quantity Selector */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              padding: '6px'
            }}>
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                style={{
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: 'var(--fg-secondary)',
                  fontSize: '1.2rem'
                }}
              >
                -
              </button>
              <span style={{ fontSize: '1rem', width: '40px', textAlign: 'center', fontWeight: 700 }}>
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                style={{
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: 'var(--fg-secondary)',
                  fontSize: '1.2rem'
                }}
              >
                +
              </button>
            </div>

            {/* Main Add Button */}
            <button
              onClick={() => addToCart(product, quantity)}
              className="btn-primary"
              style={{
                flex: 1,
                padding: '16px',
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px'
              }}
            >
              <ShoppingBag size={18} />
              In den Warenkorb &bull; €{(product.price * quantity).toLocaleString('de-DE')}
            </button>
          </div>
        </div>
      </div>

      {/* Germany Flags Dividers */}
      <div style={{ height: '1px', background: 'var(--border-color)', margin: '60px 0' }} />

      {/* Tabs and specs details */}
      <section style={{ marginBottom: '60px' }}>
        {/* Tab Headers */}
        <div style={{
          display: 'flex',
          borderBottom: '1px solid var(--border-color)',
          gap: '24px',
          marginBottom: '24px',
          overflowX: 'auto'
        }}>
          {([
            { id: 'specs', label: 'Technische Spezifikationen' },
            { id: 'guarantee', label: 'Garantie & Service' },
            { id: 'packaging', label: 'Verpackung & Versand' }
          ] as const).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '12px 4px',
                fontSize: '0.95rem',
                fontWeight: 600,
                cursor: 'pointer',
                color: activeTab === tab.id ? 'var(--de-gold)' : 'var(--fg-secondary)',
                borderBottom: activeTab === tab.id ? '2px solid var(--de-gold)' : '2px solid transparent',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content Panels */}
        <div className="glass-panel" style={{ padding: '30px', borderRadius: '16px' }}>
          {activeTab === 'specs' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }} className="specs-tab-grid">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.03)', paddingBottom: '8px' }}>
                  <span style={{ color: 'var(--fg-secondary)' }}>Brennweite</span>
                  <span style={{ fontWeight: 600, color: '#ffffff' }}>{product.specs.focalLength}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.03)', paddingBottom: '8px' }}>
                  <span style={{ color: 'var(--fg-secondary)' }}>Blendenbereich</span>
                  <span style={{ fontWeight: 600, color: '#ffffff' }}>{product.specs.aperture}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.03)', paddingBottom: '8px' }}>
                  <span style={{ color: 'var(--fg-secondary)' }}>Anschlüsse</span>
                  <span style={{ fontWeight: 600, color: '#ffffff' }}>{product.specs.mount}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.03)', paddingBottom: '8px' }}>
                  <span style={{ color: 'var(--fg-secondary)' }}>Linsenaufbau</span>
                  <span style={{ fontWeight: 600, color: '#ffffff' }}>{product.specs.construction}</span>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.03)', paddingBottom: '8px' }}>
                  <span style={{ color: 'var(--fg-secondary)' }}>Filtergewinde</span>
                  <span style={{ fontWeight: 600, color: '#ffffff' }}>{product.specs.filterSize}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.03)', paddingBottom: '8px' }}>
                  <span style={{ color: 'var(--fg-secondary)' }}>Gewicht</span>
                  <span style={{ fontWeight: 600, color: '#ffffff' }}>{product.specs.weight}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.03)', paddingBottom: '8px' }}>
                  <span style={{ color: 'var(--fg-secondary)' }}>Herkunftsland</span>
                  <span style={{ fontWeight: 600, color: 'var(--de-gold)' }}>Deutschland (Oberbayern/Hessen)</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'guarantee' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'start' }}>
                <ShieldCheck size={28} style={{ color: 'var(--de-gold)', flexShrink: 0 }} />
                <div>
                  <h4 style={{ color: '#ffffff', fontSize: '1.1rem', marginBottom: '4px' }}>5 Jahre Deutsche Herstellergarantie</h4>
                  <p style={{ color: 'var(--fg-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                    Als Beweis unseres Vertrauens in unsere feinmechanische Präzisionsarbeit gewähren wir auf alle Klarheit-Linsen eine umfassende 5-jährige Garantie ab Kaufdatum.
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'start' }}>
                <RefreshCw size={28} style={{ color: 'var(--de-red)', flexShrink: 0 }} />
                <div>
                  <h4 style={{ color: '#ffffff', fontSize: '1.1rem', marginBottom: '4px' }}>Lebenslanger Justierungsservice</h4>
                  <p style={{ color: 'var(--fg-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                    Sollte Ihre Linse nach starker Beanspruchung eine Neukalibrierung erfordern, senden Sie sie einfach an unser Hauptwerk in Wetzlar. Wir kalibrieren Ihre Optik innerhalb von 3 Werktagen kostenlos auf Werksparameter.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'packaging' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'start' }}>
                <Layers size={28} style={{ color: 'var(--coating-blue)', flexShrink: 0 }} />
                <div>
                  <h4 style={{ color: '#ffffff', fontSize: '1.1rem', marginBottom: '4px' }}>Stoßfestes Aluminium-Hardcase</h4>
                  <p style={{ color: 'var(--fg-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                    Jede Linse wird in einem passgenauen, wasserdichten Aluminium-Koffer mit lasergeschnittenem Schaumstoff-Inlay geliefert. Dies schützt Ihre wertvolle Optik optimal auf Reisen und am Set.
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'start' }}>
                <Truck size={28} style={{ color: 'var(--de-gold)', flexShrink: 0 }} />
                <div>
                  <h4 style={{ color: '#ffffff', fontSize: '1.1rem', marginBottom: '4px' }}>Kostenloser DHL Express-Versand</h4>
                  <p style={{ color: 'var(--fg-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                    Wir versenden alle Bestellungen innerhalb von 24 Stunden per DHL Express. Nach dem Versand erhalten Sie eine Echtzeit-Trackingnummer. Lieferungen innerhalb Deutschlands dauern meist nur 1 Werktag.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Related Lenses Section */}
      <section style={{ margin: '80px 0 40px 0' }}>
        <h3 style={{ fontSize: '1.5rem', color: '#ffffff', marginBottom: '24px', fontFamily: 'var(--font-display)' }}>
          Verwandte deutsche Optiken
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '30px'
        }}>
          {relatedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <style jsx global>{`
        @media (max-width: 800px) {
          .product-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .specs-tab-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
        }
      `}</style>
    </div>
  );
}
