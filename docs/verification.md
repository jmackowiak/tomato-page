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

- Kontroler: 2644 B, 1286 B po gzip.
- Osobno ładowany moduł GSAP/ScrollTrigger i animacji: 114580 B, 44563 B po gzip.

Są to rozmiary plików, a nie wynik audytu Lighthouse czy pomiar wydajności na rzeczywistym telefonie.

## Ograniczenie oceny wizualnej

T3 Code `preview_snapshot` zwraca błąd narzędzia także dla nowej karty i wersji produkcyjnej. Nawigacja, odczyt DOM, zmiana wymiarów i interakcje działają. Sprawdzono zachowanie i geometrię, lecz nie wykonano oceny wizualnej zrzutów strony. Makieta oraz wygenerowane obrazy zostały obejrzane wcześniej. Ocena strony na prawdziwym telefonie pozostaje do wykonania.
