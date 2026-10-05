import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function createTicker(): () => void {
  const container = document.querySelector<HTMLElement>('.ticker');
  const track = container?.querySelector<HTMLElement>('.ticker-track');
  const phrase = track?.firstElementChild;
  if (!container || !track || !phrase) return () => {};

  const originalCount = track.children.length;
  const pixelsPerSecond = 45;
  let phraseWidth = 0;
  let tween: gsap.core.Tween | undefined;
  const resize = () => {
    const width = phrase.getBoundingClientRect().width;
    const viewport = container.getBoundingClientRect().width;
    if (width <= 0) return;
    // Cover the viewport even after one entire phrase has moved off-screen.
    const count = Math.max(originalCount, Math.ceil(viewport / width) + 1);
    const additions = document.createDocumentFragment();
    for (let index = track.children.length; index < count; index++) {
      const copy = phrase.cloneNode(true) as HTMLElement;
      copy.dataset.tickerCopy = '';
      additions.append(copy);
    }
    track.append(additions);
    while (track.children.length > count) track.lastElementChild?.remove();

    if (phraseWidth !== width) {
      const progress = tween?.progress() ?? 0;
      phraseWidth = width;
      // Keep the current position within the phrase after font/viewport changes.
      tween?.duration(width / pixelsPerSecond).invalidate().progress(progress);
    }
  };
  resize();
  gsap.set(track, { willChange: 'transform' });
  tween = gsap.fromTo(track, { x: 0 }, {
    x: () => -phraseWidth, duration: phraseWidth / pixelsPerSecond,
    repeat: -1, ease: 'none', paused: true,
  });
  ScrollTrigger.create({
    trigger: container, start: 'top bottom', end: 'bottom top',
    onToggle: (self) => { if (self.isActive) tween?.play(); else tween?.pause(); },
  });
  // Also catches font loading; measurements are never taken on animation frames.
  const observer = new ResizeObserver(resize);
  observer.observe(container);
  observer.observe(phrase);
  return () => {
    observer.disconnect();
    track.querySelectorAll('[data-ticker-copy]').forEach((copy) => copy.remove());
  };
}

