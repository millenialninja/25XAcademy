// Site-wide motion. Everything here is progressive: the HTML already holds
// the final, readable content, and this script only animates into it.
// Users with "reduce motion" get no animation (the .js class is never added).
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

declare global { interface Window { __motionReady?: boolean } }

const root = document.documentElement;
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const $ = <T extends Element = HTMLElement>(s: string, el: ParentNode = document) => el.querySelector<T>(s);
const $$ = <T extends Element = HTMLElement>(s: string, el: ParentNode = document) => Array.from(el.querySelectorAll<T>(s));

initMenu();
initHeader();

if (!reduced) {
  gsap.registerPlugin(ScrollTrigger);
  window.__motionReady = true;
  root.classList.add('js');
  initSmoothScroll();
  initSplit();
  initReveals();
  initMagnetic();
  initCursorGlow();
  initHero();
  initShift();
  initRao();
  initHorizontal();
  initPath();
  initCounters();
  initIdeaPreviews();
  // Fonts change line lengths; re-measure once they're in.
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
} else {
  initIdeaPreviews(true);
}

/* ---------- Navigation ---------- */
function initMenu() {
  const btn = $('[data-menu-btn]');
  const panel = $('[data-mobile-nav]');
  if (!btn || !panel) return;
  btn.addEventListener('click', () => {
    const open = panel.classList.toggle('is-open');
    btn.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  });
}

function initHeader() {
  const header = $('[data-header]');
  if (!header) return;
  let last = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    header.classList.toggle('is-hidden', y > 300 && y > last);
    last = y;
  }, { passive: true });
}

/* ---------- Smooth scroll ---------- */
function initSmoothScroll() {
  const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}

/* ---------- Text: word-by-word reveal ---------- */
function initSplit() {
  $$('[data-split]').forEach((el) => {
    wrapWords(el);
    gsap.to($$('.w', el), {
      opacity: 1, y: 0, rotate: 0, duration: 0.9, ease: 'expo.out', stagger: 0.045,
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    });
  });
}

// Wraps each word in a span, keeping nested elements (like .serif) intact.
function wrapWords(el: Element) {
  Array.from(el.childNodes).forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const frag = document.createDocumentFragment();
      (node.textContent || '').split(/(\s+)/).forEach((part) => {
        if (!part) return;
        if (/^\s+$/.test(part)) { frag.append(part); return; }
        const s = document.createElement('span');
        s.className = 'w';
        s.textContent = part;
        frag.append(s);
      });
      node.replaceWith(frag);
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const child = node as HTMLElement;
      if (child.classList.contains('ph')) { child.classList.add('w'); return; }
      wrapWords(child);
    }
  });
}

/* ---------- Generic reveals ---------- */
function initReveals() {
  ScrollTrigger.batch('[data-reveal]', {
    start: 'top 90%',
    once: true,
    onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 1, ease: 'expo.out', stagger: 0.08, overwrite: true }),
  });
}

/* ---------- Magnetic buttons and pointer light ---------- */
function initMagnetic() {
  if (!window.matchMedia('(hover: hover)').matches) return;
  $$('.btn').forEach((btn) => {
    btn.addEventListener('pointermove', (e) => {
      const r = btn.getBoundingClientRect();
      btn.style.setProperty('--mx', `${e.clientX - r.left}px`);
      btn.style.setProperty('--my', `${e.clientY - r.top}px`);
      if (btn.hasAttribute('data-magnetic')) {
        gsap.to(btn, { x: (e.clientX - r.left - r.width / 2) * 0.25, y: (e.clientY - r.top - r.height / 2) * 0.35, duration: 0.4, ease: 'power3.out' });
      }
    });
    btn.addEventListener('pointerleave', () => gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)' }));
  });
}

function initCursorGlow() {
  $$('[data-cursor-glow]').forEach((glow) => {
    const host = glow.parentElement!;
    host.addEventListener('pointermove', (e) => {
      const r = host.getBoundingClientRect();
      glow.style.setProperty('--cx', `${e.clientX - r.left}px`);
      glow.style.setProperty('--cy', `${e.clientY - r.top}px`);
    });
  });
}

