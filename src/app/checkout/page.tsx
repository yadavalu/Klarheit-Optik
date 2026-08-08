'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, ArrowLeft, CreditCard, ShieldCheck, CheckCircle2, Award } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();

  // Form states
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [country, setCountry] = useState('Deutschland');
  
  // Checkout process states
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'sofort'>('card');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  // Calculations
  const shippingCost = shippingMethod === 'express' ? 15 : 0;
  const grandTotal = cartTotal + shippingCost;
  const taxAmount = (grandTotal * 0.19) / 1.19; // 19% German MwSt (VAT)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    setIsSubmitting(true);

    // Simulate server processing payment and generating order
    setTimeout(() => {
      setIsSubmitting(false);
      setOrderCompleted(true);
      const generatedOrderNum = `DE-${Math.floor(100000 + Math.random() * 900000)}-OPT`;
      setOrderNumber(generatedOrderNum);
      clearCart(); // clear global context cart
    }, 2500);
  };

  // SUCCESS SCREEN
  if (orderCompleted) {
    return (
      <div style={{ maxWidth: '600px', margin: '60px auto', padding: '0 24px', textAlign: 'center' }}>
        <div className="glass-panel animate-scale-up" style={{ padding: '48px 32px', borderRadius: '24px' }}>
          
          {/* Confetti lens graphic representation */}
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, var(--coating-green) 20%, transparent 60%)',
            border: '3px solid var(--de-gold)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px auto',
            boxShadow: '0 0 20px rgba(16, 185, 129, 0.4)'
          }}>
            <CheckCircle2 size={40} style={{ color: '#ffffff' }} />
          </div>

          <div className="eng-seal" style={{ marginBottom: '16px' }}>
            Bestellung Erfolgreich
          </div>

          <h1 style={{ fontSize: '2rem', color: '#ffffff', marginBottom: '12px', fontFamily: 'var(--font-display)' }}>
            Vielen Dank für Ihren Einkauf!
          </h1>
          
          <p style={{ color: 'var(--fg-secondary)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '24px' }}>
            Ihre Zahlung wurde verarbeitet. Eine Bestätigungs-E-Mail mit der Rechnung und Tracking-Details wird in Kürze versendet.
          </p>

          {/* Receipt Info Card */}
          <div style={{
            background: 'rgba(0, 0, 0, 0.3)',
            border: '1px solid var(--border-color)',
            padding: '20px',
            borderRadius: '12px',
            textAlign: 'left',
            marginBottom: '32px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem' }}>
              <span style={{ color: 'var(--fg-secondary)' }}>Bestellnummer:</span>
              <span style={{ fontWeight: 700, color: 'var(--de-gold)', fontFamily: 'monospace' }}>{orderNumber}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem' }}>
              <span style={{ color: 'var(--fg-secondary)' }}>Versandart:</span>
              <span style={{ fontWeight: 600, color: '#ffffff' }}>
                {shippingMethod === 'express' ? 'DHL Express (1-2 Werktage)' : 'DHL Standard (Gratis, 2-3 Werktage)'}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-color)', paddingTop: '8px', fontSize: '0.85rem' }}>
              <span style={{ color: 'var(--fg-secondary)' }}>Geliefert an:</span>
              <span style={{ fontWeight: 600, color: '#ffffff' }}>{firstName} {lastName}, {city}</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <Link href="/" className="btn-primary" style={{ padding: '12px 28px' }}>
              Zur Startseite
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // EMPTY CART CHECKOUT SCREEN
  if (cartItems.length === 0 && !isSubmitting) {
    return (
      <div style={{ maxWidth: '600px', margin: '80px auto', padding: '0 24px', textAlign: 'center' }}>
        <div className="glass-panel" style={{ padding: '48px 32px', borderRadius: '20px' }}>
          <ShoppingBag size={48} style={{ color: 'var(--de-gold)', opacity: 0.3, marginBottom: '16px' }} />
          <h2 style={{ fontSize: '1.5rem', color: '#ffffff', marginBottom: '8px' }}>Ihr Warenkorb ist leer</h2>
          <p style={{ color: 'var(--fg-secondary)', marginBottom: '24px' }}>
            Bitte fügen Sie Produkte hinzu, um mit der Kasse fortzufahren.
          </p>
          <Link href="/" className="btn-primary">
            Produkte ansehen
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 24px' }}>
      {/* Title */}
      <div style={{ marginBottom: '32px' }}>
        <Link href="/" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          color: 'var(--fg-secondary)',
          fontSize: '0.9rem',
          marginBottom: '16px',
          transition: 'var(--transition-fast)'
        }}>
          <ArrowLeft size={16} />
          Weiter einkaufen
        </Link>
        <h1 style={{ fontSize: '2.2rem', color: '#ffffff', fontFamily: 'var(--font-display)' }}>Kasse</h1>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.2fr 0.8fr',
        gap: '40px',
        alignItems: 'start'
      }} className="checkout-grid">
        
        {/* Left Side: Checkout Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Shipping Address Section */}
          <div className="glass-panel" style={{ padding: '24px', borderRadius: '16px' }}>
            <h3 style={{ fontSize: '1.2rem', color: '#ffffff', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px', borderRadius: '50%', background: 'var(--de-gold)', color: 'var(--de-black)', fontSize: '0.8rem', fontWeight: 800 }}>1</span>
              Versandadresse
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-row-2">
              <div className="form-group">
                <label htmlFor="firstName">Vorname *</label>
                <input
                  type="text"
                  id="firstName"
                  className="form-control"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Nachname *</label>
                <input
                  type="text"
                  id="lastName"
                  className="form-control"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">E-Mail-Adresse *</label>
              <input
                type="email"
                id="email"
                className="form-control"
                required
                placeholder="name@beispiel.de"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Straße und Hausnummer *</label>
              <input
                type="text"
                id="address"
                className="form-control"
                required
                placeholder="Hauptstraße 12"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '0.4fr 0.6fr', gap: '16px' }} className="form-row-2">
              <div className="form-group">
                <label htmlFor="zipCode">Postleitzahl (PLZ) *</label>
                <input
                  type="text"
                  id="zipCode"
                  className="form-control"
                  required
                  placeholder="80331"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="city">Stadt *</label>
                <input
                  type="text"
                  id="city"
                  className="form-control"
                  required
                  placeholder="München"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="country">Land</label>
              <select
                id="country"
                className="form-control"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="Deutschland">Deutschland</option>
                <option value="Österreich">Österreich</option>
                <option value="Schweiz">Schweiz</option>
                <option value="Niederlande">Niederlande</option>
              </select>
            </div>
          </div>

          {/* Shipping Methods */}
          <div className="glass-panel" style={{ padding: '24px', borderRadius: '16px' }}>
            <h3 style={{ fontSize: '1.2rem', color: '#ffffff', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px', borderRadius: '50%', background: 'var(--de-gold)', color: 'var(--de-black)', fontSize: '0.8rem', fontWeight: 800 }}>2</span>
              Versandart
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px',
                borderRadius: '10px',
                border: shippingMethod === 'standard' ? '1.5px solid var(--de-gold)' : '1.5px solid var(--border-color)',
                background: shippingMethod === 'standard' ? 'rgba(255,255,255,0.03)' : 'none',
                cursor: 'pointer'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <input
                    type="radio"
                    name="shipping"
                    checked={shippingMethod === 'standard'}
                    onChange={() => setShippingMethod('standard')}
                    style={{ accentColor: 'var(--de-gold)' }}
                  />
                  <div>
                    <div style={{ fontWeight: 600, color: '#ffffff' }}>DHL Standardversand</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--fg-secondary)' }}>2-3 Werktage Versandzeit</div>
                  </div>
                </div>
                <span style={{ fontWeight: 700, color: 'var(--coating-green)' }}>Gratis</span>
              </label>

              <label style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px',
                borderRadius: '10px',
                border: shippingMethod === 'express' ? '1.5px solid var(--de-gold)' : '1.5px solid var(--border-color)',
                background: shippingMethod === 'express' ? 'rgba(255,255,255,0.03)' : 'none',
                cursor: 'pointer'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <input
                    type="radio"
                    name="shipping"
                    checked={shippingMethod === 'express'}
                    onChange={() => setShippingMethod('express')}
                    style={{ accentColor: 'var(--de-gold)' }}
                  />
                  <div>
                    <div style={{ fontWeight: 600, color: '#ffffff' }}>DHL Express Premium</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--fg-secondary)' }}>1-2 Werktage garantiert</div>
                  </div>
                </div>
                <span style={{ fontWeight: 700, color: '#ffffff' }}>€15,00</span>
              </label>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="glass-panel" style={{ padding: '24px', borderRadius: '16px' }}>
            <h3 style={{ fontSize: '1.2rem', color: '#ffffff', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px', borderRadius: '50%', background: 'var(--de-gold)', color: 'var(--de-black)', fontSize: '0.8rem', fontWeight: 800 }}>3</span>
              Zahlungsart
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }} className="payment-options">
              {([
                { id: 'card', name: 'Kreditkarte', icon: <CreditCard size={18} /> },
                { id: 'paypal', name: 'PayPal', icon: <ShoppingBag size={18} /> },
                { id: 'sofort', name: 'SOFORT', icon: <Award size={18} /> }
              ] as const).map((method) => (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => setPaymentMethod(method.id)}
                  style={{
                    padding: '16px 12px',
                    borderRadius: '10px',
                    border: paymentMethod === method.id ? '1.5px solid var(--de-gold)' : '1.5px solid var(--border-color)',
                    background: paymentMethod === method.id ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.01)',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: paymentMethod === method.id ? 'var(--de-gold)' : 'var(--fg-secondary)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {method.icon}
                  {method.name}
                </button>
              ))}
            </div>

            {/* Credit Card inputs placeholder */}
            {paymentMethod === 'card' && (
              <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }} className="animate-fade-in">
                <div className="form-group">
                  <label htmlFor="cardNumber">Kartennummer</label>
                  <input type="text" id="cardNumber" className="form-control" placeholder="•••• •••• •••• ••••" />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="form-group">
                    <label htmlFor="cardExpiry">Ablaufdatum</label>
                    <input type="text" id="cardExpiry" className="form-control" placeholder="MM/JJ" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="cardCvc">CVC</label>
                    <input type="text" id="cardCvc" className="form-control" placeholder="•••" />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'sofort' && (
              <p style={{ marginTop: '20px', fontSize: '0.8rem', color: 'var(--fg-secondary)', lineHeight: 1.5 }} className="animate-fade-in">
                Nach dem Klicken auf &quot;Zahlungspflichtig bestellen&quot; werden Sie zu SOFORT-Überweisung weitergeleitet, um die Zahlung sicher über Ihr Online-Banking abzuwickeln.
              </p>
            )}

            {paymentMethod === 'paypal' && (
              <p style={{ marginTop: '20px', fontSize: '0.8rem', color: 'var(--fg-secondary)', lineHeight: 1.5 }} className="animate-fade-in">
                Zahlen Sie schnell und sicher mit Ihrem PayPal-Konto. Nach dem Absenden werden Sie zur PayPal-Zahlungsseite weitergeleitet.
              </p>
            )}
          </div>
        </form>

        {/* Right Side: Order Summary Panel */}
        <div style={{
          position: 'sticky',
          top: '110px'
        }}>
          <div className="glass-panel" style={{ padding: '24px', borderRadius: '16px' }}>
            <h3 style={{ fontSize: '1.2rem', color: '#ffffff', marginBottom: '20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
              Bestellübersicht
            </h3>

            {/* Cart Items list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '20px', maxHeight: '240px', overflowY: 'auto' }}>
              {cartItems.map((item) => (
                <div key={item.product.id} style={{ display: 'flex', gap: '12px', alignItems: 'center', fontSize: '0.85rem' }}>
                  {/* Lens Graphic Representer Thumbnail */}
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '6px',
                    border: '1px solid var(--border-color)',
                    background: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <div style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      border: `1.5px solid ${item.product.coating.color}`,
                      background: `radial-gradient(circle, ${item.product.coating.color}33 0%, transparent 80%)`
                    }} />
                  </div>
                  <div style={{ flex: 1, overflow: 'hidden' }}>
                    <div style={{ fontWeight: 600, color: '#ffffff', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{item.product.name}</div>
                    <div style={{ color: 'var(--fg-secondary)' }}>Menge: {item.quantity}</div>
                  </div>
                  <span style={{ fontWeight: 700, color: '#ffffff' }}>
                    €{(item.product.price * item.quantity).toLocaleString('de-DE')}
                  </span>
                </div>
              ))}
            </div>

            {/* Cost totals breakdown */}
            <div style={{
              borderTop: '1px solid var(--border-color)',
              paddingTop: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              fontSize: '0.9rem',
              marginBottom: '20px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--fg-secondary)' }}>Zwischensumme:</span>
                <span style={{ color: '#ffffff' }}>€{cartTotal.toLocaleString('de-DE')}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--fg-secondary)' }}>Versand:</span>
                <span style={{ color: '#ffffff' }}>
                  {shippingCost > 0 ? `€${shippingCost.toLocaleString('de-DE')}` : 'Gratis'}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--fg-secondary)' }}>
                <span>Darin enthaltene MwSt. (19%):</span>
                <span>€{taxAmount.toLocaleString('de-DE')}</span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '1.25rem',
                fontWeight: 800,
                color: 'var(--de-gold)',
                borderTop: '1px dashed var(--border-color)',
                paddingTop: '12px',
                fontFamily: 'var(--font-display)'
              }}>
                <span>Gesamtsumme:</span>
                <span>€{grandTotal.toLocaleString('de-DE')}</span>
              </div>
            </div>

            {/* Security stamp */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.75rem',
              color: 'var(--fg-secondary)',
              background: 'rgba(16, 185, 129, 0.05)',
              border: '1px solid rgba(16, 185, 129, 0.2)',
              padding: '10px',
              borderRadius: '8px',
              marginBottom: '20px'
            }}>
              <ShieldCheck size={16} style={{ color: 'var(--coating-green)', flexShrink: 0 }} />
              <span>Sichere SSL-Verschlüsselung. Alle Daten werden geschützt verarbeitet.</span>
            </div>

            {/* Form submit link */}
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="btn-primary"
              style={{
                width: '100%',
                padding: '16px',
                fontSize: '1.05rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                opacity: isSubmitting ? 0.7 : 1
              }}
            >
              {isSubmitting ? (
                <>
                  <div style={{
                    width: '18px',
                    height: '18px',
                    border: '2px solid rgba(0,0,0,0.1)',
                    borderTopColor: '#000000',
                    borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite'
                  }} />
                  Verarbeite Zahlung...
                </>
              ) : (
                <>
                  Zahlungspflichtig bestellen &bull; €{grandTotal.toLocaleString('de-DE')}
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @media (max-width: 800px) {
          .checkout-grid {
            grid-template-columns: 1fr !important;
            gap: 30px !important;
          }
          .payment-options {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
