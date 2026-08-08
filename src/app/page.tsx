'use client';

import React, { useState, useMemo } from 'react';
import { Award, Shield, Compass, SlidersHorizontal } from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import LensVisualizer from '@/components/LensVisualizer';

type CategoryFilter = 'all' | 'camera' | 'cinema' | 'specialty';
type SortOption = 'default' | 'price-asc' | 'price-desc' | 'rating-desc';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [searchQuery, setSearchQuery] = useState('');

  // Filtering and Sorting logic
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Search query filter
    if (searchQuery.trim() !== '') {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.coating.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter(product => product.category === selectedCategory);
    }

    // Sorting
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating-desc') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [selectedCategory, sortBy, searchQuery]);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
      
      {/* 1. HERO SECTION */}
      <section style={{
        padding: '100px 0 60px 0',
        textAlign: 'center',
        position: 'relative',
        zIndex: 10
      }}>
        {/* Engineering badge */}
        <div className="eng-seal" style={{ marginBottom: '24px', animation: 'fadeIn 0.8s ease-out' }}>
          <Award size={14} style={{ color: 'var(--de-gold)' }} />
          Deutsches Handwerk &bull; Höchste Präzision
        </div>

        <h1 style={{
          fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
          lineHeight: 1.1,
          fontWeight: 800,
          fontFamily: 'var(--font-display)',
          marginBottom: '20px',
          background: 'linear-gradient(to bottom, #ffffff 60%, #94a3b8 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '-0.03em'
        }}>
          Deutsche Ingenieurskunst <br />
          <span style={{
            background: 'linear-gradient(to right, var(--de-gold), var(--de-red))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Für Lebendige Farben.
          </span>
        </h1>

        <p style={{
          fontSize: 'clamp(1rem, 2vw, 1.25rem)',
          color: 'var(--fg-secondary)',
          maxWidth: '680px',
          margin: '0 auto 40px auto',
          lineHeight: 1.6,
          fontWeight: 400
        }}>
          Entwickelt in den traditionsreichsten optischen Werken Deutschlands. Unsere Linsen verbinden makellose Schärfe mit atemberaubenden, farbigen Reflexen.
        </p>

        {/* Hero CTA buttons */}
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="#products" className="btn-primary" style={{ padding: '14px 32px', fontSize: '1rem' }}>
            Kollektion Erkunden
          </a>
          <a href="#visualizer" className="btn-secondary" style={{ padding: '14px 32px', fontSize: '1rem' }}>
            Vergütung Testen
          </a>
        </div>
      </section>

      {/* Germany and Flag visual line dividers */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '20px 0 80px 0',
        gap: '12px'
      }}>
        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, var(--border-color))' }}></div>
        <div style={{ display: 'flex', gap: '4px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--de-black)', border: '1px solid rgba(255,255,255,0.1)' }}></div>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--de-red)' }}></div>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--de-gold)' }}></div>
        </div>
        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, var(--border-color))' }}></div>
      </div>

      {/* 2. INTERACTIVE VISUALIZER */}
      <section id="visualizer" style={{ scrollMarginTop: '100px' }}>
        <LensVisualizer />
      </section>

      {/* 3. CATALOG & PRODUCTS SECTION */}
      <section id="products" style={{ scrollMarginTop: '100px', margin: '80px 0' }}>
        
        {/* Section Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: '40px',
          flexWrap: 'wrap',
          gap: '24px'
        }}>
          <div>
            <span style={{
              fontSize: '0.8rem',
              fontWeight: 700,
              color: 'var(--de-gold)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '8px'
            }}>
              Katalog
            </span>
            <h2 style={{ fontSize: '2.2rem', color: '#ffffff', fontFamily: 'var(--font-display)' }}>
              Unsere Linsen-Kollektion
            </h2>
          </div>

          {/* Search bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            padding: '4px 12px',
            width: '100%',
            maxWidth: '300px'
          }}>
            <input
              type="text"
              placeholder="Suchen nach Name or Coating..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                background: 'none',
                border: 'none',
                color: '#ffffff',
                fontSize: '0.9rem',
                outline: 'none',
                padding: '8px 0'
              }}
            />
          </div>
        </div>

        {/* Filter and Sorting Controls */}
        <div className="glass-panel" style={{
          padding: '16px 24px',
          marginBottom: '32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          borderRadius: '16px'
        }}>
          {/* Category Tabs */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {[
              { id: 'all', label: 'Alle Linsen' },
              { id: 'camera', label: 'Kamera-Linsen' },
              { id: 'cinema', label: 'Kino-Linsen' },
              { id: 'specialty', label: 'Spezial-Objektive' }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as CategoryFilter)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  background: selectedCategory === cat.id ? 'var(--de-gold)' : 'rgba(255, 255, 255, 0.02)',
                  color: selectedCategory === cat.id ? 'var(--de-black)' : 'var(--fg-secondary)',
                  border: selectedCategory === cat.id ? '1px solid var(--de-gold)' : '1px solid var(--border-color)',
                  transition: 'all 0.2s ease'
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Sort dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <SlidersHorizontal size={14} style={{ color: 'var(--fg-secondary)' }} />
            <span style={{ fontSize: '0.85rem', color: 'var(--fg-secondary)' }}>Sortieren:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              style={{
                background: 'rgba(0, 0, 0, 0.4)',
                border: '1px solid var(--border-color)',
                borderRadius: '6px',
                padding: '6px 12px',
                fontSize: '0.85rem',
                color: '#ffffff',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="default">Standard</option>
              <option value="price-asc">Preis: Niedrig zu Hoch</option>
              <option value="price-desc">Preis: Hoch zu Niedrig</option>
              <option value="rating-desc">Beste Bewertungen</option>
            </select>
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredAndSortedProducts.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '60px 0',
            color: 'var(--fg-secondary)',
            border: '1px dashed var(--border-color)',
            borderRadius: '16px'
          }}>
            <p style={{ fontSize: '1.1rem' }}>Keine Linsen entsprechen Ihrer Suche.</p>
            <button
              onClick={() => { setSelectedCategory('all'); setSortBy('default'); setSearchQuery(''); }}
              className="btn-secondary"
              style={{ marginTop: '16px' }}
            >
              Filter zurücksetzen
            </button>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '30px'
          }}>
            {filteredAndSortedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* 4. GERMAN ENGINEERING STANDARDS HIGHLIGHT SECTION */}
      <section id="engineering" className="glass-panel" style={{
        padding: '60px 40px',
        borderRadius: '24px',
        margin: '100px 0',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Subtle German ribbon border on left */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '4px',
          height: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{ flex: 1, backgroundColor: 'var(--de-black)' }} />
          <div style={{ flex: 1, backgroundColor: 'var(--de-red)' }} />
          <div style={{ flex: 1, backgroundColor: 'var(--de-gold)' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }} className="eng-grid">
          <div>
            <span style={{
              fontSize: '0.8rem',
              fontWeight: 700,
              color: 'var(--de-gold)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '8px'
            }}>
              Ingenieurskunst
            </span>
            <h2 style={{
              fontSize: '2.2rem',
              color: '#ffffff',
              marginBottom: '20px',
              fontFamily: 'var(--font-display)'
            }}>
              Warum deutsche Optik unübertroffen ist
            </h2>
            <p style={{ color: 'var(--fg-secondary)', fontSize: '1rem', lineHeight: '1.7', marginBottom: '24px' }}>
              Die Qualität einer Linse entscheidet sich nicht nur im Labor, sondern durch jahrzehntelange Erfahrung. Jede Klarheit-Linse durchläuft in unseren Werken in Wetzlar und Oberkochen über 200 optische und mechanische Tests, um absolute Perfektion zu garantieren.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'start', gap: '12px' }}>
                <Compass style={{ color: 'var(--de-gold)', flexShrink: 0, marginTop: '2px' }} size={20} />
                <div>
                  <h4 style={{ color: '#ffffff', fontSize: '1rem', marginBottom: '4px' }}>Achromatische Korrektur</h4>
                  <p style={{ color: 'var(--fg-secondary)', fontSize: '0.85rem' }}>Eliminiert Farbsäume vollständig und liefert extrem scharfe Übergänge.</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'start', gap: '12px' }}>
                <Shield style={{ color: 'var(--de-red)', flexShrink: 0, marginTop: '2px' }} size={20} />
                <div>
                  <h4 style={{ color: '#ffffff', fontSize: '1rem', marginBottom: '4px' }}>Robuste Versiegelung</h4>
                  <p style={{ color: 'var(--fg-secondary)', fontSize: '0.85rem' }}>Gegen Feuchtigkeit und Staub geschützt - bereit für arktische Kälte oder Wüstenstürme.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Graphical lens diagram representation */}
          <div style={{
            position: 'relative',
            height: '320px',
            background: 'rgba(0, 0, 0, 0.4)',
            borderRadius: '16px',
            border: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}>
            {/* Visual simulation of glass refraction elements inside barrel */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              position: 'relative',
              width: '80%',
              justifyContent: 'space-between'
            }}>
              {/* Convex element */}
              <div style={{ width: '12px', height: '140px', borderRadius: '50% 50% 50% 50% / 10% 10% 10% 10%', background: 'rgba(255,255,255,0.05)', border: '2.5px solid var(--coating-blue)', boxShadow: '0 0 15px rgba(0, 163, 255, 0.3)' }} />
              {/* Concave element */}
              <div style={{ width: '8px', height: '100px', borderRadius: '10% 10% 10% 10% / 50% 50% 50% 50%', background: 'rgba(255,255,255,0.02)', border: '2px solid var(--coating-red)', boxShadow: '0 0 10px rgba(222, 38, 62, 0.2)' }} />
              {/* Double Convex */}
              <div style={{ width: '18px', height: '120px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)', border: '2px solid var(--coating-gold)', boxShadow: '0 0 12px rgba(255, 204, 0, 0.2)' }} />
              {/* Thin Flat element */}
              <div style={{ width: '6px', height: '80px', borderRadius: '2px', background: 'rgba(255,255,255,0.02)', border: '1.5px solid var(--coating-green)' }} />
              {/* Rear element */}
              <div style={{ width: '10px', height: '90px', borderRadius: '50% 50% 50% 50% / 20% 20% 20% 20%', background: 'rgba(255,255,255,0.05)', border: '2.5px solid var(--coating-purple)', boxShadow: '0 0 15px rgba(217, 70, 239, 0.3)' }} />
            </div>

            {/* Glowing path lines showing refraction */}
            <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
              <path d="M 10 160 Q 90 140 180 160 T 350 160" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" strokeDasharray="5,5" />
              <path d="M 10 160 Q 90 120 180 155 T 350 160" fill="none" stroke="var(--de-gold)" strokeWidth="1.5" opacity="0.6" />
              <path d="M 10 160 Q 90 200 180 165 T 350 160" fill="none" stroke="var(--coating-blue)" strokeWidth="1" opacity="0.4" />
            </svg>

            <span style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              fontFamily: 'monospace',
              fontSize: '0.65rem',
              color: 'var(--fg-secondary)'
            }}>
              LINSEN-SCHEMATIK V.08
            </span>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @media (max-width: 800px) {
          .eng-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </div>
  );
}
