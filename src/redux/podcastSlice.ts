import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {podcastApi} from './podcastApi';
import {EpisodeType, PodcastType} from '../types';

export type PodcastStateType = {
  podcasts: PodcastType[];
  podcast: PodcastType | undefined;
  episodes: EpisodeType[];
  episode: EpisodeType | undefined;
  isNavigating: boolean;
};

const initialState: PodcastStateType = {
  podcasts: [],
  podcast: undefined,
  episodes: [],
  episode: undefined,
  isNavigating: false
};

export const podcastSlice = createSlice({
  name: 'podcast',
  initialState,
  reducers: {
    filterPodcasts: (
      state: PodcastStateType,
      action: PayloadAction<{filter: string; data: PodcastType[]}>
    ) => {
      const {filter, data} = action.payload;
      state.podcasts = filter
        ? data.filter(
            (podcast: PodcastType) =>
              podcast.name.toLowerCase().includes(filter.toLowerCase()) ||
              podcast.author.toLowerCase().includes(filter.toLowerCase())
          )
        : data;
    },
    selectPodcast: (state: PodcastStateType, action: PayloadAction<PodcastType>) => {
      state.podcast = action.payload;
      state.isNavigating = true;
    },
    setNavigating: (state: PodcastStateType, action: PayloadAction<boolean>) => {
      state.isNavigating = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(podcastApi.endpoints.getPodcasts.matchFulfilled, (state, action) => {
        state.podcasts = action.payload;
      })
      .addMatcher(podcastApi.endpoints.getEpisodes.matchFulfilled, (state, action) => {
        const {results} = action.payload;
        if (!state.podcast) {
          const podcast = results.find((result: any) => result.kind === 'podcast');
          state.podcast = {
            id: podcast.trackId,
            name: podcast.trackName,
            author: podcast.artistName,
            image: podcast.artworkUrl600,
            description: podcast.description
          };
        }
        const episodes: any[] = results.filter((result: any) => result.kind === 'podcast-episode');
        state.episodes = episodes.map((episode: any) => ({
          id: episode.trackId,
          title: episode.trackName,
          duration: episode.trackTimeMillis,
          description: episode.description,
          url: episode.episodeUrl,
          date: episode.releaseDate
        }));
      });
  }
});

export const {filterPodcasts, selectPodcast, setNavigating} = podcastSlice.actions;
