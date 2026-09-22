export type SectionVariant = "default" | "hero" | "emphasized";

export type ButtonVariant = "primary" | "secondary";

export type GridWidth = "compact" | "standard" | "wide";

export type CardVariant = "default" | "emphasized";

export type TextBlock = {
  type: "text";
  content: string;
};

export type ImageBlock = {
  type: "image";
  content: string;
  alt: string;
};

export type ButtonBlock = {
  type: "button";
  content: string;
  href: string;
  variant?: ButtonVariant;
  external?: boolean;
};

export type Card = {
  variant?: CardVariant;
  blocks: ContentBlock[];
};

export type CardGridBlock = {
  type: "card-grid";
  grid?: GridWidth;
  cards: Card[];
};

export type ContentBlock =
  | TextBlock
  | ImageBlock
  | ButtonBlock
  | CardGridBlock;

export type ContentSection = {
  variant?: SectionVariant;
  blocks: ContentBlock[];
};

export type PageContent = {
  title: string;
  description: string;
  sections: ContentSection[];
};
