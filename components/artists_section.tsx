"use client";

import NothingHere from "@/utils/nothing";
import { IArtist } from "@/utils/types";
import ArtistCard from "./artist_card";

interface Prop {
  title: String;
  data: IArtist[];
}
export default function ArtistsSection({ title, data }: Prop) {
  return (
    <section className="mt-10">
      <h5 className="text-white font-bold text-2xl mb-8">{title}</h5>
      <div className="grid gap-8 grid-cols-cards ">
        {Array.isArray(data) && data.length ? (
          data.map((artist, index) => {
            return <ArtistCard key={index} data={artist} />;
          })
        ) : (
          <NothingHere />
        )}
      </div>
    </section>
  );
}
