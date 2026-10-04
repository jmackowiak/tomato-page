# Oficjalne skille dla tego projektu

Sprawdzono 4 października 2026 przez katalog `skills` oraz oficjalne repozytoria i dokumentację. Po sprawdzeniu użytkownik zainstalował lokalnie cztery oficjalne skille GSAP: `gsap-core`, `gsap-timeline`, `gsap-scrolltrigger` i `gsap-performance`. Są dostępne w `.agents/skills/`, a ich źródła zapisano w `skills-lock.json`.

| Technologia | Wynik | Przydatność w projekcie |
| --- | --- | --- |
| GSAP i ScrollTrigger | [Oficjalny zestaw GreenSock](https://github.com/greensock/gsap-skills) | Odpowiednie są `gsap-core`, `gsap-timeline`, `gsap-scrolltrigger` i `gsap-performance`. |
| Astro | [Oficjalny `astro-developer`](https://github.com/withastro/astro/blob/main/.agents/skills/astro-developer/SKILL.md) | Skill dotyczy rozwijania frameworka w jego monorepo; nie jest właściwym przewodnikiem budowania tej strony. |
| TypeScript | Nie znaleziono oficjalnego, ogólnego skilla zespołu TypeScript. | Oficjalny [Handbook](https://www.typescriptlang.org/docs/handbook/intro.html). Skille `-ts` w `microsoft/skills` dotyczą głównie SDK usług Microsoft, nie ogólnego języka. |
| CSS | Nie znaleziono odpowiedniego oficjalnego skilla W3C lub MDN. | Dokumentacja [MDN CSS](https://developer.mozilla.org/en-US/docs/Web/CSS). CSS jest standardem, nie biblioteką jednego producenta. |

## Pobranie skilli GSAP

Komenda dla czterech skilli przydatnych w tym projekcie, z lokalną instalacją dla Codex:

```sh
npx skills add greensock/gsap-skills --skill gsap-core gsap-timeline gsap-scrolltrigger gsap-performance --agent codex
```

Powyższa komenda pozwala odtworzyć lokalną instalację czterech skilli.

## Oficjalne wsparcie AI dla Astro

Astro oferuje [serwer dokumentacji MCP](https://docs.astro.build/en/guides/build-with-ai/). To dostęp do aktualnej dokumentacji, a nie instalowalny skill. Nie zmieniano konfiguracji MCP.

## Wyniki społecznościowe

`astrolicious/agent-skills`, `incluud/astro-agent-skills`, `delineas/astro-framework-agents` i skille TypeScript z innych organizacji występują w katalogu. Samo odwołanie do oficjalnej dokumentacji nie czyni skilla oficjalnym. Nie są przedstawiane jako publikacje twórców technologii.