/* ---------- Hero: beams cross, tiles ignite, 1 → 25 ---------- */
function initHero() {
  const stage = $('[data-stage]');
  if (!stage) return;
  const tiles = $$('.tile', stage);
  const beams = $$('[data-beam]', stage);
  const count = $('[data-tile-count]', stage);
  const order = tiles
    .map((t, i) => ({ t, d: Math.hypot((i % 5) - 2, Math.floor(i / 5) - 2) + Math.random() * 0.4 }))
    .sort((a, b) => a.d - b.d)
    .map((o) => o.t);

  gsap.set(tiles, { opacity: 0, scale: 0.6 });
  gsap.set(beams[0], { rotate: 45, scaleX: 0 });
  gsap.set(beams[1], { rotate: -45, scaleX: 0 });
  const counter = { v: 1 };
  const tl = gsap.timeline({ delay: 0.3 });
  tl.to(beams, { scaleX: 1, duration: 1.2, ease: 'expo.inOut', stagger: 0.15 })
    .to(order, {
      opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.8)', stagger: 0.05,
      onStart: () => order.forEach((t, i) => setTimeout(() => t.classList.add('lit'), 300 + i * 50)),
    }, '-=0.6')
    .fromTo(counter, { v: 1 }, { v: 25, duration: 1.3, ease: 'power2.out', onUpdate: () => { if (count) count.textContent = String(Math.round(counter.v)); } }, '<');

  // Beams sweep slowly forever, like light passing over the grid.
  gsap.to(beams[0], { rotate: 52, duration: 6, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 2 });
  gsap.to(beams[1], { rotate: -38, duration: 7, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 2 });

  // Scroll: the grid drifts apart and the outline "25X" rises.
  gsap.to(stage, { yPercent: -12, scale: 0.94, ease: 'none', scrollTrigger: { trigger: '[data-hero]', start: 'top top', end: 'bottom top', scrub: true } });
  const word = $('[data-hero-word]');
  if (word) gsap.to(word, { yPercent: -35, ease: 'none', scrollTrigger: { trigger: '[data-hero]', start: 'top top', end: 'bottom top', scrub: true } });

  // Tiles tilt toward the pointer.
  if (window.matchMedia('(hover: hover)').matches) {
    const hero = $('[data-hero]')!;
    hero.addEventListener('pointermove', (e) => {
      const r = stage.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
      const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
      gsap.to(stage, { rotateY: dx * 10, rotateX: -dy * 10, transformPerspective: 1000, duration: 0.8, ease: 'power3.out' });
    });
  }
}

/* ---------- The shift: brochure → tool → lead (pinned on desktop) ---------- */
function initShift() {
  const sec = $('[data-shift]');
  if (!sec) return;
  const states = $$('[data-state]', sec);
  const steps = $$('[data-shift-step]', sec);
  const toast = $('[data-toast]', sec);
  const ring = $('.s-result .ring', sec);
  const bars = $$('.s-result .bars i', sec);

  const setStep = (n: number) => steps.forEach((s, i) => s.classList.toggle('active', i === n));
  const mm = gsap.matchMedia();

  mm.add('(min-width: 900px)', () => {
    gsap.set(states, { opacity: 0, y: 20 });
    gsap.set(states[0], { opacity: 1, y: 0 });
    gsap.set(toast, { opacity: 0, y: 30, scale: 0.9 });
    if (ring) ring.style.setProperty('--p', '0');
    bars.forEach((b) => b.style.setProperty('--w', '0%'));
    setStep(0);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sec, start: 'top top', end: '+=1600', scrub: 0.6, pin: true,
        onUpdate: (st) => setStep(st.progress < 0.33 ? 0 : st.progress < 0.7 ? 1 : 2),
      },
    });
    tl.to(states[0], { opacity: 0, y: -20, duration: 1 }, 1)
      .to(states[1], { opacity: 1, y: 0, duration: 1 }, 1.3)
      .to(states[1], { opacity: 0, y: -20, duration: 1 }, 3)
      .to(states[2], { opacity: 1, y: 0, duration: 1, onStart: fillResult, onReverseComplete: emptyResult }, 3.3)
      .to(toast, { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'back.out(1.6)' }, 4.2)
      .to({}, { duration: 0.8 });
  });

  mm.add('(max-width: 899px)', () => {
    // Small screens: no pinning. Show the result and pop the lead in.
    gsap.set(states, { opacity: 0 });
    gsap.set(states[2], { opacity: 1 });
    setStep(2);
    gsap.from(toast, { opacity: 0, y: 30, scale: 0.9, duration: 0.8, ease: 'back.out(1.6)', scrollTrigger: { trigger: toast, start: 'top 90%', once: true } });
    ScrollTrigger.create({ trigger: sec, start: 'top 70%', once: true, onEnter: fillResult });
  });

  function fillResult() {
    ring?.style.setProperty('--p', '58');
    ['72%', '61%', '38%', '55%'].forEach((w, i) => bars[i]?.style.setProperty('--w', w));
  }
  function emptyResult() {
    ring?.style.setProperty('--p', '0');
    bars.forEach((b) => b.style.setProperty('--w', '0%'));
  }
}

