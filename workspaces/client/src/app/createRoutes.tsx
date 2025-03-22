import { RouteObject } from 'react-router';

import { Document, prefetch } from '@wsh-2025/client/src/app/Document';
import { createStore } from '@wsh-2025/client/src/app/createStore';

export function createRoutes(store: ReturnType<typeof createStore>): RouteObject[] {
  return [
    {
      path: '/',
      Component: Document,
      async loader() {
        return prefetch(store);
      },
      children: [
        {
          index: true,
          lazy: async () => {
            const { HomePage, prefetch } = await import('@wsh-2025/client/src/pages/home/components/HomePage');
            return {
              Component: HomePage,
              loader: () => prefetch(store),
            };
          },
        },
        {
          path: '/episodes/:episodeId',
          lazy: async () => {
            const { EpisodePage, prefetch } = await import('@wsh-2025/client/src/pages/episode/components/EpisodePage');
            return {
              Component: EpisodePage,
              loader: ({ params }) => prefetch(store, params),
            };
          },
        },
        {
          path: '/programs/:programId',
          lazy: async () => {
            const { ProgramPage, prefetch } = await import('@wsh-2025/client/src/pages/program/components/ProgramPage');
            return {
              Component: ProgramPage,
              loader: ({ params }) => prefetch(store, params),
            };
          },
        },
        {
          path: '/series/:seriesId',
          lazy: async () => {
            const { SeriesPage, prefetch } = await import('@wsh-2025/client/src/pages/series/components/SeriesPage');
            return {
              Component: SeriesPage,
              loader: ({ params }) => prefetch(store, params),
            };
          },
        },
        {
          path: '/timetable',
          lazy: async () => {
            const { TimetablePage, prefetch } = await import('@wsh-2025/client/src/pages/timetable/components/TimetablePage');
            return {
              Component: TimetablePage,
              loader: () => prefetch(store),
            };
          },
        },
        {
          path: '*',
          lazy: async () => {
            const { NotFoundPage, prefetch } = await import('@wsh-2025/client/src/pages/not_found/components/NotFoundPage');
            return {
              Component: NotFoundPage,
              loader: () => prefetch(store),
            };
          },
        },
      ],
    },
  ];
}
