"use client";

import { ReactNode, useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import Image from "next/image";
import Link from "next/link";
import { ISong } from "@/utils/types";
import PlayerContext from "@/utils/player_context";

export default function Player({ children }: { children: ReactNode }) {
  const [song, setSong] = useState<ISong>();

  return (
    <div>
      <PlayerContext.Provider value={{ setSong }}>
        {children}
      </PlayerContext.Provider>
      {song ? <PlayerBody song={song} /> : ""}
    </div>
  );
}

//

function PlayerBody({ song }: { song: ISong }) {
  return (
    <div className="h-[120px]  flex items-center justify-center bg-gray-800 fixed left-0 bottom-0 w-screen">
      <div className="max-w-[1180px] px-4  relative  phone:px-3 py-[10px] w-[1180px] h-full flex ">
        <Link href={`/song/${song.id}`}>
          <Image
            className="min-w-[100px] tablet:h-[100px]  tablet:absolute w-[100px] tablet:-top-10 tablet:border tablet:border-gray-500 h-full rounded"
            src={song.cover}
            width={100}
            height={100}
            alt="song-thumbnail"
          />
        </Link>
        <div className="text-white mr-8 tablet:absolute tablet:left-[120px] tablet:top-[4px]  min-w-fit flex-col justify-center flex font-bold ml-4 text-2xl">
          <Link href={`/song/${song.id}`} className="text-xl">
            {song.name}
          </Link>
          <Link
            href={`/artist/${song.artist.id}`}
            className="text-[14px] text-gray-300"
          >
            {song.artist.username}
          </Link>
        </div>
        <AudioPlayer
          layout="horizontal"
          showJumpControls={false}
          src={song.song}
          autoPlay
          className="w-full  mx-4 tablet:mt-10 tablet:ml-0  "
        />
      </div>
    </div>
  );
}
