// @ts-nocheck (generated types/client appear after your first tinacms dev run)
import { requestWithMetadata } from '@tinacms/astro/data';
import client from '../../../tina/__generated__/client';

export const getPage = async (slug: string) => {
  const result = await requestWithMetadata(
    client.queries.page({ relativePath: slug + ".json" }),
    { priority: "primary" },
  );
  const page = result.data?.page;

  if (!page) {
    return result;
  }

  return {
    ...result,
    data: {
      ...result.data,
      page: {
        ...page,
        sections: page.sections?.map((section) => ({
          ...section,
          blocks: section.blocks?.map((block) => ({
            ...block,
            // Tina exposes the selected template as __typename in GraphQL.
            type: block.__typename === "PageSectionsBlocksText" ? "text" : "",
          })),
        })),
      },
    },
  };
};
