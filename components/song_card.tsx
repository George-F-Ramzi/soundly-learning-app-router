"use client";

import { useContext } from "react";
import { RiPlayCircleFill } from "react-icons/ri";
import Link from "next/link";
import { IContextPlayer, ISong } from "@/utils/types";
import Image from "next/image";
import PlayerContext from "@/utils/player_context";

export default function SongCard({ data }: { data: ISong }) {
  const { setSong }: IContextPlayer = useContext(PlayerContext);

  return (
    <div className="w-full items-center  p-[8px] flex  h-[80px] bg-gray-800 text-white rounded-[4px]">
      <div className="w-[64px] h-full relative">
        <Image
          src={data.cover}
          className="min-w-[64px] h-full rounded"
          alt={`${data.name}`}
          width={64}
          height={64}
        />
        <div
          onClick={() => setSong && setSong(data)}
          className="absolute cursor-pointer w-full bg-opacity-20 h-full top-0 flex bg-black items-center justify-center rounded"
        >
          <RiPlayCircleFill size={"28px"} />
        </div>
      </div>
      <div className="ml-4 flex flex-col">
        <Link
          href={`/song/${data.id}`}
          className="font-bold cursor-pointer mb-2"
        >
          {data.name}
        </Link>
        <Link
          href={`/artist/${data.artist.id}`}
          className="text-gray-300 cursor-pointer"
        >
          {data.artist.username}
        </Link>
      </div>
    </div>
  );
}
