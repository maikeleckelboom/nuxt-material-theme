export function isSystemInDarkTheme(forceDark: boolean = false): boolean {
  const isClientAndPrefersDark =
    import.meta.client &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  return isClientAndPrefersDark || forceDark
}
