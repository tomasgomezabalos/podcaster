import {createAsyncThunk} from '@reduxjs/toolkit';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

import {PodcastType} from '../types';
import {getCache, removeOldCache, setCache} from "../utils";

const ONE_DAY_IN_SECONDS = 24 * 60 * 60;

const getPodcasts = createAsyncThunk('getPodcasts', async (params) => {
  const {count} = params;
  const response = await fetch(`https://itunes.apple.com/us/rss/toppodcasts/limit=${count}/json`);
  const data = await response.json();
  setCache("podcasts", data);
  return data;
});

const getEpisodes = createAsyncThunk('getEpisodes', async (params) => {
  const {id} = params;
  const response = await fetch(
    `https://itunes.apple.com/lookup?id=${id}&media=podcast&entity=podcastEpisode&limit=20`
  );
  const data = await response.json();
  setCache(`${id}-episodes`, data);
  return data;
});

export const podcastApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://itunes.apple.com/'
  }),
  keepUnusedDataFor: ONE_DAY_IN_SECONDS,
  endpoints: (build) => ({
    getPodcasts: build.query({
      query: (count) => `us/rss/toppodcasts/limit=${count}/json`,
      async onQueryStarted(count, {dispatch}) {
        removeOldCache();
        const data = getCache("podcasts");
        if (data) {
          return {data};
        } else {
          return dispatch(getPodcasts({count}));
        }
      },
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
      query: (id) => `lookup?id=${id}&media=podcast&entity=podcastEpisode&limit=20`,
      async onQueryStarted(id, {dispatch}) {
        removeOldCache();
        const data = getCache(`${id}-episodes`);
        if (data) {
          return {data};
        } else {
          return dispatch(getEpisodes({id}));
        }
      }
    })
  })
});

export const {useGetPodcastsQuery, useGetEpisodesQuery} = podcastApi;
