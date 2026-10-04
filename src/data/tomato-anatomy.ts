import { translator, type Locale } from '../i18n/content';

export function getTomatoAnatomy(locale: Locale) {
  const t = translator(locale);
  return [
    {
      id: 'skin',
      number: '01',
      name: t('skin'),
      description: t('skinDescription'),
      x: 93,
      y: 47,
    },
    {
      id: 'flesh',
      number: '02',
      name: t('flesh'),
      description: t('fleshDescription'),
      x: 45,
      y: 47,
    },
    {
      id: 'chamber',
      number: '03',
      name: t('chamber'),
      description: t('chamberDescription'),
      x: 29,
      y: 66,
    },
    {
      id: 'seeds',
      number: '04',
      name: t('seeds'),
      description: t('seedsDescription'),
      x: 59,
      y: 24,
    },
  ] as const;
}
