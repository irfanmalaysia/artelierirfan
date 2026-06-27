import { useRef, useState } from 'react';
import { ArrowRightIcon } from './icons';
import { COLORS, ACCENT } from '../styles/theme';

const SLIDES = [
  { eyebrow: 'New this week', title: 'Digital goods that do the work for you', cta: 'Browse all', kind: 'browse' },
  { eyebrow: 'Bundle & save', title: 'Get any 3 products for 30% off', cta: 'View bundle', kind: 'soon' },
  { eyebrow: 'Free starter pack', title: 'Join the list, grab 5 free templates', cta: 'Join free', kind: 'soon' },
];

function GreenSlideArt({ ebookCover }) {
  return (
    <div style={{ position: 'absolute', right: -18, bottom: -18, width: 160, height: 160 }}>
      <div style={{ position: 'absolute', right: 14, bottom: 14, width: 100, height: 130, borderRadius: 16, background: 'rgba(255,255,255,.45)', transform: 'rotate(10deg)', boxShadow: '0 4px 16px rgba(21,23,27,.1)' }} />
      <div style={{ position: 'absolute', right: 6, bottom: 8, width: 100, height: 130, borderRadius: 16, background: 'rgba(255,255,255,.65)', transform: 'rotate(5deg)', boxShadow: '0 4px 16px rgba(21,23,27,.1)' }} />
      <div style={{ position: 'absolute', right: 0, bottom: 0, width: 100, height: 130, borderRadius: 16, overflow: 'hidden', boxShadow: '0 8px 24px rgba(21,23,27,.18)', background: COLORS.ink }}>
        <div style={{ background: `url("${ebookCover}") center/cover no-repeat`, width: '100%', height: '100%' }} />
      </div>
      <div style={{ position: 'absolute', top: 8, right: -4, background: `var(--accent, ${ACCENT})`, borderRadius: 10, padding: '4px 8px', fontSize: 9, fontWeight: 800, color: COLORS.ink, boxShadow: '0 2px 8px rgba(21,23,27,.15)' }}>
        🎂 NEW
      </div>
    </div>
  );
}

function MinimalSlideArt() {
  return (
    <div style={{ position: 'absolute', right: -12, bottom: -16, width: 140, height: 140, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
        <circle cx="60" cy="60" r="52" fill="#F4F4F0" opacity=".9" />
        <rect x="28" y="36" width="64" height="48" rx="10" fill={COLORS.ink} />
        <circle cx="60" cy="60" r="14" fill="none" stroke={`var(--accent, ${ACCENT})`} strokeWidth="3" />
        <path d="M54 60l4 4 8-8" stroke={`var(--accent, ${ACCENT})`} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="44" y="44" width="14" height="4" rx="2" fill="rgba(255,255,255,.25)" />
        <rect x="62" y="44" width="18" height="4" rx="2" fill="rgba(255,255,255,.15)" />
        <rect x="44" y="72" width="32" height="4" rx="2" fill="rgba(255,255,255,.1)" />
      </svg>
    </div>
  );
}

export function HeroCarousel({ ebookCover, onBrowseAll, onComingSoon }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const trackRef = useRef(null);

  const handleScroll = (e) => {
    const el = e.target;
    const child = el.querySelector('[data-heroslide]');
    const sw = child ? child.offsetWidth : el.clientWidth;
    const idx = Math.round(el.scrollLeft / sw);
    if (idx !== activeIdx) setActiveIdx(idx);
  };

  const handleCta = (kind) => (kind === 'browse' ? onBrowseAll() : onComingSoon());

  return (
    <>
      <div
        ref={trackRef}
        className="chips"
        onScroll={handleScroll}
        style={{ display: 'flex', padding: '6px 0 0', overflowX: 'auto', scrollSnapType: 'x mandatory' }}
      >
        {SLIDES.map((slide, i) => (
          <div key={i} data-heroslide="1" style={{ flex: 'none', width: '100%', boxSizing: 'border-box', padding: '0 20px', scrollSnapAlign: 'center' }}>
            {i === 0 ? (
              <div style={{ height: 200, boxSizing: 'border-box', borderRadius: 26, background: `var(--accent, ${ACCENT})`, padding: 24, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'relative', zIndex: 2, maxWidth: '62%' }}>
                  <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '1.2px', textTransform: 'uppercase', color: 'rgba(21,23,27,.55)' }}>{slide.eyebrow}</div>
                  <div style={{ fontSize: 24, fontWeight: 800, lineHeight: 1.08, color: COLORS.ink, marginTop: 9 }}>{slide.title}</div>
                  <div onClick={() => handleCta(slide.kind)} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, marginTop: 16, background: COLORS.ink, color: '#fff', padding: '11px 16px', borderRadius: 13, fontSize: 13.5, fontWeight: 700, cursor: 'pointer' }}>
                    {slide.cta}
                    <ArrowRightIcon />
                  </div>
                </div>
                <GreenSlideArt ebookCover={ebookCover} />
              </div>
            ) : (
              <div style={{ height: 200, boxSizing: 'border-box', borderRadius: 26, background: '#fff', border: `1px solid ${COLORS.border}`, padding: 24, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'relative', zIndex: 2, maxWidth: '66%' }}>
                  <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '1.2px', textTransform: 'uppercase', color: COLORS.muted }}>{slide.eyebrow}</div>
                  <div style={{ fontSize: 24, fontWeight: 800, lineHeight: 1.08, color: COLORS.ink, marginTop: 9 }}>{slide.title}</div>
                  <div onClick={() => handleCta(slide.kind)} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, marginTop: 16, background: `var(--accent, ${ACCENT})`, color: COLORS.ink, padding: '11px 16px', borderRadius: 13, fontSize: 13.5, fontWeight: 800, cursor: 'pointer' }}>
                    {slide.cta}
                    <ArrowRightIcon stroke={COLORS.ink} />
                  </div>
                </div>
                <MinimalSlideArt />
              </div>
            )}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 6, justifyContent: 'center', padding: '12px 0 2px' }}>
        {SLIDES.map((_, i) => (
          <div
            key={i}
            style={
              i === activeIdx
                ? { width: 18, height: 6, borderRadius: 3, background: COLORS.ink }
                : { width: 6, height: 6, borderRadius: 3, background: COLORS.divider2 }
            }
          />
        ))}
      </div>
    </>
  );
}
