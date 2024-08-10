"use client";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/audio.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import { RootPlayer, TextTrack } from "./types/player";
import { MediaPlayer, MediaProvider, PlayButton, Poster, Track } from "@vidstack/react";
import { PauseIcon, PlayIcon } from "@vidstack/react/types/vidstack-react.js";
import {
  DefaultVideoLayout,
  defaultLayoutIcons,
} from "@vidstack/react/player/layouts/default";
import { useEffect, useState } from "react";
// import { useRouter } from 'next/compat/router';

export default function Player(p: {
  src: string;
  poster?: string;
  textTracks?: TextTrack[];
  thumbnails?: string;
  setEnded: React.Dispatch<React.SetStateAction<boolean>>;
}) {

  function autoNext() {
    const fullUrl = window.location.href;
    const url = new URL(fullUrl);
    const splited = url.pathname.split('/');
    if(splited[2] =='tv'){

      const lastDigit = Number(splited[splited.length - 1]) + 1;
      splited.pop();
      splited.push(lastDigit.toString());
      const joined = splited.join('/');
      const newUrl = `${url.origin}${joined}`;
      
      // Navigate to the new URL
      // useEffect(()=>{
        window.history.pushState({}, '', newUrl);
        // },[])
        window.location.reload()
        return newUrl;
      }
  }

  const [ended, setEnded] = useState<string>("sakib");

  return (
    <div>
      {/* <h1>{autoNext()}</h1> */}
      <MediaPlayer
      onEnded={()=>{autoNext()}}
        src={p.src}
        viewType="video"
        streamType="on-demand"
        logLevel="warn"
        crossOrigin
        playsInline
        title="Sprite Fight"
        poster={p.poster}
        className="h-screen"
        autoPlay
        muted
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
