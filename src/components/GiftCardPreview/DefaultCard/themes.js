/** Gradient themes for the default gift card format */
const DEFAULT_CARD_THEMES = {
  "modern-blue": {
    label: "Modern Blue",
    from: "#3b82f6",
    to: "#1d4ed8",
  },
  "elegant-purple": {
    label: "Elegant Purple",
    from: "#a855f7",
    to: "#7e22ce",
  },
  "festive-gold": {
    label: "Festive Gold",
    from: "#eab308",
    to: "#ea580c",
  },
  "minimalist-dark": {
    label: "Minimalist Dark",
    from: "#1f2937",
    to: "#111827",
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

export function resolveDefaultCardTheme(themeId) {
  return (
    DEFAULT_CARD_THEMES[themeId] ??
    DEFAULT_CARD_THEMES[DEFAULT_CARD_THEME_ID_DEFAULT]
  );
}
