"use client";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/audio.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import { RootPlayer, TextTrack } from "./types/player";
import { MediaPlayer, MediaProvider, PlayButton, Poster, Track } from "@vidstack/react";
import { PauseIcon,PlayIcon } from "@vidstack/react/types/vidstack-react.js";
import {
  DefaultVideoLayout,
  defaultLayoutIcons,
} from "@vidstack/react/player/layouts/default";
import { playerObj } from "@/utils";




export default function Player(p: {
  src: string;
  poster?: string;
  textTracks?: TextTrack[];
  thumbnails?: string;
}) {
  // playerObj.player = { ...playerObj.player, ...p };
  return (
    <div>
      {/* <h1> {p.src}</h1> */}
    <MediaPlayer
      src={p.src}
      viewType="video"
      streamType="on-demand"
      logLevel="warn"
      crossOrigin
      playsInline
      title="Sprite Fight"
      poster={p.poster}
    >
      <MediaProvider>
        <Poster className="vds-poster" />
        {p.textTracks && p.textTracks.map((track) => (
          <Track
            src={track.src}
            label={track.label}
            language={track.language}
            kind="subtitles"
            default={track.default}
            type="srt"
            key={track.src}
          />
        ))}
      </MediaProvider>
      <DefaultVideoLayout
        thumbnails={p.thumbnails}
        icons={defaultLayoutIcons}
        />
    </MediaPlayer>
        </div>
  );
}
