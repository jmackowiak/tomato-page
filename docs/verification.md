# Weryfikacja pierwszej wersji

4 października 2026.

## Wyniki

- `npm run check`: 0 błędów, ostrzeżeń i wskazówek.
- `npm run build`: poprawny statyczny build, jedna strona oraz 11 wariantów obrazów WebP.
- Serwer produkcyjnego podglądu: HTTP 200 dla `/`.
- T3 Code preview: sprawdzone szerokości CSS 320, 390, 768, 1280 i 1920 px; brak poziomego przewijania dokumentu.
- Przełącznik ruchu: włącza animacje, wyłącza je i usuwa transformacje; wybór zachowuje się po ponownym otwarciu strony.
- Po wyłączeniu ruchu obliczony `scroll-behavior` wynosi `auto` także po wcześniejszym uruchomieniu ScrollTrigger.
- Preferencja ograniczenia ruchu: sprawdzono ścieżkę kontrolera przez zasymulowany wynik `matchMedia` w przeglądarce; ruch jest wyłączony i przycisk wskazuje ograniczenie systemowe. Nie zmieniano rzeczywistego ustawienia systemu operacyjnego.
- Nawigacja do `#wnetrze`: poprawny fragment URL i pozycja sekcji 28 px poniżej górnej krawędzi widoku.
- Wszystkie trzy obrazy poprawnie załadowały się po przewinięciu strony.
- Stopka z rozwijanymi źródłami działa, odnośniki wskazują Kew, Virginia Tech i RHS.
- Kontrast głównego kremowego tekstu na czerwieni `#cd2b22`: 4,73:1.

## Rozmiary skryptów produkcyjnych

- Kontroler: 2644 B, 1283 B po gzip.
- Interaktywny przekrój, skrypt w HTML: 2119 B, 1054 B po gzip.
- Osobno ładowany moduł GSAP/ScrollTrigger i animacji: 114587 B, 44569 B po gzip.

Są to rozmiary plików, a nie wynik audytu Lighthouse czy pomiar wydajności na rzeczywistym telefonie.

## Interaktywny przekrój i stopka

- Cztery punkty poprawnie zmieniają tytuł i opis; zawsze jeden ma `aria-pressed="true"`.
- Sprawdzono aktywację klawiaturą przez Enter i Spację. Fokus pozostaje na przycisku, a aktualizacja opisu trafia do regionu `aria-live`.
- Przy 320, 390, 768, 1280 i 1920 px dokument nie ma poziomego przewijania. Na telefonie panel znajduje się pod ilustracją.
- Wysokość panelu nie zmienia się między opisami: około 249 px przy 320 i 1280 px, około 299 px przy 768 px. Treść mieści się także przy 320 px.
- Przy wyłączonym ruchu wszystkie punkty działają bez animowania panelu. Osobno zasymulowano `MediaQueryList.matches = true` dla ograniczenia ruchu: brak animacji także wtedy, gdy `data-motion` wskazuje `on`. Nie zmieniano rzeczywistego ustawienia systemowego.
- Produkcyjny HTML zawiera rozwijaną listę opisów i ukrywa nieaktywne przyciski przed uruchomieniem JavaScriptu.
- Link autora nadal prowadzi do `https://github.com/jmackowiak`; wyświetla samą ikonę GitHuba, z etykietą dla czytników ekranu i polem kliknięcia 44 × 44 px.
- Opisy sprawdzono na podstawie [Virginia Tech](https://www.pubs.ext.vt.edu/SPES/spes-508/spes-508.html). Na stronie zaznaczono artystyczny charakter ilustracji i orientacyjne położenie punktów.
- Ponowne `npm run check`, `npm run build` i `git diff --check` zakończyły się poprawnie.

## Ocena wizualna

Narzędzie T3 Code `preview_snapshot` działa z przerwami. Podczas prac nad przekrojem udało się obejrzeć zrzuty strony przy 320 i 1280 px. Sprawdzono układ punktów i panelu; ocena na prawdziwym telefonie i pomiar wydajności pozostają do wykonania.
