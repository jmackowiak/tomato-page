const gallery = document.querySelector<HTMLElement>('[data-gallery]');
if (gallery) {
  const tabs = [...gallery.querySelectorAll<HTMLButtonElement>('[data-gallery-tab]')];
  const items = [...gallery.querySelectorAll<HTMLElement>('[data-gallery-item]')];
  const controls = gallery.querySelector<HTMLElement>('[data-gallery-controls]');
  const word = gallery.querySelector<HTMLElement>('[data-gallery-word]');
  const counter = gallery.querySelector<HTMLElement>('[data-gallery-counter]');
  const status = gallery.querySelector<HTMLElement>('[data-gallery-status]');

  if (tabs.length === 3 && items.length === 3 && controls && word && counter && status) {
    let selected = 0;
    const select = (index: number, announce = true) => {
      if (announce && index === selected) return;
      selected = index;
      gallery.dataset.gallerySelected = String(index);
      tabs.forEach((tab, position) => {
        tab.setAttribute('aria-selected', String(position === index));
        tab.tabIndex = position === index ? 0 : -1;
      });
      items.forEach((item, position) => {
        const offset = (position - index + items.length) % items.length;
        item.dataset.gallerySlot = offset === 0 ? 'center' : offset === 1 ? 'right' : 'left';
        item.setAttribute('role', 'tabpanel');
        item.setAttribute('aria-labelledby', tabs[position].id);
        item.setAttribute('aria-hidden', String(position !== index));
        item.inert = position !== index;
        item.tabIndex = position === index ? 0 : -1;
        const caption = item.querySelector<HTMLElement>('[data-gallery-caption]');
        if (caption) caption.hidden = position !== index;
      });
      const name = tabs[index].querySelector('[data-gallery-name]')?.textContent ?? '';
      word.textContent = name;
      counter.textContent = `${String(index + 1).padStart(2, '0')} / 03`;
      if (announce) {
        status.textContent = `${gallery.dataset.selectedLabel} ${name}.`;
        gallery.dispatchEvent(new Event('tomato:gallery-change'));
      }
    };
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => select(index));
      tab.addEventListener('keydown', (event) => {
        let next: number;
        if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
        else if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
        else if (event.key === 'Home') next = 0;
        else if (event.key === 'End') next = tabs.length - 1;
        else return;
        event.preventDefault();
        select(next);
        tabs[next].focus();
      });
    });
    select(0, false);
    gallery.dataset.galleryReady = 'true';
    controls.hidden = false;
    word.hidden = false;
    counter.hidden = false;
  }
}
