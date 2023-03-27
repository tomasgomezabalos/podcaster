import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

import {PodcastType} from '../types';

const ONE_DAY_IN_SECONDS = 24 * 60 * 60;

export const podcastApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: ''
  }),
  keepUnusedDataFor: ONE_DAY_IN_SECONDS,
  endpoints: (build) => ({
    getPodcasts: build.query({
      query: (count = 100) => `https://itunes.apple.com/us/rss/toppodcasts/limit=${count}/json`,
      transformResponse: (responseData: any) => {
        const {
          feed: {entry}
        } = responseData;
        const podcasts: PodcastType[] = entry.map((podcast: any) => ({
          id: podcast.id.attributes['im:id'],
          name: podcast['im:name'].label,
          author: podcast['im:artist'].label,
          image: podcast['im:image'][2].label,
          description: podcast.summary.label
        }));
        return podcasts;
      }
    }),
    getEpisodes: build.query({
      query: (id) =>
        `https://itunes.apple.com/lookup?id=${id}&media=podcast&entity=podcastEpisode&limit=20`
    })
  })
});

export const {useGetPodcastsQuery, useGetEpisodesQuery} = podcastApi;
