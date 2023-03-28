import { rest } from 'msw';

const podcasts = [...Array(10).keys()].map((i) => ({
  id: `id-${i+1}`,
  name: `name-${i+1}`,
  author: `author-${i+1}`,
  image: `image-${i+1}`,
  description: `description-${i+1}`,
}));

export const podcastHandler = [
  rest.get(
    "https://itunes.apple.com/us/rss/toppodcasts/limit=200/json",
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json(podcasts),
      );
    },
  )
];
