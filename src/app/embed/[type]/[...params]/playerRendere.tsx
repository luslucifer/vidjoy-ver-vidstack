'use client';

import { useState, useEffect } from "react";
import { GetScoper } from "./types/getScoper";
import { rootProxy, rootScoper, rootThumbnail } from "@/utils";
import { TextTrack } from "@/components/types/player";
import Player from "@/components/player";

export default function PlayerRenderer(p:{id:string , ss:string|null , ep :string|null , sr:string|null ,ds:string , backdrop:string }) {
    // const [id,ss,ep,sr]:[string,string|null,string|null,string|null] = p
    const {id,ss,ep,sr,ds} = p
    const [scoper, setScoper] = useState<GetScoper | null>(null);
    const [subs,setSubs] = useState<TextTrack[]>()
    const [thumbnail,setThumbnail] = useState<string>()

    useEffect(() => {


        let path = `${id}`;
  if (ss && ep) {
    path = `${path}/${ss}/${ep}`;
  }
  if (sr) {
    path = `${path}?sr=${sr}`;
  }

        const fetchData = async () => {

            try {
                const res = await fetch(`${rootScoper}/${path}`);
                const data = await res.json();
                setScoper(data);

                const textTracks:TextTrack[]|any = data &&
    data.subs.map((obj:any) => {
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
    setSubs(textTracks)


            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [id,ss,ep,sr]); // Empty dependency array ensures this effect runs only once

    useEffect(()=>{
        let path = `${id}`;
        if (ss && ep) {
          path = `${path}?ss=${ss}&ep=${ep}`;
        }
        
        fetch(`${rootThumbnail}/${path}`).then(res => res.json()).then((data) =>{
            try {
                setThumbnail(`${rootProxy}/${encodeURIComponent(data.thubnail)}`)
            } catch (error) {
                
            }
        }
            
        )
    },[id,ss,ep])

    return (
        <div>
            {scoper &&
                        <Player src={scoper.val} poster={p.backdrop} textTracks={subs} thumbnails={thumbnail}  ></Player>

            }
        </div>
    );
}
