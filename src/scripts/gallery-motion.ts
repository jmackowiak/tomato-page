import { gsap } from 'gsap';

export function createGalleryMotion(context: gsap.Context, desktop: boolean): () => void {
  const gallery = document.querySelector<HTMLElement>('[data-gallery-ready]');
  if (!gallery) return () => {};
  const items = [...gallery.querySelectorAll<HTMLElement>('[data-gallery-item]')];
  const portraits = items.map((item) => item.querySelector<HTMLElement>('[data-gallery-portrait]')!);
  const word = gallery.querySelector<HTMLElement>('[data-gallery-word]');
  let timeline: gsap.core.Timeline | undefined;
  const position = (item: HTMLElement) => {
    const slot = item.dataset.gallerySlot === 'center' ? 0 : item.dataset.gallerySlot === 'left' ? -1 : 1;
    return {
      x: 0, xPercent: slot * (desktop ? 82 : 60),
      scale: slot === 0 ? 1 : desktop ? .48 : .38,
      rotation: slot * 8, opacity: slot === 0 ? 1 : .4,
    };
  };
  items.forEach((item, index) => gsap.set(portraits[index], position(item)));

  const change = context.add('galleryChange', () => {
    timeline?.kill();
    timeline = gsap.timeline({ defaults: { duration: .65, ease: 'power3.inOut' } });
    items.forEach((item, index) => timeline!.to(portraits[index], position(item), 0));
    if (word) timeline.fromTo(word, { x: 0, xPercent: -50, y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: .45, ease: 'power2.out' }, .08);
    const caption = items.find((item) => item.dataset.gallerySlot === 'center')?.querySelector('[data-gallery-caption]');
    if (caption) timeline.fromTo(caption, { x: 0, xPercent: -50, y: 10, autoAlpha: .25 }, { y: 0, autoAlpha: 1, duration: .35, ease: 'power2.out' }, .15);
  }) as EventListener;
  gallery.addEventListener('tomato:gallery-change', change);
  return () => gallery.removeEventListener('tomato:gallery-change', change);
}
