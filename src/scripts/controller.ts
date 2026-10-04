import { initSound } from './sound';

initSound();

const button = document.querySelector<HTMLButtonElement>('.motion-toggle');
const label = document.querySelector<HTMLElement>('[data-motion-label]');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let enabled = true;
let cleanup: (() => void) | undefined;
let revision = 0;

try { enabled = localStorage.getItem('pomidor-motion') !== 'off'; } catch { /* Storage is optional. */ }

async function updateMotion() {
  const currentRevision = ++revision;
  cleanup?.();
  cleanup = undefined;
  const animate = enabled && !reducedMotion.matches;
  document.documentElement.dataset.motion = animate ? 'on' : 'off';
  if (button && label) {
    button.hidden = false;
    button.disabled = reducedMotion.matches;
    button.setAttribute('aria-pressed', String(animate));
    label.textContent = reducedMotion.matches ? 'Ruch: ograniczony' : `Ruch: ${animate ? 'włączony' : 'wyłączony'}`;
    button.title = reducedMotion.matches ? 'Animacje ograniczone zgodnie z ustawieniami urządzenia' : animate ? 'Wyłącz animacje' : 'Włącz animacje';
    button.setAttribute('aria-label', `${label.textContent}. ${button.title}`);
  }
  if (!animate) return;
  try {
    const { createMotion } = await import('./motion');
    if (currentRevision !== revision) return;
    cleanup = createMotion();
  } catch {
    enabled = false;
    await updateMotion();
  }
}

button?.addEventListener('click', () => {
  enabled = !enabled;
  try { localStorage.setItem('pomidor-motion', enabled ? 'on' : 'off'); } catch { /* Storage is optional. */ }
  void updateMotion();
});
reducedMotion.addEventListener('change', () => { void updateMotion(); });
window.addEventListener('pagehide', () => { revision++; cleanup?.(); });
window.addEventListener('pageshow', (event) => { if (event.persisted) void updateMotion(); });

if (document.readyState === 'complete') void updateMotion();
else window.addEventListener('load', () => { void updateMotion(); }, { once: true });
