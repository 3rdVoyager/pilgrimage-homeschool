import type { PageContent, SiteSettings } from "../types/content";
import site from "../content/site.json";

const pageFiles = import.meta.glob("../content/pages/*.json", {
  eager: true,
  import: "default",
}) as Record<string, PageContent>;

export const getPage = (slug: string): PageContent | undefined => {
  return pageFiles[`../content/pages/${slug}.json`];
};

export const getPageSlugs = (): string[] => {
  return Object.keys(pageFiles)
    .map((path) => path.replace("../content/pages/", "").replace(".json", ""))
    .filter((slug) => slug !== "index");
};

export const getSiteSettings = (): SiteSettings => {
  return site as SiteSettings;
};
