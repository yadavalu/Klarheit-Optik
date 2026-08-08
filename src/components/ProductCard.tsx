'use client';

import React from 'react';
import Link from 'next/link';
import { Star, ShoppingCart, ArrowUpRight } from 'lucide-react';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <div className="glass-card" style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      minHeight: '440px',
      position: 'relative'
    }}>
      {/* Coating flare overlay that intensifies on card hover */}
      <div className={`lens-flare-layer ${product.coating.flareClass}`} />

      {/* Made In Germany Sticker */}
      <div style={{
        position: 'absolute',
        top: '12px',
        left: '12px',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '4px'
      }}>
        <span className="eng-seal" style={{ fontSize: '0.6rem', padding: '2px 6px' }}>
          DE OPTIK
        </span>
      </div>

      {/* Product Category Rating */}
      <div style={{
        position: 'absolute',
        top: '12px',
        right: '12px',
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        background: 'rgba(0, 0, 0, 0.4)',
        padding: '4px 8px',
        borderRadius: '6px',
        backdropFilter: 'blur(4px)'
      }}>
        <Star size={12} fill="var(--de-gold)" stroke="var(--de-gold)" />
        <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>{product.rating}</span>
      </div>

      {/* Interactive CSS Lens Render */}
      <div style={{
        height: '200px',
        background: 'radial-gradient(circle at center, rgba(18, 18, 22, 0.8) 0%, rgba(8, 8, 10, 1) 100%)',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Glowing aura around lens */}
        <div style={{
          position: 'absolute',
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${product.coating.color}22 0%, transparent 70%)`,
          filter: 'blur(10px)'
        }} />

        {/* Heavy Camera Lens Body Render in CSS */}
        <div style={{
          position: 'relative',
          width: '110px',
          height: '110px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #2d2d35 0%, #0d0d0f 100%)',
          border: '4px solid #16161a',
          boxShadow: '0 8px 24px rgba(0,0,0,0.6), inset 0 2px 4px rgba(255,255,255,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'transform 0.5s ease'
        }} className="lens-body">
          {/* Aperture ring ridges */}
          <div style={{
            position: 'absolute',
            top: '-2px', left: '-2px', right: '-2px', bottom: '-2px',
            borderRadius: '50%',
            border: '2px dashed #3a3a45',
            opacity: 0.6
          }} />

          {/* Golden Ring (Signature of German Excellence) */}
          <div style={{
            position: 'absolute',
            width: '94px',
            height: '94px',
            borderRadius: '50%',
            border: '1.5px solid var(--de-gold)',
            opacity: 0.8
          }} />

          {/* Lens Glass (Colored reflection matching coating color) */}
          <div style={{
            width: '82px',
            height: '82px',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${product.coating.color}aa 0%, rgba(0,0,0,0.95) 75%)`,
            border: '2px solid #1a1a22',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: `inset 0 0 20px ${product.coating.color}55`,
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Gloss reflection highlight */}
            <div style={{
              position: 'absolute',
              top: '10px',
              left: '15px',
              width: '45px',
              height: '25px',
              background: 'linear-gradient(to bottom, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.0) 100%)',
              borderRadius: '50% 50% 30% 30% / 70% 70% 30% 30%',
              transform: 'rotate(-25deg)',
              pointerEvents: 'none'
            }} />

            {/* Inner element aperture */}
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: '#040405',
              border: '2px solid rgba(255, 255, 255, 0.05)',
              boxShadow: 'inset 0 0 10px rgba(0,0,0,0.8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {/* Central iris */}
              <div style={{
                width: '14px',
                height: '14px',
                borderRadius: '50%',
                background: `radial-gradient(circle, ${product.coating.color}ff 0%, #000000 80%)`,
                opacity: 0.8
              }} />
            </div>
          </div>
        </div>

        {/* Floating specifications badges on image */}
        <span style={{
          position: 'absolute',
          bottom: '8px',
          left: '12px',
          fontSize: '0.75rem',
          color: 'var(--fg-secondary)',
          background: 'rgba(0,0,0,0.6)',
          padding: '2px 8px',
          borderRadius: '4px',
          border: '1px solid var(--border-color)'
        }}>
          {product.specs.focalLength}
        </span>
        <span style={{
          position: 'absolute',
          bottom: '8px',
          right: '12px',
          fontSize: '0.75rem',
          color: 'var(--fg-secondary)',
          background: 'rgba(0,0,0,0.6)',
          padding: '2px 8px',
          borderRadius: '4px',
          border: '1px solid var(--border-color)'
        }}>
          {product.specs.aperture.split(' ')[0]}
        </span>
      </div>

      {/* Meta descriptions and title */}
      <div style={{
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'space-between'
      }}>
        <div>
          <span style={{
            fontSize: '0.7rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            color: product.coating.color,
            marginBottom: '6px',
            display: 'block'
          }}>
            {product.category === 'cinema' ? 'Cine Optik' : product.category === 'specialty' ? 'Spezial Linse' : 'Kamera Linse'}
          </span>
          <h3 style={{
            fontSize: '1.15rem',
            fontWeight: 700,
            lineHeight: 1.3,
            marginBottom: '6px',
            fontFamily: 'var(--font-display)',
            color: '#ffffff'
          }}>
            {product.name}
          </h3>
          <p style={{
            fontSize: '0.8rem',
            color: 'var(--fg-secondary)',
            lineHeight: 1.4,
            minHeight: '44px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            marginBottom: '16px'
          }}>
            {product.tagline}
          </p>
        </div>

        {/* Pricing Actions */}
        <div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginBottom: '16px'
          }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--fg-secondary)' }}>München Optik</span>
            <span style={{
              fontSize: '1.35rem',
              fontWeight: 800,
              color: 'var(--de-gold)',
              fontFamily: 'var(--font-display)'
            }}>
              €{product.price.toLocaleString('de-DE')}
            </span>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <Link
              href={`/products/${product.id}`}
              className="btn-secondary"
              style={{
                flex: 1,
                padding: '10px 16px',
                fontSize: '0.85rem',
                borderRadius: '6px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px'
              }}
            >
              Details
              <ArrowUpRight size={14} />
            </Link>
            <button
              onClick={() => addToCart(product)}
              className="btn-primary"
              style={{
                padding: '10px',
                width: '42px',
                height: '42px',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <ShoppingCart size={16} />
            </button>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .glass-card:hover .lens-body {
          transform: rotate(15deg) scale(1.05);
        }
      `}</style>
    </div>
  );
}
