import type { ForwardRefExoticComponent, RefAttributes } from "react";

/** Union of props accepted by any gift card format's Component (DefaultCard, CustomCard). */
export interface GiftCardProps {
  theme?: string;
  note?: string;
  giftingLink?: string;
  backgroundImage?: string;
  qrColor?: string;
  textColor?: string;
}

export type CardFormatId = "default" | "custom";

export interface CardFormatConfig {
  label: string;
  Component: ForwardRefExoticComponent<
    GiftCardProps & RefAttributes<HTMLDivElement>
  >;
  themeOptions: { value: string; label: string }[];
  defaultThemeId: string | null;
  supportsCustomImage: boolean;
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
