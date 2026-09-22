// @ts-nocheck (generated types/client appear after your first tinacms dev run)
import { requestWithMetadata } from '@tinacms/astro/data';
import client from '../../../tina/__generated__/client';

const blockTypes = {
  PageSectionsBlocksText: "text",
  PageSectionsBlocksImage: "image",
  PageSectionsBlocksButton: "button",
  PageSectionsBlocksCard_grid: "card-grid",
  PageSectionsBlocksCard_gridCardsBlocksText: "text",
  PageSectionsBlocksCard_gridCardsBlocksImage: "image",
  PageSectionsBlocksCard_gridCardsBlocksButton: "button",
} as const;

const normalizeBlock = (block: any): any => {
  if (!block) {
    return block;
  }

  const normalized = {
    ...block,
    type: blockTypes[block.__typename as keyof typeof blockTypes] ?? block.type,
  };

  if (normalized.type === "card-grid") {
    normalized.cards = normalized.cards?.map((card: any) => ({
      ...card,
      blocks: card.blocks?.map(normalizeBlock),
    }));
  }

  return normalized;
};

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
          blocks: section.blocks?.map(normalizeBlock),
        })),
      },
    },
  };
};
