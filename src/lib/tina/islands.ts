// @ts-nocheck (generated types/client appear after your first tinacms dev run)
import type { IslandRegistry } from '@tinacms/astro/experimental';
import PageSections from '../../components/PageSections.astro';
import { getPage } from './data';

export const islands: IslandRegistry = {
  page: {
    fetch: (_request, params) => getPage(params.get('slug') ?? 'about'),
    component: PageSections,
    wrapper: { tag: 'div' },
    propsFromData: (data) => ({
      page: data.data?.page,
    }),
  },
};
