# Nagrania strony

4 października 2026. Nagrania są przechowywane lokalnie w `public/audio/`; strona nie łączy się z Freesound podczas odtwarzania.

## Źródła

- **Cutting tomato.wav**, SpliceSound: https://freesound.org/people/SpliceSound/sounds/188192/ — autor opisuje krojenie pomidora na drewnianej desce. Licencja na stronie źródłowej: CC0.
  - Publiczna wersja HQ MP3: https://cdn.freesound.org/previews/188/188192_1480854-hq.mp3
  - `tomato-cut-1.m4a`: fragment od 7,38 s, długość 0,78 s.
  - `tomato-cut-2.m4a`: fragment od 2,03 s, długość 0,60 s.
- **Rustling leaves**, giddster: https://freesound.org/people/giddster/sounds/437356/ — nagranie szeleszczących liści w lesie. Licencja na stronie źródłowej: CC0.
  - Publiczna wersja HQ MP3: https://cdn.freesound.org/previews/437/437356_1738686-hq.mp3
  - `leaves-rustle.m4a`: fragment od 4,90 s, długość 0,80 s.

Autorzy i linki są też podani w źródłach w stopce. Liście są efektem towarzyszącym nawigacji, nie dokumentacją dźwięku liści pomidora.

## Przygotowanie

Źródła zdekodowano narzędziem macOS `afconvert` do mono PCM 16 bit / 32 kHz. Fragmenty przycięto, dodano wejście 12 ms i wyciszenie końca 60 ms. Przed kompresją maksymalną amplitudę ustawiono na 0,45 dla krojenia i 0,35 dla liści. Zakodowano do AAC / M4A, mono, 32 kHz, 64 kb/s. Gain odtwarzania wynosi 0,4.

Łączny rozmiar trzech plików: 30 379 B. Pobierają się po ręcznym włączeniu dźwięku; zdekodowane bufory są używane ponownie podczas kolejnych kliknięć.

## Zachowanie

- Kliknięcia punktów przekroju naprzemiennie odtwarzają dwa fragmenty krojenia, także przy ponownym wyborze tego samego punktu.
- Włączenie dźwięku oraz nawigacja pomiędzy rozdziałami odtwarzają szelest liści.
- Nowy efekt zatrzymuje poprzedni; nie ma pętli ani dźwięków przy samym przewijaniu.
- Wyłączenie dźwięku i schowanie karty zatrzymują efekt oraz wstrzymują kontekst audio. Kolejna świadoma interakcja może wznowić odtwarzanie.
- Dźwięk i ograniczenie ruchu mają niezależne ustawienia. Dźwięk pozostaje wyłączony do kliknięcia przycisku.

Odtwarzanie i dekodowanie sprawdzono technicznie w przeglądarce. Narzędzie nie umożliwiło odsłuchu; subiektywna ocena charakteru nagrań i głośności pozostaje do wykonania w podglądzie.
