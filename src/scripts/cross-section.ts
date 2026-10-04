const section = document.querySelector<HTMLElement>('[data-cross-section]');
if (section) {
  const points = section.querySelector<HTMLElement>('[data-slice-points]');
  const panel = section.querySelector<HTMLElement>('[data-slice-panel]');
  const content = section.querySelector<HTMLElement>('[data-slice-content]');
  const response = section.querySelector<HTMLElement>('[data-slice-response]');
  const title = section.querySelector<HTMLElement>('[data-slice-title]');
  const description = section.querySelector<HTMLElement>('[data-slice-description]');
  const number = section.querySelector<HTMLElement>('[data-slice-number]');
  const status = section.querySelector<HTMLElement>('[data-slice-status]');
  const hint = section.querySelector<HTMLElement>('[data-slice-hint]');
  const fallback = section.querySelector<HTMLElement>('[data-slice-fallback]');
  const buttons = [...section.querySelectorAll<HTMLButtonElement>('[data-slice-part]')];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  // Reuse the localized, readable fallback instead of shipping all translations.
  const tomatoAnatomy = buttons.map((button) => {
    const entry = section.querySelector<HTMLElement>(`[data-slice-entry="${button.dataset.slicePart}"]`);
    return {
      id: button.dataset.slicePart!,
      name: entry?.querySelector('dt')?.textContent ?? '',
      description: entry?.querySelector('dd')?.textContent ?? '',
      number: button.querySelector('.slice-pin-number')?.textContent ?? '',
      x: parseFloat(button.style.getPropertyValue('--pin-x')),
    };
  });
  let selected: string | undefined = tomatoAnatomy[0]?.id;
  let animations: Animation[] = [];

  const stopAnimations = () => {
    animations.forEach((animation) => animation.cancel());
    animations = [];
  };

  if (points && panel && content && title && description && number && status && hint && fallback) {
    for (const button of buttons) {
      button.addEventListener('click', () => {
        const part = tomatoAnatomy.find((item) => item.id === button.dataset.slicePart);
        if (!part) return;
        const changed = part.id !== selected;
        stopAnimations();
        if (changed) {
          selected = part.id;
          title.textContent = part.name;
          description.textContent = part.description;
          number.textContent = part.number;
          status.textContent = `${part.name}. ${part.description}`;
          buttons.forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
        }

        if (document.documentElement.dataset.motion === 'on' && !reducedMotion.matches) {
          const halo = button.querySelector<HTMLElement>('.slice-pin-halo');
          if (halo) animations.push(halo.animate(
            [
              { opacity: .85, transform: 'scale(.85)' },
              { opacity: 0, transform: 'scale(2)' },
            ],
            { duration: 650, easing: 'cubic-bezier(.16, 1, .3, 1)' },
          ));

          // A separate wrapper keeps click feedback independent of ScrollTrigger.
          if (response) {
            const tilt = part.x >= 50 ? 1.2 : -1.2;
            animations.push(response.animate(
              [
                { transform: 'scale(1) rotate(0deg)' },
                { transform: `scale(1.025) rotate(${tilt}deg)`, offset: .3 },
                { transform: 'scale(1) rotate(0deg)' },
              ],
              { duration: 650, easing: 'ease-in-out' },
            ));
          }

          if (changed) animations.push(content.animate(
            [{ opacity: .4, transform: 'translateY(8px)' }, { opacity: 1, transform: 'translateY(0)' }],
            { duration: 280, easing: 'ease-out' },
          ));
        }
      });
    }

    const stopWhenReduced = () => {
      if (reducedMotion.matches || document.documentElement.dataset.motion === 'off') stopAnimations();
    };
    reducedMotion.addEventListener('change', stopWhenReduced);
    const motionObserver = new MutationObserver(stopWhenReduced);
    motionObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-motion'] });
    window.addEventListener('pagehide', stopAnimations);

    points.hidden = false;
    panel.hidden = false;
    fallback.hidden = true;
    hint.textContent = section.dataset.interactiveHint ?? '';
  }
}
