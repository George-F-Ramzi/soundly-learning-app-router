"use client";

import PlayerContext from "@/utils/player_context";
import { IContextPlayer, ISong } from "@/utils/types";
import { useContext } from "react";

export default function PlayButton({ data }: { data: ISong }) {
  const { setSong }: IContextPlayer = useContext(PlayerContext);

  return (
    <button
      onClick={() => {
        setSong && setSong(data);
      }}
      className="bg-gradient1 h-12 w-full  rounded font-bold text-black text-xl"
    >
      Play
    </button>
  );
}
