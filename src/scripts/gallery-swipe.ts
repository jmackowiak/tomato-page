export function enableGallerySwipe(zone: HTMLElement, change: (direction: -1 | 1) => void): void {
  const panel = zone.parentElement;
  if (!panel) return;
  let gesture: { id: number; x: number; y: number; horizontal: boolean } | undefined;

  const reset = () => {
    const previous = gesture;
    gesture = undefined;
    delete panel.dataset.galleryDragging;
    panel.style.removeProperty('--gallery-drag-x');
    window.removeEventListener('pointermove', move);
    window.removeEventListener('pointerup', end);
    window.removeEventListener('pointercancel', cancel);
    window.removeEventListener('pointerdown', additionalPointer);
    if (previous && zone.hasPointerCapture(previous.id)) zone.releasePointerCapture(previous.id);
  };
  const move = (event: PointerEvent) => {
    if (!gesture || event.pointerId !== gesture.id) return;
    if (event.pointerType !== 'touch' && event.buttons === 0) { reset(); return; }
    const dx = event.clientX - gesture.x;
    const dy = event.clientY - gesture.y;
    if (!gesture.horizontal) {
      if (Math.max(Math.abs(dx), Math.abs(dy)) < 10) return;
      // Give vertical gestures back to scrolling, including diagonal movements.
      if (Math.abs(dy) >= Math.abs(dx)) { reset(); return; }
      if (Math.abs(dx) < Math.abs(dy) * 1.25) return;
      gesture.horizontal = true;
      panel.dataset.galleryDragging = 'true';
    }
    panel.style.setProperty('--gallery-drag-x', `${Math.max(-72, Math.min(72, dx * .35))}px`);
  };
  const end = (event: PointerEvent) => {
    if (!gesture || event.pointerId !== gesture.id) return;
    const dx = event.clientX - gesture.x;
    const dy = event.clientY - gesture.y;
    const threshold = Math.min(70, Math.max(36, zone.clientWidth * .1));
    const committed = Math.abs(dx) >= threshold && Math.abs(dx) > Math.abs(dy) * 1.25;
    reset();
    if (committed) change(dx < 0 ? 1 : -1);
  };
  const cancel = (event: PointerEvent) => {
    if (event.pointerId === gesture?.id) reset();
  };
  const additionalPointer = (event: PointerEvent) => {
    if (gesture && event.pointerId !== gesture.id) reset();
  };
  zone.addEventListener('pointerdown', (event) => {
    if (!event.isPrimary || event.button !== 0) {
      if (event.pointerType === 'touch') reset();
      return;
    }
    if (gesture) { reset(); return; }
    gesture = { id: event.pointerId, x: event.clientX, y: event.clientY, horizontal: false };
    // Capture lets mouse drags finish outside the artwork. Window listeners also
    // cover devices that cancel capture or deliver the release elsewhere.
    try { zone.setPointerCapture(event.pointerId); } catch { /* Pointer already released. */ }
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerup', end);
    window.addEventListener('pointercancel', cancel);
    window.addEventListener('pointerdown', additionalPointer);
  });
  zone.addEventListener('lostpointercapture', cancel);
  window.addEventListener('blur', reset);
  window.addEventListener('resize', reset);
  window.addEventListener('pagehide', reset);
}
