import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const ONE_DAY_IN_SECONDS = 24 * 60 * 60;

export const podcastApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '',
  }),
  keepUnusedDataFor: ONE_DAY_IN_SECONDS,
  endpoints: (build) => ({
    getPodcasts: build.query({
      query: (count = 100) => `https://itunes.apple.com/us/rss/toppodcasts/limit=${count}/json`,
      transformResponse: (responseData: any) => {
        const {feed: {entry}} = responseData;
        return entry.map((podcast: any) => ({
          id: podcast.id.attributes['im:id'],
          name: podcast['im:name'].label,
          author: podcast['im:artist'].label,
          image: podcast['im:image'][2].label,
          description: podcast.summary.label,
        }))
      },
    }),
    getEpisodes: build.query({
      query: id => `https://itunes.apple.com/lookup?id=${id}&media=podcast&entity=podcastEpisode&limit=20`,
      transformResponse: (responseData: any) => {
        const {results} = responseData;
        return results.map((episode: any) => ({
          id: episode.trackId,
          title: episode.trackName,
          duration: episode.trackTimeMillis,
          description: episode.description,
          url: episode.episodeUrl,
        }))
      }
    })
  }),
});

export const {useGetPodcastsQuery, useGetEpisodesQuery} = podcastApi;
