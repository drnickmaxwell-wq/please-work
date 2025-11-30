export type ChampagneTheme = 'light' | 'dark' | 'dusk';

export function resolveChampagneTheme(pathname: string | null | undefined): ChampagneTheme {
  const path = pathname || '/';

  if (path.startsWith('/treatments') || path.startsWith('/preview/treatments')) {
    return 'dark';
  }

  if (
    path.startsWith('/technology') ||
    path.startsWith('/preview/technology') ||
    path.startsWith('/patient-stories')
  ) {
    return 'dusk';
  }

  if (path === '/' || path.startsWith('/faq')) {
    return 'light';
  }

  return 'light';
}
