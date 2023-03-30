import {rest} from 'msw';

const podcasts = [...Array(10).keys()].map((i) => ({
  "im:name": {
    "label": `Podcast ${i}`
  },
  "im:image": [
    {
      "label": "https://is3-ssl.mzstatic.com/image/thumb/Podcasts126/v4/06/a8/ef/06a8ef5d-af17-fd81-4a06-1649d304a31f/mza_18314601037657418713.jpg/55x55bb.png",
      "attributes": {
        "height": "55"
      }
    },
    {
      "label": "https://is5-ssl.mzstatic.com/image/thumb/Podcasts126/v4/06/a8/ef/06a8ef5d-af17-fd81-4a06-1649d304a31f/mza_18314601037657418713.jpg/60x60bb.png",
      "attributes": {
        "height": "60"
      }
    },
    {
      "label": "https://is4-ssl.mzstatic.com/image/thumb/Podcasts126/v4/06/a8/ef/06a8ef5d-af17-fd81-4a06-1649d304a31f/mza_18314601037657418713.jpg/170x170bb.png",
      "attributes": {
        "height": "170"
      }
    }
  ],
  "summary": {
    "label": `Summary ${i}`
  },
  "id": {
    "label": "https://podcasts.apple.com/us/podcast/the-deck-investigates/id1668474126?uo=2",
    "attributes": {
      "im:id": `id-${i}`
    }
  },
  "im:artist": {
    "label": `Artist ${i}`
  }
}));



export const podcastHandler = [
  rest.get('https://itunes.apple.com/us/rss/toppodcasts/*', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        feed: {
          entry: podcasts
        }
      })
    );
  })
];
