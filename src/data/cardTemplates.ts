import cardTemplates from "@p2p-gifts/data/card-templates.json";
import type { CardTemplate } from "@p2p-gifts/types/card";

export const CARD_TEMPLATES: CardTemplate[] = cardTemplates;

export const DEFAULT_CARD_TEMPLATE_QR_COLOR = "#111827";
export const DEFAULT_CARD_TEMPLATE_TEXT_COLOR = "#ffffff";

export function isCardTemplateActive(template: CardTemplate): boolean {
  return template?.active !== false;
}

export const ACTIVE_CARD_TEMPLATES =
  CARD_TEMPLATES.filter(isCardTemplateActive);

export function getCardTemplateById(
  templateId: string | null | undefined,
): CardTemplate | null {
  return (
    ACTIVE_CARD_TEMPLATES.find((template) => template.id === templateId) ?? null
  );
}

export function getCardTemplateBackgroundUrl(
  template: CardTemplate | null | undefined,
): string {
  if (!template?.backgroundImage) return "";

  const { backgroundImage } = template;
  return backgroundImage.startsWith("/")
    ? backgroundImage
    : `/cards/${backgroundImage}`;
}

export function getCardTemplateQrColor(
  template: CardTemplate | null | undefined,
): string {
  return template?.qrColor ?? DEFAULT_CARD_TEMPLATE_QR_COLOR;
}

export function getCardTemplateTextColor(
  template: CardTemplate | null | undefined,
): string {
  return template?.textColor ?? DEFAULT_CARD_TEMPLATE_TEXT_COLOR;
}

export function hasTemplateAttribution(
  template: CardTemplate | null | undefined,
): boolean {
  return Boolean(
    template?.authorHandle?.trim() && template?.authorProfileUrl?.trim(),
  );
}
