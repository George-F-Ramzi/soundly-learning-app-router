"use client";

import { ISong } from "@/utils/types";
import SongCard from "./song_card";
import NothingHere from "@/utils/nothing";

interface Prop {
  title: String;
  data: ISong[];
}
export default function SongsSection({ title, data }: Prop) {
  return (
    <section className="mt-10">
      <h5 className="text-white font-bold text-2xl mb-8">{title}</h5>
      <div className="grid gap-8 grid-cols-cards ">
        {Array.isArray(data) && data.length ? (
          data.map((song, index) => {
            return <SongCard key={index} data={song} />;
          })
        ) : (
          <NothingHere />
        )}
      </div>
    </section>
  );
}
