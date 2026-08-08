'use client';

import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

interface CoatingOption {
  id: string;
  name: string;
  color: string;
  accentGlow: string;
  reflectionType: string;
  description: string;
  engName: string;
}

const COATINGS: CoatingOption[] = [
  {
    id: 'gold',
    name: 'Aureum Gold',
    color: '#FFCC00',
    accentGlow: 'rgba(255, 204, 0, 0.4)',
    reflectionType: 'Warmer deutscher Gold-Schimmer',
    description: 'Filtert schädliche UV-Strahlung heraus und mildert grelle Lichtquellen. Erzeugt weiche, schmeichelhafte Hauttöne und eine verträumte Atmosphäre mit warmen Streulichtern.',
    engName: 'Gold Multi-Coating MC-108'
  },
  {
    id: 'red',
    name: 'Rubin Crimson',
    color: '#DE263E',
    accentGlow: 'rgba(222, 38, 62, 0.4)',
    reflectionType: 'Hocheffektive Rotlicht-Kompensation',
    description: 'Minimiert Reflexionen bei Gegenlichtaufnahmen und bewahrt maximale Detailtiefe in tiefen Schatten. Verleiht Konturen eine feine, rote Farbsignatur bei extremen Lichtwinkeln.',
    engName: 'Crimson Anti-Reflective CAR-9'
  },
  {
    id: 'blue',
    name: 'Saphir Blue',
    color: '#00A3FF',
    accentGlow: 'rgba(0, 163, 255, 0.4)',
    reflectionType: 'Cool-Anamorphe Horizontalstreifen',
    description: 'Eine extrem widerstandsfähige Vergütung, die blaues Licht gezielt reflektiert. Ideal für Kino-Stil Aufnahmen mit kühlen, cineastischen horizontalen Flares.',
    engName: 'Anamorphic Blue Flare ABF-3'
  },
  {
    id: 'green',
    name: 'Smaragd Emerald',
    color: '#10B981',
    accentGlow: 'rgba(16, 185, 129, 0.4)',
    reflectionType: 'Optimierter Natur-Kontrast',
    description: 'Filtert atmosphärischen Dunst heraus und verstärkt die Sättigung von Laub- und Waldtönen, ohne die neutrale Farbbalance des Sensors zu verfälschen.',
    engName: 'Eco-Green High Transmittance EHT-5'
  }
];

