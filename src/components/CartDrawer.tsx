'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function CartDrawer() {
  const {
    cartItems,
    cartTotal,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart
  } = useCart();

  const drawerRef = useRef<HTMLDivElement>(null);

  // Close drawer on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsCartOpen(false);
    };
    if (isCartOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isCartOpen, setIsCartOpen]);

  if (!isCartOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 100,
      display: 'flex',
      justifyContent: 'flex-end'
    }}>
      {/* Backdrop overlay */}
      <div
        onClick={() => setIsCartOpen(false)}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.65)',
          backdropFilter: 'blur(8px)',
          animation: 'fadeIn 0.2s ease-out'
        }}
      />

      {/* Cart Panel */}
      <div
        ref={drawerRef}
        className="glass-panel animate-slide-in"
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '460px',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-10px 0 30px rgba(0, 0, 0, 0.5)',
          borderTop: 'none',
          borderRight: 'none',
          borderBottom: 'none',
          borderRadius: '20px 0 0 20px',
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '24px',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShoppingBag size={20} style={{ color: 'var(--de-gold)' }} />
            <h2 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-display)' }}>Warenkorb</h2>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            style={{
              cursor: 'pointer',
              color: 'var(--fg-secondary)',
              transition: 'var(--transition-fast)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--fg-secondary)'}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content list */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          {cartItems.length === 0 ? (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              gap: '16px',
              textAlign: 'center',
              color: 'var(--fg-secondary)'
            }}>
              <ShoppingBag size={48} style={{ opacity: 0.2, color: 'var(--de-gold)' }} />
              <p style={{ fontSize: '1rem' }}>Ihr Warenkorb ist leer.</p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="btn-secondary"
                style={{ marginTop: '8px' }}
              >
                Weiter shoppen
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.product.id}
                style={{
                  display: 'flex',
                  gap: '16px',
                  padding: '16px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '12px',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Visual coating element */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '60px',
                  height: '60px',
                  borderRadius: '0 12px 0 60px',
                  background: `radial-gradient(circle at 100% 0%, ${item.product.coating.color}22 0%, transparent 70%)`,
                  pointerEvents: 'none'
                }} />

                {/* CSS Lens Graphic representing Image */}
                <div style={{
                  width: '70px',
                  height: '70px',
                  borderRadius: '10px',
                  background: 'rgba(0, 0, 0, 0.4)',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  position: 'relative'
                }}>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    border: `2px solid ${item.product.coating.color}`,
                    background: `radial-gradient(circle, ${item.product.coating.color}44 0%, transparent 70%)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <div style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)'
                    }} />
                  </div>
                  {/* Made in label */}
                  <span style={{
                    position: 'absolute',
                    bottom: '2px',
                    fontSize: '0.45rem',
                    color: 'var(--de-gold)',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    fontWeight: 700
                  }}>DE_OPTIK</span>
                </div>

                {/* Meta details */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#ffffff', marginBottom: '2px' }}>
                      {item.product.name}
                    </h3>
                    <p style={{ fontSize: '0.75rem', color: 'var(--fg-secondary)' }}>
                      Coating: <span style={{ color: item.product.coating.color }}>{item.product.coating.name}</span>
                    </p>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '12px' }}>
                    {/* Quantity selectors */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      background: 'rgba(0, 0, 0, 0.3)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '6px',
                      padding: '2px'
                    }}>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        style={{
                          width: '24px',
                          height: '24px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          color: 'var(--fg-secondary)'
                        }}
                      >
                        <Minus size={12} />
                      </button>
                      <span style={{ fontSize: '0.85rem', width: '28px', textAlign: 'center', fontWeight: 600 }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        style={{
                          width: '24px',
                          height: '24px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          color: 'var(--fg-secondary)'
                        }}
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    {/* Price */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--de-gold)' }}>
                        €{(item.product.price * item.quantity).toLocaleString('de-DE')}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        style={{
                          cursor: 'pointer',
                          color: 'var(--fg-secondary)',
                          transition: 'var(--transition-fast)'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.color = 'var(--de-red)'}
                        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--fg-secondary)'}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div style={{
            padding: '24px',
            borderTop: '1px solid var(--border-color)',
            background: 'rgba(10, 10, 12, 0.4)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'var(--fg-secondary)', fontSize: '0.95rem' }}>Zwischensumme</span>
              <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff' }}>
                €{cartTotal.toLocaleString('de-DE')}
              </span>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--fg-secondary)' }}>
              Inkl. MwSt. zzgl. kostenloser DHL Express-Versand aus Deutschland.
            </p>
            <Link
              href="/checkout"
              onClick={() => setIsCartOpen(false)}
              className="btn-primary"
              style={{
                width: '100%',
                padding: '16px',
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              Zur Kasse gehen
              <ArrowRight size={18} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
