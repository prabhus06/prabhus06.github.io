/**
 * ============================================================================
 * KINETIC MINIMALIST EXPERIMENTAL ENGINE
 * Interactivity: GSAP Kinetic Split-Text, Horizontal Pinning, Magnetic Cursor
 * ============================================================================
 */

(function () {
  'use strict';

  // --- GLOBAL STATE ---
  const state = {
    mouseX: window.innerWidth / 2,
    mouseY: window.innerHeight / 2,
    targetX: window.innerWidth / 2,
    targetY: window.innerHeight / 2,
    currentX: window.innerWidth / 2,
    currentY: window.innerHeight / 2,
    isHovering: false,
    isClicking: false
  };

  let cursorFollower = null;
  let cursorDot = null;
  let heroChars = [];

  // ==========================================================================
  // 1. CUSTOM KINETIC CURSOR
  // ==========================================================================
  function initCursor() {
    cursorFollower = document.getElementById('cursor-follower');
    cursorDot = document.getElementById('cursor-dot');

    if (!cursorFollower || !cursorDot) return;

    const ambientGlow = document.getElementById('ambient-glow');

    function onPointerMove(clientX, clientY) {
      state.mouseX = clientX;
      state.mouseY = clientY;
      state.targetX = clientX;
      state.targetY = clientY;
      cursorDot.style.transform = `translate(${clientX}px, ${clientY}px) translate(-50%, -50%)`;
      if (!document.body.classList.contains('has-moved')) {
        document.body.classList.add('has-moved');
      }
      updateTelemetryHUD();
    }

    window.addEventListener('mousemove', (e) => {
      onPointerMove(e.clientX, e.clientY);
    }, { passive: true });

    window.addEventListener('scroll', () => {
      cursorDot.style.transform = `translate(${state.targetX}px, ${state.targetY}px) translate(-50%, -50%)`;
    }, { passive: true });

    // Smooth RAF Lerp loop for outer follower ring and ambient glow spotlight
    function renderCursorFollower() {
      state.currentX += (state.targetX - state.currentX) * 0.22;
      state.currentY += (state.targetY - state.currentY) * 0.22;

      cursorFollower.style.transform = `translate(${state.currentX}px, ${state.currentY}px) translate(-50%, -50%)`;
      if (ambientGlow) {
        ambientGlow.style.transform = `translate(${state.currentX}px, ${state.currentY}px) translate(-50%, -50%)`;
      }
      requestAnimationFrame(renderCursorFollower);
    }
    requestAnimationFrame(renderCursorFollower);

    // Interactive target delegate listener
    document.addEventListener('mouseover', (e) => {
      const target = e.target.closest('a, button, .interactive-target, .manifesto-card, .launch-btn');
      if (target) {
        cursorFollower.classList.add('hovering');
      } else {
        cursorFollower.classList.remove('hovering');
      }
    });

    window.addEventListener('mousedown', () => cursorFollower.classList.add('clicking'));
    window.addEventListener('mouseup', () => cursorFollower.classList.remove('clicking'));
  }

  // ==========================================================================
  // 2. HERO KINETIC LETTER-REPULSION PHYSICS
  // ==========================================================================
  function initHeroPhysics() {
    const splitLines = document.querySelectorAll('.kinetic-split');
    heroChars = [];

    splitLines.forEach((line) => {
      const text = line.getAttribute('data-text') || line.textContent.trim();
      line.innerHTML = '';

      for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const span = document.createElement('span');
        span.className = 'kinetic-char';
        if (char === ' ') {
          span.innerHTML = '&nbsp;';
        } else {
          span.textContent = char;
        }

        // Electric blue highlight accents
        if (char === 'Y' || char === 'G') {
          span.classList.add('accent');
        }

        line.appendChild(span);
        heroChars.push({
          el: span,
          baseColor: span.classList.contains('accent') ? '#0047FF' : '',
          currentX: 0,
          currentY: 0,
          targetX: 0,
          targetY: 0
        });
      }
    });

    const repulsionRadius = 65;
    const maxRepulsion = 10;

    function updateHeroLetterRepulsion() {
      const heroEl = document.getElementById('hero');
      if (heroEl) {
        const heroRect = heroEl.getBoundingClientRect();
        if (heroRect.bottom < 0 || heroRect.top > window.innerHeight) {
          return;
        }
      }

      heroChars.forEach((item) => {
        const rect = item.el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;

        const dx = state.mouseX - cx;
        const dy = state.mouseY - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < repulsionRadius && dist > 0) {
          const force = (1 - dist / repulsionRadius) * maxRepulsion;
          const angle = Math.atan2(dy, dx);
          item.targetX = -Math.cos(angle) * force;
          item.targetY = -Math.sin(angle) * force;
          item.el.style.color = '#0047FF';
        } else {
          item.targetX = 0;
          item.targetY = 0;
          item.el.style.color = item.baseColor;
        }

        // Smoothly interpolate letter transforms
        item.currentX += (item.targetX - item.currentX) * 0.2;
        item.currentY += (item.targetY - item.currentY) * 0.2;

        if (Math.abs(item.currentX) > 0.05 || Math.abs(item.currentY) > 0.05) {
          const rot = (item.currentX / maxRepulsion) * 3;
          item.el.style.transform = `translate3d(${item.currentX.toFixed(2)}px, ${item.currentY.toFixed(2)}px, 0px) rotate(${rot.toFixed(1)}deg)`;
        } else {
          item.el.style.transform = 'translate3d(0, 0, 0) rotate(0deg)';
        }
      });
    }

    // Run hero physics in RAF loop
    function heroPhysicsLoop() {
      updateHeroLetterRepulsion();
      requestAnimationFrame(heroPhysicsLoop);
    }
    requestAnimationFrame(heroPhysicsLoop);

    // Initial entrance animation via GSAP
    if (typeof gsap !== 'undefined') {
      const charElements = heroChars.map(c => c.el);
      gsap.from(charElements, {
        duration: 1.2,
        y: 60,
        opacity: 0,
        stagger: 0.02,
        ease: 'power4.out',
        delay: 0.15
      });

      gsap.from('.hero-meta-badge, .hero-subtext, .hero-scroll-indicator', {
        duration: 1.2,
        opacity: 0,
        y: 20,
        stagger: 0.12,
        ease: 'power3.out',
        delay: 0.45
      });
    }
  }

  // ==========================================================================
  // 3. MANIFESTO / SHIFT (HORIZONTAL SCROLL PINNING & SEAMLESS WARP NAVIGATION)
  // ==========================================================================
  let isWarping = false;

  function triggerWarpToPortfolio(targetUrl = 'portfolio.html') {
    if (isWarping) return;
    isWarping = true;

    const portal = document.getElementById('warp-portal');
    if (portal) {
      portal.classList.add('active');
    }

    setTimeout(() => {
      window.location.href = targetUrl;
    }, 650);
  }

  function initManifestoScroll() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const track = document.getElementById('manifesto-track');
    const container = document.getElementById('manifesto-pin-container');
    const section = document.getElementById('manifesto');
    if (!track || !container || !section) return;

    const panels = gsap.utils.toArray('.manifesto-panel');
    let warpTriggerTimeout = null;

    function getDistance() {
      return Math.max(0, track.scrollWidth - window.innerWidth + 80);
    }

    gsap.to(track, {
      x: () => -getDistance(),
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        pin: container,
        start: 'top top',
        end: () => `+=${getDistance()}`,
        scrub: 0.6,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          panels.forEach((panel) => {
            const rect = panel.getBoundingClientRect();
            const center = window.innerWidth / 2;
            const distFromCenter = Math.abs(rect.left + rect.width / 2 - center);
            const maxDist = window.innerWidth * 0.6;
            const opacity = Math.max(0.2, 1 - distFromCenter / maxDist);

            const dims = panel.querySelectorAll('.dim');
            dims.forEach((d) => {
              d.style.color = opacity > 0.75 ? '#F5F5F5' : '#4A4A4A';
            });
          });

          // Seamless scroll trigger: when reaching the end panel and continuing to scroll down
          if (self.progress >= 0.98 && self.direction === 1) {
            if (!warpTriggerTimeout && !isWarping) {
              warpTriggerTimeout = setTimeout(() => {
                triggerWarpToPortfolio();
              }, 300);
            }
          } else if (self.progress < 0.95) {
            if (warpTriggerTimeout) {
              clearTimeout(warpTriggerTimeout);
              warpTriggerTimeout = null;
            }
          }
        },
        onLeave: () => {
          triggerWarpToPortfolio();
        }
      }
    });

    // Wire up all portfolio trigger buttons to use the seamless warp transition with their specific destination href
    document.querySelectorAll('.trigger-warp-manual, a[href^="portfolio.html"]').forEach((el) => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const dest = el.getAttribute('href') || 'portfolio.html';
        triggerWarpToPortfolio(dest);
      });
    });

    window.addEventListener('load', () => ScrollTrigger.refresh());
    window.addEventListener('resize', () => ScrollTrigger.refresh());
  }

  // ==========================================================================
  // 4. TELEMETRY & LIVE HUD UPDATES
  // ==========================================================================
  function updateTelemetryHUD() {
    const coordsEl = document.getElementById('hud-coords');
    if (coordsEl) {
      coordsEl.textContent = `X: ${String(Math.round(state.mouseX)).padStart(4, '0')} | Y: ${String(Math.round(state.mouseY)).padStart(4, '0')}`;
    }
  }

  // ==========================================================================
  // 5. LAUNCH ENGINE MODAL
  // ==========================================================================
  function initCTAAndModal() {
    const launchTriggers = document.querySelectorAll('.trigger-launch');
    const modal = document.getElementById('launch-modal');
    const closeBtn = document.getElementById('modal-close');

    if (!modal) return;

    launchTriggers.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.classList.add('active');
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
      });
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  }

  // ==========================================================================
  // INITIALIZATION ON DOM READY
  // ==========================================================================
  window.addEventListener('DOMContentLoaded', () => {
    initCursor();
    initHeroPhysics();
    initManifestoScroll();
    initCTAAndModal();
  });
})();
