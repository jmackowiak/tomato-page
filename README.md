# Pomidor.

Czerwona, wizualna opowieść o kolorze, wnętrzu i różnorodności pomidorów. Astro generuje statyczny HTML, a TypeScript i GSAP/ScrollTrigger dodają ruch. CSS i fonty są lokalne; strona nie potrzebuje backendu ani usług zewnętrznych w czasie działania.

## Uruchomienie

Wymagany Node.js 22.12 lub nowszy.

```sh
npm install
npm run dev
```

Domyślny adres: `http://localhost:4321`.

## Weryfikacja i build

```sh
npm run check
npm run build
npm run preview
```

Wynik produkcyjny jest w `dist/`, gotowy do hostingu statycznego. Astro 7 uruchamia serwery w tle. Zatrzymanie: `npx astro dev stop` lub `npx astro preview stop`.

## Zachowanie

- Ruch zdjęć związany z przewijaniem, krótkie wejścia typografii i przesuwający się pasek.
- Interaktywny przekrój z czterema punktami: skórka, miąższ, komora nasienna i nasiona. Przyciski działają myszą, dotykiem i klawiaturą; bez JavaScriptu opisy są dostępne w rozwijanej liście.
- Kliknięcie punktu uruchamia rozchodzący się pierścień i krótki ruch przekroju; kolejne kliknięcie zastępuje poprzednią animację.
- Opcjonalne nagrania krojenia pomidora i szelestu liści. Dźwięk jest wyłączony przy otwieraniu strony, ma własny przycisk i działa niezależnie od animacji. Lokalne pliki audio pobierają się dopiero po jego włączeniu.
- Przycisk ruchu zapamiętuje wybór w przeglądarce.
- `prefers-reduced-motion` wyłącza animacje i płynne przewijanie.
- Bez JavaScriptu treść, zdjęcia, nawigacja i źródła pozostają dostępne.
- GSAP ładuje się osobno, po podstawowych zasobach, gdy animacje są włączone.
- Obrazy są generowane do kilku rozmiarów WebP podczas budowania.

## Projekt i materiały

- [Założenia wizualne](docs/design-direction.md)
- [Zaakceptowana makieta](docs/design-concept.png)
- [Wyniki wyszukiwania oficjalnych skilli](docs/official-skills.md)
- [Prompty obrazów strony](docs/asset-prompts.md)
- [Źródła i przygotowanie nagrań](docs/audio-sources.md)

Obrazy w `src/assets/` wygenerowano przez wbudowane `image_gen.imagegen`. Są ilustracjami, nie zdjęciami identyfikującymi konkretne odmiany. Źródła krótkich treści podano w rozwijanej sekcji stopki.
