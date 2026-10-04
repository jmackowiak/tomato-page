import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function createMotion(): () => void {
  const media = gsap.matchMedia();
  media.add({ desktop: '(min-width: 701px)', mobile: '(max-width: 700px)' }, (context) => {
    const desktop = Boolean(context.conditions?.desktop);

    gsap.from('.hero-title', { y: 24, duration: .9, ease: 'power3.out' });
    gsap.from('.hero-float', { y: 30, rotation: -3, duration: 1.2, ease: 'power3.out' });
    gsap.to('.hero-float', { y: desktop ? -10 : -5, duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1.2 });

    gsap.to('.hero-art', {
      y: desktop ? 85 : 30, rotation: desktop ? 5 : 2, ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 },
    });

    gsap.from('.slice-image', {
      rotation: desktop ? -18 : -8, scale: .88, y: desktop ? 60 : 25, ease: 'none',
      scrollTrigger: { trigger: '.inside', start: 'top 80%', end: 'bottom 80%', scrub: 1 },
    });

    gsap.from('.variety-image', {
      y: desktop ? 75 : 25, rotation: -3, ease: 'none',
      scrollTrigger: { trigger: '.variety-stage', start: 'top 95%', end: 'bottom 40%', scrub: 1 },
    });

    for (const element of gsap.utils.toArray<HTMLElement>('[data-reveal]')) {
      gsap.from(element, { y: desktop ? 28 : 16, duration: .8, ease: 'power3.out', scrollTrigger: { trigger: element, start: 'top 93%', once: true } });
    }

    const ticker = gsap.to('.ticker-track', { xPercent: -50, duration: 28, repeat: -1, ease: 'none', paused: true });
    ScrollTrigger.create({ trigger: '.ticker', start: 'top bottom', end: 'bottom top', onToggle: (self) => { if (self.isActive) ticker.play(); else ticker.pause(); } });

    const float = gsap.getTweensOf('.hero-float');
    ScrollTrigger.create({ trigger: '.hero', start: 'top bottom', end: 'bottom top', onToggle: (self) => { float.forEach((tween) => self.isActive ? tween.resume() : tween.pause()); } });
  });

  const refresh = () => ScrollTrigger.refresh();
  const visibility = () => { gsap.globalTimeline.paused(document.hidden); };
  document.addEventListener('visibilitychange', visibility);
  document.fonts.ready.then(() => { if (active) refresh(); });
  let active = true;
  const images = [...document.querySelectorAll<HTMLImageElement>('main img')];
  images.forEach((img) => { if (!img.complete) img.addEventListener('load', refresh); });
  refresh();

  return () => {
    active = false;
    media.revert();
    images.forEach((img) => img.removeEventListener('load', refresh));
    document.removeEventListener('visibilitychange', visibility);
    gsap.globalTimeline.paused(false);
  };
}
