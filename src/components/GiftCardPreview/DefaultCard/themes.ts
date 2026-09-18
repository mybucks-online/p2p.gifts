/** Gradient themes for the default gift card format */
const DEFAULT_CARD_THEMES = {
  "elegant-purple": {
    label: "Elegant Purple",
    from: "#a855f7",
    to: "#7e22ce",
  },
  "crypto-gradient": {
    label: "Crypto Gradient",
    from: "#2563eb",
    to: "#7c3aed",
  },
};

export const DEFAULT_CARD_THEME_ID_DEFAULT = "crypto-gradient";

export const DEFAULT_CARD_THEME_OPTIONS = Object.entries(
  DEFAULT_CARD_THEMES,
).map(([value, { label }]) => ({ value, label }));

type DefaultCardThemeId = keyof typeof DEFAULT_CARD_THEMES;

export function resolveDefaultCardTheme(themeId?: string) {
  return (
    DEFAULT_CARD_THEMES[themeId as DefaultCardThemeId] ??
    DEFAULT_CARD_THEMES[DEFAULT_CARD_THEME_ID_DEFAULT]
  );
}