export function createMotion(): () => void {
  const media = gsap.matchMedia();
  media.add({ desktop: '(min-width: 701px)', mobile: '(max-width: 700px)', tall: '(min-height: 720px)' }, (context) => {
    const desktop = Boolean(context.conditions?.desktop);

    gsap.from('.hero-title', { y: 24, duration: .9, ease: 'power3.out' });
    gsap.from('.hero-float', { y: 30, rotation: -3, duration: 1.2, ease: 'power3.out' });
    gsap.to('.hero-float', { y: desktop ? -10 : -5, duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1.2 });

    gsap.to('.hero-art', {
      y: desktop ? 85 : 30, rotation: desktop ? 5 : 2, ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 },
    });

    const ripening = document.querySelector<HTMLElement>('[data-ripening]');
    const scene = ripening?.querySelector<HTMLElement>('[data-ripening-scene]');
    const frames = ripening ? [...ripening.querySelectorAll<HTMLElement>('[data-ripening-frame]')] : [];
    const stages = ripening ? [...ripening.querySelectorAll<HTMLElement>('[data-ripening-stage]')] : [];
    const dots = stages.map((stage) => stage.querySelector('.ripening-stage-dot'));
    if (ripening && scene && frames.length === 3 && stages.length === 3) {
      ripening.dataset.ripeningAnimated = 'true';
      // The default layout shows all three illustrations without animation.
      const fullscreen = desktop && Boolean(context.conditions?.tall);
      if (fullscreen) ripening.dataset.ripeningPinned = 'true';
      // Let the illustration area grow, keeping the stages at the viewport bottom.
      // If the content needs more room, use the ordinary scrolling layout.
      const pin = fullscreen && scene.scrollHeight <= window.innerHeight + 1;
      if (!pin) delete ripening.dataset.ripeningPinned;
      gsap.set(frames, { autoAlpha: 0 });
      gsap.set(frames[0], { autoAlpha: 1 });
      gsap.set(dots, { opacity: .4, scale: 1 });
      gsap.set(dots[0], { opacity: 1, scale: 1.6 });
      const timeline = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          id: 'tomato-ripening', trigger: scene,
          start: pin ? 'top top' : desktop ? 'top 65%' : 'top 30%',
          end: pin ? () => `+=${Math.round(window.innerHeight * 1.4)}` : desktop ? 'bottom 25%' : 'center 20%',
          pin, scrub: .5, invalidateOnRefresh: true,
        },
      });
      timeline
        .fromTo(ripening.querySelector('[data-ripening-progress]'), { scaleX: 0 }, { scaleX: 1, duration: 2 }, 0)
        .fromTo(ripening.querySelector('[data-ripening-images]'), { rotation: -4, scale: .97 }, { rotation: 4, scale: 1.025, duration: 2 }, 0)
        .to(frames[1], { autoAlpha: 1, duration: .35 }, .2)
        .to(dots[0], { opacity: .4, scale: 1, duration: .25 }, .2)
        .to(dots[1], { opacity: 1, scale: 1.6, duration: .25 }, .2)
        .to(frames[2], { autoAlpha: 1, duration: .35 }, 1.15)
        .to(dots[1], { opacity: .4, scale: 1, duration: .25 }, 1.15)
        .to(dots[2], { opacity: 1, scale: 1.6, duration: .25 }, 1.15);
    }

    gsap.from('.slice-illustration', {
      rotation: desktop ? -10 : -5, scale: .94, y: desktop ? 40 : 15, ease: 'none',
      scrollTrigger: { trigger: '.inside', start: 'top 80%', end: 'bottom 80%', scrub: 1 },
    });

    document.querySelectorAll<HTMLElement>('.identity-item').forEach((item, index) => {
      gsap.from(item, { autoAlpha: 0, y: desktop ? 32 : 18, duration: .7, delay: desktop ? index * .12 : 0, ease: 'power3.out', scrollTrigger: { trigger: item, start: 'top 88%', once: true } });
    });
    gsap.from('.identity-underline', { scaleX: 0, duration: .65, ease: 'power2.out', scrollTrigger: { trigger: '.identity-item:last-child', start: 'top 70%', once: true } });

    gsap.from('.variety-image', {
      y: desktop ? 75 : 25, rotation: -3, ease: 'none',
      scrollTrigger: { trigger: '.variety-stage', start: 'top 95%', end: 'bottom 40%', scrub: 1 },
    });

    for (const element of gsap.utils.toArray<HTMLElement>('[data-reveal]')) {
      gsap.from(element, { y: desktop ? 28 : 16, duration: .8, ease: 'power3.out', scrollTrigger: { trigger: element, start: 'top 93%', once: true } });
    }

    const cleanupTicker = createTicker();

    const float = gsap.getTweensOf('.hero-float');
    ScrollTrigger.create({ trigger: '.hero', start: 'top bottom', end: 'bottom top', onToggle: (self) => { float.forEach((tween) => self.isActive ? tween.resume() : tween.pause()); } });
    return () => {
      cleanupTicker();
      if (ripening) {
        delete ripening.dataset.ripeningAnimated;
        delete ripening.dataset.ripeningPinned;
      }
    };
  });

  const refresh = () => ScrollTrigger.refresh();
  let resizeTimer: number | undefined;
  let viewportWidth = window.innerWidth;
  let viewportHeight = window.innerHeight;
  const resize = () => {
    if (viewportWidth === window.innerWidth && viewportHeight === window.innerHeight) return;
    viewportWidth = window.innerWidth;
    viewportHeight = window.innerHeight;
    window.clearTimeout(resizeTimer);
    // Refresh after resizing even when ScrollTrigger is waiting for scrollEnd.
    resizeTimer = window.setTimeout(refresh, 200);
  };
  window.addEventListener('resize', resize);
  const visibility = () => { gsap.globalTimeline.paused(document.hidden); };
  document.addEventListener('visibilitychange', visibility);
  document.fonts.ready.then(() => { if (active) refresh(); });
  let active = true;
  const images = [...document.querySelectorAll<HTMLImageElement>('main img')];
  images.forEach((img) => { if (!img.complete) img.addEventListener('load', refresh); });
  refresh();

  return () => {
    active = false;
    window.clearTimeout(resizeTimer);
    window.removeEventListener('resize', resize);
    media.revert();
    images.forEach((img) => img.removeEventListener('load', refresh));
    document.removeEventListener('visibilitychange', visibility);
    gsap.globalTimeline.paused(false);
  };
}
