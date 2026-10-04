import { tomatoAnatomy } from '../data/tomato-anatomy';

const section = document.querySelector<HTMLElement>('[data-cross-section]');
if (section) {
  const points = section.querySelector<HTMLElement>('[data-slice-points]');
  const panel = section.querySelector<HTMLElement>('[data-slice-panel]');
  const content = section.querySelector<HTMLElement>('[data-slice-content]');
  const title = section.querySelector<HTMLElement>('[data-slice-title]');
  const description = section.querySelector<HTMLElement>('[data-slice-description]');
  const number = section.querySelector<HTMLElement>('[data-slice-number]');
  const status = section.querySelector<HTMLElement>('[data-slice-status]');
  const hint = section.querySelector<HTMLElement>('[data-slice-hint]');
  const fallback = section.querySelector<HTMLElement>('[data-slice-fallback]');
  const buttons = [...section.querySelectorAll<HTMLButtonElement>('[data-slice-part]')];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let selected: string = tomatoAnatomy[0].id;
  let animation: Animation | undefined;

  if (points && panel && content && title && description && number && status && hint && fallback) {
    for (const button of buttons) {
      button.addEventListener('click', () => {
        const part = tomatoAnatomy.find((item) => item.id === button.dataset.slicePart);
        if (!part || part.id === selected) return;
        selected = part.id;
        animation?.cancel();
        title.textContent = part.name;
        description.textContent = part.description;
        number.textContent = part.number;
        status.textContent = `${part.name}. ${part.description}`;
        buttons.forEach((item) => item.setAttribute('aria-pressed', String(item === button)));

        if (document.documentElement.dataset.motion === 'on' && !reducedMotion.matches) {
          animation = content.animate(
            [{ opacity: .4, transform: 'translateY(6px)' }, { opacity: 1, transform: 'translateY(0)' }],
            { duration: 220, easing: 'ease-out' },
          );
        }
      });
    }

    const stopWhenReduced = () => {
      if (reducedMotion.matches || document.documentElement.dataset.motion === 'off') animation?.cancel();
    };
    reducedMotion.addEventListener('change', stopWhenReduced);
    const motionObserver = new MutationObserver(stopWhenReduced);
    motionObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-motion'] });

    points.hidden = false;
    panel.hidden = false;
    fallback.hidden = true;
    hint.textContent = 'Dotknij punktu. Odkryj detal.';
  }
}
