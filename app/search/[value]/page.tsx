"use server";

import ArtistsSection from "@/components/artists_section";
import SongsSection from "@/components/songs_section";
import { IArtist, ISong } from "@/utils/types";

interface Prop {
  params: { value: string };
}

export default async function SearchPage({ params }: Prop) {
  let { value } = params;

  let res = await fetch(
    `https://soundly-peach.vercel.app/api/search/${value}`,
    {
      cache: "no-cache",
      method: "POST",
    }
  );

  let data: { artists: IArtist[]; songs: ISong[] } = await res.json();

  return (
    <main className="mt-20">
      <SongsSection data={data.songs} title={"Songs"} />
      <ArtistsSection data={data.artists} title={"Artists"} />
    </main>
  );
}
