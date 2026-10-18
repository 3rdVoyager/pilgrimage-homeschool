import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const sectionVariant = z.enum([
  "blue",
  "gold",
  "white",
  "burgundy-light",
]);

const pageSchema = z.object({
  title: z.string(),
  description: z.string(),
  sections: z.array(
    z.object({
      layout: z.enum(["default"]).default("default"),
      id: z.string(),
      color: sectionVariant,
      content: z.string(),
    }),
  ),
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
    copyright: z.string(),
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
