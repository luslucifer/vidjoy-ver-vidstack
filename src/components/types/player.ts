export interface RootPlayer {
  $schema: string
  player: Player
}

export interface Player {
  src: string
  viewType: string
  streamType: string
  logLevel: string
  crossOrigin: boolean
  playsInline: boolean
  title: string
  poster: string
  textTracks: TextTrack[]
}

export interface TextTrack {
  src: string
  label?: string
  language: string
  kind: string
  type: string
  default?: boolean
}
