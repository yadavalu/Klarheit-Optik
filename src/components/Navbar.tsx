'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingBag, Award } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  const { cartCount, setIsCartOpen } = useCart();

  return (
    <header className="glass-panel" style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      borderRadius: '0 0 16px 16px',
      borderTop: 'none',
      borderLeft: 'none',
      borderRight: 'none'
    }}>
      {/* German Flag Ribbon Accent */}
      <div className="de-ribbon">
        <div className="de-ribbon-black"></div>
        <div className="de-ribbon-red"></div>
        <div className="de-ribbon-gold"></div>
      </div>

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '16px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            position: 'relative',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            border: '2px solid var(--de-gold)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 10px var(--de-gold-glow)'
          }}>
            <div style={{
              width: '18px',
              height: '18px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, var(--coating-blue) 0%, transparent 80%)',
              border: '1.5px solid var(--de-red)',
              opacity: 0.9
            }}></div>
          </div>
          <div>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: '1.35rem',
              letterSpacing: '-0.02em',
              background: 'linear-gradient(to right, #ffffff, #94a3b8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              KLARHEIT
            </span>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 500,
              fontSize: '0.85rem',
              letterSpacing: '0.2em',
              color: 'var(--de-gold)',
              marginLeft: '4px',
              textTransform: 'uppercase'
            }}>
              Optik
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
          <Link href="/" style={{
            fontSize: '0.9rem',
            fontWeight: 500,
            color: 'var(--fg-primary)',
            transition: 'var(--transition-fast)'
          }} className="nav-link">
            Startseite
          </Link>
          <Link href="/#products" style={{
            fontSize: '0.9rem',
            fontWeight: 500,
            color: 'var(--fg-secondary)',
            transition: 'var(--transition-fast)'
          }} className="nav-link-secondary">
            Linsen
          </Link>
          <Link href="/#engineering" style={{
            fontSize: '0.9rem',
            fontWeight: 500,
            color: 'var(--fg-secondary)',
            transition: 'var(--transition-fast)'
          }} className="nav-link-secondary">
            Technologie
          </Link>
        </nav>

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* Engineering Seal */}
          <div className="eng-seal" style={{ display: 'none' /* Hidden on small screens via CSS/JS later, visible here */ }}>
            <Award size={12} />
            DE_OPTIK
          </div>

          {/* Cart Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-color)',
              cursor: 'pointer',
              transition: 'var(--transition-fast)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
              e.currentTarget.style.borderColor = 'var(--de-gold)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
              e.currentTarget.style.borderColor = 'var(--border-color)';
            }}
          >
            <ShoppingBag size={18} style={{ color: 'var(--fg-primary)' }} />
            {cartCount > 0 && (
              <span className="badge badge-gold" style={{
                position: 'absolute',
                top: '-5px',
                right: '-5px',
                minWidth: '18px',
                height: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 6px var(--de-gold-glow)'
              }}>
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      <style jsx global>{`
        .nav-link:hover {
          color: var(--de-gold) !important;
        }
        .nav-link-secondary:hover {
          color: var(--fg-primary) !important;
        }
        @media (max-width: 640px) {
          .eng-seal {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}