/* ---------- RAO: the prompt types itself, the phone assembles ---------- */
function initRao() {
  const sec = $('[data-rao]');
  if (!sec) return;
  const lines = $$('[data-type] span', sec);
  const pieces = $$('[data-piece]', sec);
  const texts = lines.map((l) => l.textContent || '');
  lines.forEach((l) => { l.textContent = ''; });
  gsap.set(pieces, { opacity: 0, y: 14, scale: 0.96 });

  ScrollTrigger.create({
    trigger: sec, start: 'top 60%', once: true,
    onEnter: async () => {
      for (let i = 0; i < lines.length; i++) {
        await typeInto(lines[i], texts[i]);
        const chunk = i === 0 ? pieces.slice(0, 2) : i === 1 ? pieces.slice(2, 5) : pieces.slice(5);
        gsap.to(chunk, { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.7)', stagger: 0.12 });
      }
    },
  });
}

function typeInto(el: HTMLElement, text: string) {
  return new Promise<void>((resolve) => {
    el.classList.add('typing');
    let i = 0;
    const tick = () => {
      i += Math.max(1, Math.round(text.length / 60));
      el.textContent = text.slice(0, i);
      if (i < text.length) setTimeout(tick, 18);
      else { el.classList.remove('typing'); resolve(); }
    };
    tick();
  });
}

/* ---------- Ideas: horizontal scroll pinned on desktop ---------- */
function initHorizontal() {
  const sec = $('[data-hscroll]');
  const track = $('[data-hscroll-track]');
  if (!sec || !track) return;
  const mm = gsap.matchMedia();
  mm.add('(min-width: 1000px)', () => {
    track.style.overflow = 'visible';
    const distance = () => Math.max(0, track.scrollWidth - window.innerWidth + 40);
    gsap.to(track, {
      x: () => -distance(), ease: 'none',
      scrollTrigger: { trigger: sec, start: 'top top', end: () => `+=${distance()}`, scrub: 0.8, pin: true, invalidateOnRefresh: true },
    });
    return () => { track.style.overflow = ''; };
  });
}

/* ---------- Path: the dashed line draws, steps rise ---------- */
function initPath() {
  const sec = $('[data-path]');
  if (!sec) return;
  const line = $<SVGPathElement>('[data-path-line]', sec);
  if (line) {
    const len = line.getTotalLength();
    gsap.fromTo(line, { strokeDashoffset: len, strokeDasharray: `${len} ${len}` }, {
      strokeDashoffset: 0, ease: 'none',
      scrollTrigger: { trigger: sec, start: 'top 70%', end: 'bottom 70%', scrub: true },
    });
  }
  gsap.from($$('[data-stair]', sec), {
    y: 80, opacity: 0, duration: 1, ease: 'expo.out', stagger: 0.15,
    scrollTrigger: { trigger: sec, start: 'top 65%', once: true },
  });
}

/* ---------- Counters ---------- */
function initCounters() {
  $$('[data-count]').forEach((el) => {
    const end = Number(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const o = { v: 0 };
    ScrollTrigger.create({
      trigger: el, start: 'top 90%', once: true,
      onEnter: () => gsap.to(o, { v: end, duration: 2, ease: 'power3.out', onUpdate: () => { el.textContent = Math.round(o.v).toLocaleString('en-IN') + suffix; } }),
    });
  });
}

/* ---------- Idea cards: mini tools play when seen or hovered ---------- */
function initIdeaPreviews(instant = false) {
  const play = (card: HTMLElement) => {
    const ring = $('.ring', card);
    if (ring) ring.style.setProperty('--p', ring.dataset.p || '0');
    $$('.bars i', card).forEach((b) => b.style.setProperty('--w', b.dataset.w || '0%'));
    $$('[data-on]', card).forEach((b, i) => setTimeout(() => b.classList.add('on'), instant ? 0 : 250 + i * 250));
  };
  const cards = $$('[data-idea]');
  if (instant || !('IntersectionObserver' in window)) { cards.forEach(play); return; }
  const io = new IntersectionObserver((entries) => entries.forEach((e) => { if (e.isIntersecting) { play(e.target as HTMLElement); io.unobserve(e.target); } }), { threshold: 0.4 });
  cards.forEach((c) => io.observe(c));
}