export default function LensVisualizer() {
  const [activeCoating, setActiveCoating] = useState<CoatingOption>(COATINGS[0]);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="glass-panel" style={{
      padding: '40px',
      borderRadius: '24px',
      margin: '60px auto',
      maxWidth: '1000px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background flare based on selected coating */}
      <div style={{
        position: 'absolute',
        top: '-20%',
        left: '-10%',
        width: '500px',
        height: '500px',
        background: `radial-gradient(circle, ${activeCoating.accentGlow} 0%, transparent 70%)`,
        filter: 'blur(80px)',
        zIndex: 0,
        pointerEvents: 'none',
        transition: 'background 0.5s ease'
      }} />

      {/* Grid container */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '40px',
        alignItems: 'center',
        zIndex: 1,
        position: 'relative'
      }} className="visualizer-grid">
        
        {/* Left Side: Interactive Lens Visual Render */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          background: 'rgba(0, 0, 0, 0.4)',
          borderRadius: '16px',
          border: '1px solid var(--border-color)',
          height: '400px',
          position: 'relative',
          cursor: 'pointer'
        }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Incoming light beam simulation */}
          <div style={{
            position: 'absolute',
            top: '80px',
            left: '20px',
            width: '140px',
            height: '2px',
            background: 'linear-gradient(to right, rgba(255,255,255,0.8), rgba(255,255,255,0.1))',
            transform: 'rotate(25deg)',
            transformOrigin: 'left',
            pointerEvents: 'none',
            opacity: isHovered ? 0.9 : 0.4,
            transition: 'opacity 0.3s ease'
          }} />

          {/* Reflected flare beam simulation */}
          <div style={{
            position: 'absolute',
            top: '120px',
            left: '110px',
            width: '120px',
            height: '6px',
            background: `linear-gradient(to right, ${activeCoating.color}, transparent)`,
            transform: 'rotate(-40deg)',
            transformOrigin: 'left',
            filter: 'blur(2px)',
            pointerEvents: 'none',
            opacity: isHovered ? 1 : 0.5,
            transition: 'all 0.5s ease'
          }} />

          {/* Interactive CSS Lens Profile cross-section */}
          <div style={{
            width: '240px',
            height: '240px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, #1a1a24 0%, #060608 100%)',
            border: '8px solid #282830',
            boxShadow: '0 20px 50px rgba(0,0,0,0.8), inset 0 2px 5px rgba(255,255,255,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}>
            {/* Outer Lens Coating Glass Layer */}
            <div style={{
              width: '190px',
              height: '190px',
              borderRadius: '50%',
              background: `radial-gradient(circle, ${activeCoating.color}99 0%, rgba(0,0,0,0.9) 80%)`,
              boxShadow: `inset 0 0 30px ${activeCoating.color}44`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              transition: 'background 0.5s ease, box-shadow 0.5s ease'
            }}>
              {/* Highlight dynamic lens sheen */}
              <div style={{
                position: 'absolute',
                top: '20px',
                left: '30px',
                width: '100px',
                height: '50px',
                background: 'linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.0) 100%)',
                borderRadius: '50% 50% 30% 30% / 70% 70% 30% 30%',
                transform: isHovered ? 'rotate(-20deg) translate(5px, 5px)' : 'rotate(-25deg)',
                transition: 'transform 0.5s ease',
                pointerEvents: 'none'
              }} />

              {/* Inner Lens Double-Convex Element */}
              <div style={{
                width: '130px',
                height: '130px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '2px solid rgba(255, 255, 255, 0.08)',
                boxShadow: 'inset 0 0 15px rgba(255,255,255,0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: '#040405',
                  border: '1.5px dashed rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {/* Central Aperture Blades */}
                  <div style={{
                    width: '35px',
                    height: '35px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(0,0,0,1) 30%, rgba(20,20,25,1) 100%)',
                    position: 'relative'
                  }}>
                    {/* Tiny reflection highlight */}
                    <div style={{
                      position: 'absolute',
                      top: '6px',
                      left: '8px',
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: activeCoating.color,
                      opacity: 0.8
                    }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Scale markings around focus ring */}
            <div style={{
              position: 'absolute',
              bottom: '12px',
              fontFamily: 'monospace',
              fontSize: '0.65rem',
              color: 'var(--de-gold)',
              letterSpacing: '0.1em'
            }}>
              DE_OPTIK COATING VISUALIZER
            </div>
          </div>

          <p style={{
            fontSize: '0.75rem',
            color: 'var(--fg-secondary)',
            marginTop: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <Sparkles size={12} style={{ color: activeCoating.color }} />
            Bewege die Maus über die Linse, um das Lichtspiel zu simulieren
          </p>
        </div>

        {/* Right Side: Details & Selector */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <div className="eng-seal" style={{ marginBottom: '12px' }}>
              DEUTSCHES LINSENVERGÜTUNGSMETHODE
            </div>
            <h2 style={{
              fontSize: '2rem',
              marginBottom: '8px',
              fontFamily: 'var(--font-display)',
              color: '#ffffff'
            }}>
              Interaktive Vergütung
            </h2>
            <p style={{ color: 'var(--fg-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
              Jede Klarheit-Linse ist mit einer hochentwickelten Linsenvergütung versehen, die Lichtstreuungen blockiert und charakteristische Farbreflexe liefert.
            </p>
          </div>

          {/* Coating selection grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '12px',
            margin: '12px 0'
          }}>
            {COATINGS.map((coating) => (
              <button
                key={coating.id}
                onClick={() => setActiveCoating(coating)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  background: activeCoating.id === coating.id ? 'rgba(255, 255, 255, 0.06)' : 'rgba(255, 255, 255, 0.01)',
                  border: activeCoating.id === coating.id ? `1.5px solid ${coating.color}` : '1.5px solid var(--border-color)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.3s ease'
                }}
              >
                {/* Colored dot */}
                <div style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: coating.color,
                  boxShadow: `0 0 8px ${coating.color}`
                }} />
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff' }}>{coating.name}</div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--fg-secondary)' }}>{coating.engName}</div>
                </div>
              </button>
            ))}
          </div>

          {/* Coating Description Display */}
          <div className="glass-card" style={{
            padding: '20px',
            background: 'rgba(255, 255, 255, 0.02)',
            borderLeft: `3px solid ${activeCoating.color}`,
            borderRadius: '8px'
          }}>
            <h4 style={{
              fontSize: '0.9rem',
              color: activeCoating.color,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '6px'
            }}>
              {activeCoating.reflectionType}
            </h4>
            <p style={{
              fontSize: '0.85rem',
              color: 'var(--fg-secondary)',
              lineHeight: 1.5
            }}>
              {activeCoating.description}
            </p>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 800px) {
          .visualizer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
