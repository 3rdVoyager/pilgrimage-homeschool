import type { CollectionEntry } from "astro:content";

export type PageContent = CollectionEntry<"pages">["data"];
export type SiteSettings = CollectionEntry<"site">["data"];
