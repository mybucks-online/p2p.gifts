import CustomCard from "@p2p-gifts/components/GiftCardPreview/CustomCard";
import DefaultCard, {
  DEFAULT_CARD_THEME_ID_DEFAULT,
  DEFAULT_CARD_THEME_OPTIONS,
} from "@p2p-gifts/components/GiftCardPreview/DefaultCard";
import { CARD_TEMPLATES } from "@p2p-gifts/data/cardTemplates";

export const CARD_FORMATS = {
  default: {
    label: "Classic",
    Component: DefaultCard,
    themeOptions: DEFAULT_CARD_THEME_OPTIONS,
    defaultThemeId: DEFAULT_CARD_THEME_ID_DEFAULT,
    supportsCustomImage: false,
  },
  custom: {
    label: "Custom",
    Component: CustomCard,
    themeOptions: [],
    defaultThemeId: null,
    supportsCustomImage: true,
  },
};

export const CARD_FORMAT_ID_DEFAULT = "default";

const CUSTOM_CARD_STYLE_VALUE = "custom";

export const CARD_STYLE_ID_DEFAULT = `${CARD_FORMAT_ID_DEFAULT}:${DEFAULT_CARD_THEME_ID_DEFAULT}`;

const BUILTIN_CARD_STYLE_GROUP_LABEL = "Built-in";

/** Single-dropdown options: Classic themes + built-in templates + Custom */
export const CARD_STYLE_GROUPS = [
  {
    label: CARD_FORMATS.default.label,
    options: DEFAULT_CARD_THEME_OPTIONS.map(({ value, label }) => ({
      value: `${CARD_FORMAT_ID_DEFAULT}:${value}`,
      label,
    })),
  },
  {
    label: BUILTIN_CARD_STYLE_GROUP_LABEL,
    options: CARD_TEMPLATES.map((template) => ({
      value: `${CUSTOM_CARD_STYLE_VALUE}:${template.id}`,
      label: template.name,
    })),
  },
  {
    label: CARD_FORMATS.custom.label,
    options: [{ value: CUSTOM_CARD_STYLE_VALUE, label: "Upload your image" }],
  },
];

export function getCardFormatConfig(formatId) {
  return CARD_FORMATS[formatId] ?? CARD_FORMATS[CARD_FORMAT_ID_DEFAULT];
}

export function parseCardStyle(styleId) {
  if (styleId === CUSTOM_CARD_STYLE_VALUE) {
    return { format: "custom", theme: null, templateId: null };
  }

  if (styleId.startsWith(`${CUSTOM_CARD_STYLE_VALUE}:`)) {
    return {
      format: "custom",
      theme: null,
      templateId: styleId.slice(CUSTOM_CARD_STYLE_VALUE.length + 1),
    };
  }

  const separator = styleId.indexOf(":");
  if (separator > 0) {
    const format = styleId.slice(0, separator);
    const theme = styleId.slice(separator + 1);
    if (CARD_FORMATS[format] && !CARD_FORMATS[format].supportsCustomImage) {
      return { format, theme, templateId: null };
    }
  }

  return {
    format: CARD_FORMAT_ID_DEFAULT,
    theme: DEFAULT_CARD_THEME_ID_DEFAULT,
    templateId: null,
  };
}
