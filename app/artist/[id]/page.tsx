import Follow from "@/components/follow";
import SongsSection from "@/components/songs_section";
import { db } from "@/db/db";
import { Artists, Songs } from "@/db/schema";
import { ISong } from "@/utils/types";
import { eq } from "drizzle-orm";
import { Metadata } from "next";
import Image from "next/image";
import React from "react";

interface Prop {
  params: { id: string };
}

export const fetchCache = "default-no-store";

export async function generateMetadata({ params }: Prop): Promise<Metadata> {
  let { id } = params;

  const artist = await db
    .select({ name: Artists.name })
    .from(Artists)
    .where(eq(Artists.id, Number(id)));

  return {
    title: artist[0].name,
  };
}

export default async function ArtistPage({ params }: Prop) {
  let { id } = params;

  let artist = await db
    .select({
      id: Artists.id,
      name: Artists.name,
      followers: Artists.followers,
      following: Artists.follwoing,
      songs: Artists.songs,
      cover: Artists.cover,
    })
    .from(Artists)
    .where(eq(Artists.id, Number(id)));

  let songs = await db
    .select({
      id: Songs.id,
      username: Artists.name,
      cover: Songs.cover,
      song: Songs.song,
      likes: Songs.likes,
      name: Songs.name,
      artist: Songs.artist,
    })
    .from(Songs)
    .where(eq(Songs.artist, Number(id)))
    .leftJoin(Artists, eq(Artists.id, Number(id)));

  return (
    <main className="mt-16 pb-36 text-white">
      <div className="flex flex-col items-center">
        <Image
          height={100}
          width={100}
          alt="profile image"
          className="min-w-[100px]  max-h-[100px] rounded mb-10"
          src={artist[0].cover!}
        />
        <h1 className="font-bold tablet:text-xl text-5xl mb-7">
          {artist[0].name}
        </h1>
        <div className="flex">
          <p className="text-base tablet:text-sm mr-4 font-bold text-gray-300">
            {artist[0].followers}:Followers
          </p>
          <p className="text-base tablet:text-sm mr-4 font-bold text-gray-300">
            {artist[0].following}:Following
          </p>
          <p className="text-base tablet:text-sm font-bold text-gray-300">
            {artist[0].songs}:Songs
          </p>
        </div>
      </div>
      <Follow id={Number(id)} />
      <SongsSection data={songs as ISong[]} title={"Uploaded Songs"} />
    </main>
  );
}
