import cardTemplates from "@p2p-gifts/data/card-templates.json";

export const CARD_TEMPLATES = cardTemplates;

export const DEFAULT_CARD_TEMPLATE_QR_COLOR = "#111827";
export const DEFAULT_CARD_TEMPLATE_TEXT_COLOR = "#ffffff";

export function getCardTemplateById(templateId) {
  return CARD_TEMPLATES.find((template) => template.id === templateId) ?? null;
}

export function getCardTemplateBackgroundUrl(template) {
  if (!template?.backgroundImage) return "";

  const { backgroundImage } = template;
  return backgroundImage.startsWith("/")
    ? backgroundImage
    : `/cards/${backgroundImage}`;
}

export function getCardTemplateQrColor(template) {
  return template?.qrColor ?? DEFAULT_CARD_TEMPLATE_QR_COLOR;
}

export function getCardTemplateTextColor(template) {
  return template?.textColor ?? DEFAULT_CARD_TEMPLATE_TEXT_COLOR;
}

export function hasTemplateAttribution(template) {
  return Boolean(
    template?.authorHandle?.trim() && template?.authorProfileUrl?.trim(),
  );
}
