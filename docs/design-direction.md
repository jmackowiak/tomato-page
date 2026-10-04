# Pomidor — kierunek wizualny

## Ustalone założenia

- Wizualna opowieść o pomidorach, z dużą rolą animacji.
- Czerwień jest dominującym kolorem całej strony.
- Treści mają być zgodne z faktami; strona nie jest poradnikiem uprawy.
- Stack: Astro, TypeScript, CSS oraz GSAP z ScrollTrigger.
- Szybkie ładowanie i płynność, także na telefonach.

## Propozycja do oceny

### Kolor i typografia

- Główne tło: pomidorowa czerwień `#DC3026`.
- Tekst: ciepły krem `#FFF1CF`.
- Kolejne sekcje: ciemniejsze czerwienie i bordo, bez przechodzenia na białe tło.
- Zieleń pojawia się przede wszystkim w fotografiach szypułek.
- Duże, zwarte nagłówki i czytelny, spokojny krój tekstu.
- Kontrast ostatecznych kolorów trzeba sprawdzić w implementacji.

### Sekwencja strony

1. **Kolor** — ogromny napis „POMIDOR.”, wyraziste zdjęcie owocu i hasło „Cała historia w jednym owocu.”.
2. **Wnętrze** — przewijanie prowadzi do zdjęcia przekroju; krótki tekst towarzyszy detalom.
3. **Różnorodność** — kompozycja pomidorów o różnych kształtach i kolorach; nazwy odmian tylko przy zweryfikowanych zdjęciach.
4. **Finał** — prosta, duża kompozycja fotograficzna i zakończenie opowieści.

### Ruch

- Krótkie wejście typografii i zdjęcia w pierwszym ekranie.
- Jedna główna sekwencja przewijania prowadząca od całego pomidora do jego wnętrza.
- Delikatne przesunięcia i obroty zdjęć w sekcji różnorodności.
- Zwykłe przewijanie przeglądarki; tekst i nawigacja dostępne od początku.
- Animowanie głównie `transform` i `opacity`.
- Na telefonie prostsza kompozycja i mniej jednoczesnego ruchu.
- Przy `prefers-reduced-motion` kompletna, czytelna wersja bez sekwencji ruchowych i przypinania sekcji.

### Zdjęcia i rzetelność

- Makieta może używać obrazu wygenerowanego do pokazania kierunku artystycznego.
- Wygenerowane zdjęcie nie stanowi dokumentacji konkretnej odmiany ani dokładnej anatomii.
- Przed publikacją sprawdzić konkretne twierdzenia, podpisy zdjęć i nazwy odmian.
- Krótkie, opisowe teksty; bez nieudokumentowanych deklaracji zdrowotnych.

## Status

Użytkownik zaakceptował makietę jako kierunek wizualny. Pierwsza wersja strony została zbudowana w Astro. W implementacji główną czerwień lekko przyciemniono do `#cd2b22`, aby kremowy tekst miał kontrast powyżej 4,5:1. Ruch jest związany z przewijaniem bez przypinania sekcji.
