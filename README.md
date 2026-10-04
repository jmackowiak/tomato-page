# Pomidor.

Czerwona, wizualna opowieść o kolorze, wnętrzu i różnorodności pomidorów. Astro generuje statyczny HTML, a TypeScript i GSAP/ScrollTrigger dodają ruch. CSS i fonty są lokalne; strona nie potrzebuje backendu ani usług zewnętrznych w czasie działania.

## Uruchomienie

Wymagany Node.js 22.12 lub nowszy.

```sh
npm install
npm run dev
```

Domyślny adres: `http://localhost:4321`.

## Wersje językowe

- Polski: `/`
- Angielski: `/en/`
- Włoski: `/it/`

Przycisk z flagą w nagłówku rozwija listę języków. Działa również bez JavaScriptu. Każda wersja powstaje jako osobny statyczny HTML, z przetłumaczoną opowieścią, metadanymi, opisami obrazów, przekrojem i komunikatami kontrolek. Treści są w `src/i18n/content.ts`; wspólny widok w `src/components/TomatoPage.astro`. Do przeglądarki trafiają jedynie etykiety kontrolek dla bieżącego języka, a opisy przekroju wykorzystują istniejącą treść HTML.

Weryfikacja wersji językowych: `npm run check`, `npm run build`, sprawdzenie odnośników i zasobów w trzech wynikowych stronach oraz kontrola układu przy szerokościach 320, 768 i 1280 px. Sprawdzono cztery punkty przekroju w każdym języku, zamykanie listy języków klawiszem Escape i komunikaty kontrolek po zmianie języka.

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
