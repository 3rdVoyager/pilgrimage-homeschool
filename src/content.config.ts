import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const sectionVariant = z.enum([
  "blue",
  "gold",
  "white",
  "burgundy-light",
]);

const sectionBase = {
  id: z.string(),
  color: sectionVariant,
};

const card = z.object({
  content: z.string(),
});

const pageSection = z.discriminatedUnion("layout", [
  z.object({
    ...sectionBase,
    layout: z.literal("vertical"),
    content: z.string(),
  }),
  z.object({
    ...sectionBase,
    layout: z.literal("2-column-grid"),
    cards: z.array(card),
    content: z.string().optional(),
  }),
  z.object({
    ...sectionBase,
    layout: z.literal("3-column-grid"),
    cards: z.array(card),
    content: z.string().optional(),
  }),
  z.object({
    ...sectionBase,
    layout: z.literal("4-column-grid"),
    cards: z.array(card),
    content: z.string().optional(),
  }),
  z.object({
    ...sectionBase,
    layout: z.literal("automatic-grid"),
    cards: z.array(card),
    content: z.string().optional(),
  }),
]);

const pageSchema = z.object({
  title: z.string(),
  description: z.string(),
  sections: z.array(pageSection),
});

const siteSchema = z.object({
  header: z.object({
    siteName: z.string(),
    logoAlt: z.string(),
    navItems: z.array(
      z.object({
        label: z.string(),
        href: z.string().optional(),
        items: z
          .array(
            z.object({
              label: z.string(),
              href: z.string(),
            }),
          )
          .optional(),
      }),
    ),
  }),
  footer: z.object({
    description: z.string(),
    columns: z.array(
      z.object({
        title: z.string(),
        links: z.array(
          z.object({
            label: z.string(),
            href: z.string().optional(),
          }),
        ),
      }),
    ),
  }),
});

const pages = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/pages",
  }),
  schema: pageSchema,
});

const site = defineCollection({
  loader: glob({
    pattern: "site.yaml",
    base: "./src/content",
  }),
  schema: siteSchema,
});

export const collections = { pages, site };
