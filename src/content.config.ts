import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const pageSchema = z.object({
  title: z.string(),
  description: z.string(),
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
    ctas: z.array(
      z.object({
        label: z.string(),
        href: z.string(),
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
