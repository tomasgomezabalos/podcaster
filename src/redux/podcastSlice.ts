import {createSlice} from "@reduxjs/toolkit";
import {podcastApi} from "../services/podcastApi";
import {PodcastType} from "../types";

const initialState = {
  podcasts: [],
}

export const podcastSlice = createSlice({
  name: 'podcast',
  initialState,
  reducers: {
    filterPodcasts: (state, action) => {
      const {filter, data} = action.payload
      state.podcasts = filter ? data.filter((podcast: PodcastType) =>
        podcast.name.toLowerCase().includes(filter.toLowerCase()) ||
        podcast.author.toLowerCase().includes(filter.toLowerCase())) : data;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      podcastApi.endpoints.getPodcasts.matchFulfilled,
      (state, action) => {
        state.podcasts = action.payload
      }
    )
  },
});

export const {filterPodcasts} = podcastSlice.actions;
