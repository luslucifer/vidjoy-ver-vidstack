import { api_key, rootScoper, rootTmdbImage, rootTmdbUrl } from "@/utils";
import { GetTmdb } from "./types/getTmdb";
import { GetScoper } from "./types/getScoper";
import Player from "@/components/player";
import { TextTrack } from "@/components/types/player";

export interface RootParams {
  params: Params;
  searchParams: SearchParams;
}

export interface Params {
  type: string;
  params: string[];
}

export interface SearchParams {
  sr: string;
  ds:string
}

async function getTmdb(id: string | number, type: string): Promise<GetTmdb> {
  const res = await fetch(`${rootTmdbUrl}/${type}/${id}?api_key=${api_key}`);
  return res.json();
}
async function getScoper(
  id: string,
  ss: string | null = null,
  ep: string | null = null,
  sr: string = "0"
): Promise<GetScoper> {
  let path = `/${id}`;
  if (ss && ep) {
    path = `${path}/${ss}/${ep}`;
  }
  if (sr) {
    path = `${path}?sr=${sr}`;
  }
  const res = await fetch(
    rootScoper + path,

    {
      headers: {
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
        Expires: "0",
      },
      cache: "no-store", // Ensures that the request is not cached
    }
  );
  return res.json();
}
export default async function Embed(p: RootParams) {
  const [id, ss, ep] = p.params.params;
  const type_ = p.params.type;
  const sr = p.searchParams.sr;
  const ds = p.searchParams.ds|| 'pt';
  const [meta,sources] = await Promise.all([
    getTmdb(id, type_),
    getScoper(id, ss, ep, sr),
  ])
  

  console.log(' sources log :' + sources)

  const textTracks:TextTrack[]|any = 
    sources.subs.map((obj) => {
      const o: TextTrack = {
        kind: "subtitle",
        language: obj.name,
        src: obj.link,
        type: "subs",
        default: obj.name == ds ? true : false,
        label: obj.name,
      };
      return o;
    })
  
  const res = await getTmdb(1399,'tv')
  return (
    <div>
      {/* {JSON.stringify(textTracks)} */}

      <Player
        src={sources.val}
        poster={`${rootTmdbImage}/original/${meta.backdrop_path}`}
        textTracks={textTracks}
      ></Player>
    </div>
  );
}
