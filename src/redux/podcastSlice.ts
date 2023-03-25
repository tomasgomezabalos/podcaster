import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {podcastApi} from "../services/podcastApi";
import {EpisodeType, PodcastType} from "../types";

export type PodcastStateType = {
  podcasts: PodcastType[],
  podcast: PodcastType | undefined,
  episodes: EpisodeType[],
  episode: EpisodeType | undefined,
}

const initialState: PodcastStateType = {
  podcasts: [],
  podcast: undefined,
  episodes: [],
  episode: undefined,
}

export const podcastSlice = createSlice({
  name: 'podcast',
  initialState,
  reducers: {
    filterPodcasts: (state, action: PayloadAction<{filter: string, data: PodcastType[]}>) => {
      const {filter, data} = action.payload
      state.podcasts = filter ? data.filter((podcast: PodcastType) =>
        podcast.name.toLowerCase().includes(filter.toLowerCase()) ||
        podcast.author.toLowerCase().includes(filter.toLowerCase())) : data;
    },
    selectPodcast: (state, action: PayloadAction<PodcastType>) => {
      state.podcast = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      podcastApi.endpoints.getPodcasts.matchFulfilled,
      (state, action) => {
        state.podcasts = action.payload
      }
    ).addMatcher(
      podcastApi.endpoints.getEpisodes.matchFulfilled,
      (state, action) => {
        const {results} = action.payload;
        if (!state.podcast) {
          const podcast = results.find((result: any) => result.kind === 'podcast');
          state.podcast = {
            id: podcast.trackId,
            name: podcast.trackName,
            author: podcast.artistName,
            image: podcast.artworkUrl600,
            description: podcast.description,
          }
        }
        const episodes: any[] = results.filter((result: any) => result.kind === 'podcast-episode');
        state.episodes = episodes.map((episode: any) => ({
          id: episode.trackId,
          title: episode.trackName,
          duration: episode.trackTimeMillis,
          description: episode.description,
          url: episode.episodeUrl,
          date: episode.releaseDate,
        }));
      }
    )
  },
});

export const {filterPodcasts, selectPodcast} = podcastSlice.actions;