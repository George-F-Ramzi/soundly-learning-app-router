"use server";

import Follow from "@/components/follow";
import SongsSection from "@/components/songs_section";
import { artists } from "@/utils/db";
import { IArtist, ISong } from "@/utils/types";
import Image from "next/image";
import React from "react";

interface Prop {
  params: { id: string };
}

export default async function ArtistPage({ params }: Prop) {
  let { id } = params;

  let res = await fetch(`http://localhost:3000/api/artist/${id}`, {
    next: { revalidate: 10 },
  });

  let data: { info: IArtist; songs: ISong[] } = await res.json();

  return (
    <main className="mt-16 pb-36 text-white">
      <div className="flex flex-col items-center">
        <Image
          height={100}
          width={100}
          alt="profile image"
          className="min-w-[100px]  max-h-[100px] rounded mb-10"
          src={data.info.photo}
        />
        <h1 className="font-bold tablet:text-xl text-5xl mb-7">
          {data.info.username}
        </h1>
        <div className="flex">
          <p className="text-base tablet:text-sm mr-4 font-bold text-gray-300">
            {data.info.followers}:Followers
          </p>
          <p className="text-base tablet:text-sm mr-4 font-bold text-gray-300">
            {data.info.following}:Following
          </p>
          <p className="text-base tablet:text-sm font-bold text-gray-300">
            {data.info.songs}:Songs
          </p>
        </div>
      </div>
      <Follow id={Number(id)} />
      <SongsSection data={data.songs} title={"Uploaded Songs"} />
    </main>
  );
}

export async function generateStaticParams() {
  const data: IArtist[] = artists.chain().find().limit(9).data();

  return data.map((a: IArtist) => ({
    id: String(a.id),
  }));
}
