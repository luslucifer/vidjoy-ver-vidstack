import { RootPlayer } from "./components/types/player";

export const rootTmdbImage = 'https://image.tmdb.org/t/p/'
export const rootScoper = "https://soaper-tv.valentine8406.workers.dev/fetch";
export var playerObj: RootPlayer = {
  $schema: "https://vidstack.io/player/schema",
  player: {
    src: "https://files.vidstack.io/sprite-fight/720p.mp4",
    viewType: "video",
    streamType: "on-demand",
    logLevel: "warn",
    crossOrigin: true,
    playsInline: true,
    title: "Sprite Fight",
    poster: "https://files.vidstack.io/sprite-fight/poster.webp",
    textTracks: [
      {
        src: "https://files.vidstack.io/sprite-fight/subs/english.vtt",
        label: "English",
        language: "en-US",
        kind: "subtitles",
        type: "vtt",
        default: true,
      },
      {
        src: "https://files.vidstack.io/sprite-fight/subs/spanish.vtt",
        label: "Spanish",
        language: "es-ES",
        kind: "subtitles",
        type: "vtt",
      },
      {
        src: "https://files.vidstack.io/sprite-fight/chapters.vtt",
        language: "en-US",
        kind: "chapters",
        type: "vtt",
        default: true,
      },
    ],
  },
};

export const rootTmdbUrl = "https://api.themoviedb.org/3";

export const api_key = "f6f2a9e9b0f5eed81b4cabe35d5a9c1b";
