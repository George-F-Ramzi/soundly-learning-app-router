"use server";

import Comments from "@/components/comments";
import Like from "@/components/like";
import PlayButton from "@/components/play";
import { db } from "@/db/db";
import { Artists, Songs, Comments as CommentsDB } from "@/db/schema";
import { IComment, ISong } from "@/utils/types";
import { eq } from "drizzle-orm";
import { Metadata } from "next";
import Image from "next/image";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  //
  let { id } = params;

  const song = await db
    .select({ name: Songs.name })
    .from(Songs)
    .where(eq(Songs.id, Number(id)));

  return {
    title: song[0].name,
  };
}

export default async function SongPage({ params }: { params: { id: string } }) {
  let { id } = params;

  let song = await db
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
    .where(eq(Songs.id, Number(id)))
    .leftJoin(Artists, eq(Artists.id, Songs.artist));

  let comments = await db
    .select({
      id: CommentsDB.id,
      song: CommentsDB.song,
      artist: CommentsDB.artist,
      details: CommentsDB.details,
      name: Artists.name,
      cover: Artists.cover,
    })
    .from(CommentsDB)
    .where(eq(CommentsDB.song, Number(id)))
    .leftJoin(Artists, eq(CommentsDB.artist, Artists.id));

  return (
    <main className="mt-16 pb-36 text-white">
      <div className="flex flex-col items-center">
        <Image
          height={100}
          width={100}
          alt="song cover"
          className="min-w-[100px]  max-h-[100px] rounded mb-10"
          src={song[0].cover}
        />
        <h1 className="font-bold tablet:text-xl text-5xl mb-7">
          {song[0].name}
        </h1>
        <div className="flex">
          <p className="text-base tablet:text-sm  font-bold text-gray-300">
            {song[0].likes}:Likes
          </p>
        </div>
      </div>
      <div className="mt-14 w-full h-12 grid grid-cols-2 gap-6">
        <PlayButton data={song[0] as ISong} />
        <Like id={song[0].id} />
      </div>
      <Comments data={comments as IComment[]} id={song[0].id} />
    </main>
  );
}
