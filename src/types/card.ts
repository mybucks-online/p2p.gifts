/** Props for the shared image-based gift card renderer. */
export interface GiftCardProps {
  note?: string;
  giftingLink?: string;
  backgroundImage?: string;
  qrColor?: string;
  textColor?: string;
}

/** A built-in gift card template, sourced from data/card-templates.json */
export interface CardTemplate {
  id: string;
  name: string;
  active?: boolean;
  backgroundImage?: string;
  authorHandle?: string;
  authorProfileUrl?: string;
  qrColor?: string;
  textColor?: string;
}
