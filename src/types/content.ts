import type { TinaRichTextContent } from "@tinacms/astro/types";

export type SectionVariant = "blue" | "gold" | "white" | "burgundy-light";

export type ButtonVariant = "burgundy" | "gold";

export type GridWidth = "compact" | "standard" | "wide";

export type CardVariant = SectionVariant;

export type TextBlock = {
  type: "text";
  content: string | TinaRichTextContent;
};

export type ImageBlock = {
  type: "image";
  src: string;
  alt: string;
};

export type ButtonBlock = {
  type: "button";
  label: string;
  href: string;
  variant: ButtonVariant;
  external: boolean;
};

export type Card = {
  variant: CardVariant;
  blocks: ContentBlock[];
};

export type CardGridBlock = {
  type: "card-grid";
  grid: GridWidth;
  cards: Card[];
};

export type ContentBlock =
  | TextBlock
  | ImageBlock
  | ButtonBlock
  | CardGridBlock;

export type ContentSection = {
  title: string;
  variant: SectionVariant;
  blocks: ContentBlock[];
};

export type PageContent = {
  title: string;
  description: string;
  sections: ContentSection[];
};
